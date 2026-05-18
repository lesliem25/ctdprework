
var hour = 0;

// fetching Data from the NOAA U.S. Weather Forecast
async function fetchData(){
    try{
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=gfs_seamless');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //Getting the Temperature Information
        const data = await response.json();
        const allTemps = data.hourly.temperature_2m;
        const hourlyTemp = Object.fromEntries(Object.entries(allTemps).slice(0,13));
        //Getting the Weather Information
        const allTimes = data.hourly.time;
        var tempAtHour = Object.values(hourlyTemp)[hour];
        const times = Object.fromEntries(Object.entries(allTimes).slice(0,13));
        var specificTime = Object.values(times)[hour];
        $("#date").text("Date: " + specificTime.slice(5,10));
        //Ensuring the website does not display information as soon as it shows the prediction for the 12th hour
        if (hour < 12){
            $("#temp").append(" " + Number(tempAtHour)+1);
            $("#hourlyTemp").append(" " + specificTime.slice(11,17));
            hour +=1;
        }
    }
    catch(error){
        console.error('Error:', error);
    }
}

$("#fetchTemp").on("click", fetchData);