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
    const url = searchUrl + '?' + queryString + '&api_key=6pYnGRh2fIUoxdNtWv6AhRhdsbj9gagZUglwCO76';
    console.log(url);

    // const options = {
    //     headers: new Headers({
    //         "X-Api-Key": apiKey})
    // };

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(jsonData => displayData(jsonData, maxResults))
        .catch(error => {
            $('.error-message').text(`Something went wrong: ${error.message}`);
        });
};



const displayData = function(jsonData, maxResults) {
    $('.parks-list').empty();
    
    if (jsonData.data.length === 0) {
        $('.error-message').text('No results found. Please try again using the state abbreviation');
    } else {
        for (let i = 0; i < jsonData.data.length && i < maxResults; i++) {
            console.log();
            $('.parks-list').append(`<li><a href=${jsonData.data[i].url}>${jsonData.data[i].fullName}</a></li>
                    <p>${jsonData.data[i].description}</p>`)
        }
    }
}

$(handleSubmit);



/*

https://developer.nps.gov/api/v1/parks?stateCode=     ${CO}   &limit=    10     &api_key=6pYnGRh2fIUoxdNtWv6AhRhdsbj9gagZUglwCO76


*/