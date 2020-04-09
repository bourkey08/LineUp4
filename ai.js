let tmpstate = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];//Copy of starting board state
        
        for (let x=0; x<7; x++){
            for (let y=0; y<6; y++){
                tmpstate[x][y] = state[x][y];
            }
        }
        
		let turn = 1;//Player whos turn it is
		let gamestatus = 0;//Status of the current game
		let thismove = 0;//Column to put stone in	let tmpstate = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];//Copy of starting board state
        
        for (let x=0; x<7; x++){
            for (let y=0; y<6; y++){
                tmpstate[x][y] = state[x][y];
            }
        }
        
		let turn = 1;//Player whos turn it is
		let gamestatus = 0;//Status of the current game
		let thismove = 0;//Column to put stone in	let tmpstate = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];//Copy of starting board state
        
        for (let x=0; x<7; x++){
            for (let y=0; y<6; y++){
                tmpstate[x][y] = state[x][y];
            }
        }
        
		let turn = 1;//Player whos turn it is
		let gamestatus = 0;//Status of the current game
		let thismove = 0;//Column to put stone in//Preform AI Move
function AIMove(){
	
	//For each column that is not full preform a monte carlo simulation
	var results = []
	
	for (var id = 0; id <= 6; id++){
		if (board[id][0] == 0){//If this column is not full
			results.push(MonteCarlo(JSON.parse(JSON.stringify(board)), id));//Copy board and send to montecarlo function
			
		} else{//Column is full
			results.push(-1);
		}		
	}
	
	console.log(results)
	//Place a stone in the cell with the highest value	
	var bestmove = results.indexOf(results.slice().sort(function(a,b) { return a - b; })[6]);//Find the highest ranked cell
	
	//Add a stone to the highest ranked cell
	board[bestmove][FindLowestFree(board, bestmove)] = 2;
}


function MonteCarlo(state, col, n=10000){
	var win = 0;
	var lose = 0;
	var draw = 0;
	
	//Place first stone in specified column
	state[col][FindLowestFree(state, col)] = 2;
	
	//Now play n games and count wins
	var gamecount = 0;//Count the number of games played	
	
	
	while (gamecount < n){
		let tmpstate = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];//Copy of starting board state
        
        for (let x=0; x<7; x++){
            for (let y=0; y<6; y++){
                tmpstate[x][y] = state[x][y];
            }
        }
        
		let turn = 1;//Player whos turn it is
		let gamestatus = 0;//Status of the current game
		let thismove = 0;//Column to put stone in
		gamecount += 1;
		
		//Loop until game finished
		while (true){
			//Preform a random move for the current player
			thismove = Math.floor(Math.random() * 7);
			
			//If the selected column is not full
			if (tmpstate[thismove][0] == 0){
				tmpstate[thismove][FindLowestFree(tmpstate, thismove)] = turn;

				//Swap players
				if (turn == 1){
					turn = 2;
				} else {
					turn = 1;
				}

				//Check if anybody has won of if we have drawn
				gamestatus = CheckGameOver(tmpstate, false);
				if (gamestatus == 0){//Draw
					draw += 1;
					break;

				} else if(gamestatus == 1){//Win
					win += 1;
					break;

				} else if (gamestatus == -1){//Lose
					lose += 1;
					break;
				}
			}
		}	
	}
	
	
	//Return a value between -1 and 1 indicating which cell chas the best chance of winning
	return (win / n)  - (lose / n)
}