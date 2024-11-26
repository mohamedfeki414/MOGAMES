document.addEventListener('DOMContentLoaded', () => {
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
    let attempts = 0;
    let faults = 0;
    let timer;
  
    // Shuffle the cards array randomly
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
  
    // Create a card element with the given image path and index
    const createCard = (imagePath, index) => {
      const card = document.createElement('div');
      card.className = 'card';
  
      const img = document.createElement('img');
      img.src = imagePath;
  
      img.style.width = '100%';
      img.style.height = '100%';
  
      card.appendChild(img);
      card.addEventListener('click', () => flipCard(index));
  
      return card;
    };
  
    // Render the board with the given cards
    const renderBoard = () => {
      const gameBoard = document.getElementById('game-board');
      gameBoard.innerHTML = '';
  
      cards.forEach((imagePath, index) => {
        const card = createCard(imagePath, index);
        gameBoard.appendChild(card);
      });
    };
  
    // Handle the click event for a card and flip it
    const flipCard = (index) => {
      
      const card = document.getElementById('game-board').children[index];
  
      if (
        correctPairs.includes(cards[index]) ||
        card.classList.contains('hidden') ||
        selectedCards.length === 2
      ) {
        return;
      }
  
      card.classList.add('hidden');
  
      selectedCards.push({ index, value: cards[index] });
  
      if (selectedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    };
  
    // Check if the selected cards match and update the game state
    const checkMatch = () => {
      const [card1, card2] = selectedCards;
  
      if (card1.value === card2.value) {
        document.getElementById('game-board').children[card1.index].classList.add('matched');
        document.getElementById('game-board').children[card2.index].classList.add('matched');
  
        correctPairs.push(card1.value);
        selectedCards = [];
      } else {
        document.getElementById('game-board').children[card1.index].classList.remove('hidden');
        document.getElementById('game-board').children[card2.index].classList.remove('hidden');
  
        selectedCards.forEach((card) => {
          document.getElementById('game-board').children[card.index].classList.remove('hidden');
        });
  
        selectedCards = [];
        faults++;
      }
  
      attempts++;
      document.getElementById('attempts').innerText = attempts;
      document.getElementById('faults').innerText = faults;
      checkGameEnd();
    };
  
    // Check if the game has ended and show the congratulations popup
    const checkGameEnd = () => {
      const visibleCards = document.querySelectorAll('.card:not(.hidden)');
      if (visibleCards.length === 0) {
        clearInterval(timer);
        showCongratulationsPopup();
      }
    };
  
    // Show the congratulations popup with the final game stats
    const showCongratulationsPopup = () => {
      document.getElementById('final-attempts').innerText = attempts;
      document.getElementById('final-faults').innerText = faults;
      document.getElementById('final-time').innerText = document.getElementById('timer').innerText;
  
      const congratulationsPopup = document.getElementById('congratulations-popup');
      congratulationsPopup.style.display = 'flex';
    };
  
    // Start the timer
    const startTimer = () => {
      let seconds = 0;
      timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = seconds;
      }, 1000);
    };
  
    // Restart the game
    const restartGame = () => {
      clearInterval(timer);
      selectedCards = [];
      correctPairs = [];
      attempts = 0;
      faults = 0;
  
      const allCards = document.querySelectorAll('.card');
      allCards.forEach((card) => {
        card.classList.remove('hidden', 'matched');
      });
  
      document.getElementById('attempts').innerText = attempts;
      document.getElementById('faults').innerText = faults;
      document.getElementById('timer').innerText = 0;
  
      const congratulationsPopup = document.getElementById('congratulations-popup');
      congratulationsPopup.style.display = 'none';
  
      shuffle(cards);
      renderBoard();
      startTimer();
    };
  
    // Add event listener for the restart button
    document.getElementById('restart-button').addEventListener('click', restartGame);
  
    // Initial setup
    shuffle(cards);
    renderBoard();
    startTimer();
  });