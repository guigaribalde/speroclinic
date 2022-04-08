//@ts-ignore
import {getBills} from '../../api/billing';
import DataTable from '../../components/ui/DataTable';
import {columns, ExpandableTable} from './Data';

interface categoryProps {
  match: {params: {group: string}};
}

export default function Bills(props: categoryProps) {
  const {group} = props.match.params;
  const {data, isLoading, isFetching} = getBills();
  console.log(data);
  return (
    <>
      <DataTable
        data={data}
        isLoading={isLoading}
        columns={columns}
        ExpandableTable={ExpandableTable}
        title={'Faturamento'}
        isFetching={isFetching}
      />
    </>
  );
}
