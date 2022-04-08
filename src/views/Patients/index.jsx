import {getPatients} from '@api/patients'
import Breadcrumbs from '@components/breadcrumbs'
import React from 'react'
import DataTable from '../../components/ui/DataTable'
import ExpandableTable, {columns} from './Data'

export default function Patients() {
  const {isLoading, data, error, isFetching} = getPatients()
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle='Pacientes' breadCrumbActive='Listar' />
      <DataTable
        data={data}
        isFetching={isFetching}
        isLoading={isLoading}
        columns={columns}
        ExpandableTable={ExpandableTable}
        title='Pacientes'
      />
    </div>
  )
}
