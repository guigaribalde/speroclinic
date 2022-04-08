import {useQuery, useMutation, useQueryClient} from 'react-query'
import axios from 'axios'

async function fetchProtocols() {
  const {data} = await axios.get('/protocol')
  return data
}

export const getProtocols = () => {
  return useQuery('protocols', fetchProtocols)
}

async function fetchProtocolOne(id) {
  const {data} = await axios.get(`/protocol?id=${id}`)
  return data
}
export const getProtocolOne = (id) => {
  return useQuery([`protocol`, id], () => {
    return fetchProtocolOne(id)
  })
}

async function postProtocol(data) {
  return await axios.post('/protocol', data)
}

export const addProtocol = () => {
  const queryClient = useQueryClient()
  return useMutation(postProtocol, {
    onSuccess: (data, values) => {
      queryClient.invalidateQueries('protocols')
      queryClient.prefetchQuery('protocols', fetchProtocols)
    },
  })
}

async function deleteProtocol(id) {
  return await axios.delete(`/protocol/${id}`)
}
export const removeProtocol = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteProtocol, {
    onMutate: (id) => {
      queryClient.setQueryData(
        'protocols',
        queryClient.getQueryData('protocols').filter((item) => item.id !== id)
      )
    },
  })
}

async function putProtocol(data) {
  return await axios.put(`/protocol/${data.id}`, data)
}
export const editProtocol = () => {
  const queryClient = useQueryClient()
  return useMutation(putProtocol, {
    onSuccess: ({data}, variables) => {
      queryClient.invalidateQueries('protocols')
      queryClient.invalidateQueries([`protocol`, variables.id])
      queryClient.prefetchQuery('protocols', fetchProtocols)
      queryClient.fetchQuery([`protocol`, variables.id], () => {
        return fetchProtocolOne(variables.id)
      })
    },
  })
}
