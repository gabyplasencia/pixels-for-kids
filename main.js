const board = document.getElementById('board');
const resizeButton = document.getElementById('resize');
const deleteDraw = document.getElementById('delete');

const pixelBoard = {

    init: () => {
        pixelBoard.showBoard();
        pixelBoard.changeBoardSize();
        pixelBoard.deleteDraw();
        pixelBoard.randomPalette();
        const palette = document.querySelectorAll('.colors');
        const wrapper = document.querySelector(".wrapper-colors");

        palette.forEach( color => {
            color.addEventListener('click', (e) => {
                let selectedColor = e.target;
                palette.forEach( color => { 
                    color.classList.remove('color-picked');
                    })
                selectedColor.classList.add('color-picked');
                if(e.target.classList.contains('color-picked')){
                    wrapper.dataset.selectedColor = e.target.value;
                }
            })
        })
        pixelBoard.editColors();
        pixelBoard.brush();
        pixelBoard.bucket();
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
            input.setAttribute('type', 'button');
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
                color.setAttribute('type', 'button');
            })
        })
    },

    draw: (e) => {
       // const palette = document.querySelectorAll('.colors');
        const wrapper = document.querySelector(".wrapper-colors");
        const button = e.target.closest(".board__option");
        // let currentColor = wrapper.dataset.selectedColor;
        // palette.forEach( color => {
        //     color.addEventListener('click', (e) => {
        //         let selectedColor = e.target;
        //         palette.forEach( color => {
        //             color.classList.remove('color-picked');
        //             })
        //         selectedColor.classList.add('color-picked');

        //         if(e.target.classList.contains('color-picked')){
        //             currentColor = e.target;
        //         }
        //     })
        // })

        const activeDraw = (e) => {
          if (!e || !button.classList.contains("active")) {
            return;
          }
          if (e.target.tagName === 'TD') {
            e.target.style.backgroundColor = wrapper?.dataset?.selectedColor;
          }
        };
    
        const mouseUpHandler = () => {
          board.removeEventListener('mouseover', activeDraw);
        };
    
        board.addEventListener('mousedown', () => {
          board.addEventListener('mouseover', activeDraw);
        });
    
        board.addEventListener('mouseup', mouseUpHandler);
    },

    brush: () => {
        const brush = document.getElementById('brush');

        brush.addEventListener('click', (e) => {
            //
            brush.classList.toggle("active");
            document.body.style.cursor = "pointer";
            pixelBoard.draw(e);
        })
    },

    bucket: () => {
        const wrapper = document.querySelector(".wrapper-colors");
        const bucketButton = document.getElementById('bucket');

        const bucketFill = (startingCell, targetColor) => {
            const queue = [startingCell];
            const visited = new Set();

            while (queue.length > 0) {
                const currentCell = queue.shift();

                if (visited.has(currentCell)) {
                continue;
                }

                const cellColor = currentCell.style.backgroundColor;
                if (cellColor === targetColor) {
                currentCell.style.backgroundColor = wrapper?.dataset?.selectedColor;

                const row = currentCell.parentNode.rowIndex;
                const column = currentCell.cellIndex;

                const adjacentCells = [
                    [row - 1, column], 
                    [row + 1, column], 
                    [row, column - 1], 
                    [row, column + 1], 
                ];

                adjacentCells.forEach(([r, c]) => {
                    const nextCell = board.rows[r]?.cells[c];
                    if (nextCell && nextCell.style.backgroundColor === cellColor) {
                    queue.push(nextCell);
                    }
                });
                }

                visited.add(currentCell);
            }
        };

        bucketButton.addEventListener('click', () => {
            document.body.style.cursor = "wait";

            const selectedColor = document.querySelector('.color-picked');
            if (selectedColor) {
                currentColor = selectedColor.value;

                board.querySelectorAll('td').forEach((cell) => {
                cell.addEventListener('click', () => {
                    bucketFill(cell, cell.style.backgroundColor);
                });
                });
            }
            });
        },
}

document.addEventListener("DOMContentLoaded", pixelBoard.init());