import {useState} from 'react'
import {useField} from 'formik'
import {
  Label,
  Input,
  InputGroupText,
  Dropdown,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'

export const SelectTextField = ({label, ...props}) => {
  const value_props = {...props, name: `${props.name}.value`}
  const mesure_props = {...props, name: `${props.name}.mesure`}
  const [value_field, value_meta, value_helpers] = useField(value_props)
  const [mesure_field, mesure_mete, mesure_helers] = useField(mesure_props)

  const [open, setOpen] = useState(false)
  return (
    <>
      <Label className='form-label'>{label}</Label>
      <InputGroup>
        <Input
          {...value_field}
          {...value_props}
          type='number'
          className={`form-control ${value_meta.touched && value_meta.error ? 'is-invalid' : null}`}
        />
        <InputGroupText
          className={`after ${value_meta.touched && value_meta.error ? 'is-invalid' : null}`}
        >
          <Dropdown
            isOpen={open}
            toggle={(e) => {
              //   console.log(e.target.innerHTML)
            }}
          >
            <DropdownToggle color='transparent' className='p-0 m-0'>
              <span
                onClick={() => {
                  setOpen(!open)
                }}
              >
                {mesure_field.value}
              </span>
            </DropdownToggle>

            <DropdownMenu
              onChange={(e) => {
                console.log(e)
              }}
            >
              {props.options.map((option, index) => {
                return (
                  <DropdownItem
                    className='w-100'
                    disabled={option === mesure_field.value ? true : false}
                    key={`drop${index}`}
                    onClick={() => {
                      props.fmk.setFieldValue(`${props.name}.mesure`, option)
                      setOpen(false)
                    }}
                  >
                    {option}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </InputGroupText>
      </InputGroup>
      {value_meta.touched && value_meta.error ? (
        <div className='error'>{value_meta.error}</div>
      ) : null}
    </>
  )
}
