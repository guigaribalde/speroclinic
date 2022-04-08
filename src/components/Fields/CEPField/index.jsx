import Cleave from 'cleave.js/react';
import {useField} from 'formik';
import {Label} from 'reactstrap';

export const CEPField = ({label, ...props}) => {
  const mask = {
    delimiters: ['.', '-'],
    blocks: [2, 3, 3],
    numericOnly: true,
    delimiterLazyShow: true,
  };
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label className='w-100'>
        <Label className='form-label'>{label || 'CEP'}</Label>
        <Cleave
          className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
          placeholder='CEP'
          options={mask}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  );
};
