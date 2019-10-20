//Contains the state of the connect 4 board
var board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];

//Is the game over
var gameover = false;

//Initilize board back to start state
function Initilize(){
	board = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
	
	//Redraw the board
	DrawBoard();		
	gameover = false;
	
	SetTopText('New Game Started',5000);
}

//Redraw the board
function DrawBoard(){
	//Get handle to canvas
	let canvas = document.getElementById("connect4board");
	
	//Create a drawing object
	let ctx = canvas.getContext("2d");
	
	//Get height and width of canvas
	let x = canvas.width;
	let y = canvas.height;
	
	//Calculate size of stones and borders	
	let stonex = 80;
	let stoney = 80;
	let borderx = 6
	let bordery  = 6;
		
	//Set background to light grey
	ctx.fillStyle = "#BBBBBB";
	ctx.fillRect(0,0,x,y);
	
	//Draw Boarders
	ctx.fillStyle = "#000000";
	
	//Vertical Lines
	let posx = 0;	
	while(posx <= x){
		posx += stonex;
		ctx.fillRect(posx,0,borderx,y);
		posx += borderx;
	}
	
	//Horisontal Lines
	let posy = 0;	
	while(posy <= y){
		posy += stoney;
		ctx.fillRect(0,posy,x,bordery);
		posy += bordery;
	}
		
	//Draw stones
	for (let sx = 0; sx <= 6; sx++){//For each row
		for (let sy = 0; sy <= 5; sy++){//For each column
			//If the cell is not empty
			if (board[sx][sy] != 0){
				//Draw the circle outline
				ctx.fillStyle = "#000000";
				ctx.beginPath();
				ctx.arc((sx * (stonex + borderx)) + 40, (sy * (stoney + bordery)) + 40, 38, 0, 2*Math.PI);
				ctx.stroke();

				//Set the correct fill color based on cell state						
				if(board[sx][sy] == 1){				
					ctx.fillStyle = "#FF0000";	
				} else if(board[sx][sy] == 2){				
					ctx.fillStyle = "#00FF00";					
				}

				ctx.fill();
			}
			
		}
	}
}

//Handle click on canvas and process players move
function PlayerMove(){	
	ClearTopText();
	
	//If the game is finished, reset it on user click
	if (gameover){	
		Initilize();
		
	} else {//Otherwise process move
		//Determin which column was clicked
		let colx = Math.floor(event.offsetX / 86);

		//Check if the column the user has clicked on is full
		if (board[colx][0] != 0){//Column is full alert user
			SetTopText('Invalid Move, Column Is Full', 3000);

		} else {//Otherwise update the lowest free cell in column and redraw board
			board[colx][FindLowestFree(board, colx)] = 1;
			
			//Check if the player has won
			CheckGameOver(board);
			
			//If the players move did not result in the player winning preform AI Move
			if (!gameover){
				AIMove();
				CheckGameOver(board);
			}
			
			DrawBoard();
		}
	}
}

//Find the lowest free cell in a column
function FindLowestFree(state, col){	
	for (let y = 5; y >= 0; y--){
		//If cell is not empty, put a peice in it
		if (state[col][y] == 0){
			return y;
		}
	}
}

//Check if there is a winner or the game has drawn
function CheckGameOver(state, liveboard=true){
	//Check if the board is full
	let allfilled = true;
	let winner=0;
	
	//Loop through board
	for (let x=0; x <= 6; x++){
		for (let y=0; y <= 5; y++){
			if (state[x][y] == 0){
				allfilled = false;
			} else {
				//Check for win on x axis
				if ((x + 3) <= 6){
					if (state[x+1][y] == state[x][y] && state[x+2][y] == state[x][y] && state[x+3][y] == state[x][y]){
						winner = state[x][y];
					}
				}
				
				//Check for win on y axis
				if ((y + 3) <= 5){
					if (state[x][y+1] == state[x][y] && state[x][y+2] == state[x][y] && state[x][y+3] == state[x][y]){
						winner = state[x][y];
					}
				}
				
				//Check for diagonal down-right
				if (((y + 3) <= 5) && ((x + 3) <= 6)){
					if (state[x+1][y+1] == state[x][y] && state[x+2][y+2] == state[x][y] && state[x+3][y+3] == state[x][y]){
						winner = state[x][y];
					}
				}
				
				//Check for diagonal up-right
				if (((y - 3) >= 0) && ((x + 3) <= 6)){
					if (state[x+1][y-1] == state[x][y] && state[x+2][y-2] == state[x][y] && state[x+3][y-3] == state[x][y]){
						winner = state[x][y];
					}
				}
			}
		}
	}
	
	//If we are checking for a win on the main gameboard
	if (liveboard){
		//If Somebody has won
		if (winner != 0){
			if (winner == 1){
				gameover = true;
				SetTopText('Player Wins', 0);

			} else {
				gameover = true;
				SetTopText('AI Wins', 0);

			}

		} else if(allfilled){//If the board is full
			gameover = true;
			SetTopText('Game Is A Draw', n=0);
		}
		
	} else {//Return -1,0, 1 for loose, draw, win
		if (winner==1){
			return -1;
			
		} else if(winner==2) {
			return 1;
			
		} else if (allfilled){
			return 0;
			
		} else {
			return null;
		}
	}
}

//Set the text at top of the page, also optional clear it after a delay
function SetTopText(text, n=0){	
	document.getElementById('toptext').innerHTML = text;
	
	//If clear after a delay is specified
	if (n!=0){
		ClearTopText(n);
	}
}

//Clear text at the top of the page with an optional delay
function ClearTopText(n=0){
	if (n==0){
		document.getElementById('toptext').innerHTML = '';
		
	} else {
		//Set this function to be recalled after n
		window.setTimeout(ClearTopText, n);
	}
	
}