/**
 * BLACKJACK GAME --- Web application to practice javascript. Implementing
 * logic using a module controller architecture.
 * Game controller, UI controller, & global app controller
 *
 * Gameplay follows the traditional rules of Blackjack.
 */

// GLOBAL VARIABLES
const suits = ['S', 'H', 'C', 'D']
const values = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K'
]

const TURN = { DR: 'dealer', PR: 'player' }

const imagePath = '/images/'
const cardBack = imagePath + 'red_back.png'

const mainContainer = document.querySelector('.MainContainer')
const resultDetail = document.querySelector('.gameDetail')
const resultDisplay = document.querySelector('.gameResult')

// SET DISPLAYS
mainContainer.style.display = 'none'
resultDetail.style.display = 'none'
resultDisplay.style.display = 'none'

// GAME CONTROLLER
const gameController = (function () {
  let deck = []

  class Card {
    constructor (suit, value, bjVal) {
      this.suit = suit
      this.value = value
      this.bjVal = bjVal
    }
  }

  var data = {
    hand: {
      dealer: [],
      player: []
    },
    score: {
      dealer: 0,
      player: 0
    }
  }

  function createDeck () {
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < suits.length; j++) {
        if (i < 10) {
          const card = new Card(suits[j], values[i], i + 1)
          deck.push(card)
        } else {
          const card = new Card(suits[j], values[i], 10)
          deck.push(card)
        }
      }
    }
    return deck
  }

  function shuffleDeck (deck) {
    var x = deck.length - 1
    var i, temp

    while (x > -1) {
      i = Math.floor(Math.random() * 52)
      temp = deck[x]
      deck[x] = deck[i]
      deck[i] = temp
      x--
    }
    return deck
  }

  return {
    getDeck: function () {
      return shuffleDeck(createDeck())
    },

    deal: function () {
      let turn

      for (let i = 0; i < 4; i++) {
        let card = deck.pop()
        console.log(card)
        if (i % 2 === 0) {
          turn = 'dealer'
        } else {
          turn = 'player'
        }
        data.hand[turn].push(card)

        if (card.value === 'A' && data.score[turn] < 11) {
          card.bjVal = 11
        }

        data.score[turn] += card.bjVal
      }

      console.log(data.score.player, data.score.dealer)
    },

    getHand: function (player) {
      return data.hand[player]
    },

    getPointTotal: function (turn) {
      return data.score[turn]
    },

    dealCard: function (turn) {
      let card = deck.pop()
      console.log(card)
      if (card.value === 'A' && data.score[turn] < 11) {
        card.bjVal = 11
      }
      data.score[turn] += card.bjVal
      console.log(data.score[turn])
      return card
    },

    newGame: function() {
      data.hand.dealer = []
      data.hand.player = []
      data.score.dealer = 0
      data.score.player = 0
    }

  }
})()

// DISPLAY CONTROLLER
const UIController = (function () {
  const DOMstrings = {
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
    body: 'body',
    Card: '.Card'
  }

  function createImgFileName (card) {
    return imagePath + card.value + card.suit + '.png'
  }

  return {
    getDOMstrings: function () {
      return DOMstrings
    },

    startGame: function () {
      mainContainer.style.display = 'block'
      document.querySelector(DOMstrings.dcardContainer).style.visibility =
        'hidden'
      document.querySelector(DOMstrings.pcardContainer).style.visibility =
        'hidden'
      document.querySelector(DOMstrings.dscore).style.visibility = 'hidden'
      document.querySelector(DOMstrings.pscore).style.visibility = 'hidden'
      document.querySelector(DOMstrings.startGameBtn).style.display = 'none'
      document.querySelector(DOMstrings.playBtnContainer).style.display = 'none'
      document.querySelector(DOMstrings.body).style.background =
        'url("images/poker_table3.jpg")'
    },

    deal: function (dealerHand, playerHand) {

      document.querySelector(DOMstrings.dcardContainer).style.visibility =
        'visible'
      document.querySelector(DOMstrings.pcardContainer).style.visibility =
        'visible'

      document.querySelector(DOMstrings.dealBtn).style.display = 'none'
    
      let pcard1Img, dcard2Img, pcard2Img

      pcard1Img = createImgFileName(playerHand[0])
      dcard2Img = createImgFileName(dealerHand[1])
      pcard2Img = createImgFileName(playerHand[1])

      playerScore = gameController.getPointTotal('player')
      dealerScore = gameController.getPointTotal('dealer')

      document.querySelector(DOMstrings.dscore).textContent =
        dealerScore - dealerHand[0].bjVal
      document.querySelector(DOMstrings.pscore).textContent = playerScore

      document.querySelector(DOMstrings.dcard1).src = cardBack
      document.querySelector(DOMstrings.pcard1).src = pcard1Img
      document.querySelector(DOMstrings.dcard2).src = dcard2Img
      document.querySelector(DOMstrings.pcard2).src = pcard2Img

      document.querySelector(DOMstrings.dcard1).style.visibility = 'visible'

      setTimeout(function () {
        document.querySelector(DOMstrings.pcard1).style.visibility = 'visible'
      }, 100)

      setTimeout(function () {
        document.querySelector(DOMstrings.dcard2).style.visibility = 'visible'
      }, 200)

      setTimeout(function () {
        document.querySelector(DOMstrings.pcard2).style.visibility = 'visible'
      }, 300)

      setTimeout(function () {
        document.querySelector(DOMstrings.dscore).style.visibility = 'visible'
      }, 400)

      setTimeout(function () {
        document.querySelector(DOMstrings.pscore).style.visibility = 'visible'
      }, 500)

      setTimeout(function () {
        document.querySelector(DOMstrings.playBtnContainer).style.display =
          'inline-block'
      }, 600)
    },

    addCard: function (turn, card) {
      var html, newHtml, element

      if (turn === 'player') {
        element = DOMstrings.pcardContainer
        html = '<div class="Card"><img id="pcardAdd" src="%src%" alt="card 3">'
      } else if (turn === 'dealer') {
        element = DOMstrings.dcardContainer
        html = '<div class="Card"><img id="dcardAdd" src="%src%" alt="card 3">'
      }

      cardImg = createImgFileName(card)
      newHtml = html.replace('%src%', cardImg)

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
      document.querySelector(element).style.visibility = 'visible'
    },

    resetGame: function (){

      // remove all cards from display
      let playCont = document.querySelector(DOMstrings.pcardContainer)
      let dealCont = document.querySelector(DOMstrings.dcardContainer)

      let child = playCont.lastElementChild
      let x = playCont.children.length
      while(x > 2){
        playCont.removeChild(child)
        child = playCont.lastElementChild
        x--
      }

      playCont.children[0].children[0].style.visibility = 'hidden'
      playCont.children[1].children[0].style.visibility = 'hidden'
      
      child = dealCont.lastElementChild
      x = dealCont.children.length
      while(x > 2){
        dealCont.removeChild(child)
        child = dealCont.lastElementChild
        x--
      }

      dealCont.children[0].children[0].style.visibility = 'hidden'
      dealCont.children[1].children[0].style.visibility = 'hidden'

      // reset scores
      document.querySelector(DOMstrings.dscore).textContent = 0
      document.querySelector(DOMstrings.pscore).textContent = 0
    },

    updateScore: function (turn) {
      let dom = ''
      if(turn === 'dealer')
        dom = DOMstrings.dscore
      else
        dom = DOMstrings.pscore

      document.querySelector(dom).textContent = gameController.getPointTotal(turn)
    },

    togPlayBtn: function () {

      let tog = document.querySelector(DOMstrings.playBtnContainer).style.display
      
      if(tog  === 'none'){
        document.querySelector(DOMstrings.playBtnContainer).style.display = 'inline-flex'
      } else {
        document.querySelector(DOMstrings.playBtnContainer).style.display = 'none'
      } 
    },

    flipDealerCard: function (card) {
      let dcard1Img, dealerScore

      dcard1Img = createImgFileName(card)
      document.querySelector(DOMstrings.dcard1).src = dcard1Img
      dealerScore = gameController.getPointTotal('dealer')
      document.querySelector(DOMstrings.dscore).textContent = dealerScore
    }, 

    togDealBtn: function () {
      let tog = document.querySelector(DOMstrings.startGameBtn).style.display
      if(tog  === 'none'){
        document.querySelector(DOMstrings.dealBtn).style.display = 'block'
      } else {
        document.querySelector(DOMstrings.dealBtn).style.display = 'none'
      } 
    },

    displayResult: function (result) {

      // DISPLAY BUST
      if(result === 'bust'){
        resultDetail.textContent = 'BUST'
        resultDetail.style.display = 'block'
        resultDisplay.textContent = 'DEALER WINS'
        resultDisplay.style.display = 'block'
      }
      // DISPLAY DEALER WINS
      else if(result === 'dealerWins'){
        resultDisplay.textContent = 'Dealer Wins'
        resultDisplay.style.display = 'block'
      }
      // DISPLAY PLAYER WINS
      else if(result === 'playerWins'){
        resultDisplay.textContent = 'Player Wins'
        resultDisplay.style.display = 'block'
      }
      // DISPLAY PUSH, NO WINNER
      else if(result === 'push'){
        resultDetail.textContent = 'PUSH'
        resultDetail.style.display = 'block'
      }

    },

    clearResults: function() {
      resultDetail.style.display = 'none'
      resultDisplay.style.display = 'none'
    }
  }
})()

// GLOBAL APP CONTROLLER
const controller = (function (gameCtrl, UICtrl) {
  let deck = []

  let setupEventListeners = function () {
    const DOM = UICtrl.getDOMstrings()
    document
      .querySelector(DOM.startGameBtn)
      .addEventListener('click', startGame)
    document.querySelector(DOM.dealBtn).addEventListener('click', deal)
    document.querySelector(DOM.hitBtn).addEventListener('click', hit)
    document.querySelector(DOM.standBtn).addEventListener('click', stand)
  }

  let startGame = function () {
    UICtrl.startGame()
    deck = gameCtrl.getDeck()

    console.log(deck)
  }

  let deal = function () {
    // Add dealt cards to game controller
    gameCtrl.deal()

    let dealerHand, playerHand
    dealerHand = gameCtrl.getHand(TURN.DR)
    playerHand = gameCtrl.getHand(TURN.PR)
    
    // Add dealt cards to the UI
    UICtrl.deal(dealerHand, playerHand)
    let pScore = gameCtrl.getPointTotal(TURN.PR)
    if(pScore === 21){
      // HIDE GAME BUTTONS, FLIP DEALERS CARD OVER, 
      UICtrl.togPlayBtn()
      
      let dealerHand = gameCtrl.getHand(TURN.DR)
      setTimeout(function () {
        UICtrl.flipDealerCard(dealerHand[0])
      }, 2000)

      //RUN DEALER'S TURN
      dealersTurn2()

    }
  }

  let hit = function () {
    
    let card = gameCtrl.dealCard(TURN.PR)
    let pScore = gameCtrl.getPointTotal(TURN.PR)

    UICtrl.addCard(TURN.PR, card)
    UICtrl.updateScore(TURN.PR)

    if(pScore > 21){
      // PLAYER BUST, 
      // FLIP DEALERS CARD OVER & DISPLAY DEALER'S SCORE
      let dealerHand = gameCtrl.getHand(TURN.DR)
      
      UICtrl.flipDealerCard(dealerHand[0])
      UICtrl.displayResult('bust')
      
      //HIDE GAME BUTTONS, 
      UICtrl.togPlayBtn()

      setTimeout(function () {
        UICtrl.resetGame()
      }, 2000)

      // REVEAL NEWGAME BUTTON
      setTimeout(function () {
        UICtrl.clearResults()
        UICtrl.togDealBtn()
        gameCtrl.newGame()
      }, 3000)
      
    } else if( pScore === 21) {
      // HIDE GAME BUTTONS, FLIP DEALERS CARD OVER, 
      UICtrl.togPlayBtn()
      
      let dealerHand = gameCtrl.getHand(TURN.DR)
      setTimeout(function () {
        UICtrl.flipDealerCard(dealerHand[0])
      }, 2000)

      //RUN DEALER'S TURN
      dealersTurn2()
    }
    

  }

  let stand = function () {
    UICtrl.togPlayBtn()
    let dealerHand = gameCtrl.getHand(TURN.DR)

    setTimeout(function () {
      UICtrl.flipDealerCard(dealerHand[0])
    }, 1000)

    // RUN DEALER'S TURN
    setTimeout(function () {
      dealersTurn1()
    }, 2000)
    
  }

  //scenario 1 - player stands
  let dealersTurn1 = function () {
    let gameOver = false
    let dScore, pScore
    setInterval(() => {
      while(!gameOver){
        dScore = gameCtrl.getPointTotal(TURN.DR)
        pScore = gameCtrl.getPointTotal(TURN.PR)
  
        console.log('ds: ' + dScore + ' ps: ' + pScore)
  
        if(dScore > pScore && dScore <= 21) {
          console.log('case 1')
          gameOver = true
          UICtrl.displayResult('dealerWins')
  
          setTimeout(function () {
            UICtrl.resetGame()
          }, 2000)
    
          // REVEAL NEWGAME BUTTON
          setTimeout(function () {
            UICtrl.clearResults()
            UICtrl.togDealBtn()
            gameCtrl.newGame()
          }, 3000)
          
        } else if(dScore <= pScore && dScore < 21){
          console.log('case 2')
          
          let card = gameCtrl.dealCard(TURN.DR)
          UICtrl.addCard(TURN.DR, card)
          UICtrl.updateScore(TURN.DR)
          
        } else if(dScore === 21){
          console.log('case 3')
          gameOver = true
  
          UICtrl.displayResult('dealerWins')
  
          setTimeout(function () {
            UICtrl.resetGame()
          }, 2000)
    
          // REVEAL NEWGAME BUTTON
          setTimeout(function () {
            UICtrl.clearResults()
            UICtrl.togDealBtn()
            gameCtrl.newGame()
          }, 3000)
  
        } else if(dScore > 21){
          console.log('case 4')
          gameOver = true
  
          UICtrl.displayResult('playerWins')
  
          setTimeout(function () {
            UICtrl.resetGame()
          }, 2000)
    
          // REVEAL NEWGAME BUTTON
          setTimeout(function () {
            UICtrl.clearResults()
            UICtrl.togDealBtn()
            gameCtrl.newGame()
          }, 3000)
        }
      }
      
    }, 1000);
    

  }

  // scenario 2 - player hits 21
  let dealersTurn2 = function () {
    let gameOver = false
    let dScore, pScore
    setInterval(() => {
      while(!gameOver){
        dScore = gameCtrl.getPointTotal(TURN.DR)
        pScore = gameCtrl.getPointTotal(TURN.PR)
  
        if(dScore <= pScore && dScore < 21){
          let card = gameCtrl.dealCard(TURN.DR)
          UICtrl.addCard(TURN.DR, card)
          UICtrl.updateScore(TURN.DR)
        } else if(dScore === 21){
          // push
          gameOver = true
          UICtrl.displayResult('push')
          setTimeout(function () {
            UICtrl.resetGame()
          }, 2000)
    
          // REVEAL NEWGAME BUTTON
          setTimeout(function () {
            UICtrl.clearResults()
            UICtrl.togDealBtn()
            gameCtrl.newGame()
          }, 3000)
        } else if(dScore > 21){
          gameOver = true

          UICtrl.displayResult('playerWins')
  
          setTimeout(function () {
            UICtrl.resetGame()
          }, 2000)
    
          // REVEAL NEWGAME BUTTON
          setTimeout(function () {
            UICtrl.clearResults()
            UICtrl.togDealBtn()
            gameCtrl.newGame()
          }, 3000)
        }
      }
    }, 1000);
   
  }

  return {
    init: function () {
      console.log('Application has started')
      setupEventListeners()
    }
  }
})(gameController, UIController)

controller.init()
