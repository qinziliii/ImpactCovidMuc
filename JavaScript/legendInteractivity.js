let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
let hex = function (x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

/**
 * Convert rgb color code to hex color code
 * @param rgb - string of rgb color code
 * @returns {string} - hex color code
 */
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/**
 * makes the whole legend clickable to highlight the districts in the map, the table and show in the line chart
 */
function setLegendClicking() {
    const legendRow = $(".cell");
    const legendRowNoInfo = $("#cellNoInfo");
    makeLegendClick(legendRow);
    makeLegendClick(legendRowNoInfo);
}

/**
 * makes a row in the legend clickable to highlight the districts in the map, the table and show in the line chart
 * @param legendRow - row to make clickable
 */
function makeLegendClick(legendRow) {
    legendRow.click(function () {
        //Get color of selected row
        let color = $(this).children().css("fill");
        let districts = [];
        let counter = 0;
        color = rgb2hex(color);
        for (let i = 1; i <= csvDataDistricts.length; i++) {
            let mapD = $("#mapDistrict" + i);
            if (mapD.hasClass(color)) {
                districts.push(mapD);
            }
        }
        for (let i = 0; i < districts.length; i++) {
            if (districts[i].hasClass("selectedLegend")) {
                counter++;
            }
        }

        if (counter !== 0) {
            for (let i = 0; i < districts.length; i++) {
                let number = parseInt(districts[i].attr("id").replace(/\D/g, ""));
                districts[i].addClass("legendHover");
                districts[i].removeClass("selectedLegend");
                d3.csv(csvUrl).then(data => {
                    data.forEach(colorDistricts)
                });
                let color = getQuartileColor(csvDataDistricts[number - 1]);
                highlightDistrict(districts[i], color, true, yellowNoHashColor);
                highlightTable(number, yellowColor, "normal");
                deletingLine(number);
            }
        } else {
            for (let i = 0; i < districts.length; i++) {
                let number = parseInt(districts[i].attr("id").replace(/\D/g, ""));
                highlightTable(number, yellowColor, "bolder");
                highlightDistrict(districts[i], yellowNoHashColor, true, "black");
                districts[i].addClass("selectedLegend");
                districts[i].removeClass("selected");
                if (!$("#line" + number).length) {
                    addingLine(number);
                }
            }
        }
    });
}

/**
 * makes the whole legend hoverable to highlight the districts in the map and the table
 */
function setLegendHovering() {
    const legendRow = $(".cell");
    const legendRowNoInfo = $("#cellNoInfo");
    makeLegendHover(legendRow);
    makeLegendHover(legendRowNoInfo);
}

/**
 * makes a row of the legend hoverable to highlight the districts in the map and the table
 * @param legendRow - row to make hoverable
 */
function makeLegendHover(legendRow) {
    //On mouseEnter highlight district and show value in table
    legendRow.mouseenter(function () {
        let color = $(this).children().css("fill");
        color = rgb2hex(color);
        for (let i = 1; i < 26; i++) {
            let mapD = $("#mapDistrict" + i);
            if (mapD.hasClass(color) && !((mapD.hasClass("selected") || mapD.hasClass("selectedLegend")))) {
                mapD.addClass("legendHover");
                highlightDistrict(mapD, color, true, yellowNoHashColor);
                highlightTable(i, yellowColor, "normal");
            } else if (mapD.hasClass(color) && ((mapD.hasClass("selected") || mapD.hasClass("selectedLegend")))) {
                highlightDistrict(mapD, yellowNoHashColor, true, greyNoHashColor);
                highlightTable(i, yellowColor, "normal");
            }
        }
    });
//On mouseLeave de-highlight district and un-show value in table
    legendRow.mouseleave(function () {
        let color = $(this).children().css("fill");
        color = rgb2hex(color);
        for (let i = 1; i < 26; i++) {
            let mapD = $("#mapDistrict" + i);
            if (mapD.hasClass(color) && !(mapD.hasClass("selected") || mapD.hasClass("selectedLegend"))) {
                mapD.removeClass("legendHover");
                highlightTable(i, greyFontColor, "normal");
                d3.csv(csvUrl).then(data => {
                    data.forEach(colorDistricts)
                });
            } else if (mapD.hasClass(color) && (mapD.hasClass("selected") || mapD.hasClass("selectedLegend"))) {
                highlightDistrict(mapD, yellowNoHashColor, true, "black");
                highlightTable(i, yellowColor, "bolder");
                mapD.removeClass("legendHover");
                d3.csv(csvUrl).then(data => {
                    data.forEach(colorDistricts)
                });
            }
        }
    });
}