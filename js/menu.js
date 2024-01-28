const menu = document.getElementById('menuJS');
const menuModal = document.querySelector('.menu__modalJS');
const closeMenu = menuModal.querySelector('.closeJS');
const container = document.querySelector('.container');

menu.addEventListener('click', () => {
    menuModal.classList.remove('hidden');
    menu.classList.add('hidden');
    container.style.filter = 'blur(10px)';
})

closeMenu.addEventListener('click', () => {
    menuModal.classList.add('hidden');
    menu.classList.remove('hidden');
    container.style.filter = 'blur(0px)';
})