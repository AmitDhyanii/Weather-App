const apiKey = "a172ab2b1308ca6686ed1cdf3c676afc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function setError(msg="Failed to load!")
{
    document.querySelector(".error").style.display = "block"; 
    document.querySelector(".error").innerText = msg   ;
    document.querySelector(".weather").style.display = "none";  
}

async function weather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404 )
    {
      setError("City not found!") ;
    }
    else
    {
        var data = await response.json();
        console.log(data);
        if(data.cod == 400)
        {
            setError("Please enter city name.") ;
        }
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds")
    {
        weatherIcon.src = "clouds.png";
    }
    else if(data.weather[0].main == "Clear")
    {
        weatherIcon.src = "clear.png";
    }
    else if(data.weather[0].main == "Rain")
    {
        weatherIcon.src = "rain.png";
    }
    else if(data.weather[0].main == "Drizzle")
    {
        weatherIcon.src = "drizzle.png";
    }
    else if(data.weather[0].main == "Mist")
    {
        weatherIcon.src = "mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }

};

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    weather(searchBox.value);
})


