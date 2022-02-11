var container = document.getElementById("container");
var indicator = 0;
var specStatement = document.getElementById('specStatement');
var title = document.getElementById('title');
var statement = document.getElementById('statement');
var party = document.getElementById('party');
var list = document.getElementById('list');
var result = document.getElementById('result');
var answers = [];
container.style.display = 'none' ;

// Sets a match var for every party
parties.map(p => p.match = 0);

subjects.forEach(subject => {
	answers.push({
		title : subject.title,
		answer : null
	})
});




function start(){
	container.style.display = '' ;
	document.getElementById('start').style.display = 'none' ;	
	editText();
}

function editText (){
// Sets the title and statement of the subject  
	title.innerHTML = subjects[indicator]["title"] ;  
	statement.innerHTML = subjects[indicator]["statement"] ;  
	unSelect();
	getParties();

	indicator += 1;

	if(subjects[indicator] == null){
		showResult();
	}

	}


function getParties () {
	let sortedNames = [...subjects[indicator].parties.map(p => p.name)].sort();
	let sortedParties = sortedNames.map(n => subjects[indicator].parties.find(x => x.name == n));

	sortedParties.forEach((item, index)=>{
		var node = document.createElement('a');
		node.className = "w3-bar-item w3-button";
		node.onclick = function() {
			specStatement.innerHTML = item['opinion']
			party.innerHTML = item['name']
		}
		node.appendChild(document.createTextNode(item["name"]));
		list.appendChild(node);
	})
}


//empty's subject and opinions of the party so it can be set afterwards
function unSelect (){ 
	list.innerHTML = "";
	specStatement.innerHTML = '';	
	party.innerHTML = '';
}


function myFunction() {
	var x = list;
	if (x.className.indexOf("w3-show") == -1) {
	  x.className += " w3-show";
	} else { 
	  x.className = x.className.replace(" w3-show", "");
	}
  }


function answer (choosen){	
	answers[indicator].answer = choosen;
	editText();
}



function showResult(){
	result.innerText = 'Resultaat: '	
	answers.forEach((answer, index )=> {
		for (party of subjects[index]['parties']){
			if (answer.answer != "none"){
				let targetparty = parties.find(p => p.name == party.name);
				if(answer.answer == party.position){
					targetparty.match += 1
				}
				else {
					targetparty.match += -1
				}
			}
		}
	});
	let count = answers.filter(a => a.answer == "none").length;
	if (count >= Math.ceil(subjects.length / 2)){
		console.log("Heeft een mening gebruikt zijn mening niet wat een meme!")
	}
	let sorted = parties.sort((a,b) => b.match - a.match);

	for (result2 of sorted){
		let percentage = (result2.match / subjects.length * 100.).toFixed(0)
		percentage = percentage < 0 ? 0 : percentage;

		result.innerText += "\n"+ "Percentage: " +  percentage + "Gematched: "+result2.match + " " + result2.name;
	}

	 
}

  



