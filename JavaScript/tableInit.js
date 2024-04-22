/**
 * Creates a table with the districts and their current corresponding values
 * @param valueName current name of the selected category
 */
function tableInit(valueName){
    $("#tableHeaderValue").text(valueName);

    $("#mainTable").children().remove();

    let tr = d3.select('#mainTable').selectAll('tr')
        .data(csvDataMunich.concat(csvDataDistricts)).enter()
        .append('tr')

    tr.append('td').html(function(m) { return m.ID; });
    tr.append('td').html(function(m) { return m.District; });
    tr.append('td').html(function(m) { return commaSeparateNumber(oneDecimal(m[value]))});

    setTableInteractive();

}

/**
 * Changes the values in the table
 */
function changeTableValues(){
    for(let i = 1; i < $("#mainTable").children().length + 1; i++){
        let data = csvDataMunich.concat(csvDataDistricts)
        let text = oneDecimal(data[i-1][value]);
        text = commaSeparateNumber(text);
        $("#mainTable tr:nth-child("+i+") td:nth-child(3)").text(text);
    }
}