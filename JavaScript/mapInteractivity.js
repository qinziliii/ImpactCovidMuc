/**
 * Makes the map districts clickable and highlights the corresponding table entry and makes a line in the chart
 */
function setMapClicking(){
    const mapPart = $(".mapDistrict");
    mapPart.click(function () {
        let number = parseInt($(this).attr("id").replace(/\D/g, ""));
        // if it is selected, after click it will be not.
        if ($(this).hasClass("selected") || $(this).hasClass("selectedLegend")) {
            $(this).removeClass("selected");
            $(this).removeClass("selectedLegend");
            highlightTable(number, yellowColor, "normal");
            d3.csv(csvUrl).then(data => {
                data.forEach(colorDistricts)
            });
            let color = getQuartileColor(csvDataDistricts[number-1]);
            highlightDistrict($(this), color, true, yellowNoHashColor);
            deletingLine(number)
        } else {
            if (!$("#line" + number).length) {
                addingLine(number);
            }
            highlightTable(number, yellowColor, "bolder");
            highlightDistrict($(this), yellowNoHashColor, true, "black");
            $(this).addClass("selected");
        }
    });
}

/**
 * Makes the map districts hoverable and highlights the corresponding table entry
 */
function setMapHovering() {
    const mapPart = $(".mapDistrict");
    //On mouseEnter highlight district and show value in table
    mapPart.mouseenter(function () {
        if (!($(this).hasClass("selected") || $(this).hasClass("selectedLegend"))) {
            let color = $(this).attr("class").slice(-6)
            highlightDistrict($(this), color, false, yellowNoHashColor);
            let number = parseInt($(this).attr("id").replace(/\D/g, ""));
            highlightTable(number, yellowColor, "normal");
        }
        else{
            highlightDistrict($(this), yellowNoHashColor, false, greyNoHashColor);
            let number = parseInt($(this).attr("id").replace(/\D/g, ""));
            highlightTable(number, yellowColor, "normal");
        }
    });

    //On mouseLeave de-highlight district and un-show value in table
    mapPart.mouseleave(function () {
        //Before mouseleave check if the district is selected
        if ($(this).hasClass("selected")  || $(this).hasClass("selectedLegend")) {
            highlightDistrict($(this), yellowNoHashColor, true, "black");
            let number = parseInt($(this).attr("id").replace(/\D/g, ""));
            highlightTable(number, yellowColor, "bolder");

            d3.csv(csvUrl).then(data => {
                data.forEach(colorDistricts)
            });
            $("#mapDistrictHelper" + number).hide();
        }
        else {
            let number = parseInt($(this).attr("id").replace(/\D/g, ""));
            highlightTable(number, greyFontColor, "normal");
            d3.csv(csvUrl).then(data => {
                data.forEach(colorDistricts)
            });
            $("#mapDistrictHelper" + number).hide();
        }
    });

    //On mouse moving show the value of the district near the mouse
    mapPart.mousemove(function (event) {
        let id = $(this).attr("id").replace(/\D/g, "");
        let helper = $("#mapDistrictHelper" + id);
        helper.show();
        let width = helper.width() / 2 + 7;
        let height = helper.height() + 15;
        helper.css({"top": event.pageY - height + "px", "left": event.pageX - width + "px"});
    });
}
