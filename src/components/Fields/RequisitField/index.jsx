import React, {useState} from 'react'
import {X} from 'react-feather'
import {Col, Collapse, Row} from 'reactstrap'
import {NumberField} from '../NumberField'
import {SelectField} from '../SelectField'
import {SelectTextField} from '../SelectTextField'
import {TimeField} from '../TimeField'

export const RequisitField = (props) => {
  const cpy = {...props}
  delete cpy.remove
  delete cpy.open
  const concentration_props = {...cpy, name: `${cpy.name}[${cpy.locindex}].concentration`}
  const quantity_props = {...cpy, name: `${cpy.name}[${cpy.locindex}].quantity`}
  const infusiontime_props = {...cpy, name: `${cpy.name}[${cpy.locindex}].infusion.time`}
  const infusiontype_props = {...cpy, name: `${cpy.name}[${cpy.locindex}].infusion.type`}
  const day_props = {...cpy, name: `${cpy.name}[${cpy.locindex}].day`}
  const [open, setOpen] = useState(props.open || false)
  return (
    <div className='w-100 justify-content-between p-1 border rounded mb-1'>
      <Row className={`justify-content-between align-items-center w-100 ${open && 'mb-1'}`}>
        <Col
          className='mb-0 cursor-pointer'
          onClick={() => {
            setOpen(!open)
          }}
        >
          <div className='d-flex'>
            <h5 className='mb-0 mr-1'>{props.title}</h5>{' '}
            <small className='text-primary'>
              {props.type !== 'Medicamento' && `x${props.quantity} - `}
              {props.type}
            </small>
          </div>
        </Col>
        <div className='flex'>
          <div
            className='text-nowrap cursor-pointer'
            onClick={() => props.remove(props.locindex, props.fmk)}
          >
            <X size={14} />
          </div>
        </div>
      </Row>
      <Collapse isOpen={open}>
        <Row className='mb-1'>
          {props.type === 'Material' ? (
            <>
              <Col md={6}>
                <NumberField label='Quantidade' placeholder='Quantidade' {...quantity_props} />
              </Col>
            </>
          ) : props.type === 'Medicamento' ? (
            <>
              <Col md={3}>
                <SelectTextField
                  label='Concentração Total'
                  placeholder='Concentração Total'
                  options={['mg', 'ml', 'mg/m²', 'ml/m²']}
                  {...concentration_props}
                />
              </Col>
              <Col md={3}>
                <TimeField
                  label='Tempo de infusão'
                  placeholder='00d 00h 00m 00s'
                  {...infusiontime_props}
                />
              </Col>
              <Col md={3}>
                <SelectField
                  label='Via de infusão'
                  placeholder='Via'
                  options={[
                    {value: 'EV/IV', label: 'EV/IV'},
                    {value: 'VO', label: 'VO'},
                    {value: 'IT', label: 'IT'},
                    {value: 'IM', label: 'IM'},
                    {value: 'SC', label: 'SC'},
                  ]}
                  {...infusiontype_props}
                />
              </Col>
              <Col md={3}>
                <NumberField label='Dia' placeholder='Dia' {...day_props} />
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
      </Collapse>
    </div>
  )
}
