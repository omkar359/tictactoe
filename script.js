 const board = document.getElementById('board');
const popup = document.getElementById('popup');
const message = document.getElementById('message');
const newGameButton = document.getElementById('newGameButton');
let cells;
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
    popup.style.display = 'none';
    gameActive = true;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Add class based on current player
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (cells[a].textContent === '' || cells[b].textContent === '' || cells[c].textContent === '') {
            continue;
        }
        if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showMessage(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    const roundDraw = [...cells].every(cell => cell.textContent !== '');
    if (roundDraw) {
        showMessage('Draw!');
        gameActive = false;
        return;
    }
}

function showMessage(msg) {
    message.textContent = msg;
    popup.style.display = 'flex';
}

newGameButton.addEventListener('click', () => {
    currentPlayer = 'X';
    createBoard();
});

createBoard();
