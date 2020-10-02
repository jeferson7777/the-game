document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const width = 18
  const squares = []

  let snake = [2, 1, 0]
  let direction = 'right'
  const scoreDisplay = document.querySelector('.score')
  let score = 0
  let speedSnake = 400 //milisegundos
  const resetBtn = document.querySelector('button')
  document.querySelector('.dead')
  let timer


  // Creamos la cuadricula grande
  for (let index = 0; index < width * width; index = index + 1) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
    square.innerText = index
  }
  //Función para que aparezca la serpiente
  function drawSnake() {
    snake.forEach(index => squares[index].classList.add('snake'))
  }

  // Función cuando se choca con su propia cola.
  function killSnake() {
    if (snake.slice(1).includes(snake[0])) {
      return gameOver()
    }
  }
  //Función para borrar la serpiente
  function eraseSnake() {
    snake.forEach(index => squares[index].classList.remove('snake'))
  }

  //Función para que la manzana aparezca de forma random
  function apple() {
    let randomIndex = Math.floor(Math.random() * squares.length)
    while (squares[randomIndex].classList.contains('snake')) {
      randomIndex = Math.floor(Math.random() * squares.length)
    }
    squares[randomIndex].classList.add('apple')
  }
  //Función cuando pierdes.
  function gameOver() {
    console.log('gameOver')
    eraseSnake()
    grid.classList.remove('grid')
    grid.classList.add('dead')
    speedSnake = 400
  }


  //Función para determinar las colisiones con las paredes

  function moveSnake() {
    console.log(snake)
    if (snake[0] % width === 0 && direction === 'left' ||
      snake[0] % width === width - 1 && direction === 'right' ||
      snake[0] - width < 0 && direction === 'up' ||
      snake[0] >= width * (width - 1) && direction === 'down') {
      return gameOver()
    }
    eraseSnake()

    //Definicion de los controles

    switch (direction) {
      case 'right': moveSnakeRight() //si vamos a la derecha vamos a una funcion llamada moveSnakeRight que esta mas abajo.
        break
      case 'left': moveSnakeLeft()
        break
      case 'up': moveSnakeUp()
        break
      case 'down': moveSnakeDown()
    }
    killSnake()

    //// Condición para que la serpiente crezca y aumente la puntuación
    if (squares[snake[0]].classList.contains('apple')) {
      score++
      speedSnake -= 10
      console.log(speedSnake)
      squares[snake[0]].classList.remove('apple')
      snake.unshift(snake[0]) //El método unshift() agrega uno o más elementos al inicio del array, y devuelve la nueva longitud del array.
      scoreDisplay.innerText = score
      apple()
    }

    drawSnake()

    timer = setTimeout(moveSnake, speedSnake)
  }
  moveSnake()



  function moveSnakeDown() {
    eraseSnake()
    snake.pop() //El método pop() elimina el último elemento de un array y lo devuelve. Este método cambia la longitud del array.
    snake.unshift(snake[0] + width)
    drawSnake()
  }

  function moveSnakeUp() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] - width)
    drawSnake()
  }

  function moveSnakeLeft() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] - 1)
    drawSnake()
  }

  function moveSnakeRight() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] + 1)
    drawSnake()
  }


  //conotroles  
  document.addEventListener('keydown', (e) => {
    e.preventDefault()
    switch (e.key) {
      case 37: if (direction !== 'right') direction = 'left'
        break
      case 38: if (direction !== 'down') direction = 'up'
        break
      case 39: if (direction !== 'left') direction = 'right'
        break
      case 40: if (direction !== 'up') direction = 'down'
        break
    }
  })

  //evento para empezar el juego 
  resetBtn.addEventListener('click', () => {
    snake.forEach(index => squares[index].classList.remove('snake'))
    snake = [2, 1, 0]
    direction = 'right'
    clearTimeout(timer)
    grid.classList.remove('dead')
    grid.classList.add('grid')
    score = 0
    scoreDisplay.innerText = score
    drawSnake()
    moveSnake()

  })

  apple()

})