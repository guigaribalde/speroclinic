import {Paperclip} from 'react-feather';
import {BlankModal} from './BlankModal';
export const Prescription = ({data}: {data: any}) => {
  console.log(data);
  return (
    <BlankModal icon={<Paperclip className='pb-2' height={600} color={'#B9B9C3'} />}>
      <section className='d-flex align-items-end'>
        <h4>
          {data.patient.name}
          {/* <span className='ml-1 text-primary'></span> */}
        </h4>
        <h6 className='ml-1 text-primary text-uppercase'>({data.protocol.name})</h6>
      </section>
      <div className='border rounded p-1 mt-1 cursor-pointer'>
        <h5 className='mb-0'>Informações de Paciente</h5>
      </div>
      <div className='my-1 border rounded p-1 cursor-pointer'>
        <h5 className='m-0'>Informações de Prescrição</h5>
      </div>
      <div className='mt-2'>
        <b>Requisitos: </b>
        {data.requisites.map((requisite: any, index: number) => (
          <span className='text-primary' key={requisite.id}>
            <u>{requisite?.scientific_name || requisite?.name}</u>
            {data.requisites.length - 1 === index ? '' : ', '}
          </span>
        ))}
      </div>
    </BlankModal>
  );
};
