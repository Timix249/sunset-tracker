import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBM15kmcDYxrOigyaVeVuTuQHPWP8p5rsg",
  authDomain: "suntime-90fc9.firebaseapp.com",
  projectId: "suntime-90fc9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const map = L.map('map').setView([30,0],2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

onSnapshot(collection(db,"visitors"), snapshot => {

snapshot.docChanges().forEach(change => {

let data = change.doc.data();

L.circleMarker([data.lat,data.lon],{
radius:6,
color:"red"
}).addTo(map);

});

});
