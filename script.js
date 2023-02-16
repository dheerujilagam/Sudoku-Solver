var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function generateSudoku() {
	function fillSquare(board, row, col) {
	  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	  for (let i = 0; i < 9; i++) {
		let randomIndex = Math.floor(Math.random() * (9 - i));
		let randomValue = nums[randomIndex];
		nums.splice(randomIndex, 1);
		if (isValid(board, row, col, randomValue)) {
		  board[row][col] = randomValue;
		  if (col == 8) {
			if (row == 8) {
			  return true;
			} 
			else {
			  if (fillSquare(board, row + 1, 0)) {
				return true;
			  }
			}
		  } 
		  else {
			if (fillSquare(board, row, col + 1)) {
			  return true;
			}
		  }
		}
	  }
	  board[row][col] = 0;
	  return false;
	}
  
	function isValid(board, r, c, val) {
		for (let i = 0; i < 9; i++) {
			if (board[r][i] === val) return false;
			if (board[i][c] === val) return false;
			if (board[3 * Math.floor(r / 3) + Math.floor(i / 3)][3 * Math.floor(c / 3) + (i % 3)] === val) return false;
		}
		return true;
	}
  
	fillSquare(board, 0, 0);
	return board;
}

var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}

function FillZeros(board){
	let val=Math.floor(Math.random() * (70 - 65 + 1) + 65);
	for(let i=0;i<val;i++){
		let i=Math.floor(Math.random() * (8 - 0 + 1) + 0);
		let j=Math.floor(Math.random() * (8 - 0 + 1) + 0);
		board[i][j]=0;
	}
}

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	generateSudoku();
	FillZeros(board);
	FillBoard(board);
}

SolvePuzzle.onclick = function () {
	SudokuSolver(board);
	FillBoard(board);
};

function isValid(board, r, c, val) {
	for (let i = 0; i < 9; i++) {
		if (board[r][i] === val) return false;
		if (board[i][c] === val) return false;
		if (board[3 * Math.floor(r / 3) + Math.floor(i / 3)][3 * Math.floor(c / 3) + (i % 3)] === val) return false;
	}
	return true;
}
  
function SudokuSolver(board) {
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
		if (board[r][c] === 0) {
			for (let i = 1; i <= 9; i++) {
			if (isValid(board, r, c, i)) {
				board[r][c] = i;
				if (SudokuSolver(board)) {
				return true;
				} else {
				board[r][c] = 0;
				}
			}
			}
			return false;
		}
		}
	}
	return true;
}
