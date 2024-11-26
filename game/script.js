function startGame(numPlayers) {
    
    // You can store the number of players in a variable or pass it to the game initialization logic
    // For now, let's store it in a global variable as an example
    window.numPlayers = numPlayers;
}

function startGameClicked() {
    if (window.numPlayers === 1) {
        window.location.href = 'game/singlePlayer.html'; // Example: Redirect to a separate page for 1 player game
    } else if (window.numPlayers === 2) {
        window.location.href = 'game/twoPlayers.html'; // Example: Redirect to a separate page for 2 player game
    }
}

function openGameGuide() {
    document.getElementById('gameGuideModal').style.display = 'block';
    window.location.href = 'gameGuide.html';
}

function closeGameGuideModal() {
    document.getElementById('gameGuideModal').style.display = 'none';
}
