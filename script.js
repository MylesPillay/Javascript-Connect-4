document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const displayCurrentPlayer = document.querySelector('#current-player')
    let currentPlayer = 1
  
    for (let i = 0; i < squares.length; i++) {
      squares[i].onclick = () => {
        //if the square below your current square is taken, you can go ontop of it
        if (squares[i + 7].classList.contains('filled') &&!squares[i].classList.contains('filled')) {
          if (currentPlayer == 1) {
            squares[i].classList.add('filled')
            squares[i].classList.add('player-one')
            currentPlayer = 2
            displayCurrentPlayer.innerHTML = currentPlayer
          } else if (currentPlayer == 2){
            squares[i].classList.add('filled')
            squares[i].classList.add('player-two')
            currentPlayer = 1
            displayCurrentPlayer.innerHTML = currentPlayer        
          } 
        } else alert('cant go here')
        checkBoard()
      }
    }
    
  })

  