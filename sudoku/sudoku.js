let board = new Array(81);
let columns = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
let rows = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
let squares = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
let isSolved = false;
let tiles = Array.from(document.querySelectorAll('.sudoku-board input'));

function getSquare(row, col) {
    if (row < 3) {
        if (col < 3) return 1;
        else if (col < 6) return 2;
        else return 3;
    } else if (row < 6) {
        if (col < 3) return 4;
        else if (col < 6) return 5;
        else return 6;
    } else {
        if (col < 3) return 7;
        else if (col < 6) return 8;
        else return 9;
    }
} // getSquare()

function nineRandomTiles() {
    let numbers = [1,2,3,4,5,6,7,8,9];
    let possible_rows = [1,2,3,4,5,6,7,8,9];

    for (let i = 0; i < possible_rows.length; ++i) {
        let num = Math.floor(Math.random() * numbers.length);
        let column = Math.floor(Math.random() * 9);
        let row = i;

        // assign the number
        board[row * 9 + column] = numbers[num];
        // update tables
        columns[column][numbers[num]] = numbers[num];
        rows[row][numbers[num]] = numbers[num];
        squares[getSquare(row, column) - 1][numbers[num]] = numbers[num];
        // delete the number
        numbers.splice(num, 1);
    }
} // nineRandomTiles()

function insertKey(row, col, value) {
    let square = getSquare(row, col) - 1;

    rows[row][value] = value;
    columns[col][value] = value;
    squares[square][value] = value;
} // insertKey()

function deleteKey(row, col, value) {
    let square = getSquare(row, col) - 1;

    delete rows[row][value];
    delete columns[col][value];
    delete squares[square][value];
} // insertKey()

function getSquares(row, col) {
    if (row < 3) {
        if (col < 3) return [0, 1, 2, 9, 10, 11, 18, 19, 20];
        else if (col < 6) return [3, 4, 5, 12, 13, 14, 21, 22, 23];
        else return [6, 7, 8, 15, 16, 17, 24, 25, 26];
    } else if (row < 6) {
        if (col < 3) return [27,28,29,36,37,38,45,46,47];
        else if (col < 6) return [30,31,32,39,40,41,48,49,50];
        else return [33,34,35,42,43,44,51,52,53];
    } else {
        if (col < 3) return [54,55,56,63,64,65,72,73,74];
        else if (col < 6) return [57,58,59,66,67,68,75,76,77];
        else return [60,61,62,69,70,71,78,79,80];
    }
} // getSquares()

function isValid(row, col, value) {
    // let idx = (row * 9) + col;
    // let s = getSquares(row, col);

    // for (let r = Math.floor(idx / 9) * 9; r < ((Math.floor(idx / 9) * 9) + 9); ++r) {
    //     if (board[r] == value) {
    //         return false;
    //     }
    // }
    // for (let c = col; c < 81; col += 9) {
    //     if (board[c] == value) {
    //         return false;
    //     }
    // }
    // for (let i = 0; i < 9; ++i) {
    //     if (board[s[i]] == value) {
    //         return false;
    //     }
    // }
    // return true;

    let s = getSquare(row, col) - 1;

    if (!(value in rows[row]) && !(value in columns[col]) && !(value in squares[s])) {
        return true;
    }
    return false;
} // isValid()

function backtrack(row, col) {
    // base case
    if (row > 8) {
        isSolved = true;
        return;
    }

    let index = (row * 9) + (col);
    if (board[index] != '.') {
        if (col == 8) {
            backtrack(row + 1, 0);
        } else {
            backtrack(row, col + 1);
        }
    } else {
        for (let i = 1; i < 10; ++i) {
            if (isValid(row, col, i)) {
                // insert value into tables
                board[index] = i;
                insertKey(row, col, i);

                // backtrack
                if (col == 8) {
                    backtrack(row + 1, 0);
                } else {
                    backtrack(row, col + 1);
                }

                // delete inserted values in table
                if (!isSolved) {
                    board[index] = '.';
                    deleteKey(row, col, i);
                }
            }
        } // for
    }
} // backtrack()

function fillBoard() {
    let i = 0;
    tiles.forEach((element) => {
        console.log(element);
        element.setAttribute("placeholder", board[i]);
        ++i;
    });
} // fillBoard()

function coverTiles() {
    let cover = [];
    for (let i = 0; i < 30; ++i) {
        let tile = Math.floor(Math.random() * 82);
        while (cover.indexOf(tile) != -1) {
            tile = Math.floor(Math.random() * 82);
        } // while
        cover.push(tile);
    } // for

    for (let i = 0; i < 81; ++i) {
        if (cover.indexOf(i) != -1) {
            tiles[i].readOnly = true;
        } 
        else {
            tiles[i].setAttribute("placeholder", "");
        }
    }
}

function genBoard() {
    // fill board with default value
    board.fill('.', 0);
    // generate first 9 random tiles
    nineRandomTiles();
    console.log(rows);
    console.log(columns);
    // fill in the rest of the board
    backtrack(0, 0);
    // fill board
    fillBoard();
    coverTiles();
}

genBoard();
// $(".main-body").click(function() {
//     genBoard();
// })

