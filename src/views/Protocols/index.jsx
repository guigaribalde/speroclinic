import {getProtocols} from '@api/protocols';
import Breadcrumbs from '@components/breadcrumbs';
import React from 'react';
import DataTable from '../../components/ui/DataTable';
import ExpandableTable, {columns} from './Data';

export default function Protocols() {
  const {isLoading, data, error} = getProtocols();
  console.log(data);
  return (
    <div>
      <Breadcrumbs breadCrumbTitle='Protocolos' breadCrumbActive='Listar' />
      <DataTable
        data={data}
        isLoading={isLoading}
        columns={columns}
        ExpandableTable={ExpandableTable}
        title='Protocolos'
      />
    </div>
  );
}
