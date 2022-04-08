import axios from 'axios';
import {useQuery} from 'react-query';

const STALE_TIME = 60 * 1000;

async function fetchCategories() {
  const {data: categories}: {data: string[]} = await axios.get('/material/category');
  return categories;
}
export const useCategory = () => {
  const category = useQuery('categories', fetchCategories, {
    staleTime: STALE_TIME,
  });
  return {category};
};
