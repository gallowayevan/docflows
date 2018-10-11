import {appState} from './data-manager.js';

/////////////////////////////////////////////////////////////
  ////////////////////// Text: Chart titles, etc. /////////////
  /////////////////////////////////////////////////////////////

function updateSiteText() {
    var specialtyName = appState.specialtyName.toLowerCase();


var mapTitleText;
    switch ("" + appState.physicianCode + appState.calculation + "") {
        case "1net":
            mapTitleText = "To which states is " + appState.stateName + " a <span style='color:#5e3c99'>net importer</span> or <span style='color:#e66101'>net exporter</span> of residents?";
            break;
        case "2net":
            mapTitleText = "To which states is " + appState.stateName + " a <span style='color:#5e3c99'>net importer</span> or <span style='color:#e66101'>net exporter</span> of physicians?";
            break;
        case "1netToAll":
            mapTitleText = "Which states are <span style='color:#5e3c99'>net importers</span> or <span style='color:#e66101'>net exporters</span> of residents?";
            break;
        case "2netToAll":
            mapTitleText = "Which states are <span style='color:#5e3c99'>net importers</span> or <span style='color:#e66101'>net exporters</span> of physicians?";
            break;
        case "1import":
            mapTitleText = "Who is training "+appState.stateName+"'s physicians in "+specialtyName+"?";
            break;
        case "2import":
            mapTitleText = "Where is "+appState.stateName+" importing physicians in "+specialtyName+" from?";
            break;
        case "1export":
            mapTitleText = "Where is "+appState.stateName+" exporting residents in "+specialtyName+" to?";
            break;
        case "2export":
            mapTitleText = "Where is "+appState.stateName+" exporting physicians in "+specialtyName+" to?";
            break;
        case "1retention":
            mapTitleText = "How well does each state retain its residents?"; // in " + specialtyName + "?";
            break;
        case "2retention":
            mapTitleText = "How well does each state retain its physicians?"; // in " + specialtyName + "?";
            break;

    }

document.getElementById("map-title").innerHTML = mapTitleText;
updateNoteBox();
}

function updateNoteBox(){
        var helpBoxId = "help-box";

        var filteredData = appState.data.filter(function(el){
            return +el.stateID != +appState.stateID;
        });
        
       // var exampleStateMeasure = d3.max(filteredData, function(d){return Math.abs(d.measure)});
        var exampleStateObject = filteredData[0];
        filteredData.forEach(function(el){
            if(Math.abs(el.measure)>Math.abs(exampleStateObject.measure)){
                exampleStateObject=el;
            }
        });

        var countFormatter = d3.format(",");
        // var exampleStateObject = filteredData.filter(function(el){return el.measure == exampleStateMeasure});
        var exampleStateMeasure = exampleStateObject.measure;
        var exampleStateName = exampleStateObject.stateName;
        var exampleStateCount = countFormatter(Math.abs(exampleStateObject.count));
        var specialtyLowerCase = appState.specialtyName.toLowerCase();

        var selectedStateObject = appState.data.filter(function(el){
                return +el.stateID == +appState.stateID;
        });

        var selectedStateTotal = countFormatter(Math.round(selectedStateObject[0].count/(selectedStateObject[0].measure/100)));
        var selectedStateCount = countFormatter(selectedStateObject[0].count);
        var selectedStateMeasure = selectedStateObject[0].measure + "%";


        //tack on %
        if(!(appState.calculation == "net" || appState.calculation == "netToAll")){
                    exampleStateMeasure += "%";
        } else {
            specialtyLowerCase = "all specialties";
        }

        var contributed = "contributed";
        var received = "received";
        var toFrom = "to";
        var fromTo = "from";
        if(exampleStateMeasure<0 && appState.calculation == "net"){
            contributed = "received";
            received = "contributed";
            toFrom = "from";
            fromTo = "to";
        }

        var noteText = "Notes";

    //     var specialtyName = " ("+appState.specialtyName+")";
    //     if (appState.specialtyCode == 0){
    //     specialtyName = "";
    //     }

    // switch ("" + appState.physicianCode + appState.calculation + "") {
    //     case "1net":
    //         noteText = "Percent Net Migration Between " + appState.stateName + " and Each Other State for Physicians Who Were Residents in 2009 and Active Physicians in 2015";
    //         break;
    //     case "2net":
    //         noteText = "Percent Net Migration Between " + appState.stateName + " and Each Other State for Physicians Who Were Active in 2009 and 2015";
    //         break;
    //     case "1netToAll":
    //         noteText = "Percent Net Migration Between Each State and All Other States for Physicians Who Were Residents in 2009 and Active Physicians in 2015";
    //         break;
    //     case "2netToAll":
    //         noteText = "Percent Net Migration Between Each State and All Other States for Physicians Who Were Active in 2009 and 2015";
    //         break;
    //     case "1import":
    //         noteText = "Percent of Physicians"+specialtyName+" Who Were Active in "+appState.stateName+" in 2015 and Who Were Residents in 2009 by Training State";
    //         break;
    //     case "2import":
    //         noteText = "Percent of Physicians"+specialtyName+" Who Were Active in "+appState.stateName+" in 2015 and Who Were Active Physicians in 2009";
    //         break;
    //     case "1export":
    //         noteText = "Percent of Residents"+specialtyName+" Training in "+appState.stateName+" in 2009 Who Were Active Physicians in 2015";
    //         break;
    //     case "2export":
    //         noteText = "Percent of Active Physicians"+specialtyName+" in "+appState.stateName+" in 2009 Who Were Active Physicians in 2015";
    //         break;
    //     case "1retention":
    //         noteText = "Percent of Residents" + specialtyName + " in Training in 2009 Who Were Practicing in the Same State in 2015";
    //         break;
    //     case "2retention":
    //         noteText = "Percent of Active Physicians" + specialtyName + " in 2009 Who Were Practicing in the Same State in 2015";
    //         break;
    // }

    noteText = "<h6><strong>"+noteText+"</strong></h6>";

        switch ("" + appState.physicianCode + appState.calculation + "") {
            case "1net":
                    noteText += "<p>The current map and chart show the net migration (imports - exports) of doctors who were residents in 2009 and who were practicing"; 
                    noteText += " physicians in 2015 for <span class='changing-text'>"+appState.stateName+"</span> relative to each other state.</p>"; 
                    noteText += "<p>For instance, <span class='changing-text'>"+exampleStateName+"</span> "+contributed+" <span class='changing-text'>"+exampleStateCount+"</span> more 2009";
                    noteText +=  " residents "+toFrom+" <span class='changing-text'>"+appState.stateName+"</span>"; 
                    noteText += " than they "+received+" "+fromTo+" <span class='changing-text'>"+appState.stateName+"</span>.</p>";            
                break;
            case "2net":
                    noteText += "<p>The current map and chart show the net migration (imports - exports) of physicians who were actively practicing in 2009 and 2015"; 
                    noteText += " for <span class='changing-text'>"+appState.stateName+"</span> relative to each other state.</p>"; 
                    noteText += "<p>For instance, <span class='changing-text'>"+exampleStateName+"</span> "+contributed+" <span class='changing-text'>"+exampleStateCount+"</span> more";
                    noteText +=  " physicians "+toFrom+" <span class='changing-text'>"+appState.stateName+"</span>"; 
                    noteText += " than they "+received+" "+fromTo+" <span class='changing-text'>"+appState.stateName+"</span>.</p>";  
                break;
            case "1netToAll":
                    noteText += "<p>The current map and chart show the net migration (imports - exports) of doctors who were residents in 2009 and who were practicing"; 
                    noteText += " physicians in 2015 for each state relative to all other states in aggregate.</p>"; 
                    noteText += "<p>For instance, <span class='changing-text'>"+exampleStateName+"</span> received <span class='changing-text'>"+exampleStateCount+"</span> more 2009 residents"; 
                    noteText += " from all other states than they contributed.</p>"; 
                break;
            case "2netToAll":
                    noteText += "<p>The current map and chart show the net migration (imports - exports) of physicians who were actively practicing in 2009 and 2015"; 
                    noteText += " for each state relative to all other states in aggregate.</p>"; 
                    noteText += "<p>For instance, <span class='changing-text'>"+exampleStateName+"</span> received <span class='changing-text'>"+exampleStateCount+"</span> more physicians"; 
                    noteText += " from all other states than they contributed.</p>";
                break;
            case "1import":
                    noteText += "<p>The current map and chart show the percentage of 2009 residents in <span class='changing-text'>"+specialtyLowerCase+"</span> who were practicing in";
                    noteText += " <span class='changing-text'>"+appState.stateName+"</span> in 2015 but who were training in another state in 2009.</p>";
                    noteText += "<p>For instance, of the <span class='changing-text'>"+selectedStateTotal+"</span> physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> who were in training in 2009 and actively practicing in <span class='changing-text'>"+appState.stateName+"</span> in 2015,";
                    noteText += " <span class='changing-text'>"+exampleStateCount+"</span> were residents in <span class='changing-text'>"+exampleStateName+"</span> in 2009, which is <span class='changing-text'>"+exampleStateMeasure+"</span>";
                    noteText += "  (<span class='changing-text'>"+exampleStateCount+"</span> / <span class='changing-text'>"+selectedStateTotal+"</span> * 100). This percentage is the mapped and charted value.</p>"; 
                    // noteText += "<p>The total number of residents in <span class='changing-text'>"+appState.stateName+"</span> was <span class='changing-text'>"+selectedStateTotal+"</span>."; 
                    // noteText += " Of those, <span class='changing-text'>"+selectedStateObject[0].measure+"</span>% were practicing physicians in North Carolina in 2015.";
                    // noteText += "The map and the bar chart show the distribution of the rest expressed as a percentage"

                break;
            case "2import":
                    noteText += "<p>The current map and chart show the percentage of physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> who were practicing in another state in 2009";
                    noteText += " and who were practicing in <span class='changing-text'>"+appState.stateName+"</span> in 2015 as a percent of the total number of physicians in <span class='changing-text'>"+appState.stateName+"</span> who were actively practicing in 2009 and 2015.</p>";
                    noteText += "<p>For instance, of the <span class='changing-text'>"+selectedStateTotal+"</span> physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> in <span class='changing-text'>"+appState.stateName+"</span> who were actively practicing in 2009 and 2015,";
                    noteText += " <span class='changing-text'>"+exampleStateCount+"</span> were practicing in <span class='changing-text'>"+exampleStateName+"</span> in 2009, which is <span class='changing-text'>"+exampleStateMeasure+"</span>";
                    noteText += "  (<span class='changing-text'>"+exampleStateCount+"</span> / <span class='changing-text'>"+selectedStateTotal+"</span> * 100). This percentage is the mapped and charted value.</p>";  
                break;
            case "1export":
                    noteText += "<p>The current map and chart show the percentage of residents in <span class='changing-text'>"+specialtyLowerCase+"</span> who were training"; 
                    noteText += " in <span class='changing-text'>"+appState.stateName+"</span> in 2009 but who were practicing physicians in another state in 2015 as a percent of the total number"; 
                    noteText += " of residents training in <span class='changing-text'>"+appState.stateName+"</span> in 2009.</p>";
                    noteText += "<p>For instance, of the <span class='changing-text'>"+selectedStateTotal+"</span> residents in <span class='changing-text'>"+specialtyLowerCase+"</span> in <span class='changing-text'>"+appState.stateName+"</span> in 2009 who were also active physicians in 2015,";
                    noteText += " <span class='changing-text'>"+exampleStateCount+"</span> were practicing physicians in <span class='changing-text'>"+exampleStateName+"</span> in 2015, which is <span class='changing-text'>"+exampleStateMeasure+"</span>";
                    noteText += "  (<span class='changing-text'>"+exampleStateCount+"</span> / <span class='changing-text'>"+selectedStateTotal+"</span> * 100). This percentage is the mapped and charted value.</p>"; 

                break;
            case "2export":
                    noteText += "<p>The current map and chart show the percentage of physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> who were practicing"; 
                    noteText += " in <span class='changing-text'>"+appState.stateName+"</span> in 2009 but who were practicing physicians in another state in 2015 as a percent of the total number"; 
                    noteText += " of physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> active in <span class='changing-text'>"+appState.stateName+"</span> in 2009.</p>";
                    noteText += "<p>For instance, of the <span class='changing-text'>"+selectedStateTotal+"</span> physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> in <span class='changing-text'>"+appState.stateName+"</span> in 2009 who were also active physicians in 2015,";
                    noteText += " <span class='changing-text'>"+exampleStateCount+"</span> were practicing in <span class='changing-text'>"+exampleStateName+"</span> in 2015, which is <span class='changing-text'>"+exampleStateMeasure+"</span>";
                    noteText += "  (<span class='changing-text'>"+exampleStateCount+"</span> / <span class='changing-text'>"+selectedStateTotal+"</span> * 100). This percentage is the mapped and charted value.</p>"; 
                break;
            case "1retention":
                    noteText += "<p>The current map and chart show the percentage of residents in <span class='changing-text'>"+specialtyLowerCase+"</span> who were training"; 
                    noteText += " in a given state in 2009 and who were practicing physicians in the same state in 2015 as a percent of the total number"; 
                    noteText += " of residents trained in each state in 2009.</p>";
                    noteText += "<p>For instance, of the <span class='changing-text'>"+selectedStateTotal+"</span> residents in <span class='changing-text'>"+specialtyLowerCase+"</span> in <span class='changing-text'>"+appState.stateName+"</span> in 2009,";
                    noteText += " <span class='changing-text'>"+selectedStateCount+"</span> were practicing in <span class='changing-text'>"+appState.stateName+"</span> in 2015, which is <span class='changing-text'>"+selectedStateMeasure+"</span>";
                    noteText += "  (<span class='changing-text'>"+selectedStateCount+"</span> / <span class='changing-text'>"+selectedStateTotal+"</span> * 100). This percentage is the mapped and charted value.</p>"; 

                break;
            case "2retention":
                    noteText += "<p>The current map and chart show the percentage of physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> who were practicing"; 
                    noteText += " in a given state in 2009 and who were practicing in the same state in 2015 as a percent of the total number"; 
                    noteText += " of active physicians in each state in 2009.</p>";
                    noteText += "<p>For instance, of the <span class='changing-text'>"+selectedStateTotal+"</span> physicians in <span class='changing-text'>"+specialtyLowerCase+"</span> in <span class='changing-text'>"+appState.stateName+"</span> in 2009,";
                    noteText += " <span class='changing-text'>"+selectedStateCount+"</span> were still practicing in <span class='changing-text'>"+appState.stateName+"</span> in 2015, which is <span class='changing-text'>"+selectedStateMeasure+"</span>";
                    noteText += "  (<span class='changing-text'>"+selectedStateCount+"</span> / <span class='changing-text'>"+selectedStateTotal+"</span> * 100). This percentage is the mapped and charted value.</p>"; 
                break;

        }


        d3.select("#"+helpBoxId).html(noteText);
                // d3.selectAll(".changing-text").style("color", "blue");

}

export {updateSiteText, updateNoteBox};