'use strict';
// Enemies our player must avoid
// Enemy class
class Enemy {
    constructor(x, y, speed) {
        this.stepX = 101;
        this.stepY = 83;
        this.x = x;
        this.y = y + this.stepY * 0.75;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.boundaryX = this.stepX * 5;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // If enemy is not passed boundry in x direction
        if(this.x < this.boundaryX) {
            // Move forward
            // Increment x by speed * dt
            this.x += this.speed * dt;
        } else {
            // Reset position to the start point
            this.x = -this.stepX;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Player class
class Player {
    constructor() {
        this.spriteLife = 'images/Heart.png';
        this.sprite = 'images/char-boy.png';
        this.stepX = 101;
        this.stepY = 83;
        // Put player when game start in the center of x coordinate
        this.startX = this.stepX * 2;
         // Put player when game start in the buttom of the gameboard in y direction
        this.startY = this.stepY * 4.75 ;
        this.x = this.startX;
        this.y = this.startY;
        this.life = 3;
        // Using for stop Animation frame
        this.stop = false;
    }

    // Draw player sprit on current x and y cordinate position
    // Draw no of life heart
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.drawImage(Resources.get(this.spriteLife), 0, 0, 101, 171, 0, -5, 35, 60);
        ctx.font='bold 20px Arial';
        ctx.fillText(`X ${this.life}` , 40, 35);
    }

    // Update player's x and y according to the input
    handleInput(input) {
        if(input === 'left' && this.x > 0) {
            this.x -= this.stepX;
        } else if(input === 'right' && this.x < this.stepX * 4) {
            this.x += this.stepX;
        } else if(input === 'up' && this.y > 0) {
            this.y -= this.stepY;
        } else if(input === 'down' && this.y < this.stepY * 4) {
            this.y += this.stepY;
        }
    }

    // Reset player position to the start point
    resetPos() {
        // Set x and y to starting x and y
        this.x = this.startX;
        this.y = this.startY;
    }

    // Reset the game
   resetGame() {
        this.life = 3;
        this.resetPos();
    }

    // Update the player's position, according to the player collide or won
    update() {
        // Check collision if player x and y dimention collide with enemy?
        for (let enemy of allEnemies) {
            if(this.y === enemy.y &&
                (enemy.x + enemy.stepX * 0.75 > this.x) &&
                (enemy.x < this.x + this.stepX * 0.75))
            {
                this.life--;
                this.resetPos();
            }
        }

        // Check player reach the river or lose the game
        // to cancel animation frame
        if(this.y === -this.stepY * 0.25 || this.life === 0) {
            this.stop = true;
        }
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Create New player object
const player = new Player(),
      // Create bug enemys
      bug1 = new Enemy(-101, (83 * 2), 300),
      bug2 = new Enemy(-101, 83, 130),
      bug3 = new Enemy((-101 * 3), 83, 130),
      bug4 = new Enemy(-101, 0, 350),
      bug5 = new Enemy((-101 * 4), 0, 350),
// Init allEnemies array hold all enemy bugs
      allEnemies = [];
// Push new enemy object into allEnemies array
allEnemies.push(bug1, bug2, bug3, bug4, bug5);

