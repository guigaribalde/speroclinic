import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

async function fetchCategories() {
  const {data} = await axios.get('/material/category');
  return data;
}
export const getCategories = () => {
  return useQuery('categories', fetchCategories, {
    staleTime: 60 * 1000,
  });
};

async function fetchMaterialsByCategory(category) {
  const {data} = await axios.get(`/material/${category}`);
  return data;
}
export const getMaterialsByCategory = (category) => {
  return useQuery(category, () => {
    return fetchMaterialsByCategory(category);
  });
};

async function fetchAllMaterials() {
  const {data} = await axios.get(`/material`);
  return data;
}
export const getAllMaterials = () => {
  return useQuery('all_materials', fetchAllMaterials);
};

async function postMateiral(data) {
  return await axios.post('/material', data);
}
export const addMaterials = () => {
  const queryClient = useQueryClient();
  return useMutation(postMateiral, {
    onSuccess: ({data}) => {
      queryClient.setQueryData('categories', data.categories);
      queryClient.setQueryData(data.data.category, data.data.materials);
    },
  });
};

async function deleteMaterial(id) {
  return await axios.delete(`/material/${id}`);
}
export const deleteMarials = (category) => {
  const queryClient = useQueryClient();
  return useMutation(deleteMaterial, {
    onMutate: (id) => {
      queryClient.setQueryData(
        category,
        queryClient.getQueryData(category).filter((item) => item.id !== id)
      );
    },
  });
};

async function updateMaterial(data) {
  const aux = {...data};
  delete aux.id;
  return await axios.put(`/material/${data.id}`, aux);
}
export const updateMaterials = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMaterial, {
    onSuccess: ({data}, params) => {
      console.log(data); //TODO: invalidate data old category
      queryClient.setQueryData('categories', data.categories);
      queryClient.setQueryData(data.data.category, data.data.materials);
    },
  });
};
async function fetchMaterialById(id) {
  const {data} = await axios.get(`/material?id=${id}`);
  return data;
}
export const getMaterialById = (id) => {
  return useQuery(
    ['material', id],
    () => {
      return fetchMaterialById(id);
    },
    {
      staleTime: 60 * 1000,
    }
  );
};

//TODO: implement functions below on useCategory hook
export const prefetchMaterialsById = (id, queryClient) => {
  queryClient.prefetchQuery(['material', id], () => fetchMaterialById(id));
};
export const prefetchCategories = (queryClient) => {
  queryClient.prefetchQuery('categories', () => fetchCategories());
};
