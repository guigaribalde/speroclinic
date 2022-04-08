import React, {useContext} from 'react';
//@ts-ignore
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {ModalContext} from '../../utility/context/Modal';

interface BlankModalProps {
  children?: React.ReactNode;
  header?: React.ReactNode | string;
  button?: React.ReactNode;
  icon?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export const BlankModal = (props: BlankModalProps) => {
  const {open, setOpen} = useContext(ModalContext);

  return (
    <>
      {!!props.button && <div onClick={() => setOpen(true)}>{props.button}</div>}
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className='modal-dialog-centered '
        fade={false}
      >
        <ModalBody className='p-0 border rounded'>
          <ModalHeader toggle={() => setOpen(false)}>{props.header}</ModalHeader>
          {!!props.icon && (
            <div
              className='w-100 bg-body d-flex align-items-center justify-content-center'
              style={{
                height: '90px',
                borderTopLeftRadius: '5.012px',
                borderTopRightRadius: '5.012px',
              }}
            >
              {props.icon}
            </div>
          )}
          <div className='p-1'>
            {!!props.breadcrumb && (
              <div className='d-flex align-items-center'>{props.breadcrumb}</div>
            )}
            {props.children}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
