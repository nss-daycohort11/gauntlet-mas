
$(document).ready(function() {

  /*
    Test code to generate a human player and an orc player
   */
  var warrior 
  // warrior.setWeapon(new WarAxe());
  // warrior.generateClass();  // This will be used for "Surprise me" option
  // console.log(warrior.toString());

  var orc = new Orc();
  orc.generateClass();
  orc.setWeapon(new BroadSword());
  console.log(orc.toString());

  /*
    Test code to generate a spell
   */
  var spell = new Sphere();
  console.log("spell: ", spell.toString());


  /*
    END OF TEST CODE

    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--class":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });

  
  var chosenClass;

  var classRef = {
    'Warrior': Warrior,
    'Valkyrie': Valkyrie,
    'Berserker': Berserker,
    'Monk': Monk,
    'Shaman': Shaman,
    'Wizard': Wizard,
    'Conjurer': Conjurer,
    'Sorcerer': Sorcerer,
    'Thief': Thief,
    'Ninja': Ninja,
    'Assassin': Assassin
  }

  var weaponRef = {
    'Dagger': Dagger,
    'Broad Sword': BroadSword,
    'War Axe': WarAxe
  }
  
//This is on the first page that loads.
$(".player-name-button").click(function() {
    var playerNameVariab = $("#player-name").val();
    console.log(playerNameVariab)
    Human.prototype = new Player(playerNameVariab);
    warrior = new Human();
  });

//This is the click for picking out a warrior
  $(".class__link").click(function (event) {
    var currentButtonText = event.currentTarget.childNodes[3].innerHTML;
    console.log(currentButtonText)
    warrior.class = new Valkyrie();
    console.log(warrior);
  });

  //This is for the weapons
  $(".weapon__link").click(function (event) {
    var currentButtonText = event.currentTarget.childNodes[3].innerHTML;
    warrior.setWeapon(new WarAxe());
    console.log(warrior)
  });

  $("#defeatEnemy").click(function(){
    $(".hero-stats").html(warrior.toString());
    $(".enemies-stats").html(warrior.toString());
  });


});






































