// CHARACTER VARIABLES
var bosley = {
    name: "Bosley",
    movie: "Remember the Titans",
    hp: 210,
    att: 5,
    counter: 12
}

var jacob = {
    name: "Jacob",
    movie: "Crazy Stupid Love",
    hp: 210,
    att: 5,
    counter: 12
}

var noah = {
    name: "Noah",
    movie: "The Notebook",
    hp: 160,
    att: 7,
    counter: 20
}

var driver = {
    name: "Driver",
    movie: "Driver",
    hp: 120,
    att: 9,
    counter: 22
}

var lars = {
    name: "Lars",
    movie: "Lars and the Real Girl",
    hp: 180,
    att: 6,
    counter: 17
}

// GAMEPLAY VARIABLES
var charactersArray = [bosley, jacob, noah, driver, lars];
var opponentsArray;
var playerCharacter;
var currentOpp;
var gameOver = false;
var characterSelected = false;
var opponentSelected = false;


function arrayMinusSelected( array, selectedIndex) {
    var retval = [];
    for (var i=0; i<selectedIndex; i++) {
        retval.push(array[i]);
    }
    for (var j = selectedIndex+1; j < array.length; j++) {
        retval.push(array[j]);
    }
    return retval;
}

function gameMessage ( player, opponent) {
    if (player.hp > 0 && opponent.hp > 0) {
        return "You attacked " + opponent.name + " for " + player.att + " damage.<br>" + opponent.name + " attacked you back for " + opponent.counter + " damage.";
    }
}


// EVENT HANDLERS
$(document).ready(function() {
    
    // Creates available players   
    for (var i=0; i<charactersArray.length; i++) {
        var character = $("<div>");
        character.addClass("character character-select");
        character.attr("data-name", charactersArray[i].name.toLowerCase());
        character.attr("data-character-number", i);
        character.html(charactersArray[i].name);
        character.append('<div class="health">' + charactersArray[i].hp + "</div>");
        $("#playerSelect").append(character);
    }

    // Creates available opponents and selects player's character
    $(".character-select").on("click", function() {
        if ( !characterSelected ) {
            var charIndex = Number($(this).attr("data-character-number"));
            playerCharacter = charactersArray[charIndex];
            opponentsArray = arrayMinusSelected(charactersArray, charIndex);
            $(".character-select").not($(this)).remove();
            $(this).addClass("player");
            for (var i=0; i<opponentsArray.length; i++) {
                var opponent = $("<div>");
                opponent.addClass("character opponent-select");
                opponent.attr("data-name", opponentsArray[i].name.toLowerCase());
                opponent.attr("data-character-number", i);
                opponent.html(opponentsArray[i].name);
                opponent.append('<div class="health">' + opponentsArray[i].hp + "</div>");
                $("#opponents").append(opponent);
            }
        }
        characterSelected = true;
    });


    // Selects the opponent for the round
    $(document).on("click", "#opponents .opponent-select", function() {
        if ( !opponentSelected ) {
            var oppIndex = $(this).index();
            console.log("oppIndex: " + oppIndex);
            var currentOpponent = $("<div>").addClass("character opponent").attr("data-name", opponentsArray[oppIndex].name.toLowerCase()); //TODO: REFACTOR SO LAST INDEX RESELECT WORKS, REWORK SPLICE
            currentOpponent.html(opponentsArray[oppIndex].name);
            currentOpponent.append('<div class="health">' + opponentsArray[oppIndex].hp + "</div>");
            currentOpp = opponentsArray[oppIndex];
            opponentsArray = arrayMinusSelected(opponentsArray, oppIndex);
            $(this).remove();
            $("#defender").append(currentOpponent);
            opponentSelected = true;
        }
    });


    // Update attack results and output message
    $("#attack").on("click", function() {
        if ( characterSelected && opponentSelected ) {

            if ( playerCharacter.hp > 0 && currentOpp.hp > 0 ) {
                playerCharacter.hp -= currentOpp.counter;
                currentOpp.hp -= playerCharacter.att;
                playerCharacter.att += playerCharacter.att;
            }    

            if ( currentOpp.hp < 0 ) {
                $("#defender").empty();
                opponentSelected = false;
            }

            if ( playerCharacter.hp < 0 ) {
                $("#playerSelect").addClass("dead");
                $(this).disabled = true;
                gameOver = true;
            }

            $("#playerSelect .player .health").html(playerCharacter.hp);
            $("#defender .opponent .health").html(currentOpp.hp);
            message = gameMessage(playerCharacter, currentOpp);
            $("#game-message").html(message);
        }
    });


});

