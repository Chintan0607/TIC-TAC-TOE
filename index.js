document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const gameInfo = document.querySelector('.game-info');
    const newGameButton = document.querySelector('.btn');
    const congratsMessage = document.querySelector('.congratulations-message');


    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

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

    function handleBoxClick(clickedBoxEvent) {
        const clickedBox = clickedBoxEvent.target;
        const clickedBoxIndex = Array.from(boxes).indexOf(clickedBox);

        if (gameState[clickedBoxIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedBoxIndex] = currentPlayer;
        clickedBox.textContent = currentPlayer;

        if (checkWinner()) {
            gameInfo.textContent = `Player ${currentPlayer} has won!`;
            congratsMessage.textContent = `Congratulations! Player ${currentPlayer} has won!`;
            congratsMessage.style.display = 'block';
            gameActive = false;
            highlightWinningBoxes();
        } else if (!gameState.includes('')) {
            gameInfo.textContent = `It's a draw!`;
             congratsMessage.textContent = `It's a draw!`;
            congratsMessage.style.display = 'block';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameInfo.textContent = `Current player: ${currentPlayer}`;
        }
    }

    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function highlightWinningBoxes() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                boxes[a].classList.add('win');
                boxes[b].classList.add('win');
                boxes[c].classList.add('win');
            }
        }
    }

    function handleNewGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        gameInfo.textContent = `Current player: ${currentPlayer}`;
         congratsMessage.style.display = 'none';
        boxes.forEach(box => {
            box.textContent = '';
            box.classList.remove('win');
        });
    }

    boxes.forEach(box => box.addEventListener('click', handleBoxClick));
    newGameButton.addEventListener('click', handleNewGame);
});
