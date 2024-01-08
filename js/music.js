const backgroundMusic = document.getElementById('music');
const musicOptions = document.querySelectorAll('.music');

backgroundMusic.volume = 0.3;

musicOptions.forEach( option => {
    option.addEventListener('click', () => {
        if(option.id == "off"){
            backgroundMusic.pause();           
        }else if(option.id == "on"){
            backgroundMusic.play();
        }
    })
})

document.addEventListener("DOMContentLoaded", (e) => {
    backgroundMusic.play();
});
