// ** React Imports
import {useState} from 'react';
import DataTable from 'react-data-table-component';
import {ChevronDown} from 'react-feather';
// ** Third Party Components
import ReactPaginate from 'react-paginate';
import {Card, CardHeader, CardTitle, Col, Input, Spinner} from 'reactstrap';

const DataTableWithButtons = (props) => {
  const {data, columns, ExpandableTable, title, isLoading, isFetching} = props;

  // ** State
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // ** Function to handle filter
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      nextLabel=''
      breakLabel='...'
      previousLabel=''
      pageRangeDisplayed={2}
      forcePage={currentPage}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      pageCount={Math.ceil(data.length / 10) || 1}
      onPageChange={(page) => handlePagination(page)}
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1 mr-1'
    />
  );

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          (item?.name && item?.name.toLowerCase().startsWith(value.toLowerCase())) ||
          (item?.scientific_name &&
            item?.scientific_name.toLowerCase().startsWith(value.toLowerCase())) ||
          (item?.nip && String(item?.nip).toLowerCase().startsWith(value.toLowerCase())) ||
          (item?.code && item?.code.toLowerCase().startsWith(value.toLowerCase())) ||
          (item?.profile && item?.profile.toLowerCase().startsWith(value.toLowerCase())) ||
          (item?.cpf && item?.cpf.toLowerCase().startsWith(value.toLowerCase())) ||
          (item?.email && item?.email.toLowerCase().startsWith(value.toLowerCase()));

        const includes =
          (item?.name && item?.name.toLowerCase().includes(value.toLowerCase())) ||
          (item?.scientific_name &&
            item?.scientific_name.toLowerCase().includes(value.toLowerCase())) ||
          (item?.nip && String(item?.nip).toLowerCase().includes(value.toLowerCase())) ||
          (item?.code && item?.code.toLowerCase().includes(value.toLowerCase())) ||
          (item?.profile && item?.profile.toLowerCase().includes(value.toLowerCase())) ||
          (item?.cpf && item?.cpf.toLowerCase().includes(value.toLowerCase())) ||
          (item?.email && item?.email.toLowerCase().includes(value.toLowerCase()));

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Col sm='12' md='7' lg='9' className='d-flex align-items-center p-1'>
          <CardTitle tag='h4'>{title}</CardTitle>
          {isFetching && (
            <div>
              <Spinner color='primary' className='ml-1' size='sm' />
            </div>
          )}
        </Col>
        <Col
          className='d-flex align-items-center justify-content-end w-100 p-1'
          sm='12'
          md='5'
          lg='3'
        >
          <Input
            className='dataTable-filter w-100'
            type='text'
            bsSize='sm'
            value={searchValue}
            onChange={handleFilter}
            placeholder='Pesquisar'
          />
        </Col>
      </CardHeader>
      <div className='react-dataTable mt-0' style={{minHeight: '645.4px'}}>
        <DataTable
          noHeader
          pagination
          data={searchValue.length ? filteredData : data}
          expandableRows={ExpandableTable ? true : false}
          columns={columns}
          expandOnRowClicked
          className='react-dataTable d-flex flex-column justify-content-between'
          style={{minHeight: '635.4px'}}
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={ExpandableTable ? <ExpandableTable /> : ''}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          paginationComponent={CustomPagination}
          progressPending={isLoading}
          progressComponent={
            <div style={{paddingBottom: '50px'}}>
              <Spinner color='primary' />
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default DataTableWithButtons;
