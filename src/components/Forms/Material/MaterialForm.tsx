import {FormikProps} from 'formik';
import {useCategory} from '../../../utility/hooks/main/supplies/useCategory';
import {PriceField} from '../../Fields/PriceField';
import {SelectField} from '../../Fields/SelectField';
import {TextAreaField} from '../../Fields/TextAreaField';
import {TextField} from '../../Fields/TextField';

export const MaterialForm = ({
  formik,
}: {
  formik: FormikProps<{
    id?: string;
    code: string;
    name: string;
    description: string;
    category: {
      value: string;
      label: string;
    };
    buy: string;
    sell: string;
  }>;
}) => {
  const {category} = useCategory();
  //@ts-ignore
  const categories: string[] = category.data;
  return (
    <>
      <h4 className='mt-1'>Informações de Material</h4>
      <div className='mt-1'></div>
      <SelectField
        type='create'
        name='category'
        fmk={formik}
        options={
          category?.data && [
            ...categories.map((category) => {
              return {label: category, value: category};
            }),
          ]
        }
        label='Categoria'
      />
      <div className='mt-1'></div>
      <TextField name='name' label='Nome do Material' />
      <div className='mt-1'></div>
      <TextField name='code' label='Código' />
      <div className='mt-1'></div>
      <PriceField name='buy' label='Valor de Compra' />
      <div className='mt-1'></div>
      <PriceField name='sell' label='Valor de Venda' />
      <div className='mt-1'></div>
      <TextAreaField name='description' label='Descrição' />
    </>
  );
};
