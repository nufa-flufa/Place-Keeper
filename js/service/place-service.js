'use strict'

console.log('place-service connected')
const MAP_LOCS = 'user locations'

var gCurrPosition = {
    lat: 31.952110800000003,
    lng: 34.906551,

}
var gOptions = [{
    center: gCurrPosition,
    zoom: 9,
    id: makeId(),
    locName: 'Forest'
},
{
    center: { lat: 31.950601120028264, lng: 34.95009378726137 },
    zoom: 9,
    id: makeId(),
    locName: 'Shop'
}
];

function getLocations() {
    return [{
        center: { lat: 31.952110800000003, lng: 34.906551, },
        zoom: 9,
        id: makeId(),
        locName: 'Forest'
    },
    {
        center: { lat: 31.950601120028264, lng: 34.95009378726137 },
        zoom: 9,
        id: makeId(),
        locName: 'Shop'
    }
    ];
}

function initMap() {
    var elMap = document.querySelector('.map');
    var map = new google.maps.Map(
        elMap,
        ...gOptions
    );
    gOptions.map(function (option) {
        var marker = new google.maps.Marker({
            position: option.center,
            map,
            title: 'Hello World!'
        });
    })
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: gCurrPosition,
    });
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,

        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        var locationObj = JSON.parse(JSON.stringify(mapsMouseEvent))

        var locationName = prompt('Name the place')
        var locationId = makeId()
        var newLocation = { id: locationId, center: locationObj.latLng, zoom: 9, locName: locationName };
        gOptions.push(newLocation)

        _saveLocationsToStorage()
        renderTable()
        infoWindow.open(map);
    });

}

function findLocationById(id) {
    console.log(id)
    var location = gOptions.find(function (option) {
        if (option.id === id) return option
        else return null
    });
    return location
}

function removeLocation(id) {
    var locationIdx = gOptions.findIndex(function (option) {
        return option.id === id
    })
    if (locationIdx === -1) return;
    gOptions.splice(locationIdx, 1)
    _saveLocationsToStorage(MAP_LOCS, gOptions);

}

function _saveLocationsToStorage() {
    saveToStorage(MAP_LOCS, gOptions)
}

