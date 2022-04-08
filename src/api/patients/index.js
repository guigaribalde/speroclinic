import axios from 'axios'
import {useMutation, useQuery, useQueryClient} from 'react-query'

async function fetchPatients() {
  const {data} = await axios.get('/patient')
  return data
}

export const getPatients = () => {
  return useQuery('patients', fetchPatients)
}

async function fetchPatientOne(id) {
  return await axios.get(`/patient/${id}`)
}
export const getPatientOne = (id) => {
  return useQuery(['patientone', id], () => {
    return fetchPatientOne(id)
  })
}

async function postPatient(data) {
  return await axios.post('/patient', data)
}

export const addPatients = () => {
  const queryClient = useQueryClient()
  return useMutation(postPatient, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries('patients')
      queryClient.fetchQuery('patients', getPatients)
    },
  })
}

async function updatePatient(data) {
  let aux = {...data}
  delete aux.id
  return await axios.put(`/patient/${data.id}`, aux)
}

export const updatePatients = () => {
  const queryClient = useQueryClient()
  return useMutation(updatePatient, {
    onSuccess: (result, variables, context) => {
      queryClient.invalidateQueries('patients')
      queryClient.invalidateQueries(['patientone', variables.id])
    },
  })
}
