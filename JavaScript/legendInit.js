/**
 * Initializes a legend with 4 quartiles an a no-info row
 */
function legendInit() {
    $("#legend-svg").children().remove();
    //If first time initializing legend
    if ($(".legendQuant").length === 0) {
        legendNumbers();

        let ytranslate = 4 * 20;
        let size = $(".legendQuantile0").width();
        d3.select(".legendCells").append("g")
            .attr("id", "cellNoInfo")
            .attr("transform", "translate(0, " + ytranslate + ")")
            .append("rect")
            .attr("width", size)
            .attr("height", size)
            .attr("class", "swatch");

        d3.select("#cellNoInfo").append("text")
            .attr("transform", "translate(25, 12.5)")
            .attr("id", "noInfoLabel")
        $("#noInfoLabel").text("No Info");
    } else {
        legendNumbers();
    }
    colorLegend();
    setLegendHovering();
    setLegendClicking();
}

/**
 * Colors the squares of the legend for the corresponding quartile
 */
function colorLegend() {
    for (let i = 0; i < 5; i++) {
        $(".legendQuantile" + i).css({"fill": "#" + colorArray[i + 1]});
    }
    $("#cellNoInfo rect").css("fill", "#" + colorArray[0])
}

/**
 * Makes the legend shows the quartiles numbers
 */
function legendNumbers() {
    //Calculates wrong quartiles, but changed later in code
    let quantize = d3.scaleQuantize()
        .domain([min, max])
        .range(d3.range(4).map(function (i) {
            return "legendQuantile" + i;
        }))
    ;

    let svg = d3.select("#legend-svg");

    svg.append("g")
        .attr("class", "legendQuant")
        .attr("transform", "translate(20,35)");

    let legend = d3.legendColor()
        .labelFormat(d3.format(".1f"))
        .useClass(true)
        .title("Legend")
        .titleWidth(100)
        .scale(quantize)
        .ascending(true);

    svg.select(".legendQuant")
        .call(legend);

    //Change text to actual quartiles
    for (let i = 0; i < 4; i++) {
        $(".legendQuantile" + i).next().text(quantileText(i));
    }
}

/**
 * Returns the actual quantiles as text
 * @param i number of the row
 * @returns {string} - actual quantile values
 */
function quantileText(i) {
    let text;
    let pos;
    switch(i){
        case 0:
            text = commaSeparateNumber(oneDecimal(min)) + " to " + commaSeparateNumber(oneDecimal(quartile025));
            break;
        case 1:
            pos = $.inArray(getValueInArray(quartile025), sortedValues)
            text = commaSeparateNumber(oneDecimal(sortedValues[pos + 1])) + " to " + commaSeparateNumber(oneDecimal(quartile05));
            break;
        case 2:
            pos = $.inArray(getValueInArray(quartile05), sortedValues)
            text = commaSeparateNumber(oneDecimal(sortedValues[pos + 1])) + " to " + commaSeparateNumber(oneDecimal(quartile075));
            break;
        default:
            pos = $.inArray(getValueInArray(quartile075), sortedValues)
            text = commaSeparateNumber(oneDecimal(sortedValues[pos + 1])) + " to " + commaSeparateNumber(oneDecimal(max));
    }
    return text;
}

/**
 * returns the value in an array at a given place
 * @param quartile value to search for
 * @returns {number} place in the array
 */
function getValueInArray(quartile){
    let tmp = 0;

    for(let j = 0; tmp < quartile; j++){
        tmp = sortedValues[j];
    }
    return tmp
}