console.log('test!');
var winner = false;
var highestChar = 2;

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
var $heroLevel = $('#hero-level');

var $boxArray = [
	[$('#r0c0'), $('#r0c1'), $('#r0c2'), $('#r0c3')],
	[$('#r1c0'), $('#r1c1'), $('#r1c2'), $('#r1c3')],
	[$('#r2c0'), $('#r2c1'), $('#r2c2'), $('#r2c3')],
	[$('#r3c0'), $('#r3c1'), $('#r3c2'), $('#r3c3')]
];

var render = function (){
	jsArray.forEach (function (row, rowIndex) {
		row.forEach (function (col, colIndex) {
			switch (jsArray[rowIndex][colIndex]){
				case 0: $boxArray[rowIndex][colIndex].children().attr('src','')
				break;
				case 1: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/superman.png')
				break;
				case 2: $boxArray[rowIndex][colIndex].children().attr('src','/sprites/wonder_woman.png')
				break;
				case 4: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/the_flash_final.png')
				break;
				case 8: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/aquaman_final.png')
				break;
				case 16: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/black_canary_final.png')
				break;
				case 32: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/green_lantern_final.png')
				break;
				case 64: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/zatanna_final.png')
				break;
				case 128: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/martian_manhunter_final.png')
				break;
				case 256: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/green_arrow_final.png')
				break;
				case 512: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/cyborg_final.png')
				break;
				case 1024: $boxArray[rowIndex][colIndex].children().attr('src', '/sprites/batman_final.png')
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
		if (jsArray[randomRow][randomCol] === 0) {
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



//takes input from user on key down
var keyDown = function () {
	$(document).keydown(function (key){
		switch(key.which){
			case 37: moveLeft();
			break;

			case 38: moveUp();
			break;

			case 39: moveRight();
			break;

			case 40: moveDown();
			break;
		}
		//key.preventDefault();
		checkForWinner();
		checkForHighestChar();
	});
};


var moveUp = function () {
	var combined;
	var wasAMove = false;
	//loop through the game by column
	for (var colIndex = 0; colIndex <= 3; colIndex++) {
		//loop through the game by row, starting at the second row
		for (var rowIndex = 1; rowIndex <= 3; rowIndex++) {
			//set combined variable to false so a box only combines once
			combined = false;
			console.log('test for each. row: ' + rowIndex + ' col: ' + colIndex);
				do {
						console.log('test 1');
							//if the box is not empty and we're not looking at the first row
							if (rowIndex !== 0 && jsArray[rowIndex][colIndex] !== 0) {
								//if the box directly above it IS empty
								if (jsArray[rowIndex - 1][colIndex] === 0) {
									//set the box above it to the value of the current box
									jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
									//check one more box up
									rowIndex--;
									//we made a move!
									wasAMove = true;
								//if the box directly above is NOT empty and is equal to the box
								} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
									//add the two together and store them in the box above
									jsArray[rowIndex - 1][colIndex] += jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
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
			console.log('test for each. row: ' + rowIndex + ' col: ' + colIndex);
				do {
						console.log('test 1');
							//if the box is not empty and we're not looking at the last row
							if (rowIndex !== 3 && jsArray[rowIndex][colIndex] !== 0) {
								//if the box directly below it IS empty
								if (jsArray[rowIndex + 1][colIndex] === 0) {
									//set the box below it to the value of the current box
									jsArray[rowIndex + 1][colIndex] = jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
									//check one more box down
									rowIndex++;									
									//we made a move!
									wasAMove = true;
								//if the box directly below is NOT empty and is equal to the box
								} else if (jsArray[rowIndex + 1][colIndex] === jsArray[rowIndex][colIndex]) {
									//add the two together and store them in the box below
									jsArray[rowIndex + 1][colIndex] += jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
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
	}
};


var moveLeft = function () {
	var combined;
	var wasAMove = false;
	//loop through the game by row
	for (var rowIndex = 0; rowIndex <=3; rowIndex++) {
		//loop through the game by column, starting at the second column
		for (var colIndex = 1; colIndex <= 3; colIndex++) {
		
			//set combined variable to false so a box only combines once
			combined = false;
			console.log('test left. row: ' + rowIndex + ' col: ' + colIndex);
				do {
						console.log('test 1');
							//if the box is not empty and we're not looking at the first column
							if (colIndex !== 0 && jsArray[rowIndex][colIndex] !== 0) {
								//if the box directly to the left it IS empty
								if (jsArray[rowIndex][colIndex - 1] === 0) {
									//set the box to the left to the value of the current box
									jsArray[rowIndex][colIndex - 1] = jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
									//check one more box to the left
									colIndex--;									
									//we made a move!
									wasAMove = true;
								//if the box directly to the left is NOT empty and is equal to the box
								} else if (jsArray[rowIndex][colIndex - 1] === jsArray[rowIndex][colIndex]) {
									//add the two together and store them in the box to the left
									jsArray[rowIndex][colIndex - 1] += jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
									//the box has been combined, so move on
									combined = true;									
									//we made a move!
									wasAMove = true;
								//if the box directly to the left is NOT empty and is NOT equal to the box 
								} else if (jsArray[rowIndex][colIndex - 1] !== jsArray[rowIndex][colIndex]) {
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
			console.log('test left. row: ' + rowIndex + ' col: ' + colIndex);
				do {
						console.log('test 1');
							//if the box is not empty and we're not looking at the fourth column
							if (colIndex !== 3 && jsArray[rowIndex][colIndex] !== 0) {
								//if the box directly to the right it IS empty
								if (jsArray[rowIndex][colIndex + 1] === 0) {
									//set the box to the right to the value of the current box
									jsArray[rowIndex][colIndex + 1] = jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
									//check one more box to the right
									colIndex++;								
									//we made a move!
									wasAMove = true;
								//if the box directly to the right is NOT empty and is equal to the box
								} else if (jsArray[rowIndex][colIndex + 1] === jsArray[rowIndex][colIndex]) {
									//add the two together and store them in the box to the right
									jsArray[rowIndex][colIndex + 1] += jsArray[rowIndex][colIndex];
									//and make the current box empty
									jsArray[rowIndex][colIndex] = 0;
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
	}
};

var checkForWinner = function () {
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] === 1024) {
				winner = true;
				console.log("You won the game!");
			}

		});

	});
}

var checkForHighestChar = function () {
	jsArray.forEach(function (row, rowIndex) {
		row.forEach(function (col, colIndex) {
			if (jsArray[rowIndex][colIndex] > highestChar) {
				highestChar = jsArray[rowIndex][colIndex]
				console.log("The highest character is " + highestChar);
				switch (highestChar) {
					case 4: $heroLevel.append($('<img class = "members" src = "/sprites/the_flash_final.png" />'));
					break;
					case 8: $heroLevel.append($('<img class = "members" src = "/sprites/aquaman_final.png" />'));
					break;
					case 16: $heroLevel.append($('<img class = "members" src = /sprites/black_canary_final.png />'));
					break;
					case 32: $heroLevel.append($('<img class = "members" src = /sprites/green_lantern_final.png />'));
					break;
					case 64: $heroLevel.append($('<img class = "members" src = /sprites/zatanna_final.png />'));
					break;
					case 128: $heroLevel.append($('<img class = "members" src = /sprites/martian_manhunter_final.png />'));
					break;
					case 256: $heroLevel.append($('<img class = "members" src = /sprites/green_arrow_final.png />'));
					break;
					case 512: $heroLevel.append($('<img class = "members" src = /sprites/cyborg_final.png />'));
					break;
					case 1024: $heroLevel.append($('<img class = "members" src = /sprites/batman_final.png />'));
				}
			}
		});
	});
}


loadChar();
loadChar();
keyDown();



