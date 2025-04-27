document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with player cards
  const playerCards = document.querySelectorAll('.player-card');
  if (playerCards.length === 0) return;

  // Default Xbox profile picture to use when API fails
  const defaultXboxIcon = "https://images-eds-ssl.xboxlive.com/image?url=wHwbXKif8cus8csoZ03RW3apWESZjav65Yncai8aRmWL5wD_dXiCeIhr2I61i4BQ4QVFYeQeIi7i6ZtOjjr7I_D6C72vv5wKR24796_oInYM6igje3Tce98UBdEdlZHqsA27eBbHwmkC_IcAG.R3qPwRmIfO7A5ftfaEdpE_SCESvHLbMc_Bti50JN5KzyIO&format=png";

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
        // Use the icon URL directly from the API response
        if (data.icon) {
          updateAvatar(avatarElement, data.icon);
        } else {
          // Use default icon if the API response doesn't include an icon
          updateAvatar(avatarElement, defaultXboxIcon);
        }
      })
      .catch(error => {
        console.error(`Error fetching profile for ${gamertag}:`, error);
        // Use default icon for failed requests
        updateAvatar(avatarElement, defaultXboxIcon);
      });
  }

  // Function to update avatar with proper styling
  function updateAvatar(avatarElement, iconUrl) {
    avatarElement.style.backgroundImage = `url(${iconUrl})`;
    avatarElement.classList.add('loaded');
  }

  // Add CSS for better avatar display
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .avatar {
      background-position: center;
      background-size: cover;
      border: 2px solid #333;
    }
    .avatar.loaded {
      background-color: transparent;
    }
  `;
  document.head.appendChild(styleElement);
});
