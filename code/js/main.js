console.log('test!');
var randomBox;

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

loadChar();
loadChar();

//takes input from user on key down
var keyDown = function () {
	$(document).keydown(function (key){
		switch(key.which){
			case 37: console.log ('left')
			break;

			case 38: moveUp()
			break;

			case 39: console.log ('right')
			break;

			case 40: console.log ('down')
			break;
		}
		//key.preventDefault();
	})

};
keyDown();



var moveUp = function () {
	var hitTop;
	jsArray.forEach(function(row, rowIndex) {
		row.forEach(function(box, colIndex) {
			hitTop = false;
			do {
				switch (rowIndex) {
					//move the box up if it is on row 3
					case 3:	//row.forEach(function(box, colIndex) {
						console.log('test 3');
						//if the box is not empty
						if (jsArray[rowIndex][colIndex] !== 0) {
							//if the box above it on row 2 is empty
							if (jsArray[rowIndex - 1][colIndex] === 0) {
								//set the box in row 2 to the current box
								jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
							// if the box on row 2 is not empty and is equal to the current box
							} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
								//add the two together and store the value in the box on row 2
								jsArray[rowIndex - 1][colIndex] += jsArray[rowIndex][colIndex];
								//make the current box empty
								jsArray[rowIndex][colIndex] = 0;
							// if the box above is not empty and is not equal to the current box
							} else {
								//stop the loop cause you hit the top!
								hitTop = true;
							}
						}
					//});
					//move the box up if it is on row 2
					break;
					case 2:	//row.forEach(function(box, colIndex) {
						console.log('test 2');
						//if the box on row 2 is not empty
						if (jsArray[rowIndex][colIndex] !== 0) {
							//if the box above it in row 1 IS empty
							if (jsArray[rowIndex - 1][colIndex] === 0) {
								//set the box in row 1 to the current box
								jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
								//make the current box empty
								jsArray[rowIndex][colIndex] = 0;
							//if the box in row 1 is NOT empty and is equal to the value of the current box
							} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
								//add the two boxes together and store the value in the box in row 1
								jsArray[rowIndex - 1][colIndex] += jsArray[rowIndex][colIndex];
								//make the current box empty
								jsArray[rowIndex][colIndex] = 0;
							// if the box above is not empty and is not equal to the current box
							} else {
								//stop the loop cause you hit the top!
								hitTop = true;
							}
						}
					//});
					break;
					//move the box up if it is on row 1
					case 1:	//row.forEach(function(box, colIndex) {
												console.log('test 1');

						//if the box on row 1 is not empty
						if (jsArray[rowIndex][colIndex] !== 0) {
							//if the box directly above it on row 0 IS empty
							if (jsArray[rowIndex - 1][colIndex] === 0) {
								//set the box above it to the value of the current box
								jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
								//and make the current box empty
								jsArray[rowIndex][colIndex] = 0;
							//if the box directly above is NOT empty and is equal to the box in row 1
							} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
								//add the two together and store them in the box above
								jsArray[rowIndex - 1][colIndex] += jsArray[rowIndex][colIndex];
								//and make the current box empty
								jsArray[rowIndex][colIndex] = 0;
							// if the box above is not empty and is not equal to the current box
							} else {
								//stop the loop cause you hit the top!
								hitTop = true;
							}
						}
					//});
					break;	
					//break the loop if the box is on row 0
					case 0: 
						hitTop = true;
						console.log('test 0');
					break;	
				//end the switch
				}
				//look at the box directly above
				rowIndex--;
			//continue the switch until you hit the top!
			} while (!hitTop);
		//end the for each box
		});
	//end the for each row
	});
	loadChar();

};
/*
// move characters on up
var moveUp = function () {
	jsArray.forEach(function(row, rowIndex) {
		switch (rowIndex) {
			case 0: console.log('this is a test');
			break;
			//move stuff on row 2 up
			case 1:	row.forEach(function(box, colIndex) {
				//if a box on row 2 is not empty
				if (jsArray[rowIndex][colIndex] !== 0) {
					//if the box directly above it IS empty
					if (jsArray[rowIndex - 1][colIndex] === 0) {
						//set the box above it to the value of the current box
						jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
						//and make the current box empty
						jsArray[rowIndex][colIndex] = 0;
					//if the box directly above ISN"T empty but is equal to the box in row 2
					} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
						//add the two together and store them in the box above
						jsArray[rowIndex - 1][colIndex] += jsArray[rowIndex][colIndex];
						//and make the current box empty
						jsArray[rowIndex][colIndex] = 0;
					} 
				}
			});
			break;
			//move stuff on row 3 up
			case 2:	row.forEach(function(box, colIndex) {
				//if the box on row 3 is not empty
				if (jsArray[rowIndex][colIndex] !== 0) {
					//if the box above it in row 2 IS empty
					if (jsArray[rowIndex - 1][colIndex] === 0) {
						//if the box above it in row 1 is empty
						if (jsArray[rowIndex -2][colIndex] === 0){
							//give the box in row 1 in the value of the current box
							jsArray[rowIndex - 2][colIndex] = jsArray[rowIndex][colIndex];
							//make the current box empty
							jsArray[rowIndex][colIndex] = 0;
						//if the box in row 1 is not empty and is equal to the current box
						} else if (jsArray[rowIndex - 2][colIndex] === jsArray[rowIndex][colIndex]) {
							//add the two together and store it in the box in row 1
							jsArray[rowIndex - 2][colIndex] += jsArray[rowIndex][colIndex];
							//make the current box empty
							jsArray[rowIndex][colIndex] = 0;
						// if the box in row 1 is not empty and is not equal to the current box
						} else if (jsArray[rowIndex - 2][colIndex] !== jsArray[rowIndex][colIndex]) {
							//set the box in row 2 to the current box
							jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
							//make the current box empty
							jsArray[rowIndex][colIndex] = 0;
						}
					//if the box in row 2 is NOT empty and is equal to the value of the current box
					} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
						//add the two boxes together and store the value in the box in row 2
						jsArray[rowIndex - 1][colIndex] += jsArray[rowIndex][colIndex];
						//make the current box empty
						jsArray[rowIndex][colIndex] = 0;
					} 
				}
			});
			break;
			//move stuff up on row 4
			case 3:	row.forEach(function(box, colIndex) {
				//if the box is not empty
				if (jsArray[rowIndex][colIndex] !== 0) {
					//if the box above it on row 3 is empty
					if (jsArray[rowIndex - 1][colIndex] === 0) {
						//if the box above it on row 2 is empty
						if (jsArray[rowIndex - 2][colIndex] === 0){
							//if the box above it on row 1 is empty
							if (jsArray[rowIndex - 3][colIndex] === 0){
								//give the box on row 1 the value of the current box
								jsArray[rowIndex - 3][colIndex] = jsArray[rowIndex][colIndex];
								//set the current box to 0
								jsArray[rowIndex][colIndex] = 0;
							}
							//if the box on row 1 is not empty and is equal to the current box
							else if (jsArray[rowIndex - 3][colIndex] === jsArray[rowIndex][colIndex]){
								//add the two together and store them in row 1
								jsArray[rowIndex - 3][colIndex] += jsArray[rowIndex][colIndex];
								//make the current box empty
								jsArray[rowIndex][colIndex] = 0;
							//if the box on row 1 is not empty but is not equal to the current box
							} else if (jsArray[rowIndex - 3][colIndex] !== jsArray[rowIndex][colIndex]) {
								//make the box on row 1 equal to the current box
								jsArray[rowIndex - 2][colIndex] = jsArray[rowIndex][colIndex];
								//make the current box empty
								jsArray[rowIndex][colIndex] = 0;
							}
						//if the box on row 2 is not empty and is equal to the current box
						} else if (jsArray[rowIndex - 2][colIndex] === jsArray[rowIndex][colIndex]) {
							//add the two together and store the value in the box on row 1
							jsArray[rowIndex - 2][colIndex] += jsArray[rowIndex][colIndex];
							//make the current box empty
							jsArray[rowIndex][colIndex] = 0;
						//if the box on row 2 is not empty but is NOT equal to the current box
						} else if (jsArray[rowIndex - 2][colIndex] !== jsArray[rowIndex][colIndex]) {
							//make the box on row 3 equal to the current box
							jsArray[rowIndex - 1][colIndex] = jsArray[rowIndex][colIndex];
							//make the current box empty
							jsArray[rowIndex][colIndex] = 0;
						}
					// if the box on row 3 is not empty and is equal to the current box
					} else if (jsArray[rowIndex - 1][colIndex] === jsArray[rowIndex][colIndex]) {
						//add the two together and store the value in the box on row 3
						jsArray[rowIndex - 1][colIndex] += jsArray[rowIndex][colIndex];
						//make the current box empty
						jsArray[rowIndex][colIndex] = 0;
					} 
				}
			});

			
		}
	});
	loadChar();

};*/




// move characters on left

//move characters on right

//move characters on down

//combine characters to higher level character






			/*
					else if (jsArray[rowIndex -3][columnIndex] !== 0){
						jsArray[rowIndex -3][columnIndex] += jsArray[rowIndex][columnIndex];
					} else if (jsArray[rowIndex -4][columnIndex] !== 0){
						jsArray[rowIndex -4][columnIndex] += jsArray[rowIndex][columnIndex];
					}
			case 2: row.forEach(function(box, columnIndex) {
				if (box.children().hasClass('filled')){
					var $temp = box.children();
					box.children().detach();
					boxArray[rowIndex -2][columnIndex].append($temp);
				}	
			})
			break;
			case 3: row.forEach(function(box, columnIndex) {
				if (box.children().hasClass('filled')){
					var $temp = box.children();
					box.children().detach();
					boxArray[rowIndex -3][columnIndex].append($temp);
				}	
			})
			break;
			case 3: row.forEach(function(box, columnIndex) {
				if (box.children().hasClass('filled')){
					var $temp = box.children();
					box.children().detach();
					boxArray[rowIndex -3][columnIndex].append($temp);
				}	
			})
			break;
*/






