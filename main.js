const board = document.getElementById('board');
const buttonResize = document.getElementById('resize');

const pixelBoard = {

    init: () => {
        pixelBoard.showBoard();
        pixelBoard.changeBoardSize();
    },

    showBoard: () => {
        for(i = 1; i <= 30; i++){
            let row = document.createElement('tr');
            for(j = 1; j <= 30 ; j++){
                let cell = document.createElement('td');
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    },

    deleteBoard: () => {
        while (board.firstChild) {
        board.removeChild(board.firstChild);
        }
    },

    changeBoardSize: () => {
        const resizeMenu = document.querySelector('.board__modal');
        const closeMenu = resizeMenu.querySelector('.close');
        const buttonSize = document.querySelectorAll('.b-size');

        buttonResize.addEventListener('click', () => {
            resizeMenu.classList.remove('hidden');
        })

        closeMenu.addEventListener('click', () => {
            resizeMenu.classList.add('hidden');
        })

        const createBoard = (selectedSize = 30, width = 1) => {
            for(i = 1; i <= selectedSize; i++){
                let row = document.createElement('tr');
                for(j = 1; j <= selectedSize*width ; j++){
                    let cell = document.createElement('td');
                    row.appendChild(cell);
                }
                board.appendChild(row);
            }
        }

        buttonSize.forEach( btn => {
        btn.addEventListener('click', (e) => {
            let currentBtn = e.target;

            if(currentBtn.id === 'small'){
                pixelBoard.deleteBoard();
                createBoard(30);
                buttonSize.forEach( btn => {
                    btn.classList.remove('size-selected');
                })
                currentBtn.classList.add('size-selected');
            }else if(currentBtn.id === 'medium'){
                pixelBoard.deleteBoard();
                createBoard(50, 1.3);
                buttonSize.forEach( btn => {
                    btn.classList.remove('size-selected');
                })
                currentBtn.classList.add('size-selected');
            }else {
                pixelBoard.deleteBoard();
                createBoard(50, 1.6);
                buttonSize.forEach( btn => {
                    btn.classList.remove('size-selected');
                })
                currentBtn.classList.add('size-selected');
            }
        })
    })
    },
}

document.addEventListener("DOMContentLoaded", pixelBoard.init());