
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const {state} = useLocation();
  const {id} = state; 

  useEffect(() => {

    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json()) 
        .then((data) => setRecipe(data))
    }
  }, [id]); 

  if (!recipe) {
    return <div>Loading...</div>;
  }
  return (
    <div className='p-4 h-full  border-2 felx flex-col  bg-black text-white justify-center items-center'>
      <div className="p-6 bg-black h-full text-white flex flex-col items-center">
        <h1 className='  font-sans font-bold p-2 text-4xl text-pink-500 '>
        {recipe.meals[0].strMeal}</h1> 
        <img src={recipe.meals[0].strMealThumb} alt={recipe.meals[0].strMeal}  className='h-1/2 w-80 rounded-2xl'/>
        <p> <span className='font-extrabold text-green-800'>INGREDIENTS:</span>{recipe.meals[0].strIngredient1},{recipe.meals[0].strIngredient2},{recipe.meals[0].strIngredient3},{recipe.meals[0].strIngredient4},{recipe.meals[0].strIngredient5}</p>
        <p className=' text-white'> <span className='font-extrabold text-green-800'>RECIPE:</span> {recipe.meals[0].strInstructions}</p>
        <a href={recipe.meals[0].strSource}  className='text-2xl font-extrabold text-yellow-500'>Recipe Source</a>
        <a href={recipe.meals[0].strYoutube} className='text-2xl font-extrabold text-yellow-500'> <span className='text-4xl'>🔍</span>youtube</a> 
            
      </div>
    </div>
  );
}

export default Recipe;

