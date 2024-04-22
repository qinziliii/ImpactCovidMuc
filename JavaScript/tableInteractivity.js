/**
 * Makes the table clickable and hoverable and highlights the corresponding map district and line chart
 */
function setTableInteractive() {
    const tableColumn = $("#mainTable > tr");

    //On mouseEnter highlight district and show value in table
    tableColumn.mouseenter(function () {
        let number = parseInt($(this).children()[0].innerHTML);
        //table highlight color

        highlightTable(number, yellowColor, "normal");
        let mapDistrict = $("#mapDistrict" + number);
        if (!(mapDistrict.hasClass("selected") || mapDistrict.hasClass("selectedLegend"))) {
            if (number === 0) {
                highlightMunich();
            } else {
                //only border highlight color
                let color = mapDistrict.attr("class").slice(-6)
                highlightDistrict(mapDistrict, color, true, yellowNoHashColor);
            }
        } else {
            //map highlight+select color
            highlightDistrict(mapDistrict, yellowNoHashColor, true, greyNoHashColor);
        }

    });

    //On mouseLeave de-highlight district and un-show value in table
    tableColumn.mouseleave(function () {
        //table number = district number
        let number = parseInt($(this).children()[0].innerHTML);
        let mapDistrict = $("#mapDistrict" + number);
        //if this district is selected, mouseleave keep highlighted.
        if (!(mapDistrict.hasClass("selected") || mapDistrict.hasClass("selectedLegend"))) {
            highlightTable(number, greyFontColor, "normal");
            d3.csv(csvUrl).then(data => {
                data.forEach(colorDistricts)
            });
        } else {
            highlightDistrict(mapDistrict, yellowNoHashColor, true, "black");
            highlightTable(number, yellowColor, "bolder");

        }
    });

    //On mouseClick highlight table
    tableColumn.click(function () {
        let number = parseInt($(this).children()[0].innerHTML);
        let mapDistrict = $("#mapDistrict" + number);
        if (!(mapDistrict.hasClass("selected") || mapDistrict.hasClass("selectedLegend"))) {
            highlightTable(number, yellowColor, "bolder");
            highlightDistrict(mapDistrict, yellowNoHashColor, true, "black");
            mapDistrict.addClass("selected");
            addingLine(number);
        } else {
            deletingLine(number)

            mapDistrict.removeClass("selected");
            mapDistrict.removeClass("selectedLegend");
            highlightTable(number, yellowColor, "normal");
            d3.csv(csvUrl).then(data => {
                data.forEach(colorDistricts)
            });
            if (number === 0) {
                highlightMunich();
            } else {
                let color = getQuartileColor(csvDataDistricts[number - 1]);
                highlightDistrict(mapDistrict, color, true, yellowNoHashColor);
            }
        }
    });
}