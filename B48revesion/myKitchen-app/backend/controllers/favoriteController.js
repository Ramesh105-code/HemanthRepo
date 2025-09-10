const User = require('../models/User');
const Meal = require('../models/Meal');
const { fetchMealById } = require('../utils/theMealDB');

exports.addFavorite = async (req, res) => {
  const { mealId } = req.body;
  const mealData = await fetchMealById(mealId);
  if (!mealData) return res.status(404).json({ msg: 'Invalid meal' });

  let meal = await Meal.findOne({ mealId });
  if (!meal) {
    meal = await Meal.create({
      mealId: mealData.idMeal,
      name: mealData.strMeal,
      category: mealData.strCategory,
      area: mealData.strArea,
      instructions: mealData.strInstructions,
      thumbnail: mealData.strMealThumb,
      tags: mealData.strTags ? mealData.strTags.split(',') : [],
      ingredients: Array.from({ length: 20 }).map((_, i) => ({
        ingredient: mealData[`strIngredient${i+1}`],
        measure: mealData[`strMeasure${i+1}`]
      })).filter(({ ingredient }) => ingredient),
      raw: mealData
    });
  }

  const user = await User.findById(req.userId);
  if (!user.favorites.includes(meal._id)) {
    user.favorites.push(meal._id);
    await user.save();
  }
  await user.populate('favorites').execPopulate();
  res.json(user.favorites);
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.userId).populate('favorites');
  res.json(user.favorites);
};

exports.removeFavorite = async (req, res) => {
  const { mealId } = req.body;
  const meal = await Meal.findOne({ mealId });
  if (!meal) return res.status(404).json({ msg: 'Invalid meal' });

  await User.findByIdAndUpdate(req.userId, { $pull: { favorites: meal._id } });
  const user = await User.findById(req.userId).populate('favorites');
  res.json(user.favorites);
};