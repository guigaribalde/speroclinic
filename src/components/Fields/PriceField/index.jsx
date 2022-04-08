import Cleave from 'cleave.js/react';
import {useField} from 'formik';
import {InputGroup, InputGroupText, Label} from 'reactstrap';

export const PriceField = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label className='w-100'>
        {/* <h6 className='mb-1'>{label}</h6> */}
        <Label className='form-label'>{label}</Label>

        <InputGroup>
          <InputGroupText className={`before ${meta.touched && meta.error ? 'is-invalid' : null}`}>
            R$
          </InputGroupText>
          <Cleave
            className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
            options={{
              numeral: true,
              numeralDecimalMark: ',',
              delimiter: '.',
              numeralThousandsGroupStyle: 'thousand',
              numeralDecimalScale: 2,
              numeralPositiveOnly: true,
              rawValueTrimPrefix: true,
            }}
            max='10000'
            {...field}
            {...props}
          />
        </InputGroup>
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  );
};
