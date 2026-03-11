let lang="en"

const translations={
en:{
sunrise:"🌅 Sunrise",
sunset:"🌇 Sunset",
weather:"7 Day Weather"
},
de:{
sunrise:"🌅 Sonnenaufgang",
sunset:"🌇 Sonnenuntergang",
weather:"7 Tage Wetter"
},
uk:{
sunrise:"🌅 Схід сонця",
sunset:"🌇 Захід сонця",
weather:"Погода на 7 днів"
},
tr:{
sunrise:"🌅 Gün doğumu",
sunset:"🌇 Gün batımı",
weather:"7 Günlük Hava"
}
}

function setLanguage(l){
lang=l
document.getElementById("weatherTitle").innerText=
translations[l].weather
}

function updateClock(){
let now=new Date()

document.getElementById("clock").innerText=
"⏰ "+now.toLocaleTimeString()

document.getElementById("date").innerText=
"📅 "+now.toLocaleDateString()
}

setInterval(updateClock,1000)
updateClock()


function updateDayProgress(){

let now=new Date()

let start=new Date()
start.setHours(0,0,0,0)

let end=new Date()
end.setHours(23,59,59,999)

let percent=((now-start)/(end-start))*100

document.getElementById("dayBar").style.width=
percent+"%"

}

setInterval(updateDayProgress,60000)
updateDayProgress()


function getMoon(){

let d=new Date()

let lp=2551443
let now=d.getTime()/1000
let new_moon=592500

let phase=((now-new_moon)%lp)/lp

if(phase<0.25)return"🌒"
if(phase<0.50)return"🌓"
if(phase<0.75)return"🌔"

return"🌕"
}

function updateSky(){

let hour=new Date().getHours()

let sky=document.getElementById("sky")

if(hour>=6&&hour<20){
sky.innerHTML="☀️ ☁️"
}else{
sky.innerHTML=getMoon()+" ⭐"
}

}

setInterval(updateSky,60000)
updateSky()


function rainEffect(){

let container=document.getElementById("weatherEffect")

container.innerHTML=""

for(let i=0;i<100;i++){

let drop=document.createElement("div")

drop.className="raindrop"

drop.style.left=Math.random()*100+"%"

container.appendChild(drop)

}

}

function heatEffect(){

let container=document.getElementById("weatherEffect")

container.innerHTML="<div class='heat'></div>"

}


function getSun(lat,lon){

fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`)
.then(r=>r.json())
.then(data=>{

let sunrise=new Date(data.results.sunrise)
let sunset=new Date(data.results.sunset)

document.getElementById("sunrise").innerText=
translations[lang].sunrise+" "+sunrise.toLocaleTimeString()

document.getElementById("sunset").innerText=
translations[lang].sunset+" "+sunset.toLocaleTimeString()

})

}


function loadWeather(lat,lon){

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
.then(r=>r.json())
.then(data=>{

let days=data.daily.time
let max=data.daily.temperature_2m_max
let min=data.daily.temperature_2m_min

let container=document.getElementById("weather7")

container.innerHTML=""

for(let i=0;i<7;i++){

let div=document.createElement("div")

div.className="weather-day"

div.innerHTML=
`<span>${days[i]}</span>
<span>${max[i]}° / ${min[i]}°</span>`

container.appendChild(div)

}

if(max[0]>30){
heatEffect()
}

if(min[0]<5){
rainEffect()
}

})

}


function loadMap(lat,lon){

let map=L.map('map').setView([lat,lon],10)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

L.marker([lat,lon]).addTo(map)

}


function autoLocation(){

navigator.geolocation.getCurrentPosition(pos=>{

let lat=pos.coords.latitude
let lon=pos.coords.longitude

getSun(lat,lon)
loadWeather(lat,lon)
loadMap(lat,lon)

})

}

autoLocation()

