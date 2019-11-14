<!DOCTYPE html>
<html>
 <head>
   <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
   <title>DocFlows</title>
  
   <link href="css/normalize.css" rel="stylesheet">
   <link href="css/skeleton.css" rel="stylesheet">

   <style>
button.accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
    height: auto;
    line-height: 100%;
    white-space: normal;
    text-transform: none;
}

button.accordion.active, button.accordion:hover {
    background-color: #ddd;
}

button.accordion:after {
    content: '\002B';
    color: #777;
    font-weight: bold;
    float: right;
    margin-left: 5px;
}

button.accordion.active:after {
    content: "\2212";
}

div.panel {
    padding: 0 18px;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
}
</style>

     <!-- Mobile Specific Metas
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">
 </head>
 <body>
 <div class="container">
<div class="row"><section class="grad" id="header"><h1>DocFlows</h1>



        <ul class="topnav" id="myTopnav">
          <li ><a href="index.php">Home</a></li>
           <li ><a href="about.php">About</a></li>
            <li ><a href="help.php">Help</a></li>
            <!-- <li ><a href="">Contact</a></li> -->
            <li class="icon">
    <a href="javascript:void(0);" onclick="navbarRespond()">&#9776;</a>
  </li>
          
        </ul>
    </section></div>
    <br>
    <div class="row">
      <h3>About</h3>
      <button class="accordion">About the Project</button>
<div class="panel">
  <p>The DocFlows Model describes the movement of physicians between states during the six-year period 2009-2015. Using an interactive, web-based system the DocFlows model displays physician migration patterns from state-to-state on a map of the 50 US states and Washington DC.  The model makes use of data from the 2009 and 2015 American Medical Association’s Physician Masterfile®. The DocFlows model gives users the ability to identify and illustrate the number and proportions of physicians going to and leaving from each of the 50 states and Washington, DC. The system includes MDs and DOs and allows the user to compare flows of physicians who were residents in 2009 to all actively practicing physicians. Users identify which state to analyze by clicking on (or “selecting”) that state (which will then turn gray) and then choosing which calculation to apply (import to the state, export from the state, and net gain/loss for the state) for either residents or actively practicing physicians. The model also gives the user the option to narrow down results from all doctors to only those in a specialty.</p>
</div>
      <button class="accordion">Which physicians are included in the DocFlows model?</button>
<div class="panel">
  <p>The DocFlows model focuses on two classifications of physicians: (1) those who were residents-in-training in 2009 and also actively practicing medicine in 2015; and (2) those who were actively practicing, non-resident physicians in 2009 and still practicing medicine in 2015. The term resident also includes clinical fellows in advanced training. Physicians are considered active if they are working directly with patients or employed to perform medically related non-patient care activities (i.e. administration or medical research) and they are <strong>not</strong>: retired, semi-retired, temporarily not in practice, not active for other reasons, or 80 years or older in 2015.</p>
  </div>
        <button class="accordion">How many physicians are included in the DocFlows model?</button>
<div class="panel">
  <p>The 2009 Masterfile included records for 1,043,956 physicians. After removing 139,569 non-active or deceased physicians, 6,795 physicians who were either missing practice-state information or were working in foreign countries and 12,405 physicians who were working in US territories or military areas, 885,817 physicians/residents were retained.</p> 
<p>The 2015 Masterfile included records for 1,429,321 physicians. After removing 543,172 non-active or deceased physicians (including residents), 18,323 physicians who were either missing practice-state information or were working in foreign countries and 10,808 physicians who were working in US territories or military bases, 857,018 physicians were retained.</p> 
<p>The 2009 and 2015 Masterfiles were merged together resulting in 1,429,659 physicians, 889,476 of which had active records in both years. After removing 4,582 physicians who had been active in 2015 but not in 2009, 95,985 who had been active in 2009 but not 2015, and 4 residents who claimed to attend pediatric surgical residencies in North Carolina despite the state not offering residencies in that practice area, a final data set of 777,905 records was used in the model. 
</p>
</div>
      <button class="accordion">Why does the DocFlows tool model physicians from 2009 to 2015?</button>
<div class="panel">
  <p>In order to be as current as possible, the DocFlows tool used the most recent Masterfile available during model development (2015) to determine the final state of employment. The 2009 Masterfile was chosen to define state of training for residents and original state of employment for active physicians. The six-year gap allowed enough time for most residents to have completed their training and found employment. Residencies and fellowships vary by length of time however, and there are people in more lengthy training programs like neurosurgery and plastic surgery who may not yet have had the chance to complete their training and find employment in the 50 US states and Washington DC. There were 6,381 individuals (5% of 2009 residents) who were still in a residency program in 2015 and were not included in the model. </p>
  </div>
        <button class="accordion">Which specialties are included in the DocFlows model?</button>
<div class="panel">
  <p>Physicians (including residents) in the Masterfile reported more than 300 specialties. In order to simplify the model and increase its utility, these specialties were collapsed into 35 categories. The 35 specialties were developed according to training pathways. For example, in surgery, all surgical specialties for which individuals first train in general surgery residencies are grouped with the "surgery" category. For internal medicine sub-specialties, however, each were placed within their own categories (e.g., endocrinology, cardiology, nephrology, etc.). While we sought to apply consistent decision rules when assigning specialties into categories, the many unique situations for some specialties required some flexibility. For a detailed description of the logic used to collapse specialties please see APPENDIX.</p>
  <p>Physicians were assigned to the 35 specialties using five sequential steps making use of the self-reported first and second specialties as well as certification data from the American Board of Medical Specialties (ABMS). The logic of assignment followed these rules
  <ul>
    <li>Rule 1: If no ABMS certifications identified, use AMA primary specialty.</li>
    <li>Rule 2: If primary specialty in MF matches first ABMS certificate, this is physician specialty.</li>
    <li>Rule 3: If primary specialty in MF does not match the first ABMS certificate and no other ABMS certificate is identified, use first ABMS certificate.</li>
    <li>Rule 4: If primary specialty in MF does not match the first ABMS certificate, but matches the second ABMS certificate, use the second ABMS certificate</li>
    <li>Rule 5: If rules 1 to 4 have not been applied, use first ABMS certificate.</li>
  </ul></p>
  <p>This app uses the state identified by residents in the Masterfile as their office state. It is possible however, that the reported state is not actually the state in which their residency was located. For example, some residents commute over state boundaries to undertake their training and may have provided their home state as their address. Others might report their parent’s address as their office state. Situations like these could result in an individual claiming a residency specialty in a state that does not offer that program. This does not negate the migration analysis, however, as the results still show migration behaviors of residents but in some cases, it is from their home state (as opposed to residency state) to their working state.</p>
  </div>
      <button class="accordion">What do the calculations (import, export, net and retention) mean?</button>
<div class="panel">
  <p>The <strong>import</strong> calculation shows the user the number and percent of physicians in practice in the selected state in 2015 who were in another state in 2009. To see the number from the exporting state (which is selected and grayed out on the map), the user can hover their cursor over any other state. 
</p>
<p>
 The <strong>export</strong> calculation shows the user the number and percent of physicians the selected state (which is selected and grayed out on the map) exported to other states between 2009 and 2015. To see that number, the user hovers their cursor over any other state.  
</p>
<p>There are two <strong>net</strong> calculations: <strong>net (state to state)</strong> and <strong>net (state to all)</strong>. The <strong>net (state to state)</strong> calculation shows the user the imports minus exports for each state relative to the selected state. This calculation answers the question “Did the selected state give more or get more physicians from every other individual state?”. </p>
<p>
A state that is colored <span style="color:purple">purple</span> exported more physicians to the selected state (gray) than it imported from the selected state. The number shown when hovering over a <span style="color:purple">purple</span> state indicates how many more physicians the selected state exported than it imported. 
</p>
<p>An <span style="color:orange">orange</span> state imported more physicians to the selected state (gray) than it exported to the selected state. The number shown when hovering over an <span style="color:orange">orange</span> state will indicate how many more physicians the selected state imported than exported to the selected state.</p>
<p>The <strong>net (state to all)</strong> calculation shows the user the imports minus exports for each state relative to the whole rest of the country. It answers the question: Which states are net importers of physicians overall and which states are net exporters overall. Instead of showing information from state to state, it shows information from each state to the rest of the country. Note that no state is selected when using this calculation.</p>
<!-- <p>
The <strong>net (state-to-state)</strong> displays the net migration rate of the selected state relative to each other state, while the <strong>net (state-to-all)</strong> selection displays the net migration rate for each state relative to all other states in aggregate. The <strong>net migration rate</strong> is calculated as Imports - Exports / Population * 1000 where Population is the Physician or Resident population for a given state in 2009. 
</p> -->
<p>
The <strong>retention</strong> calculation shows the user the number and percent of physicians who were retained by each state when the cursor is used to hover over a state. Note that no state is selected when using this calculation. 
</p>
  </div>
    <button class="accordion">Why can’t I do <em>net</em> and <em>retention</em> calculations for individual specialties?</button>
<div class="panel">
  <p>Specialty specific information is <strong>not</strong> available for <em>net</em> and <em>retention</em> calculations because physicians change their practice specialties often enough to substantially affect the results and provide an inaccurate number.  Physicians claiming one specialty in 2009 may claim a different one in 2015 based upon their content or focus of practice—not their certification or training. This is particularly true for residents; states with high concentrations of teaching hospitals will have high export rates for broad specialty classifications like internal medicine and general surgery. These are core certifications that lead to more focused areas of practice. Similarly, those states will have proportionately fewer exports of more specialized areas of practice. </p>
  <p>Specialty specific information is available for the <em>import</em> and <em>export</em> calculations, imports are based on 2015 specialties and exports are based on 2009 specialties assigned using the algorithm detailed above. </p>
  </div>
    </div>
       
    
     
 
   <div class="u-full-width" id="note">
<p>*This project was supported by the Health Resources and Services Administration (HRSA) of the U.S. Department of Health and Human Services (HHS) under HRSA Cooperative Agreement U81HP26495-04-01: Health Workforce Research Centers Program, with a total award amount of $545,050. The content and conclusions are those of the authors and should not be construed as the official position or policy of, nor should any endorsements be inferred by HRSA, HHS or the U.S. Government.<br>
**This project is still under development.<p>
</div>
<div class="grad u-full-width"><div class="logo"><object id="unc-logo" type="image/svg+xml" data="UNC_shepsWHITE.svg">
					Sheps Center
				</object></div></div>

</div>
</div>
</div>
</div>
   <!-- <script type="text/javascript" src="js/d3.v4.min.js"></script> -->
   <!-- <script type="text/javascript" src="js/d3.min.custom.js"></script> -->
   <!-- <script type="text/javascript" src="js/d3-scale-chromatic.v1.min.js"></script> -->
   <!-- <script type="text/javascript" src="js/topojson.v2.min.js"></script> -->
   <!-- <script src="js/d3-queue.v2.min.js"></script> -->
  <!-- <script type="text/javascript" src="js/saveSvgAsPng.js"></script> -->
   <!-- <script type="text/javascript" src="js/bundle.js"></script> -->

   <script>
  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navbarRespond() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

(function(){
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }

}
})();

</script>

 </body>
</html>
