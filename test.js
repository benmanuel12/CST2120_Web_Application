const mtg = require('mtgsdk')

mtg.card.where({ name: '"Vigor"' }).then(cards => {
    cardDetails = cards[0];
    console.log(cards);
})