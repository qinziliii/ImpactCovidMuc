let selectedData = [];
function addingLine(theID) {
    checkCategory(value);
    d3.csv(lineChartURL).then(data => {
        /*Filter the selected ID, and category is also needed to be filtered, a specific row!!! 
        selected: drawing the line, not selected: delecting the line
        */
        data = data.filter(function (d) {
            return d.ID == theID
        })

        data.forEach(
            d => {
                //parsing string into numbers
                d[nameOfCategory] = +d[nameOfCategory];
                d.year = new Date(d.year);
                d.area = d.area;
                d.ID = +d.ID;
            });

        let currentMax = d3.max(data, function (d) {return +d[nameOfCategory];})
        selectedData.push(currentMax);
        dataMax = Math.max.apply(Math, selectedData);
        redrawYAxis();

        const lineCreater = d3.line()
            //x y cordinator
            .x(d => x(d.year))
            .y(d => y(d[nameOfCategory]));

        // Add the lines
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", yellowColor)
            .attr("stroke-width", 2)
            .attr("d", lineCreater(data))
            .attr("id", "line" + theID)
            .attr("class", "lineInChart lineMax"+currentMax);

        //Add dots one the lines
        svg.append("g").selectAll("circle").data(data)
            .enter().append("circle")
            .attr("cy", d => y(d[nameOfCategory]))
            .attr("cx", d => x(d.year))
            .attr("r", 7)
            .attr("id", "dots" + theID)
            .attr("class", "dotsInChart")
            .append("title")
            .text(d => d[nameOfCategory]);
        setLineChartInteractive($(".dotsInChart"));
        setLineChartInteractive($(".lineInChart"));
    })
}
let redrawn  = true;

/**
 * Deletes a line with its dots
 * @param id - id of the district
 */
function deletingLine(id) {
    if (redrawn) {
        redrawn = false;
        let number = parseInt($("#line" + id).attr("class").replace(/\D/g, ""));
        const index = selectedData.indexOf(number);
        if (index > -1) { // only splice array when item is found
            selectedData.splice(index, 1); // 2nd parameter means remove one item only
        }
        dataMax = Math.max.apply(Math, selectedData);
        removeLine2(id);
        redrawYAxis();
    } else {
        setTimeout(deletingLine, 10, id);
    }
}

function removeLine2(id){
    let dots = $("#dots" + id);
    let line = $("#line" + id);
    dots.parent().remove();
    dots.remove();
    line.remove();
}

function redrawYAxis(){
    if(dataMax >= 0){
        $("#YAxis").remove();
        y = d3.scaleLinear()
            .domain([0, dataMax])
            .range([height, 0]);
        svg.append("g")
            .attr("id", "YAxis")
            .call(d3.axisLeft(y))
            .selectAll(".tick line");
        $(".lineInChart").each(function () {
            redrawLines(parseInt($(this).attr("id").replace(/\D/g, "")));
            removeLine2(parseInt($(this).attr("id").replace(/\D/g, "")))
        })

    } else {
        redrawn = true;
    }

}

function redrawLines(theID){
    checkCategory(value);
    d3.csv(lineChartURL).then(data => {
        /*Filter the selected ID, and category is also needed to be filtered, a specific row!!!
        selected: drawing the line, not selected: delecting the line
        */
        data = data.filter(function (d) {
            return d.ID == theID
        })

        data.forEach(
            d => {
                //parsing string into numbers
                d[nameOfCategory] = +d[nameOfCategory];
                d.year = new Date(d.year);
                d.area = d.area;
                d.ID = +d.ID;
            });
        let currentMax = d3.max(data, function (d) {return +d[nameOfCategory];})
        const lineCreater = d3.line()
            //x y cordinator
            .x(d => x(d.year))
            .y(d => y(d[nameOfCategory]));

        // Add the lines
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", yellowColor)
            .attr("stroke-width", 2)
            .attr("d", lineCreater(data))
            .attr("id", "line" + theID)
            .attr("class", "lineInChart lineMax"+currentMax);

        //Add dots one the lines
        svg.append("g").selectAll("circle").data(data)
            .enter().append("circle")
            .attr("cy", d => y(d[nameOfCategory]))
            .attr("cx", d => x(d.year))
            .attr("r", 7)
            .attr("id", "dots" + theID)
            .attr("class", "dotsInChart")
            .append("title")
            .text(d => d[nameOfCategory]);
        setLineChartInteractive($(".dotsInChart"));
        setLineChartInteractive($(".lineInChart"));
        redrawn = true;
    });
}
