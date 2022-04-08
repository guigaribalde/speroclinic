import {DrugModal} from '../components/Modals/DrugModal';
import {MaterialModal} from '../components/Modals/MaterialModal';

//@ts-ignore
export default function handleAdd(
  setModal: (props: React.ReactNode) => void,
  setOpen: (props: boolean) => void,
  materialMutateAsync: any,
  drugMutateAsync: any
) {
  const pathname = window.location.pathname;
  if (pathname.includes('/material')) {
    setModal(
      <MaterialModal
        type='add'
        modalProps={{header: 'Adicionar Material'}}
        mutateAsync={materialMutateAsync}
      />
    );
    setOpen(true);
  }
  if (pathname.includes('/drugs')) {
    setModal(
      <DrugModal
        type='add'
        modalProps={{header: 'Adicionar Medicamento'}}
        mutateAsync={drugMutateAsync}
      />
    );
    setOpen(true);
  }
}
