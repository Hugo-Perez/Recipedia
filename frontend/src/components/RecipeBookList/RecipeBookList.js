import React from 'react';
import './RecipeBookList.css';

import RecipeBookDisplay from '../Recipe/RecipeBookDisplay';

const RecipeBookList = ({recipeBooks}) => {
  console.log(recipeBooks);
  return(
    <>
      {recipeBooks?.map((book) => <RecipeBookDisplay key={book.id} recipeBook={book} />)}
    </>
  );
};

export default RecipeBookList;
