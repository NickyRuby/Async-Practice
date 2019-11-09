// Foursquare API Info
const clientId = 'O5VJTYUULWOCHZFVI5BMRP5UCW0D1EOPF0IR0WNI2PECEGLJ';
const clientSecret = 'T5U1E1RISHUKI45FX3UFRSBJ3E45ZASYBKHWTXPSYMDKVYPX';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'e5e4463dfec74dc682c9a292e9fa45a7';
const weatherUrl = 'https://api.weatherbit.io/v2.0/current?city=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
   const city = $input.val();
   const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=${20191107}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items;
      console.log(venues.map(item => item.venue));
      return venues.map(item => item.venue); // array with venues
    }
  }
  catch (error) {
    console.log(error);
  }
     
   }

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = weatherUrl + city + `&key=${openWeatherKey}`;
  console.log(urlToFetch);
  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const resp = await response.json();
      console.log(resp);
      return resp;
    }
  }
  catch (err) {
    console.log(err);
  }
}


// Render functions
const renderVenues = (venues) => {
  const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
      const venue = venues[index];
      const name = venue.name;
      const location = venue.location;
      const icon = venue.categories[0].icon;
      const iconSrc = icon.prefix + 'bg_64' + icon.suffix;
      console.log(name);
      console.log(location);
      console.log(iconSrc);
      let venueContent = `<h2>${name}</h2><img class="venueimage" src="${iconSrc}"/><h3>Address:</h3><p>${location.address}</p><p>${location.city}</p><p>${location.country}</p>`;
      $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
  }
}

const renderForecast = (day) => {
  // Add your code here:
  
	let weatherContent = '';
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast()
  return false;
}

$submit.click(executeSearch)