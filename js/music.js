const backgroundMusic = document.getElementById('music');
const musicOptions = document.querySelectorAll('.music');

musicOptions.forEach( option => {
    option.addEventListener('click', () => {
        if(!option.classList.contains('active')){
            musicOptions.forEach( o => {
                o.classList.remove('active');
            })

            option.classList.add('active');
            if(option.id === "on"){
                backgroundMusic.removeAttribute('muted')
                backgroundMusic.setAttribute('autoplay', '')
            }else{
                backgroundMusic.setAttribute('muted', '')
                console.log('click')
            }
        }
    })
})