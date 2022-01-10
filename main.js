// give each slot on the board an indivdual row and column grid refence. 
const coinSlots = document.getElementsByClassName('.slot:not(.top)');
const topHiddenSlots = document.getElementsByClassName('.slot .top');
const resetButton = document.getElementsByClassName('.reset');
const statusSpan = document.getElementsByClassName('.status');

//create a list of Arrays to contain each rows individual slots 
// Slot Rows

const row1 = [coinSlots[0], coinSlots[1], coinSlots[2], coinSlots[3], coinSlots[4], coinSlots[5], coinSlots[6]];
const row2 = [coinSlots[7], coinSlots[8], coinSlots[9], coinSlots[10], coinSlots[11], coinSlots[12], coinSlots[13]];
const row3 = [coinSlots[14], coinSlots[15], coinSlots[16], coinSlots[17], coinSlots[18], coinSlots[19], coinSlots[20]];
const row4 = [coinSlots[21], coinSlots[22], coinSlots[23], coinSlots[24], coinSlots[25], coinSlots[26], coinSlots[27]];
const row5 = [coinSlots[28], coinSlots[29], coinSlots[30], coinSlots[31], coinSlots[32], coinSlots[33], coinSlots[34]];
const row6 = [coinSlots[35], coinSlots[36], coinSlots[37], coinSlots[38], coinSlots[39], coinSlots[40], coinSlots[41]];
// topHiddenRow contains dummy slots to show which column coin will fall into. 
const topHiddenRow = [topHiddenSlots[0], topHiddenSlots[1], topHiddenSlots[2], topHiddenSlots[3], topHiddenSlots[4], topHiddenSlots[5], topHiddenSlots[6]];
//array of row arrays
const rows = [row1, row2, row3, row4, row5, row6, topHiddenRow];

//  vice versa for columns. 
// Slot Cols
const column1 = [coinSlots[35], coinSlots[28], coinSlots[21], coinSlots[14], coinSlots[7], coinSlots[0], topHiddenSlots[0]];
const column2 = [coinSlots[36], coinSlots[29], coinSlots[22], coinSlots[15], coinSlots[8], coinSlots[1], topHiddenSlots[1]];
const column3 = [coinSlots[37], coinSlots[30], coinSlots[23], coinSlots[16], coinSlots[9], coinSlots[2], topHiddenSlots[2]];
const column4 = [coinSlots[38], coinSlots[31], coinSlots[24], coinSlots[17], coinSlots[10], coinSlots[3], topHiddenSlots[3]];
const column5 = [coinSlots[39], coinSlots[32], coinSlots[25], coinSlots[18], coinSlots[11], coinSlots[4], topHiddenSlots[4]];
const column6 = [coinSlots[40], coinSlots[33], coinSlots[26], coinSlots[19], coinSlots[12], coinSlots[5], topHiddenSlots[5]];
const column7 = [coinSlots[41], coinSlots[34], coinSlots[27], coinSlots[20], coinSlots[13], coinSlots[6], topHiddenSlots[6]];
// array of column arrays
const columns = [column1, column2, column3, column4, column5, column6, column7];

//gameplay variables
let gameActive = true;
let yellowTurn = true;



//Functions
const getClassListArray = (slot) => {
    const classList = slot.classList;
    return [...classList];
};
const getSlotLocation = (slot) => {
    const classList = getClassListArray(slot);

    const rowClass = classList.find(slotClass => slotClass.includes('row'));
    const colClass = classList.find(slotClass => slotClass.includes('col'));
    const rowIndex = rowClass[4];
    const colIndex = colClass[4] ;  
    const rowNumber = parseInt(rowIndex, 10); 
    const colNumber = parseInt(colIndex, 10);  

    return [rowNumber, colNumber]; //this gives us the column index as an integer, to be used for the coin hover in top hidden row.
};

const getFirstAvailableColumnSlot = (colIndex) => {
const column = columns[colIndex];
const columnNoTopSlot = column.slice(0, 6);

for (const slot of columnNoTopSlot) {
    const classList = getClassListArray(slot);
    if (!classList.includes('yellow') && !classList.includes('red')) {
        return slot;
    }
}
return null;
};
const switchSlotHover = (colIndex) => {
    const topHiddenSlot = topHiddenSlots[colIndex];
        topHiddenSlot.classList.remove(yellowTurn ? 'yellow' : 'red');
};

const getSlotColour = (slot) => {
    const classList = getClassListArray(slot);
    if (classList.includes('yellow')) return 'yellow';
    if (classList.includes('red')) return 'red';
    return null;
};


const checkWinningSlots = (slots) => {
    if(slots.length < 4) return false;

        gameActive = false;
        for (const slot of slots) {
            slot.classList.add('win');
        }
        statusSpan.textContent = `${yellowTurn ? 'yellow' : 'red'} has won!`
       
     return true;
    };
     

// Checking game status to determine if 4 in a row for winner

const checkGameStatus = (slot) => {
     const colour = getSlotColour(slot);
     if (!colour) return 
     const [rowIndex, colIndex] = getSlotLocation(slot);

     //Horizontal check method
 let winningSlots = [slot];
 let rowToCheck = rowIndex;
 let colToCheck = colIndex -1;
 while (colToCheck >= 0) {
     const slotToCheck = rows[rowToCheck][colToCheck]; // this set the slot to check the one cell associated with these two parameters that have previously been assigned memory within their respective arrays. 
    if (getSlotColour(slotToCheck) === colour) {
        winningSlots.push(slotToCheck);
        colToCheck--;
 } else {
     break;
 }
}
colToCheck = colIndex +1;
 while (colToCheck <= 6) {
     const slotToCheck = rows[rowToCheck][colToCheck];
    if (getSlotColour(slotToCheck) === colour) {
        winningSlots.push(slotToCheck);
        colToCheck++;
 } else {
     break;
 }  
}
let  hasConnectedFour = checkWinningSlots(winningSlots);
if (hasConnectedFour) return;

// Vertical Win Check Method
winningSlots = [slot];
rowToCheck = rowIndex -1;  // this checks from bottom to top.
colToCheck = colIndex;
 while (rowToCheck >= 0) {
     const slotToCheck = rows[rowToCheck][colToCheck];
    if (getSlotColour(slotToCheck) === colour) {
        winningSlots.push(slotToCheck);
        rowToCheck--; //-- means to decrement. 
 } else {
     break;
 }
}
rowToCheck = rowIndex +1;
 while (rowToCheck <= 5) {
     const slotToCheck = rows[rowToCheck][colToCheck];
    if (getSlotColour(slotToCheck) === colour) {
        winningSlots.push(slotToCheck);
        rowToCheck++;
 } else {
     break;
 }  
}
hasConnectedFour = checkWinningSlots(winningSlots);
if (hasConnectedFour) return;


//diagonal win check left to right

winningSlots = [slot];
rowToCheck = rowIndex +1;
colToCheck = colIndex -1;
while (colToCheck >= 0 && rowToCheck <= 5){
    const slotToCheck = rows[rowToCheck][colToCheck];
   if (getSlotColour(slotToCheck) === colour) {
       winningSlots.push(slotToCheck);
       rowToCheck++;
       colToCheck--; 
} else {
    break;
  }
}
rowToCheck = rowIndex -1;
colToCheck = colIndex -1;
while (colToCheck <= 6 && rowToCheck >= 0) {
    const slotToCheck = rows[rowToCheck][colToCheck];
   if (getSlotColour(slotToCheck) === colour) {
       winningSlots.push(slotToCheck);
       rowToCheck--;
       colToCheck++;;
} else {
    break;
  }  
}
hasConnectedFour = checkWinningSlots(winningSlots);
if (hasConnectedFour) return;


//diagonal win check right to left 

winningSlots = [slot];
rowToCheck = rowIndex -1;
colToCheck = colIndex -1;
while (colToCheck >= 0 && rowToCheck >= 0){
    const slotToCheck = rows[rowToCheck][colToCheck];
   if (getSlotColour(slotToCheck) === colour) {
       winningSlots.push(slotToCheck);
       rowToCheck--;
       colToCheck--; 
} else {
    break;
  }
}
rowToCheck = rowIndex +1;
colToCheck = colIndex +1;
while (colToCheck <= 6 && rowToCheck <= 5) {
    const slotToCheck = rows[rowToCheck][colToCheck];
   if (getSlotColour(slotToCheck) === colour) {
       winningSlots.push(slotToCheck);
       rowToCheck++;
       colToCheck++;;
} else {
    break;
  }  
}
hasConnectedFour = checkWinningSlots(winningSlots);
if (hasConnectedFour) return;

//Tie check
const rowsWithoutTop = rows.slice(0, 6);
for (const row of rowsWithoutTop) {
    for (const slot of row) {
        const classList = getClassLIstArray(slot);
        if (!classList.includes('yellow') && !classList.includes('red')) {
            return;
        }
    }
}
gameActive = false;
statusSpan.textContent = "Game is a tie!";
};

// Event Handlers

const handleSlotMouseOver = (e) => {
    if (!gameActive) return;
    const slot = e.target;
    const [rowIndex, colIndex] = getSlotLocation(slot);

    const topHiddenSlot = topHiddenSlots[colIndex];
        topHiddenSlot.classList.add(yellowTurn ? 'yellow' : 'red');
    }; 

    const handleSlotMouseOff = (e) => {
        const slot = e.target;
        const [rowIndex, colIndex] = getSlotLocation(slot);
        switchSlotHover(colIndex)
    };


const handleSlotClick = (e) => {
    const slot = e.target;
    const [rowIndex, colIndex] = getSlotLocation(slot);
   
    const availableSlot = getFirstAvailableColumnSlot(colIndex);  // if the cell is full/ includes 'red yellow' then returns null
    if(!availableSlot) return;

    availableSlot.classList.add(yellowTurn ? 'yellow' : 'red');
    checkGameSatus(availableSlot)

    yellowTurn =!yellowTurn; // this will flip the colour of the coin for next players turn, also need to add event handler for flipping the top row hover.  
    switchSlotHover(colIndex);

    if(gameActive) {
    const topHiddenSlot = topHiddenSlots[colIndex];
    topHiddenSlot.classList.add(yellowTurn ? 'yellow' : 'red');
    }
};


// Adding Event Listeners   
    //loop created to loop through array of row arrays
for(const row of rows) {
    for(const slot of row) {
        slot.addEventListener('mouseover', handleSlotMouseOver);
        slot.addEventListener('mouseout', handleSlotMouseOff);
        slot.addEventListener('click', handleSlotClick);
    }
}

resetButton.addEventListener('click', () => {
    for (const row of rows) {
        for (const slot of row) {
            slot.classList.remove('red');
            slot.classList.remove('yellow');
            slot.classList.remove('win');
        }
    }
    gameActive = true;
    yellowTurn = true;
    statusSpan.textContent = '';
} );