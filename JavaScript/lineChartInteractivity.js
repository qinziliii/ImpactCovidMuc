/**
 * Makes the line chart hoverable and highlights the corresponding map district and table entry
 */
function setLineChartInteractive(obj) {
    obj.mouseenter(function () {
        let number = parseInt($(this).attr("id").replace(/\D/g, ""));
        //table highlight color
        highlightTable(number, yellowColor, "normal");
        let mapDistrict = $("#mapDistrict" + number);
        highlightDistrict(mapDistrict, yellowNoHashColor, true, greyNoHashColor);
        highlightLine(number, greyFontColor);
    });

    obj.mouseleave(function () {
        let number = parseInt($(this).attr("id").replace(/\D/g, ""));
        let mapDistrict = $("#mapDistrict" + number);
        highlightDistrict(mapDistrict, yellowNoHashColor, true, "black");
        highlightTable(number, yellowColor, "bolder");
        highlightLine(number,yellowColor);
    });

    if(obj === $(".dotsInChart")){
        mapPart.mousemove(function (event) {
            let number = parseInt($(this).attr("id").replace(/\D/g, ""));
            let helper = $("#lineHelper" + number);
            helper.show();
            let width = helper.width() / 2 + 7;
            let height = helper.height() + 15;
            helper.css({"top": event.pageY - height + "px", "left": event.pageX - width + "px"});
        });
    }
}

/**
 * Changes the color of a line in the line chart
 * @param id - id of dit´strict
 * @param color - color to change to
 */
function highlightLine(id, color) {
    $("#line" + id).css("stroke", color);
}