var container = document.getElementById("container");
var result = document.getElementById("result");
var indicator = 0;
var specStatement = document.getElementById('specStatement');
var title = document.getElementById('title');
var statement = document.getElementById('statement');
var party = document.getElementById('party');
var list = document.getElementById('list');
var resultBar = document.getElementById('resultBars');
var subjectNumber = document.getElementById('subjectNumber');
var resultscreen = document.getElementById('resultModal');
var answers = [];
container.style.display = 'none';
resultscreen.style.display = 'none';

// Sets a match var for every party
parties.map(p => p.match = 0);

subjects.forEach(subject => {
	answers.push({
		title: subject.title,
		answer: null
	})
});



function start() {
	container.style.display = '';
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
		if (indicator <= 0){
			location.reload();
		}
	}
	
	else {	
		answers[indicator].answer = choosen;
		indicator++;
	}

	if (indicator >= subjects.length) {
		showResult();
	}
	else{
		editText();
	}
}

function editText() {
	// Sets the title and statement of the subject  
	subjectNumber.innerHTML = indicator +"/" + subjects.length; 
	title.innerHTML = subjects[indicator]["title"];
	statement.innerHTML = subjects[indicator]["statement"];
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

		var div = document.createElement('div');
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




// showResult();

function showResult() {
	//Sorts the party's with those with the highest match on top
	//Also make's a li element with a progress bar and a p element for every party 

	container.style.display = "none";
	resultscreen.style.display = '';
	answers.forEach((answer, index) => {
		for (party of subjects[index]['parties']) {
			if (answer.answer != "none") {
				let targetparty = parties.find(p => p.name == party.name);
				if (answer.answer == party.position) {
					targetparty.match += 1
				}
				else {
					targetparty.match += -1
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
		let percentage = (result2.match / subjects.length * 100.).toFixed(0)
		percentage = percentage < 0 ? 0 : percentage;
		let li = document.createElement('li');
		let outerDiv = document.createElement('div');
		let innerDiv = document.createElement('div');
		let p = document.createElement('p');
		p.innerHTML = result2.name+" " + percentage + "%";
		outerDiv.className = "progress";
		innerDiv.className = "progress-bar";
		innerDiv.style.width = (percentage + '%');
		outerDiv.appendChild(innerDiv);
		li.appendChild(p);
		li.appendChild(outerDiv);
		resultBar.appendChild(li);		
	}


}





