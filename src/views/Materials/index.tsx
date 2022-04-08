// import {getCategories} from '@api/materials'
// import Breadcrumbs from '@components/breadcrumbs'
import React from 'react';
import {Package} from 'react-feather';
import {Link} from 'react-router-dom';
//@ts-ignore
import {Col, Row, Spinner} from 'reactstrap';
import Box from '../../components/ui/BoxList';
import {useCategory} from '../../utility/hooks/main/supplies/useCategory';

export default function Materials() {
  const {category} = useCategory();

  if (category.isLoading) {
    return (
      <div className='position-absolute' style={{top: '50%', left: '50%'}}>
        <Spinner color='primary' />
      </div>
    );
  }
  return (
    <div className='flex w-100 flex-wrap flex-row'>
      <Row className='mb-2 w-100'>
        {!category.data?.length && (
          <div className='p-1'>
            <h3 className='m-0'>Ooops..</h3>
            <br />
            <p>
              Não existem materiais adicionados, mas você pode{' '}
              <Link to='/material/add'>adicionar novos aqui!</Link>
            </p>
          </div>
        )}
        {
          //@ts-ignore
          category.data.map((item) => (
            <Col sm='3' key={`item${item}`}>
              <Link to={`/material/category/${item}`}>
                <Box Icon={Package} title={item} />
              </Link>
            </Col>
          ))
        }
      </Row>
    </div>
  );
}
