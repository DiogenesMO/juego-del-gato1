"use client"
import React, { useEffect } from 'react';
import './globals.css';

const App: React.FC = () => {
  useEffect(() => {
    const tiles = Array.from(document.querySelectorAll('.tile')) as HTMLDivElement[];
    const playerDisplay = document.querySelector('.display-player') as HTMLSpanElement;
    const resetButton = document.querySelector('#reset') as HTMLButtonElement;
    const announcer = document.querySelector('.announcer') as HTMLDivElement;

    let board: string[] = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer: 'X' | 'O' = 'X';
    let isGameActive = true;

    const jugadorX = 'jugadorX';
    const jugadorO = 'jugadorO';
    const TIE = 'TIE';

    const winningConditions: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleResultValidation(): void {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        announce(currentPlayer === 'X' ? jugadorX : jugadorO);
        isGameActive = false;
        return;
      }

      if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type: string): void => {
      switch(type){
        case jugadorO:
          announcer.innerHTML = 'Ganador <span class="jugadorO">O</span>';
          break;
        case jugadorX:
          announcer.innerHTML = 'Ganador <span class="jugadorX">X</span>';
          break;
        case TIE:
          announcer.innerText = 'Ambos perdieron';
      }
      announcer.classList.remove('hide');
    };

    const isValidAction = (tile: HTMLDivElement): boolean => {
      if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
      }
      return true;
    };

    const updateBoard =  (index: number): void => {
      board[index] = currentPlayer;
    }

    const changePlayer = (): void => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile: HTMLDivElement, index: number): void => {
      if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
      }
    }

    const resetBoard = (): void => {
      board = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      announcer.classList.add('hide');

      if (currentPlayer === 'O') {
        changePlayer();
      }

      tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('jugadorX');
        tile.classList.remove('jugadorO');
      });
    }

    tiles.forEach( (tile, index) => {
      tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
  }, []); 

  return (
    <main className="background">
    <section className="title">
      <h1>Juego del gato</h1>
    </section>
    
    <section className="container">
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
    </section>

    
    <section className="display announcer hide"></section>

    <section className="display">
       Jugador <span className="display-player jugadorX">X</span>
    </section>

    <section className="controls">
      <button id="reset">Volver a jugar</button>
    </section>
  </main>
  );
}

export default App;
