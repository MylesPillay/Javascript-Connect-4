var coinSlots = document.getElementsByClassName('.slot');

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