let cardsImageArray = [];
let cardsValueArray = [];
let playerCount = 2;
let dealerCount = 28;
let playerHandValue;
let dealerHandValue;
var deckID;
var deckCount = 6;
var newHandURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";

function placeBets(){
let betAmount = 0;
$("#oneDollarChip").on("click", function(){
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
    
});
$("#fiveDollarChip").on("click", function(){
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
});
$("#twentyFiveDollarChip").on("click", function(){
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
});
$("#oneHundredDollarChip").on("click", function(){
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
});
$("#fiveHundredDollarChip").on("click", function(){
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
});


getCards = function() {
        $.ajax({
            url: newHandURL,
            method: "GET",
            data: "response",
            dataType: "JSON"
        }).done(function(response){
            for (let i = 0; i < response.cards.length; i++){
                console.log((response.cards[i]));
                cardsImageArray.push(response.cards[i].image);
                cardsValueArray.push(response.cards[i].value);
                 for (j=0; j<cardsValueArray.length; j++) {
                    if (cardsValueArray[j] === "ACE"){
                        cardsValueArray[j] = 11;
                    }
                    if (cardsValueArray[j] === "KING" || cardsValueArray[j] === "QUEEN" || cardsValueArray[j] === "JACK") {
                        cardsValueArray[j] = 10;
                    }
                    
                    }
        }
                console.log("Card Image Array " + cardsImageArray);
                console.log("Card Value Array " + cardsValueArray);
            }
        );
    };
}

dealHands = function() {
$("#deal").on("click", function(){
    $("#hit").show();
    $("#stand").show();
console.log("Deal Click Working");
$("#deal").hide();
dealPlayer();
dealCPU();
});
};

function dealPlayer(){
    playerHandValue = 0;
    $("#playerHand").empty();
    for (let i = 0; i <  playerCount; i++){
var playerCardImage = $("<img height=120px width=80px>");
playerCardImage.attr("data-value", "value");
playerCardImage.attr("data-value", cardsValueArray[i]);
playerCardImage.attr("src", cardsImageArray[i]);
$("#playerHand").append(playerCardImage);
playerHandValue += parseInt(cardsValueArray[i]);
if (playerHandValue === 21){
    console.log("BLACKJACK!");
} else {
    console.log("You have a " + playerHandValue);
}

}
}

function dealCPU() {
    dealerHandValue = 0;
    $("#dealerHand").empty();
    for (let i = 27; i < dealerCount; i++){
        var cpuCardImage = $("<img height=120px width=80px>");
        cpuCardImage.attr("data-value", "value");
        cpuCardImage.attr("data-value",  cardsValueArray[i]);
        cpuCardImage.attr("src", cardsImageArray[i]);
        $("#dealerHand").append(cpuCardImage);
        dealerHandValue += parseInt(cardsValueArray[i]);
        if (dealerHandValue === 21) {
            console.log("Dealer wins.");
        } else {
            console.log("there is still hope.");
        }
    }
   
}

function playerHit() {
    $("#hit").on("click", function(){
        playerCount++;
        dealPlayer();
    });
}

function dealHit() {
    dealerCount++;
    dealCPU();
}   

$(document).ready(function() {
    $("#hit").hide();
    $("#stand").hide();
    placeBets();
    getCards();
    dealHands();
    playerHit();
    dealHit();

});