const board = document.getElementById('boardJS');
const resizeButton = document.getElementById('resizeJS');
const deleteDraw = document.getElementById('deleteJS');

const pixelBoard = {

    init: () => {
        pixelBoard.createBoard();
        pixelBoard.changeBoardSize();
        pixelBoard.deleteDraw();
        pixelBoard.randomPalette();
        pixelBoard.colorSelection();
        pixelBoard.editColors();
        pixelBoard.toolSelector();
        pixelBoard.save();
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

    deleteBoard: () => {
        while (board.firstChild) {
        board.removeChild(board.firstChild);
        }
    },

    changeBoardSize: () => {
        const resizeMenu = document.querySelector('.board__modalJS');
        const closeMenu = resizeMenu.querySelector('.closeJS');
        const sizeButton = document.querySelectorAll('.b-sizeJS');
        const container = document.querySelector('.container');

        resizeButton.addEventListener('click', () => {
            resizeMenu.classList.remove('hidden');
            container.style.filter = 'blur(10px)';
        })

        closeMenu.addEventListener('click', () => {
            resizeMenu.classList.add('hidden');
            container.style.filter = 'blur(0px)';
        })

        sizeButton.forEach( btn => {
        btn.addEventListener('click', (e) => {
            let currentBtn = e.target;

            if(currentBtn.id === 'small'){
                pixelBoard.deleteBoard();
                pixelBoard.createBoard(30);
                sizeButton.forEach( btn => {
                    btn.classList.remove('size-selectedJS');
                })
                currentBtn.classList.add('size-selectedJS');
            }else if(currentBtn.id === 'medium'){
                pixelBoard.deleteBoard();
                pixelBoard.createBoard(50, 1.3);
                sizeButton.forEach( btn => {
                    btn.classList.remove('size-selectedJS');
                })
                currentBtn.classList.add('size-selectedJS');
            }else {
                pixelBoard.deleteBoard();
                pixelBoard.createBoard(50, 1.6);
                sizeButton.forEach( btn => {
                    btn.classList.remove('size-selectedJS');
                })
                currentBtn.classList.add('size-selectedJS');
            }
        })
    })
    },

    deleteDraw: () => {
        deleteDraw.addEventListener('click', () => {
            let selectedSize = document.querySelector('.size-selectedJS').id;
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
        let wrapperColor = document.querySelector(".wrapper-colorsJS");
        for(let i = 0; i<numElements; i++){
            let label = document.createElement("label");
            let input = document.createElement("input");
            let img = document.createElement("img");
            img.src = "assets/img/color-border.png";
            img.classList.add('color-border');
            input.classList.add("colorsJS");
            label.appendChild(input);
            label.appendChild(img);
            wrapperColor.appendChild(label);
        }
        const colorInputs = document.querySelectorAll('.colorsJS');

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
        colorInputs[0].classList.add('color-pickedJS');
        const wrapper = document.querySelector(".wrapper-colorsJS");
        let colorPicked = document.querySelector('.color-pickedJS');
        wrapper.dataset.selectedColor = colorPicked.value;
    },

    editColors: () => {
        const wrapperPalette = document.getElementById('palette');
        const editColor = document.getElementById('color-editJS');
        const colorCheck = document.getElementById('color-edit-finishJS');
        let palette = document.querySelectorAll('.colorsJS');

        let colors = [];

        editColor.addEventListener('click', () => {
            colorCheck.classList.remove('hidden');
            editColor.classList.add('hidden');
            wrapperPalette.classList.add('edit-active');

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
            wrapperPalette.classList.remove('edit-active');

            palette.forEach( color => {
                color.setAttribute('type', 'button');
            })
        })
    },

    colorSelection: () => {
        const palette = document.querySelectorAll('.colorsJS');
        const wrapper = document.querySelector(".wrapper-colorsJS");

        palette.forEach( color => {
            color.addEventListener('click', (e) => {
                let selectedColor = e.target;
                palette.forEach( color => { 
                    color.classList.remove('color-pickedJS');
                    })
                selectedColor.classList.add('color-pickedJS');
                if(e.target.classList.contains('color-pickedJS')){
                    wrapper.dataset.selectedColor = e.target.value;
                }
            })
        })
    },

    brush: () => {
        const wrapper = document.querySelector('.wrapper-colorsJS');
        const brush = document.getElementById('brushJS');
        //document.body.style.cursor = "pointer";

        board.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        
            const activeDraw = (e) => {
                if(brush.classList.contains('active-toolJS')){
                if (!e) {
                    return;
                }
                if (e.target.tagName === 'TD') {
                    e.target.style.backgroundColor = wrapper?.dataset?.selectedColor;
                }
            };        
        }
        
            const mouseUpHandler = () => {
                board.removeEventListener('mouseover', activeDraw);
            };
        
            board.addEventListener('mousedown', () => {
                board.addEventListener('mouseover', activeDraw);
            });
        
            board.addEventListener('mouseup', mouseUpHandler);
            board.addEventListener('mouseleave', mouseUpHandler);

    },

    bucket: (cell, color) => {
        const wrapper = document.querySelector(".wrapper-colorsJS");
        const bucket = document.getElementById('bucketJS');

        const bucketFill = (startingCell, targetColor) => {
            if(bucket.classList.contains('active-toolJS')){
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
    }
        bucketFill(cell, color);
    },

    toolSelector: () => {
        const tools = document.getElementById('toolsJS');
        const toolsOptions = tools.querySelectorAll('.board__optionJS');

        toolsOptions.forEach( tool => {
            tool.addEventListener( 'click', () => {
                toolsOptions.forEach( tool => {tool.classList.remove('active-toolJS');});

                if(tool.id === 'bucketJS'){
                    tool.classList.add('active-toolJS');
                    //document.body.style.cursor = "wait";
                    let selectedColor = document.querySelector('.color-pickedJS');

                    if (selectedColor) {
                        currentColor = selectedColor.value;
                        board.querySelectorAll('td').forEach((cell) => {
                        cell.addEventListener('click', () => {
                            pixelBoard.bucket(cell, cell.style.backgroundColor);
                        });
                        });
                    }
                }
                if(tool.id === 'brushJS'){
                    tool.classList.add('active-toolJS');
                    pixelBoard.brush();
                }
            })
        })
    },

    save: () => {
        const board = document.getElementById('boardJS');
        const saveButton = document.getElementById('saveJS');

        function saveTableAsImage() {
            html2canvas(board).then(function(canvas) {
                const imageData = canvas.toDataURL('image/png');

                const link = document.createElement('a');
                link.href = imageData;
                link.download = 'my-pixelart.png';
                link.click();
            });
        }

        saveButton.addEventListener('click', saveTableAsImage);
    }
}

document.addEventListener("DOMContentLoaded", pixelBoard.init());