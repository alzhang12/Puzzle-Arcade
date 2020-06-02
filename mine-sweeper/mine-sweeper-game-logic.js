// ------------------------------- //
// ----- Mine Sweeper Logic ------ //
// ------------------------------- //
function genMines(numMines, start, numTiles) {
    let mine_tiles = [];
    while (mine_tiles.length < numMines) {
        let random = Math.floor(Math.random() * numTiles);
        if (mine_tiles.indexOf(random) === -1 && random != start) {
            mine_tiles.push(random);
        }
    }
    return mine_tiles;
}

function hasWon() {
    for (let i = 0; i < visitedTiles.length; ++i) {
        if (visitedTiles[i] == undefined) {
            return false;
        }
    }
    return true;
}

function setTiles(board_size) {
    let adjMines = 0;
    let tiles_per_row = 10;
    let num_rows = 10;

    if (board_size == 256) {
        tiles_per_row = 16;
        num_rows = 16;
    }
    if (board_size == 512) {
        tiles_per_row = 32;
        num_rows = 16;
    }

    for (let i = 0; i < board.length; ++i) {
        if (board[i] != "mine") {
            // left column
            if (i % tiles_per_row == 0) {
                // upper left corner
                if (i == 0) {
                    let adjMines = 0;
                    if (board[i + 1] == "mine") ++adjMines;
                    if (board[i + tiles_per_row + 1] == "mine") ++adjMines;
                    if (board[i + tiles_per_row] == "mine") ++adjMines;
        
                    if (adjMines != 0) board[i] = adjMines;
                    else board[i] = "empty";
                }
                // lower left corner
                else if (i == ((num_rows - 1) * tiles_per_row)) {
                    let adjMines = 0;
                    if (board[i + 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row + 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row] == "mine") ++adjMines;

                    if (adjMines != 0) board[i] = adjMines;
                    else board[i] = "empty";
                }
                else {
                    let adjMines = 0;
                    if (board[i + 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row + 1] == "mine") ++adjMines;
                    if (board[i + tiles_per_row + 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row] == "mine") ++adjMines;
                    if (board[i + tiles_per_row] == "mine") ++adjMines;

                    if (adjMines != 0) board[i] = adjMines;
                    else board[i] = "empty";
                }
            }
            // right column
            else if (i % tiles_per_row == (tiles_per_row - 1)) {
                if (i == (tiles_per_row - 1)) {
                    let adjMines = 0;
                    if (board[i - 1] == "mine") ++adjMines;
                    if (board[i + tiles_per_row - 1] == "mine") ++adjMines;
                    if (board[i + tiles_per_row] == "mine") ++adjMines;

                    if (adjMines != 0) board[i] = adjMines;
                    else board[i] = "empty";
                }
                else if (i == (board_size - 1)) {
                    let adjMines = 0;
                    if (board[i - 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row + 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row] == "mine") ++adjMines;

                    if (adjMines != 0) board[i] = adjMines;
                    else board[i] = "empty";
                }
                else {
                    let adjMines = 0;
                    if (board[i - 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row - 1] == "mine") ++adjMines;
                    if (board[i + tiles_per_row - 1] == "mine") ++adjMines;
                    if (board[i - tiles_per_row] == "mine") ++adjMines;
                    if (board[i + tiles_per_row] == "mine") ++adjMines;

                    if (adjMines != 0) board[i] = adjMines;
                    else board[i] = "empty";    
                }
            }
            // top row
            else if (Math.floor(i / tiles_per_row) == 0) {
                let adjMines = 0;
                if (board[i - 1] == "mine") ++adjMines;
                if (board[i + 1] == "mine") ++adjMines;
                if (board[i + tiles_per_row] == "mine") ++adjMines;
                if (board[i + tiles_per_row + 1] == "mine") ++adjMines;
                if (board[i + tiles_per_row - 1] == "mine") ++adjMines;

                if (adjMines != 0) board[i] = adjMines;
                else board[i] = "empty";    
            }
            // bottom row
            else if (Math.floor(i / tiles_per_row) == (num_rows - 1)) {
                let adjMines = 0;
                if (board[i - 1] == "mine") ++adjMines;
                if (board[i + 1] == "mine") ++adjMines;
                if (board[i - tiles_per_row] == "mine") ++adjMines;
                if (board[i - tiles_per_row + 1] == "mine") ++adjMines;
                if (board[i - tiles_per_row - 1] == "mine") ++adjMines;

                if (adjMines != 0) board[i] = adjMines;
                else board[i] = "empty";   
            }
            // middle
            else {
                let adjMines = 0;
                if (board[i - 1] == "mine") ++adjMines;
                if (board[i + 1] == "mine") ++adjMines;
                if (board[i - tiles_per_row] == "mine") ++adjMines;
                if (board[i - tiles_per_row + 1] == "mine") ++adjMines;
                if (board[i - tiles_per_row - 1] == "mine") ++adjMines;
                if (board[i + tiles_per_row] == "mine") ++adjMines;
                if (board[i + tiles_per_row + 1] == "mine") ++adjMines;
                if (board[i + tiles_per_row - 1] == "mine") ++adjMines;

                if (adjMines != 0) board[i] = adjMines;
                else board[i] = "empty";   
            }
        }
    } // for()
}

function revealTiles(start, board_size) {
    let q = [];
    // push starting tile
    q.push(start);

    // visited status
    let memo = new Array(board_size);

    let tiles_per_row = 10;
    if (board_size == 256) tiles_per_row = 16;
    if (board_size == 512) tiles_per_row = 32;

    let num_columns = 10;
    if (board_size == 256 || board_size == 512) num_columns = 16; 
    
     // search
     while (!q.length == 0) {
        // pop top
        let c = q.shift();

        // add to visited tiles
        visitedTiles[c] = "visited";

        // reveal the tile 
        if (board[c] != "empty") {
            $(square[c]).html(board[c]);
            $(square[c]).css("border", "1px grey solid");

            if (board[c] == 1) $(square[c]).css("color", "blue");
            else if (board[c] == 2) $(square[c]).css("color", "green");
            else if (board[c] == 3) $(square[c]).css("color", "red");
            else if (board[c] == 4) $(square[c]).css("color", "purple");
            else if (board[c] == 5) $(square[c]).css("color", "maroon");
            else if (board[c] == 6) $(square[c]).css("color", "turqoise");
            else if (board[c] == 7) $(square[c]).css("color", "black");
            else $(square[c]).css("color", "gray");
        } else {
            $(square[c]).css("border", "1px grey solid");
        }
        
        // add adjacent tiles
        if (board[c] == "empty") {
            if (c % tiles_per_row == 0) {
                if (c == 0) {
                    if (board[c + 1] != "mine" && memo[c + 1] == undefined) {
                        memo[c + 1] = "visited";
                        q.push(c + 1);
                    }
                    if (board[c + tiles_per_row] != "mine" && memo[c + tiles_per_row] == undefined) {
                        memo[c + tiles_per_row] = "visited";
                        q.push(c + tiles_per_row);
                    }
                    if (board[c + tiles_per_row + 1] != "mine" && memo[c + tiles_per_row + 1] == undefined) {
                        memo[c + tiles_per_row + 1] = "visited";
                        q.push(c + tiles_per_row + 1);
                    }
                } // top left corner
                else if (c == ((num_columns - 1) * tiles_per_row)) {
                    if (board[c + 1] != "mine" && memo[c + 1] == undefined) {
                        memo[c + 1] = "visited";
                        q.push(c + 1);
                    }
                    if (board[c - tiles_per_row] != "mine" && memo[c - tiles_per_row] == undefined) {
                        memo[c - tiles_per_row] = "visited";
                        q.push(c - tiles_per_row);
                    }
                    if (board[c - tiles_per_row + 1] != "mine" && memo[c - tiles_per_row + 1] == undefined) {
                        memo[c - tiles_per_row + 1] = "visited";
                        q.push(c - tiles_per_row + 1);
                    }
                } // bottom left corner
                else {
                    if (board[c + 1] != "mine" && memo[c + 1] == undefined) {
                        memo[c + 1] = "visited";
                        q.push(c + 1);
                    }
                    if (board[c - tiles_per_row] != "mine" && memo[c - tiles_per_row] == undefined) {
                        memo[c - tiles_per_row] = "visited";
                        q.push(c - tiles_per_row);
                    }
                    if (board[c - tiles_per_row + 1] != "mine" && memo[c - tiles_per_row + 1] == undefined) {
                        memo[c - tiles_per_row + 1] = "visited";
                        q.push(c - tiles_per_row + 1);
                    }
                    if (board[c + tiles_per_row] != "mine" && memo[c + tiles_per_row] == undefined) {
                        memo[c + tiles_per_row] = "visited";
                        q.push(c + tiles_per_row);
                    }
                    if (board[c + tiles_per_row + 1] != "mine" && memo[c + tiles_per_row + 1] == undefined) {
                        memo[c + tiles_per_row + 1] = "visited";
                        q.push(c + tiles_per_row + 1);
                    }
                } 
            } // if ... left column
            else if (c % tiles_per_row == (tiles_per_row - 1)) {
                if (c == (tiles_per_row - 1)) {
                    if (board[c - 1] != "mine" && memo[c - 1] == undefined) {
                        memo[c - 1] = "visited";
                        q.push(c - 1);
                    }
                    if (board[c + tiles_per_row] != "mine" && memo[c + tiles_per_row] == undefined) {
                        memo[c + tiles_per_row] = "visited";
                        q.push(c + tiles_per_row);
                    }
                    if (board[c + tiles_per_row - 1] != "mine" && memo[c + tiles_per_row - 1] == undefined) {
                        memo[c + tiles_per_row - 1] = "visited";
                        q.push(c + tiles_per_row - 1);
                    }
                } // top right corner
                else if (c == (board_size - 1)) {
                    if (board[c - 1] != "mine" && memo[c - 1] == undefined) {
                        memo[c - 1] = "visited";
                        q.push(c - 1);
                    }
                    if (board[c - tiles_per_row] != "mine" && memo[c - tiles_per_row] == undefined) {
                        memo[c - tiles_per_row] = "visited";
                        q.push(c - tiles_per_row);
                    }
                    if (board[c - tiles_per_row - 1] != "mine" && memo[c - tiles_per_row - 1] == undefined) {
                        memo[c - tiles_per_row - 1] = "visited";
                        q.push(c - tiles_per_row - 1);
                    } 
                } // bottom right corner
                else {
                    if (board[c - 1] != "mine" && memo[c - 1] == undefined) {
                        memo[c - 1] = "visited";
                        q.push(c - 1);
                    }
                    if (board[c - tiles_per_row] != "mine" && memo[c - tiles_per_row] == undefined) {
                        memo[c - tiles_per_row] = "visited";
                        q.push(c - tiles_per_row);
                    }
                    if (board[c - tiles_per_row - 1] != "mine" && memo[c - tiles_per_row - 1] == undefined) {
                        memo[c - tiles_per_row - 1] = "visited";
                        q.push(c - tiles_per_row - 1);
                    }
                    if (board[c + tiles_per_row] != "mine" && memo[c + tiles_per_row] == undefined) {
                        memo[c + tiles_per_row] = "visited";
                        q.push(c + tiles_per_row);
                    }
                    if (board[c + tiles_per_row - 1] != "mine" && memo[c + tiles_per_row - 1] == undefined) {
                        memo[c + tiles_per_row - 1] = "visited";
                        q.push(c + tiles_per_row - 1);
                    }
                }
            } // if ... right column
            else if (Math.floor(c / tiles_per_row) == 0) {
                if (board[c + 1] != "mine" && memo[c + 1] == undefined) {
                    memo[c + 1] = "visited";
                    q.push(c + 1);
                }
                if (board[c - 1] != "mine" && memo[c - 1] == undefined) {
                    memo[c - 1] = "visited";
                    q.push(c - 1);
                }
                if (board[c + tiles_per_row + 1] != "mine" && memo[c + tiles_per_row + 1] == undefined) {
                    memo[c + tiles_per_row + 1] = "visited";
                    q.push(c + tiles_per_row + 1);
                }
                if (board[c + tiles_per_row] != "mine" && memo[c + tiles_per_row] == undefined) {
                    memo[c + tiles_per_row] = "visited";
                    q.push(c + tiles_per_row);
                }
                if (board[c + tiles_per_row - 1] != "mine" && memo[c + tiles_per_row - 1] == undefined) {
                    memo[c + tiles_per_row - 1] = "visited";
                    q.push(c + tiles_per_row - 1);
                }
            } // if ... top row
            else if (Math.floor(c / tiles_per_row) == (tiles_per_row - 1)) {
                if (board[c - 1] != "mine" && memo[c - 1] == undefined) {
                    memo[c - 1] = "visited";
                    q.push(c - 1);
                }
                if (board[c - tiles_per_row] != "mine" && memo[c - tiles_per_row] == undefined) {
                    memo[c - 10] = "visited";
                    q.push(c - tiles_per_row);
                }
                if (board[c - tiles_per_row - 1] != "mine" && memo[c - tiles_per_row - 1] == undefined) {
                    memo[c - tiles_per_row - 1] = "visited";
                    q.push(c - tiles_per_row - 1);
                }
                if (board[c + 1] != "mine" && memo[c + 1] == undefined) {
                    memo[c + 1] = "visited";
                    q.push(c + 1);
                }
                if (board[c - tiles_per_row + 1] != "mine" && memo[c - tiles_per_row + 1] == undefined) {
                    memo[c - tiles_per_row + 1] = "visited";
                    q.push(c - tiles_per_row + 1);
                }
            } // if ... bottom row
            else {
                // right
                if (board[c + 1] != "mine" && memo[c + 1] == undefined) {
                    memo[c + 1] = "visited";
                    q.push(c + 1);
                }
                // left
                if (board[c - 1] != "mine" && memo[c - 1] == undefined) {
                    memo[c - 1] = "visited";
                    q.push(c - 1);
                }
                // lower right corner
                if (board[c + tiles_per_row + 1] != "mine" && memo[c + tiles_per_row + 1] == undefined) {
                    memo[c + tiles_per_row + 1] = "visited";
                    q.push(c + tiles_per_row + 1);
                }
                // below
                if (board[c + tiles_per_row] != "mine" && memo[c + tiles_per_row] == undefined) {
                    memo[c + tiles_per_row] = "visited";
                    q.push(c + tiles_per_row);
                }
                // lower left corner
                if (board[c + tiles_per_row - 1] != "mine" && memo[c + tiles_per_row - 1] == undefined) {
                    memo[c + tiles_per_row - 1] = "visited";
                    q.push(c + tiles_per_row - 1);
                }
                // upper right corner
                if (board[c - tiles_per_row + 1] != "mine" && memo[c - tiles_per_row + 1] == undefined) {
                    memo[c - tiles_per_row + 1] = "visited";
                    q.push(c - tiles_per_row + 1);
                }
                if (board[c - tiles_per_row - 1] != "mine" && memo[c - tiles_per_row - 1] == undefined) {
                    memo[c - tiles_per_row - 1] = "visited";
                    q.push(c - tiles_per_row - 1);
                }
                if (board[c - tiles_per_row] != "mine" && memo[c - tiles_per_row] == undefined) {
                    memo[c - tiles_per_row] = "visited";
                    q.push(c - tiles_per_row);
                }
            } // else ... in middle
        } // if ... empty tile
    } // while ... bfs
}

function revealTiles_Easy(start) {
    revealTiles(start, 100);
}

function revealTiles_Medium(start) {
    revealTiles(start, 256);
}

function revealTiles_Hard(start) {
    revealTiles(start, 512);
}

// ------------------------------------ //
// --------- Board Difficulty --------- //
// ------------------------------------ //
let board;
// (key, value) => (table_position, div<class="tile">)
let square;
let mines;
let visitedTiles;
// game logic booleans
let firstClick = false;
let gameEnded = false;
let gameInProgress = false;

// easy mode
$("#easy-mode").click(function() {
    // make easy board appear
    $(".easy-board").show();

    // disappear the other two 
    $(".medium-board").hide();
    $(".hard-board").hide();

    // convert the tiles to an array
    square = Array.from(document.querySelectorAll('.easy-board div'));
})

// medium mode
$("#medium-mode").click(function() {
    // make easy board appear
    $(".medium-board").show();

    // disappear the other two 
    $(".easy-board").hide();
    $(".hard-board").hide();

    square = Array.from(document.querySelectorAll('.medium-board div'));
})

// hard mode
$("#hard-mode").click(function() {
    // make easy board appear
    $(".hard-board").show();

    // disappear the other two 
    $(".medium-board").hide();
    $(".easy-board").hide();

    square = Array.from(document.querySelectorAll('.hard-board div'));
})

// restart game
$(".quit-game").hover(function() {
    $(".quit-game").css("background-color", "black");
}, function() {
    $(".quit-game").css("background-color", "#201F1F");
})
$(".quit-game").click(function() {
    // clear the timer 
    clearInterval(x);
    $(".clock-time").html("0");
    for (let i = 0; i < square.length; ++i) {
        // set all squares to nothing
        $(square[i]).html("");
        // set the styles
        $(square[i]).css("border-left", "3px #FFFFFF solid");
        $(square[i]).css("border-top", "3px #FFFFFF solid");
        $(square[i]).css("border-right", "3px #7B7B7B solid");
        $(square[i]).css("border-bottom", "3px #7B7B7B solid");
        // reset colors
        $(square[i]).css("color", "black");
    }
    // reset firstClick
    firstClick = false;
    gameInProgress = false;
})

// setInterval() variable
let x;
$(".tile").click(function() {
    if (!firstClick && !gameInProgress) {
        // set firstClick to true
        firstClick = true;
        gameInProgress = true;
        gameEnded = false;

        // initialize the board
        board = new Array(100);

        // get the position of the clicked tile
        let tile = square.indexOf(this);

        // set visited tiles
        visitedTiles = new Array(100);

        // set the mines
        mines = genMines(10, tile, 99);
        for (let i = 0; i < mines.length; ++i) {
            board[mines[i]] = "mine";
            visitedTiles[mines[i]] = "mine";
        }

        // set tiles
        setTiles(100);

        // show adjacent empty tiles
        revealTiles_Easy(tile);

        // start timer
        let start = new Date();
        if (x != undefined) {
            clearInterval(x);
        }
        x = setInterval(function() {
            let current = new Date();
            $(".clock-time").html(Math.floor((current - start) / 1000));
        }, 1000);

        $(this).css("border", "1px grey solid");
    }
    else {
        if (!gameEnded) {
            // Regular Move
            if (board[square.indexOf(this)] == "mine") {
                $(this).html("M");
                // stop timer
                clearInterval(x);
                // reveal other mines
                for (let i = 0; i < mines.length; ++i) {
                    // $(square[mines[i]]).css("border", "1px grey solid");
                    $(square[mines[i]]).html("M");
                }
                // reset game
                gameEnded = true;
            }
            else {
                if (board[square.indexOf(this)] != "empty") {
                    visitedTiles[square.indexOf(this)] = "visited";
                    $(this).html(board[square.indexOf(this)]);

                    $(this).css("border", "1px gray solid");
                    // color
                    if (board[square.indexOf(this)] == 1) $(this).css("color", "blue");
                    else if (board[square.indexOf(this)] == 2) $(this).css("color", "green");
                    else if (board[square.indexOf(this)] == 3) $(this).css("color", "red");
                    else if (board[square.indexOf(this)] == 4) $(this).css("color", "purple");
                    else if (board[square.indexOf(this)] == 5) $(this).css("color", "maroon");
                    else if (board[square.indexOf(this)] == 6) $(this).css("color", "turqoise");
                    else if (board[square.indexOf(this)] == 7) $(this).css("color", "black");
                    else $(this).css("color", "gray");
                }
                else {
                    // bfs for adjacent empty tiles
                    console.log(board[square.indexOf(this)]);
                    revealTiles_Easy(square.indexOf(this));
                }

                let count = 0;
                for (let i = 0; i < visitedTiles.length; ++i) {
                    if (visitedTiles[i] == undefined) {
                        ++count;
                    }
                }
                console.log("Number of Unvisited Tiles is: " + count);

                let winStatus = hasWon();
                console.log(visitedTiles);
                if (winStatus == true) {
                    gameEnded = true;
                    alert("You win!");
                }
            }
        }
    }
});

$(".medium-tile").click(function() {
    if (!firstClick && !gameInProgress) {
        // set firstClick to true
        firstClick = true;
        gameInProgress = true;
        gameEnded = false;

        // initialize the board
        board = new Array(256);

        // get the position of the clicked tile
        let tile = square.indexOf(this);

        // set visited tiles
        visitedTiles = new Array(256);

        // set the mines
        mines = genMines(40, tile, 255);
        for (let i = 0; i < mines.length; ++i) {
            board[mines[i]] = "mine";
            visitedTiles[mines[i]] = "mine";
        }

        // set tiles
        setTiles(256);

        console.log(board);

        // show adjacent empty tiles
        revealTiles_Medium(tile);

        // start timer
        let start = new Date();
        if (x != undefined) {
            clearInterval(x);
        }
        x = setInterval(function() {
            let current = new Date();
            $(".clock-time").html(Math.floor((current - start) / 1000));
        }, 1000);

        $(this).css("border", "1px grey solid");
    }
    else {
        if (!gameEnded) {
            // Regular Move
            if (board[square.indexOf(this)] == "mine") {
                $(this).html("M");
                // stop timer
                clearInterval(x);
                // reveal other mines
                for (let i = 0; i < mines.length; ++i) {
                    // $(square[mines[i]]).css("border", "1px grey solid");
                    $(square[mines[i]]).html("M");
                }
                // reset game
                gameEnded = true;
            }
            else {
                if (board[square.indexOf(this)] != "empty") {
                    visitedTiles[square.indexOf(this)] = "visited";
                    $(this).html(board[square.indexOf(this)]);

                    $(this).css("border", "1px gray solid");
                    // color
                    if (board[square.indexOf(this)] == 1) $(this).css("color", "blue");
                    else if (board[square.indexOf(this)] == 2) $(this).css("color", "green");
                    else if (board[square.indexOf(this)] == 3) $(this).css("color", "red");
                    else if (board[square.indexOf(this)] == 4) $(this).css("color", "purple");
                    else if (board[square.indexOf(this)] == 5) $(this).css("color", "maroon");
                    else if (board[square.indexOf(this)] == 6) $(this).css("color", "turqoise");
                    else if (board[square.indexOf(this)] == 7) $(this).css("color", "black");
                    else $(this).css("color", "gray");
                }
                else {
                    // bfs for adjacent empty tiles
                    console.log(board[square.indexOf(this)]);
                    revealTiles_Medium(square.indexOf(this));
                }

                let count = 0;
                for (let i = 0; i < visitedTiles.length; ++i) {
                    if (visitedTiles[i] == undefined) {
                        ++count;
                    }
                }
                console.log("Number of Unvisited Tiles is: " + count);

                let winStatus = hasWon();
                if (winStatus == true) {
                    gameEnded = true;
                    alert("You win!");
                }
            }
        }
    }
});

$(".hard-tile").click(function() {
    if (!firstClick && !gameInProgress) {
        // set firstClick to true
        firstClick = true;
        gameInProgress = true;
        gameEnded = false;

        // initialize the board
        board = new Array(512);

        // get the position of the clicked tile
        let tile = square.indexOf(this);

        // set visited tiles
        visitedTiles = new Array(512);

        // set the mines
        mines = genMines(100, tile, 511);
        for (let i = 0; i < mines.length; ++i) {
            board[mines[i]] = "mine";
            visitedTiles[mines[i]] = "mine";
        }

        // set tiles
        setTiles(512);

        console.log(board);

        // show adjacent empty tiles
        revealTiles_Hard(tile);

        // start timer
        let start = new Date();
        if (x != undefined) {
            clearInterval(x);
        }
        x = setInterval(function() {
            let current = new Date();
            $(".clock-time").html(Math.floor((current - start) / 1000));
        }, 1000);

        $(this).css("border", "1px grey solid");
    }
    else {
        if (!gameEnded) {
            // Regular Move
            if (board[square.indexOf(this)] == "mine") {
                $(this).html("M");
                // stop timer
                clearInterval(x);
                // reveal other mines
                for (let i = 0; i < mines.length; ++i) {
                    // $(square[mines[i]]).css("border", "1px grey solid");
                    $(square[mines[i]]).html("M");
                }
                // reset game
                gameEnded = true;
            }
            else {
                if (board[square.indexOf(this)] != "empty") {
                    visitedTiles[square.indexOf(this)] = "visited";
                    $(this).html(board[square.indexOf(this)]);

                    $(this).css("border", "1px gray solid");
                    // color
                    if (board[square.indexOf(this)] == 1) $(this).css("color", "blue");
                    else if (board[square.indexOf(this)] == 2) $(this).css("color", "green");
                    else if (board[square.indexOf(this)] == 3) $(this).css("color", "red");
                    else if (board[square.indexOf(this)] == 4) $(this).css("color", "purple");
                    else if (board[square.indexOf(this)] == 5) $(this).css("color", "maroon");
                    else if (board[square.indexOf(this)] == 6) $(this).css("color", "turqoise");
                    else if (board[square.indexOf(this)] == 7) $(this).css("color", "black");
                    else $(this).css("color", "gray");
                }
                else {
                    // bfs for adjacent empty tiles
                    console.log(board[square.indexOf(this)]);
                    revealTiles_Hard(square.indexOf(this));
                }

                let count = 0;
                for (let i = 0; i < visitedTiles.length; ++i) {
                    if (visitedTiles[i] == undefined) {
                        ++count;
                    }
                }
                console.log("Number of Unvisited Tiles is: " + count);

                let winStatus = hasWon();
                if (winStatus == true) {
                    gameEnded = true;
                    alert("You win!");
                }
            }
        }
    }
});
