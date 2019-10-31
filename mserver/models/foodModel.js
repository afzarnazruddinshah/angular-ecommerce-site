const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    calories: {
      type: Number,
      validate(value) { 
        if (value < 0) throw new Error("Negative calories aren't real.");
      }
    },
  });
  
  const Food = mongoose.model("Food", FoodSchema);
  module.exports = Food;

  