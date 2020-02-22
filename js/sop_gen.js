var totalORAPhotos = 28;
var nextORAPhoto = Math.floor((Math.random() * totalORAPhotos) + 1 );


function loadTOC(searchString){
	/*$.ajax({
		dataType: "json",
		url: "./SOPfile.json",
		success: function(data){
			var addIndex = 0;
			jQuery.expr[':'].contains = function (a, i, m) {
				return jQuery(a).text().toLowerCase().indexOf(m[3].toLowerCase()) >= 0;
			}
			$(data).find("a:contains("+searchString.toLowerCase()+")").each(function(){
				if($(this).attr("href").slice($(this).attr("href").length - 5, $(this).attr("href").length) === ".json"){
					var files = $(this).attr("href");
					$('<button onclick=loadSOP('+ addIndex + ',' + '"./SOPs/'+$(this).attr("href")+'")></button>').html(decodeURI(files).slice(0,-5)).appendTo('#buildTOC');
					addIndex++;
				}
			});
		}
	});*/
	//1
	$('<button onclick=loadSOP(0,"./SOPs/Suspendisse%20Felis%20Turpis.json")></button>').html(decodeURI("Suspendisse Felis Turpis.json").slice(0,-5)).appendTo('#buildTOC');
	//2
	$('<button onclick=loadSOP(1,"./SOPs/Quisque%20Tincidunt%20Porta.json")></button>').html(decodeURI("Quisque Tincidunt Porta.json").slice(0,-5)).appendTo('#buildTOC');
	//3
	$('<button onclick=loadSOP(2,"./SOPs/Donec%20Eleifend%20Mauris%20Sed%20Orci.json")></button>').html(decodeURI("Donec Eleifend Mauris Sed Orci.json").slice(0,-5)).appendTo('#buildTOC');
};

function filterTOC(searchString){
	var h = document.getElementById("buildTOC");
	//var d = document.getElementById("footerTitle");
	//d.innerHTML += " D: \"" + searchString + "\"";
	$(h).css('min-height', $(h).height());
	
	var countButtons = $("#buildTOC").find("button").length;
	var addIndex = 0;
	/*$.ajax({
		url: "./SOPfile.json",
		success: function(data){
			$(data).find("a:contains("+searchString+")").each(function(){
				if($(this).attr("href").slice($(this).attr("href").length - 5, $(this).attr("href").length) === ".json"){
					addIndex++;
				}
			});
			//d.innerHTML += " countButtons: " + countButtons + "  addIndex: " + addIndex;
			if (countButtons!=addIndex){
				clearBlock("buildTOC");
				if (addIndex > 0) {loadTOC(searchString);}
				else {$('<h5 style="margin-left: 100px;">No results.</h5>').appendTo('#buildTOC');}
				$(h).css('min-height', 48);
			}

		}
	});*/
	clearBlock("buildTOC");
	//1
	if (("Suspendisse Felis Turpis").toLowerCase().includes(searchString.toLowerCase())){
		$('<button onclick=loadSOP(0,"./SOPs/Suspendisse%20Felis%20Turpis.json")></button>').html(decodeURI("Suspendisse Felis Turpis.json").slice(0,-5)).appendTo('#buildTOC');
	}
	//2
	if (("Quisque Tincidunt Porta").toLowerCase().includes(searchString.toLowerCase())){
		$('<button onclick=loadSOP(1,"./SOPs/Quisque%20Tincidunt%20Porta.json")></button>').html(decodeURI("Quisque Tincidunt Porta.json").slice(0,-5)).appendTo('#buildTOC');
	}
	//3
	if (("Donec Eleifend Mauris Sed Orci").toLowerCase().includes(searchString.toLowerCase())){
		$('<button onclick=loadSOP(2,"./SOPs/Donec%20Eleifend%20Mauris%20Sed%20Orci.json")></button>').html(decodeURI("Donec Eleifend Mauris Sed Orci.json").slice(0,-5)).appendTo('#buildTOC');
	}
	if (searchString === ".json") {
		loadTOC(".json");
	}
};

function goToSection(title){
	$('html, body').animate({
		scrollTop: $("div[id='"+title+"']").offset().top
		}, 600);
};

function expandPhoto(SOPfile, STEPno) {
	var w = document.createElement("div");
	w.setAttribute("id", "imageOverlay");

	var i = document.createElement("div");
	i.setAttribute("id", "imageOfOverlay");
	i.setAttribute("style", "background: url("+SOPfile+"); background-repeat: no-repeat; background-position: center center; background-size: contain");
	//var i = document.createElement("img");
	//i.setAttribute("src", SOPfile);
	//i.setAttribute("id", "imageOfOverlay");

	var s = document.createElement("div");
	s.setAttribute("id", "stepOfOverlay");
	s.setAttribute("class", "stepIcon stepTitle");

	var c = document.createElement("div");
	c.setAttribute("id", "closerOfOverlay");
	c.setAttribute("onclick", "clearPhoto()");
	//var t = document.createTextNode("&times;");
	//c.appendChild(t);
	w.appendChild(i);
	w.appendChild(c);
	w.appendChild(s);
	document.body.appendChild(w);
	//w.appendChild(i);
	document.getElementById("closerOfOverlay").innerHTML = "&times;";
	document.getElementById("stepOfOverlay").innerHTML = "<div class='stepTitleBig'>step</div><div class='stepIconBig'>" + STEPno + "</div>";

	var scrollPosition = [
		self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		self.pageYOffser || document.documentElement.scrollTop || document.body.scrollTop
	];

	//Get Window X, Y to lock scrolling while photo is open
	var html = jQuery('html');
	html.data('scroll-position', scrollPosition);
	html.data('previous-overflow', html.css('overflow'));
	html.css('overflow', 'hidden');
	window.scrollTo(scrollPosition[0], scrollPosition[1]);

};

function clearPhoto() {
	//Disable scrolling lock
	var html = jQuery('html');
	var scrollPosition = html.data('scroll-position');
	html.css('overflow', html.data('previous-overflow'));
	window.scrollTo(scrollPosition[0], scrollPosition[1]);

	var rid = document.getElementById("imageOverlay");
	while (rid.firstChild){
		rid.removeChild(rid.firstChild);
	}
	rid.remove();
};

function clearBlock(sectionTitle){
	var toClear = document.getElementById(sectionTitle);
	while(toClear.firstChild) {
		toClear.removeChild(toClear.firstChild);
	}
};

function showInfo(){
	document.getElementById("toggleTable").classList.remove('closed');
	document.getElementById("expandInfo").classList.remove('open');
	document.getElementById("expandInfo").classList.add('closed');
	document.getElementById("hideInfo").classList.remove('closed');
	document.getElementById("hideInfo").classList.add('open');
};

function hideInfo(){
	document.getElementById("toggleTable").classList.add('closed');
	document.getElementById("expandInfo").classList.remove('closed');
	document.getElementById("expandInfo").classList.add('open');
	document.getElementById("hideInfo").classList.remove('open');
	document.getElementById("hideInfo").classList.add('closed');
};

function clearVis(){
	var n = document.getElementById("searchbarText");
	if (n.value === "") {document.getElementById("resetTOC").style.visibility = "hidden";}
		else {document.getElementById("resetTOC").style.visibility = "visible";}
	//document.getElementById("footerTitle").innerHTML = n.value + " " + n.value.length;
	if(n.value.length === 0){filterTOC(".json");}
		else {filterTOC(n.value);}
}

function clearSearchbar(){
	var n = document.getElementById("searchbarText");
	n.value = "";
	document.getElementById("resetTOC").style.visibility = "hidden";
	filterTOC(".json");
}

function supplyDefinitions(SOPfile, jq){
	var dc = document.getElementById("definitions");
	var newt = document.createElement("table");
	newt.setAttribute("id", "defTable");
	//dc.appendChild(newt);
	
	var defCount = 0;
	for (var wrd in jq.Intro.Definitions) {
		if (jq.Intro.Definitions.hasOwnProperty(wrd)) { defCount++; }
	}

	var defs = " definitions";
	if (defCount === 0) {defs = " definition";}
	dc.innerHTML = "<p>"+defCount + defs +"</p>";
	if(defCount > 0) {
		dc.innerHTML+="<p>See <button onclick='goToSection(\"glossary\")'>Glossary</button> below for definitions.</p>";
		$("#getToGloss").click(function() {
		    $('html, body').animate({
		        scrollTop: $("#glossary").offset().top
		    }, 2000);
		});
	}
	
	clearBlock("glossTable");

	for (var r = 0; r < defCount; r++){
		var newr = document.createElement("tr");
			var newc1 = document.createElement("td");
			newc1.innerHTML = Object.keys(jq.Intro.Definitions)[r];
			newc1.classList.add("leftc");
			newr.appendChild(newc1);

			var newc2 = document.createElement("td");
			newc2.innerHTML = jq.Intro.Definitions[Object.keys(jq.Intro.Definitions)[r]];
			newc2.classList.add("rightc");
			newr.appendChild(newc2);

		newt.appendChild(newr);
	}

	document.getElementById("glossTable").append(newt);
};

function buildSOPInfo(SOPfile, jq){
	//$('#SOPinfoTitle').html(jq.Header.Title + ": Information&nbsp;&nbsp;<span id='expandInfo' onclick='showInfo()'>&cudarrl;</span><span id='hideInfo' class='closed' onclick='hideInfo()'>&mapstoup;</span>");
	$('#SOPinfoTitle').html(jq.Header.Title + ": Information");
	$('#infoArrow').html("<span id='expandInfo' class='open pull-right' onclick='showInfo()'>&#x25be;</span><span id='hideInfo' class='closed pull-right' onclick='hideInfo()'>&#x25be;</span>");
	clearBlock("SOPtable1");
	clearBlock("SOPtable2");
	var hdrCount = 0;
	var tbl1 = document.getElementById("SOPtable1");
	//tbl1.setAttribute("class", "col-sm-5 ml-auto");
	for (var itm in jq.Header) {
		if (jq.Header.hasOwnProperty(itm)) { hdrCount++; }
	}
	
	for (var r = 0; r < hdrCount; r++){
		var newr = document.createElement("tr");

		//for (var c = 0; c < 2; c++){
			var newc1 = document.createElement("td");
			newc1.className += "leftc";
			newc1.innerHTML = Object.keys(jq.Header)[r];
			newr.appendChild(newc1);

			var newc2 = document.createElement("td");
			newc2.className += "rightc";
			//newc2.innerHTML = jq.Header.Title;//"(Object.keys(jq.Header)[r])";
			newc2.innerHTML = jq.Header[Object.keys(jq.Header)[r]];
			newr.appendChild(newc2);
		//}

		//newr.innerHTML = "Row " + r;
		tbl1.appendChild(newr);
	}

	var introCount = 0;
	var tbl2 = document.getElementById("SOPtable2");
	//tbl2.setAttribute("class", "col-sm-5 mr-auto");
	
	var introCount = 0;
	for (var itm in jq.Intro) {
		if (jq.Intro.hasOwnProperty(itm)) { introCount++; }
	}

	for (var r = 0; r < introCount; r++){
		var newr = document.createElement("tr");

		//for (var c = 0; c < 2; c++){
			var newc1 = document.createElement("td");
			newc1.className += "leftc";
			newc1.innerHTML = Object.keys(jq.Intro)[r];
			newr.appendChild(newc1);

			var newc2 = document.createElement("td");
			newc2.className += "rightc";
			//newc2.innerHTML = jq.Header.Title;//"(Object.keys(jq.Header)[r])";
			newc2.innerHTML = jq.Intro[Object.keys(jq.Intro)[r]];
			newr.appendChild(newc2);
			if (Object.keys(jq.Intro)[r] === "Definitions"){
				newc2.setAttribute("id", "definitions");
			}
		//}

		//newr.innerHTML = "Row " + r;
		tbl2.appendChild(newr);
	}

	supplyDefinitions(SOPfile, jq);
	//tbl.innerHTML = "This is the table " + hdrCount + " // " + introCount;
};


function clearTOCbuttons(index){
	var toChange = document.getElementById("buildTOC");
	for (var i = 0; i < toChange.childNodes.length; i++){
			toChange.childNodes[i].className = "";
		}
	toChange.childNodes[index].className = "activeTOC";
};


function markDone(btnToChange, num) {
	var btnNow = document.getElementById(btnToChange);
	var hideSubs = btnToChange.slice(0,-3);
	var theSubs = document.getElementsByClassName(hideSubs);
	if (theSubs.length > 0) {
		btnNow.innerHTML = '<p class="stepTitle">'+num+'...</p>&#x2714;';
	} else {
		btnNow.innerHTML = '<p class="stepTitle">'+num+'</p>&#x2714;';
	}
	btnNow.classList.add("stepDone");
	btnNow.onclick = function(){markUndone(btnToChange, num);};
	for (var i = 0; i < theSubs.length; i++){
			$(theSubs[i]).addClass('closed');
	}
};

function markUndone(btnToChange, num) {
	var btnNow = document.getElementById(btnToChange);
	btnNow.innerHTML = '<p class="stepTitle">Step</p>'+num;
	btnNow.classList.remove("stepDone");
	btnNow.onclick = function(){markDone(btnToChange, num);};
		var hideSubs = btnToChange.slice(0,-3);
	var hideSubs = btnToChange.slice(0,-3);
	var theSubs = document.getElementsByClassName(hideSubs);
	for (var i = 0; i < theSubs.length; i++){
			$(theSubs[i]).removeClass('closed');
	}
};

function loadSOP(index, SOPfile){
	clearBlock("buildSOP");
	document.getElementById("toggleTable").classList.add('closed');
	if (index!=-1){clearTOCbuttons(index);}
	//document.getElementById("TOCtitle").innerHTML = "GOT IT";

	//window.location.href = '#sopinfo';
	$.getJSON(SOPfile, function(jq) {
		buildSOPInfo(SOPfile, jq);
		//$('#SOPtitle').html(jq.Header.Title + ": Steps");

		var stepCount = 0;
		for (var step in jq.SOP) {
			if (jq.SOP.hasOwnProperty(step)) { stepCount++;}
		}

		
		//$('#buildSOP').append('<h2 id="SOPtitle">'+jq.Header.Title+': Steps</h2>');
		document.getElementById('SOPtitle').innerHTML = jq.Header.Title+': Steps';
		$('#footerTitle').html('<h4>'+jq.Header.Title+'</h4>');

		for (var i = 0; i < stepCount; i++)
		{
			var nowCodeOuter = '<div class="row"><div class="col-sm-4" id="step'+(i+1)+'OuterCode1"></div><div class="col-sm-8" id="step'+(i+1)+'OuterCode2"></div></div>';
			$('#buildSOP').append(nowCodeOuter);
			
			if (jq.SOP["Step"+(i+1)].img)
			{
				$('#step'+(i+1)+'OuterCode1').html('<h3 class="stepIcon" id="step'+(i+1)+'btn" onclick="markDone(\'step'+(i+1)+'btn\', '+(i+1)+')"><p class="stepTitle">Step</p>'+(i+1)+'</h3>');
				$('#step'+(i+1)+'OuterCode1').append('<div class="stepContainer"><img class="steps" id="step'+(i+1)+'img" src="'+jq.SOP["Step"+(i+1)].img+'" onclick="expandPhoto(\''+jq.SOP["Step"+(i+1)].img+'\', '+(i+1)+')"></div>');
			} else {
				$('#step'+(i+1)+'OuterCode1').html('<h3 class="stepIcon" id="step'+(i+1)+'btn" onclick="markDone(\'step'+(i+1)+'btn\', '+(i+1)+')"><p class="stepTitle">Step</p>'+(i+1)+'</h3><div class="stepImgContainer" style="background-image: url(\'./images/filler/ORA'+nextORAPhoto+'.jpg\'); background-size: cover;"></div>');
				nextORAPhoto++; if (nextORAPhoto > totalORAPhotos) {nextORAPhoto = 1;}
			}

			var nowCodeInner = '<div class="row"><div class="stepItem col-sm-5 col-xs-6" id="step'+(i+1)+'InnerCode1"></div><div class="stepItem col-sm-7 col-xs-6" id="step'+(i+1)+'InnerCode2"></div></div>';
			$('#step'+(i+1)+'OuterCode2').append(nowCodeInner);
			//$('#step'+(i+1)+'InnerCode1').html("Step " + (i+1));
			//$('#step'+(i+1)+'InnerCode1').html(jq.SOP.Step1.txt);
			$('#step'+(i+1)+'InnerCode1').html(jq.SOP["Step"+(i+1)].txt);
			//$('#step'+(i+1)+'InnerCode2').html("Description" + (i+1));
			$('#step'+(i+1)+'InnerCode2').html(jq.SOP["Step"+(i+1)].des);

			//Start SubSteps - If they exist
			if (jq.SOP["Step"+(i+1)].substeps){

				var subStepCount = 0;

				for (var substepitem in jq.SOP["Step"+(i+1)].substeps) {
					if (jq.SOP["Step"+(i+1)].substeps.hasOwnProperty(substepitem)) {subStepCount++;}
				}

				for (var j = 0; j < subStepCount; j++){
					var subCodeOuter = '<div class="row step'+(i+1)+'"><div class="col-xs-1 col-sm-1"></div><div class="col-xs-11 col-sm-3" id="step'+(i+1)+"-"+(j+1)+'OuterCode1"></div><div class="col-sm-8" id="step'+(i+1)+"-"+(j+1)+'OuterCode2"></div></div>';
					$('#buildSOP').append(subCodeOuter);

					if (jq.SOP["Step"+(i+1)].substeps[(j+1)].img)
					{
						$('#step'+(i+1)+"-"+(j+1)+'OuterCode1').html('<h3 class="substepIcon" id="step'+(i+1)+"-"+(j+1)+'btn" onclick="markDone(\'step'+(i+1)+"-"+(j+1)+'btn\', \''+(i+1)+"-"+(j+1)+'\')"><p class="substepTitle">Step</p>'+(i+1)+"-"+(j+1)+'</h3>');
						$('#step'+(i+1)+"-"+(j+1)+'OuterCode1').append('<div class="stepContainer"><img class="substeps" id="step'+(i+1)+"-"+(j+1)+'img" src="'+jq.SOP["Step"+(i+1)].substeps[(j+1)].img+'" onclick="expandPhoto(\''+jq.SOP["Step"+(i+1)].substeps[(j+1)].img+'\', \''+(i+1)+"-"+(j+1)+'\')"></div>');
					} else {
						//$('#step'+(i+1)+"-"+(j+1)+'OuterCode1').html('<h3 class="stepIcon" id="step'+(i+1)+"-"+(j+1)+'btn" onclick="markDone(\'step'+(i+1)+"-"+(j+1)+'btn\', \''+(i+1)+"-"+(j+1)+'\')"><p class="stepTitle">Step</p>'+(i+1)+"-"+(j+1)+'</h3><div class="substepNumContainer"><img id="box1" class="substeps" src="./images/ORA'+Math.floor((Math.random() * 28) + 1 )+'.jpg"></img><div class=subfloatImgNum>'+(i+1)+"-"+(j+1)+'</div></div>');
						$('#step'+(i+1)+"-"+(j+1)+'OuterCode1').html('<h3 class="substepIcon" id="step'+(i+1)+"-"+(j+1)+'btn" onclick="markDone(\'step'+(i+1)+"-"+(j+1)+'btn\', \''+(i+1)+"-"+(j+1)+'\')"><p class="substepTitle">Step</p>'+(i+1)+"-"+(j+1)+'</h3><div class="substepImgContainer" style="background-image: url(\'./images/filler/ORA'+Math.floor((Math.random() * 28) + 1 )+'.jpg\'); background-size: cover;"></div>');
						nextORAPhoto++; if (nextORAPhoto > totalORAPhotos) {nextORAPhoto = 1;}
					}	

					

					var subCodeInner = '<div class="row"><div class="stepItem col-sm-5 col-xs-6" id="step'+(i+1)+"-"+(j+1)+'InnerCode1"></div><div class="stepItem col-sm-7 col-xs-6" id="step'+(i+1)+"-"+(j+1)+'InnerCode2"></div></div>';
					$('#step'+(i+1)+"-"+(j+1)+'OuterCode2').append(subCodeInner);
					//$('#step'+(i+1)+'InnerCode1').html("Step " + (i+1));
					//$('#step'+(i+1)+'InnerCode1').html(jq.SOP.Step1.txt);
					$('#step'+(i+1)+"-"+(j+1)+'InnerCode1').html(jq.SOP["Step"+(i+1)].substeps[(j+1)].txt);
					//$('#step'+(i+1)+'InnerCode2').html("Description" + (i+1));
					$('#step'+(i+1)+"-"+(j+1)+'InnerCode2').html(jq.SOP["Step"+(i+1)].substeps[(j+1)].des);

				}

			}

		}

	});

	goToSection("sopinfo");

};

$(document).ready(function(e) {
	//var fileLocation = './plans/SOPOL.json';
	loadTOC(".json");
	goToSection('home');
	document.getElementById("searchbarText").addEventListener("keyup", clearVis);
});
