const mtg = require('mtgsdk')

mtg.card.where({ set: 'ELD', pageSize: 1 })
    .then(cards => {
        for (x of cards) {
            console.log(x.name)
        }
    })