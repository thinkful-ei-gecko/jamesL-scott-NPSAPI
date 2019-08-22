const apiKey = '6pYnGRh2fIUoxdNtWv6AhRhdsbj9gagZUglwCO76'
const searchUrl = 'https://developer.nps.gov/api/v1/parks'

const formatQueryParams = function(params) {
    let queryItem = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItem.join('&');
}

const handleSubmit = function() {
    $('.search-form').on('submit', event => {
        event.preventDefault();
        let state = $('#state-search').val();
        let num = $('#num-results').val();
        getParks(state, num);
    })
}

const getParks = function(query, maxResults) {
    //fetch request from NPS API
    const params = {
        stateCode: query,
        limit: maxResults
    }
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;
    console.log(url);

    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey})
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then()
}

// const extractData = function(jsonData) {
//     //pull out full name, description, and website URL
// }

// const createTemplate = function(name, description, URL) {
//     //make the extracted info into usable HTML
// }

const displayData = function(jsonData, maxResults) {
    $('.parks-info').empty();

    if (jsonData.data.length === 0) {
        $('.error-message').text('No results found. Please try again using the state abbreviation');
    } else {

        for (let i = 0; i < maxResults && i <jsonData.data.length; i++) {
            $('.parks-list').append(
                `<li><h3><a href=${jsonData.data[i].url}>${jsonData.data[i].fullName}</a></h3>
                    <p>${jsonData.data[i].description}</p>
                `
            )
        }
    }
}

$(handleSubmit);



/*

https://developer.nps.gov/api/v1/parks?stateCode=     ${CO}   &limit=    10     &api_key=6pYnGRh2fIUoxdNtWv6AhRhdsbj9gagZUglwCO76


*/