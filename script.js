const GameBoard = (() => {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    // Rendering the Game Board
    const render = () => {
        // Rendering the Game Board
        let boardHTML = "";
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="${index}">${square}</div>`
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
        // Listening to clicks in Board and trigering event handler
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
        CreatePlayer(document.querySelector('#player1').value, "X"),
        CreatePlayer(document.querySelector('#player2').value, "0")
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
            console.log("Game Over") 
        }
        // GameBoard.render();
    }

    // const Reset = () => {
    //     console.log(GameBoard.gameBoard)
    //     document.querySelector('#gameboard').innerHTML = "";
    //     let boardHTML = "";
    //     document.querySelector('#gameboard').innerHTML = boardHTML;
    //     console.log(GameBoard.gameBoard)
    //     Game.Start();
    // }

    return { Start, handleClick, GameOver, Reset };

})();

document.querySelector('#startgame').addEventListener('click', () => Game.Start());
document.querySelector('#reset').addEventListener('click', () => Game.Reset());