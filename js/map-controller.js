'use strict'

// console.log('hello')
function init() {
    console.log(gOptions)
  
    renderTable()
}
function renderTable() {
    gOptions = loadFromStorage(MAP_LOCS)
    if(!gOptions && !gOptions.length) gOptions = getLocations()
    console.log(gOptions)
    var strHTMLs = gOptions.map(function (opt) {
        return `<tr>
        <td class="cell">${opt.locName}</td>
        <td class="cell"> ${opt.center.lat}</td>
        <td class="cell"> ${opt.center.lng}</td>
        <td class="cell"> <button onclick="onDeleteLocation('${opt.id}')">Delete</button><td>
        </tr>`
    })
    var elTable = document.querySelector('tbody')
    elTable.innerHTML = strHTMLs.join('');
    initMap()
}

function onDeleteLocation(id) {
    removeLocation(id)
    renderTable()
}