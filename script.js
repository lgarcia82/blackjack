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

      getPointTotal: function (deck) {

      },

      getCardFn: function (deck) {

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

      deal: function (deck, baseVal) {


         var gameStartIndex = baseVal;
         // MAKE A FUNCTION TO RETURN A CARD FILENAME FOR PING IMAGE

         var dcard1, pcard1, dcard2, pcard2, playerScore, dealerScore, card;
         dcard1 = deck[baseVal].value + deck[baseVal].suit;
         pcard1 = deck[baseVal + 1].value + deck[baseVal + 1].suit;
         dcard2 = deck[baseVal + 2].value + deck[baseVal + 2].suit;
         pcard2 = deck[baseVal + 3].value + deck[baseVal + 3].suit;

         playerScore = deck[1].bjVal;
         dealerScore = deck[2].bjVal;
         card = deck[baseVal].value + deck[baseVal].suit;

         document.querySelector(DOMstrings.dealBtn).style.visibility = 'hidden';


         document.querySelector(DOMstrings.dscore).textContent = '0';
         document.querySelector(DOMstrings.pscore).textContent = '0';

         document.querySelector(DOMstrings.dscore).textContent = dealerScore;
         document.querySelector(DOMstrings.pscore).textContent = playerScore;

         document.querySelector(DOMstrings.pcard1).src = imagePath + pcard1 + '.png';
         document.querySelector(DOMstrings.dcard2).src = imagePath + dcard2 + '.png';
         document.querySelector(DOMstrings.pcard2).src = imagePath + pcard2 + '.png';

         document.querySelector(DOMstrings.dscore).style.visibility = 'visible';
         document.querySelector(DOMstrings.pscore).style.visibility = 'visible';

         playerScore = deck[1].bjVal + deck[3].bjVal;
         document.querySelector(DOMstrings.pscore).textContent = playerScore;

         document.querySelector(DOMstrings.dcard1).style.visibility = 'visible';

         setTimeout(function () {
            document.querySelector(DOMstrings.pcard1).style.visibility = 'visible';
         }, 1000);

         setTimeout(function () {
            document.querySelector(DOMstrings.dcard2).style.visibility = 'visible';
         }, 2000);

         setTimeout(function () {
            document.querySelector(DOMstrings.pcard2).style.visibility = 'visible';
         }, 3000);
         // document.querySelector(DOMstrings.dcard2).style.visibility = 'visible';
         //document.querySelector(DOMstrings.pcard2).style.visibility = 'visible';

         setTimeout(function () {
            document.querySelector(DOMstrings.playBtnContainer).style.display = 'inline-flex';
         }, 4000);

      },

      createImgFileName: function (deck) {
         var imgFileName;

         imgFileName = deck

         return imgFileName;

      }
   };

})();

// GlOBAL APP CONTROLLER
var controller = (function (gameCtrl, UICtrl) {

   var deck, index;
   var setupEventListeners = function () {
      var DOM = UICtrl.getDOMstrings();
      document.querySelector(DOM.startGameBtn).addEventListener('click', startGame);
      document.querySelector(DOM.dealBtn).addEventListener('click', deal);

   };

   var startGame = function () {
      UICtrl.startGame();
      deck = gameCtrl.createDeck();
      deck = gameCtrl.shuffleDeck(deck);
      console.log(deck)
   };

   var deal = function () {

      UICtrl.deal(deck, baseVal);

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