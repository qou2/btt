const PROXY_URL = 'https://corsproxy.io/?'; // CORS proxy service
const XBOX_PROFILE_API = 'https://xbl-api.prouser123.me/profile/'; // Free Xbox API service

function getXboxGamertag(playerName) {
  const gamertagMap = {
    'ItzUnfipabolYT': 'ItzUnfipabolYT',
    'Morad': 'Morad7559',
    'qou2': 'qou2',
    'xyzzzii': 'xyzzzii',
    'zH1by': 'zH1by',
  };
  
  return gamertagMap[playerName] || playerName; 
}

function loadXboxProfilePictures() {
  const avatars = document.querySelectorAll('.avatar');
  
  avatars.forEach(avatar => {
    const playerCard = avatar.closest('.player-card');
    const playerNameElement = playerCard.querySelector('.player-name');
    
    if (playerNameElement) {
      const playerName = playerNameElement.textContent.trim();
      const gamertag = getXboxGamertag(playerName);
      
      if (gamertag) {
        const apiUrl = PROXY_URL + encodeURIComponent(XBOX_PROFILE_API + gamertag);
        
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            if (data && data.profilePicture) {
              avatar.style.backgroundImage = `url('${data.profilePicture}')`;
            }
          })
          .catch(error => {
            console.log(`Could not load profile for ${gamertag}:`, error);
          });
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(loadXboxProfilePictures, 500);
});

window.addEventListener('load', function() {
  loadXboxProfilePictures();
});
