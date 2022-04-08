// import {addMaterials, getCategories, getMaterialsByCategory, updateMaterials} from '@api/materials'
import {Form, Formik} from 'formik';
import {toast} from 'react-toastify';
//@ts-ignore
import {CardBody, Col, Row} from 'reactstrap';
import * as Yup from 'yup';
import Breadcrumbs from '../../@core/components/breadcrumbs';
import Spinner from '../../@core/components/spinner/Fallback-spinner';
import {PriceField} from '../../components/Fields/PriceField';
import {SelectField} from '../../components/Fields/SelectField';
import {TextAreaField} from '../../components/Fields/TextAreaField';
import {TextField} from '../../components/Fields/TextField';
import Modal from '../../components/ui/Modal';
import {useCategory} from '../../utility/hooks/main/supplies/useCategory';
import useMaterial from '../../utility/hooks/main/supplies/useMaterial';

interface dataFormat {
  code: string;
  name: string;
  category: string;
  description: string;
  sell: number;
  buy: number;
  id?: string;
}

export default function addMaterial() {
  const {add} = useMaterial({});
  const {category} = useCategory();

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
  if (category.isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Breadcrumbs breadCrumbTitle='Materiais' breadCrumbActive='Adicionar' />
      <Formik
        initialValues={{
          name: '',
          category: {value: '', label: ''},
          buy: '',
          sell: '',
          code: '',
          description: '',
        }}
        onSubmit={async (values, {resetForm}) => {
          const payLoad: dataFormat = {
            code: values.code,
            name: values.name,
            category: values.category.value,
            description: values.description,
            sell: Number(values.sell.replace('.', '').replace(',', '.')),
            buy: Number(values.buy.replace('.', '').replace(',', '.')),
          };
          try {
            add.mutateAsync(payLoad);
            resetForm();
            toast.success(`Material adicionado com sucesso!`);
          } catch (e) {
            toast.error(`🚨 Erro ao adicionar o material.`);
          }
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <Modal type={'add'} title='Material'>
            <Form>
              <CardBody className='invoice-padding pt-0'>
                <h4 className='mt-1'>Informações de Material</h4>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='6'>
                    <SelectField
                      type={'create'}
                      name='category'
                      fmk={formik} //@ts-ignore
                      options={formatCategories(category.data)}
                      label='Categoria'
                    />
                  </Col>
                  <Col className='col-bill-to pl-0' lg='6'>
                    <TextField name='name' label='Nome do Material' />
                  </Col>
                </Row>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to pl-0' lg='4'>
                    <TextField name='code' label='Código' />
                  </Col>
                  <Col className='col-bill-to pl-0' lg='4'>
                    <PriceField name='buy' label='Valor de Compra' />
                  </Col>
                  <Col className='col-bill-to pl-0' lg='4'>
                    <PriceField name='sell' label='Valor de Venda' />
                  </Col>
                </Row>
              </CardBody>

              <hr className='invoice-spacing mt-0' />

              <CardBody className='invoice-padding py-0'>
                <Row>
                  <Col>
                    <TextAreaField name='description' label='Descrição' />
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
function formatCategories(categories: string[]) {
  return [
    ...categories.map((category) => {
      return {label: category, value: category};
    }),
  ];
}
