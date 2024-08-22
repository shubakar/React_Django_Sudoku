import axios from "axios";

class Sudoku {

    // Constructor
    constructor(N, K) {
        this.N = N;
        this.K = K;

        // Compute square root of N
        const SRNd = Math.sqrt(N);
        this.SRN = Math.floor(SRNd);

        // Initialize all entries as false to indicate
        // that there are no edges initially
        this.mat = Array.from({
            length: N
        }, () => Array.from({
            length: N
        }, () => 0));
    }

    // Sudoku Generator
    fillValues() {
        // Fill the diagonal of SRN x SRN matrices
        this.fillDiagonal();

        // Fill remaining blocks
        this.fillRemaining(0, this.SRN);

        // Remove Randomly K digits to make game
        this.removeKDigits();
    }

    // Fill the diagonal SRN number of SRN x SRN matrices
    fillDiagonal() {
        for (let i = 0; i < this.N; i += this.SRN) {
            // for diagonal box, start coordinates->i==j
            this.fillBox(i, i);
        }
    }

    // Returns false if given 3 x 3 block contains num.
    unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // Fill a 3 x 3 matrix.
    fillBox(row, col) {
        let num = 0;
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                while (true) {
                    num = this.randomGenerator(this.N);
                    if (this.unUsedInBox(row, col, num)) {
                        break;
                    }
                }
                this.mat[row + i][col + j] = num;
            }
        }
    }

    // Random generator
    randomGenerator(num) {
        return Math.floor(Math.random() * num + 1);
    }

    // Check if safe to put in cell
    checkIfSafe(i, j, num) {
        return (
            this.unUsedInRow(i, num) &&
            this.unUsedInCol(j, num) &&
            this.unUsedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
        );
    }

    // check in the row for existence
    unUsedInRow(i, num) {
        for (let j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    // check in the row for existence
    unUsedInCol(j, num) {
        for (let i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    // A recursive function to fill remaining
    // matrix
    fillRemaining(i, j) {
        // Check if we have reached the end of the matrix
        if (i === this.N - 1 && j === this.N) {
            return true;
        }

        // Move to the next row if we have reached the end of the current row
        if (j === this.N) {
            i += 1;
            j = 0;
        }


        // Skip cells that are already filled
        if (this.mat[i][j] !== 0) {
            return this.fillRemaining(i, j + 1);
        }

        // Try filling the current cell with a valid value
        for (let num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                    return true;
                }
                this.mat[i][j] = 0;
            }
        }

        // No valid value was found, so backtrack
        return false;
    }

    // Print sudoku
    printSudoku() {
        for (let i = 0; i < this.N; i++) {
                console.log(this.mat[i].join(" "))
        }
    }

    // Remove the K no. of digits to
    // complete game
    removeKDigits() {
        let count = this.K;

        while (count !== 0) {
            // extract coordinates i and j
            let i = Math.floor(Math.random() * this.N);
            let j = Math.floor(Math.random() * this.N);
            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }

        return;
    }
}



async function GenerateBoard(){
    let sudoku = new Sudoku(9, 40);
    sudoku.fillValues();
    console.log(sudoku.mat);
    return sudoku.mat;
}

/*async function GenerateBoard(){

    var data;
    const options = {
        method: 'GET',
        url: 'https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku',
        params: {
          create: '81',
          output: 'raw'
        },
        headers: {
          'x-rapidapi-key': 'ecfc83e925mshf469e7bdcef0fc5p1d5d10jsn1387b09bfcd0',
          'x-rapidapi-host': 'sudoku-all-purpose-pro.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.output.raw_data);
          data = response.data.output.raw_data;
      } catch (error) {
          console.error(error);
      }
      var board = [];
      for(var i=0; i<81; i++){
        if(i%9==0){
            if(i==0){
                var temp = [];
            }
            else{
                board.push(temp);
                temp = [];
            }
        }
        temp.push(data[i]);
        if(i==80){
            board.push(temp);
        }
      }
      console.log(board);
      return board;

    //let data = await axios.get("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}");
    //console.log(data.data.newboard.grids[0].value);
    return data.data.newboard.grids[0].value;
    /*return [
        [" ","1"," ","0","9","0","9","9","45"],
        ["9","9","9","9","9","9","9","9","95"],
        ["9","9","9","9","9","9","9","9","9"],
        ["9","9","9","9","9","9","9","9","9"],
        ["9","9"," ","2","9","9","9","9","9"],
        ["9","9","9","9","9","9","9","9","9"],
        ["9","9","9","9","9","9","9","9","9"],
        ["9","9"," ","9"," ","9","9","9","9"],
        ["9","9","9","9","9","9","9","9","9"]
    ]
}*/

function checkSudoku(board){
    let result = isValidSudoku(board);
    return result;
}


function isinRange(board)
{
     let N = 9;
    // Traverse board[][] array
    for(var i = 0; i < N; i++) 
    {
        for(var j = 0; j < N; j++)
        {
             
            // Check if board[i][j]
            // lies in the range
            if (board[i][j]-"0" <= 0 ||
                board[i][j]-"0" > 9)
            {
                return false;
            }
        }
    }
    return true;
}
 
// Function to check if the solution
// of sudoku puzzle is valid or not
function isValidSudoku(board)
{
     
    // Check if all elements of board[][]
    // stores value in the range[1, 9]
    let N = 9;
    if (isinRange(board) == false)
    {
        return false;
    }
 
    // Stores unique value
    // from 1 to N
    var unique = Array(N+1).fill(false);
 
    // Traverse each row of
    // the given array
    for(var i = 0; i < N; i++)
    {
        unique = Array(N+1).fill(false);
 
        // Traverse each column
        // of current row
        for(var j = 0; j < N; j++) 
        {
 
            // Stores the value
            // of board[i][j]
            var Z = board[i][j]-"0";
 
            // Check if current row
            // stores duplicate value
            if (unique[Z])
            {
                return false;
            }
            unique[Z] = true;
        }
    }
 
    // Traverse each column of
    // the given array
    for(var i = 0; i < N; i++)
    {
 
        // Initialize unique[]
        // array to false
        unique = Array(N+1).fill(false);
 
        // Traverse each row
        // of current column
        for(var j = 0; j < N; j++)
        {
 
            // Stores the value
            // of board[j][i]
            var Z = board[j][i]-"0";
 
            // Check if current column
            // stores duplicate value
            if (unique[Z])
            {
                return false;
            }
            unique[Z] = true;
        }
    }
 
    // Traverse each block of
    // size 3 * 3 in board[][] array
    for(var i = 0; i < N - 2; i += 3) 
    {
         
        // j stores first column of
        // each 3 * 3 block
        for(var j = 0; j < N - 2; j += 3) 
        {
 
            // Initialize unique[]
            // array to false
            unique = Array(N+1).fill(false);
 
            // Traverse current block
            for(var k = 0; k < 3; k++)
            {
                for(var l = 0; l < 3; l++) 
                {
                     
                    // Stores row number
                    // of current block
                    var X = i + k;
 
                    // Stores column number
                    // of current block
                    var Y = j + l;
 
                    // Stores the value
                    // of board[X][Y]
                    var Z = board[X][Y]-"0";
 
                    // Check if current block
                    // stores duplicate value
                    if (unique[Z])
                    {
                        return false;
                    }
                    unique[Z] = true;
                }
            }
        }
    }
 
    // If all conditions satisfied
    return true;
}

export {GenerateBoard, checkSudoku};