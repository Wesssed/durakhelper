const cardpool = document.getElementById("cardpool");
const deckselector = document.getElementById("deckcount");

const suits = ["D", "H", "S", "C"];
const cardlist = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"];

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;

    this.Touch = 0;

    const _cardPool = document.getElementById("cardpool");
    
    this.element = document.createElement("button");
    this.element.className = "card";
    this.element.id = this.rank + this.suit;
    this.element.style.background = `url('./img/${this.rank}${this.suit}.png') top left no-repeat`;
    this.element.style.backgroundSize = "cover";
    this.element.addEventListener("click", () => this.press());

    _cardPool.appendChild(this.element);
  }

  press = () => {
    this.Touch++;
    let preset;

    switch (this.Touch) {
      case 1:
        preset = "brightness(0.3) blur(1.3px)";
        break;
      case 2:
        preset = "drop-shadow(0 0 1.5rem crimson) brightness(1.1)";
        break;

      default:
        preset = "";
        this.Touch = 0; //reset the touch count
        break;
    }

    this.element.style.filter = preset;
    console.log(
      `Debug: ${this.rank + this.suit} has been pressed. [${this.Touch}]`
    );
  };

  reset = () => {
    this.Touch = 0;
    this.element.style.filter = "";
  };
}

Deck = {
  DrawCount: 0,

  DrawCards: (count) => {
    Deck.DrawCount++;

    cardlist.forEach((rank) => {
      if (count <= 0) return;

      suits.map((suit) => new Card(suit, rank));

      count -= 4;
    });
    console.log(`Debug: Card drawing are finised. [${Deck.DrawCount} DRAW]`);
  },

  ResetCards: () => {
    cardpool.innerHTML = "";
    console.log("Debug: Deck reset");
  },

  NewRound: () => {
    const count = parseInt(deckselector.value);
    Deck.ResetCards();
    Deck.DrawCards(count);
  }
};

window.onload = Deck.DrawCards(); //Loading cards after page was loaded

deckselector.addEventListener("change", () => {
  const count = parseInt(deckselector.value);
  Deck.ResetCards();
  Deck.DrawCards(count);
});
