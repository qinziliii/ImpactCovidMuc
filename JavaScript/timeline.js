let v = 2021;
let maxYear = 2021;
let sliderValue = 2021;

function changeValue(year) {
    v = year;
    csvUrl = eval("districts"+v+"URL");
    setQuartiles();

    document.getElementById("rangeValue").innerText = v
    document.getElementById("slider").value = v
    for (let i = 2014; i < 2022; i++) {
        tl = "tl_"+i;
        if (i == v) {
            document.getElementById(tl).style.color= yellowColor;
        } else {
            document.getElementById(tl).style.color= greyFontColor;
        }
    }
}

function slideYear(newValue) {
    sliderValue = newValue;
    changeValue(newValue)

   /* if (v < newValue) {
        for (let i = 0; i < newValue-v; i++) {
            (function(j){
                setTimeout(function(){
                    changeValue(v+1);
                },500*j)
            })(i);
        };
        
    } else {
        for (let i = 0; i < v-newValue; i++) {
            (function(j){
                setTimeout(function(){
                    changeValue(v-1);
                },500*j)
            })(i);
        }
    }

*/
}


function sliderAnimation(){
    console.log(v);
    console.log(sliderValue);
    console.log(maxYear)
    if (sliderValue <= maxYear) {
            for (let i = 0; i <= maxYear-v; i++) {
                console.log(maxYear - v);
                (function(j){
                    setTimeout(function(){
                        console.log(parseInt(sliderValue) + 1);
                        changeValue(parseInt(sliderValue)+i);
                    },500*j)
                })(i);
            };

    }
}
