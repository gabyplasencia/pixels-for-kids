const backgroundMusic = document.getElementById('musicJS');
const musicOptions = document.querySelectorAll('.musicJS');

backgroundMusic.volume = 0.1;

musicOptions.forEach( option => {
    option.addEventListener('click', () => {
        if(option.id == "off"){
            backgroundMusic.pause();           
        }else if(option.id == "on"){
            backgroundMusic.play();
        }
    })
})

