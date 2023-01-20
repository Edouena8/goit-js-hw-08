import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = "videoplayer-current-time";   

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

resumePlayback();

function onPlay(date){
    
    const savedDate = JSON.stringify(date);
    localStorage.setItem(STORAGE_KEY, savedDate);
};

function resumePlayback() {

    const savedDate = localStorage.getItem(STORAGE_KEY);

    if(savedDate) {
        const parsedDate = JSON.parse(savedDate);

        player.setCurrentTime(parsedDate.seconds);
    }
}