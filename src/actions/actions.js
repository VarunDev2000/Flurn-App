import axios from 'axios';
import CREDENTIALS from '../utility/credentials';


// Actions for accessing route endpoints


export const getSearchResults = (searchText, page) => {
  var res = axios.get(`${CREDENTIALS.BASE_URL}/2.2/search?page=${page}&pagesize=10&order=desc&sort=votes&intitle=${searchText}&site=stackoverflow&filter=!--1nZwT40HJH&key=5DxGy)1qQIlTqzGDj7*Grw((`);
  return res;
};
