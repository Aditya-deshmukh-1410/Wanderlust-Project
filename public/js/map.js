
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
         center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 12 // starting zoom
    });

    console.log(coordinates);

    const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates)
    .setPopup(
    new mapboxgl.Popup({ offset: 25, closeButton: true, closeOnClick: true })
        .setHTML(`      
             <h6>Exact location provided after booking.</h6>
        `)
)

    .addTo(map);

// Circle overlay
map.on("load", () => {
    map.addSource("circle", {
        type: "geojson",
        data: {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: coordinates
            }
        }
    });

    map.addLayer({
        id: "circle-layer",
        type: "circle",
        source: "circle",
        paint: {
            "circle-radius": 70,    // bigger radius
            "circle-color": "#ff0000",
            "circle-opacity": 0.25   // darker boundary
        }
    });
});
