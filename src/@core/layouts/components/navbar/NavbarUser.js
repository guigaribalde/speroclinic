// ** Dropdowns Imports
import {Fragment, useContext} from 'react';
// ** Third Party Components
import {Menu, Moon, PlusCircle, Sun} from 'react-feather';
import {NavItem, NavLink} from 'reactstrap';
import {ModalContext} from '../../../../utility/context/Modal';
import handleAdd from '../../../../utility/handleAdd';
import {useAddDrug} from '../../../../utility/hooks/main/drug/useDrug';
import {useAddMaterial} from '../../../../utility/hooks/main/supplies/useMaterial';
import UserDropdown from './UserDropdown';
const NavbarUser = (props) => {
  // ** Props
  const {skin, setSkin, setMenuVisibility} = props;
  const {modal: modalzi, setModal, setOpen} = useContext(ModalContext);
  const {mutateAsync: material} = useAddMaterial();
  const {mutateAsync: drug} = useAddDrug();

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />;
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />;
    }
  };

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none d-flex align-items-center'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink
            className='nav-menu-main menu-toggle hidden-xs is-active'
            onClick={() => setMenuVisibility(true)}
          >
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <div className='bookmark-wrapper d-flex align-items-center'>
        {/* <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style d-flex'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
        <NavItem className='d-none d-lg-block'>
          <div className='nav-link-style d-flex'>
            <div
              className='mx-1'
              style={{
                display: 'inline-block',
                alignSelf: 'stretch',
                width: '1.5px',
                height: '1.8em',
                backgroundColor: 'currentColor',
                opacity: '.25',
              }}
            ></div>
          </div>
        </NavItem> */}
        <NavItem
          className='d-none d-lg-block opacity-hover'
          onClick={() => {
            handleAdd(setModal, setOpen, material, drug);
          }}
        >
          <NavLink className='nav-link-style d-flex'>
            <PlusCircle className='ficon' />
          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <UserDropdown />
      </ul>
    </Fragment>
  );
};
export default NavbarUser;
