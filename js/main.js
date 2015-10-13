console.log('test!');
var winner = false;
var highestChar = 2;
var moves = 0;

/*
var boxArray = [
	['r0c0', 'r0c1', 'r0c2', 'r0c3'],
	['r1c0', 'r1c1', 'r1c2', 'r1c3'],
	['r2c0', 'r2c1', 'r2c2', 'r2c3'],
	['r3c0', 'r3c1', 'r3c2', 'r3c3']
];*/

var jsArray = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
]

var $displayMoves = $('#display-moves');
var $heroLevel = $('#hero-level');

var $boxArray = [
	[$('#r0c0'), $('#r0c1'), $('#r0c2'), $('#r0c3')],
	[$('#r1c0'), $('#r1c1'), $('#r1c2'), $('#r1c3')],
	[$('#r2c0'), $('#r2c1'), $('#r2c2'), $('#r2c3')],
	[$('#r3c0'), $('#r3c1'), $('#r3c2'), $('#r3c3')]
];

/* TODO!!!!! 

refactoring
fix logic
pop ups instead of alerts
swipe
animation

*/

$(document).ready (function () {
	console.log('ready!');
	loadChar();
	loadChar();
	render();
	keyDown();
	checkForHighestChar();

	
});

var render = function (){
	jsArray.forEach (function (row, rowIndex) {
		row.forEach (function (col, colIndex) {
			switch (jsArray[rowIndex][colIndex]){
				case 0: $boxArray[rowIndex][colIndex].children().attr('src','')
				break;
				case 1: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/superman_final.png')
				break;
				case 2: $boxArray[rowIndex][colIndex].children().attr('src','/sprites/wonder_woman_final.png')
				break;
				case 4: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/the_flash_final.png')
				break;
				case 8: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/green_lantern_final.png')
				break;
				case 16: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/black_canary_final.png')
				break;
				case 32: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/martian_manhunter_final.png')
				break;
				case 64: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/zatanna_final.png')
				break;
				case 128: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/cyborg_final.png')
				break;
				case 256: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/aquaman_final.png')
				break;
				case 512: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/green_arrow_final.png')
				break;
				case 1024: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/batman_final.png')
			}
				
		});
	});
}

//takes input from user on key down
var keyDown = function () {
	$(document).keyup(function (key){
		switch(key.which){
			case 37: 
				moveLeft();
			break;

			case 38: 
				moveUp();
			break;

			case 39: 
				moveRight();
			break;

			case 40: 
				moveDown();
			break;
		}
		//key.preventDefault();
		checkForWinner();
		checkForHighestChar();
		displayMoveFunction();
	});
};

var checkForHighestChar = function () {
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] > highestChar) {
				highestChar = jsArray[rowIndex][colIndex]
				console.log("The highest character is " + highestChar);
				switch (highestChar) {
					case 4: $heroLevel.append($('<img src = "/sprites/the_flash_final.png" />').addClass("members"));
					alert('Wonder Woman has recruited The Flash to join the Justice League!');
					break;
					case 8: $heroLevel.append($('<img src = "/sprites/green_lantern_final.png" />').addClass("members"));
					alert('The Flash has recruited Green Lantern to join the Justice League!');
					break;
					case 16: $heroLevel.append($('<img src = /sprites/black_canary_final.png />').addClass("members"));
					alert('Green Lantern has recruited Black Canary to join the Justice League!');
					break;
					case 32: $heroLevel.append($('<img src = /sprites/martian_manhunter_final.png />').addClass("members"));
					alert('Black Canary has recruited Martian Manhunter to join the Justice League!');
					break;
					case 64: $heroLevel.append($('<imsrc="/sprites/zatanna_final.png" />').addClass("members"));
					alert('Martian Manhunter has recruited Zatanna to join the Justice League!');
					break;
					case 128: $heroLevel.append($('<img src = /sprites/cyborg_final.png />').addClass("members"));
					alert('Zatanna has recruited Cyborg to join the Justice League!');
					break;
					case 256: $heroLevel.append($('<img src = /sprites/aquaman_final.png />').addClass("members"));
					alert('Cyborg has recruited Aquaman to join the Justice League!');
					break;
					case 512: $heroLevel.append($('<img src = /sprites/green_arrow_final.png />').addClass("members"));
					alert('Aquaman has recruited Green Arrow to join the Justice League!');
					break;
					case 1024: $heroLevel.append($('<img src = /sprites/batman_final.png />').addClass("members"));
					alert('Green Arrow managed to convince loner Bruce Wayne to join the Justice League! Congratulations!! The entire Justice League is formed!');
				} 
			}
		});
	});
}

// load superman or wonder woman in random unfilled spot
var loadChar = function () {
	var filled = false;
	var randomRow;
	var randomCol;
	do {
		randomRow = parseInt(Math.random() * 4);
		randomCol = parseInt(Math.random() * 4);
		var randomSup = Math.random();
		if (boxIsEmpty(randomRow, randomCol)) {
			if (randomSup <= .5) {
				jsArray[randomRow][randomCol] = 1; 
				filled = true;
			} else {
				jsArray[randomRow][randomCol] = 2;
				filled = true;
			}
		}
	} while (!filled);
	render();
};

var logBoard = function () {
	for (var i = 0; i < 4; i++) {
			console.log(jsArray[i][0] + " " + jsArray[i][1] + " " + jsArray[i][2] + " " + jsArray[i][1]);
			console.log("/n");

	}	
}

var boxIsEmpty = function (rowIndex, colIndex) {
	return (jsArray[rowIndex][colIndex] === 0);
}

var makeBoxEmpty = function (rowIndex, colIndex) {
	jsArray[rowIndex][colIndex] = 0;
}

var doubleBox = function (rowIndex, colIndex) {
	jsArray[rowIndex][colIndex] = jsArray[rowIndex][colIndex] * 2;
}

var isNotFirstLine = function (index) {
	return (index !== 0);
}

var isNotLastLine = function (index) {
	return (index !== 3);
}

var moveUp = function () {
	var combined;
	var wasAMove = false;
	//loop through the game by column
	for (var colIndex = 0; colIndex <= 3; colIndex++) {
		//loop through the game by row, starting at the second row
		for (var rowIndex = 1; rowIndex <= 3; rowIndex++) {
			//set combined variable to false so a box only combines once
			combined = false;
				do {
					//if the box is not empty and we're not looking at the first row
					if (isNotFirstLine(rowIndex) && !boxIsEmpty(rowIndex,colIndex)) {
						//if the box directly above it IS empty
						if (boxIsEmpty(rowIndex - 1, colIndex)) {
							//set the box above it to the value of the current box
							jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//check one more box up
							rowIndex--;
							//we made a move!
							wasAMove = true;
						//if the box directly above is NOT empty and is equal to the box
						} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
							//add the two together and store them in the box above
							doubleBox(rowIndex - 1, colIndex);
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//the box has been combined, so move on
							combined = true;								
							//we made a move!
							wasAMove = true;
						//if the box directly above is NOT empty and is NOT equal to the box 
						} else if (jsArray[rowIndex - 1][colIndex] !== jsArray[rowIndex][colIndex]) {
							//move on, keep the box where it is
							combined = true;
						}
					} else {
						//if the box is empty, move on
						combined = true;
					}
				//keep looping until the box is combined
				} while (!combined);	
		//end the for loop through row
		}
	//end the for loop through column
	}
	//check to see if a move was made. If it was, load a new character!
	if (wasAMove) {
		loadChar();
		moves++;
	} else {
		checkForGameOver();
	}
};

var moveDown = function () {
	var combined;
	var wasAMove = false;
	//loop through the game by column
	for (var colIndex = 0; colIndex <= 3; colIndex++) {
		//loop through the game by row, starting at the third row
		for (var rowIndex = 2; rowIndex >=0; rowIndex--) {
			//set combined variable to false so a box only combines once
			combined = false;
				do {
					//if the box is not empty and we're not looking at the last row
					if (isNotLastLine(rowIndex) && !boxIsEmpty(rowIndex,colIndex)) {
						//if the box directly below it IS empty
						if (boxIsEmpty(rowIndex + 1, colIndex)) {
							//set the box below it to the value of the current box
							jsArray[rowIndex + 1][colIndex] = jsArray[rowIndex][colIndex];
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//check one more box down
							rowIndex++;									
							//we made a move!
							wasAMove = true;
						//if the box directly below is NOT empty and is equal to the box
						} else if (jsArray[rowIndex + 1][colIndex] === jsArray[rowIndex][colIndex]) {
							//add the two together and store them in the box below
							doubleBox(rowIndex + 1, colIndex);
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//the box has been combined, so move on
							combined = true;
							//we made a move!
							wasAMove = true;
						//if the box directly below is NOT empty and is NOT equal to the box 
						} else if (jsArray[rowIndex + 1][colIndex] !== jsArray[rowIndex][colIndex]) {
							//move on, keep the box where it is
							combined = true;
						}
					} else {
						//if the box is empty, move on
						combined = true;
					}
				//keep looping until the box is combined
				} while (!combined);	
		//end the for loop through row
		}
	//end the for loop through column
	}
	//check to see if a move was made. If it was, load a new character!
	if (wasAMove) {
		loadChar();
		moves++;
	} else {
		checkForGameOver();
	}
};


var moveLeft = function () {
	var wasAMove = false;
	var furthestLeft;
	//loop through the game by row
	for (var rowIndex = 0; rowIndex <=3; rowIndex++) {
		//loop through the game by column, starting at the second column
		for (var colIndex = 1; colIndex <= 3; colIndex++) {
			//set combined variable to false so a box only combines once
			furthestLeft = false;
			//if the box is not empty move it as far left as possible
			if (!boxIsEmpty(rowIndex, colIndex)) {
				do {
					if (boxIsEmpty(rowIndex, colIndex - 1)) {
						//set the box to the left to the value of the current box
						jsArray[rowIndex][colIndex - 1] = jsArray[rowIndex][colIndex];
						//and make the current box empty
						makeBoxEmpty(rowIndex, colIndex);
						//check one more box to the left
						colIndex--;									
						//we made a move!
						wasAMove = true;
					} else {
						furthestLeft = true;
					}
				//keep looping until the box is furthestLeft
				} while (!furthestLeft);	
			}
			//if the box directly to the left is NOT empty and is equal to the box
			if (jsArray[rowIndex][colIndex - 1] === jsArray[rowIndex][colIndex]) {
					//add the two together and store them in the box to the left
					doubleBox(rowIndex, colIndex - 1);
					//and make the current box empty
					makeBoxEmpty(rowIndex,colIndex);
					//the box has been combined, so move on
					combined = true;
					console.log ("combined boxes to left and moved on");									
					//we made a move!
					wasAMove = true;
			//if the box directly to the left is NOT empty and is NOT equal to the box 
			} else if (jsArray[rowIndex][colIndex - 1] !== jsArray[rowIndex][colIndex]) {
					//move on, keep the box where it is
					console.log("can't combine boxes but moved on")
			}


		//end the for loop through column
		}
	//end the for loop through row
	}
	//check to see if a move was made. If it was, load a new character!
	if (wasAMove) {
		loadChar();
		moves++;
	} else {
		checkForGameOver();
	}
};

var moveRight = function () {
	var combined;
	var wasAMove = false;
	//loop through the game by row
	for (var rowIndex = 0; rowIndex <=3; rowIndex++) {
		//loop through the game by column, starting at the third column

		for (var colIndex = 2; colIndex >= 0; colIndex--) {
			//set combined variable to false so a box only combines once
			combined = false;
				do {
					//if the box is not empty and we're not looking at the fourth column
					if (isNotLastLine(colIndex) && !boxIsEmpty(rowIndex,colIndex)) {
						//if the box directly to the right it IS empty
						if (boxIsEmpty(rowIndex, colIndex + 1)) {
							//set the box to the right to the value of the current box
							jsArray[rowIndex][colIndex + 1] = jsArray[rowIndex][colIndex];
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//check one more box to the right
							colIndex++;								
							//we made a move!
							wasAMove = true;
						//if the box directly to the right is NOT empty and is equal to the box
						} else if (jsArray[rowIndex][colIndex + 1] === jsArray[rowIndex][colIndex]) {
							//add the two together and store them in the box to the right
							doubleBox(rowIndex, colIndex + 1);
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//the box has been combined, so move on
							combined = true;								
							//we made a move!
							wasAMove = true;
						//if the box directly to the right is NOT empty and is NOT equal to the box 
						} else if (jsArray[rowIndex][colIndex + 1] !== jsArray[rowIndex][colIndex]) {
							//move on, keep the box where it is
							combined = true;
						}
					} else {
						//if the box is empty, move on
						combined = true;
					}
				//keep looping until the box is combined
				} while (!combined);	
		//end the for loop through column
		}
	//end the for loop through row
	}
	//check to see if a move was made. If it was, load a new character!
	if (wasAMove) {
		loadChar();
		moves++;
	} else {
		checkForGameOver();
	}
};

var checkForWinner = function () {
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] === 1024) {
				winner = true;
				console.log("You won the game in " + moves + " moves!");
			}

		});

	});
}

var checkForGameOver = function () {
	var gameOver = true;
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] === 0) {
				gameOver = false
			}

		});

	});
	if (gameOver) {
		alert("You're too late. Lex Luthor has attacked the Justice League before they could unite their alternate realities. Please try again.")
	}

}

var displayMoveFunction = function () {
	$displayMoves.html('Moves: ' + moves);
}






