let cardsImageArray = [];
let cardsValueArray = [];
let playerCount = 2;
let dealerCount = 28;
let playerHandValue;
var total;
var balance = 5000;
var winAmount;
let dealerHandValue;
let newHandURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";
let playerStand, playerBusted, dealerBusted, winner, loser, blackjack, dealerBlackJack = false;
let email = $("#hiddenEmail").value // doublecheck

placeBets = function () {
  let betAmount = 0;
  $("#oneDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='bet' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;

  });
  $("#fiveDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='bet' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#twentyFiveDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='bet' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#oneHundredDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='bet' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
    $("#betAmount").data("value") === betAmount;
  });
  $("#fiveHundredDollarChip").on("click", function () {
    betAmount += $(this).data("value");
    $("#betAmount").html("<h2 id='bet' data-value=" + betAmount + "> Bet Amount: $" + betAmount + "</h2>");
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
    $(".orange").hide();
    $("#deal").hide();
    total = $("#bet").data();
    dealPlayer();
    dealCPU();
    blackjackCheck();
    $("#amount").text(balance);
  });
};

dealPlayer = function () {
  playerHandValue = 0;
  $("#playerHand").empty();
  for (let i = 0; i < playerCount; i++) {
    var playerCardImage = $("<img height=120px width=80px>");
    playerCardImage.attr("data-value", cardsValueArray[i]);
    playerCardImage.attr("src", cardsImageArray[i]);
    $("#playerHand").append(playerCardImage);
    playerHandValue += parseInt(cardsValueArray[i]);
  }
};


dealCPU = () => {
  dealerHandValue = 0;

  $("#dealerHand").empty();

  var hiddenDealerCard = $('<img height="120px" width="80px" id="hiddenDealerCard">');

  for (let iterator = 1; iterator < 2; iterator++){

    hiddenDealerCard.attr("src", "/assets/img/cardBack.png");

    $('#dealerHand').append(hiddenDealerCard);
  }

  for (let i = 28; i < dealerCount; i++) {
    hiddenDealerCard.attr("data-value", cardsValueArray[cardsValueArray.length - 1]);
    var cpuCardImage = $('<img height=120px width=80px id="showDealCard">');
    cpuCardImage.attr("data-value", cardsValueArray[i]);
    cpuCardImage.attr("src", cardsImageArray[i]);
    $("#dealerHand").append(cpuCardImage);
    dealerHandValue += parseInt(cardsValueArray[i]);
  }

  dealerHandValue += parseInt(cardsValueArray[cardsValueArray.length - 1]);
};

playerHit = () => {
  $("#hit").on("click", () => {
    var betAmount = parseInt(total.value);
    playerCount++;

    dealPlayer();

    if (playerHandValue > 21) {
      $("#playerBusted").fadeIn(2000).fadeOut(2000);

      $("#hit").hide();
      balance = balance - betAmount;
      console.log(balance);

      $("#stand").hide();

      $(".orange").show();

      $(".orange").on("click", () => {
        $(".orange").hide();
        $("#amount").text(balance);
        gameReset();
      });
    }
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

    $(".orange").show();

    $(".orange").on("click", () => {
      $(".orange").hide();
      gameReset();
    });
  } else if (playerHandValue < 21 && dealerHandValue === 21) {
    $("#stand").hide();
    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
    $("#hit").hide();
    balance = balance - betAmount;
    $("#dealerBlackjack").fadeIn(2000).fadeOut(2000);

    console.log("You Lose! Sad.");

    $(".orange").show();
    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
    $(".orange").on("click", () => {
      $(".orange").hide();
      gameReset();
    });
  } else if (playerHandValue === 21 && dealerHandValue < 21) {
    $("#stand").hide();

    $("#hit").hide();
    balance = balance + winAmount * 2;
    $("#blackjack").fadeIn(2000).fadeOut(2000);
    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
    $(".orange").show();

    $(".orange").on("click", () => {
      $(".orange").hide();
      
      gameReset();
    });
    //update database
    //Message?
  } else if (playerHandValue === 22 || dealerHandValue === 22){
    $("#tie").fadeIn(2000).fadeOut(2000);
    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
    $(".orange").show();
    
        $(".orange").on("click", () => {
          $(".orange").hide();
          
          gameReset();
        });
  }
};

$("#stand").on("click", () => {
  var idVal = $("#hiddenId").val();
  var betAmount = parseInt(total.value);

  function updateBalance(account) {
    $.ajax({
      method: "PUT",
      url: "/api/accounts",
      data: account
    }).done((data) => {
      // window.location.href = "/";
      // console.log(data);
    });
  }

  $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
  $("#stand").hide();
  $("#hit").hide();

  while (dealerHandValue < 17){
    dealerHit();
  }

  if (dealerHandValue > 21){
    $("#stand").hide();

    $("#hit").hide();

    balance = betAmount * 2 + balance;

    $("#dealerBusted").fadeIn(2000).fadeOut(2000);

    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");

    // $(".buttons").append(gameResetButton);
    $(".orange").show();

    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);

    $(".orange").on("click", () => {
      $(".orange").hide();
      gameReset();
    });
  } else if (playerHandValue > dealerHandValue){
    $("#winner").fadeIn(2000).fadeOut(2000);

    balance = betAmount * 2 + balance;

    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");

    // $(".buttons").append(gameResetButton);
    $(".orange").show();

    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);

    $(".orange").on("click", () => {
      $(".orange").hide();
      gameReset();
    });

    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
  } else if (dealerHandValue > playerHandValue) {
    $("#loser").fadeIn(2000).fadeOut(2000);

    balance = balance - betAmount;
    
    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");

    // $(".buttons").append(gameResetButton);
    $(".orange").show();

    $(".orange").on("click", () => {
      $(".orange").hide();
      gameReset();
    });

    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);
  } else {
    $("#tie").fadeIn(2000).fadeOut(2000);

    var gameResetButton = $("<button id=gameResetButton class=orange>Play Again</button>");

    // $(".buttons").append(gameResetButton);
    $(".orange").show();

    $("#hiddenDealerCard").attr("src", cardsImageArray[cardsValueArray.length - 1]);

    $(".orange").on("click", () => {
      $(".orange").hide();
      gameReset();
    }
  //update database
    );
  }

  var newbalance = {
    UserId: idVal,
    account_balance: balance,
    bet_amount: parseInt(total.value)
  }

  $("#amount").text(balance);

  updateBalance(newbalance);
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
  $("#amount").text(5000);
  $(".orange").hide();
  placeBets();
  getCards();
  dealHands();
  playerHit();
  dealerHit();
});