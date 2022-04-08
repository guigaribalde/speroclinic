//@ts-ignore
import Breadcrumbs from '@components/breadcrumbs';
import DataTable from '../../../components/ui/DataTable';
import {useDrugsByGroup} from '../../../utility/hooks/main/drug/useDrug';
import {columns, ExpandableTable} from './Data';

interface categoryProps {
  match: {params: {group: string}};
}

export default function Group(props: categoryProps) {
  const {group} = props.match.params;
  const {drugs} = useDrugsByGroup(group);
  if (!drugs.isLoading) {
    console.table(drugs.data);
  }

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle='Medicamentos'
        breadCrumbParent='Substâncias'
        breadCrumbParentHref='drugs/list'
        breadCrumbActive={group}
      />
      <DataTable
        data={drugs.data}
        isLoading={drugs.isLoading}
        columns={columns}
        ExpandableTable={ExpandableTable}
        title={group}
        isFetching={drugs.isFetching}
      />
    </>
  );
}
