import React, { useState } from "react";
function Square({
  value,
  onClick,
}: {
  value: string | null;
  onClick: () => void;
}) {
  const [value2, setValue2] = useState<string>();
  return (
    <button
      className="square"
      onClick={function () {
        onClick();
      }}
    >
      {value}
    </button>
  );
}
function Board({}: {}) {
  const [squares, setSquares] = useState<Array<string | null>>(
    Array(9).fill(null)
  );
  const [xIsNext, setxIsNext] = useState(true);
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    setSquares((squares: Array<string | null>) => {
      const newSquares = squares.slice();
      newSquares[i] = xIsNext ? "x" : "o";
      setxIsNext(!xIsNext);
      return newSquares;
    });
  }
  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "o");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game({}: {}) {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

export default Game;

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
