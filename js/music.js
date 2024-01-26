const backgroundMusic = document.getElementById('musicJS');
const musicOptions = document.querySelectorAll('.musicJS');
const iconOn = document.getElementById('icon-on');
const iconOff = document.getElementById('icon-off');

backgroundMusic.volume = 0.1;

musicOptions.forEach( option => {
    option.addEventListener('click', () => {
        if(option.id == "off"){
            backgroundMusic.pause(); 
            iconOn.style.display = "none";
            iconOff.style.display = "block";          
        }else if(option.id == "on"){
            backgroundMusic.play();
            iconOff.style.display = "none";
            iconOn.style.display = "block";
        }
    })
})

