// CHARACTER VARIABLES
var bosley = {
    name: "Bosley",
    movie: "Remember the Titans",
    hp: 210,
    att: 5,
    counter: 120
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
var outcome;
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

function gameCheck(character1, character2) {
    if (character1.hp < 0) {
        $("#player .health").html("0");
        $("#playerSelect").addClass("dead");
        $("#reset").removeClass("d-none");
        $("#attack").addClass("disabled");
        outcome = "loss";
    } else {
        $("#player .health").html(character1.hp);
    }
    
    if ( character2.hp < 0 ) {
        $("#defender").empty();
        opponentSelected = false;
        if ($("#opponents").children().length === 0) {
            outcome = "win";
        }
    } else {
        $("#defender .opponent .health").html(character2.hp);
    }
}

function gameMessage ( player, opponent) {
    if (outcome === undefined) {
        return "You attacked " + opponent.name + " for " + player.att + " damage. " + opponent.name + " attacked you back for " + opponent.counter + " damage.";
    }
    if (outcome === "loss"){
        return opponent.name + " killed you! You lose!";
    }
    if (outcome === "win") {
        return "No more Goslings to goose, you win Ryan Gosling. Now eat your cereal!";
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
        character.html('<div class="character-name">' + charactersArray[i].name + "</div>");
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
            $(this).attr("id", "player");
            for (var i=0; i<opponentsArray.length; i++) {
                var opponent = $("<div>");
                opponent.addClass("character opponent-select");
                opponent.attr("data-name", opponentsArray[i].name.toLowerCase());
                opponent.attr("data-character-number", i);
                opponent.html('<div class="character-name">' + opponentsArray[i].name + "</div>");
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
            var currentOpponent = $("<div>").addClass("character opponent").attr("data-name", opponentsArray[oppIndex].name.toLowerCase()); //TODO: REFACTOR SO LAST INDEX RESELECT WORKS, REWORK SPLICE
            currentOpponent.html('<div class="character-name">' + opponentsArray[oppIndex].name + "</div>");
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
                gameCheck(playerCharacter, currentOpp);
                message = gameMessage(playerCharacter, currentOpp);
            }

            $("#game-message").html(message);
        }
    });

    $("#reset").on("click", function() {
        location.reload();
    });


});



//TODO : Winning Game Alert, Restart button
//TODO : Losing Game Alert, Restart button
//TODO : Make stats more balanced

