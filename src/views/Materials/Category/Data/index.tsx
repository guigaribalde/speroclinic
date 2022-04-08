import {useContext, useEffect, useState} from 'react';
import {Box, ChevronRight, Edit, MoreVertical, Trash} from 'react-feather';
//@ts-ignore
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
import {MaterialModal} from '../../../../components/Modals/MaterialModal';
import {ModalContext} from '../../../../utility/context/Modal';
import useMaterial, {useUpdateMaterial} from '../../../../utility/hooks/main/supplies/useMaterial';

interface RowProps {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  sell: number;
  buy: number;
}

// ** Expandable table component
export const ExpandableTable = ({data}: {data: RowProps}) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Nome:</span> {data.name}
      </p>
      <p>
        {data.description && (
          <>
            <span className='font-weight-bold'>Descrição:</span> {data.description}
          </>
        )}
      </p>
    </div>
  );
};

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    selector: 'name',
    sortable: true,
    cell: (row: RowProps) => (
      <div className='d-flex align-items-center' style={{maxWidth: '100%'}}>
        <div className='user-info text-truncate ml-1'>
          <span className='font-weight-bold text-truncate d-block '>{row.name}</span>
          <small>{row.code}</small>
        </div>
      </div>
    ),
  },

  {
    name: 'VALOR DE COMPRA',
    selector: 'unitary_value',
    sortable: true,
    cell: (row: RowProps) => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>
            {row.buy.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: 'VALOR DE VENDA',
    selector: 'sell_value',
    sortable: true,
    cell: (row: RowProps) => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>
            {row.sell.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: 'AÇÕES',
    allowOverflow: true,
    selector: 'actions',

    cell: (row: RowProps) => {
      const {remove} = useMaterial({category: row.category});
      const {setModal, setOpen} = useContext(ModalContext);
      const [toggle, setToggle] = useState(false);
      const {mutateAsync} = useUpdateMaterial(row.category);

      const Breadcrumb = () => {
        return (
          <div className='d-flex align-items-center'>
            <small>
              <b className='text-primary'>Material</b>
            </small>{' '}
            <ChevronRight size={12} /> <small>{row.category}</small> <ChevronRight size={12} />{' '}
            <small>{row.name}</small>
          </div>
        );
      };

      useEffect(() => {
        if (toggle) {
          setModal(
            <MaterialModal
              type='edit'
              modalProps={{
                icon: <Box className='pb-2' height={600} color={'#B9B9C3'} />,
                breadcrumb: Breadcrumb(),
              }}
              id={row.id}
              category={row.category}
              mutateAsync={mutateAsync}
            />
          );
          setOpen(true);
          setToggle(false);
        }
      }, [toggle]);

      return (
        <>
          <div className='d-flex' style={{width: '100%', justifyContent: 'end'}}>
            <UncontrolledDropdown className='d-flex'>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} color='#0557bc' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  tag='a'
                  href='/'
                  className='w-100'
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    remove?.mutate(row.id);
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
        </>
      );
    },
  },
];
