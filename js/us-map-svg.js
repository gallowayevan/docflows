import {dispatch, stateIDFormat} from './setup.js';
import {appState} from './data-manager.js';

export default function createMap(){

        var svg = d3.select("#us-map").append("svg"),
            width = 960,
            height = 550;

            svg
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + width + " " + height)
                //class to make it responsive
                .attr("id", "mapsvg");

         if (appState.ieVersion <= 11 && appState.ieVersion > 0) {
                svg.attr("height", height).attr("width", width);
                d3.select("#us-map").attr("class", "u-full-width");
              } else{
                svg
                .classed("svg-content-responsive", true);
              }

           

            //load files and create static elements and placeholders
                d3.json("us-albers.json", function(error, mapJSON){
                    
                    if (error)
                        throw error;

                    var path = d3.geoPath();

                    var usMap = svg.append("g")
                        .attr("class", "states")
                        .selectAll("path")
                        .data(topojson.feature(mapJSON, mapJSON.objects.us_albers).features)
                        .enter()
                        .append("path")
                        .attr("d", path)
                        .attr("class", function(d) {
                            return "state" + d.properties.GEOID + " usStates"
                        })
                        .attr("fill", "#fff");

                    //set default
                    d3.select(".state" + appState.stateID).classed("selectedState", true);

                    usMap
                        .append("title")
                        .text(function(d) {
                            return d.properties.NAME;
                        });

                    dispatch.call("geoDataloaded", this);

                    });


    function redraw(){

                //create map collection for easy access based on stateID
                var mapDataMap = d3.map(appState.data, function(d) {
                    return stateIDFormat(d.state)
                });
                
                //update map colors
                var usMap = d3.selectAll(".states path");
                usMap.transition().duration(1000)
                    .attr("fill", function(d) {
                        var fillColor = "#ffffff";
                        var stateValue = mapDataMap.get(d.properties.GEOID)
                            .measure;
                        if(stateValue != 0){
                            fillColor = appState.colorScale(stateValue);

                        }
                        return fillColor;
                    });

                //update map titles
                var physMeasureText = "%";
                        if(appState.calculation=="net" || appState.calculation=="netToAll"){
                            physMeasureText = " (ratio)";
                        }

                usMap
                    .selectAll("title")
                    .text(function(d) {
                        var physCount = mapDataMap.get(d.properties.GEOID)
                            .count;
                        var physMeasure = mapDataMap.get(d.properties.GEOID)
                            .measure;
                        if(appState.calculation=="net" || appState.calculation=="netToAll"){
                            physMeasure = d3.format(".2n")(physMeasure);
                        } 
                        var physText = " physicians";
                        if(d.properties.GEOID == appState.stateID){}
                        if (physCount == 1){physText = " physician"};
                        return d.properties.NAME + ": " + physCount + physText + " | " + physMeasure + physMeasureText;
                    });

                //if calculation is 'retention' then make sure that no states are grayed out/selected; otherwise gray out.
                d3.selectAll("path").classed("selectedState", false);  
                if (!(appState.calculation == "retention" || appState.calculation == "netToAll")){
                d3.select(".state" + stateIDFormat(appState.stateID) +"").classed("selectedState", true);
                d3.
				}


            }

            return redraw;
}

