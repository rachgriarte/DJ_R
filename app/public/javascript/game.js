let cardsImageArray = [];
let cardsValueArray = [];
let playerCount = 2;
let dealerCount = 28;
let playerHandValue;
let dealerHandValue;
var deckCount = 6;
var newHandURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";
var playerStand = false;


placeBets = function () {
  let betAmount = 0;
  $("#oneDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;

  });
  $("#fiveDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#twentyFiveDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#oneHundredDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#fiveHundredDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });


  getCards = function () {
    $.ajax({
      url: newHandURL,
      method: "GET",
      data: "response",
      dataType: "JSON"
    }).done(function (response) {
      for (let i = 0; i < response.cards.length; i++) {
        cardsImageArray.push(response.cards[i].image);
        cardsValueArray.push(response.cards[i].value);
        for (j = 0; j < cardsValueArray.length; j++) {
          if (cardsValueArray[j] === "ACE") {
            cardsValueArray[j] = 11;
          }
          if (cardsValueArray[j] === "KING" || cardsValueArray[j] === "QUEEN" || cardsValueArray[j] === "JACK") {
            cardsValueArray[j] = 10;
          }

        }
      }
    });
  };
};

dealHands = function () {
  $("#deal").on("click", function () {
    $("#hit").show();
    $("#stand").show();
    $(".chips").hide();
    $("#deal").hide();
    dealPlayer();
    dealCPU();
    blackjackCheck();
  });
};

dealPlayer = function () {
  playerHandValue = 0;
  $("#playerHand").empty();
  for (let i = 0; i < playerCount; i++) {
    var playerCardImage = $("<img height=120px width=80px>");
    playerCardImage.attr("data-value", "value");
    playerCardImage.attr("data-value", cardsValueArray[i]);
    playerCardImage.attr("src", cardsImageArray[i]);
    $("#playerHand").append(playerCardImage);
    playerHandValue += parseInt(cardsValueArray[i]);
  }
};


dealCPU = function () {
  dealerHandValue = 0;
  $("#dealerHand").empty();
  for (let i = 27; i < dealerCount; i++) {
    var cpuCardImage = $("<img height=120px width=80px>");
    cpuCardImage.attr("data-value", "value");
    cpuCardImage.attr("data-value", cardsValueArray[i]);
    cpuCardImage.attr("src", cardsImageArray[i]);
    $("#dealerHand").append(cpuCardImage);
    dealerHandValue += parseInt(cardsValueArray[i]);
  }

};

playerHit = function () {
  $("#hit").on("click", function () {
    playerCount++;
    dealPlayer();
  });
};

dealerHit = function () {
  dealerCount++;
  dealCPU();
};

blackjackCheck = function () {
  if (playerHandValue === 21 && dealerHandValue === 21) {
    //update database
    //Message?
    console.log("Tied up");
    gameReset();
  } else if (playerHandValue < 21 && dealerHandValue === 21) {
    //update database
    //Message?
    console.log("You Lose! Sad.");
    gameReset();
  } else if (playerHandValue === 21 & dealerHandValue < 21) {
    console.log("Winner Winner chicken dinner!");
    gameReset();
    //update database
    //Message?
  } 
};

$("#stand").on("click", function(){
  $("#stand").hide();
  $("#hit").hide();
  while (dealerHandValue < 17){
    dealerHit();
  }
  //update database
});


gameReset = function () {
  cardsImageArray = [];
  cardsValueArray = [];
  dealerCount = 28;
  playerCount = 2;
  $("#playerHand").empty();
  getCards();
  placeBets();
  dealHands();
  dealerHit();
  $("#betAmount").html("Click Chips to place your bet!");
  $("#dealerHand").empty();
  $(".chips").show();
  $("#hit").hide();
  $("#stand").hide();
  $("#deal").show();
};



$(document).ready(function () {
  $("#hit").hide();
  $("#stand").hide();
  placeBets();
  getCards();
  dealHands();
  playerHit();
  dealerHit();
  

});