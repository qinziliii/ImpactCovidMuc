/**
 * Creates all Munich Districts as an area element with corresponding div to display the value
 */
function mapInit(){
    //csv with [ID, Coords] of districts
    const csvAreaCoordsUrl = 'https://gist.githubusercontent.com/SigridKlinger/63626cd1fd3d02496381c033f10ed56b/raw/csv';

    d3.csv(csvAreaCoordsUrl).then(data => {
        data.forEach(function(d) {
            //Replace all spaces with ,
            let coords = d.Coords.replace(/ /g, ",");
            //Create area element
            let area = $('<area />', {
                id      : "mapDistrict" + d.ID,
                'class' : "mapDistrict",
                shape   : "poly",
                coords  : coords,
                href    : "#" + d.ID,
                alt     : "District " + d.ID + " of Munich",
            });
            //Create div element
            let helper = $('<div />', {
                id      : "mapDistrictHelper" + d.ID,
                'class' : "mapDistrictHelper",
            });
            //Hide helper to not show
            helper.hide();
            //Add helper and area to DOM
            $("#mapContainer").append(helper);
            $("#map").append(area);
        });
        //Add "maphilight" for making it possible to color areas
        $(".mapDistrict").data('maphilight', {'strokeWidth': 4, 'fillOpacity':0.6});
        //All areas added to DOM
        initialized = true;
    });
    //Start coloring the districts
    possibleToColor();
   
}

/**
 * Sets the value to be shown when hovering on the map
 * @param d data
 */
function initMapHelper(d){
    let dataID = $("#mapDistrictHelper" + d.ID);
    if (value === "Average Duration of Stay" || value === "Overnight Stays"){
        dataID.text(commaSeparateNumber(oneDecimal(d[value]) + " nights"));
    } else if (value === "Average Occupancy Rate"){
        dataID.text(commaSeparateNumber(oneDecimal(d[value]) + "%"));
    } else {
        dataID.text(commaSeparateNumber(oneDecimal(d[value])));
    }

}

/**
 * Undoes the highlight of all districts on the map
 */
function undoHighlightMap(){
    for(let i = 0; i < csvDataDistricts.length; i++){
        let mapD = $("#mapDistrict" + i);
        mapD.removeClass("selected");
        mapD.removeClass("selectedLegend");
    }

}
