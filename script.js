/**
 * BLACKJACK GAME --- Web application to practice javascript. Implementing 
 * logic using a module controller method. 
 * Game controller, UI controller, & global app controller
 * 
 * Gameplay follows the traditional rules of Blackjack. 
 */

// GLOBAL VARIABLES
var suits = ["S", "H", "C", "D"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var imagePath, turn;
imagePath = '/resources/images/';


var mainContainer = document.querySelector('.MainContainer');
var resultLine = document.querySelector('.Result');
var resultMsg = document.querySelector('.Result2');
mainContainer.style.display = 'none';
resultLine.style.display = 'none';
resultMsg.style.display = 'none';

// GAME CONTROLLER
var gameController = (function () {

   var deck = [];

   var Card = function (suit, value, bjVal) {
      this.suit = suit;
      this.value = value;
      this.bjVal = bjVal;
   };

   var data = {
      hand: {
         dealer: [],
         player: []
      },
      score: {
         dealer: 0,
         player: 0
      }
   };

   return {

      createDeck: function () {
         // var deck = [];

         for (var i = 0; i < values.length; i++) {

            for (var j = 0; j < suits.length; j++) {
               if (i < 10) {
                  var card = new Card(suits[j], values[i], i + 1);
                  deck.push(card);
               } else {
                  var card = new Card(suits[j], values[i], 10);
                  deck.push(card);
               }
            }
         }
         return deck;
      },

      shuffleDeck: function (deck) {
         var x = deck.length - 1;
         var i, temp;

         while (x > -1) {
            i = Math.floor(Math.random() * 52);
            temp = deck[x];
            deck[x] = deck[i];
            deck[i] = temp;
            x--;
         }
         return deck;
      },

      deal: function (turn) {
         var card = deck.pop();

         data.hand[turn].push(card);

         if (card.value === 'A' && data.score[turn] < 11) {
            card.bjVal = 11;
         }

         if (turn === 'dealer') {
            data.score.dealer += card.bjVal;
         } else if (turn === 'player') {
            data.score.player += card.bjVal;
         }

      },

      getCard: function (turn) {
         var length = data.hand[turn].length - 1;
         return data.hand[turn][length];
      },

      addCard: function (card, turn) {

         data.hand[turn].push(card);

         if (card.value === 'A' && data.score[turn] < 11) {
            card.bjVal = 11;
         }

         if (turn === 'dealer') {
            data.score.dealer += card.bjVal;
         } else if (turn === 'player') {
            data.score.player += card.bjVal;
         }
      },

      getHand: function (player) {
         return data.hand[player];
      },

      getPointTotal: function (turn) {
         return data.score[turn];
      },

      gameOver: function () {
         data.hand.dealer = [];
         data.hand.player = [];
         data.score.dealer = 0;
         data.score.player = 0;
      },

      testing: function () {
         console.log(data);
      }
   };

})();

// UI CONTROLLER
var UIController = (function () {

   var DOMstrings = {
      startGameBtn: '.NewGameBtn',
      dealBtn: '.dealBtn',
      dcardContainer: '.DcardContainer',
      pcardContainer: '.PcardContainer',
      dscore: '#dealer-score',
      pscore: '#player-score',
      playBtnContainer: '.PlayBtnContainer',
      hitBtn: '#hitBtn',
      standBtn: '#standBtn',
      dcard1: '#dcard1',
      dcard2: '#dcard2',
      pcard1: '#pcard1',
      pcard2: '#pcard2',
      body: 'body'
   };

   return {

      getDOMstrings: function () {
         return DOMstrings;
      },

      startGame: function () {
         mainContainer.style.display = 'block';
         document.querySelector(DOMstrings.dcardContainer).style.visibility = 'hidden';
         document.querySelector(DOMstrings.pcardContainer).style.visibility = 'hidden';
         document.querySelector(DOMstrings.dscore).style.visibility = 'hidden';
         document.querySelector(DOMstrings.pscore).style.visibility = 'hidden';
         document.querySelector(DOMstrings.startGameBtn).style.display = 'none';
         document.querySelector(DOMstrings.playBtnContainer).style.display = 'none';
         document.querySelector(DOMstrings.body).style.background = 'url("resources/images/poker_table3.jpg")'

      },

      deal: function (dealerHand, playerHand) {

         document.querySelector(DOMstrings.dealBtn).style.visibility = 'hidden';
         var pcard1Img, dcard2Img, pcard2Img;

         pcard1Img = this.createImgFileName(playerHand[0]);
         dcard2Img = this.createImgFileName(dealerHand[1]);
         pcard2Img = this.createImgFileName(playerHand[1]);

         playerScore = gameController.getPointTotal(playerHand);
         dealerScore = gameController.getPointTotal(dealerHand);

         document.querySelector(DOMstrings.dscore).textContent = gameController.getPointTotal('dealer') - dealerHand[0].bjVal;
         document.querySelector(DOMstrings.pscore).textContent = gameController.getPointTotal('player');

         document.querySelector(DOMstrings.pcard1).src = pcard1Img;
         document.querySelector(DOMstrings.dcard2).src = dcard2Img;
         document.querySelector(DOMstrings.pcard2).src = pcard2Img;

         document.querySelector(DOMstrings.dcard1).style.visibility = 'visible';

         setTimeout(function () {
            document.querySelector(DOMstrings.pcard1).style.visibility = 'visible';
         }, 100);

         setTimeout(function () {
            document.querySelector(DOMstrings.dcard2).style.visibility = 'visible';
         }, 200);

         setTimeout(function () {
            document.querySelector(DOMstrings.pcard2).style.visibility = 'visible';
         }, 300);

         setTimeout(function () {
            document.querySelector(DOMstrings.dscore).style.visibility = 'visible';
         }, 400);
         setTimeout(function () {
            document.querySelector(DOMstrings.pscore).style.visibility = 'visible';
         }, 500);
         if (turn === 'player') {
            setTimeout(function () {
               document.querySelector(DOMstrings.playBtnContainer).style.display = 'inline-flex';
            }, 600);
            setTimeout(UIController.playerTurn, 600);
         }

      },

      createImgFileName: function (card) {
         var imgFileName;

         imgFileName = imagePath + card.value + card.suit + '.png';

         return imgFileName;
      },
      // Toggles turn indicator between player & dealer
      playerTurn: function () {
         document.querySelector('.Dealer').classList.toggle('active');
         document.querySelector('.Player').classList.toggle('active');
      },

      addCard: function (turn, card) {
         var html, newHtml, element;

         if (turn === 'player') {
            element = DOMstrings.pcardContainer;
            html = '<div class="Card"><img id="pcardAdd" src="%src%" alt="card 3">';
         } else if (turn === 'dealer') {
            element = DOMstrings.dcardContainer;
            html = '<div class="Card"><img id="dcardAdd" src="%src%" alt="card 3">';
         }

         cardImg = UIController.createImgFileName(card);
         newHtml = html.replace('%src%', cardImg);

         document.querySelector(DOMstrings.pscore).textContent = gameController.getPointTotal('player');
         document.querySelector(DOMstrings.dscore).textContent = gameController.getPointTotal('dealer');
         document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
         document.querySelector(element).style.visibility = 'visible';
      },

      flipDealerCard: function () {
         var dcard1Img, dealerScore, dealerHand;

         dealerHand = gameController.getHand('dealer');
         dcard1Img = UIController.createImgFileName(dealerHand[0]);
         document.querySelector(DOMstrings.dcard1).src = dcard1Img;
         dealerScore = gameController.getPointTotal('dealer');
         document.querySelector(DOMstrings.dscore).textContent = dealerScore;

         this.playerTurn();

         document.querySelector(DOMstrings.playBtnContainer).style.display = 'none';
      }

   };

})();

// GlOBAL APP CONTROLLER
var controller = (function (gameCtrl, UICtrl) {

   var card, deck, pScore, dScore, gameOver;

   var setupEventListeners = function () {
      var DOM = UICtrl.getDOMstrings();
      document.querySelector(DOM.startGameBtn).addEventListener('click', startGame);
      document.querySelector(DOM.dealBtn).addEventListener('click', deal);
      document.querySelector(DOM.hitBtn).addEventListener('click', hit);
      document.querySelector(DOM.standBtn).addEventListener('click', stand);
   };

   var startGame = function () {
      gameOver = false;
      UICtrl.startGame();
      deck = gameCtrl.createDeck();
      deck = gameCtrl.shuffleDeck(deck);
      console.log(deck);
   };

   var deal = function () {

      // Add dealt cards to game controller
      gameCtrl.deal('dealer');
      gameCtrl.deal('player');
      gameCtrl.deal('dealer');
      gameCtrl.deal('player');

      pScore = gameCtrl.getPointTotal('player');
      dScore = gameCtrl.getPointTotal('dealer');

      if (pScore == 21) {
         turn = 'dealer';
         controller.dealersTurn();
      } else {
         turn = 'player';
         
      }

      // Add dealt cards to the UI
      var dealerHand, playerHand;
      dealerHand = gameCtrl.getHand('dealer');
      playerHand = gameCtrl.getHand('player');
      UICtrl.deal(dealerHand, playerHand);

   };

   var hit = function () {

      // deal card in game controller
      gameCtrl.deal(turn);
      // get card dealt for UI
      card = gameCtrl.getCard(turn);

      var score = gameCtrl.getPointTotal(turn);

      if (score == 21) {
         // player blackjack, dealers turn
         controller.dealersTurn();

      } else if (score > 21) {
         // game over, bust

      }




      // deal card in UI
      UICtrl.addCard(turn, card);

      // next turn

   };

   var stand = function () {
      turn = 'dealer';
      controller.dealersTurn();
   };

   return {
      init: function () {
         console.log('Application has started');
         gameCtrl.gameOver();

         setupEventListeners();
      },

      dealersTurn: function () {
         UICtrl.flipDealerCard();
         console.log(pScore);
         while (gameOver == false) {
            dScore = gameCtrl.getPointTotal('dealer');
            pScore = gameCtrl.getPointTotal('player');

            if(dScore < pScore){
               gameCtrl.deal(turn);
               // get card dealt for UI
               card = gameCtrl.getCard(turn);

               UICtrl.addCard(turn, card);

               gameOver = false;
            } else if (dScore == pScore && dScore < 21){
                gameOver = true;
                
            }
            else{
               gameOver = true;
               
            }

         }
         console.log(dScore);
      },
      
      gameOver: function () {

      }
   };

})(gameController, UIController);

controller.init();