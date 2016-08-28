{
//global varibles
var attackCharacterChoosen;
var defendCharacterChoosen;
var attackObj;
var defendObj;
var badGuys;
var ripSrc = ['assets/images/rip1.jpg','assets/images/rip2.jpg','assets/images/rip3.jpg'];
var fightSrc = ['assets/images/kapow.jpg',
                'assets/images/boom.jpg',
                'assets/images/pow.jpg',
                'assets/images/splatt.jpg',
                'assets/images/thwack.jpg',
                'assets/images/zonk.jpg'];
var characterProfilesObj = {
      stalloneObj: {
        name: "stallone",
        image: "assets/images/stallone.jpg",
        healthPoints: 104,
        healthPointsPreserve:104,
        baseAttackPoints: 9,
        currentAttackPoints: 9,
        returnAttackPoints: 18,
        alreadyFaught: false
      },
      stathamObj: {
        name: "statham",
        image: "assets/images/statham.jpg",
        healthPoints: 95,
        healthPointsPreserve:95,
        baseAttackPoints: 10,
        currentAttackPoints: 10,
        returnAttackPoints: 22,
        alreadyFaught: false
      },
      lundgrenObj: {
        name: "lundgren",
        image: "assets/images/lundgren.jpg",
        healthPoints: 75,
        healthPointsPreserve:75,
        baseAttackPoints: 17,
        currentAttackPoints: 17,
        returnAttackPoints: 4,
        alreadyFaught: false
      },
      jetliObj: {
        name: "jetli",
        image: "assets/images/jetli.jpg",
        healthPoints: 70,
        healthPointsPreserve:70,
        baseAttackPoints: 25,
        currentAttackPoints: 25,
        returnAttackPoints: 5,
        alreadyFaught: false
      }
}//end global varibles

//event listeners
$(document).ready(function(){
    $('#createbutton').on("click", function() {
     buildTheDOM();
     newEventListeners();
    }); //end #createbutton').on("click"
  }) //end of $(document).ready

function newEventListeners(){
  $('.char_img').on("click", function(e) {
    assignCombatants(e.target.id);
  }); //end .char_img').on("click"
  $('#dmzAttack').on("click", function(e) {
    if (!gameOver && badGuys > 0 && attackObj.healthPoints > 0) {
      doBattle();
    }
    else if (gameOver && badGuys > 0 && attackObj.healthPoints > 0) {
      //add something here to handle the click on the wrong spot
      //maybe some audio......
    }
    else{
      initlizeFirstGame();
    }
  }) //end #dmzAttack').on("click"
  }// newEventListeners()

//support functions
function initlizeFirstGame(){
    attackCharacterChoosen = false;
    defendCharacterChoosen = false;
    attackObj={};
    defendObj={};
    badGuys=3;
    gameOver=false;
    characterProfilesObj.stalloneObj.healthPoints = characterProfilesObj.stalloneObj.healthPointsPreserve;
    characterProfilesObj.stathamObj.healthPoints = characterProfilesObj.stathamObj.healthPointsPreserve;
    characterProfilesObj.lundgrenObj.healthPoints = characterProfilesObj.lundgrenObj.healthPointsPreserve;
    characterProfilesObj.jetliObj.healthPoints = characterProfilesObj.jetliObj.healthPointsPreserve;
    characterProfilesObj.stalloneObj.currentAttackPoints = characterProfilesObj.stalloneObj.baseAttackPoints;
    characterProfilesObj.stathamObj.currentAttackPoints = characterProfilesObj.stathamObj.baseAttackPoints;
    characterProfilesObj.lundgrenObj.currentAttackPoints = characterProfilesObj.lundgrenObj.baseAttackPoints;
    characterProfilesObj.jetliObj.currentAttackPoints = characterProfilesObj.jetliObj.baseAttackPoints;
    characterProfilesObj.stalloneObj.alreadyFaught = false;
    characterProfilesObj.stathamObj.alreadyFaught = false;
    characterProfilesObj.lundgrenObj.alreadyFaught = false;
    characterProfilesObj.jetliObj.alreadyFaught = false;
    $('.stallone').show();
    $('.statham').show();
    $('.lundgren').show();
    $('.jetli').show();
    $('#attackerHP').hide();
    $('#defenderHP').hide();
    $('#stallone-p2').text(characterProfilesObj.stalloneObj.healthPoints);
    $('#statham-p2').text(characterProfilesObj.stathamObj.healthPoints);
    $('#lundgren-p2').text(characterProfilesObj.lundgrenObj.healthPoints);
    $('#jetli-p2').text(characterProfilesObj.jetliObj.healthPoints);
    $('#dmzAttack').text('Click character image to choose your character');
    $('#stallone').attr('src', characterProfilesObj.stalloneObj.image);
    $('#statham').attr('src', characterProfilesObj.stathamObj.image);
    $('#lundgren').attr('src', characterProfilesObj.lundgrenObj.image);
    $('#jetli').attr('src', characterProfilesObj.jetliObj.image);
    $('.defender').hide();
    $('#attackerImg').hide();
    $('#dmzImg').hide();
  }
  function initNextBadGuy(){
    var tmp = $('#defenderImg').attr('src');
    $("#" + defendObj.name).attr('src', tmp);
    $("." + defendObj.name).show();
    $("#" + defendObj.name + "-p2").text(0);
    $('.defender').hide();
    $('#dmzImg').hide();
    defendObj={};
    gameOver=false;
  }
  function assignCombatants(eTargetId){
    var characterObj = eTargetId +"Obj";
    var alreadyFaught ="alreadyFaught"
    var hasThisCharacterAlreadyFaught = characterProfilesObj[characterObj][alreadyFaught];
    if (hasThisCharacterAlreadyFaught === false) {
      characterProfilesObj[characterObj][alreadyFaught]=true;
      if (attackCharacterChoosen === false){
        var tmp = eTargetId +"Obj"
        attackObj=characterProfilesObj[tmp];
        attackCharacterChoosen=true;
      }//end of if !attackCharacterChoosen
      else if (attackCharacterChoosen === true && defendCharacterChoosen === false && badGuys >0 && badGuys < 3) {
        initNextBadGuy();
        var tmp = eTargetId +"Obj"
        defendObj=characterProfilesObj[tmp];
        defendCharacterChoosen=true;
      }
      else if (attackCharacterChoosen === true && defendCharacterChoosen === false){
        var tmp = eTargetId +"Obj"
        defendObj=characterProfilesObj[tmp];
        defendCharacterChoosen=true;
      }//end of else if !defendCharacterChoosen
      moveCharacterImg();
    }//end of
  }//end of assignCombatants()
  function moveCharacterImg(){
    if (attackCharacterChoosen && !defendCharacterChoosen) {
      var attackerChoosenImg = $("#" + attackObj.name).attr('src');
      $('#attackerImg').attr('src',attackerChoosenImg);
      $('.' + attackObj.name).hide();
      $('#dmzAttack').text('Click character image to choose the evil character');
      $('#attackerImg').show();
    }// end of Attacker move
    else if (attackCharacterChoosen && defendCharacterChoosen) {
      var defenderChoosenImg = $("#" + defendObj.name).attr('src');
      $('#defenderImg').attr('src',defenderChoosenImg);
      $('.' + defendObj.name).hide();
      $('#dmzAttack').text('Click here to Attack');
      $('.defender').show();
    }// end of Defender move
    outputDmzHealthPoints();
  }//end of moveCharacterImg()

  function doBattle(){
    var attackerDead;
    var defenderDead;
    var computerGuess = fightSrc[Math.floor(Math.random()*fightSrc.length)];
    $('#dmzImg').attr('src',computerGuess).show();
    defendObj.healthPoints -= attackObj.currentAttackPoints;
    if (defendObj.healthPoints <= 0) {
      defendObj.healthPoints=0;
      defenderDead = true;
    }
    else{
      defenderDead = false;
    }
    attackObj.healthPoints -= defendObj.returnAttackPoints;

    if (attackObj.healthPoints <= 0) {
      attackObj.healthPoints=0;
      attackerDead = true;
    }
    else{
      attackerDead = false;
    }
    attackObj.currentAttackPoints += attackObj.baseAttackPoints;
    outputDmzHealthPoints();
    evalGameWonStatus(defenderDead , attackerDead);
  }//end of doBattle()

  function outputDmzHealthPoints(){
    if (attackCharacterChoosen) {
      $('#attackerHP').text(attackObj.healthPoints).show();
    }
    if (defendCharacterChoosen) {
      $('#defenderHP').text(defendObj.healthPoints).show();
    }
  }//end of outputDmzHealthPoints()

  function evalGameWonStatus(defenderDead , attackerDead){
    if (attackerDead) {
      $('#dmzAttack').text('Your Dead Game Over -- Click here to reset');
      $('#dmzImg').attr('src', 'assets/images/frownyFace.jpg');
      gameOver=true;
    }
    else if (defenderDead) {
      $('#defenderImg').attr('src',ripSrc[3-badGuys]);
      badGuys--;
      if (badGuys > 0) {
        $('#dmzAttack').text('Click character image to choose new defender');
      }
      else{
        winnerFlash();
        var tmp = $('#defenderImg').attr('src');
        $("#" + defendObj.name).attr('src', tmp);
        $("." + defendObj.name).show();
        $("#" + defendObj.name + "-p2").text(0);
        $('.defender').hide();
        $('#dmzImg').hide();
      }
      defendCharacterChoosen=false;
      gameOver=true;
    }
  }//end of evalGameWonStatus()

  function winnerFlash(){
    $('#dmzAttack').text('WINNER!!');
    $('#dmzAttack').css("background-color", "green");
    var setRedTime = setTimeout(setRed, 500);
  }

  function setRed(){
    $('#dmzAttack').text('WINNER!! WINNER!!');
    $('#dmzAttack').css("background-color", "red");
    var setGrnTime = setTimeout(setGrn, 500);
  }
  function setGrn(){
    $('#dmzAttack').text('WINNER!! WINNER!! WINNER!!');
    $('#dmzAttack').css("background-color", "green");
    var setResetTime = setTimeout(setReset, 500);
  }
  function setReset(){
    $('#dmzAttack').text('Click here to reset the game');
    $('#dmzAttack').css("background-color", "rgba(0, 0, 0, 0)");
  }
//build the DOM
  function buildTheDOM(){
    $('#createbutton').remove();
    $('body').append( "<div class='container'></div>");
      $('.container').append( "<div class='row title-row'></div>");
        $('.title-row').append("<h1 class='text-right col-md-4'>The Expendables</h1>");
        $('.title-row').append("<img  class='col-md-4 title-img' src='assets/images/expendables.jpg'  alt='Expendables'>");
        $('.title-row').append("<h1 class='text-left col-md-4'>RPG game</h1>");
      $('.container').append("<section id='characters'></section>");
        $('#characters').append("<div class='row center characterRow'>");
          $('.characterRow').append("<div class='col-md-3 stallone'></div>");
            $('.stallone').append("<p id='stallone-p1' class='text-center'> Stallone</p>");
            $('.stallone').append("<img id='stallone' src='assets/images/stallone.jpg' class='center-block char_img' alt='Stallone' height='100'>");
            $('.stallone').append("<p id='stallone-p2' class='text-center health'>" + characterProfilesObj.stalloneObj.healthPoints +" </p>");
          $('.characterRow').append("<div class='col-md-3 statham'></div>");
            $('.statham').append("<p id='statham-p1' class='text-center'> Statham</p>");
            $('.statham').append("<img id='statham' src='assets/images/statham.jpg' class='center-block char_img' alt='Statham' height='100'>");
            $('.statham').append("<p id='statham-p2' class='text-center health'>" + characterProfilesObj.stathamObj.healthPoints +"</p>");
          $('.characterRow').append("<div class='col-md-3 lundgren'></div>");
            $('.lundgren').append("<p id='lundgren-p1' class='text-center'> Lundgren</p>");
            $('.lundgren').append("<img id='lundgren' src='assets/images/lundgren.jpg' class='center-block char_img' alt='Lundgren' height='100'>");
            $('.lundgren').append("<p id='lundgren-p2' class='text-center health'>" + characterProfilesObj.lundgrenObj.healthPoints +"</p>");
          $('.characterRow').append("<div class='col-md-3 jetli'></div>");
            $('.jetli').append("<p id='jetli-p1' class='text-center'> Jet Li</p>");
            $('.jetli').append("<img id='jetli' src='assets/images/jetli.jpg' class='center-block char_img' alt='Jet Li' height='100'>");
            $('.jetli').append("<p id='jetli-p2' class='text-center health'>" + characterProfilesObj.jetliObj.healthPoints +"</p>");
      $('.container').append("<section id='arena'></section>");
        $('#arena').append("<div class = 'row arena-row'></div>");
          $('.arena-row').append("<div class='col-md-4 arena-attacker'></div>");
            $('.arena-attacker').append("<p id= 'attacker' class='text-center'> your character</p>");
            $('.arena-attacker').append("<img id='attackerImg' src='' class='center-block' height='100' >");
            $('.arena-attacker').append("<p id= 'attackerHP' class='text-center'></p>");
          $('.arena-row').append("<div class='col-md-4 arena-dmz'></div>");
            $('.arena-dmz').append("<h2 id='dmzAttack' class='text-center'></h2>");
            $('.arena-dmz').append("<img id='dmzImg' src='' class='center-block' height='100' >");
            $('.arena-dmz').append("<p class='text-center'>  </p>");
          $('.arena-row').append("<div class='col-md-4 defender'>");
            $('.defender').append("<p id= 'defender' class='text-center'> the evil character</p>");
            $('.defender').append("<img id='defenderImg' src='' class='center-block' height='100' >");
            $('.defender').append("<p id='defenderHP' class='text-center defendHP'></p>");
  initlizeFirstGame();
  }//end build the DOM

} // end of week4_game.js
