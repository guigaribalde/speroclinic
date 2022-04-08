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

export const ConcentrationField = ({label, ...props}) => {
  const valueProps = {...props, name: `${props.name}.value`}
  const mesureProps = {...props, name: `${props.name}.mesure`}
  const [fieldValue, metaValue, helpersValue] = useField(valueProps)
  const [fieldMesure, metaMesure, helpersMesure] = useField(mesureProps)

  const mesures = props.mesures || ['mg', 'g', 'ml', 'l']

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(fieldMesure.value)
  return (
    <>
      {/* <h6 className='mb-1'>{label}</h6> */}
      <Label className='form-label'>{label}</Label>
      <InputGroup>
        <Input
          type='number'
          {...fieldValue}
          {...valueProps}
          className={`form-control ${metaValue.touched && metaValue.error ? 'is-invalid' : null}`}
        />
        <InputGroupText
          className={`after ${metaValue.touched && metaValue.error ? 'is-invalid' : null}`}
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
                {fieldMesure.value}
              </span>
            </DropdownToggle>

            <DropdownMenu
              onChange={(e) => {
                console.log(e)
              }}
            >
              {mesures.map((mesure, index) => {
                return (
                  <DropdownItem
                    className='w-100'
                    disabled={mesure === fieldMesure.value ? true : false}
                    key={`drop${index}`}
                    onClick={() => {
                      props.fmk.setFieldValue(`${props.name}.mesure`, mesure)
                      setOpen(false)
                    }}
                  >
                    {mesure}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </InputGroupText>
      </InputGroup>
      {metaValue.touched && metaValue.error ? <div className='error'>{metaValue.error}</div> : null}
    </>
  )
}
