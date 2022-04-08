import {addPatients, getPatientOne, updatePatients} from '@api/patients';
import Breadcrumbs from '@components/breadcrumbs';
import Spinner from '@components/spinner/Fallback-spinner';
import {Form, Formik} from 'formik';
import {CardBody, Col, Row} from 'reactstrap';
import * as Yup from 'yup';
import {CEPField} from '../../components/Fields/CEPField';
import {CPFField} from '../../components/Fields/CPFField';
import {DateTimePickerField} from '../../components/Fields/DateTimePickerField';
import {MesureField} from '../../components/Fields/MesureField';
import {PhoneField} from '../../components/Fields/PhoneField';
import {SelectField} from '../../components/Fields/SelectField';
import {TextAreaField} from '../../components/Fields/TextAreaField';
import {TextField} from '../../components/Fields/TextField';
import Modal from '../../components/ui/Modal';

export default function Paciente(props) {
  const {type, id} = props.match.params;
  const {
    mutateAsync: addPatient,
    isSuccess: isAddSuccess,
    isError: isAddError,
    reset: resetAdd,
  } = addPatients();

  const {
    mutateAsync: updatePatient,
    isSuccess: isUpdateSuccess,
    isError: isUpdataError,
    reset: resetUpdate,
  } = updatePatients();

  const {isLoading: isPatientLoading, data: patients} = id
    ? getPatientOne(id)
    : {isLoading: false, data: undefined};

  const validate = Yup.object().shape({
    name: Yup.string().required('Campo necessário!'),
    email: Yup.string().email('Email inválido').required('Campo necessário!'),
    cpf: Yup.string().min(14, 'CPF inválido').max(14, 'CPF inválido').required('Campo necessário!'),
    height: Yup.number().required('Campo necessário!'),
    weight: Yup.number().required('Campo necessário!'),
    gender: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string(),
      })
      .nullable()
      .required('Campo necessário!'),
    birth_date: Yup.string().required('Campo necessário!'),
    phone: Yup.string()
      .min(15, 'Telefone inválido')
      .max(15, 'Telefone inválido')
      .required('Campo necessário!'),
    additional_phone: Yup.string(),
    pathology: Yup.string().required('Campo necessário!'),
    mothers_name: Yup.string().required('Campo necessário!'),
    address: Yup.string().required('Campo necessário!'),
    health_plan: Yup.string().required('Campo necessário!'),
    health_plan_number: Yup.string().required('Campo necessário!'),
    cep: Yup.string().min(10, 'CEP inválido').max(10, 'CEP inválido').required('Campo necessário!'),
  });

  if (isPatientLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle='Pacientes'
        breadCrumbActive={type === 'add' ? 'Adicionar' : 'Editar'}
      />
      <Formik
        initialValues={
          type === 'edit'
            ? {
                ...formatData(patients),
                gender: {value: formatData(patients).gender, label: formatData(patients).gender},
              }
            : {
                name: '',
                email: '',
                cpf: '',
                height: '',
                weight: '',
                gender: null,
                birth_date: '',
                phone: '',
                additional_phone: '',
                pathology: '',
                mothers_name: '',
                address: '',
                health_plan: '',
                health_plan_number: '',
                cep: '',
                allergy: '',
                obs: '',
              }
        }
        onSubmit={async (values, {resetForm}) => {
          try {
            if (type === 'edit') {
              await updatePatient({...values, gender: values.gender.value});
            } else {
              await addPatient({...values, gender: values.gender.value});
              resetForm();
            }
          } catch (e) {
          } finally {
            if (type === 'edit') {
              resetUpdate();
            } else {
              resetAdd();
            }
          }
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <Modal
            type={type}
            title='Paciente'
            isSuccess={isAddSuccess || isUpdateSuccess}
            isError={isAddError || isUpdataError}
          >
            <Form>
              <CardBody className='invoice-padding pt-0'>
                <h4 className='mt-1 '>Informações de Pessoais</h4>
                <>
                  <Row className='row-bill-to invoice-spacing'>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <TextField name='name' label='Nome do paciente' placeholder='Nome' />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <TextField name='mothers_name' label='Nome da mãe' placeholder='Nome' />
                    </Col>
                  </Row>

                  <Row className='row-bill-to invoice-spacing'>
                    <Col className='col-bill-to pl-0' lg='4'>
                      <DateTimePickerField
                        label='Nascimento'
                        name='birth_date'
                        placeholder='Data'
                        fmk={formik}
                      />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='4'>
                      <MesureField label='Peso' placeholder='Peso' name='weight' unity='Kg' />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='4'>
                      <MesureField label='Altura' placeholder='Altura' name='height' unity='m' />
                    </Col>
                  </Row>
                </>

                <h4 className='mt-3'>Informações de Contato</h4>
                <>
                  <Row className='row-bill-to invoice-spacing'>
                    <Col className='col-bill-to pl-0' lg='5'>
                      <TextField name='email' label='Email' placeholder='Email' />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='3'>
                      <CPFField name='cpf' />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='4'>
                      <PhoneField name='phone' />
                    </Col>
                  </Row>
                  <Row className='row-bill-to invoice-spacing'>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <TextField name='address' label='Endereço' placeholder='Endereço' />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <CEPField name='cep' />
                    </Col>
                  </Row>
                </>

                <h4 className='mt-3  '>Informações de Saúde</h4>
                <>
                  <Row className='row-bill-to invoice-spacing'>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <TextField name='health_plan' label='Convênio' placeholder='Convênio' />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <TextField
                        name='health_plan_number'
                        label='Número do Convênio'
                        placeholder='Número do Convênio'
                      />
                    </Col>
                  </Row>

                  <Row className='row-bill-to invoice-spacing'>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <TextField name='pathology' label='Patologia' placeholder='Patologia' />
                    </Col>
                    <Col className='col-bill-to pl-0' lg='6'>
                      <SelectField
                        name='gender'
                        placeholder='Sexo'
                        label='Sexo'
                        options={[
                          {value: 'Masculino', label: 'Masculino'},
                          {value: 'Feminino', label: 'Feminino'},
                        ]}
                        fmk={formik}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <TextAreaField label='Alergias' placeholder='Alergias' name='allergy' />
                    </Col>
                  </Row>
                </>
              </CardBody>

              <CardBody className='invoice-padding py-0'>
                <Row>
                  <Col>
                    <TextAreaField label='Observações' placeholder='Observações' name='obs' />
                  </Col>
                </Row>
              </CardBody>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
}
function formatData({data}) {
  const copy = {...data};
  delete copy.nip;
  delete copy.user_id;
  delete copy.body_surface;
  return copy;
}
