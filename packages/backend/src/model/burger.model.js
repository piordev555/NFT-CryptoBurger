const mongoose = require('mongoose');

const { Schema } = mongoose;

const BurgerSchema = new Schema({
  tokenId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  external_url: {
    type: String,
  },
  price: {
    type: Number,
  },
  level: {
    type: Number,
  },
  background_color: {
    type: String,
  },
  attributes: [
    {
      trait_type: {
        type: String,
      },
      value: {
        type: String,
      },
      rarity: {
        type: String,
      },
      name: {
        type: String
      },
      rarity_id: {
        type: Number,
      },
      imageUrl: {
        type: String,
      },
      type: {
        type: String
      }
    },
  ],
});

module.exports = Burger = mongoose.model('Burger', BurgerSchema);
