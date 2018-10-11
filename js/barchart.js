import {appState, stateIDtoCode} from './data-manager.js';
import {dispatch, stateIDFormat} from './setup.js';

/////////////////////////////////////////////////////////////
  ////////////////////// Bar Chart ////////////////////////////
  /////////////////////////////////////////////////////////////
//adapted from Nadieh Bremer: https://www.visualcinnamon.com/2016/07/brush-bar-chart-d3.html
export default function createBarChart(){

var chartSvg,
              defs,
              gBrush,
              brush,
              main_xScale,
              mini_xScale,
              main_yScale,
              mini_yScale,
              main_yZoom,
              main_xZoom,
              main_xAxis,
              main_yAxis,
              mini_width,
              main_height,
              textScale,
              barChartData, 
              numberFormat, 
              measureType;

var main_margin = {top: 10, right: 10, bottom: 20, left: 50},
        main_width = 400 - main_margin.left - main_margin.right;
        
        main_height = 220 - main_margin.top - main_margin.bottom;

    var mini_margin = {top: 10, right: 10, bottom: 20, left: 50},
        mini_height = 100 - mini_margin.top - mini_margin.bottom;
        mini_width = 400 - mini_margin.left - mini_margin.right;

    chartSvg = d3.select("#chart").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + (main_width + main_margin.left + main_margin.right) + " " + (main_height + main_margin.bottom + main_margin.top + mini_height + mini_margin.bottom + mini_margin.top));
        
        
 if (appState.ieVersion <= 11 && appState.ieVersion > 0) {
        chartSvg
            .attr("height", main_height + main_margin.bottom + main_margin.top + mini_height + mini_margin.bottom + mini_margin.top)
            .attr("width", main_width + main_margin.left + main_margin.right);
        
        d3.select("#chart").attr("class", "six columns");
    } else {
        chartSvg
            .attr("class", "svgWrapper svg-content-responsive");
    }

    var mainGroup = chartSvg.append("g")
            .attr("class","mainGroupWrapper")
            .attr("transform","translate(" + main_margin.left + "," + (mini_height + mini_margin.top + mini_margin.bottom + main_margin.top) + ")")
            .append("g") //another one for the clip path - due to not wanting to clip the labels
            .attr("clip-path", "url(#clip)")
            .style("clip-path", "url(#clip)")
            .attr("class","mainGroup")

    var miniGroup = chartSvg.append("g")
            .attr("class","miniGroup")
            .attr("transform","translate(" + mini_margin.left + "," + mini_margin.top + ")");

    var brushGroup = chartSvg.append("g")
            .attr("class","brushGroup")
            .attr("transform","translate(" + mini_margin.left + "," + mini_margin.top + ")");

    /////////////////////////////////////////////////////////////
    ////////////////////// Initiate scales //////////////////////
    /////////////////////////////////////////////////////////////

    main_yScale = d3.scaleLinear().range([main_height,0]);
    mini_yScale = d3.scaleLinear().range([0, mini_height]);

    main_xScale = d3.scaleBand().range([0, main_width]).paddingInner(0.2).paddingOuter(0);
    mini_xScale = d3.scaleBand().range([0, mini_width]).paddingInner(0.2).paddingOuter(0);

    //Based on the idea from: http://stackoverflow.com/questions/21485339/d3-brushing-on-grouped-bar-chart
    main_xZoom = d3.scaleLinear()
        .range([0, main_width])
        .domain([0, main_width]);
    
// text label for the y axis
  // d3.select(".mainGroupWrapper").append("text")             
  //     .attr("transform",
  //           "translate(" + -42 + " ," + 
  //                          (main_height/2) + "), rotate(-90)")
  //     .classed("y-axis-label", true)
  //     .style("text-anchor", "middle")
  //     .text("Percent of Physicians");

      // text label for the y axis
  d3.select(".mainGroupWrapper").append("text")             
      .attr("transform",
            "translate(" + 0 + " ," + 
                           (-10) + ")")
      .classed("chart-title", true)
      .style('font-weight', 600)
      .style('font-size', "12px")
      //.style("text-anchor", "middle")
      .text("Chart title");
 
    //Create y axis object
    main_yAxis = d3.axisLeft()
      .scale(main_yScale)
      .ticks(4)
      //.tickSize(0)
      .tickSizeOuter(0);

    //Add group for the y axis
    d3.select(".mainGroupWrapper").append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + -4 + "," + 0 + ")");

    //Create x axis object
    main_xAxis = d3.axisBottom()
      .scale(main_xScale)
      .tickSize(0)
      .tickSizeOuter(0);

    //Add group for the x axis
    mainGroup.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,"+main_height+")");


  brush = d3.brushX()
        //.x(mini_xScale)
        .extent([[0,0], [mini_width, mini_height]])
        //.move([mini_xScale(barChartData[0].state), mini_xScale(barChartData[brushExtent].state)])
        .on("start brush end", brushmove);
        //.on("brushend", brushend);

    //Set up the visual part of the brush
    gBrush = d3.select(".brushGroup").append("g")
      .attr("class", "brush")
      .call(brush);

    gBrush.selectAll("rect")
      .attr("height", mini_height);

    //On a click recenter the brush window
    gBrush.select(".overlay")
      .on("mousedown.brush", brushcenter)
      .on("touchstart.brush", brushcenter);

    ///////////////////////////////////////////////////////////////////////////
    /////////////////// Create a rainbow gradient - for fun ///////////////////
    ///////////////////////////////////////////////////////////////////////////

   defs = chartSvg.append("defs")
/* 
    //Create two separate gradients for the main and mini bar - just because it looks fun
    createGradient("gradient-rainbow-main", "60%");
    createGradient("gradient-rainbow-mini", "13%");
*/
    //Add the clip path for the main bar chart
    defs.append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("y", 0)
      .attr("width", main_width)
      .attr("height", main_height + main_margin.bottom);



    textScale = d3.scaleLinear()
      .domain([15,50])
      .range([12,6])
      .clamp(true);




function drawBarChart(){

barChartData = appState.data;

if(!(appState.calculation=='retention' || appState.calculation=='netToAll')){
barChartData = barChartData.filter(function(d){return d.state!= appState.stateID;})
}

 if (appState.calculation == "net" || appState.calculation == "netToAll"){
                  measureType = "count";
                        } else {
                  measureType = "measure";
                        }


 barChartData.sort(function(a,b) { return b[measureType] - a[measureType]; });

    //Update the scales
    if (appState.calculation=='net' || appState.calculation=='netToAll') {


        var currentRange = d3.max(barChartData, function(d) { return Math.abs(d[measureType]); });
        main_yScale.domain([-currentRange, currentRange]);
        mini_yScale.domain([-currentRange, currentRange]); 
        
        numberFormat = d3.format(",");
    } else {

        main_yScale.domain([0, d3.max(barChartData, function(d) { return d[measureType]; })]);
        mini_yScale.domain([0, d3.max(barChartData, function(d) { return d[measureType]; })]);

        numberFormat = function(num){return d3.format(".2p")(num/100); }
    }

     main_yAxis = main_yAxis.scale(main_yScale);
        


    main_xScale.domain(barChartData.map(function(d) { return d.statePostalCode; }));
    mini_xScale.domain(barChartData.map(function(d) { return d.statePostalCode; }));
    
    
    var chartTitle = "Percent of Physicians";
            if(appState.physicianCode == 1) {
                if (appState.calculation == "import") {
                    chartTitle = "Percent of Physicians Imported to " + appState.stateName;
                } else if (appState.calculation == "export") {
                    chartTitle = "Percent of Residents Exported from " + appState.stateName;
                } else if (appState.calculation == "net") {
                    chartTitle = "Net Migration for " +appState.stateName;
                } else if (appState.calculation == "netToAll") {
                    chartTitle = "Net Migration for Each State";
                } else {
                    chartTitle = "Percent of Residents Retained by Each State";
                }
            } else {
                if (appState.calculation == "import") {
                    chartTitle = "Percent of Physicians Imported to " + appState.stateName;
                } else if (appState.calculation == "export") {
                    chartTitle = "Percent of Physicians Exported from " + appState.stateName;
                } else if (appState.calculation == "net") {
                    chartTitle = "Net Migration for " +appState.stateName;
                } else if (appState.calculation == "netToAll") {
                    chartTitle = "Net Migration for Each State";
                } else {
                    chartTitle = "Percent of Physicians Retained by Each State";
                }
            }
d3.select(".chart-title").text(chartTitle);
// d3.select(".y-axis-label").text();
main_yAxis.tickFormat(numberFormat);

//var stateTransition = d3.transition().duration(500).ease(d3.easeLinear);
    //Create the visual part of the y axis
    d3.select(".mainGroup").select(".x.axis").call(main_xAxis);
    d3.select(".mainGroupWrapper").select(".y.axis").call(main_yAxis);

    //The mini brushable bar
    //DATA JOIN
    var mini_bar = d3.select(".miniGroup").selectAll(".bar")
      .data(barChartData, function(d) { return d.statePostalCode; });

    //UDPATE
    mini_bar.transition().duration(1000)
      .attr("y", function(d) { return mini_height - mini_yScale(Math.max(d[measureType], 0)); } )
      .attr("height", function(d) { return Math.abs(mini_yScale(d[measureType]) - mini_yScale(0)); })
      .attr("x", function(d,i) { return mini_xScale(d.statePostalCode); })
      .attr("width", mini_xScale.bandwidth())
      .style("fill", function(d) {return appState.colorScale(d[measureType])});;

    //ENTER
    mini_bar.enter().append("rect")
      .attr("class", function(d){return "state" + stateIDFormat(d.stateID) +" bar"})
      .attr("y", function(d) { return mini_height - mini_yScale(Math.max(d[measureType], 0)); } )
      .attr("height", function(d) { return Math.abs(mini_yScale(d[measureType]) - mini_yScale(0)); })
      .attr("x", function(d,i) { return mini_xScale(d.statePostalCode); })
      .attr("width", mini_xScale.bandwidth())
      .style("fill", function(d) {return appState.colorScale(d[measureType])}) //this is going to get filled by legend scale
      .on("mouseover", function(){
            var currentStateClass = this.className.baseVal.slice(0, 7);
            
            d3.select("#mapsvg").selectAll("."+currentStateClass)
                .style("stroke-width", "3px");
            d3.select("#chart").selectAll("."+currentStateClass)
                .style("stroke-width", "2px")
                .style("stroke", "#000");
            // this.style.strokeWidth="3px";
        })
        .on("mouseout", function(){
            var currentStateClass = this.className.baseVal.slice(0, 7);
            d3.select("#mapsvg").selectAll("."+currentStateClass)
                .style("stroke-width", "1px");
            d3.select("#chart").selectAll("."+currentStateClass)
                .style("stroke-width", "0px")
                .style("stroke", "#fff");
            // this.style.strokeWidth="1px";
        });
    //EXIT
    mini_bar.exit()
      .remove();

    gBrush.call(brush.move, d3.brushSelection(d3.select(".brush").node()) || [0,100]);

  }
  return drawBarChart;
  //Function runs on a brush move - to update the big bar chart
  function barChartUpdate() {

    /////////////////////////////////////////////////////////////
    ////////// Update the bars of the main bar chart ////////////
    /////////////////////////////////////////////////////////////

    //DATA JOIN
    var bar = d3.select(".mainGroup").selectAll(".bar")
        .data(barChartData, function(d) { return d.statePostalCode; });
//console.log(barChartData);
    //UPDATE
    bar//.transition().duration(1000)
      .attr("height", function(d) { return Math.abs(main_yScale(d[measureType]) - main_yScale(0)); })
      .attr("y", function(d) { return main_yScale(Math.max(d[measureType], 0)); })
      .attr("x", function(d,i) { return main_xScale(d.statePostalCode); })
      .attr("width", main_xScale.bandwidth())
      .style("fill", function(d) {return appState.colorScale(d[measureType])})
      .select("title")
     	  .text(function(d){return numberFormat(d[measureType])});

// console.log(bar);
    //ENTER
    var enter = bar.enter().append("rect")
      .attr("class", function(d){return "state" + stateIDFormat(d.stateID) +" bar"})
      // .attr("id", function(d){return stateIDFormat(d.stateID)})
      .style("fill", function(d) {return appState.colorScale(d[measureType])})
      .attr("y", function(d) { return main_yScale(Math.max(d[measureType], 0)); })
      .attr("height", function(d) { return Math.abs(main_yScale(d[measureType]) - main_yScale(0)); })
      .attr("x", function(d,i) { return main_xScale(d.statePostalCode); })
      .attr("width", main_xScale.bandwidth())
      .on("click", function(d){
         if (!(appState.calculation == "retention" || appState.calculation == "netToAll")){
        d3.select(this).style("fill", "#d3d3d3");
        appState.changeUSState(d.stateID);
    }
      })
       .on("mouseover", function(){
            var currentStateClass = this.className.baseVal.slice(0, 7);
            
            d3.select("#mapsvg").selectAll("."+currentStateClass)
                .style("stroke-width", "3px");
            d3.select("#chart").selectAll("."+currentStateClass)
                .style("stroke-width", "2px")
                .style("stroke", "#000");
            // this.style.strokeWidth="3px";
        })
        .on("mouseout", function(){
            var currentStateClass = this.className.baseVal.slice(0, 7);
            d3.select("#mapsvg").selectAll("."+currentStateClass)
                .style("stroke-width", "1px");
            d3.select("#chart").selectAll("."+currentStateClass)
                .style("stroke-width", "0px")
                .style("stroke", "#fff");
            // this.style.strokeWidth="1px";
        });

     enter.append("title")
     	  .text(function(d){return numberFormat(d[measureType])});
// console.log(enter);
    //EXIT
    bar.exit()
      .remove();

  }//update


//First function that runs on a brush move
  function brushmove() {

    var extent = d3.event.selection;
    // console.log(d3.event.selection);
    //Reset the part that is visible on the big chart
    var originalRange = main_xZoom.range();
    main_xZoom.domain( extent );

    //Update the domain of the x & y scale of the big bar chart
    //main_xScale.domain(barChartData.map(function(d) { return d.state; }));
    main_xScale.range([ main_xZoom(originalRange[0]), main_xZoom(originalRange[1]) ]).paddingInner(0.2).paddingOuter(0);
    //console.log([ main_xZoom(originalRange[0]), main_xZoom(originalRange[1]) ])
    //Update the x axis of the big chart
    d3.select(".mainGroup")
      .select(".x.axis")
      .call(main_xAxis);

    //Update the colors within the mini bar chart
    var selected = mini_xScale.domain()
      .filter(function(d) { return (extent[0] - mini_xScale.bandwidth() + 1e-2 <= mini_xScale(d)) && (mini_xScale(d) <= extent[1] - 1e-2); }); 
    //Update the colors of the mini chart - Make everything outside the brush grey
    // d3.select(".miniGroup").selectAll(".bar")
    //   .style("fill", function(d, i) { return selected.indexOf(d.state) > -1 ? appState.colorScale(d[measureType]) : "#e0e0e0"; });

    //Update the label size
    d3.selectAll(".x.axis.tick text")
      .style("font-size", textScale(selected.length));
    
    //Update the big bar chart
    barChartUpdate();
    
  }//brushmove

  /////////////////////////////////////////////////////////////
  ////////////////////// Click functions //////////////////////
  /////////////////////////////////////////////////////////////

  //Based on http://bl.ocks.org/mbostock/6498000
  //What to do when the user clicks on another location along the brushable bar chart
  function brushcenter() {
    //console.log('brushcenter');
    var target = d3.mouse(this),
        extent = d3.brushSelection(d3.select(".brush").node()),
        size = extent[1] - extent[0],
        range = mini_xScale.range(),
        x0 = d3.min(range) + size / 2,
        x1 = d3.max(range) + mini_xScale.bandwidth() - size / 2,
        center = Math.min( x1, Math.max( x0, target[0] ) );
        // console.log(target + ' ' +extent);
    d3.event.stopPropagation();
    //console.log([center - size / 2, center + size / 2]);
     gBrush.call(brush.move, [center - size / 2, center + size / 2]);


  }
}
