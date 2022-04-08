import {getAllDrugs} from '@api/drugs';
import {getAllMaterials} from '@api/materials';
import {getPatients} from '@api/patients';
import {addPrescription} from '@api/prescriptions';
import {getProtocols} from '@api/protocols';
import Spinner from '@components/spinner/Fallback-spinner';
import {Form, Formik, useFormikContext} from 'formik';
import {useEffect, useState} from 'react';
import {Edit} from 'react-feather';
import {toast} from 'react-toastify';
import {CardBody, Col, Label, Row} from 'reactstrap';
import * as Yup from 'yup';
import {CEPField} from '../../components/Fields/CEPField';
import {CPFField} from '../../components/Fields/CPFField';
import {DateTimePickerField} from '../../components/Fields/DateTimePickerField';
import {MesureField} from '../../components/Fields/MesureField';
import {PhoneField} from '../../components/Fields/PhoneField';
import {SelectField} from '../../components/Fields/SelectField';
import {TextField} from '../../components/Fields/TextField';
import {TNMField} from '../../components/Fields/TNMField';
import {RequisiteRepeater} from '../../components/Repeaters/RequisiteRepeater';
import Modal from '../../components/ui/Modal';

const FomikHooks = ({protocols}) => {
  const {values, submitForm, setFieldValue} = useFormikContext();

  useEffect(() => {
    if (values) {
      if (values.protocols.value) {
        const protocol = protocols.find((protocol) => protocol.id === values.protocols.value);
        setFieldValue('requisites.content', protocol.requisites.content);
      }
      if (values.requisites.content.length && !values.protocols.value) {
        setFieldValue('requisites.content', []);
      }
    }
  }, [values.protocols]);

  return <></>;
};

export default function PrescriptionModal(props) {
  const {type, id} = props.match.params;
  const {data: patients, isLoading: isPatientLoading} = getPatients();
  const {data: AllDrugs, isLoading: isLoadingAllDrugs} = getAllDrugs();
  const {data: AllMaterials, isLoading: isLoadingAllMaterials} = getAllMaterials();
  const {data: protocols, isLoading: isLoadingProtocols} = getProtocols();
  const {
    mutateAsync: addPrescriptions,
    isSuccess: isAddSuccess,
    isError: isAddError,
    reset: resetAdd,
  } = addPrescription();

  const [open, setOpen] = useState(false);

  function editPatientData(id) {
    setOpen((old) => !old);
    if (open) {
    }
  }

  if (isPatientLoading || isLoadingAllDrugs || isLoadingAllMaterials || isLoadingProtocols) {
    return <Spinner />;
  }
  const validate = Yup.object({
    name: Yup.string().required('Campo necessário!'),
    code: Yup.string().required('Campo necessário!'),
    requisites: Yup.object().shape({
      type: '',
      title: '',
      value: '',
      content: Yup.array().of(
        Yup.object().shape({
          type: Yup.string().required('Campo necessário!'),
          title: Yup.string().required('Campo necessário!'),
          value: Yup.string().required('Campo necessário!'),
          quantity: Yup.string().required('Campo necessário!'),
          day: Yup.string().when('type', {
            is: 'Medicamento',
            then: Yup.string().required('Campo necessário!'),
            otherwise: Yup.string(),
          }),
          infusion: Yup.object().when('type', {
            is: 'Medicamento',
            then: Yup.object().shape({
              type: Yup.object()
                .shape({
                  value: Yup.string(),
                  label: Yup.string(),
                })
                .nullable()
                .required('Campo necessário!'),
              time: Yup.string().min(15, 'Campo curto demais!').required('Campo necessário!'),
            }),
            otherwise: Yup.object(),
          }),
          concentration: Yup.object().when('type', {
            is: 'Medicamento',
            then: Yup.object().shape({
              mesure: Yup.string().required('Campo necessário!'),
              value: Yup.number().required('Campo necessário!'),
            }),
            otherwise: Yup.object(),
          }),
        })
      ),
    }),
  });
  return (
    <>
      <Formik
        initialValues={
          type === 'edit'
            ? {}
            : {
                patient: {
                  id: '',
                  name: '',
                  mother_name: '',
                  email: '',
                  cpf: '',
                  phone: '',
                  address: '',
                  cep: '',
                  health_plan: {name: '', number: ''},
                  birth_day: '',
                  weight: {value: 0, mesure: ''},
                  height: {value: 0, mesure: ''},
                  patology: '',
                  gender: '',
                  alergy: '',
                  obs: '',
                },
                prescription: {
                  immunohistochemistry: '',
                  tnm_staging: '',
                  clinic_state: '',
                  cid: '',
                  therapeutic_plan: '',
                  treatment: '',
                  cicle: '',
                },
                protocols: {value: '', label: ''},
                requisites: {
                  type: 'Material',
                  title: '',
                  value: '',
                  content: [],
                },
              }
        }
        onSubmit={async (values, {resetForm}) => {
          const payLoad = {
            patient: {...values.patient, id: undefined},
            prescription: values.prescription,
            requisites: values.requisites.content.map((requisite) => {
              if (requisite.type === 'Medicamento') {
                return {
                  type: 'drug',
                  title: requisite.title,
                  id: requisite.value,
                  quantity: Number(requisite.quantity),
                  day: Number(requisite.day),
                  infusion: {
                    type: requisite.infusion.type.value,
                    time: [String(requisite.infusion.time).replace(/\D/g, '')].map((time) => {
                      if (time.length) {
                        const d = `${time[0]}${time[1]}`;
                        const h = `${time[2]}${time[3]}`;
                        const m = `${time[4]}${time[5]}`;
                        const s = `${time[6]}${time[7]}`;

                        return Number(d) * 86400 + Number(h) * 3600 + Number(m) * 60 + Number(s);
                      } else return time;
                    })[0],
                  },
                  concentration: {
                    ...requisite.concentration,
                    value: Number(requisite.concentration.value),
                  },
                  group: requisite.group,
                };
              } else
                return {
                  type: 'material',
                  title: requisite.title,
                  quantity: Number(requisite.quantity),
                  category: requisite.category,
                  id: requisite.value,
                };
            }),
            protocol: {name: values.protocols.label, id: values.protocols.value},
          };
          console.log(payLoad);
          try {
            if (type === 'edit') {
            } else {
              addPrescriptions(payLoad);
              // resetForm();
              toast.success(`Prescrição adicionada com sucesso!`);
            }
          } catch (e) {
            toast.error(`🚨 Erro ao adicionar a prescrição!`);
          } finally {
            if (type === 'edit') {
              // resetUpdate()
            } else {
              resetAdd();
            }
          }
        }}

        //   validationSchema={validate}
      >
        {(formik) => (
          <Modal type={type} title='Prescrição' isSuccess={false} isError={false}>
            <FomikHooks protocols={protocols} />
            {formik.values.patient.id?.change &&
              formik.values.patient.id?.label !== formik.values.patient.name &&
              !open &&
              patients
                .filter((patient) => formik.values.patient.id.value === patient.id)
                .map((e) => {
                  const new_patient = new Object({
                    nip: e.nip,
                    id: {value: e.id, label: e.name},
                    name: e.name,
                    mother_name: e.mothers_name,
                    email: e.email,
                    cpf: e.cpf,
                    phone: e.phone,
                    address: e.address,
                    cep: e.cep,
                    health_plan: {name: e.health_plan, number: e.health_plan_number},
                    birth_day: e.birth_date,
                    weight: {value: e.weight, mesure: 'kg'},
                    height: {value: e.height, mesure: 'm'},
                    patology: e.pathology,
                    gender: e.gender,
                    alergy: e.allergy,
                    obs: e.obs,
                  });
                  formik.setFieldValue('patient', new_patient);
                })}
            <Form>
              <CardBody className='invoice-padding pt-0'>
                <h4 className='mt-1 '>Informações de Paciente</h4>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='6'>
                    <SelectField
                      name='patient.id'
                      options={patients.map((patient) => ({
                        value: patient.id,
                        label: patient.name,
                      }))}
                      label='Paciente'
                      fmk={formik}
                    />
                  </Col>
                </Row>
                <div className='border rounded p-1 mr-1'>
                  {formik.values.patient.id === '' ? (
                    <span>Não há um paciente Selecionado...</span>
                  ) : (
                    <>
                      <div className='d-flex justify-content-between  mb-2'>
                        <h4>{formik.values.patient.name}</h4>
                        <div
                          className='cursor-pointer opacity-hover'
                          onClick={() => editPatientData(formik.values.patient.id.value)}
                        >
                          <Edit size={16} color='#0557bc' />
                        </div>
                      </div>
                      {!open ? (
                        <>
                          <h5>Informações Pessoais</h5>
                          <Row>
                            <Col>
                              <Label>Nome</Label>
                              <br />
                              <b>{formik.values.patient.name}</b>
                            </Col>
                            <Col>
                              <Label>Nome da mãe</Label>
                              <br />
                              <b>{formik.values.patient.mother_name}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label>Nascimento</Label>
                              <br />
                              <b>
                                {String(
                                  new Date(formik.values.patient.birth_day).getDate()
                                ).padStart(2, '0')}
                                /
                                {String(
                                  new Date(formik.values.patient.birth_day).getMonth() + 1
                                ).padStart(2, '0')}
                                /{String(new Date(formik.values.patient.birth_day).getFullYear())}
                              </b>
                            </Col>

                            <Col>
                              <Label>Peso</Label>
                              <br />
                              <b>
                                {formik.values.patient.weight.value}
                                {formik.values.patient.weight.mesure}
                              </b>
                            </Col>

                            <Col>
                              <Label>Altura</Label>
                              <br />
                              <b>
                                {formik.values.patient.height.value}
                                {formik.values.patient.height.mesure}
                              </b>
                            </Col>
                          </Row>
                          <hr />
                          <h5>Informações de Contato</h5>
                          <Row>
                            <Col>
                              <Label>Email</Label>
                              <br />
                              <b>{formik.values.patient.email}</b>
                            </Col>
                            <Col>
                              <Label>CPF</Label>
                              <br />
                              <b>{formik.values.patient.cpf}</b>
                            </Col>
                            <Col>
                              <Label>Telefone</Label>
                              <br />
                              <b>{formik.values.patient.phone}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label>Endereço</Label>
                              <br />
                              <b>{formik.values.patient.address}</b>
                            </Col>
                            <Col>
                              <Label>CEP</Label>
                              <br />
                              <b>{formik.values.patient.cep}</b>
                            </Col>
                          </Row>
                          <hr />
                          <h5>Informações de Saúde</h5>
                          <Row>
                            <Col>
                              <Label>Nome do Convênio</Label>
                              <br />
                              <b>{formik.values.patient.health_plan.name}</b>
                            </Col>
                            <Col>
                              <Label>Número do Convênio</Label>
                              <br />
                              <b>{formik.values.patient.health_plan.number}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label>Patologia</Label>
                              <br />
                              <b>{formik.values.patient.patology}</b>
                            </Col>
                            <Col>
                              <Label>Sexo</Label>
                              <br />
                              <b>{formik.values.patient.gender}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label>Alergias</Label>
                              <br />
                              <b>{formik.values.patient.alergy || 'Não Aferido'}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label>Observações</Label>
                              <br />
                              <b>{formik.values.patient.obs || 'Não Aferido'}</b>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          <h5>Informações Pessoais</h5>
                          <Row>
                            <Col>
                              <TextField label='Nome' placeholder='Nome' name='patient.name' />
                            </Col>
                            <Col>
                              <TextField
                                label='Nome da mãe'
                                placeholder='Nome da mãe'
                                name='patient.mother_name'
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <DateTimePickerField
                                fmk={formik}
                                name='patient.birth_day'
                                label='Nascimento'
                                placeholder='Data'
                              />
                            </Col>

                            <Col>
                              <MesureField
                                label='Peso'
                                placeholder='Peso'
                                name='patient.weight.value'
                                unity='Kg'
                              />
                            </Col>

                            <Col>
                              <MesureField
                                label='Altura'
                                placeholder='Altura'
                                name='patient.height.value'
                                unity='m'
                              />
                            </Col>
                          </Row>
                          <hr />
                          <h5>Informações de Contato</h5>
                          <Row>
                            <Col>
                              <TextField label='Email' placeholder='Email' name='patient.email' />
                            </Col>
                            <Col>
                              <CPFField name='patient.cpf' />
                            </Col>
                            <Col>
                              <PhoneField name='patient.phone' />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <TextField
                                label='Endereço'
                                placeholder='Endereço'
                                name='patient.address'
                              />
                            </Col>
                            <Col>
                              <CEPField name='patient.cep' />
                            </Col>
                          </Row>
                          <hr />
                          <h5>Informações de Saúde</h5>
                          <Row>
                            <Col>
                              <TextField
                                name='patient.health_plan.name'
                                label='Nome do Convênio'
                                placeholder='Nome'
                              />
                            </Col>
                            <Col>
                              <TextField
                                name='patient.health_plan.number'
                                label='Número do Convênio'
                                placeholder='Número'
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <TextField
                                name='patient.patology'
                                label='Patologia'
                                placeholder='Patologia'
                              />
                            </Col>
                            <Col>
                              <Label>Sexo</Label>
                              <br />
                              <b>{formik.values.patient.gender}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <TextField
                                name='patient.alergy'
                                label='Alergias'
                                placeholder='Alergias'
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <TextField
                                name='patient.obs'
                                label='Observações'
                                placeholder='Observações'
                              />
                            </Col>
                          </Row>
                        </>
                      )}
                    </>
                  )}
                </div>
                <h4 className='mt-3 '>Informações da Prescrição</h4>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='6'>
                    <TextField
                      name='prescription.immunohistochemistry'
                      label='Imunohistoquímica'
                      placeholder='Imunohistoquímica'
                    />
                  </Col>
                  <Col className='col-bill-to pl-0 ' lg='3'>
                    {/* <TextField
                      label='Estagiamento TNM'
                      placeholder='Estagiamento TNM'
                    /> */}
                    <TNMField name='prescription.tnm_staging' />
                  </Col>
                  <Col className='col-bill-to pl-0 ' lg='3'>
                    <TextField
                      name='prescription.clinic_state'
                      label='Estado Clínico'
                      placeholder='Estado Clínico'
                    />
                  </Col>
                </Row>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0 ' lg='6'>
                    <TextField name='prescription.cid' label='CID' placeholder='CID' />
                  </Col>
                  <Col className='col-bill-to pl-0 ' lg='6'>
                    <TextField
                      name='prescription.therapeutic_plan'
                      label='Plano Terapêutico'
                      placeholder='Plano Terapêutico'
                    />
                  </Col>
                </Row>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0 ' lg='6'>
                    <TextField
                      name='prescription.treatment'
                      label='Tratamento'
                      placeholder='Tratamento'
                    />
                  </Col>
                  <Col className='col-bill-to pl-0 ' lg='6'>
                    <TextField name='prescription.cicle' label='Ciclo' placeholder='Ciclo' />
                  </Col>
                </Row>
                <h4 className='mt-3 '>Informações de Protocolo e Requisistos</h4>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='12'>
                    <SelectField
                      name='protocols'
                      label='Protocolos Propostos'
                      placeholder='Protocolos'
                      fmk={formik}
                      options={getProtocolsFormatted(protocols)}
                      isClearable
                    />
                  </Col>
                </Row>
                <Row className='row-bill-to invoice-spacing pr-1'>
                  <Label className='form-label'>Requisitos</Label>
                  <Col className='col-bill-to  border rounded pl-0 pr-0' lg='12'>
                    <RequisiteRepeater
                      formik={formik}
                      AllDrugs={AllDrugs}
                      AllMaterials={AllMaterials}
                    />
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
function getGroupsFormatted(data) {
  return {
    content: [
      ...data.map((d, i) => {
        return {title: d.scientific_name, value: d.id};
      }),
    ],
  };
}
function getMaterialFormatted(data) {
  return {
    content: [
      ...data.map((d, i) => {
        return {title: d.name, value: d.id};
      }),
    ],
  };
}
function getProtocolsFormatted(data) {
  return [
    ...data.map((d, i) => {
      return {label: `${d.name}`, value: d.id};
    }),
  ];
}
