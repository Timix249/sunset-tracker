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

menu.style.display =
menu.style.display === "block" ? "none" : "block"

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

function loadMap(lat,lon){

let map = L.map('map').setView([lat,lon],13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

L.marker([lat,lon]).addTo(map)

}

function autoLocation(){

navigator.geolocation.getCurrentPosition(pos=>{

let lat = pos.coords.latitude
let lon = pos.coords.longitude

getSun(lat,lon)
loadMap(lat,lon)

})

}

autoLocation()
