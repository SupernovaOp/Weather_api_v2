const BASE_URL ="https://api.openweathermap.org/data/2.5/weather?";
// OpenWeatherMap API key
const api_key = "6540f1253810cbc4dac09b2008776eab";

// Getting all the elements
const btn = document.querySelector('button');
const img1= document.querySelector('img');
const msg = document.querySelector('.msg');
const temp = document.querySelector('.temp');
const place =document.querySelector('.place');
btn.addEventListener('click', async (event) => {
  event.preventDefault();
    let inputVal =document.querySelector('input')
    const cityName = inputVal.value;
    if(cityName === ''){
      msg.innerHTML = 'Enter City Name';
      return; // Exit the function if no city name is provided.  Return avoids executing the fetch request below.  Not a recommended approach in a real-world application, as it might lead to errors. You should implement a better UX for this scenario.  Here, it's used to prevent API call on each page load.
    }
    else{
    inputVal.value = '';
    const weatherResponse = await fetch(`${BASE_URL}q=${cityName}&APPID=${api_key}&units=metric`);
    getWeather(weatherResponse);
    }
});

const myLocat = document.querySelector('form i');
myLocat.addEventListener('click', async (event) => {
  event.preventDefault();
  getLocation();
});

let lat,lon;

//Geo location using HTML API
function getLocation(){
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    return;
  }
  navigator.geolocation.getCurrentPosition(async position => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const weatherResponse = await fetch(`${BASE_URL}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`);
  getWeather(weatherResponse);
});
};

//Get weather function
const getWeather= async(weatherResponse)=>{
  try{
    if (!weatherResponse.ok) {
      throw new Error(`HTTP error! status: ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();
    temp.innerHTML = `${weatherData.main.temp}°C`;
    msg.innerHTML = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const placeName = weatherData.name;
    place.innerHTML=placeName;
    img1.src =  `https://openweathermap.org/img/wn/${icon}@2x.png`
  }
  catch(err){
    console.error('Error:', err);
    msg.innerHTML = 'Enter Valid City';
    temp.innerHTML = ' ';
    img1.src = '';
    place.innerHTML=' ';
    }  
}
