const rows = 6; 
const cols = 6;
const gameBoard = document.getElementById("game-board");
let board = [];

function createBoard() {
    board = Array.from({ length: rows }, () => Array(cols).fill(null));
    gameBoard.innerHTML = ""; 
    board.forEach((row, i) => {
        row.forEach((_, j) => {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleCellClick);
            board[i][j] = cell;
            gameBoard.appendChild(cell);
        });
    });
}

function toggleCell(row, col) {
    const directions = [
        [0, 0], 
        [-1, 0], 
        [1, 0],  
        [0, -1], 
        [0, 1],  
    ];

    directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            board[newRow][newCol].classList.toggle("is-off");
        }
    });
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);

    toggleCell(row, col);

    if (checkWin()) {
        setTimeout(() => alert("Congratulations! All lights are off!"), 100);
    }
}

function checkWin() {
    return board.flat().every(cell => cell.classList.contains("is-off"));
}

function randomizeBoard() {
    const toggleCount = rows * cols; 
    for (let i = 0; i < toggleCount; i++) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        toggleCell(randomRow, randomCol);
    }
}

function initGame() {
    createBoard();
    randomizeBoard();
}

initGame();
