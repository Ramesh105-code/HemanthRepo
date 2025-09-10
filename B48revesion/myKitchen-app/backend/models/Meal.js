const mongoose = require('mongoose');
const mealSchema = new mongoose.Schema({
    mealId: { type: String, unique: true},
    name:String,
    category:String,
    area : String,
    instructions: String,
    thumbnail: String,
    tags:[String],
    ingredients: [{ ingredient: String, measure: String}],
    raw: mongoose.Schema.Types.Mixed
});
module.export = mongoose.model('Meal',mealSchema);