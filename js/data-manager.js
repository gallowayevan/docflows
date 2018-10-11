  import {dispatch, stateIDFormat} from './setup.js';
  import {detectIE} from './utilities.js';

  /////////////////////////////////////////////////////////////
  ////////////////////// Data and State //////////////////////
  /////////////////////////////////////////////////////////////
var stateIDtoCode = {1:{name:"Alabama",code:"AL"},2:{name:"Alaska",code:"AK"},4:{name:"Arizona",code:"AZ"},5:{name:"Arkansas",code:"AR"},6:{name:"California",code:"CA"},8:{name:"Colorado",code:"CO"},9:{name:"Connecticut",code:"CT"},10:{name:"Delaware",code:"DE"},11:{name:"District of Columbia",code:"DC"},12:{name:"Florida",code:"FL"},13:{name:"Georgia",code:"GA"},15:{name:"Hawaii",code:"HI"},16:{name:"Idaho",code:"ID"},17:{name:"Illinois",code:"IL"},18:{name:"Indiana",code:"IN"},19:{name:"Iowa",code:"IA"},20:{name:"Kansas",code:"KS"},21:{name:"Kentucky",code:"KY"},22:{name:"Louisiana",code:"LA"},23:{name:"Maine",code:"ME"},24:{name:"Maryland",code:"MD"},25:{name:"Massachusetts",code:"MA"},26:{name:"Michigan",code:"MI"},27:{name:"Minnesota",code:"MN"},28:{name:"Mississippi",code:"MS"},29:{name:"Missouri",code:"MO"},30:{name:"Montana",code:"MT"},31:{name:"Nebraska",code:"NE"},32:{name:"Nevada",code:"NV"},33:{name:"New Hampshire",code:"NH"},34:{name:"New Jersey",code:"NJ"},35:{name:"New Mexico",code:"NM"},36:{name:"New York",code:"NY"},37:{name:"North Carolina",code:"NC"},38:{name:"North Dakota",code:"ND"},39:{name:"Ohio",code:"OH"},40:{name:"Oklahoma",code:"OK"},41:{name:"Oregon",code:"OR"},42:{name:"Pennsylvania",code:"PA"},44:{name:"Rhode Island",code:"RI"},45:{name:"South Carolina",code:"SC"},46:{name:"South Dakota",code:"SD"},47:{name:"Tennessee",code:"TN"},48:{name:"Texas",code:"TX"},49:{name:"Utah",code:"UT"},50:{name:"Vermont",code:"VT"},51:{name:"Virginia",code:"VA"},53:{name:"Washington",code:"WA"},54:{name:"West Virginia",code:"WV"},55:{name:"Wisconsin",code:"WI"},56:{name:"Wyoming",code:"WY"}};
var specialtyCodeNames = [{"specialty_code":"0","specialty_name":"All Specialties"},{"specialty_code":"1","specialty_name":"Allergy/Immunology"},{"specialty_code":"2","specialty_name":"Cardiology"},{"specialty_code":"3","specialty_name":"Endocrinology"},{"specialty_code":"4","specialty_name":"Gastroenterology"},{"specialty_code":"5","specialty_name":"Infectious disease"},{"specialty_code":"6","specialty_name":"Nephrology"},{"specialty_code":"7","specialty_name":"Neurology"},{"specialty_code":"8","specialty_name":"Oncology"},{"specialty_code":"9","specialty_name":"Pulmonology"},{"specialty_code":"10","specialty_name":"Rheumatology"},{"specialty_code":"11","specialty_name":"Surgery"},{"specialty_code":"12","specialty_name":"Neurological Surgery"},{"specialty_code":"13","specialty_name":"Ophthalmology"},{"specialty_code":"14","specialty_name":"Orthopedic Surgery"},{"specialty_code":"15","specialty_name":"Otorhinolaryngology"},{"specialty_code":"16","specialty_name":"Plastic Surgery"},{"specialty_code":"17","specialty_name":"Thoracic Surgery"},{"specialty_code":"18","specialty_name":"Urology"},{"specialty_code":"19","specialty_name":"Family Medicine"},{"specialty_code":"20","specialty_name":"Internal Medicine"},{"specialty_code":"21","specialty_name":"Geriatrics"},{"specialty_code":"22","specialty_name":"General Pediatrics"},{"specialty_code":"23","specialty_name":"Pediatric Non-Surgical Specialties"},{"specialty_code":"24","specialty_name":"Pediatric Surgical Specialties"},{"specialty_code":"25","specialty_name":"Anesthesiology"},{"specialty_code":"26","specialty_name":"Dermatology"},{"specialty_code":"27","specialty_name":"Emergency Medicine"},{"specialty_code":"28","specialty_name":"Gynecology/Obstetrics"},{"specialty_code":"29","specialty_name":"Pathology"},{"specialty_code":"30","specialty_name":"Physical Medicine and Rehabilitation"},{"specialty_code":"31","specialty_name":"Psychiatry"},{"specialty_code":"32","specialty_name":"Preventive Medicine"},{"specialty_code":"33","specialty_name":"Radiology"},{"specialty_code":"34","specialty_name":"Non-Patient Care"},{"specialty_code":"35","specialty_name":"Other Physician Specialty"}];
var specialtyCodeNamesMap = d3.map(specialtyCodeNames, function(d){return d.specialty_code});

var appState = initiateState();

function initiateState() {
	var state = {
		stateID: 37,
		calculation: "netToAll",
		specialtyCode: 0,
		physicianCode: 2,
		data: [],
		legendData: []
		};
 
		state.specialtyName = specialtyCodeNamesMap.get(state.specialtyCode).specialty_name;
		state.stateName = stateIDtoCode[state.stateID].name;
		state.statePostalCode = stateIDtoCode[state.stateID].code;
        state.ieVersion = detectIE(); 
        state.colorScale = d3.scaleThreshold();

		state.loadData = function(){
		   var q = d3.queue();
            q.defer(d3.json, "datacontroller.php/?specialty="+state.specialtyCode+"&physician="+state.physicianCode+"&state="+state.stateID+"&calculation="+state.calculation+"")
            .defer(d3.json, "legendcontroller.php/?specialty="+state.specialtyCode+"&physician="+state.physicianCode+"&calculation="+state.calculation+"")
            .await(function(error, data1, data2){
		                       //console.log(data1);
		            data1.forEach(function(el) {
						    el.measure = state.calculation == 'net' ||  state.calculation == 'netToAll' ? +el.measure/10 : +el.measure;
						    el.stateID = el.state;
						    el.stateName = stateIDtoCode[el.state].name;
						    el.statePostalCode = stateIDtoCode[el.state].code;
 					});

            	state.data = data1;
            	state.legendData = data2;

                if (state.physicianCode == 1){
                    if(state.calculation == 'net'){
                        state.legendData.median = 0;
                        state.legendData.max = 100;
                        state.legendData.min = -100;
                    } else if (state.calculation == "netToAll"){
                    	state.legendData.median = 0;
        				state.legendData.max = 800; 
                        state.legendData.min = -800; 
                    }
                } else if (state.physicianCode == 2){       
                    if(state.calculation == 'net'){
                        state.legendData.median = 0;
                        state.legendData.max = 100;
                        state.legendData.min = -100;
                    } else if (state.calculation == "netToAll"){
                        state.legendData.median = 0;
                        state.legendData.max = 800; 
                        state.legendData.min = -800;  
                    }
                }
                    
            	dispatch.call("dataReady", this, state);
        	});
    }

    state.changePhysicianCode = function(value){
    	state.physicianCode = +value;
    	state.loadData();
    }

    state.changeSpecialtyCode = function(value){
    	state.specialtyCode = +value;
    	state.specialtyName = specialtyCodeNamesMap.get(state.specialtyCode).specialty_name;
    	state.loadData();
    }

    state.changeCalculation = function(value){
    	state.calculation = value;
    	 if (value == "net" || value == "netToAll" || value == "retention"){
    	 		state.changeSpecialtyCode(0);
    	 }
    	state.loadData();
    }

    state.changeUSState = function(value){
    	//ignore if current calculation is retention or netToAll
    	if (!(state.calculation == "retention" || state.calculation == "netToAll")){
    	state.stateID = +value;
    	state.stateName = stateIDtoCode[state.stateID].name;
		state.statePostalCode = stateIDtoCode[state.stateID].code;
    	state.loadData();
    	}
    }

    /////////////////////////////////////////////////////////////
  ////////////////////// Color Scale //////////////////////
  /////////////////////////////////////////////////////////////
    state.updateColorScale = function(){
        var median = +state.legendData.median;
        var max = +state.legendData.max;
        var min = +state.legendData.min;

        var scaleInterval = Math.min((median-min)/2,(max-median)/2)
        var domainOfScale = [median - scaleInterval, median, median + scaleInterval];
        // if (state.calculation == "net" || state.calculation == "netToAll") {
        // 	scaleInterval = scaleInterval/2;
        // 	domainOfScale = [median - 3*scaleInterval, median - 2*scaleInterval, median - scaleInterval, median, median + scaleInterval,median + 2*scaleInterval, median + 3*scaleInterval];
        // }

        var colors = ['#f2f0f7','#cbc9e2','#9e9ac8','#6a51a3'];
        state.colorScale.domain(domainOfScale);
                
         ///set the map colors based on the calculation type
        //for net, also alter the number of legend colors (double the colors)
        //and alter the domain to include positive and negative values centered on zero
            if (state.calculation == "import") {
                    colors = ['#f2f0f7','#cbc9e2','#9e9ac8','#6a51a3'];
            } else if (state.calculation == "export") {
                    colors = ['#feedde','#fdbe85','#fd8d3c','#d94701'];
            } else if (state.calculation == "net" || state.calculation == "netToAll") {
                    colors = ['#e66101','#fdb863','#b2abd2','#5e3c99'];//['#b35806','#e08214','#fdb863','#fee0b6','#d8daeb','#b2abd2','#8073ac','#542788'];
            } else {
                    colors = ['#edf8e9','#bae4b3','#74c476','#238b45'];
            }

            state.colorScale.range(colors);

            dispatch.call("colorScaleReady", this, state.colorScale);

    }

            return state;
}

export {stateIDtoCode, specialtyCodeNames, appState};

