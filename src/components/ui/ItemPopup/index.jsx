import {getDrugById} from '@api/drugs';
import {getMaterialById} from '@api/materials';
import React, {useState} from 'react';
import {ChevronRight, Package, Tag} from 'react-feather';
import {Modal, ModalBody, ModalHeader, Spinner} from 'reactstrap';

export default function ItemPopup(props) {
  const {id, type, nostyle, edit} = props;
  const isMaterial = type === 'Material';
  const [disabledAnimation, setDisabledAnimation] = useState(false);
  const [insideModal, setinsideModal] = useState(false);
  const {data, isLoading} = isMaterial ? getMaterialById(id) : getDrugById(id);
  const [presentation, setPresentation] = useState({});
  // console.log(data)

  return (
    <>
      {!!nostyle ? (
        <div onClick={() => setDisabledAnimation(!disabledAnimation)}>{props.children}</div>
      ) : (
        <div
          className='border p-1 rounded cursor-pointer opacity-hover'
          color='primary'
          onClick={() => setDisabledAnimation(!disabledAnimation)}
        >
          {props.children}
        </div>
      )}
      <div className='demo-inline-spacing'>
        <div className='disabled-animation-modal'>
          {isLoading ? (
            <Modal
              isOpen={disabledAnimation}
              toggle={() => setDisabledAnimation(!disabledAnimation)}
              className='modal-dialog-centered '
              fade={false}
            >
              <ModalBody className='p-0 border rounded'>
                <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}></ModalHeader>

                <div className='p-3 d-flex align-items-center justify-content-center'>
                  <Spinner color='primary' />
                </div>
              </ModalBody>
            </Modal>
          ) : (
            <Modal
              isOpen={disabledAnimation}
              toggle={() => setDisabledAnimation(!disabledAnimation)}
              className='modal-dialog-centered '
              fade={false}
            >
              <ModalBody className='p-0 border rounded'>
                <ModalHeader toggle={() => setDisabledAnimation(!disabledAnimation)}></ModalHeader>
                <div
                  className='w-100 bg-body d-flex align-items-center justify-content-center'
                  style={{
                    height: '90px',
                    borderTopLeftRadius: '5.012px',
                    borderTopRightRadius: '5.012px',
                  }}
                >
                  {isMaterial ? (
                    <Package className='pb-2' height={600} color={'#B9B9C3'} />
                  ) : (
                    <Tag className='pb-2' height={600} color={'#B9B9C3'} />
                  )}
                </div>
                <div className='p-1'>
                  <div className='d-flex align-items-center'>
                    <small className='text-primary'>
                      <b>{isMaterial ? `Material` : `Medicamento`}</b>
                    </small>
                    <ChevronRight size={12} />
                    <small>{isMaterial ? `${data.category}` : `${data.group}`}</small>
                  </div>
                  <section className='d-flex align-items-end'>
                    <h4>{isMaterial ? data.name : data.scientific_name}</h4>
                    <h6 className='ml-1' style={{color: '#B9B9C3'}}>
                      {data.code}
                    </h6>
                  </section>

                  {!isMaterial ? (
                    <>
                      <span>
                        <b>Compra Médio: </b>R$
                        {String(
                          (
                            data.presentations
                              .map((presentation, i) => {
                                return Number(presentation.unitary_value);
                              })
                              .reduce((partialSum, a) => partialSum + a, 0) /
                            data.presentations.length
                          ).toFixed(2)
                        ).replace('.', ',')}
                      </span>{' '}
                      |{' '}
                      <span>
                        <b>Venda Médio: </b>R${' '}
                        {String(
                          (
                            data.presentations
                              .map((presentation, i) => {
                                return Number(presentation.sell_value);
                              })
                              .reduce((partialSum, a) => partialSum + a, 0) /
                            data.presentations.length
                          ).toFixed(2)
                        ).replace('.', ',')}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        <b>Compra: </b>R${data.unitary_value}
                      </span>{' '}
                      |{' '}
                      <span>
                        <b>Venda: </b>R${data.sell_value}
                      </span>
                    </>
                  )}

                  {isMaterial ? (
                    <p className='mt-2'>{data.description || 'Sem descrição disponível.'}</p>
                  ) : (
                    <p className='mt-2'>
                      <b>Apresentações: </b>
                      {data.presentations.map((presentation, i) => {
                        if (i !== data.presentations.length - 1)
                          return (
                            <a
                              href='#'
                              onClick={() => {
                                setPresentation(presentation);
                                setinsideModal(true);
                              }}
                              key={`${i}${presentation.name}`}
                            >
                              <u>{presentation.name}</u>,{' '}
                            </a>
                          );
                        return (
                          <a
                            onClick={() => {
                              setPresentation(presentation);
                              setinsideModal(true);
                            }}
                            href='#'
                            key={`${i}${presentation.name}`}
                          >
                            <u>{presentation.name}</u>
                          </a>
                        );
                      })}
                    </p>
                  )}
                </div>

                <Modal
                  isOpen={insideModal}
                  toggle={() => setinsideModal(!insideModal)}
                  className='modal-dialog-centered '
                  fade={false}
                >
                  <ModalBody className='p-0 border rounded'>
                    <ModalHeader toggle={() => setinsideModal(!insideModal)}></ModalHeader>

                    <div
                      className='w-100 bg-body d-flex align-items-center justify-content-center'
                      style={{
                        height: '90px',
                        borderTopLeftRadius: '5.012px',
                        borderTopRightRadius: '5.012px',
                      }}
                    >
                      <Tag className='pb-2' height={600} color={'#B9B9C3'} />
                    </div>

                    <div className='p-1'>
                      <div className='d-flex align-items-center'>
                        <small className='text-primary'>
                          <b>Medicamento</b>
                        </small>
                        <ChevronRight size={12} />
                        <small>{data.group}</small>
                        <ChevronRight size={12} />
                        <small>{data.scientific_name}</small>
                      </div>
                      <section className='d-flex align-items-end'>
                        <h4>
                          {presentation.name} ({presentation.type})
                        </h4>
                        <h6 className='ml-1' style={{color: '#B9B9C3'}}>
                          {presentation.lab}
                        </h6>
                      </section>
                      <span>
                        <b>Compra: </b>R${presentation.unitary_value}
                      </span>{' '}
                      |{' '}
                      <span>
                        <b>Venda: </b>R${presentation.sell_value}
                      </span>
                      <p className='mt-2'>
                        {presentation.description || 'Sem descrição disponível.'}
                      </p>
                    </div>
                  </ModalBody>
                </Modal>
              </ModalBody>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
