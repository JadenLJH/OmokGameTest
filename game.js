const boardSize = 15;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
let currentPlayer = 'black';

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => placeStone(x, y));
            gameBoard.appendChild(cell);
        }
    }
}

function placeStone(x, y) {
    if (board[y][x] || checkWin()) return;
    board[y][x] = currentPlayer;
    renderBoard();
    if (checkWin(x,y)) {
        alert(`${currentPlayer} wins!`);
        board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null)); // Reset board
    }
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const cells = gameBoard.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const x = index % boardSize;
        const y = Math.floor(index / boardSize);
        cell.innerHTML = board[y][x] ? `<div class="stone ${board[y][x]}"></div>` : '';
    });
}

function checkWin(x, y) {
    // 방향별로 검사할 벡터 설정
    const directions = [
        { dx: 1, dy: 0 }, // 가로
        { dx: 0, dy: 1 }, // 세로
        { dx: 1, dy: 1 }, // 우하향 대각선
        { dx: 1, dy: -1 } // 우상향 대각선
    ];

    // 각 방향에 대해 연속된 돌의 개수를 세는 로직
    for (let {dx, dy} of directions) {
        let count = 1; // 현재 돌을 포함하여 시작

        // 현재 돌의 위치에서 시작하여 한 방향으로 연속된 돌 세기
        let [nx, ny] = [x + dx, y + dy];
        while (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[ny][nx] === currentPlayer) {
            count++;
            nx += dx;
            ny += dy;
        }

        // 현재 돌의 위치에서 반대 방향으로 연속된 돌 세기
        [nx, ny] = [x - dx, y - dy];
        while (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[ny][nx] === currentPlayer) {
            count++;
            nx -= dx;
            ny -= dy;
        }

        // 연속된 돌의 개수가 5개 이상인 경우 승리
        if (count >= 5) return true;
    }

    // 모든 방향에 대해 연속된 5개의 돌이 없는 경우
    return false;
}

createBoard();