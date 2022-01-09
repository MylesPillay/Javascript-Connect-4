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



$(document).ready(function() {
    var player = 1;
    var winner = 0;
    var colours = {}; 
    colours[-1] = "red";
    colours[1] = "blue";
    var count = 0;

    $(".slot").each(function() {
        $(this).attribute("id", count);
        $(this).attribute("data-player", 0);
        count++;

        // allow cell to be attirubuted player data. 

        $(this).addEventListener('click', function() {
            if(isValid($(this).attribute("id"))) {
                $(this).css("background-color", colours[player]);
                $(this).attribute("data-player", player);
 
                player *= -1;  // this should change between each player at end of each click
            }
        });
    });

        function isValid(n) {
            var id = parseInt(n);

            if($("#" + id).attribute("data-player") === "0"){
                if(id >= 35){
                    return true;
                }
                //row below+7
                if($("#" + (id +7)).attribute("data-player") !== 0){
                    return true;
                }
            }   
            return false;
        }
    })


/*

// 7 buttons designating which column counter dropped into - so once button clicked only need to add one new object into one array each time. 
//

//add event listener for onclick of the seven buttons to designate a column. 

// need 3 loops for checking wins - 4 in a row. one loop for horizontal, one loop for vertical. one loop for diagonal.

*/