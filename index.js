//shree ganeshay namah

//Step 1 : get all td
let Alltd = document.getElementsByTagName('td');
let winTag = document.getElementsByClassName('win')[0];
//console.log(winTag);


let currentPlayer = 'X';

let gameState = ['','','','','','','','','',''];

let winningCondition = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [4,5,6],
    [7,8,9],
    [7,5,3],
    [2,5,8],
    [3,6,9]
]

function winningState(){
    for(let i = 0;i<winningCondition.length;i++){
        let a = winningCondition[i][0];
        let b = winningCondition[i][1];
        let c = winningCondition[i][2];
        if(gameState[a]!= '' && gameState[b]!='' && gameState[c]!='' && gameState[a]==gameState[b] && gameState[a]==gameState[c]){
            let winner = document.createElement('h1');
            winner.innerHTML = `winner is ${currentPlayer}`;
            winner.className = "winnerClass";
            winTag.append(winner);
            return true;
        }
    }
    return false;
}

//logic to check for draw
function drawState(){
    for(let i = 1;i<gameState.length;i++){
        if(gameState[i]==''){
            return false;
        }
    }
    return true;
}

//logic to change player after every turn
function changePlayer(){
    if(currentPlayer == 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer ='X'
    }
}
//logic when player click on td
function handleClick(){
    console.log(event.target);
    let currentTd = event.target;
    let index = currentTd.id[5];
    //console.log(currentTd.innerHTML);
    if(currentTd.innerHTML == 'X' || currentTd.innerHTML == 'O'){
        //if td is already filled then we dont need to do anything
        console.log("i am already filled");
    }
    else{
        //id td is empty then fill the innerHTML
        currentTd.innerHTML = currentPlayer;
        gameState[index] = currentPlayer;

        //we need to check for winning condition before changing the player
        let winValue = winningState();
        if(winValue){
            //now we have got the winner we need to rmeove event listener
            for(let i = 0;i<9;i++){
                //console.log(Alltd[i]);
                Alltd[i].removeEventListener('click',handleClick);
            }
        }
        isDraw = drawState();
        if( winValue!=true && isDraw==true){
            let draw = document.createElement('h1');
            draw.innerHTML = `Match draw`;
            draw.className = "drawClass";
            winTag.append(draw);
        }

        changePlayer();

    }
    console.log(gameState);
    
}



//add event handle click to all the td's
for(let i = 0;i<9;i++){
    //console.log(Alltd[i]);
    Alltd[i].addEventListener('click',handleClick);
}

