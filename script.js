/**
 * BLACKJACK GAME --- Web application to practice javascript. Implementing 
 * logic using a module controller method. 
 * Game controller, UI controller, & global app controller
 * 
 * Gameplay follows the traditional rules of Blackjack. 
 */

// GLOBAL VARIABLES
var suits = ["S", "H", "C", "D"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10","J", "Q", "K"];


var mainContainer = document.querySelector('.MainContainer');
mainContainer.style.display = 'none';

// GAME CONTROLLER
var gameController = (function () {

   var Card = function (suit, value, bjVal){
      this.suit = suit;
      this.value = value;
      this.bjVal = bjVal;
   };

   return {

      createDeck: function () {
          var deck = [];

          for(var i =0; i < values.length; i++){

            for(var j =0; j < suits.length; j++){
               var card = new Card(suits[j], values[i], i+1);
               deck.push(card);
            }
          }
          return deck;
      },

      shuffleDeck: function (deck) {
         var x = deck.length - 1;
         var i, temp;
         
         while(x > -1){
            i = Math.floor(Math.random() * 52);
            temp = deck[x];
            deck[x] = deck[i];
            deck[i] = temp;
            x--;
         }
         return deck;
      },

      getPointTotal: function (deck){

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

   return{

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
      
      deal: function (deck, index) {
         document.querySelector(DOMstrings.dealBtn).style.visibility = 'hidden';

         var card = deck[index].value + deck[index].suit;
        
         console.log(card);

         document.querySelector(DOMstrings.dscore).style.visibility = 'visible';
         document.querySelector(DOMstrings.pscore).style.visibility = 'visible';
         document.querySelector(DOMstrings.dcard1).style.visibility = 'visible';
         


         setTimeout(function(){
            document.querySelector(DOMstrings.playBtnContainer).style.display = 'inline-flex';},1000);

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
      //document.querySelector(DOM.hitBtn).addEventListener('click', /*player hits */);
      //document.querySelector(DOM.standBtn).addEventListener('click', /*player stands */);

   };

   var startGame = function () {
      UICtrl.startGame();
      deck = gameCtrl.createDeck();
      deck = gameCtrl.shuffleDeck(deck);
      console.log(deck)
   };

   var deal = function () {

      UICtrl.deal(deck, index);
      
   };

   return {
      init: function () {
         console.log('Application has started');
         index = 0;
         setupEventListeners();
      }
   };

})(gameController, UIController);

controller.init();