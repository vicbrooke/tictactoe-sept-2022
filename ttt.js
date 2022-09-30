const currentPlayer = document.getElementById("currentPlayer");

let board = "123456789";
let player = "X";
let winner = "";
let gameOver = false;
let playerXScore = 0;
let playerOScore = 0;

initialiseGame();

function initialiseGame() {
  setText(`Which square do you want to play?`);
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  returnScore();
  currentPlayer.style.display = "block";
  currentPlayer.innerText = `Current player: ${player}`;
  player = "X";
  board = "123456789";
  gameOver = false;
}

function play(id) {
  let gameWinSound = new Audio("mixkit-video-game-win-2016.wav");
  let gameDrawSound = new Audio("mixkit-arcade-retro-game-over-213.wav");

  if (gameOver) return;
  if (!board.includes(id)) {
    setText("PLEASE SELECT ONE OF THE AVAILABLE SQUARES! 🛑");
  } else {
    board = board.replace(id, player);
    const sq = document.getElementById(id);
    sq.innerHTML = board[id - 1];
    if (gameWon()) {
      gameOver = true;
      currentPlayer.style.display = "none";
      setText(`🎉 CONGRATULATIONS 🎉\nPLAYER ${winner}\nYOU ARE THE WINNER!! `);
      if (player === "X") {
        playerXScore += 1;
        returnScore();
      } else {
        playerOScore += 1;
        returnScore();
      }
      gameWinSound.play();
    } else if (gameTied()) {
      gameOver = true;
      currentPlayer.style.display = "none";
      setText("DRAW - NO MORE MOVES AVAILABLE!\nHAVE ANOTHER GO! 🔁");
      gameDrawSound.play();
    } else {
      player = player === "X" ? "O" : "X";
      currentPlayer.innerText = `Current player: ${player}`;
      setText("Which square do you want to play?");
    }
  }
}

function gameWon() {
  if (
    /...XXX...|XXX......|......XXX|X..X..X..|.X..X..X.|..X..X..X|X...X...X|..X.X.X../.test(
      board
    )
  ) {
    winner = "X";
    return true;
  } else if (
    /...OOO...|OOO......|......OOO|O..O..O..|.O..O..O.|..O..O..O|O...O...O|..O.O.O../.test(
      board
    )
  ) {
    winner = "O";
    return true;
  } else {
    return false;
  }
}

function gameTied() {
  return /^[a-zA-Z]+$/.test(board);
}

function otherPlayer() {
  return player === "X" ? "O" : "X";
}

function makeMove(id) {
  board = board.replace(id, player);
  player = player === "X" ? "O" : "X";
}

function startOver() {
  playerXScore = 0;
  playerOScore = 0;
  initialiseGame();
}

function setText(string) {
  const text = document.getElementById("text");
  return (text.innerText = string);
}

function returnScore() {
  const XScore = document.getElementById("X-score");
  const OScore = document.getElementById("O-score");

  XScore.innerText = `Player X: ${playerXScore}`;

  OScore.innerText = `Player O: ${playerOScore}`;
}
