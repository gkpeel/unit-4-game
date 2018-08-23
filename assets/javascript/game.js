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
    for (var i=selectedIndex+1; i< array.length; i++) {
        retval.push(array[i]);
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
            var charIndex = $(this).attr("data-character-number");
            playerCharacter = charactersArray.splice(charIndex, 1);
            $(".character-select").not($(this)).remove();
            $(this).addClass("player");
            for (var i=0; i<charactersArray.length; i++) {
                var opponent = $("<div>");
                opponent.addClass("character opponent-select");
                opponent.attr("data-name", charactersArray[i].name.toLowerCase());
                opponent.attr("data-character-number", i);
                opponent.html(charactersArray[i].name);
                opponent.append('<div class="health">' + charactersArray[i].hp + "</div>");
                $("#opponents").append(opponent);
            }
        }
        characterSelected = true;
    });


    // Selects the opponent for the round
    $(document).on("click", "#opponents .opponent-select", function() {
        if ( !opponentSelected ) {
            var oppIndex = $(this).attr("data-character-number");
            var currentOpponent = $("<div>").addClass("character opponent").attr("data-name", charactersArray[oppIndex].name.toLowerCase()); //TODO: REFACTOR SO LAST INDEX RESELECT WORKS, REWORK SPLICE
            currentOpponent.html(charactersArray[oppIndex].name);
            currentOpponent.append('<div class="health">' + charactersArray[oppIndex].hp + "</div>");
            currentOpp = charactersArray.splice(oppIndex, 1);
            $("#defender").append(currentOpponent);
            $(this).remove();
            opponentSelected = true;
        }
    });


    // Update attack results and output message
    $("#attack").on("click", function() {
        if ( characterSelected && opponentSelected ) {

            if ( playerCharacter[0].hp > 0 && currentOpp[0].hp > 0 ) {
                playerCharacter[0].hp -= currentOpp[0].counter;
                currentOpp[0].hp -= playerCharacter[0].att;
                playerCharacter[0].att += playerCharacter[0].att;
            }    

            if ( currentOpp[0].hp < 0 ) {
                $("#defender").empty();
                opponentSelected = false;
            }

            if ( playerCharacter[0].hp < 0 ) {
                $("#playerSelect").addClass("dead");
                $(this).disabled = true;
                gameOver = true;
            }

            $("#playerSelect .player .health").html(playerCharacter[0].hp);
            $("#defender .opponent .health").html(currentOpp[0].hp);
            message = gameMessage(playerCharacter[0], currentOpp[0]);
            $("#game-message").html(message);
        }
    });


});

