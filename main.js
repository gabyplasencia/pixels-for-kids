const board = document.getElementById('board');
const resizeButton = document.getElementById('resize');
const deleteDraw = document.getElementById('delete');

const pixelBoard = {

    init: () => {
        pixelBoard.showBoard();
        pixelBoard.changeBoardSize();
        pixelBoard.deleteDraw();
        pixelBoard.draw();
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

    createBoard: (selectedSize = 30, width = 1) => {
        for(i = 1; i <= selectedSize; i++){
            let row = document.createElement('tr');
            for(j = 1; j <= selectedSize*width ; j++){
                let cell = document.createElement('td');
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    },

    changeBoardSize: () => {
        const resizeMenu = document.querySelector('.board__modal');
        const closeMenu = resizeMenu.querySelector('.close');
        const sizeButton = document.querySelectorAll('.b-size');

        resizeButton.addEventListener('click', () => {
            resizeMenu.classList.remove('hidden');
        })

        closeMenu.addEventListener('click', () => {
            resizeMenu.classList.add('hidden');
        })

        sizeButton.forEach( btn => {
        btn.addEventListener('click', (e) => {
            let currentBtn = e.target;

            if(currentBtn.id === 'small'){
                pixelBoard.deleteBoard();
                pixelBoard.createBoard(30);
                sizeButton.forEach( btn => {
                    btn.classList.remove('size-selected');
                })
                currentBtn.classList.add('size-selected');
            }else if(currentBtn.id === 'medium'){
                pixelBoard.deleteBoard();
                pixelBoard.createBoard(50, 1.3);
                sizeButton.forEach( btn => {
                    btn.classList.remove('size-selected');
                })
                currentBtn.classList.add('size-selected');
            }else {
                pixelBoard.deleteBoard();
                pixelBoard.createBoard(50, 1.6);
                sizeButton.forEach( btn => {
                    btn.classList.remove('size-selected');
                })
                currentBtn.classList.add('size-selected');
            }
        })
    })
    },

    deleteDraw: () => {
        deleteDraw.addEventListener('click', () => {
            let selectedSize = document.querySelector('.size-selected').id;
            pixelBoard.deleteBoard();
            if(selectedSize === 'small'){
                pixelBoard.createBoard(30);
            }else if(selectedSize === 'medium'){
                pixelBoard.createBoard(50, 1.3);
            }else {
                pixelBoard.createBoard(50, 1.6);
            }
        })
    },

    draw: () => {
        const activeDraw = (e) => {
          if (!e) {
            return;
          }
          if (e.target.tagName === 'TD') {
            e.target.style.backgroundColor = 'black';
          }
        };
    
        const mouseUpHandler = () => {
          board.removeEventListener('mouseover', activeDraw);
        };
    
        board.addEventListener('mousedown', () => {
          board.addEventListener('mouseover', activeDraw);
        });
    
        board.addEventListener('mouseup', mouseUpHandler);
      }
}

document.addEventListener("DOMContentLoaded", pixelBoard.init());