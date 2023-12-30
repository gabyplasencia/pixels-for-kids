const menu = document.getElementById('menu');
const menuModal = document.querySelector('.menu__modal');
const closeMenu = menuModal.querySelector('.close');

menu.addEventListener('click', () => {
    menuModal.classList.remove('hidden');
    menu.classList.add('hidden');
})

closeMenu.addEventListener('click', () => {
    menuModal.classList.add('hidden');
    menu.classList.remove('hidden');
})