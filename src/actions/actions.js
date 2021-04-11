import axios from 'axios';
import CREDENTIALS from '../utility/credentials';


// Actions for accessing route endpoints

//Gets search results
export const getSearchResults = (search_type,searchText, page) => {
  if (search_type === "search") {
    var res = axios.get(`${CREDENTIALS.BASE_URL}/2.2/search?page=${page}&pagesize=10&order=desc&sort=votes&intitle=${searchText}&site=stackoverflow&filter=!--1nZwT40HJH&key=${CREDENTIALS.KEY}`);
    return res;
  }
  else{
    var res = axios.get(`${CREDENTIALS.BASE_URL}/2.2/similar?page=${page}&pagesize=10&order=desc&sort=relevance&title=${searchText}&site=stackoverflow&filter=!--1nZwT40HJH&key=${CREDENTIALS.KEY}`);
    return res;
  }
};


//Gets question details
export const getQuestionDetails = (id) => {
  var res = axios.get(`${CREDENTIALS.BASE_URL}/2.2/questions/${id}?order=desc&sort=votes&site=stackoverflow&filter=!--1nZwT40HJH&key=${CREDENTIALS.KEY}`);
  return res;
};


//Gets answers
export const getAnswersforQuestion = (id) => {
  var res = axios.get(`${CREDENTIALS.BASE_URL}/2.2/questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!9_bDE(fI5&key=${CREDENTIALS.KEY}`);
  return res;
};