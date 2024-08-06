let ball;
let paddle;
let score = 0;
let lives = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(width / 2, height / 2, 30);
  paddle = new Paddle(width / 2, height - 30, 100, 20);
}

function draw() {
  background(0);

  ball.update();
  ball.display();

  paddle.update();
  paddle.display();

  // Check for collision between ball and paddle
  if (
    ball.position.y + ball.diameter / 2 > height - paddle.height &&
    ball.position.x > paddle.position.x &&
    ball.position.x < paddle.position.x + paddle.width
  ) {
    ball.velocity.y *= -1;
    score++;
    updateScore();
  }

  // Check if ball falls below the paddle
  if (ball.position.y > height) {
    lives--;
    updateLives();
    if (lives <= 0) {
      gameOver();
    } else {
      resetBall();
    }
  }
}

function updateScore() {
  select("#score").html(`Score: ${score}`);
}

function updateLives() {
  select("#lives").html(`Lives: ${lives}`);
}

function gameOver() {
  textSize(64);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  noLoop(); // Stop the draw loop
}

function resetBall() {
  ball = new Ball(width / 2, height / 2, 30);
}

class Ball {
  constructor(x, y, diameter) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.diameter = diameter;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.position.add(this.velocity);

    if (
      this.position.x > width - this.diameter / 2 ||
      this.position.x < this.diameter / 2
    ) {
      this.velocity.x *= -1;
    }

    if (this.position.y < this.diameter / 2) {
      this.velocity.y *= -1;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.diameter);
  }
}

class Paddle {
  constructor(x, y, width, height) {
    this.position = createVector(x, y);
    this.width = width;
    this.height = height;
  }

  update() {
    this.position.x = mouseX - this.width / 2;
  }

  display() {
    fill(255);
    noStroke();
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}
