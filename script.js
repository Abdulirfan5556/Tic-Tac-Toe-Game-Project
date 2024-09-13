const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');
let turn = 'X';
let scoreX = 0;
let scoreO = 0;
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWinner = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && 
            cells[a].textContent === cells[b].textContent && 
            cells[a].textContent === cells[c].textContent) {
            messageDisplay.textContent = `${cells[a].textContent} Wins!`;
            gameActive = false;
            cells[a].style.color = '#007BFF';
            cells[b].style.color = '#007BFF';
            cells[c].style.color = '#007BFF';
            updateScore(cells[a].textContent);
            break;
        }
    }
    if (gameActive && [...cells].every(cell => cell.textContent)) {
        messageDisplay.textContent = 'It\'s a Draw!';
        gameActive = false;
    }
}

const updateScore = (winner) => {
    if (winner === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = scoreX;
    } else {
        scoreO++;
        document.getElementById('scoreO').textContent = scoreO;
    }
}

const handleCellClick = (event) => {
    const cell = event.target;
    if (cell.textContent || !gameActive) return;
    cell.textContent = turn;
    checkWinner();
    turn = turn === 'X' ? 'O' : 'X';
}

const restartGame = () => {
    cells.forEach(cell => cell.textContent = '');
    turn = 'X';
    gameActive = true;
    messageDisplay.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
 