const axios = require('axios');
const BASE = 'https://www.themealdb.com/api/json/v1/1';

async function fetchMealById(id){
    const {data} = await axios.get('${BASE}/lookup.php?i=${id}');
    return data.meals?.[0];
}
module.exports = {fetchMealById};