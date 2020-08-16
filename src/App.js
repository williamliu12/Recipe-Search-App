import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';
require('dotenv').config();

function App() {

  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  //Recipe state
  const [recipes, setRecipes] = useState([]);

  //Search state
  const [search, setSearch] = useState('');

  //Query state (What the API will pull up when you input it into the link below)
  const [query, setQuery] = useState('');

  useEffect(() => {
    getRecipes();
  }, [query]);

  //Retrieves data from external API
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits); //Sets the data to recipes and changes everytime the data changes
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value); //Input changes when you type so you can actually search
  };

  const getSearch = e => {
    e.preventDefault(); //Stops rerendering when you type just one letter
    setQuery(search); //Sets the query to search's value so what you type in is what it will search/fetch
    setSearch(''); //Clears the search bar after each search
    var placeHolder = document.querySelector('.placeholder');
    var title = document.querySelector('.intro-screen');
    placeHolder.style.display = 'none';
    title.style.display = 'none';
  }

  return (
    <div className="App">
      <div className='intro-screen'>
        Recipe search app
      </div>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} placeholder = 'Search for recipes (ex. Chicken)' />
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className = 'placeholder'></div>
      {/* Taking the data from the state and passing it down to the prop in Recipe.js */}
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
}

export default App;
