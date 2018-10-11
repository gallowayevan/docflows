import {appState} from './data-manager.js';
/////////////////////////////////////////////////////////////
  ////////////////////// Legend ////////////////////////////
  /////////////////////////////////////////////////////////////
export default function createLegend() {
        var svg = d3.select("#mapsvg");

        //create legend group
            var g = svg.append("g")
                .attr("class", "key")
                .attr("transform", "translate(-70,615)");

                //This is just static legend text
            g.append("text")
                .attr("class", "caption")
                .attr("transform", "translate(560,-5)");

            var axisGroup = g.append("g")
                .attr("class", "xAxis");

        function redraw(){
            var domainOfScale = appState.colorScale.domain();

            //location on svg of the legend
            var legendPositionRange = [560,900];

                //create the linear x scale for creation of the legend
                var x = d3.scaleLinear()
                        .domain([0,d3.max(domainOfScale)])
                        .range([legendPositionRange[0], legendPositionRange[1]]);

            var legendDomainWithText = domainOfScale;
            var legendNumFormat = d3.format(",");

            //create custom legend text for net
            if(appState.calculation=="net"){
            legendDomainWithText.unshift("Net Outflow");
            legendDomainWithText.push('Net Inflow');
            } else if (appState.calculation=="netToAll"){
            legendDomainWithText.unshift("Net Exporter");
            legendDomainWithText.push('Net Importer');
            } else {
                //attach percent to tick
            legendDomainWithText = legendDomainWithText.map(function(d){return d/100});
            legendNumFormat = d3.format(".2p");
            }
            //Add tick marks (axis) to bottom
                var xAxis = d3.axisBottom(x)
                    .tickSize(13)
                    .tickValues(legendDomainWithText)
                    .tickFormat(legendNumFormat);



                //calculate the width of each legend rectangle
                var segmentWidth = (legendPositionRange[1] - legendPositionRange[0]) / appState.colorScale.range().length; 

                d3.select(".xAxis")
                    .call(xAxis);
                d3.selectAll(".tick").each(function(d, i){
                    //more logic for custom legend text for net
                    if(appState.calculation=="net" || appState.calculation=="netToAll"){
                    var currentXposition = x.range()[0] + segmentWidth * i;
                    d3.select(this).attr("transform", "translate("+currentXposition+",0)");
                    if(i==0 || i == (legendDomainWithText.length-1)){
                        d3.select(this).select('text').text(legendDomainWithText[i]);
                    }
                }else {
                    var currentXposition = x.range()[0] + segmentWidth * (i+1);
                    d3.select(this).attr("transform", "translate("+currentXposition+",0)");
                }

                });
                      
            //each colored segment of legend is a rectangle bond to color arr
             //also create tick value array, which we push values to as each legend rect x attribute is calculated
            var legendRectangles = g.selectAll("rect")
                    .data(appState.colorScale.range(), function(d){return d});
                    
                    legendRectangles.enter()
                    .append("rect")
                    .attr("height", 8)
                    .attr("x", function(d, i) {
                        // if (i==0){
                        //     legendTickValues=[];
                        // }
                        var currentX = x.range()[0] + segmentWidth * i;
                        //legendTickValues.push(x.invert(currentX));
                        return currentX;
                    })
                    .attr("width", function(d) {
                        return segmentWidth;
                    })
                    .attr("fill", function(d) {
                        return d;
                    });

                legendRectangles.attr("x", function(d, i) {
                        var currentX = x.range()[0] + segmentWidth * i;
                        return currentX;
                    });    
                
                legendRectangles.exit().remove();

                //create legend caption text
                var currentLegendText = "Percent of Physicians";
                //  if (appState.calculation == "import") {
                //     currentLegendText = "Percent of Physicians Imported to " + appState.stateName;
                // } else if (appState.calculation == "export") {
                //     currentLegendText = "Percent of Physicians Exported from " + appState.stateName;
                // } else if (appState.calculation == "net") {
                //     currentLegendText = "Percent Net Migration for " +appState.stateName;
                // } else if (appState.calculation == "netToAll") {
                //     currentLegendText = "Percent Net Migration for Each State";
                // } else {
                //     currentLegendText = "Percent of Physicians Retained by Each State";
                // }

            if(appState.physicianCode == 1) {
                if (appState.calculation == "import") {
                    currentLegendText = "Percent of Physicians Imported to " + appState.stateName;
                } else if (appState.calculation == "export") {
                    currentLegendText = "Percent of Residents Exported from " + appState.stateName;
                } else if (appState.calculation == "net") {
                    currentLegendText = "Net Migration for " +appState.stateName;
                } else if (appState.calculation == "netToAll") {
                    currentLegendText = "Net Migration for Each State";
                } else {
                    currentLegendText = "Percent of Residents Retained by Each State";
                }
            } else {
                if (appState.calculation == "import") {
                    currentLegendText = "Percent of Physicians Imported to " + appState.stateName;
                } else if (appState.calculation == "export") {
                    currentLegendText = "Percent of Physicians Exported from " + appState.stateName;
                } else if (appState.calculation == "net") {
                    currentLegendText = "Net Migration for " +appState.stateName;
                } else if (appState.calculation == "netToAll") {
                    currentLegendText = "Net Migration for Each State";
                } else {
                    currentLegendText = "Percent of Physicians Retained by Each State";
                }
            }

                d3.select(".caption").text(currentLegendText);

                }

                return redraw;
}