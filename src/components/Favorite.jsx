
import  { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";


function Favorite() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const submithandler = (e) => {
    e.preventDefault();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.meals && data.meals.length > 0) {
          const newFavorites = data.meals.map(meal => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strInstructions: meal.strInstructions,  // Recipe
          }));
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          setFavorites(newFavorites);
        }
      });
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = () => {
    localStorage.removeItem("favorites")
  };
  const navigate = useNavigate();
  const navigation = (idMeal) => {
    navigate("/recipe", { state: { id: idMeal } });  
  }


  return (
    <div>
      <h1 className='text-6xl bg-black text-white text-center p-4 font-sans'>My Favorite Food 🥗</h1>

      <div className='h-11 w-auto mt-6 flex flex-row justify-center items-center'>
        <div className='border-2 border-black w-auto h-auto flex justify-center items-center rounded-r-md'>
          <form onSubmit={submithandler}>
            <input type="text" value={search} placeholder='Enter your  favorite food name?'className=' border-none  pl-2 outline-none h-6 rounded-sm border-zinc-100 rounded-l-md w-60' onChange={(e) => setSearch(e.target.value)} />
            <button className='bg-green-500 w-14 rounded-r-md p-2'>
              Add
            </button>
          </form>
        </div>
      </div>

      <div className='mr-10 ml-10' >
        <h2 className="text-3xl flex text-white mb-4">My Favorite Meals</h2>
        <div className=" flex flex-col justify-between align-middle gap-6"> 
          {favorites.map(({ idMeal, strMeal, strMealThumb }) => (
            <div key={idMeal} className="favorite-card  w-full flex  border-black border-2 pl-10 pr-10 bg-black text-center text-white items-center justify-between gap-4 rounded-md">
              <h1 className='text-pink-600 text-2xl font-bold p-1'>{strMeal}</h1>
              <img src={strMealThumb} alt={strMeal} className="meal-thumb h-20 w-20 rounded-full p-4" />
              <div className='flex flex-col gap-2'>
              <button className='bg-green-600  rounded-md text-black font-bold p-1' onClick={()=>{navigation(idMeal)}}>Recipe</button>
              <button className='bg-red-600  rounded-md text-black font-bold p-1' onClick={() => {removeFromFavorites()}}>
                Remove
              </button>
              </div>
            </div>
          ))}
        </div>
     </div> 
    </div>
  );
}

export default Favorite;



