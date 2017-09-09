var deckID;
var deckCount = 6;
var newHandURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=4";
$(document).ready(function(){
dealHand();

});

function dealHand(){
    $.ajax({
        url: newHandURL,
        method: "GET",
        data: "response",
        dataType: "JSON"
    }).done(function(response){
            console.log(response);
            console.log(response.cards);
            console.log(response.cards[0].images.png);
            console.log(response.cards[1].images.png);
            console.log(response.cards[2].images.png);
            console.log(response.cards[3].images.png);
        });
    }
