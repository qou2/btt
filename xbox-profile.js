document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with player cards
  const playerCards = document.querySelectorAll('.player-card');
  if (playerCards.length === 0) return;

  // Process each player card
  playerCards.forEach(card => {
    const playerNameElement = card.querySelector('.player-name');
    if (!playerNameElement) return;
    
    const playerName = playerNameElement.textContent.trim();
    const avatarElement = card.querySelector('.avatar');
    
    if (playerName && avatarElement) {
      fetchPlayerProfile(playerName, avatarElement);
    }
  });

  // Function to fetch player profile from the API
  function fetchPlayerProfile(gamertag, avatarElement) {
    // Encode the gamertag for the URL
    const encodedGamertag = encodeURIComponent(gamertag);
    const apiUrl = `https://mcprofile.io/api/v1/bedrock/gamertag/${encodedGamertag}`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API returned status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Update the avatar with the player's skin URL
        if (data.skin) {
          // Use the skin URL directly
          avatarElement.style.backgroundImage = `url(${data.skin})`;
          
          // Add a class to indicate the avatar was successfully loaded
          avatarElement.classList.add('loaded');
          
          // Store additional data as attributes if needed later
          if (data.xuid) {
            avatarElement.setAttribute('data-xuid', data.xuid);
          }
          if (data.gamescore) {
            // Update player rank element if it exists
            const rankElement = avatarElement.parentElement.querySelector('.player-rank');
            if (rankElement && !rankElement.textContent.includes('#')) {
              rankElement.textContent = `Score: ${data.gamescore}`;
            }
          }
        } else if (data.icon) {
          // Fallback to Xbox profile icon if skin isn't available
          avatarElement.style.backgroundImage = `url(${data.icon})`;
          avatarElement.classList.add('loaded');
        }
      })
      .catch(error => {
        console.error(`Error fetching profile for ${gamertag}:`, error);
        // Keep default placeholder avatar for failed requests
      });
  }

  // Add CSS for better avatar display
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .avatar {
      background-position: -16px -8px;
      background-size: 128px 128px;
    }
    .avatar.loaded {
      background-color: transparent;
    }
  `;
  document.head.appendChild(styleElement);
});
