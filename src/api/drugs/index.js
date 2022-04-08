import {useQuery, useQueryClient, useMutation} from 'react-query'
import axios from 'axios'

async function fetchGroups() {
  const {data} = await axios.get('/drug/group')
  return data
}
export const getGroups = () => {
  return useQuery('groups', fetchGroups)
}

async function fetchDrugOne(id) {
  const {data} = await axios.get(`/drug/${id}`)
  return data
}
export const getDrugById = (id) => {
  return useQuery(['drug', id], () => {
    return fetchDrugOne(id)
  })
}

async function fetchGroup(name) {
  const {data} = await axios.get(`/drug?group=${name}`)
  return data
}
export const getGroup = (group) => {
  return useQuery(group, () => {
    return fetchGroup(group)
  })
}

async function fetchAllDrugs() {
  const {data} = await axios.get(`/drug`)
  return data
}
export const getAllDrugs = () => {
  return useQuery('all_drugs', fetchAllDrugs)
}

async function postDrug(data) {
  return await axios.post('/drug', data)
}
export const addDrug = () => {
  const queryClient = useQueryClient()
  return useMutation(postDrug, {
    onSuccess: ({data}) => {
      //refetch groups and drugs(group)
      queryClient.setQueryData('groups', data.groups)
      queryClient.setQueryData(data.data.group, data.data.drugs)
    },
  })
}

async function deleteDrug(id) {
  return await axios.delete(`/drug/${id}`)
}
export const deleteDrugs = (group) => {
  const queryClient = useQueryClient()
  return useMutation(deleteDrug, {
    onMutate: (id) => {
      queryClient.setQueryData(
        group,
        queryClient.getQueryData(group).filter((item) => item.id !== id)
      )
    },
  })
}

async function updateDrug(data) {
  return await axios.put(`/drug/${data.id}`, data)
}
export const updateDrugs = () => {
  const queryClient = useQueryClient()
  return useMutation(updateDrug, {
    onSuccess: ({data}, variables) => {
      queryClient.invalidateQueries(variables.group)
      queryClient.setQueryData('groups', data.groups)
      queryClient.setQueryData(data.data.group, data.data.drugs)
      queryClient.setQueryData(
        ['drug', variables.id],
        data.data.drugs.filter((drug) => drug.id === variables.id)[0]
      )
    },
  })
}
