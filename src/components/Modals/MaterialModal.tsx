import {Form, Formik} from 'formik';
import {useContext} from 'react';
import {toast} from 'react-toastify';
//@ts-ignore
import Button from 'reactstrap/lib/Button';
//@ts-ignore
import Spinner from 'reactstrap/lib/Spinner';
import * as Yup from 'yup';
import {ModalContext} from '../../utility/context/Modal';
import {useMaterialById} from '../../utility/hooks/main/supplies/useMaterial';
import {MaterialForm} from '../Forms/Material/MaterialForm';
import {BlankModal} from './BlankModal';

interface MaterialModalProps {
  type: 'add' | 'edit';
  id?: string;
  category?: string;
  modalProps?: {
    children?: React.ReactNode;
    header?: React.ReactNode | string;
    button?: React.ReactNode;
    icon?: React.ReactNode;
    breadcrumb?: React.ReactNode;
  };
  mutateAsync?: any;
}

export const MaterialModal = (props: MaterialModalProps) => {
  const {setOpen} = useContext(ModalContext);

  const validate = Yup.object({
    name: Yup.string().required('Campo necessário!'),
    buy: Yup.string().required('Campo necessário!'),
    sell: Yup.string().required('Campo necessário!'),
    code: Yup.string().required('Campo necessário!'),
    category: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string(),
      })
      .nullable()
      .required('Campo necessário!'),
  });

  //@ts-ignore
  const {data, isLoading} = props.type === 'edit' ? useMaterialById(props.id) : {};

  //@ts-ignore
  return (
    <BlankModal {...props.modalProps}>
      {props.type === 'edit' && isLoading ? (
        <div
          className='w-100 d-flex align-items-center justify-content-center'
          style={{height: '520px'}}
        >
          <Spinner color='primary' />
        </div>
      ) : (
        <Formik
          initialValues={
            props.type === 'edit'
              ? {
                  id: data.id,
                  code: data.code,
                  name: data.name,
                  description: data.description,
                  category: {
                    value: data.category,
                    label: data.category,
                  },
                  buy: data.buy.toLocaleString('pt-br', {minimumFractionDigits: 2}),
                  sell: data.sell.toLocaleString('pt-br', {minimumFractionDigits: 2}),
                }
              : {
                  name: '',
                  category: {value: '', label: ''},
                  buy: '',
                  sell: '',
                  code: '',
                  description: '',
                }
          }
          onSubmit={async (values, {resetForm}) => {
            const payLoad: any = {
              //@ts-ignore
              ...(props.type === 'edit' && {id: values.id}),
              code: values.code,
              name: values.name,
              category: values.category.value,
              description: values.description,
              sell: Number(values.sell.replace('.', '').replace(',', '.')),
              buy: Number(values.buy.replace('.', '').replace(',', '.')),
            };
            try {
              props.mutateAsync(payLoad);
              if (props.type === 'add') {
                resetForm();
                toast.success(`Material adicionado com sucesso!`);
              } else {
                //@ts-ignore
                toast.success(`Material editado com sucesso!`);
                setOpen(false);
              }
            } catch (e) {
              toast.error(`🚨 Erro ao ${props.type === 'add' ? 'adicionar' : 'editar'} material!`);
            }
          }}
          validationSchema={validate}
        >
          {(formik) => (
            <Form>
              <MaterialForm formik={formik} />
              <Button type='submit' color='primary' className='w-100'>
                {props.type === 'add' ? 'Adicionar' : 'Editar'}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </BlankModal>
  );
};
