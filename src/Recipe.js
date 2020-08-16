import React from 'react'; 
import style from './recipe.module.css';


const Recipe = ({title, calories, image, ingredients}) =>{
    return(
        <div className = {style.recipe}>
            <h1>{title}</h1>
            {/* Ingredients is an array so you need to map */}
            <ol>
                {ingredients.map(ingredient =>(
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p className = 'calories'>Calories: {Math.trunc(calories)}</p>
            <img className ={style.image}src = {image} alt = 'food'/>
        </div>
    );
};

export default Recipe;