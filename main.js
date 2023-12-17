const board = document.getElementById('board');

const pixelBoard = {

    init: () => {
        pixelBoard.boardSize(30);
    },

    boardSize: (size) => {
        for(i = 1; i <= size; i++){
            let row = document.createElement('tr');

            for(j = 1; j <= size ; j++){
                let cell = document.createElement('td');
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    },
}

document.addEventListener("DOMContentLoaded", pixelBoard.init());