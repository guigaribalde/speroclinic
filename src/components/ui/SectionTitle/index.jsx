import React from 'react';
// import {Title} from './style'
export default function SectionTitle(props) {
  const {title, subtitle} = props;
  return (
    <div className='d-flex align-items-end mb-1'>
      {title && <h2 className='m-0 primary-color'>{title}</h2>}
      {subtitle && <h4 className='m-0 ml-1 secondary-color'>{subtitle}</h4>}
    </div>
  );
}
