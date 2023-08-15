// import articles from '../data/data.json';
// import {useDispatch } from 'react-redux'

const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';

 

export const loadArticles = (payload) => {
  return {
    type: LOAD_ARTICLES,
    payload
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article
  };
};

export const fetchArticles = () => async (dispatch) => {
  const response = await fetch('/api/articles/'); 
  
  const articles = await response.json(); 
  
  dispatch(loadArticles(articles)); 
}

//Write Article thunk


export const writeArticle = (payload) => async (dispatch) => {
    const res = await fetch('/api/articles/', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (res.ok){
      const article = await res.json(); 
      dispatch(addArticle(article))
    }
}


const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.artcles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;