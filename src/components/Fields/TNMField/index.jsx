import Cleave from 'cleave.js/react';
import {useField} from 'formik';
import {Label} from 'reactstrap';

export const TNMField = ({label, ...props}) => {
  const mask = {
    delimiters: ['', ', N', ', M'],
    blocks: [1, 1, 1, 1],
    prefix: 'T',
    noImmediatePrefix: true,
  };
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label className='w-100'>
        <Label className='form-label'>{label || 'Estagiamento TNM'}</Label>
        <Cleave
          className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
          placeholder='TNM'
          options={mask}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  );
};
