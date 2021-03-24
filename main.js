// console.log("hello world");


const startScreen = document.querySelector('.startScreen');
const heart = document.querySelector('#heart');
const score = document.querySelector('#score');
let playerScore = 0;

const switchToPlay = () => {
    startScreen.classList.add('inactive')
    heart.classList.remove('inactive')
    player.classList.remove('inactive')
    score.classList.remove('inactive')
}

const reset = () => {
        startScreen.classList.remove('inactive')
        heart.classList.add('inactive')
        player.classList.add('inactive')
        score.classList.add('inactive')
        
}

const startButton = document.querySelector('#start')
startButton.addEventListener('click', () => {
    switchToPlay()
    createEnemy()
})


const player = document.querySelector('.player1');
// console.log(player);

let life = 3;
//make a Player move UP and Down using keyboard 
document.addEventListener('keydown', function(event) {
    // console.dir(event);
    switch(event.key) {
        //enter down(s)
        case "s":
            player.style.top = player.offsetTop + 80 + "px";
            break;
        //enter up(w)
        case "w":
            player.style.top = player.offsetTop - 80 + "px";
            break;

            //enter space
        case " ":
            createBullet();
            break;
    }
})

//creating a bullet
function createBullet() {
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.top = player.offsetTop + 100 + "px";
    document.body.appendChild(bullet);

    bulletMove(bullet);
}


function bulletMove(bullet) {
//setting a timer for a bullet to move
    let timerId = setInterval(function() {
    // make bullet move towards the enemy
    bullet.style.left = bullet.offsetLeft + 10 + "px";
        
    //checking if the bullet hit the enemy
    bulletShot(bullet, timerId);
        
    //remove bullet from the body
    if(bullet.offsetLeft > document.body.clientWidth) {
        bullet.remove();
        clearInterval(timerId);
        }
    }, 10);
}

function bulletShot(bullet) {
    let topB = bullet.offsetTop;
    let bottomB = bullet.offsetTop + bullet.offsetHeight;
    // console.log(topB);
    // console.log(bottomB);

    let enemy = document.querySelector(".enemy");
    if(enemy != null) {
        let enemyTop = enemy.offsetTop;
        let enemyBottom = enemy.offsetTop + enemy.offsetHeight;
        
        let bulletLeft = bullet.offsetLeft;
        let enemyLeft = enemy.offsetLeft;

        

        if (topB >= enemyTop && topB <= enemyBottom && bulletLeft >= enemyLeft) {
        // console.log("shot");
        playerScore+=1;
        document.querySelector('.score-number').innerText = playerScore
            clearInterval(enemy.dataset.timer);
            enemy.remove();
            createEnemy();
            bullet.remove();
            win();
          } 
    
    }
}

//creating an Enemy
function createEnemy() {
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    document.body.appendChild(enemy);
    // console.log(enemy);

// move enemy towards the player    
    let timerId = setInterval(function() {
        enemy.style.left = (enemy.offsetLeft - 10) + "px";
        // making enemy dissapear if it is out of the screen
        if(enemy.offsetLeft + enemy.offsetWidth < 0) {
			enemy.remove();
			clearInterval(timerId);
			createEnemy();
			lose();
		}
    }, 70);
    enemy.dataset.timer = timerId;
}

//Player lose condition
 function lose() {
     life--;
     if(life === 0) {
        alert("Game Over")

     } else {
        // console.log(heart);
        // console.log(heart.childNodes);
        let hearts = document.querySelector('#heart');
        let life = hearts.querySelectorAll("span");
        life[0].remove();
        // console.log(life);
        // console.log(heart);
     }
 }

 //Player win condition

 function win() {
   if(playerScore === 10) {
       alert("You won!")
       document.body.innerHTML=" "
   }  
}







