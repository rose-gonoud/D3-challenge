// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 55
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

var healthData = "https://raw.githubusercontent.com/rose-gonoud/D3-challenge/master/assets/data/data.csv"

d3.csv(healthData).then(function(data) {
    console.log(data);

    data.forEach(datum => {

        // cast basically everything as an int bc these are numbers, might be important
        datum.id = +datum.id
        datum.poverty = +datum.poverty
        datum.povertyMoe = +datum.povertyMoe
        datum.age = +datum.age
        datum.ageMoe = +datum.ageMoe
        datum.income = +datum.income
        datum.incomeMoe = +datum.incomeMoe
        datum.healthcare = +datum.healthcare
        datum.healthcareLow = +datum.healthcareLow
        datum.healthcareHigh = +datum.healthcareHigh
        datum.obesity = +datum.obesity
        datum.obesityLow = +datum.obesityLow
        datum.obesityHigh = +datum.obesityHigh
        datum.smokes = +datum.smokes
        datum.smokesLow = +datum.smokesLow
        datum.smokesHigh = +datum.smokesHigh

    });

    // take the max then out of each list
    var yMaxHealthcare = d3.max(data.map(datum => datum.healthcare));
    console.log(yMaxHealthcare);
    var xMaxPoverty = d3.max(data.map(datum => datum.poverty));
    console.log(xMaxPoverty);

    // scale y to chart height
    var yScale = d3.scaleLinear()
    .domain([0, yMaxHealthcare])
    .range([chartHeight, 0]);

    // scale x to chart width
    var xScale = d3.scaleLinear()
    .domain([0, xMaxPoverty])
    .range([0, chartWidth]);

    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    // set y to the y axis
    chartGroup.append("g")
    .call(yAxis);

    // Append Data to chartGroup
    chartGroup.selectAll(".scatterGroup")
    .data(data)
    .enter()
    .append("g")
    .classed("scatterGroup", true)
    .attr("transform", d => `translate(${xScale(d.poverty)}, ${yScale(d.healthcare)})`)
    .enter()

    scatterElements = chartGroup.selectAll(".scatterGroup")
    .append("circle")
    .classed("scatter", true)
    .attr("r", 15)
    .attr("fill", "blue")
    .attr("opacity", 0.3)
    .enter()

    labels = chartGroup.selectAll(".scatterGroup")
    .append("text")
    .classed("scatter", true)
    .text(d => d.abbr)
    .attr("text-anchor", "middle")
    .attr("y", 4)
    .style("font-size", "0.8rem")

    xaxis = chartGroup.append("g")
    .attr("transform", d => `translate(${chartWidth / 2}, ${chartHeight + 40})`)
    .append("text").text("% of Residents in Poverty")
    .attr("text-anchor", "middle")

    yaxis = chartGroup.append("g")
    .attr("transform", d => `translate(-40, ${chartHeight / 2}) rotate(270)`)

    .append("text").text("% of Residents Without Health Insurance")
    .attr("text-anchor", "middle")


//     // Step 6: Initialize tool tip
//     // ==============================
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
//       });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("click", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Number of Billboard 100 Hits");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("Hair Metal Band Hair Length (inches)");
//   }).catch(function(error) {
//     console.log(error);

});
