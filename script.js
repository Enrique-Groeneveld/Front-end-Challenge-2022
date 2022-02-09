var container= document.getElementById("1");
var indicator = 0;
var specStatement = document.getElementById('specStatement');
var title = document.getElementById('title');
var statement = document.getElementById('statement');
var party = document.getElementById('party');
var list = document.getElementById('list');

function editText (){
// Sets the title and statement of the subject  
  title.innerHTML = subjects[indicator]["title"] ;  
  statement.innerHTML = subjects[indicator]["statement"] ;  
  unSelect();
  getParties();
  
  indicator += 1;
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
  

dparties.forEach((item, index)=>{
	item.match = 0;
})

console.log(parties);

  editText();

