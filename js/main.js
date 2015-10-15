console.log('test!');
var winner = false;
var highestChar = 2;
var moves = 0;
var cannotMove = false;
var $board = $('#board');
var $newChar = $('#newChar');
var $body = $('body');
var $mainBoard = $('#main-board');

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

var oldArray;

var $displayMoves = $('#display-moves');
var $heroLevel = $('#hero-level');
var $reset = $('#reset');

var $boxArray = [
	[$('#r0c0'), $('#r0c1'), $('#r0c2'), $('#r0c3')],
	[$('#r1c0'), $('#r1c1'), $('#r1c2'), $('#r1c3')],
	[$('#r2c0'), $('#r2c1'), $('#r2c2'), $('#r2c3')],
	[$('#r3c0'), $('#r3c1'), $('#r3c2'), $('#r3c3')]
];

/* TODO!!!!! 

refactoring
pop ups instead of alerts
swipe
animation

*/
var $head = $('head');

$(document).ready (function () {
	console.log('ready!');
	loadChar();
	loadChar();
	render();
	keyUp();
	checkForHighestChar();
	reset();
	if ($('#scoreboard').css('font-size') === '16') {
	   	$head.append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css">');
		$head.append('<script src="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js"></script>');
		//$window.on("swipeleft", function (event){
		//	if ($(event.target) === $board) {
		//		moveLeft());
		//	}
		$board.on("swipeleft", moveLeft);
		$board.on("swiperight", moveRight);
	}
});

var reset = function () {
	$reset.click(function (){
		jsArray.forEach(function (row, rowIndex) {
			row.forEach(function (box, colIndex) {
				makeBoxEmpty(rowIndex, colIndex);
			});
		});
		moves = 0;
		$displayMoves.html('Moves: ' + 0);
		render();
		loadChar();
		loadChar();
		clearHighestChar();
		highestChar = 2;
	});
}

var clearHighestChar = function () {
	$heroLevel.empty();
	$heroLevel.append($('<img src = "/sprites/superman_final.png" />').addClass("members"));
	$heroLevel.append($('<img src = "/sprites/wonder_woman_final.png" />').addClass("members"));
}



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
var keyUp = function () {
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
		displayMovesFunction();
		logBoard();
	});
};


var newCharPopUp = function (oldChar, newChar) {
	//$newChar.fadeTo(1200, .8).zIndex(20).html(oldChar + " has recruited " + newChar + " to join The Justice League! Press any key to continue.");
	$mainBoard.prepend($('<div>').fadeIn().attr("id", "newChar").html(oldChar + " has recruited " + newChar + " to join The Justice League! Press any key to continue."));


}

$(document).keyup(function (){
	$('#newChar').remove();
});

var checkForHighestChar = function () {
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] > highestChar) {
				highestChar = jsArray[rowIndex][colIndex]
				console.log("The highest character is " + highestChar);
				switch (highestChar) {
					case 4: $heroLevel.append($('<img src = "/sprites/the_flash_final.png" />').addClass("members"));
						newCharPopUp("Wonder Woman", "The Flash");
					//alert('Wonder Woman has recruited The Flash to join the Justice League!');
					break;
					case 8: $heroLevel.append($('<img src = "/sprites/green_lantern_final.png" />').addClass("members"));
						newCharPopUp("The Flash", "Green Lantern");
					//alert('The Flash has recruited Green Lantern to join the Justice League!');
					break;
					case 16: $heroLevel.append($('<img src = /sprites/black_canary_final.png />').addClass("members"));
						newCharPopUp("Green Lantern", "Black Canary");
					//alert('Green Lantern has recruited Black Canary to join the Justice League!');
					break;
					case 32: $heroLevel.append($('<img src = /sprites/martian_manhunter_final.png />').addClass("members"));
						newCharPopUp("Black Canary", "Martian Manhunter");
					//alert('Black Canary has recruited Martian Manhunter to join the Justice League!');
					break;
					case 64: $heroLevel.append($('<img src="/sprites/zatanna_final.png" />').addClass("members"));
						newCharPopUp("Martian Manhunter", "Zatanna");
					//alert('Martian Manhunter has recruited Zatanna to join the Justice League!');
					break;
					case 128: $heroLevel.append($('<img src = /sprites/cyborg_final.png />').addClass("members"));
						newCharPopUp("Zatanna", "Cyborg");
					//alert('Zatanna has recruited Cyborg to join the Justice League!');
					break;
					case 256: $heroLevel.append($('<img src = /sprites/aquaman_final.png />').addClass("members"));
						newCharPopUp("Cyborg", "Aquaman");
					//alert('Cyborg has recruited Aquaman to join the Justice League!');
					break;
					case 512: $heroLevel.append($('<img src = /sprites/green_arrow_final.png />').addClass("members"));
						newCharPopUp("Aquaman", "Green Arrow");
					//alert('Aquaman has recruited Green Arrow to join the Justice League!');
					break;
					case 1024: $heroLevel.append($('<img src = /sprites/batman_final.png />').addClass("members"));
						newCharPopUp("Green Arrow", "Bruce Wayen");
					//alert('Green Arrow managed to convince loner Bruce Wayne to join the Justice League! Congratulations!! The entire Justice League is formed!');
					break;
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
			console.log(jsArray[i][0] + " " + jsArray[i][1] + " " + jsArray[i][2] + " " + jsArray[i][3]);
			console.log("\n");

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

var slideUp = function () {

}

var moveUp = function () {
	var combined;
	var wasAMove = false;
	var colArray;
	oldArray = jsArray;
	var img;
	//loop through the game by column
	for (var colIndex = 0; colIndex <= 3; colIndex++) {
		colArray = [false, false, false, false];
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

							//$boxArray[rowIndex][colIndex].children().animate({top: "-=90px"}, 'slow');
							//$boxArray[rowIndex][colIndex].children().css('transform:', 'rotateX(360deg)');

							//img = $boxArray[rowIndex][colIndex].children().detach();
							//$boxArray[rowIndex -1][colIndex].children().append(img);

							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//check one more box up
							rowIndex--;
							//we made a move!
							wasAMove = true;
						//if the box directly above is NOT empty and is equal to the box AND the box has not been combined
						} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex] && colArray[rowIndex - 1] === false) {
							//add the two together and store them in the box above
							doubleBox(rowIndex - 1, colIndex);
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//the box has been combined, so move on
							combined = true;	
							//tell the colArray that a box has been combined
							colArray[rowIndex - 1]	= true;						
							//we made a move!
							wasAMove = true;
						//if the box directly above is NOT empty and is NOT equal to the box 
						} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex] && colArray[rowIndex - 1] === true) {
							combined = true;
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
		cannotMove = true;
		checkForGameOver();
	}
};

var moveDown = function () {
	var combined;
	var wasAMove = false;
	var colArray;
	oldArray = jsArray;

	//loop through the game by column
	for (var colIndex = 0; colIndex <= 3; colIndex++) {
		colArray = [false, false, false, false];
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
						} else if (jsArray[rowIndex + 1][colIndex] === jsArray[rowIndex][colIndex] && colArray[rowIndex + 1] === false) {
							//add the two together and store them in the box below
							doubleBox(rowIndex + 1, colIndex);
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//tell the colArray that a box has been combined
							colArray[rowIndex - 1]	= true;	
							//the box has been combined, so move on
							combined = true;
							//we made a move!
							wasAMove = true;
						} else if (jsArray[rowIndex + 1][colIndex] === jsArray[rowIndex][colIndex] && colArray[rowIndex + 1] === true) {
							combined = true;
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
		cannotMove = true;
		checkForGameOver();
	}
};


var moveLeft = function () {
	var combined;
	var wasAMove = false;
	var rowArray;
	oldArray = jsArray;

	//loop through the game by row
	for (var rowIndex = 0; rowIndex <=3; rowIndex++) {
		rowArray = [false, false, false, false];
		//loop through the game by column, starting at the second column
		for (var colIndex = 1; colIndex <= 3; colIndex++) {
			//set combined variable to false so a box only combines once
			combined = false;
			do {
				if (isNotFirstLine(colIndex) && !boxIsEmpty(rowIndex, colIndex)) {
					if (boxIsEmpty(rowIndex, colIndex - 1)) {
						//set the box to the left to the value of the current box
						jsArray[rowIndex][colIndex - 1] = jsArray[rowIndex][colIndex];
						//and make the current box empty
						makeBoxEmpty(rowIndex, colIndex);
						//check one more box to the left
						colIndex--;									
						//we made a move!
						wasAMove = true;
					//if the box directly to the left is NOT empty and is equal to the box AND it hasn't been combind before
					} else if (jsArray[rowIndex][colIndex - 1] === jsArray[rowIndex][colIndex] && rowArray[colIndex - 1] === false) {
						//add the two together and store them in the box to the left
						doubleBox(rowIndex, colIndex - 1);
						//and make the current box empty
						makeBoxEmpty(rowIndex,colIndex);
						//the box has been combined, so move on
						combined = true;
	
						rowArray[colIndex - 1] = true;								
						//we made a move!
						wasAMove = true;
					} else if (jsArray[rowIndex][colIndex - 1] === jsArray[rowIndex][colIndex] && rowArray[colIndex - 1] === true) {
						combined = true;
					//if the box directly to the left is NOT empty and is NOT equal to the box 
					} else if (jsArray[rowIndex][colIndex - 1] !== jsArray[rowIndex][colIndex]) {
							//move on, keep the box where it is
						combined = true;
					} 
				} else {
					//if the box is empty, move on
					combined = true;
				}
				//keep looping until the box is furthestLeft
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

var moveRight = function () {
	var combined;
	var wasAMove = false;
	var rowArray;
	oldArray = jsArray;
	//loop through the game by row
	for (var rowIndex = 0; rowIndex <=3; rowIndex++) {
		rowArray = [false, false, false, false];
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
						} else if (jsArray[rowIndex][colIndex + 1] === jsArray[rowIndex][colIndex] && rowArray[colIndex + 1] === false) {
							//add the two together and store them in the box to the right
							doubleBox(rowIndex, colIndex + 1);
							//and make the current box empty
							makeBoxEmpty(rowIndex,colIndex);
							//the box has been combined, so move on
							combined = true;
							rowArray[colIndex + 1] = true;									
							//we made a move!
							wasAMove = true;
						} else if (jsArray[rowIndex][colIndex + 1] === jsArray[rowIndex][colIndex] && rowArray[colIndex + 1] === true) {
							combined = true;
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
		cannotMove = true;
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
	var stillEmptyBoxes = false;
	var stillMoves = false;
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] === 0) {
				stillEmptyBoxes = true;
			}
			if (isNotLastLine(rowIndex)) {
				if (jsArray[rowIndex][colIndex] === jsArray[rowIndex + 1][colIndex]) {
					stillMoves = true;
				}
			}
			if (isNotLastLine(colIndex)) {
				if (jsArray[rowIndex][colIndex] === jsArray[rowIndex][colIndex + 1]) {
					stillMoves = true;
				}
			}
			if (isNotFirstLine(rowIndex)) {
				if (jsArray[rowIndex][colIndex] === jsArray[rowIndex - 1][colIndex]){
					stillMoves = true;
				}
			}
			if (isNotFirstLine(colIndex)) {
				if (jsArray[rowIndex][colIndex] === jsArray[rowIndex][colIndex - 1]) {
					stillMoves = true;
				}
			}
		});
	});
	if (!stillEmptyBoxes && !stillMoves) {
		alert("You're too late. Lex Luthor has attacked the Justice League before they could unite their alternate realities. Please try again.")
	}

}

var displayMovesFunction = function () {
	$displayMoves.html('Moves: ' + moves);
}






