const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
};

const gameBoard = (() => {
    const board = ["","","","","","","","",""];

    const getField = (index) => {
        return board[index];
    };

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const reset = () => {
        for(let i=0; i<board.length;i++){
            board[i]="";
        }
    };

    return{ setField, getField , board, reset};
}

)();

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.getElementById("message");
    const board = document.getElementById("gameBoard");
    const resetButton = document.getElementById("resetButton");

    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            if(gameController.getGameOver() || e.target.textContent !== ""){
                return;
            } else {
                e.target.classList.add(gameController.getCurrentPlayerSign());
                swapBoardHoverClass();
                gameController.playRound(parseInt(e.target.getAttribute('data-index')));
            }
        })
    );

    const swapBoardHoverClass = () => {
        board.classList.remove('o');
        board.classList.remove('x');
        if(gameController.getCurrentPlayerSign() === 'x'){
            board.classList.add('o');
        } else {
            board.classList.add('x');
        }
    };

    const setResultMessage = (winner) => {
        if (winner === "Draw"){
            setMessageElement("It's a Draw.")
            console.log(winner);
        } else {
            setMessageElement(`Player ${winner.toUpperCase()} has won.`)
            console.log(winner);
        }
    }

    resetButton.addEventListener('click', (e) => {
        gameBoard.reset();
        gameController.reset();
        fieldElements.forEach((field)=>{
            field.classList.remove('o');
            field.classList.remove('x');
        });
        board.classList.remove('o');
        board.classList.remove('x');
        board.classList.add('x');
        setMessageElement(`Player x's turn.`);
    });

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    }

    return { setResultMessage, setMessageElement, fieldElements }
}
)();

const gameController = (() => {
    const playerX = player("x");
    const player0 = player("o");
    let round = 1;
    let gameOver = false;
    
    const getCurrentPlayerSign = () => {
        return round % 2 === 1? playerX.getSign() : player0.getSign();
    };

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner()){
            displayController.setResultMessage(getCurrentPlayerSign());
            gameOver = true;
            return;
        }

        if(round === 9){
            displayController.setResultMessage("Draw");
            gameOver = true;
            return;
        }
        
        round++;
        displayController.setMessageElement(`Player ${getCurrentPlayerSign().toUpperCase()}'s turn.`)
    };


    const checkWinner = () => {
        const winCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        return winCombinations.some(combination => {
            return combination.every(index => {
                return displayController.fieldElements[index].classList.contains(getCurrentPlayerSign());
                
            })
        })
    };

    const getGameOver = () => {
        return gameOver;
    }

    const reset = () => {
        round = 1;
        gameOver = false;
    }

    return { playRound, getCurrentPlayerSign, getGameOver, reset};
}
)();


 