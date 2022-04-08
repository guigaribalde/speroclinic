import axios from 'axios';
import {useQuery} from 'react-query';

const STALE_TIME = 60 * 1000;

export async function fetchGroups(): Promise<string[]> {
  const {data}: {data: string[]} = await axios.get('/drug/group');
  return data;
}
export const useGroups = () => {
  const groups = useQuery('groups', fetchGroups, {staleTime: STALE_TIME});
  return {groups};
};
