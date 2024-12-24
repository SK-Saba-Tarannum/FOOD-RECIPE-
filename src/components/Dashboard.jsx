import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [data2, setData2] = useState([]);

  const submithandler = (e) => {
    e.preventDefault();
    console.log(search);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData2(data.meals || []); 
      });
  }

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.meals || []); 
      });
  }, []);

  const navigate = useNavigate();
  const navigation = (idMeal) => {
    navigate("/recipe", { state: { id: idMeal } });  
  }
  const navigateToFavorite=useNavigate();
  const navigationToFavorite=()=>{
    navigateToFavorite("/Favorite")
  }


  return (
    <>
      <h1 className='text-6xl bg-black text-white text-center p-4 font-sans'>Babool Food Hut 🥗</h1>

      <div className='h-11 w-auto mt-6 flex flex-row justify-center items-center'>
        <div className='border-2 border-black w-auto h-auto flex justify-center items-center rounded-r-md'>
          <form onSubmit={submithandler} className='flex  justify-center align-middle'>
            <input 
              type="text" 
              value={search} 
              placeholder='Enter food name?' 
              // className='border-2 h-6 rounded-sm border-zinc-100 rounded-l-md w-60'
              className='border-2 h-6 rounded-sm mt-3 ml-4 border-zinc-100 rounded-l-md w-60 border-none outline-none '  
              onChange={(e) => setSearch(e.target.value)} 
            />
            <button className='bg-green-500 w-14 rounded-r-md p-2'>
              <img src="/search-interface-symbol.png" alt="" height="30px" width="30px" />
            </button>
          </form>
        </div>
        <button className='ml-7 bg-red-500 font-bold w-auto rounded-md  text-2xl p-1 border-2 border-black' onClick={navigationToFavorite}>⭐</button>

      </div>

      {/* <marquee  direction=" left" className="mt-5 bg-yellow-400 font-extrabold"> 50% off on all recepie</marquee> */}

      <div className='grid grid-cols-5 responsive pt-5  flex-wrap justify-center items-center gap-6'>
        {data2.map(({ idMeal, strMeal, strMealThumb, strArea }) => (
          <div key={idMeal} className="responsive-card p-2 bg-black text-center text-white flex flex-col items-center justify-center rounded-md">
            <h1 className='text-pink-600 text-2xl font-bold p-1'>{strMeal}</h1>
            <img src={strMealThumb} alt={strMeal} className="meal-thumb h-72 w-72 rounded-sm p-4" />
            <p>{strArea}</p>
            <button className='bg-green-600 w-full rounded-md text-black font-bold p-1' onClick={() => { navigation(idMeal) }}>
              Recipe
            </button>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-5 responsive p-10 flex-wrap justify-center items-center gap-6'>
        {data.map(({ idMeal, strMeal, strMealThumb, strArea }) => (
          <div key={idMeal} className="responsive-card p-2 bg-black text-center text-white flex flex-col items-center justify-center rounded-md">
            <h1 className='text-pink-600 text-2xl font-bold p-1'>{strMeal}</h1>
            <img src={strMealThumb} alt={strMeal} className="meal-thumb h-72 w-72 rounded-sm p-4" />
            <p>{strArea}</p>
            <button className='bg-green-600 w-full rounded-md text-black font-bold p-1' onClick={() => { navigation(idMeal) }}>
              Recipe
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;



