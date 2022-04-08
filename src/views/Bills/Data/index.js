// ** Third Party Components
import {Edit, MoreVertical, Trash} from 'react-feather';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

// ** Expandable table component
export const ExpandableTable = ({data}) => {
  return (
    <div className='expandable-content p-2'>
      <Row className='mb-2 w-100'>
        {data.presentations.map((e, i) => {
          return (
            <Col sm={6} md={4} lg={4} className='p-1' key={`presentations${i}`}>
              <div className='border p-1 rounded'>
                <strong>{e.name}</strong>{' '}
                <small style={{fontSize: 11}}>
                  {e.concentration.value}
                  {e.concentration.mesure} <br /> <span className='text-primary'>{e.type}</span>
                </small>
                <br />
                <div className='d-flex flex-row justify-content-between pt-1'>
                  <small style={{fontSize: 11}}>
                    Compra: {e.buy.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                  </small>
                  <small style={{fontSize: 11}}>
                    Venda: {e.sell.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                  </small>
                </div>
              </div>
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
    minWidth: '50%',
    sortable: true,
    cell: (row) => (
      <div className='d-flex align-items-center'>
        {/* <Avatar
          style={{
            backgroundColor: `${
              row.status === 'progress' ? 'golden' : row.status === 'open' ? 'limegreen' : 'tomato'
            }`,
          }}
          content=' '
        /> */}
        <div className='user-info text-truncate'>
          <span className='d-block font-weight-bold text-truncate'>
            {row.patient.name}{' '}
            <span className='text-primary'>({String(row.protocol.name).toUpperCase()})</span>
          </span>
          <small>
            {Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(Date(row.created_at).int)}
          </small>
        </div>
      </div>
    ),
  },

  {
    name: 'AÇÕES',
    allowOverflow: true,
    selector: 'actions',

    cell: (row) => {
      return (
        <div className='d-flex' style={{width: '100%', justifyContent: 'end'}}>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} color='#0557bc' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' className='w-100'>
                <Trash size={15} />
                <span className='align-middle ml-50'>Excluir</span>
              </DropdownItem>
            </DropdownMenu>
            <Edit size={15} color='#0557bc' />
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
