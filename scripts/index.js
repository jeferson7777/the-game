document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')//
  const width = 18///
  const squares = []

  let snake = [3, 2, 1, 0] // 3 cabeza  2.1 cuerpo    0 cola  //
  //let snake2 = //podriamos colocar otra serpiente
  let direction = 0
  const scoreDisplay = document.querySelector('.score')
  let score = 0 //
  let speedSnake = 350  ///milisegundo
  const resetBtn = document.querySelector('button')
  document.querySelector('.dead')   //podria añadir una constante aqui¿?
  let timer


  // create a grid
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }
  //PARA START Y RESTART EL JUEGO
  function startGame() {
    snake.forEach(index => squares[index].classList.remove('snake'))
  }

  //
  function drawSnake() {
    snake.forEach(index => squares[index].classList.add('snake')) //hace refencia a snake y lo esta creando dentro de square  y en el index
  }


  /////////////////////////////


})

