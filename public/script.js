
//window.onload = function(){ 
//    getLocation() 
//};
async function getCityData(cityname)
{
    console.log('fetching')
    let response=await fetch('/countryweather?cityname='+cityname);
    let data = await response.json();
    if(data.cod != 200){
        window.alert('YOU MISS TYPED THE CITY NAME')
        return;
    }
    console.log(data)
    getCurrentPlaceData(data.coord.lat,data.coord.lon)
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
        
            //console.log(position)
            return getCurrentPlaceData(position.coords.latitude,position.coords.longitude)
        });
    } else {
        window.alert('GEOLOCATION IS NOT SUPPORTED');
    }
}
async function getCurrentPlaceData(lat,lon)
{
    let response=await fetch('/currentweather?lat='+lat+'&lon='+lon);
    let data = await response.json();
    console.log(data)
    UpdateUI(data)
}
function UpdateUI(data)
{
    console.log('updating ui')
    //RESET
    let src = document.getElementById('weatherIcon')
    let img = document.createElement('img')
    var fc = src.firstChild;
    while( fc ) {
    src.removeChild( fc );
    fc = src.firstChild;
}
   let temp = data.current.temp
   let feels_like = data.current.feels_like
   let description = data.current.weather[0].description
   let time_zone = data.timezone
   console.log(time_zone)
   let iconcode = data.current.weather[0].icon;
   let iconurl = `http://openweathermap.org/img/wn/${iconcode}@2x.png`;

    document.getElementById("temperature").innerText=Math.round(temp)+'\xB0'
    document.getElementById("weatherCondition").innerText= description
    document.getElementById("place").innerText= 'Feels Like: '+feels_like+'\xB0'

    img.src = iconurl
    img.className+="weatherIcon"
    src.appendChild(img)
    showTime(time_zone) 

}
function showTime(time_zone){
    let d = new Date(new Date().toLocaleString("en-US", {timeZone: time_zone}));   
    console.log(d)
    var h = d.getHours(); 
    var m = d.getMinutes(); 
    var s = d.getSeconds(); 
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("date").innerText = time;    
    setTimeout(showTime,1000,time_zone);
}

function searchButtonClicked()
{
    console.log('button pressed')
    var data = document.getElementById("search_textbox").value;    
    console.log(data)
    getCityData(data)    
}

