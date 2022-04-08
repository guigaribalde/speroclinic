import {getPrescriptions} from '@api/prescriptions';
import React from 'react';
import {useQueryClient} from 'react-query';
import DataTable from '../../components/ui/DataTable';
import {columns} from './Data';

export default function Prescriptions() {
  const queryClient = useQueryClient();
  const {data, isLoading, isFetching} = getPrescriptions();

  console.log(queryClient.getQueryData(['prescriptions']));

  return (
    <>
      <DataTable
        data={data}
        isLoading={isLoading}
        columns={columns}
        isFetching={isFetching}
        title='Prescrições'
      />
    </>
  );
}
