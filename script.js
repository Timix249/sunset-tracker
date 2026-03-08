function updateClock(){

let now = new Date()

document.getElementById("clock").innerText =
"⏰ " + now.toLocaleTimeString()

document.getElementById("date").innerText =
"📅 " + now.toLocaleDateString()

}

setInterval(updateClock,1000)

updateClock()



function toggleMenu(){

let menu = document.getElementById("menuBox")

if(menu.style.display === "block")

menu.style.display = "none"

else

menu.style.display = "block"

}



function getSun(lat,lon){

fetch("https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon+"&formatted=0")

.then(r=>r.json())

.then(data=>{

let sunrise = new Date(data.results.sunrise)

let sunset = new Date(data.results.sunset)

document.getElementById("sunrise").innerText =
"🌅 Схід: " + sunrise.toLocaleTimeString()

document.getElementById("sunset").innerText =
"🌇 Захід: " + sunset.toLocaleTimeString()

})

}



function searchCity(){

let city = document.getElementById("city").value

fetch("https://nominatim.openstreetmap.org/search?format=json&q="+city)

.then(r=>r.json())

.then(data=>{

let lat = data[0].lat

let lon = data[0].lon

getSun(lat,lon)

})

}



function autoLocation(){

navigator.geolocation.getCurrentPosition(pos=>{

let lat = pos.coords.latitude

let lon = pos.coords.longitude

getSun(lat,lon)

})

}

autoLocation()
