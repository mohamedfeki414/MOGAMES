document.addEventListener('DOMContentLoaded', function () {
    const cards = [
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png',
        'img/6.png',
        'img/7.png',
        'img/8.png',
        'img/5.png',
        'img/6.png',
        'img/7.png',
        'img/8.png',
        'img/9.png',
      
        'img/9.png',
       
  
      ];
    let selectedCards = [];
    let correctPairs = [];
    let pointsPlayer1 = 0;
    let pointsPlayer2 = 0;
    let currentPlayer = 1;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(imagePath, index) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = imagePath;

        img.style.width = '100%';
        img.style.height = '100%';

        card.appendChild(img);
        card.addEventListener('click', () => flipCard(index));

        return card;
    }

    function renderBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';

        cards.forEach((imagePath, index) => {
            const card = createCard(imagePath, index);
            gameBoard.appendChild(card);
        });
    }

    function flipCard(index) {
        const card = document.getElementById('game-board').children[index];

        if (correctPairs.includes(cards[index]) || card.classList.contains('hidden') || selectedCards.length === 2) {
            return;
        }

        card.classList.add('hidden');

        selectedCards.push({ index, value: cards[index] });

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = selectedCards;

        if (card1.value === card2.value) {
            document.getElementById('game-board').children[card1.index].classList.add('matched');
            document.getElementById('game-board').children[card2.index].classList.add('matched');
            handleMatch();
            correctPairs.push(card1.value);
            selectedCards = [];
        } else {
            if (currentPlayer === 1) {
                currentPlayer++;
            } else {
                currentPlayer--;
            }
            updatePointsDisplay();
            document.getElementById('game-board').children[card1.index].classList.remove('hidden');
            document.getElementById('game-board').children[card2.index].classList.remove('hidden');
            selectedCards.forEach(card => {
                document.getElementById('game-board').children[card.index].classList.remove('hidden');
            });
            selectedCards = [];
        }

        checkGameEnd();
    }

    function handleMatch() {
       
            if (currentPlayer === 1) {
                pointsPlayer1++;
            } else {
                pointsPlayer2++;
            }

        updatePointsDisplay();
    }

    function updatePointsDisplay() {
        const player1Display = document.getElementById('player1');
        const player2Display = document.getElementById('player2');

        player1Display.innerText = pointsPlayer1;
        player2Display.innerText = pointsPlayer2;

        // Add or remove the 'current-player' class based on the current player
        if (currentPlayer === 1) {
            player1Display.classList.add('current-player');
            player2Display.classList.remove('current-player');
        } else {
            player1Display.classList.remove('current-player');
            player2Display.classList.add('current-player');
        }
    }

    function checkGameEnd() {
        const visibleCards = document.querySelectorAll('.card:not(.hidden)');
        if (visibleCards.length === 0) {
            showCongratulationsPopup();
        }
    }

    function showCongratulationsPopup() {
        const congratulationsPopup = document.getElementById('congratulations-popup');
        let winnerMessage = '';
    
        if (pointsPlayer1 > pointsPlayer2) {
            winnerMessage = 'Player 1 wins!';
        } else if (pointsPlayer2 > pointsPlayer1) {
            winnerMessage = 'Player 2 wins!';
        } else {
            winnerMessage = 'It\'s a tie!';
        }
    
        congratulationsPopup.innerHTML = `<p>${winnerMessage}</p>`;
        congratulationsPopup.style.display = 'flex';
    }

    function restartGame() {
        selectedCards = [];
        correctPairs = [];
        pointsPlayer1 = 0;
        pointsPlayer2 = 0;

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('hidden', 'matched');
        });

        const congratulationsPopup = document.getElementById('congratulations-popup');
        congratulationsPopup.style.display = 'none';

        shuffle(cards);
        renderBoard();
        updatePointsDisplay();
    }

    document.getElementById('restart-button').addEventListener('click', restartGame);

    shuffle(cards);
    renderBoard();
    updatePointsDisplay();
});