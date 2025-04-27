// xbox-profile-github.js - GitHub Pages compatible solution

// Configuration
const XBOX_API_URL = 'https://xapi.us/v2/gamertag/';
const AVATAR_SELECTOR = '.avatar';

// Player gamertag mapping (Discord name to Xbox gamertag)
const playerGamertagMap = {
  // Map Discord names to Xbox gamertags
  // S Tier
  'Morad': 'Morad7559',
  'ItzUnfipabolYT': 'ItzUnfipabolYT',
  
  // A Tier
  'qou2': 'qou2',
  'xyzzzii': 'xyzzzii',
  'zH1by': 'zH1by',
  'WerLifes': 'WerLifes',
  'Dqrryn': 'Dqrryn',
  'cybxrzyt': 'cybxrzyt',
  
  // Add more as needed
  // Default will use the name as-is
};

// Pre-fetched gamerpic URLs (to avoid API calls on GitHub Pages)
// You'll need to populate this with actual URLs once you've fetched them once
const gamerpicCache = {
  'Morad7559': 'https://images-eds-ssl.xboxlive.com/image?url=GAMERTAG_PICTURE_URL',
  'ItzUnfipabolYT': 'https://images-eds-ssl.xboxlive.com/image?url=GAMERTAG_PICTURE_URL',
  // Add more as you get them
};

// Function to get Xbox gamerpic using the player's name
function getXboxGamerpic(playerName) {
  // Get the corresponding gamertag
  const gamertag = playerGamertagMap[playerName] || playerName;
  
  // Return the cached gamerpic if available
  return gamerpicCache[gamertag] || null;
}

// Function to load Xbox profile pictures from our cache
function loadXboxProfilePictures() {
  // Select all player avatars
  const avatars = document.querySelectorAll(AVATAR_SELECTOR);
  
  avatars.forEach(avatar => {
    // Get the player name from the sibling element
    const playerCard = avatar.closest('.player-card');
    const playerNameElement = playerCard.querySelector('.player-name');
    
    if (playerNameElement) {
      const playerName = playerNameElement.textContent.trim();
      const gamerpic = getXboxGamerpic(playerName);
      
      // If we have a gamerpic for this player, use it
      if (gamerpic) {
        avatar.style.backgroundImage = `url('${gamerpic}')`;
      }
    }
  });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadXboxProfilePictures);
