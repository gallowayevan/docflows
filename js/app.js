import {dispatch, stateIDFormat} from './setup.js';
import {stateIDtoCode, specialtyCodeNames, appState} from './data-manager.js';
import createMap from './us-map.js';
import createLegend from './map-legend.js';
import createBarChart from './barchart.js';
import buildDataNavigation from './build-data-nav.js';
import {modal, wrap, detectIE} from './utilities.js';
import {updateSiteText, updateNoteBox} from './site-text.js';
import saveSVG from './save-svg.js';


/////////////////////////////////////////////////////////////
  ////////////////////// Initiate ////////////////////////////
  /////////////////////////////////////////////////////////////
    var usMap = createMap();
    var mapLegend = createLegend();
    var barChart = createBarChart();
    buildDataNavigation();
    // modal();

 /////////////////////////////////////////////////////////////
  ////////////////////// Dispatching and Event Handling ///////
  /////////////////////////////////////////////////////////////S
    

  //setup dispatch for data ready; this will call redraw functions

dispatch.on("dataReady", function(newAppState){
    appState.updateColorScale();
    //console.log(appState);
});

dispatch.on("colorScaleReady", function(){
    usMap();
    mapLegend();
    barChart();
    updateSiteText();
});
//setup events and defaults for user interactions
d3.selectAll("input")
        .on("change", function(){
            appState.changePhysicianCode(this.value);
        })
        .property("checked", function(d){return this.value == appState.physicianCode});

d3.select("#specialties")
        .on("change", function(){
            appState.changeSpecialtyCode(this.value);
		})
		//set default
		.property("value", appState.specialtyCode);

d3.select("#calculations")
        .on("change", function(){
            var newCalculation = this.value;

            //if calculation is not 'net' enable all specialty selection; otherwise disable and hdie specialty selections
            if (!(newCalculation == "net" || newCalculation == "netToAll" || newCalculation == "retention")){
            d3.select("#specialties").selectAll("option").property('disabled', false);
            d3.select("#specialties").selectAll("option").property('hidden', false);
            } else {
                //also disable all specialty select options
                d3.select("#specialties").selectAll("option").each(function(){
                    if(this.value == 0){
                        this.selected = true;
                    } else {
                        this.disabled = true
                        this.hidden = true;
                    }
                });
            }

            appState.changeCalculation(newCalculation);
		})
		//set default
		.property("value", appState.calculation);

d3.selectAll(".usstate").on("click", function(d){
            var currentStateID = this.className.baseVal.slice(5, 7);
             if (!(appState.calculation == "retention" || appState.calculation == "netToAll")){
           	 //give user immediate feedback on selection
            d3.selectAll(".usstate").classed("selectedState", false);  
            d3.select("#mapsvg").selectAll(".state" + stateIDFormat(currentStateID) +"").classed("selectedState", true);
        }
            //change app state
            appState.changeUSState(currentStateID);

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

 if (appState.ieVersion <= 11 && appState.ieVersion > 0) {
                d3.selectAll(".save-image").style("display", "none");
              }

d3.selectAll(".save-image").on("click", saveSVG);

appState.loadData();






