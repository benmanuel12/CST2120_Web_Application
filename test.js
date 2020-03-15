const mtg = require('mtgsdk')

mtg.card.where({ name: "Nissa, Vital Force" })
    .then(cards => {
        console.log(cards[0]) // "Squee, Goblin Nabob"
    })