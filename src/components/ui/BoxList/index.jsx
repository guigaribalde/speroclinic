import React, {useEffect} from 'react'
import {Container, IconContainer, Label} from './style'
import {useSkin} from '@hooks/useSkin'
export default function BoxList(props) {
  const {Icon, title, sub} = props
  const [skin, setSkin] = useSkin()

  return (
    <Container className='border rounded overflow-hidden'>
      <IconContainer>
        <Icon height={600} color={'#B9B9C3'} />
      </IconContainer>
      <Label className='label-bg'>
        <h5>{title}</h5>
        {sub ? <small>{sub}</small> : ''}
      </Label>
    </Container>
  )
  //   return (
  //     <div className='border rounded w-100 overflow-hidden' style={{height: '180px'}}>
  //       <div className='h-75 bg-secondary'>asd</div>
  //       <div className='h-25'></div>
  //     </div>
  //   )
}
