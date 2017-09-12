let cardsImageArray = [];
let cardsValueArray = [];
let playerCount = 2;
let dealerCount = 28;
let playerHandValue;
let dealerHandValue;
let newHandURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";
let playerStand, playerBusted, dealerBusted, winner, loser, blackjack, dealerBlackJack = false;


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

hideHiddenDealerCard = function() {
  $("#hiddenDealerCard img").hide();
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
  for (let iterator = 1; iterator<2; iterator++){
  var hiddenDealerCard = $("<img height=120px width=80px id=hiddenDealerCard>");
  hiddenDealerCard.attr("src", "/assets/img/cardBack.png");
 
 
  }
  for (let i = 28; i < dealerCount; i++) {
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
    if (playerHandValue > 21) {
      $("#playerBusted").fadeIn(2000).fadeOut(2000);
      $("#hit").hide();
      $("#stand").hide();
      var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
      $(".buttons").append(gameResetButton);
      $(".orange").on("click", function(){
        $(".orange").hide();
        
        gameReset();
      }
     
  );}
      
  });
  };


dealerHit = function () {
  dealerCount++;
  dealCPU();
};

blackjackCheck = function () {

  $("hiddenDealerCard").hide();
  if (playerHandValue === 21 && dealerHandValue === 21) {
    $("#stand").hide();
    $("#hit").hide();
    $("#tie").fadeIn(2000).fadeOut(2000);
    //update database
    //Message?
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
    $(".buttons").append(gameResetButton);
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });

  } else if (playerHandValue < 21 && dealerHandValue === 21) {
    $("#stand").hide();
    $("#hit").hide();
    $("#dealerBlackjack").fadeIn(2000).fadeOut(2000);
    //update database
    //Message?
    console.log("You Lose! Sad.");
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
    $(".buttons").append(gameResetButton);
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });
    
  } else if (playerHandValue === 21 && dealerHandValue < 21) {
    $("#stand").hide();
    $("#hit").hide();
    $("#blackjack").fadeIn(2000).fadeOut(2000);
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
    $(".buttons").append(gameResetButton);
    $(".orange").on("click", function(){
      $(".orange").hide();
      
      gameReset();
      

    });
    //update database
    //Message?
  } else if (playerHandValue === 22 || dealerHandValue === 22){
    $("#tie").fadeIn(2000).fadeOut(2000);
    // tie();
  }
};

$("#stand").on("click", function(){
  $("#stand").hide();
  $("#hit").hide();
  while (dealerHandValue < 17){
    dealerHit();
  }
  if (dealerHandValue > 21){
    $("#stand").hide();
    $("#hit").hide();
    $("#dealerBusted").fadeIn(2000).fadeOut(2000);
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
    $(".buttons").append(gameResetButton);
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });
    
  } else if (playerHandValue > dealerHandValue){
    $("#winner").fadeIn(2000).fadeOut(2000);
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
    $(".buttons").append(gameResetButton);
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });
  } else if (dealerHandValue > playerHandValue) {
    $("#loser").fadeIn(2000).fadeOut(2000);
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
    $(".buttons").append(gameResetButton);
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });
  } else {
    $("#tie").fadeIn(2000).fadeOut(2000);
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");
    $(".buttons").append(gameResetButton);
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
  }
  //update database
    );
  }
});


gameReset = function () {
  cardsImageArray = [];
  cardsValueArray = [];
  dealerCount = 28;
  playerCount = 2;
  $("#dealerBusted").hide();
  $("#playerBusted").hide();
  $("#playerBusted").hide();
  $("#winner").hide();
  $("#loser").hide();
  $("#blackjack").hide();
  $("dealerBlackjack").hide();
  $("#tie").hide();
  $("#gameResetButton").hide();
  $("#playerHand").empty();
  $("#hiddenDealerCard").hide();
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


// if (dealerBusted) {
//   $("#dealerBusted").hide();
//   $("#dealerBusted").fadeIn(2000).fadeOut(2000);
// }

if (winner) {
  
 
}

if (loser) {
  $("#playerBusted").hide();
  $("#playerBusted").fadeIn(2000).fadeOut(2000);
}

if (blackjack) {
  $("#playerBusted").hide();
  $("#playerBusted").fadeIn(2000).fadeOut(2000);
}

if (dealerBlackJack) {
  $("#playerBusted").hide();
  $("#playerBusted").fadeIn(2000).fadeOut(2000);
}


$(document).ready(function () {
  $("#hit").hide();
  $("#stand").hide();
  $("#dealerBusted").hide();
  $("#playerBusted").hide();
  $("#playerBusted").hide();
  $("#winner").hide();
  $("#loser").hide();
  $("#blackjack").hide();
  $("#dealerBlackjack").hide();
  $("#tie").hide();
  $("#hiddenDealerCard").hide();
  placeBets();
  getCards();
  dealHands();
  playerHit();
  dealerHit();
  

});

