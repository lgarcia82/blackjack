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
var baseVal, imagePath;
imagePath = '/resources/images/';


var mainContainer = document.querySelector('.MainContainer');
mainContainer.style.display = 'none';

// GAME CONTROLLER
var gameController = (function () {

   var Card = function (suit, value, bjVal) {
      this.suit = suit;
      this.value = value;
      this.bjVal = bjVal;
   };

   var data = {
      Hand: {
         dealer: [],
         player: []
      }
   };

   return {
      createDeck: function () {
         var deck = [];

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

      getPointTotal: function (hand) {
         var pointTotal = 0;
         for (var i = 0; i < hand.length; i++) {

            pointTotal += hand[i].bjVal;
         }
         return pointTotal;
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
      pcard2: '#pcard2'
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
      },

      deal: function (dealerHand, playerHand) {

         document.querySelector(DOMstrings.dealBtn).style.visibility = 'hidden';

         dcard1Img = UIController.createImgFileName(dealerHand[0]);
         pcard1Img = UIController.createImgFileName(playerHand[0]);
         dcard2Img = UIController.createImgFileName(dealerHand[1]);
         pcard2Img = UIController.createImgFileName(playerHand[1]);

         playerScore = gameController.getPointTotal(playerHand);
         dealerScore = gameController.getPointTotal(dealerHand)

         document.querySelector(DOMstrings.dscore).textContent = dealerScore - dealerHand[0].bjVal;
         document.querySelector(DOMstrings.pscore).textContent = playerScore;

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
         setTimeout(function () {
            document.querySelector(DOMstrings.playBtnContainer).style.display = 'inline-flex';
         }, 500);

      },

      createImgFileName: function (card) {
         var imgFileName;

         imgFileName = imagePath + card.value + card.suit + '.png';

         return imgFileName;

      },

      addCard: function (card, play) {
         var html, newHtml, element;

         if (play === 'player') {
            element = DOMstrings.pcardContainer;
            html = '<div class="Card"><img id="pcardAdd" src="%src%" alt="card 3">';
         } else if (play === 'dealer') {
            element = DOMstrings.dcardContainer;
            html = '<div class="Card"><img id="dcardAdd" src="%src%" alt="card 3">';
         }

         cardImg = UIController.createImgFileName(card);
         console.log(cardImg);
         newHtml = html.replace('%src%', cardImg);


         document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      }

   };

})();

// GlOBAL APP CONTROLLER
var controller = (function (gameCtrl, UICtrl) {

   var deck, index;
   var dealerHand = [];
   var playerHand = [];

   var setupEventListeners = function () {
      var DOM = UICtrl.getDOMstrings();
      document.querySelector(DOM.startGameBtn).addEventListener('click', startGame);
      document.querySelector(DOM.dealBtn).addEventListener('click', deal);
      document.querySelector(DOM.hitBtn).addEventListener('click', hit);

   };

   var startGame = function () {
      UICtrl.startGame();
      deck = gameCtrl.createDeck();
      deck = gameCtrl.shuffleDeck(deck);
   };

   var deal = function () {
      dealerHand.push(deck.pop());
      playerHand.push(deck.pop());
      dealerHand.push(deck.pop());
      playerHand.push(deck.pop());
      console.log(dealerHand);
      UICtrl.deal(dealerHand, playerHand);

   };

   var hit = function () {
      var pcard3 = deck.pop();
      UICtrl.addCard(pcard3);
   };

   return {
      init: function () {
         console.log('Application has started');
         baseVal = 0;
         setupEventListeners();
      }
   };

})(gameController, UIController);

controller.init();