// ** Third Party Components
import {removeProtocol} from '@api/protocols';
import {Edit, MoreVertical, Trash} from 'react-feather';
import {Link} from 'react-router-dom';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import ItemPopup from '../../../components/ui/ItemPopup';

// ** Expandable table component
const ExpandableTable = ({data}) => {
  return (
    <div className='expandable-content p-2'>
      <Row className='mb-2 w-100'>
        {data.requisites.content.map((e, i) => {
          console.log(e);
          return (
            <Col sm={6} md={4} lg={4} key={`presentations${i}`}>
              <ItemPopup id={e.value} type={e.type}>
                <strong>{e.title}</strong>{' '}
                <small style={{fontSize: 11}}>
                  {e.type === 'drug' &&
                    `
                  ${e.concentration.value}
                  ${e.concentration.mesure}`}
                  <br />
                  {e.type === 'Medicamento' ? 'Medicamento' : 'Material'}
                </small>
              </ItemPopup>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    selector: 'name',
    sortable: true,
    minWidth: '250px',
    cell: (row) => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate'>
          <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
          <small>{row.requisites.content.length} requisitos</small>
        </div>
      </div>
    ),
  },

  {
    name: 'AÇÕES',
    allowOverflow: true,
    selector: 'actions',

    cell: (row) => {
      const {mutateAsync} = removeProtocol();
      return (
        <div className='d-flex' style={{width: '100%', justifyContent: 'end'}}>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} color='#0557bc' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag='span'
                className='w-100'
                onClick={() => {
                  mutateAsync(row.id);
                }}
              >
                <Trash size={15} />
                <span className='align-middle ml-50'>Excluir</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Link to={`/protocols/edit/${row.id}`}>
            <Edit size={15} color='#0557bc' />
          </Link>
        </div>
      );
    },
  },
];

export default ExpandableTable;
