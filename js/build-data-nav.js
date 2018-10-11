 import {specialtyCodeNames, appState} from './data-manager.js';

 /////////////////////////////////////////////////////////////
  ////////////////////// Build data navigation //////////////////////
  /////////////////////////////////////////////////////////////

export default function buildDataNavigation() {

        specialtyCodeNames.sort(function(a, b){
          var nameA = a.specialty_name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.specialty_name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        var currentSelect = document.getElementById("specialties");
        var specialtyCodeNamesLength = specialtyCodeNames.length;
            for (var i = 0; i < specialtyCodeNamesLength; i++) {
                var data_name = specialtyCodeNames[i].specialty_name;
                var data_value = specialtyCodeNames[i].specialty_code;
                var dataOption = document.createElement("option");
                dataOption.textContent = data_name;
                dataOption.value = data_value;
                currentSelect.appendChild(dataOption);

            };

         //if calculation is not 'net' enable all specialty selection; otherwise disable and hdie specialty selections
            if (appState.calculation == "net" || appState.calculation == "netToAll" || appState.calculation == "retention"){
                //disable all specialty select options
                d3.select("#specialties").selectAll("option").each(function(){
                    if(this.value == 0){
                        this.selected = true;
                    } else {
                        this.disabled = true
                        this.hidden = true;
                    }
                });
            }

        //Show or hide explanations depending on the i button clicked
        //100 indicates that no button is currently selected. 
        var currentSelectedIndex = 100;

        d3.selectAll(".info-icon")
            .on("click", function(d,i){

                    var selectedExplanation="";
                    
                    d3.selectAll(".explanation")      
                            .style("display", "none");
                    d3.selectAll(".info-icon")      
                            .style("fill", "#000000");

                    if (i==currentSelectedIndex){
                         
                        currentSelectedIndex = 100;
                    } else {
                    
                    d3.select(this).style("fill", "#c3c3c3");

                    if(i==2){
                        d3.select("#explainSpecialty")
                            .style("opacity", 0)      
                            .style("display", "block")
                            .transition().duration(500).style("opacity", 1);
                    } else if (i==1) { 
                        d3.select("#explainCalculation")      
                            .style("opacity", 0)      
                            .style("display", "block")
                            .transition().duration(500).style("opacity", 1);
                    } else if (i==0) {
                        d3.select("#explainResidentYesNo")      
                            .style("opacity", 0)      
                            .style("display", "block")
                            .transition().duration(500).style("opacity", 1);
                    } else {
                        d3.selectAll(".explanation")      
                            .style("display", "none");
                    }
                    currentSelectedIndex = i;
                }});

}
