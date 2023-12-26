const board = document.getElementById('board');
const resizeButton = document.getElementById('resize');
const deleteDraw = document.getElementById('delete');

const pixelBoard = {

    init: () => {
        pixelBoard.showBoard();
        pixelBoard.changeBoardSize();
        pixelBoard.deleteDraw();
        pixelBoard.draw();
        pixelBoard.randomPalette();
        pixelBoard.editColors();
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

    randomPalette: () => {
        const numElements = 16;
        let wrapperColor = document.querySelector(".wrapper-colors");
        // for(let i = 0; i<numElements; i++){
        //     let label = document.createElement("label");
        //     let input = document.createElement("input");
        //     input.type = "color";
        //     input.classList.add("colors");
        //     label.appendChild(input);
        //     wrapperColor.appendChild(label);
        // }
        for(let i = 0; i<numElements; i++){
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.classList.add("colors");
            label.appendChild(input);
            wrapperColor.appendChild(label);
        }
        const colorInputs = document.querySelectorAll('.colors');

        const getRandomColor = () => {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        };
        
        colorInputs.forEach((input) => {
            setColor = getRandomColor();
            input.style.backgroundColor = setColor;
            input.style.color = window.getComputedStyle(input).getPropertyValue('background-color');
            input.setAttribute('value', setColor);
            input.setAttribute('type', 'text');
        });
    },

    editColors: () => {
        const editColor = document.getElementById('color-edit');
        const colorCheck = document.getElementById('color-edit-finish');
        let palette = document.querySelectorAll('.colors');

        let colors = [];

        editColor.addEventListener('click', () => {
            colorCheck.classList.remove('hidden');
            editColor.classList.add('hidden');

            palette.forEach( color => {
                colors.push(color.value);
                color.setAttribute('type', 'color');

                color.addEventListener('click', () => {
                    color.oninput = () => {
                        color.style.backgroundColor = color.value;
                        color.style.color = color.value;
                        color.setAttribute('value', color.value);
                    }
                    
                })
            })
        })

        colorCheck.addEventListener('click', () => {
            editColor.classList.remove('hidden');
            colorCheck.classList.add('hidden');

            palette.forEach( color => {
                color.setAttribute('type', 'text');
            })
        })
    },

    draw: () => {
        const colorInputs = document.querySelectorAll('.colors');
        let selectedColor;

        colorInputs.forEach( color => {
            color.addEventListener('click', (e) => {
                let selectedInput = e.target;
                // colorInputs.forEach( color => {
                //     color.classList.remove('color-picked');
                //     })
                selectedInput.classList.add('color-picked');
                console.log(e.target.tagName)
            })
            if(e.target.classList.contains('color-picked')){
                selectedColor = e.target;
            }
        })

        const activeDraw = (e) => {
          if (!e) {
            return;
          }
          if (e.target.tagName === 'TD') {
            e.target.style.backgroundColor = selectedColor.value;
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