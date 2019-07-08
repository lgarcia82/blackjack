var suit = ["S", "H", "C", "D"];
var value = ["A","2","3","4","5","6","7","8","9","J","Q","K"]
var pokerValMax = 13;
var bjValMax = 11;
var ValueMin = 1;
var deckSize = 52;

createDeck();

var dcard1 = document.getElementById('dcard1');
var dcard2 = document.getElementById('dcard2');
var pcard1 = document.getElementById('pcard1');
var pcard2 = document.getElementById('pcard2');
dcard1.style.visibility = 'hidden';
dcard2.style.visibility = 'hidden';
pcard1.style.visibility = 'hidden';
pcard2.style.visibility = 'hidden';


class Card{
   constructor(suit, value, pokerVal, bjVal){
      this.suit = suit;
      this.value = value;
      this.pokerVal = pokerVal;
      this.bjVal = bjVal;
   }
}

document.querySelector('.btn-deal').addEventListener('click', function(){
     
   pcard1.src = "resources/images/AS.png";
   pcard1.style.visibility = 'visible';
   pcard1.style.display = 'inline';

   pcard2.src = "resources/images/QH.png";
   pcard2.style.visibility = 'visible';
   pcard2.style.display = 'inline';

   dcard1.src = "resources/images/red_back.png";
   dcard1.style.visibility = 'visible';
   dcard1.style.display = 'inline';

   dcard2.src = "resources/images/KC.png";
   dcard2.style.visibility = 'visible';
   dcard2.style.display = 'inline';
  
});

function createDeck() {
   
}