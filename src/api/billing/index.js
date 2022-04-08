import axios from 'axios';
import {useQuery} from 'react-query';

async function fetchBills() {
  const {data} = await axios.get('/billing');
  return data;
}

export const getBills = () => {
  return useQuery(['bills'], fetchBills);
};
