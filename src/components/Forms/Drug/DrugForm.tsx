import {FormikProps} from 'formik';
import * as Yup from 'yup';
import {useGroups} from '../../../utility/hooks/main/drug/useGroup';
import {SelectField} from '../../Fields/SelectField';
import {TextField} from '../../Fields/TextField';
import {PresentationRepeater} from '../../Repeaters/PresentationRepeater';
interface Presentation {
  name: string;
  type: string;
  concentration: {value: string; mesure: string};
  buy: string;
  sell: string;
  lab: string;
}

interface DrugFormProps {
  presentationsClosed?: boolean;
  formik: FormikProps<{
    group?: {value: number; label: string};
    scientific_name?: string;
    presentations: Presentation[];
  }>;
}

export const DrugForm = ({formik, presentationsClosed}: DrugFormProps) => {
  const {groups} = useGroups();
  //@ts-ignore
  const group: string[] = groups.data;
  return (
    <>
      <h4 className='mt-1'>Informações de Medicamento</h4>
      <div className='mt-1'></div>
      <SelectField
        type='create'
        name='group'
        fmk={formik}
        options={
          groups?.data && [
            ...group.map((group) => {
              return {label: group, value: group};
            }),
          ]
        }
        label='Grupo'
      />
      <div className='mt-1'></div>
      <TextField name='scientific_name' label='Nome Cientifico' />
      <div className='my-1' style={{maxHeight: '800px', overflowY: 'auto'}}>
        <PresentationRepeater formik={formik} presentationsClosed />
      </div>
    </>
  );
};

export const validate = Yup.object().shape({
  group: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string(),
    })
    .nullable()
    .required('Campo necessário!'),
  scientific_name: Yup.string().required('Campo necessário!'),
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
