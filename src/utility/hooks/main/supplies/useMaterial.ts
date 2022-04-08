// ** React Imports
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const STALE_TIME = 60 * 1000;

interface Material {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  sell: number;
  buy: number;
}

// ****** GETS ******

//** Get all avaliable materials
export const fetchMaterials = async (): Promise<Material[]> => {
  const {data} = await axios.get(`/material`);

  const materials = data.map((material: Material) => {
    return {
      id: material.id,
      code: material.code,
      name: material.name,
      category: material.category,
      description: material.description,
      sell: material.sell,
      buy: material.buy,
    };
  });

  return materials;
};

export const useMaterials = () => {
  return useQuery(['all_materials'], fetchMaterials, {staleTime: STALE_TIME});
};

//** Get material by id
export const fetchMaterialById = async (id: string): Promise<Material> => {
  const {data} = await axios.get(`/material?id=${id}`);
  const material = {
    id: data.id,
    code: data.code,
    name: data.name,
    category: data.category,
    description: data.description,
    sell: data.sell,
    buy: data.buy,
  };
  return material;
};

export const useMaterialById = (id: string) => {
  return useQuery(['material', id], () => fetchMaterialById(id), {staleTime: STALE_TIME});
};

//** Get all materials ia a category
export const fetchMaterialsByCategory = async (category: string): Promise<Material[]> => {
  const {data} = await axios.get(`/material/${category}`);

  const materials = data.map((material: Material) => {
    return {
      id: material.id,
      code: material.code,
      name: material.name,
      category: material.category,
      description: material.description,
      sell: material.sell,
      buy: material.buy,
    };
  });

  return materials;
};

export const useMaterialsByCategory = (category: string) => {
  return useQuery(['category', category], () => fetchMaterialsByCategory(category), {
    staleTime: STALE_TIME,
  });
};

// ****** POSTS ******

interface dataFormat {
  code: string;
  name: string;
  category: string;
  description: string;
  sell: number;
  buy: number;
  id?: string;
}

export const addMaterials = async (data: dataFormat): Promise<unknown> => {
  return await axios.post('/material', data);
};

export const useAddMaterial = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addMaterials, {
    onSuccess: ({data}: any) => {
      queryClient.setQueryData('categories', data.categories);
      queryClient.setQueryData(['category', data.data.category], data.data.materials);
    },
  });
  return mutation;
};

async function updateMaterial(data: dataFormat) {
  const aux = {...data};
  delete aux.id;
  return await axios.put(`/material/${data.id}`, aux);
}
export const useUpdateMaterial = (category: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateMaterial, {
    onMutate: (request) => {
      //? Optimistic update
      //@ts-ignore
      const current_category_data: Material[] = queryClient.getQueryData(['category', category]);
      const current_category_new_data = current_category_data
        .map((material, index) => {
          if (material.id === request.id) {
            if (request.category === category) return request;
            return;
          }
          return material;
        })
        .filter((data) => data !== undefined);

      queryClient.setQueriesData(['material', request.id], request);
      queryClient.setQueriesData(['category', category], current_category_new_data);
    },
    onSuccess: ({data}, params) => {
      //? True update
      queryClient.setQueryData('categories', data.categories);
      queryClient.setQueryData(['category', data.data.category], data.data.materials);
    },
  });
  return mutation;
};

// ****** DELETE ******

export const deleteMaterial = async (id: string) => {
  return await axios.delete(`/material/${id}`);
};
export const useRemoveMaterial = (category: string) => {
  const queryClient = useQueryClient();
  return useMutation(deleteMaterial, {
    onMutate: (id) => {
      //? Optimistic update
      //@ts-ignore
      const current_category_data: Material[] = queryClient.getQueryData(['category', category]);
      const current_category_new_data = current_category_data.filter((item) => item.id !== id);

      queryClient.setQueryData(['category', category], current_category_new_data);

      if (!current_category_new_data.length) {
        //@ts-ignore
        const categories_data: string[] = queryClient.getQueryData(['categories']);
        const index = categories_data.indexOf(category);

        categories_data.splice(index, 1);

        queryClient.setQueriesData(['categories'], categories_data);
      }
    },
  });
};

interface useMaterialProps {
  id?: string;
  category?: string;
}

export default function useMaterial({id, category}: useMaterialProps) {
  const add = useAddMaterial();
  if (id && category) {
    const material = useMaterialById(id);
    const update = useUpdateMaterial(category);
    return {material, add, update};
  }
  if (id) {
    const material = useMaterialById(id);
    return {material, add};
  }
  if (category) {
    const update = useUpdateMaterial(category);
    const remove = useRemoveMaterial(category);
    const material = useMaterialsByCategory(category);
    return {material, add, update, remove};
  }
  const material = useMaterials();
  return {material, add};
}
