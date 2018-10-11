import {dispatch, stateIDFormat} from './setup.js';
import {appState, stateIDtoCode} from './data-manager.js';

export default function createMap(){

         if (appState.ieVersion <= 11 && appState.ieVersion > 0) {
                var width = 960,
                height = 650;
                d3.select("#mapsvg").attr("height", height).attr("width", width).attr("class", "");
                d3.select("#us-map").attr("class", "u-full-width");
              } 

                    //set default
                    d3.select(".state" + appState.stateID).classed("selectedState", true);

                    d3.selectAll(".usstate")
                        .append("title")
                        .text(function() {
                            return this.parentNode.id.slice(5, 7);
                        });

                    // var offGroup = d3.select("#mapsvg").selectAll("rect").data(["MA", "RI", "CT", "NJ", "DE", "MD", "DC"])
                    //                     .enter()
                    //                     .append("g")
                    //                     .attr("class", "stateSquare")
                    //                     .attr("transform", function(d,i) {return "translate("+870+","+ (180+i*50)+")"});
                    //                     offGroup
                    //                     //.attr("x", 870)
                    //                     .append("rect")
                    //                     .attr("class", "stateSquareRect")
                    //                     //.attr("y", function(d,i){return 180+i*50})
                    //                     .attr("width", 40)
                    //                     .attr("height", 40)
                    //                     .attr("fill", "#fff");
                    //                     offGroup
                    //                     .append("text")
                    //                     .attr("class", "stateSquareText")
                    //                     .attr("text-anchor", "middle")
                    //                     .attr("x", 20)
                    //                     .attr("y", 25)
                    //                     .attr("font-size", 20)
                    //                     .attr("font-weight", 700)
                    //                     .text(function(d){return d});

    function redraw(){

                //create map collection for easy access based on stateID
                var mapDataMap = d3.map(appState.data, function(d) {
                    return stateIDFormat(d.state)
                });

                //update map colors
                var usMap = d3.selectAll(".usstate").style("opacity", 1);
    
                usMap.transition().duration(1000)
                    .attr("fill", function() {
                        var fillColor = "#ffffff";
                        var stateValue;
                        //console.log(this.className);
                        if (appState.calculation == "net" || appState.calculation == "netToAll"){
                            stateValue = mapDataMap.get(this.className.baseVal.slice(5, 7))
                            .count;
                        } else {
                        stateValue = mapDataMap.get(this.className.baseVal.slice(5, 7))
                            .measure;
                        }
                        if(stateValue != 0){
                            fillColor = appState.colorScale(stateValue);

                        }
                        return fillColor;
                    });


                var countFormatter = d3.format(",");
                usMap
                    .selectAll("title")
                    .text(function(d) {
                        var currentStateID = this.parentNode.className.baseVal.slice(5, 7);
                        var physCount = mapDataMap.get(currentStateID)
                            .count;
                        if(currentStateID == appState.stateID && !(appState.calculation == "retention" || appState.calculation == "netToAll")){
                            return appState.stateName;
                        } else {
                        return mapHoverText(stateIDtoCode[+currentStateID].name, physCount, countFormatter);
                        }
                    });


                //if calculation is 'retention' then make sure that no states are grayed out/selected; otherwise gray out.
                d3.selectAll(".usstate").classed("selectedState", false);  
                if (!(appState.calculation == "retention" || appState.calculation == "netToAll")){
                d3.select("#mapsvg").selectAll(".state" + stateIDFormat(appState.stateID) +"").classed("selectedState", true);
                d3.select(".state-click-prompt").style("visibility", "visible");
                } else {
                    d3.select(".state-click-prompt").style("visibility", "hidden");
                }


            }

            return redraw;
}

function mapHoverText(currentMapState, currentMapCount, formatter){
      var currentMapHoverText = currentMapState || "";
      var physicianType = appState.physicianCode == 1 ? "resident" : "physician";

      if(currentMapCount != 1){
        physicianType += "s";
      }

      switch (appState.calculation) {
            case "net":
               if(currentMapCount == 0){
                    currentMapHoverText = "Net migration of " + physicianType + " between " + currentMapState + " and " + appState.stateName + " was 0"; 
                } else if(currentMapCount < 0){
                    currentMapCount = Math.abs(currentMapCount);
                    currentMapHoverText = appState.stateName + " was a net exporter of " + formatter(currentMapCount) + " " + physicianType + " to " + currentMapState; 
                } else if(currentMapCount > 0){
                    currentMapHoverText = appState.stateName + " was a net importer of " + formatter(currentMapCount) + " " + physicianType + " from " + currentMapState;
                }
                break;
            case "netToAll":
                
                if(currentMapCount == 0){
                    currentMapHoverText = currentMapState + "'s net migration of " + physicianType + " was 0"; 
                } else if(currentMapCount < 0){
                    currentMapCount = Math.abs(currentMapCount);
                    currentMapHoverText = currentMapState + " was a net exporter of " + formatter(currentMapCount) + " " + physicianType; 
                } else if(currentMapCount > 0){
                    currentMapHoverText = currentMapState + " was a net importer of " + formatter(currentMapCount) + " " + physicianType;
                }
                break;
            case "import":
                    currentMapHoverText = appState.stateName + " imported " + formatter(currentMapCount) + " " + physicianType + " from " + currentMapState;
                break;
            case "export":
                    currentMapHoverText = appState.stateName + " exported " + formatter(currentMapCount) + " " + physicianType + " to " + currentMapState;
                break;
            case "retention":
                    currentMapHoverText = currentMapState + " retained " + formatter(currentMapCount) + " " + physicianType;
                break;
        }

return currentMapHoverText;

}