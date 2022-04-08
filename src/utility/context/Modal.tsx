import {createContext, useState} from 'react';

type Props = {
  children?: React.ReactNode;
};
const ModalContext = createContext({
  modal: null,
  setModal: (props: React.ReactNode) => {},
  open: false,
  setOpen: (props: boolean) => {},
});

const ModalProvider = (props: Props) => {
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider
      // @ts-ignore
      value={{modal, setModal, open, setOpen}}
    >
      {modal}
      {props.children}
    </ModalContext.Provider>
  );
};

export {ModalProvider, ModalContext};
