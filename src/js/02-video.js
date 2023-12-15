import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player(document.getElementById('vimeo-player'));
const storageKey = 'videoplayer-current-time';


const saveCurrentTime = throttle(async () => {
  try {
    const currentTime = await vimeoPlayer.getCurrentTime();
    localStorage.setItem(storageKey, currentTime);
  } catch (error) {
    console.error('Error saving current time:', error.message);
  }
}, 1000); 


vimeoPlayer.on('timeupdate', saveCurrentTime);

async function setPlayerTimeFromStorage() {
  const storedTime = localStorage.getItem(storageKey);
  if (storedTime !== null) {
    try {
      await vimeoPlayer.setCurrentTime(parseFloat(storedTime));
    } catch (error) {
      console.error('Error setting current time:', error.message);
    }
  }
}

window.addEventListener('load', setPlayerTimeFromStorage);
