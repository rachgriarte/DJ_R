let cardsImageArray = [];
let cardsValueArray = [];
let playerCount = 2;
let dealerCount = 28;
let playerHandValue;
let dealerHandValue;
let newHandURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";
let playerStand, playerBusted, dealerBusted, winner, loser, blackjack, dealerBlackJack = false;
let email = $("#hiddenEmail").value // doublecheck


placeBets = function () {
  let betAmount = 0;
  $("#oneDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value='" + betAmount + "'> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;

  });
  $("#fiveDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value='" + betAmount + "'> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#twentyFiveDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value='" + betAmount + "'> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#oneHundredDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value='" + betAmount + "'> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#fiveHundredDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='betAmount' data-value='" + betAmount + "'> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });


  getCards = function () {
    $.ajax({
      url: newHandURL,
      method: "GET",
      data: "response",// data: { data: {email:'aaa', amount: '500'}}
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

// hideHiddenDealerCard = function() {
//   $("#hiddenDealerCard img").hide();
// };

dealPlayer = function () {
  playerHandValue = 0;
  $("#playerHand").empty();
  for (let i = 0; i < playerCount; i++) {
<<<<<<< HEAD
    var playerCardImage = $("<img height='120px' width='80px'>");
    playerCardImage.attr("data-value", "value");
=======
    var playerCardImage = $("<img height=120px width=80px>");
>>>>>>> 75a238294bcf0f1ebacf149e6751e7bf1323622f
    playerCardImage.attr("data-value", cardsValueArray[i]);
    playerCardImage.attr("src", cardsImageArray[i]);
    $("#playerHand").append(playerCardImage);
    playerHandValue += parseInt(cardsValueArray[i]);
  }
};


dealCPU = () => {
  dealerHandValue = 0;

  $("#dealerHand").empty();
<<<<<<< HEAD
  for (let iterator = 1; iterator<2; iterator++){
  var hiddenDealerCard = $("<img height='120px' width='80px' id='hiddenDealerCard'>");
  hiddenDealerCard.attr("src", "/assets/img/cardBack.png");
 
 
=======

  var hiddenDealerCard = $('<img height="120px" width="80px" id="hiddenDealerCard">');

  for (let iterator = 1; iterator < 2; iterator++){

    hiddenDealerCard.attr("src", "/assets/img/cardBack.png");

    $('#dealerHand').append(hiddenDealerCard);
>>>>>>> 75a238294bcf0f1ebacf149e6751e7bf1323622f
  }

  for (let i = 28; i < dealerCount; i++) {
<<<<<<< HEAD
    var cpuCardImage = $("<img height='120px' width='80px'>");
    cpuCardImage.attr("data-value", "value");
=======
    hiddenDealerCard.attr("data-value", cardsValueArray[cardsValueArray.length - 1]);
    var cpuCardImage = $('<img height=120px width=80px id="showDealCard">');
>>>>>>> 75a238294bcf0f1ebacf149e6751e7bf1323622f
    cpuCardImage.attr("data-value", cardsValueArray[i]);
    cpuCardImage.attr("src", cardsImageArray[i]);
    $("#dealerHand").append(cpuCardImage);
    dealerHandValue += parseInt(cardsValueArray[i]);
  }

  dealerHandValue += parseInt(cardsValueArray[cardsValueArray.length - 1]);
};

playerHit = () => {
  $("#hit").on("click", () => {
    playerCount++;

    dealPlayer();

    if (playerHandValue > 21) {
<<<<<<< HEAD
      //$("#playerBusted").fadeIn(2000).fadeOut(2000);
=======
      $("#playerBusted").fadeIn(2000).fadeOut(2000);

>>>>>>> 75a238294bcf0f1ebacf149e6751e7bf1323622f
      $("#hit").hide();

      $("#stand").hide();
<<<<<<< HEAD
      //var gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
      //$(".buttons").append(gameResetButton);
      $('.orange').show();
      $(".orange").on("click", function(){
        gameReset();
        $(".orange").hide();
      }
     
  );}
      
=======

      var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");

      $(".buttons").append(gameResetButton);

      $(".orange").on("click", () => {
        $(".orange").hide();
        
        gameReset();
      });
    }
>>>>>>> 75a238294bcf0f1ebacf149e6751e7bf1323622f
  });
};


dealerHit = function () {
  dealerCount++;
  dealCPU();
};

blackjackCheck = () => {
  $("hiddenDealerCard").hide();

  if (playerHandValue === 21 && dealerHandValue === 21) {
    $("#stand").hide();

    $("#hit").hide();
    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
    $("#tie").fadeIn(2000).fadeOut(2000);

    //update database
    //Message?
<<<<<<< HEAD
    //var gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
    //$(".buttons").append(gameResetButton);
    $('.orange').show();
    $(".orange").on("click", function(){
=======
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");

    $(".buttons").append(gameResetButton);

    $(".orange").on("click", () => {
>>>>>>> 75a238294bcf0f1ebacf149e6751e7bf1323622f
      $(".orange").hide();
      gameReset();
    });
  } else if (playerHandValue < 21 && dealerHandValue === 21) {
    $("#stand").hide();
    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
    $("#hit").hide();

    $("#dealerBlackjack").fadeIn(2000).fadeOut(2000);

    //update database
    //Message?
    console.log("You Lose! Sad.");
    //var gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
    //$(".buttons").append(gameResetButton);
    $('.orange').show();
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });
  } else if (playerHandValue === 21 && dealerHandValue < 21) {
    $("#stand").hide();

    $("#hit").hide();

    $("#blackjack").fadeIn(2000).fadeOut(2000);
    //let gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
    //$(".buttons").append(gameResetButton);
    $('.orange').show();
    $(".orange").on("click", function(){
      $(".orange").hide();
      
      gameReset();
    });
    //update database
    //Message?
  } else if (playerHandValue === 22 || dealerHandValue === 22){
    $("#tie").fadeIn(2000).fadeOut(2000);
    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
    // tie();
  }
};

$("#stand").on("click", () => {
  $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
  $("#stand").hide();
  $("#hit").hide();

  while (dealerHandValue < 17){
    dealerHit();
  }

  if (dealerHandValue > 21){
    $("#stand").hide();

    $("#hit").hide();
    //$("#dealerBusted").fadeIn(2000).fadeOut(2000);
    //var gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
    //$(".buttons").append(gameResetButton);
    $('.orange').show();
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });
  } else if (playerHandValue > dealerHandValue){
    //$("#winner").fadeIn(2000).fadeOut(2000);
    //var gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
    // $(".buttons").append(gameResetButton);
    $('.orange').show();
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });

    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
  } else if (dealerHandValue > playerHandValue) {
    //$("#loser").fadeIn(2000).fadeOut(2000);
    // var gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
    // $(".buttons").append(gameResetButton);
    $('.orange').show();
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    });

    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
  } else {
    //$("#tie").fadeIn(2000).fadeOut(2000);
    // var gameResetButton = $("<button id='gameResetButton' class='orange'>Play Again</button>");
    // $(".buttons").append(gameResetButton);
    $('.orange').show();
    $(".orange").on("click", function(){
      $(".orange").hide();
      gameReset();
    }
  //update database
    );
  }
});


gameReset = () => {
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


$(document).ready(() => {
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