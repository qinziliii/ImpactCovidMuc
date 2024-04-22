/*
Waits till the districts are initialized to start coloring and giving mouse interaction
*/
function possibleToColor() {
    if (initialized) {
        setQuartiles();
        setMapHovering();
        setMapClicking();

    } else
        setTimeout(possibleToColor, 100);
}

/*
Sets the quartiles according to the data
 */
function setQuartiles() {
    d3.csv(csvUrl).then(data => {
        csvDataMunich = data;
        csvDataDistricts = data.splice(1, data.length);
        tableInit(value);

        //Sort the array to get min, max, quartile
        sortedValues = [];
        csvDataDistricts.forEach(function (d) {
            d[value] = +d[value];
            if(!isNaN(d[value])){
                sortedValues.push(parseFloat(d[value]));

            }
        });
        sortedValues.sort(function (a, b) {
            return a - b
        });

        max = d3.max(csvDataDistricts, function (d) {
            return d[value];
        });
        min = d3.min(csvDataDistricts, function (d) {
            return d[value];
        });

        quartile05 = d3.quantile(sortedValues, 0.5);
        quartile025 = d3.quantile(sortedValues, 0.25);
        quartile075 = d3.quantile(sortedValues, 0.75);

        csvDataDistricts.forEach(colorDistricts);
        csvDataDistricts.forEach(initMapHelper);
        legendInit();

        if(firstTimeLoad){
            firstTimeLoad = false;
            highlightDistrict($("#mapDistrict1"), yellowNoHashColor, true, "black");
            $("#mapDistrict1").addClass("selected");
            highlightTable(1, yellowColor, "bolder");
            addingLine(1)
        }
    });
}

/*
Colors the districts according to their quartile
*/
function getQuartileColor(d) {
    let color;
    if (isNaN(d[value]))
        color = colorArray[0]
    else if (d[value] <= quartile025)
        color = colorArray[1]
    else if (d[value] > quartile025 && d[value] <= quartile05)
        color = colorArray[2]
    else if (d[value] > quartile05 && d[value] <= quartile075)
        color = colorArray[3]
    else
        color = colorArray[4]
    return color;
}

function colorDistricts(d){
    let color = getQuartileColor(d)
    let dataID = $("#mapDistrict" + d.ID);
    //if element exists and mouse is not hovering over it
    let id = parseInt(d.ID) + 1
    let isHoverMap = !(dataID.length && $("#mapDistrict" + d.ID + ":hover").length === 0);
    let isHoverTable = !(dataID.length && $('#mainTable tr:nth-child(' + id +'):hover').length === 0);
    let isClicked = dataID.hasClass("selected") || dataID.hasClass("selectedLegend");
    let isLegendHover = dataID.hasClass("legendHover");
    if ((!isHoverMap && !isClicked) && !isHoverTable && !isLegendHover && d.ID != 0){
        for(let i = 0; i < colorArray.length; i++){
            dataID.removeClass(colorArray[i]);
        }
        dataID.addClass(color)
        dataID.data('maphilight', {
            'fillColor': color,
            'alwaysOn': true,
            "strokeColor": "black",
            "strokeWidth": 4,
            "fillOpacity": 1
        }).trigger('alwaysOn.maphilight');
    }
    if ((!isHoverMap && !isClicked) && !isHoverTable && !isLegendHover && d.ID == 0){
        dataID.data('maphilight', {
            'fillColor': "white",
            'alwaysOn': false,
            "strokeColor": "black",
            "strokeWidth": 4,
            "fillOpacity": 0
        }).trigger('alwaysOn.maphilight');
    }
}
/*
Highlight district in given color, stroke color
*/
function highlightDistrict(element, color, on, strokeColor) {
    element.data('maphilight', {
        'fillColor': color,
        'alwaysOn': on,
        "strokeColor": strokeColor,
        "strokeWidth": 10,
        "fillOpacity": 1
    }).trigger('alwaysOn.maphilight');
}

/**
 * Highlights Munich as a whole
 */
function highlightMunich(){
    $("#mapDistrict0").data('maphilight', {
        'fillColor': "FFFFFF",
        'alwaysOn': true,
        "strokeColor": yellowNoHashColor,
        "strokeWidth": 10,
        "fillOpacity": 0.5
    }).trigger('alwaysOn.maphilight');
}