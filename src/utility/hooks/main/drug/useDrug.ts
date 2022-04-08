import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const STALE_TIME = 60 * 1000;

interface Presentation {
  id?: string;
  type?: string;
  buy: number;
  sell: number;
  lab: string;
  name: string;
  concentration: {
    mesure: string;
    value: number;
  };
}

interface Drugs {
  id?: string;
  group: string;
  scientific_name: string;
  presentations: Presentation[];
}

// ****** GETS ******

//* Get a drug by id
export async function fetchDrugById(id: string): Promise<Drugs> {
  const {data}: {data: Drugs} = await axios.get(`/drug/${id}`);
  return {
    id: data.id,
    group: data.group,
    scientific_name: data.scientific_name,
    presentations: data.presentations.map((presentation: Presentation) => {
      return {
        id: presentation.id,
        type: presentation.type,
        buy: presentation.buy,
        sell: presentation.sell,
        lab: presentation.lab,
        name: presentation.name,
        concentration: presentation.concentration,
      };
    }),
  };
}
export const useDrugById = (id: string) => {
  return useQuery(['drug', id], () => fetchDrugById(id), {staleTime: STALE_TIME});
};

//* Get all drugs in a group
export async function fetchDrugsByGroup(group: string): Promise<Drugs[]> {
  const {data}: {data: Drugs[]} = await axios.get(`/drug?group=${group}`);
  return data.map((drug: Drugs) => {
    return {
      id: drug.id,
      group: drug.group,
      scientific_name: drug.scientific_name,
      presentations: drug.presentations.map((presentation: Presentation) => {
        return {
          id: presentation.id,
          type: presentation.type,
          buy: presentation.buy,
          sell: presentation.sell,
          lab: presentation.lab,
          name: presentation.name,
          concentration: presentation.concentration,
        };
      }),
    };
  });
}
export const useDrugsByGroup = (group: string) => {
  const drugs = useQuery(['group', group], () => fetchDrugsByGroup(group), {staleTime: STALE_TIME});

  return {drugs};
};

//* Get all drugs
export async function fetchDrugs(): Promise<Drugs[]> {
  const {data}: {data: Drugs[]} = await axios.get(`/drug`);
  return data.map((drug: Drugs) => {
    return {
      id: drug.id,
      group: drug.group,
      scientific_name: drug.scientific_name,
      presentations: drug.presentations.map((presentation: Presentation) => {
        return {
          id: presentation.id,
          type: presentation.type,
          buy: presentation.buy,
          sell: presentation.sell,
          lab: presentation.lab,
          name: presentation.name,
          concentration: presentation.concentration,
        };
      }),
    };
  });
}
export const useDrugs = () => {
  return useQuery('all_drugs', fetchDrugs, {staleTime: STALE_TIME});
};

// ****** POSTS ******

export async function addDrug(data: Drugs) {
  return await axios.post('/drug', data);
}
export const useAddDrug = () => {
  const queryClient = useQueryClient();
  return useMutation(addDrug, {
    onSuccess: ({data}) => {
      queryClient.setQueryData('groups', data.groups);
      queryClient.setQueryData(['group', data.data.group], data.data.drugs);
    },
  });
};

export async function updateDrug(data: Drugs) {
  return await axios.put(`/drug/${data.id}`, data);
}
export const useUpdateDrug = (group: string) => {
  const queryClient = useQueryClient();
  return useMutation(updateDrug, {
    onMutate: (request) => {
      //? Optimistic update
      //@ts-ignore
      const current_group_data: Drugs[] = queryClient.getQueryData(['group', group]);
      const current_group_new_data = current_group_data
        .map((drug, index) => {
          if (drug.id === request.id) {
            if (request.group === group) return request;
            return;
          }
          return drug;
        })
        .filter((data) => data !== undefined);

      queryClient.setQueriesData(['drug', request.id], request);
      queryClient.setQueriesData(['group', group], current_group_new_data);
    },
    onSuccess: ({data}, params) => {
      //? True update
      queryClient.setQueryData('groups', data.groups);
      queryClient.setQueryData(['group', data.data.group], data.data.drugs);
    },
  });
};

// ****** DELETE ******

export async function deleteDrug(id: string) {
  return await axios.delete(`/drug/${id}`);
}
export const useRemoveDrug = (group: string) => {
  const queryClient = useQueryClient();
  return useMutation(deleteDrug, {
    onMutate: (id) => {
      //? Optimistic update
      //@ts-ignore
      const current_group_data: Drugs[] = queryClient.getQueryData(['group', group]);
      const current_group_new_data = current_group_data.filter((item) => item.id !== id);

      queryClient.setQueryData(['group', group], current_group_new_data);

      if (!current_group_new_data.length) {
        //@ts-ignore
        const groups_data: string[] = queryClient.getQueryData(['groups']);
        const index = groups_data.indexOf(group);

        groups_data.splice(index, 1);

        queryClient.setQueriesData(['groups'], groups_data);
      }
    },
  });
};

interface useDrugProps {
  id?: string;
  group?: string;
}

export default function useDrug({id, group}: useDrugProps) {
  const add = useAddDrug();
  if (id && group) {
    const drug = useDrugById(id);
    const update = useUpdateDrug(group);
    return {drug, add, update};
  }
  if (id) {
    const drug = useDrugById(id);
    return {drug, add};
  }
  if (group) {
    const update = useUpdateDrug(group);
    const remove = useRemoveDrug(group);
    const drug = useDrugsByGroup(group);
    return {drug, add, update, remove};
  }
  const drug = useDrugs();
  return {drug, add};
}
