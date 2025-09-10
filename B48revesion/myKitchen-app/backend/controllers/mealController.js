const Meal = require('../models/Meal');
const { fetchMealById } = require('../utils/theMealDB');

exports.getMealDetails = async (req, res) => {
  const mealId = req.params.id;
  let meal = await Meal.findOne({ mealId });
  if (!meal) {
    const data = await fetchMealById(mealId);
    if (!data) return res.status(404).json({ msg: 'Not found' });
    meal = await Meal.create({
      mealId: data.idMeal,
      name: data.strMeal,
      category: data.strCategory,
      area: data.strArea,
      instructions: data.strInstructions,
      thumbnail: data.strMealThumb,
      tags: data.strTags ? data.strTags.split(',') : [],
      ingredients: Array.from({ length: 20 }).map((_, i) => ({
        ingredient: data[`strIngredient${i+1}`],
        measure: data[`strMeasure${i+1}`]
      })).filter(({ ingredient }) => ingredient),
      raw: data
    });
  }
  res.json(meal);
};