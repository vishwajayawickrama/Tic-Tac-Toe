const GameBoard = (() => {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="${index}">${square}</div>`
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        })
    }

    return { render, gameBoard }
})();
const CreatePlayer = (name, mark) => {
    return { name , mark };
}

const Game = (() => {
    let players = []
    let currentPlayerIndex;
    let gameOver;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

    const Start = () => {
       players = [
        CreatePlayer("Player 1" , "X"),
        CreatePlayer("Player 2", "0")
       ];
       currentPlayerIndex = 0;
       gameOver = false;
       GameBoard.render();
    }

    const handleClick = (event) => {
        const squreIndex = parseInt(event.target.id);
        if (currentPlayerIndex == 0) {
            // event.target.innerHTML = "X";
            GameBoard.gameBoard[squreIndex] = "X";
            currentPlayerIndex = 1;
        }
        else if (currentPlayerIndex == 1) {
            // event.target.innerHTML = "0";
            GameBoard.gameBoard[squreIndex] = "0";
            currentPlayerIndex = 0;
        }
        console.log(squreIndex);
        GameBoard.render();

        winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (GameBoard.gameBoard[a] == GameBoard.gameBoard[b] && GameBoard.gameBoard[b] == GameBoard.gameBoard[c]) {
                if (GameBoard.gameBoard[a] == "" || GameBoard.gameBoard[b] == "" || GameBoard.gameBoard[c] =="") {
                    return
                }
                gameOver = true;
                Game.GameOver();
            }
        });
    }

    const GameOver = () => {
        if (gameOver == true) {
            if (currentPlayerIndex == 1) {
                document.querySelector('#winner-loser').innerHTML = `${players[0].name} with ${players[0].mark} is the Winner`;
                console.log("X is the winner");
            } else if (currentPlayerIndex == 0) {
                document.querySelector('#winner-loser').innerHTML = `${players[1].name} with ${players[1].mark} is the Winner`;
                console.log("0 is the winner");
            }
            GameBoard.gameBoard = ["", "", "", "", "", "", "", "", ""];
            console.log("Game Over")
            Game.Start()
        }
        // GameBoard.render();
    }

    return { Start, handleClick, GameOver };

})();

document.querySelector('#startgame').addEventListener('click', () => Game.Start());