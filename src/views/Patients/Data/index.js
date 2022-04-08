// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import {MoreVertical, Edit, FileText, Trash, User, Eye} from 'react-feather'
import {Link} from 'react-router-dom'
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import axios from 'axios'

// ** Expandable table component
const ExpandableTable = ({data}) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Endereço:</span> {data.address}
      </p>
      <p>
        <span className='font-weight-bold'>Mãe:</span> {data.mothers_name}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Telefone:</span> {data.phone}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    selector: 'name',
    sortable: true,
    minWidth: '250px',
    cell: (row) => (
      <div className='d-flex align-items-center'>
        <Avatar content={row.name} initials />
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
          <small>#{String(row.nip).padStart(4, 0)}</small>
        </div>
      </div>
    ),
  },

  {
    name: 'EMAIL',
    selector: 'email',
    sortable: true,
    minWidth: '250px',
  },

  {
    name: 'NASCIMENTO',
    selector: 'birth_date',
    sortable: true,
    minWidth: '150px',

    cell: (row) => {
      const date = new Date(row.birth_date)
      const str = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth()).padStart(
        2,
        '0'
      )}/${date.getFullYear()}`
      return <div className='d-flex align-items-center'>{str}</div>
    },
  },

  {
    name: 'AÇÕES',
    allowOverflow: true,
    selector: 'actions',

    cell: (row) => {
      return (
        <div className='d-flex' style={{width: '100%', justifyContent: 'end'}}>
          <div className='mr-1'>
            <Link to={`/patients/edit/${row.id}`}>
              <Edit size={15} color='#0557bc' />
            </Link>
          </div>
          <Link to={`/patients/profile/${row.id}/${row.name}/${row.nip}`}>
            <Eye size={15} color='#0557bc' />
          </Link>
        </div>
      )
    },
  },
]

export default ExpandableTable
