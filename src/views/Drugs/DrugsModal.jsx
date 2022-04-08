import {addDrug, getDrugById, getGroups, updateDrugs} from '@api/drugs';
import Breadcrumbs from '@components/breadcrumbs';
import Spinner from '@components/spinner/Fallback-spinner';
import {Form, Formik} from 'formik';
import {toast} from 'react-toastify';
import {CardBody, Col, Row} from 'reactstrap';
import * as Yup from 'yup';
import {SelectField} from '../../components/Fields/SelectField';
import {TextField} from '../../components/Fields/TextField';
import {PresentationRepeater} from '../../components/Repeaters/PresentationRepeater';
import Modal from '../../components/ui/Modal';

export default function MaterialModal(props) {
  const {type, category, id} = props.match.params;

  const {isLoading: isLoadingGroups, data: groups} = getGroups();

  const {mutateAsync: addDrugs, reset: resetAdd} = addDrug();

  const {isLoading: isLoadingDrug, data: drug} = id
    ? getDrugById(id)
    : {isLoading: false, data: undefined};

  const {mutateAsync: updateDrug, reset: resetUpdate} = updateDrugs();

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
  if (isLoadingGroups || isLoadingDrug) {
    return <Spinner />;
  }
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle='Medicamentos'
        breadCrumbActive={type === 'add' ? 'Adicionar' : 'Editar'}
      />
      <Formik
        initialValues={
          type === 'edit'
            ? {...drug, group: {value: drug.group, label: drug.group}}
            : {
                group: null,
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
          let payLoad = new Object({...values});
          payLoad.presentations = payLoad.presentations.map((presentation) => {
            presentation.buy = Number(presentation.buy.replace('.', '').replace(',', '.'));
            presentation.sell = Number(presentation.sell.replace('.', '').replace(',', '.'));
            return presentation;
          });
          payLoad.group = payLoad.group.value;
          console.log(payLoad);
          try {
            if (type === 'edit') {
              await updateDrug(payLoad);
            } else {
              await addDrugs(payLoad);
              toast.success(
                `✅ Medicamento ${type === 'add' ? 'adicionado' : 'atualizado'} com sucesso!`
              );
              resetForm();
            }
          } catch (e) {
            toast.error(`🚨 Erro ao ${type === 'add' ? `adicionar` : `atualizar`} o medicamento.`);
          } finally {
            if (type === 'edit') {
              resetUpdate();
            } else {
              resetAdd();
            }
          }
        }}
        // validationSchema={validate}
      >
        {(formik) => (
          <Modal type={type} title='Medicamento'>
            <Form>
              <CardBody className='invoice-padding pt-0'>
                <h4 className='mt-1'>Informações de Medicamento</h4>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='6'>
                    <SelectField
                      type={'create'}
                      name='group'
                      fmk={formik}
                      options={formatGroups(groups)}
                      label='Grupo'
                      placeholder='Grupo'
                    />
                  </Col>
                  <Col className='col-bill-to pl-0' lg='6'>
                    <TextField
                      name='scientific_name'
                      label='Nome Cientifico'
                      placeholder='Nome Cientifico'
                    />
                  </Col>
                </Row>

                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='12'>
                    <PresentationRepeater formik={formik} />

                    {/* <FieldArray name='presentations'>
                      {({insert, remove, push}) => (
                        <div>
                          {formik.values.presentations.length > 0 &&
                            formik.values.presentations.map((presentation, index) => {
                              return (
                                <div className=' border p-1 rounded mb-1' key={`repeater-${index}`}>
                                  <RepeaterField
                                    name='presentations'
                                    locindex={index}
                                    fmk={formik}
                                    remove={remove}
                                  />
                                </div>
                              );
                            })}
                          <Button
                            className='btn-icon'
                            color='primary'
                            onClick={() => {
                              push({
                                name: '',
                                type: '',
                                concentration: {value: '', mesure: 'mg'},
                                buy: '',
                                sell: '',
                                lab: '',
                              });
                            }}
                          >
                            <Plus size={14} />
                            <span className='align-middle ms-25'>Adicionar</span>
                          </Button>
                        </div>
                      )}
                    </FieldArray> */}
                  </Col>
                </Row>
              </CardBody>

              <hr className='invoice-spacing mt-0 mb-0' />
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
}
function formatGroups(groups) {
  return [
    ...groups.map((group) => {
      return {label: group, value: group};
    }),
  ];
}
