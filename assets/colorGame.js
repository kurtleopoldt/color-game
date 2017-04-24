var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var colorSelection = "RGB";
var colorDefChange = document.getElementById('colorDef');

init();

function init(){
	//mode buttons event listeners
	setupModeButtons();
	setupSqures();
	colorDefSelect();
	reset();
}

function setupModeButtons(){
	for(var i=0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSqures(){
	for(var i = 0; i < squares.length; i++){
		// add click listenters to squares
		squares[i].addEventListener("click", function(){
			// grab color of clicked square
			if(colorSelection === "RGB"){
				var clickedColor = (this.style.background);
			} else {
				var clickedColor = rgb2hex(this.style.background);
			}
			// compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			}	else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	// change the colors of the squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display= "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){
	// loop through all squares
	for (var i = 0; i < squares.length; i++){
		// change each color to match given color
		squares[i].style.background = color;
	};
}

function pickColor(){
	// pick a random number
	var random = Math.floor(Math.random() * colors.length);
	// use that number to access color and return
	return colors[random];
}

function generateRandomColors(num){
	// make an array
	var arr = [];
	// repeat num times	
	for (var i = 0; i < num; i++){
		// get random color and push into array
		// will need to insert "if" statement for different color definitions
		if(colorSelection === "RGB"){
			arr.push(randomRGB());
		} else {
			arr.push(randomHexadecimal());
		}
	}
	// return that array
	return arr;
}

//watch the colorDef selector
function colorDefSelect() {
	// var colorDefChange = document.getElementById('colorDef');
	colorDefChange.addEventListener('change', function() {
  	colorSelection = this.value;
  	reset();  	
	});
	
}

// add to this function for other varieties
function randomRGB(){
	// pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256)
	// pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256)
	// pick a "blue" form 0-255
	var b = Math.floor(Math.random() * 256)
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function randomHexadecimal(){
	hexArr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	hexColor = "";
	// loop through array and pick random variable 6 times
	for(i=0; i<6; i++){
		hexColor += (hexArr[Math.floor(Math.random()*16)]);
	}
	return ("#" + hexColor);
}

//function to convert hex format to a rgb color
//from http://stackoverflow.com/questions/13937522/how-can-i-get-the-background-colour-from-a-style-attribute-as-a-hex-value-using
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}