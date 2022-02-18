var container = document.getElementById("container");
var navbar = document.getElementById("navbar");
var result = document.getElementById("result");
var indicator = 0;
var specStatement = document.getElementById('specStatement');
var title = document.getElementById('title');
var statement = document.getElementById('statement');
var proButton = document.getElementById('proButton');
var contraButton = document.getElementById('contraButton');
var party = document.getElementById('party');
var list = document.getElementById('list');
var resultBar = document.getElementById('resultBars');
var subjectNumber = document.getElementById('subjectNumber');
var resultscreen = document.getElementById('resultModal');
var answers = [];
var totalSelected = 0;
var Allselected = false;
var Activeselect = false;
container.style.display = 'none';
navbar.style.display = 'none';
resultscreen.style.display = 'none';
document.getElementById("beforeResult").style.display = 'none';
document.getElementById("beforeAnswers1").style.display = 'none';

// Sets a match var for every party
parties.map(p => p.match = 0);
parties.map(p => p.selected = 0);

subjects.forEach(subject => {
	answers.push({
		title: subject.title,
		weight: null,
		answer: null
	})
});



function start() {
	container.style.display = '';
	navbar.style.display = '';
	document.getElementById('start').style.display = 'none';
	body = document.getElementsByTagName('body')[0];
	document.body.style.background = "#f3f3f3";
	editText();
}

function answer(choosen) {
	if (choosen == "skip") {
		indicator++;
	}

	else if (choosen == "back") {
		indicator--;
		if (indicator < 0) {
			location.reload();
		}
	}

	else {
		answers[indicator].answer = choosen;
		indicator++;
	}

	if (indicator >= subjects.length) {
		getAnswers();
	}
	else {
		editText();
	}
}

function editText() {
	proButton.style.border = ""
	contraButton.style.border = ""
	// Sets the title and statement of the subject  
	subjectNumber.innerHTML = indicator + 1 + "/" + subjects.length;
	title.innerHTML = subjects[indicator]["title"];
	statement.innerHTML = subjects[indicator]["statement"];
	if (answers[indicator] != null) {
		if (answers[indicator].answer == 'pro') {
			proButton.style.border = "solid blue 10px"
		}
		else if (answers[indicator].answer == 'contra') {
			contraButton.style.border = "solid blue 10px"

		}
	}
	unSelect();
	getParties();
}


function getParties() {
	let sortedNames = [...subjects[indicator].parties.map(p => p.name)].sort();
	let sortedParties = sortedNames.map(n => subjects[indicator].parties.find(x => x.name == n));
	sortedParties.forEach((item, index) => {
		if (item.position == "pro") {
			addList = document.getElementById('partyPro');
		}
		else if (item.position == "none") {
			addList = document.getElementById('partyNeither');
		}
		else if (item.position == "contra") {
			addList = document.getElementById('partyContra');
		}
		var list2 = document.createElement('li');
		var node = document.createElement('input');
		node.className = "w3-button w3-xlarge w3-round-small thoughts2";
		node.type = "button";
		node.value = item["name"]
		node.onclick = function () {
			myFunction2(item['name'])
			node.style.borderBottomLeftRadius = "0px";
			node.style.borderBottomRightRadius = "0px";

		};

		let div = document.createElement('div');
		div.id = item["name"]
		div.className = "spec_statement_modal"
		div.style = "display:none"

		div.innerHTML = item["opinion"]


		// var p = document.createElement('p');
		// p.innerHTML = item["name"];

		list2.appendChild(node);
		list2.appendChild(div);
		addList.appendChild(list2);

	})
}


function getAnswers() {
	document.getElementById("beforeAnswers1").style.display = '';
	container.style.display = "none";
	navbar.style.display = "none";
	// beforeAnswers
	addList = document.getElementById('beforeAnswers');
	addList.innerHTML = '';
	answers.forEach((item, index) => {
		var list2 = document.createElement('li');
		var node = document.createElement('input');
		node.className = "w3-button w3-xlarge w3-round-small partiesoverview";
		node.type = "button";
		node.value = item["title"];
		node.onclick = function () {
			if (!item.weight) {
				item.weight = true;
				node.style.backgroundColor = "#233fff";
				node.style.color = "white";
			}
			else {
				item.weight = false;
				node.style.backgroundColor = "#fff";
				node.style.color = "black";
			}
		};

		list2.appendChild(node);
		addList.appendChild(list2);
	})
}


//empty's subject and opinions of the party so it can be set afterwards
function unSelect() {
	addList = document.getElementById('partyPro');
	addList.innerHTML = "";
	addList = document.getElementById('partyNeither');
	addList.innerHTML = "";
	addList = document.getElementById('partyContra');
	addList.innerHTML = "";
}


function myFunction() {
	var x = list;
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
		document.getElementById("opinions").style.borderBottom = "white";
		document.getElementById("opinions").style.borderBottomLeftRadius = "0px";
		document.getElementById("opinions").style.borderBottomRightRadius = "0px";

	} else {
		x.className = x.className.replace(" w3-show", "");
		document.getElementById("opinions").style.borderBottom = "1px solid black";
		document.getElementById("opinions").style.borderBottomLeftRadius = "";
		document.getElementById("opinions").style.borderBottomRightRadius = "";

	}
}

function myFunction2(showParty) {
	list2 = document.getElementById(showParty);
	var x = list2;
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}

function selectparties() {
	document.getElementById("beforeAnswers1").style.display = 'none';

	document.getElementById("beforeResult").style.display = '';
	document.getElementById("gotoResult").disabled = true;

	let sortedNames = [...subjects[0].parties.map(p => p.name)].sort();
	let sortedParties = sortedNames.map(n => subjects[0].parties.find(x => x.name == n));
	addList = document.getElementById('resultBars2');
	addList.innerHTML = '';
	sortedParties.forEach((item, index) => {
		var list2 = document.createElement('li');
		var node = document.createElement('input');
		node.className = "w3-button w3-xlarge w3-round-small partiesoverview";
		node.type = "button";
		node.value = item["name"]
		let targetparty = parties.find(p => p.name == item.name);
		node.onclick = function () {
			if (targetparty.selected == 0) {
				targetparty.selected = 1;
				node.style.backgroundColor = "#233fff";
				node.style.color = "white";
				totalSelected++;
			}
			else {
				totalSelected--;
				targetparty.selected = 0;
				node.style.backgroundColor = "#fff";
				node.style.color = "black";
			}
			console.log(totalSelected);
			totalSelected >= 3 ? (document.getElementById("gotoResult").disabled = false) :
				(document.getElementById("gotoResult").disabled = true);
		};

		if (targetparty.selected == 1) {
			node.style.backgroundColor = "#233fff";
			node.style.color = "white";
			totalSelected++;
			if (totalSelected >= 3) {
				document.getElementById("gotoResult").disabled = false;
			}
		}
		list2.appendChild(node);
		addList.appendChild(list2);
	})
}
var sortedNamesSelect = [...subjects[0].parties.map(p => p.name)].sort();
var sortedPartiesSelect = sortedNamesSelect.map(n => subjects[0].parties.find(x => x.name == n));
function selectAll() {

	sortedPartiesSelect.forEach((item, index) => {
		let targetparty = parties.find(p => p.name == item.name);
		Allselected == false ? (targetparty.selected = 1) : (targetparty.selected = 0);

	})
	Allselected == true ? (Allselected = false) : (Allselected = true);

	selectparties();
}

function selectActiveParties() {
	sortedPartiesSelect.forEach((item, index) => {
		let targetparty = parties.find(p => p.name == item.name);
		if (targetparty.size > 0) {
			Activeselect == false ? (targetparty.selected = 1) : (targetparty.selected = 0);
		}
	})
	Activeselect == true ? (Activeselect = false) : (Activeselect = true);
	selectparties();
}

// showResult();
function showResult() {
	//Sorts the party's with those with the highest match on top
	//Also make's a li element with a progress bar and a p element for every party 
	document.getElementById("beforeResult").style.display = 'none';
	container.style.display = "none";
	navbar.style.display = "none";
	resultscreen.style.display = '';
	answers.forEach((answer, index) => {
		for (party of subjects[index]['parties']) {
			if (answer.answer != "none") {
				
				let targetparty = parties.find(p => p.name == party.name);
				if (answer.answer == party.position) {
					answer.weight == true ? (targetparty.match += 1) : '';
					targetparty.match += 1
				}
				else {
					answer.weight == true ? (targetparty.match += -0.5) : '';
					targetparty.match += -0.5
				}
			}
		}
	});
	let count = answers.filter(a => a.answer == "none").length;
	if (count >= Math.ceil(subjects.length / 2)) {
		console.log("Heeft een mening gebruikt zijn mening niet wat een meme!")
	}
	let sorted = parties.sort((a, b) => b.match - a.match);
	for (result2 of sorted) {
		if (result2.selected == 1) {
			let percentage = (result2.match / subjects.length * 100.).toFixed(0)
			percentage = percentage < 0 ? 0 : percentage;
			percentage > 100 ? (percentage = 100) : (percentage = percentage);
			let li = document.createElement('li');
			let outerDiv = document.createElement('div');
			let innerDiv = document.createElement('div');
			let p = document.createElement('p');
			p.innerHTML = result2.name + " " + percentage + "%";
			outerDiv.className = "progress";
			innerDiv.className = "progress-bar";
			innerDiv.style.width = (percentage + '%');
			outerDiv.appendChild(innerDiv);
			li.appendChild(p);
			li.appendChild(outerDiv);
			resultBar.appendChild(li);
		}

	}


}





