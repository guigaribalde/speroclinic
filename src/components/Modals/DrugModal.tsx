import {Form, Formik} from 'formik';
import {useContext} from 'react';
import {toast} from 'react-toastify';
//@ts-ignore
import Button from 'reactstrap/lib/Button';
//@ts-ignore
import Spinner from 'reactstrap/lib/Spinner';
import * as Yup from 'yup';
import {ModalContext} from '../../utility/context/Modal';
import {useDrugById} from '../../utility/hooks/main/drug/useDrug';
import {DrugForm} from '../Forms/Drug/DrugForm';
import {BlankModal} from './BlankModal';

interface DrugModalProps {
  type: 'add' | 'edit';
  id?: string;
  group?: string;
  modalProps?: {
    children?: React.ReactNode;
    header?: React.ReactNode | string;
    button?: React.ReactNode;
    icon?: React.ReactNode;
    breadcrumb?: React.ReactNode;
  };
  mutateAsync?: any;
}
interface Presentation {
  name: string;
  type: string;
  concentration: {value: string; mesure: string};
  buy: number | string;
  sell: number | string;
  lab: string;
}
export const DrugModal = (props: DrugModalProps) => {
  const {setOpen} = useContext(ModalContext);

  const validate = Yup.object().shape({
    scientific_name: Yup.string().required('Campo necessário!'),
    group: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string(),
      })
      .nullable()
      .required('Campo necessário!'),
    presentations: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Campo necessário!'),
        type: Yup.string().required('Campo necessário!'),
        concentration: Yup.object().shape({
          value: Yup.number().required('Campo necessário!'),
          mesure: Yup.string().required('Campo necessário!'),
        }),
        buy: Yup.string().required('Campo necessário!'),
        sell: Yup.string().required('Campo necessário!'),
        lab: Yup.string().required('Campo necessário!'),
      })
    ),
  });

  //@ts-ignore
  const {data, isLoading} = props.type === 'edit' ? useDrugById(props.id) : {};

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
                  group: {value: data.group, label: data.group},
                  scientific_name: data.scientific_name,
                  presentations: data.presentations.map((presentation: Presentation) => {
                    return {
                      name: presentation.name,
                      type: presentation.type,
                      concentration: presentation.concentration,
                      buy: presentation.buy.toLocaleString('pt-br', {minimumFractionDigits: 2}),
                      sell: presentation.sell.toLocaleString('pt-br', {minimumFractionDigits: 2}),
                      lab: presentation.lab,
                    };
                  }),
                }
              : {
                  group: {value: '', label: ''},
                  scientific_name: '',
                  presentations: [
                    {
                      name: '',
                      type: '',
                      concentration: {value: '', mesure: 'mg'},
                      buy: '',
                      sell: '',
                      lab: '',
                    },
                  ],
                }
          }
          onSubmit={async (values, {resetForm}) => {
            const payLoad: any = {
              //@ts-ignore
              ...(props.type === 'edit' && {id: values.id}),
              group: values.group.value,
              scientific_name: values.scientific_name,
              presentations: values.presentations.map((presentation: Presentation) => {
                return {
                  name: presentation.name,
                  type: presentation.type,
                  lab: presentation.lab,
                  concentration: presentation.concentration,
                  buy: Number(String(presentation.buy).replace('.', '').replace(',', '.')),
                  sell: Number(String(presentation.sell).replace('.', '').replace(',', '.')),
                };
              }),
            };
            try {
              props.mutateAsync(payLoad);
              if (props.type === 'add') {
                resetForm();
                toast.success(`Medicamento adicionado com sucesso!`);
              } else {
                //@ts-ignore
                toast.success(`Medicamento editado com sucesso!`);
                setOpen(false);
              }
            } catch (e) {
              toast.error(
                `🚨 Erro ao ${props.type === 'add' ? 'adicionar' : 'editar'} medicamento!`
              );
            }
          }}
          validationSchema={validate}
        >
          {(formik) => (
            <Form>
              <DrugForm //@ts-ignore
                formik={formik}
                presentationsClosed={props.type === 'edit' ? true : false}
              />
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
