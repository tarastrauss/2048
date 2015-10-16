console.log('test!');
var winner = false;
var highestChar = 2;
var moves = 0;
var cannotMove = false;

var supermanPath = "sprites/superman_final.png";
var wonderWomanPath = "sprites/wonder_woman_final.png";
var theFlashPath = "sprites/the_flash_final.png";
var greenLanternPath = "sprites/green_lantern_final.png";
var blackCanaryPath = "sprites/black_canary_final.png";
var martianManhunterPath = "sprites/martian_manhunter_final.png";
var zatanaPath = "sprites/zatanna_final.png";
var cyborgPath = "sprites/cyborg_final.png";
var aquamanPath = "sprites/aquaman_final.png";
var greenArrowPath = "sprites/green_arrow_final.png";
var batmanPath = "sprites/batman_final.png";

var $board = $('#board');
var $newChar = $('#newChar');
var $mainBoard = $('#main-board');
var $displayMoves = $('#display-moves');
var $heroLevel = $('#hero-level');
var $reset = $('#reset');

var jsArray = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
]

var oldArray = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
]

var $boxArray = [
	[$('#r0c0'), $('#r0c1'), $('#r0c2'), $('#r0c3')],
	[$('#r1c0'), $('#r1c1'), $('#r1c2'), $('#r1c3')],
	[$('#r2c0'), $('#r2c1'), $('#r2c2'), $('#r2c3')],
	[$('#r3c0'), $('#r3c1'), $('#r3c2'), $('#r3c3')]
];

/* TODO!!!!! 

refactoring
--pop ups instead of alerts
swipe
animation

*/

//load on document ready!
$(document).ready (function () {
	console.log('ready!');
	loadChar();
	loadChar();
	keyUp();
	checkForHighestChar();
	render();
	reset();
});

//reset the game!
var reset = function () {
	$reset.click(function (){
		console.log("reset was clicked!");
		jsArray.forEach(function (row, rowIndex) {
			row.forEach(function (box, colIndex) {
				makeBoxEmpty(rowIndex, colIndex);
			});
		});
		moves = 0;
		$displayMoves.html('Moves: ' + 0);
		renderReset();
		loadChar();
		loadChar();
		render();
		clearHighestChar();
		highestChar = 2;
		logBoard;
		logOldBoard;
		sliceJSArray;
		logOldBoard;
		console.log("Reset!")
	});
}

//render the game reset
var renderReset = function () {
	jsArray.forEach (function (row, rowIndex) {
		row.forEach (function (col, colIndex) {
			$boxArray[rowIndex][colIndex].children().attr('src','');
		});
	});
}

//render after each turn
var render = function (classType){
	jsArray.forEach (function (row, rowIndex) {
		row.forEach (function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] !== oldArray[rowIndex][colIndex]){
				/*if (jsArray[rowIndex][colIndex] === 0) {
					$boxArray[rowIndex][colIndex].children().addClass('animated ').addClass(classType);//.addClass('animated').addClass('zoomOut');
						window.setTimeout(function () {
							$boxArray[rowIndex][colIndex].children().attr('src','').removeClass('animated').removeClass(classType);
						}, 1200);
				}
				window.setTimeout(function () {*/
					switch (jsArray[rowIndex][colIndex]){
						case 0: 
							//$boxArray[rowIndex][colIndex].children().addClass('animated ').addClass(classType);//.addClass('animated').addClass('zoomOut');
							//window.setTimeout(function () {
							$boxArray[rowIndex][colIndex].children().attr('src','')
							//}, 1000); */ 
						break;
						case 1: 
							$boxArray[rowIndex][colIndex].children().attr('src', supermanPath);//.addClass('animated').addClass('fadeIn');
						break;Path
						case 2: 
							$boxArray[rowIndex][colIndex].children().attr('src', wonderWomanPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 4: 
							$boxArray[rowIndex][colIndex].children().attr('src', theFlashPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 8: 
							$boxArray[rowIndex][colIndex].children().attr('src', greenLanternPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 16: 
							$boxArray[rowIndex][colIndex].children().attr('src', blackCanaryPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 32: 
							$boxArray[rowIndex][colIndex].children().attr('src', martianManhunterPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 64: 
							$boxArray[rowIndex][colIndex].children().attr('src', zatanaPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 128: 
							$boxArray[rowIndex][colIndex].children().attr('src', cyborgPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 256: 
							$boxArray[rowIndex][colIndex].children().attr('src', aquamanPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 512: 
							$boxArray[rowIndex][colIndex].children().attr('src', greenArrowPath);//.addClass('animated').addClass('fadeIn');
						break;
						case 1024: 
							$boxArray[rowIndex][colIndex].children().attr('src', batmanPath);//.addClass('animated').addClass('fadeIn');
						break;
					}
					/*window.setTimeout(function () {
						$boxArray[rowIndex][colIndex].children().removeClass('fadeIn');
					}, 500);
				}, 800);*/		
			}
		});
	});
}


//takes input from user on key up
var keyUp = function () {
	$(document).keyup(function (key){
		sliceJSArray();
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
	window.setTimeout(function () {
		checkForHighestChar();
		checkForWinner();
		checkForGameOver();
		displayMovesFunction();
		logOldBoard();
		logBoard();
	
		}, 1000);
	});
};

//store the board from the last turn
var sliceJSArray = function () {
	for (var i = 0; i < 4; i++){
		oldArray[i] = jsArray[i].slice(0);
	}
}

//clear the highest character on reset
var clearHighestChar = function () {
	$heroLevel.empty();
	$heroLevel.append($('<img>').attr('src', supermanPath).addClass("members"));
	$heroLevel.append($('<img>').attr('src', wonderWomanPath).addClass("members"));
}

//tell the user a new character has been reached by a pop up
var newCharPopUp = function (oldChar, newChar, charPath) {
	//$newChar.fadeTo(1200, .8).zIndex(20).html(oldChar + " has recruited " + newChar + " to join The Justice League! Press any key to continue.");
	$mainBoard.prepend($('<div>').fadeIn().attr("id", "newChar").html(oldChar + " has recruited " + newChar + " to join The Justice League! Press return to continue. <br>").css('zIndex', '20'));
	$('#newChar').append($('<img>').attr('src', charPath).addClass('charOnPopUp'));
	$(document).keyup(function (key){
	if (key.which === 13) {
		$('#newChar').remove();
	}
});
}

//check to see if there is a new highest character
var checkForHighestChar = function () {
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] > highestChar) {
				highestChar = jsArray[rowIndex][colIndex]
				console.log("The highest character is " + highestChar);
				switch (highestChar) {
					case 4: 
						$heroLevel.append($('<img>').attr('src', theFlashPath).addClass("members"));
						newCharPopUp("Wonder Woman", "The Flash", theFlashPath);
					//alert('Wonder Woman has recruited The Flash to join the Justice League!');
					break;
					case 8: 
						$heroLevel.append($('<img>').attr('src', greenLanternPath).addClass("members"));
						newCharPopUp("The Flash", "Green Lantern", greenLanternPath);
					//alert('The Flash has recruited Green Lantern to join the Justice League!');
					break;
					case 16: 
						$heroLevel.append($('<img>').attr('src', blackCanaryPath).addClass("members"));
						newCharPopUp("Green Lantern", "Black Canary", blackCanaryPath);
					//alert('Green Lantern has recruited Black Canary to join the Justice League!');
					break;
					case 32: 
						$heroLevel.append($('<img>').attr('src', martianManhunterPath).addClass("members"));
						newCharPopUp("Black Canary", "Martian Manhunter", martianManhunterPath);
					//alert('Black Canary has recruited Martian Manhunter to join the Justice League!');
					break;
					case 64: 
						$heroLevel.append($('<img>').attr('src', zatanaPath).addClass("members"));
						newCharPopUp("Martian Manhunter", "Zatanna", zatanaPath);
					//alert('Martian Manhunter has recruited Zatanna to join the Justice League!');
					break;
					case 128: 
						$heroLevel.append($('<img>').attr('src', cyborgPath).addClass("members"));
						newCharPopUp("Zatanna", "Cyborg", cyborgPath);
					//alert('Zatanna has recruited Cyborg to join the Justice League!');
					break;
					case 256: 
						$heroLevel.append($('<img>').attr('src', aquamanPath).addClass("members"));
						newCharPopUp("Cyborg", "Aquaman", aquamanPath);
					//alert('Cyborg has recruited Aquaman to join the Justice League!');
					break;
					case 512: 
						$heroLevel.append($('<img>').attr('src', greenArrowPath).addClass("members"));
						newCharPopUp("Aquaman", "Green Arrow", greenArrowPath);
					//alert('Aquaman has recruited Green Arrow to join the Justice League!');
					break;
					case 1024: 
						$heroLevel.append($('<img>').attr('src', batmanPath).addClass("members"));
						newCharPopUp("Green Arrow", "Bruce Wayen", batmanPath);
					//alert('Green Arrow managed to convince loner Bruce Wayne to join the Justice League! Congratulations!! The entire Justice League is formed!');
					break;
				} 
			}
		});
	});
}

// load superman or wonder woman in random unfilled spot
var loadChar = function () {
	var randomRow;
	var randomCol;
	var randomChar;
	var filled = false;
	do {
		randomRow = parseInt(Math.random() * 4);
		randomCol = parseInt(Math.random() * 4);
		randomChar = Math.random();
		if (boxIsEmpty(randomRow, randomCol)) {
			if (randomChar <= .5) {
				setToSuperman(randomRow,randomCol); 
				renderNewChar(randomRow, randomCol, supermanPath);
			} else {
				setToWonderWoman(randomRow,randomCol); 
				renderNewChar(randomRow, randomCol, wonderWomanPath);
			}
			filled = true;
		}
	} while (!filled);
	
};

var renderNewChar = function (rowIndex, colIndex, charPath) {
	$boxArray[rowIndex][colIndex].children().attr('src', charPath).addClass('animated').addClass('tada');
	window.setTimeout(function () {
		$boxArray[rowIndex][colIndex].children().removeClass('tada');
	}, 1200);
}
var setToSuperman = function (row, col) {
	jsArray[row][col] = 1;
}

var setToWonderWoman = function (row, col) {
	jsArray[row][col] = 2;
}

var logBoard = function () {
	console.log ("log JS array");
	console.log("\n");
	for (var i = 0; i < 4; i++) {
			console.log(jsArray[i][0] + " " + jsArray[i][1] + " " + jsArray[i][2] + " " + jsArray[i][3]);
			console.log("\n");

	}	
}

var logOldBoard = function () {
	console.log ("log OLD array");
	console.log("\n");
	for (var i = 0; i < 4; i++) {
			console.log(oldArray[i][0] + " " + oldArray[i][1] + " " + oldArray[i][2] + " " + oldArray[i][3]);
			console.log("\n");
	}	
}

var animation = function (translate, direction) {
	// for each box in translation
	  // $box = $(box)
	  // $box.css position relative
	  // if direction up
	  	// $box.animate (top -tileheight * box.numMoved, 

	 //setimeout render period

}

var moveUp = function () {
	var combined;
	var wasAMove = false;
	var colArray;
	var currentBox = {};
	var translation = [];
	//loop through the array by column
	for (var colIndex = 0; colIndex <= 3; colIndex++) {
		colArray = [false, false, false, false];
		//loop through the game by row, starting at the second row
		for (var rowIndex = 1; rowIndex <= 3; rowIndex++) {
			//set combined variable to false so a box only combines once
			//currentBox.startPosition([rowIndex, colIndex]);
			combined = false;
			//currentBox.hasMoved = 0;
			// currentBox.startPosition = []
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
							//keep track of how many spaces a box moved
							//currentBox.hasMoved++;
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
						//if the box directly above is equal to the box but has already been combined
						} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex] && colArray[rowIndex - 1] === true) {
							combined = true;
						//if the box directly above is NOT equal to the box
						} else if (jsArray[rowIndex - 1][colIndex] !== jsArray[rowIndex][colIndex]) {
							//move on, keep the box where it is
							combined = true;
						}
					} else {
						//if the box is empty, move on
						combined = true;
					}
				//keep looping until the box is combined or hits another box
				} while (!combined);	
				//translation.push(currentBox); 
				//currentBox = {}
		}
		//animate(translation, "up");
	}
	//check to see if a move was made. If it was, load a new character!
	if (wasAMove) {
		render("fadeOutUp");
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
		render("fadeOutDown");
	} else {
		cannotMove = true;
		checkForGameOver();
	}
};


var moveLeft = function () {
	var combined;
	var wasAMove = false;
	var rowArray;

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
		render("slideOutLeft");
	} else {
		checkForGameOver();
	}
};

var moveRight = function () {
	var combined;
	var wasAMove = false;
	var rowArray;
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
		render("fadeOutRight");
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
				$mainBoard.prepend($('<div>').fadeIn().attr("id", "newChar").html("Congratulations! You beat Lex Luthor and formed The Justice League in " + moves + " moves!"));
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

var displayMovesFunction = function () {
	$displayMoves.html('Moves: ' + moves);
}






