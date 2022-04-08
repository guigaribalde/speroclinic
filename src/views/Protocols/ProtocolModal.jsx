import {getAllDrugs} from '@api/drugs';
import {getAllMaterials} from '@api/materials';
import {addProtocol, editProtocol, getProtocolOne} from '@api/protocols';
import Breadcrumbs from '@components/breadcrumbs';
import Spinner from '@components/spinner/Fallback-spinner';
import {Form, Formik} from 'formik';
import {useEffect, useState} from 'react';
import {
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
} from 'reactstrap';
import * as Yup from 'yup';
import {TextField} from '../../components/Fields/TextField';
import {RequisiteRepeater} from '../../components/Repeaters/RequisiteRepeater';
import Modal from '../../components/ui/Modal';

export default function MaterialModal(props) {
  const {type, id} = props.match.params;
  const {data: AllDrugs, isLoading: isLoadingAllDrugs} = getAllDrugs();
  const {data: AllMaterials, isLoading: isLoadingAllMaterials} = getAllMaterials();
  const {
    mutateAsync: addProtocolf,
    isSuccess: isAddSuccess,
    isError: isAddError,
    reset: resetAdd,
  } = addProtocol();
  const {data: protocolData, isLoading: isProtocolLoading} = id
    ? getProtocolOne(id)
    : {isLoading: false, data: undefined};

  const {
    mutateAsync: updateProtocol,
    isSuccess: isUpdateSucess,
    isError: isUpdateError,
    reset: resetUpdate,
  } = editProtocol();

  const validate = Yup.object({
    name: Yup.string().required('Campo necessário!'),
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

  function remove(index, fmk) {
    const copy = fmk.values.requisites.content;
    copy.splice(index, 1);
    fmk.setFieldValue(`requisites.content`, copy);
  }
  if (isLoadingAllDrugs || isLoadingAllMaterials || isProtocolLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle='Protocolos'
        breadCrumbActive={type === 'add' ? 'Adicionar' : 'Editar'}
      />
      <Formik
        initialValues={
          type === 'edit'
            ? {...getProtocolFormatted(protocolData)}
            : {
                name: '',
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
            name: values.name,
            ...(type === 'edit' ? {id: values.id} : {}),
            requisites: {
              content: values.requisites.content.map((requisite) => {
                return {
                  type: requisite.type === 'Material' ? 'material' : 'drug',
                  // id: requisite.id,
                  value: requisite.value,
                  quantity: Number(requisite.quantity),
                  title: requisite.title,
                  ...(requisite.type === 'Medicamento'
                    ? {
                        day: requisite.day,
                        infusion: {
                          type: requisite.infusion.type.value,
                          time: [requisite.infusion.time.replace(/\D/g, '')].map((time) => {
                            if (time.length) {
                              const d = `${time[0]}${time[1]}`;
                              const h = `${time[2]}${time[3]}`;
                              const m = `${time[4]}${time[5]}`;
                              const s = `${time[6]}${time[7]}`;

                              return (
                                Number(d) * 86400 + Number(h) * 3600 + Number(m) * 60 + Number(s)
                              );
                            } else return time;
                          })[0],
                        },
                        concentration: {
                          mesure: requisite.concentration.mesure,
                          value: requisite.concentration.value,
                        },
                      }
                    : {}),
                };
              }),
            },
          };
          try {
            if (type === 'edit') {
              await updateProtocol(payLoad);
            } else {
              await addProtocolf(payLoad);
              resetForm();
            }
          } catch (e) {
            console.log(e);
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
            title='Protocolo'
            isSuccess={isAddSuccess || isUpdateSucess}
            isError={isAddError || isUpdateError}
          >
            <Form>
              <CardBody className='invoice-padding pt-0'>
                <h4 className='mt-1'>Informações de Protocolo</h4>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='12'>
                    <TextField
                      name='name'
                      label='Nome do Protocolo'
                      placeholder='Nome do Protocolo'
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
  return data.map((d, i) => {
    return {title: d.scientific_name, value: d.id};
  });
}
function getMaterialFormatted(data) {
  return data.map((d, i) => {
    return {title: d.name, value: d.id};
  });
}
function getProtocolFormatted(data) {
  return {
    ...data,
    requisites: {...data.requisites, type: '', title: '', value: ''},
  };
}

function DropdownTGL({formik}) {
  const [open, setOpen] = useState(false);
  const options = ['Material', 'Medicamento'];

  useEffect(() => {
    if (!formik.values.requisites.type) {
      formik.setFieldValue('requisites.type', options[0]);
    }
  }, []);

  return (
    <Dropdown
      isOpen={open}
      toggle={(e) => {
        setOpen(!open);
      }}
    >
      <DropdownToggle color='transparent' className='p-0 m-0'>
        <span>{formik.values.requisites.type}</span>
      </DropdownToggle>
      <DropdownMenu>
        {options.map((o, i) => {
          return (
            <DropdownItem
              className='w-100'
              key={i}
              onClick={() => {
                formik.setFieldValue('requisites.type', o);
              }}
            >
              {o}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
