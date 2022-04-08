import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

async function postPrescription(data) {
  return await axios.post('/prescription', data);
}

export const addPrescription = () => {
  //   const queryClient = useQueryClient()
  return useMutation(postPrescription, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

async function fetchPescriptions() {
  const {data} = await axios.get('/prescription');
  return data;
}

export const getPrescriptions = () => {
  return useQuery(['prescriptions'], fetchPescriptions);
};

async function setInProgress(id) {
  const {data} = await axios.post(`/prescription/${id}?status=progress`);
  return data;
}
export const setInProgressPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation(setInProgress, {
    onMutate: (id) => {
      const old_prescriptions = queryClient.getQueryData(['prescriptions']);
      const new_prescriptions = old_prescriptions.map((prescription) => {
        if (prescription.id === id) {
          prescription.status = 'progress';
          return new Object({...prescription});
        }
        return new Object({...prescription});
      });

      queryClient.setQueryData(['prescriptions'], old_prescriptions[0]);
      queryClient.setQueryData(['prescriptions'], [...new_prescriptions]);
    },
  });
};
async function setClosed(id) {
  const {data} = await axios.post(`/prescription/${id}?status=closed`);
  return data;
}
export const setClosedPrescription = () => {
  const queryClient = useQueryClient();
  return useMutation(setClosed, {
    onMutate: (id) => {
      const old_prescriptions = queryClient.getQueryData(['prescriptions']);
      const new_prescriptions = old_prescriptions.map((prescription) => {
        if (prescription.id === id) {
          prescription.status = 'closed';
          return new Object({...prescription});
        }
        return new Object({...prescription});
      });
      queryClient.setQueryData(['prescriptions'], old_prescriptions[0]);
      queryClient.setQueryData(['prescriptions'], [...new_prescriptions]);
    },
  });
};
