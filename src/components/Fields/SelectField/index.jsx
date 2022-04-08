import {selectThemeColors} from '@utils';
import {useField} from 'formik';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {Label} from 'reactstrap';

export const SelectField = ({label, type, ...props}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label className='w-100' style={props.style}>
        {/* <h6 className='mb-1'>{label}</h6> */}
        <Label className='form-label'>{label}</Label>
        {type === 'create' ? (
          <CreatableSelect
            theme={selectThemeColors}
            className={`react-select ${meta.touched && meta.error ? 'is-invalid' : null}`}
            classNamePrefix='select'
            isClearable={false}
            {...field}
            {...props}
            placeholder={
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: 'rgb(185, 185, 195)',
                  marginLeft: '4px',
                }}
              >
                {props.placeholder}
              </span>
            }
            onChange={(e) => {
              if (props.isMulti) {
                props.fmk.setFieldValue(`${props.name}`, e);
              } else {
                props.fmk.setFieldValue(`${props.name}`, {...e, change: true});
              }
            }}
          />
        ) : (
          <Select
            theme={selectThemeColors}
            className={`react-select ${meta.touched && meta.error ? 'is-invalid' : null}`}
            classNamePrefix='select'
            isClearable={false}
            {...field}
            {...props}
            placeholder={
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: 'rgb(185, 185, 195)',
                  marginLeft: '4px',
                }}
              >
                {props.placeholder}
              </span>
            }
            onChange={(e) => {
              if (props.isMulti) {
                props.fmk.setFieldValue(`${props.name}`, e);
              } else {
                props.fmk.setFieldValue(`${props.name}`, {...e, change: true});
              }
            }}
          />
        )}
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  );
};
