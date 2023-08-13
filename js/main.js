//Constants

const TICTAC = {
    0: '~',
    1: 'X',
    '-1': 'O'
};



const cells = [...document.querySelectorAll('#board > div')];


const mainframe = document.getElementById('board');

const messageElement = document.getElementById('messageElement');

const playAgainButon = document.querySelector('button');


// State Variables
let board = null;
let turn = null;
let winner = null;
let isTie = null;

//Functions

initialize();



function initialize(){
board = [ 
    [0, 0, 0],  //COL 0
    [0, 0, 0],  //COL 1
    [0, 0, 0]   //COL 2
]
turn = 1;
winner = null;
isTie = null;
render();

};


function render() {
    renderBoard();
    renderMessage();
    renderControls();
};


//This function renders the board 


function renderBoard(){

    board.forEach(function(columnArray, columnIndex){
        columnArray.forEach(function(indexValue, rowIndex){
const divID = `c${columnIndex}r${rowIndex}`;

const divElement = document.getElementById(divID);

divElement.innerText = TICTAC[indexValue];


// divElement.innerText = divID;
        })
    }
    )
};

//This function will display messages

function renderMessage() {

messageElement.innerText = `${TICTAC[turn]}'s Turn`

if (winner !== null){
    messageElement.innerText = `${winner} is the winner!`
};

if (isTie === true){
    messageElement.innerText = 'This game is a tie!';
};

};

function renderControls(){

playAgainButon.style.visibility = winner !== null || isTie ? 'visible' : 'hidden';



};






function placeSymbol(event){

if (winner !== null){
    return;
};

const clickedDiv = event.target;

const divID = clickedDiv.id;
//Converts the second character and the 4th character from the DIV id into an integer, 
//since the div id represents the column and row, this extracts those values straight from the ID
const columnIndex = parseInt(divID.charAt(1));
const rowIndex = parseInt(divID.charAt(3));


//This variable selects one of the three arrays in the board array, which represents the current column we are in.
const oneOfThreeArrays = board[columnIndex];



if (oneOfThreeArrays[rowIndex] === 0) {
    oneOfThreeArrays[rowIndex] = turn;

turn *= -1;


checkWin(board);
isTie = checkTie(board);


};



render();
};



function checkWin(board){

checkVerticalWin(board);
checkHorizontalWin(board);
checkDiagonalWin(board);


};

//This function checks the board array for a vertical win 
function checkVerticalWin(board) {

if
(
board[0][0] + board[0][1] + board[0][2] === 3 ||
board[1][0] + board[1][1] + board[1][2] === 3 ||
board[2][0] + board[2][1] + board[2][2] === 3
){
winner = TICTAC[1];
}else if 
(
board[0][0] + board[0][1] + board[0][2] === -3 ||
board[1][0] + board[1][1] + board[1][2] === -3 ||
board[2][0] + board[2][1] + board[2][2] === -3

){
    winner = TICTAC['-1'];
}
};


//This function checks the board array for a horizontal win
function checkHorizontalWin(board) {
    if
(
board[0][0] + board[1][0] + board[2][0] === 3 ||
board[0][1] + board[1][1] + board[2][1] === 3 ||
board[0][2] + board[1][2] + board[2][2] === 3
){
winner = TICTAC[1];
}else if 
(
    board[0][0] + board[1][0] + board[2][0] === -3 ||
    board[0][1] + board[1][1] + board[2][1] === -3 ||
    board[0][2] + board[1][2] + board[2][2] === -3

){
    winner = TICTAC['-1'];
}

};


function checkDiagonalWin(board){
    if
    (
    board[0][0] + board[1][1] + board[2][2] === 3 ||
    board[0][2] + board[1][1] + board[2][0] === 3
    ){
    winner = TICTAC[1];
    }else if 
    (
        board[0][0] + board[1][1] + board[2][2] === -3 ||
    board[0][2] + board[1][1] + board[2][0] === -3
    
    ){
        winner = TICTAC['-1'];
    }

};

function checkTie(board){

    //loops through the entire array, and inside the arrays arrays, if it finds open spots (that equal 0) it returns false, 
    //if there are no open spots left and the winner is still null, then the tie variable is set to true;
    for (let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if (board[i][j] === 0){
                return false;
            }
        }
    }
    if (winner === null){
        return true;
    };
}



// Event Listeners


mainframe.addEventListener('click', placeSymbol);

playAgainButon.addEventListener('click', initialize);