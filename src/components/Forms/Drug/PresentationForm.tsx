import {FormikProps} from 'formik';
import {ConcentrationField} from '../../Fields/ConcentrationField';
import {PriceField} from '../../Fields/PriceField';
import {TextField} from '../../Fields/TextField';
interface Presentation {
  name: string;
  type: string;
  concentration: {value: string; mesure: string};
  buy: string;
  sell: string;
  lab: string;
}
export const PresentationForm = ({
  index,
  formik,
}: {
  index: number;
  formik: FormikProps<{
    presentations: Presentation[];
  }>;
}) => {
  const NAME = 'presentations';
  return (
    <>
      <h4 className='mt-1'>Informações de Apresentação</h4>
      <div className='mt-1'></div>
      <TextField label='Nome' name={`${NAME}[${index}].name`} />
      <div className='mt-1'></div>
      <TextField label='Tipo' name={`${NAME}[${index}].type`} />
      <div className='mt-1'></div>
      <TextField label='Laboratório' name={`${NAME}[${index}].lab`} />
      <div className='mt-1'></div>
      <ConcentrationField
        label='Concentração'
        name={`${NAME}[${index}].concentration`}
        fmk={formik}
      />
      <div className='mt-1'></div>
      <PriceField label='Valor de compra' name={`${NAME}[${index}].buy`} />
      <div className='mt-1'></div>
      <PriceField label='Valor de venda' name={`${NAME}[${index}].sell`} />
    </>
  );
};
