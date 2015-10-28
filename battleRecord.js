/***********************************
Battle Record Code
************************************/

//grabs the battle record div
var battle = $(".record");
//function which records something in the battle record div, this will be used MANY TIMES later on. It takes an html string (string), and another string which will be a class name (css) so that I can make the rows in the battle record look different.
var record = function (string, css) {
  battle.append("<div class='" + css + "'>" + string + "</div>")
}

/***********************************
CONSTRUCTORS 
************************************/

//player constructor, will be used LATER ON to create a new player object every time a game begins
function Player () {
  //starts off the player health at 50
  this.health = 50;
  
  //function which performs an attack on the enemy or player
  this.attack = function () {
    if (this.id === "player") {
      enemy.health -= this.damage();
    } else {
      player.health -= this.damage();
    }
  }
  
  //sets the id property of the object as player (used in the .attack method above)
  this.id = "player";
  
  //sets the amount of damage a player or enemy does (used in the .attack method)
  this.damage = function () {
    var damage = Math.floor(Math.random() * 14)
    return damage
  }
}

// Enemy constructor
//  - You'll notice that this constructor (which creates the enemy player object) doesn't have many of the properties that the Player constructor above does... I wonder why that is... (see below line 49)
function Enemy () {
  this.damage = function () {
    var damage = Math.floor(Math.random() * Math.floor(this.health/2));
    return damage
  }
  this.id = "enemy";
}


// ... continued from line 41 comments above: Aha! This is why! Because we are setting the Player object as PROTOTYPE of any Enemy object. So, the enemy object will INHERIT all of the properties of the player object... because the enemy is technically a "player" in the game too, right?
Enemy.prototype = new Player();

//Go look back at the Enemy constructor. You'll notice that the two properties being set on it ALSO exist on the player object. Why is that? Look at them closely. Both of them are different from their counterparts on Player: this.id is now "enemy" instead of player, and this.damage calculates damage differently.

//Because these properties also appear on the child object (the Enemy object) in this case, they will take precedence (or overwrite) those they inherited from the prototype. 

//here I'm just declaring some variables we will use later
var game
var enemy
var player


// Here's our final constructor: the Game constructor. It will be used below to start a new game by creating a new instance of the Game object.
function Game () {
  //these two lines are different from what we normally see in constructors. They don't have the "this.whateverProperty" syntax. Thats because I wanted enemy and player to exist on the global scope.
  //but you can see, I'm using the constructors I created above to create new instances of the player and enemy objects. And then i'm saving them to variables.
  enemy = new Enemy();
  player = new Player();
  
  
  //this is a property wich keeps track of the turn we're on
  this.turn = 0;
  
  //this is a function that will report the player and enemy health properties at the end of every turn.
  this.healthReport = function () {
    record("Player health: " + player.health + " Enemy health: " + enemy.health, "report")
  }
  
  //this is a function which ends the game. More on this later.
  this.gameOver = function () {
    record("GAME OVER", "over")
    game = null;
  }
  
  //this is a method which actually performs a "turn" of the game. This method will run each time you click the ATTACK button.
  this.startTurn = function () {
    //firs the player and the enemy attack each other using the methods I created on the constructors above.
    player.attack();
    enemy.attack();
    
    //then we print their health properties to the page so the user will know
    this.healthReport();
    
    //then we check to see if the game has ended. If it has we run the .gameOver() method from above. 
    if (player.health <= 0) {
      if (enemy.health <= 0) {
        //I have yet to encounter a draw
        record("DRAW. YOU'RE BOTH DEAD", "loss")
      } else {
        record("YOU DIED.", "loss")
      }
      this.gameOver()
    } else if (enemy.health <= 0) {
      record("YOU WON!!", "victory")
      this.gameOver();
    }
    
    //if the game hasn't ended then the function simply ends with out calling another function.
    
  }
  
}



/*****************************************
BUTTON CLICK EVENTS
******************************************/

//This is the button which starts the game.
$("button.start").click(function () {
  //here it check to see if the global game variable is defined. 
  if (!game) {
    //if it isn't then it clears the battle log
    battle.html("");
    //then it constructs a new game object and stick it into the game variable
    game = new Game();
    record("The battle has begun!", "intro")
  } else {
    //if you've already started a game. Then the game object will not be undefined. And this will fire, because you've already started a game.
    record("You're game is already in progress!", "error")
  }
})


//This is the attack button
$("button.attack").click(function () {
  //if you haven't started a game, then it will report that to you
  if (!game) {
    record("Your game hasn't started yet! Click start to begin!", "error")
  } else {
  //if you have it will add 1 to the turn property on the game object
    game.turn += 1
  //it will print what turn it is
    record(">>>>>>>>>>>>>>>TURN " + game.turn, "turn" )
  //then it will perform that turn
    game.startTurn();
  }
})

