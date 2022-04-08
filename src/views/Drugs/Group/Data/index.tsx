// ** Third Party Components
import {useContext, useEffect, useState} from 'react';
import {ChevronRight, Edit, MoreVertical, Tag, Trash} from 'react-feather';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  //@ts-ignore
} from 'reactstrap';
import {DrugModal} from '../../../../components/Modals/DrugModal';
import {ModalContext} from '../../../../utility/context/Modal';
import {useRemoveDrug, useUpdateDrug} from '../../../../utility/hooks/main/drug/useDrug';

interface Presentation {
  id?: string;
  type?: string;
  buy: number;
  sell: number;
  lab: string;
  name: string;
  concentration: {
    mesure: string;
    value: number;
  };
}

interface Drugs {
  id: string;
  group: string;
  scientific_name: string;
  presentations: Presentation[];
}

// ** Expandable table component
export const ExpandableTable = ({data}: {data: Drugs}) => {
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
    sortable: true,
    cell: (row: Drugs) => (
      <div className='d-flex align-items-center' style={{maxWidth: '100%'}}>
        <div className='user-info text-truncate'>
          <span className='d-block font-weight-bold text-truncate'>{row?.scientific_name}</span>
          {row.presentations.length > 1 ? (
            <small>{row.presentations.length} apresentações</small>
          ) : row.presentations.length === 1 ? (
            <small>{row.presentations.length} apresentação</small>
          ) : (
            <small>Nenhuma apresentação</small>
          )}
        </div>
      </div>
    ),
  },

  {
    name: 'AÇÕES',
    allowOverflow: true,
    selector: 'actions',

    cell: (row: Drugs) => {
      const {mutateAsync} = useRemoveDrug(row.group);
      const [toggle, setToggle] = useState(false);
      const {setModal, setOpen} = useContext(ModalContext);
      const {mutateAsync: update} = useUpdateDrug(row.group);
      const Breadcrumb = () => {
        return (
          <div className='d-flex align-items-center'>
            <small>
              <b className='text-primary'>Medicamento</b>
            </small>{' '}
            <ChevronRight size={12} /> <small>{row.group}</small> <ChevronRight size={12} />{' '}
            <small>{row.scientific_name}</small>
          </div>
        );
      };

      useEffect(() => {
        if (toggle) {
          setModal(
            <DrugModal
              type='edit'
              modalProps={{
                icon: <Tag className='pb-2' height={600} color={'#B9B9C3'} />,
                breadcrumb: Breadcrumb(),
              }}
              id={row.id}
              group={row.group}
              mutateAsync={update}
            />
          );
          setOpen(true);
          setToggle(false);
        }
      }, [toggle]);
      return (
        <div className='d-flex' style={{width: '100%', justifyContent: 'end'}}>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} color='#0557bc' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={(e: any) => {
                  e.preventDefault();
                  mutateAsync(row.id);
                }}
              >
                <Trash size={15} />
                <span className='align-middle ml-50'>Excluir</span>
              </DropdownItem>
            </DropdownMenu>
            <Edit
              size={15}
              color='#0557bc'
              onClick={() => {
                setToggle(true);
              }}
            />
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
