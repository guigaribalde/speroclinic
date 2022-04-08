// ** React Imports
import {useHistory, Link} from 'react-router-dom'
// ** Third Party Components
import Proptypes from 'prop-types'
import {Grid, CheckSquare, MessageSquare, Mail, Calendar, ArrowLeft} from 'react-feather'
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'

const BreadCrumbs = (props) => {
  // ** Props
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParentHref,
    breadCrumbParent2,
    breadCrumbParent2Href,
    breadCrumbParent3,
    breadCrumbParent3Href,
    breadCrumbActive,
  } = props
  const history = useHistory()
  return (
    <div className=''>
      <div className='content-header row'>
        <span
          className='cursor-pointer'
          onClick={() => {
            console.log(history)
            history.goBack()
          }}
        >
          <ArrowLeft size={28} className='ml-1' />
        </span>
        <div className='content-header-left col-md-9 col-12 mb-2'>
          <div className='row breadcrumbs-top'>
            <div className='col-12'>
              {breadCrumbTitle ? (
                <h2 className='content-header-title float-left mb-0 d-flex align-items-center'>
                  {breadCrumbTitle}
                </h2>
              ) : (
                ''
              )}
              <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
                <Breadcrumb>
                  {breadCrumbParent ? (
                    <BreadcrumbItem tag='li' className='text-primary'>
                      <Link to={`/${breadCrumbParentHref}`}>{breadCrumbParent}</Link>
                    </BreadcrumbItem>
                  ) : (
                    ''
                  )}

                  {breadCrumbParent2 ? (
                    <BreadcrumbItem tag='li' className='text-primary'>
                      <Link to={`/${breadCrumbParent2Href}`}>{breadCrumbParent2}</Link>
                    </BreadcrumbItem>
                  ) : (
                    ''
                  )}
                  {breadCrumbParent3 ? (
                    <BreadcrumbItem tag='li' className='text-primary'>
                      <Link to={`/${breadCrumbParent3Href}`}>{breadCrumbParent3}</Link>
                    </BreadcrumbItem>
                  ) : (
                    ''
                  )}
                  <BreadcrumbItem tag='li' active>
                    {breadCrumbActive}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired,
}
