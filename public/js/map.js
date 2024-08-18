
let map_token = mapToken;
mapboxgl.accessToken = map_token;

let coordinates1=JSON.parse(coordinates);
console.log(coordinates1)

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: coordinates1,
    zoom: 6,
    maxZoom: 15
});

// Function to handle different coordinate formats
function addMarker(coordinates) {
    console.log("Coordinates:", coordinates);

    let lngLat;
    if (typeof coordinates === 'string') {
        try {
            coordinates = JSON.parse(coordinates);
        } catch (e) {
            console.error("Failed to parse coordinates:", e);
            return;
        }
    }

    if (Array.isArray(coordinates)) {
        // If coordinates is an array [longitude, latitude]
        lngLat = coordinates;
    } else if (typeof coordinates === 'object' && 'lng' in coordinates && 'lat' in coordinates) {
        // If coordinates is an object {lng: longitude, lat: latitude}
        lngLat = [coordinates.lng, coordinates.lat];
    } else if (typeof coordinates === 'object' && 'lon' in coordinates && 'lat' in coordinates) {
        // If coordinates is an object {lon: longitude, lat: latitude}
        lngLat = [coordinates.lon, coordinates.lat];
    } else {
        console.error("Invalid coordinate format");
        return;
    }

    new mapboxgl.Marker({color:"red"}).
    setLngLat(lngLat)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${locations}</h4><p>Exact Location Provided after Booking</p>`))
    .addTo(map);
}

addMarker(coordinates);