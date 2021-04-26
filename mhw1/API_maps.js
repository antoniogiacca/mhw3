const apikey_maps = 'AIzaSyDVZgZR-PCxaGJaIUzAp3eZ3XoE6AJUFzQ';
const endpoint_maps = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const address = 'Catania ss192, km 185';


async function initMap() {

  const responseJson = await getLatLong(address);
  
  const latitude = responseJson.geometry.location.lat;
  const longitude = responseJson.geometry.location.lng;

  const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 12,
  });

  const marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
  });

}


async function getLatLong(address){
  
  const request = endpoint_maps + address + "&key=" + apikey_maps
  const temp = await fetch(request).then(onResponse).then(onJson);

  return temp;
}

function onResponse(response){
  return response.json();
}

function onJson(json){
  return json.results[0];
}

