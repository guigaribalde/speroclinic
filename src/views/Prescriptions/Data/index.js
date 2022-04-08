// ** Custom Components
// ** Third Party Components
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {ArrowRight, Edit, Eye, File, MoreVertical, Trash} from 'react-feather';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
import {setClosedPrescription, setInProgressPrescription} from '../../../api/prescriptions';
import {Prescription} from '../../../components/Modals/PrescriptionModal';
import {ModalContext} from '../../../utility/context/Modal';

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
    name: 'STATUS',
    selector: 'status',
    sortable: true,
    cell: (row) => {
      console.log('status', row.status);

      return (
        <div className='d-flex align-items-center'>
          {row.status === 'open' ? (
            <span
              className='text-white font-weight-bold'
              style={{
                padding: '5px 10px',
                borderRadius: '20px',
                backgroundColor: 'rgba(199,234,70,1)',
              }}
            >
              Aberto
            </span>
          ) : row.status === 'progress' ? (
            <span
              className='text-white font-weight-bold'
              style={{
                padding: '5px 10px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,185,0,0.9)',
              }}
            >
              Em andamento
            </span>
          ) : (
            <span
              className='text-white font-weight-bold'
              style={{
                padding: '5px 10px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,99,71,0.7)',
              }}
            >
              Finalizado
            </span>
          )}
        </div>
      );
    },
  },
  {
    name: 'AÇÕES',
    allowOverflow: true,
    selector: 'actions',

    cell: (row) => {
      const [toggle, setToggle] = useState(false);
      const {setModal, setOpen} = useContext(ModalContext);

      const {mutateAsync: toProgress} = setInProgressPrescription();
      const {mutateAsync: toClosed} = setClosedPrescription();

      useEffect(() => {
        if (toggle) {
          setModal(<Prescription data={row} />);
          setOpen(true);
          setToggle(false);
        }
      }, [toggle]);

      return (
        <div className='d-flex' style={{width: '100%', justifyContent: 'end'}}>
          <UncontrolledDropdown className='d-flex'>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={(e) => {
                  e.preventDefault();
                  setToggle(true);
                }}
              >
                <Eye size={15} />
                <span className='align-middle ml-50'>Ver</span>
              </DropdownItem>
              {row.status === 'open' && (
                <DropdownItem
                  tag='a'
                  href='/'
                  className='w-100'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Editar</span>
                </DropdownItem>
              )}

              {row.status !== 'open' && (
                <DropdownItem
                  tag='a'
                  href='/'
                  className='w-100'
                  onClick={(e) => {
                    e.preventDefault();
                    axios.post(`/prescription/document/${row.id}`).then((res) => {
                      console.log(res);
                      window.open(
                        `http://dev.clinic.speroprev.com/api/v1/documents/${res.data.document}`,
                        '_blank'
                      );
                    });
                  }}
                >
                  <File size={15} />
                  <span className='align-middle ml-50'>Exportar</span>
                </DropdownItem>
              )}
              {row.status !== 'closed' && (
                <DropdownItem
                  tag='span'
                  className='w-100'
                  onClick={(e) => {
                    if (row.status === 'open') {
                      toProgress(row.id);
                    } else {
                      toClosed(row.id);
                    }
                  }}
                >
                  <ArrowRight size={15} />
                  <span className='align-middle ml-50'>Avançar</span>
                </DropdownItem>
              )}
              <hr />
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Trash size={15} />
                <span className='align-middle ml-50'>Excluir</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];

export default ExpandableTable;
