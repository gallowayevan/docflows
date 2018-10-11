import {wrap} from './utilities.js';


/////////////////////////////////////////////////////////////
  ////////////////////// Save SVG //////////////////////
  /////////////////////////////////////////////////////////////
export default function saveSVG() {
    var height = 800;
    var width = 1000;
    var clone = document.getElementById("mapsvg").cloneNode(true);
      
    //clone svg
    // var clone = document.getElementsByClassName("svgWrapper")[0].cloneNode(true);
    
    //remove clip def, brushgroup, and minigroup
    // clone.removeChild(clone.lastChild);
    // clone.removeChild(clone.lastChild);
    // clone.removeChild(clone.lastChild);



    //strip off clip-path
    // clone = d3.select(clone)
    //   .attr("clip-path", "")
    // .style("clip-path", "");

    var helpBoxText = d3.select("#help-box").text().split("chart show");
    var chartTitleText = d3.select("#map-title").text();
    var mapNotesText = d3.select("#note").text();
    // chartTitleText = chartTitleText.replace(/(<([^>]+)>)/ig,"");    // remove html entities
    
    helpBoxText = "The current map shows" + helpBoxText[1];
    helpBoxText = helpBoxText.replace(/For instance/i, " For instance");
    helpBoxText = helpBoxText.replace(/and charted /i, "");
    //console.log(helpBoxText);
    var svgClone = d3.select(clone)
      .attr("viewBox", "0 0 " + width + " " + height);
      //.attr("width", width)
      //.attr("height", height);

    svgClone.selectAll("path").attr("transform", "translate(20,50)");
    svgClone.selectAll(".stateSquares").attr("transform", "translate(20,50)");
    svgClone.select(".key").attr("transform", "translate(0,650)");
    svgClone.select(".state-click-prompt").attr("display", "none");
    
    // svgClone.append("text")
    //             .attr("y", 450)
    //             .attr("x", 400)
    //             .attr("text-anchor", "middle")
    //             .attr("font-size", "70")
    //             .attr("font-weight", "700")
    //             .text(d3.select('.selected-year').text());

    svgClone
      .append("text")
      .attr("y", 40)
      .attr("x", 500)
      .attr("text-anchor", "middle")
      .attr("font-size", "25")
      .attr("font-weight", "700")
      .text(chartTitleText);

    var noteText = svgClone
      .append("text")
      .attr("y", 765)
      .attr("x", 500)
      .attr("font-size", "8")
      .text(mapNotesText)
      .call(wrap, 140);

    var helpText = svgClone
      .append("text")
      .attr("y", 660)
      .attr("x", 30)
      .attr("font-size", "14")
      .text(helpBoxText)
      .call(wrap, 80);

    // svgClone
    //   .append("image")
    //   .attr("xlink:href", "UNC_shepsBLACK.svg")
    //   .attr("width", 200)
    //   .attr("height", 150)
    //   .attr("transform", "translate(40,680)");

    svgClone
      .append("text")
      .attr("y", 720)
      .attr("x", 500)
      .attr("font-size", "25")
      .attr("font-weight", "700")
      .style("fill", "#4B9CD3")
      .text("Carolina Health Workforce Research Center");

    svgClone
      .append("text")
      .attr("y", 740)
      .attr("x", 745)
      .attr("font-size", "14")
      // .attr("font-weight", "700")
      // .style("fill", "#4B9CD3")
       .attr("text-anchor", "middle")
      .text("docflows.unc.edu | www.healthworkforce.unc.edu");

    saveSvgAsPng(svgClone.node(), "viz.png", { backgroundColor: "#fff"});
  }
