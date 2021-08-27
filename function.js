var boxColor = ['red', 'blue', 'yellow', 'green'];
var hasGameStarted = false;
var gameArray = [];
var start = false;
var score = 0;
var myGuess = [];
var cycle = 0;
var sounds = ['sounds/red.mp3', 'sounds/blue.mp3', 'sounds/green.mp3', 'sounds/yellow.mp3', 'sounds/wrong.mp3'];
var audio = new Audio();



ToggleVisibility('GameOver', 'hidden'); // hide the GameOver Text;


function playAudio(src) {
	audio.src = 'sounds/' + src + '.mp3';
	audio.play();
}

// one function to master the toggle visibility 
function ToggleVisibility(id, state) {
	document.getElementById(id).style.visibility = state;
}



function GameSetUp() {
	for (i = 0; i < boxColor.length; i++) {
		var box = document.getElementById(boxColor[i]);

		box.addEventListener('click', pickColor);
		if (!hasGameStarted) {
			box.style.backgroundColor = boxColor[i];
		}
	}
	hasGameStarted = true;
}

//add color to the game boxes and set up the eventlistener-- one time during load page.
GameSetUp();


/// what happens when the player pick a color
function pickColor(e) {
	if (start) {
		var color = e.target.style.backgroundColor;
		myGuess.push(color);
		ChangeBoxColorShape(color);
		if (myGuess[cycle] == gameArray[cycle]) {
			cycle++;
			playAudio(color);
			LevelComplete();
		} else {
			GameOver();
		}
	}
}

function GameOver() {
	playAudio('wrong');
	ToggleVisibility('start', 'visible');
	ToggleVisibility('GameOver', 'visible');
	start = false;
	gameArray = [];
	myGuess = [];
	cycle = 0;

}


function LevelComplete() {
	if (myGuess.length == gameArray.length) {
		myGuess = [];
		cycle = 0;
		score += 10;
		document.getElementById('score').innerHTML = score;
		setTimeout(CompTurn, 1500);
	}
}


function CompTurn() {

	if (start) {

		var random = Math.floor(Math.random() * 4);
		gameArray.push(boxColor[random]);
		ChangeBoxColorShape(CompPick());

	}

}


// to identify which color the comp choose to animate 
function CompPick() {
	return gameArray[gameArray.length - 1];
}


//the master function for anim and sound play
function ChangeBoxColorShape(id) {
	document.getElementById(id).style.transform = 'scale(1.2, 1.2)';
	playAudio(id);
	setTimeout(SmallBox, 400, id);

}




// reduce the scale of the anim
function SmallBox(index) {

	document.getElementById(index).style.transform = 'scale(1.0, 1.0)';
}


//start the game.
function Start() {
	start = true;
	setTimeout(CompTurn, 800);
	score = 0;
	document.getElementById('score').innerHTML = score;
	ToggleVisibility('start', 'hidden');
	ToggleVisibility('GameOver', 'hidden');


}


