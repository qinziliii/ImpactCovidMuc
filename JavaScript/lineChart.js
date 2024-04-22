//setting the year
var yearEnd;
// set the dimensions and margins of the graph
var margin = {top: 10, right: 15, bottom: 15, left: 80},
    width = 1150 - margin.left - margin.right,
    height = 325 - margin.top - margin.bottom;

var nameOfCategory = "number";

//put under the click category, 
function checkCategory(input) {
    switch (value) {
        case "Open Accommodations":
            nameOfCategory = "number";
            break;
        case "Beds Offered":
            nameOfCategory = "Beds_Offered";
            break;
        case "Arrivals":
            nameOfCategory = "Arrivals";
            break;
        case "Overnight Stays":
            nameOfCategory = "Overnight_Stays";
            break;
        case "Average Occupancy Rate":
            nameOfCategory = "AverageOccupancy_Rate";
            break;
        case "Average Beds Offered":
            nameOfCategory = "AverageBeds_Offered";
            break;
        case "Average Duration of Stay":
            nameOfCategory = "AverageDurationof_Stay";
            break;
        default:
            nameOfCategory = "Revenue";
    }
}

var svg;
var x, y;
let dataMax;

function makeLine() {

    // append the svg object to the body of the page
    svg = d3.select("#lineChartSVG2")
        .append("svg")
        .attr("id", "actualLineChartSVG")
        .attr("viewBox", `0 0 1225 450`)
        .append("g")
        .attr("id", "lineChartG")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //reading data
    d3.csv(lineChartURL).then(data => {
        data = data.filter(function (d) {
            return d.ID != 0
        })
        data.forEach(
            d => {
                //parsing string into numbers
                d[nameOfCategory] = +d[nameOfCategory];
                d.year = new Date(d.year);
                d.area = d.area;
            });

        x = d3.scaleTime()
            .domain(d3.extent(data, function (d) {
                // console.log(d.year);
                return d.year;

            }))
            .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        dataMax = d3.max(data, function (d) {return +d[nameOfCategory];})
        // Add Y axis
        y = d3.scaleLinear()
            .domain([0, dataMax])
            .range([height, 0]);
        svg.append("g")
            .attr("id", "YAxis")
            .call(d3.axisLeft(y))
            .selectAll(".tick line");
    })
}