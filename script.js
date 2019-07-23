var suit = ["S", "H", "C", "D"];
var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
var pokerValMax = 13;
var bjValMax = 11;
var ValueMin = 1;
var deckSize = 52;



/* var mainContainer = document.querySelector('.MainContainer');
mainContainer.style.display = 'none'; */



/*class Card {
   constructor(suit, value, pokerVal, bjVal) {
      this.suit = suit;
      this.value = value;
      this.pokerVal = pokerVal;
      this.bjVal = bjVal;
   }
}*/


function createDeck() {

   var deck = new Array();

   console.log(deck);
}

var gameController = (function () {


})();

var UIController = (function () {

/*    document.querySelector('.btn-deal').addEventListener('click', function () {

      mainContainer.style.display = 'block';
      var dcard1 = document.getElementById('dcard1');
      var dcard2 = document.getElementById('dcard2');
      var pcard1 = document.getElementById('pcard1');
      var pcard2 = document.getElementById('pcard2');

      dcard1.style.visibility = 'hidden';
      dcard2.style.visibility = 'hidden';
      pcard1.style.visibility = 'hidden';
      pcard2.style.visibility = 'hidden';

   }); */

})();

var controller = (function (gameCtrl, UICtrl) {


})(gameController, UIController);