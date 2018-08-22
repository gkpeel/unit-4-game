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
    health: 160,
    attack: 7,
    counter: 20
}

var driver = {
    name: "Driver",
    health: 120,
    attack: 9,
    counter: 22
}

var lars = {
    name: "Lars",
    movie: "Lars and the Real Girl",
    health: 180,
    attack: 6,
    counter: 17
}

charactersArray = [bosley, jacob, noah, driver, lars];


var playerCharacter;
var characterSelected = false;
var opponentArray;

$(document).ready(function() {
    
        
    for (var i=0; i<charactersArray.length; i++) {
        var character = $("<button>");
        character.addClass("character-select");
        character.attr("data-name", charactersArray[i].name.toLowerCase());
        character.attr("data-character-number", i);
        character.html(charactersArray[i].name);
        $("#playerSelect").append(character);
    }

    $(".character-select").on("click", function() {
        if ( !characterSelected ) {
            var charIndex = $(this).attr("data-character-number");
            playerCharacter = charactersArray.splice(charIndex, 1);
            $(".character-select").not($(this)).remove();
            for (var i=0; i<charactersArray.length; i++) {
                var opponent = $("<button>");
                opponent.addClass("opponent");
                opponent.attr("data-name", charactersArray[i].name.toLowerCase());
                opponent.attr("data-character-number", i);
                opponent.html(charactersArray[i].name);
                $("#opponents").append(opponent);
            }
        }
        characterSelected = true;
    });


    $()

});

