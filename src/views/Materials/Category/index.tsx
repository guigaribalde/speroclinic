import Breadcrumbs from '../../../@core/components/breadcrumbs';
import DataTable from '../../../components/ui/DataTable';
import {useMaterialsByCategory} from '../../../utility/hooks/main/supplies/useMaterial';
import {columns, ExpandableTable} from './Data';

interface categoryProps {
  match: {params: {category: string}};
}

export default function Category(props: categoryProps) {
  const {category} = props.match.params;
  const {data, isLoading, isFetching} = useMaterialsByCategory(category);
  if (!isLoading) {
    console.table(data);
  }

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle='Materiais' //@ts-ignore
        breadCrumbParent='Categorias'
        breadCrumbParentHref='material/list'
        breadCrumbActive={category}
      />
      <DataTable
        data={data}
        isLoading={isLoading}
        columns={columns}
        ExpandableTable={ExpandableTable}
        title={category}
        isFetching={isFetching}
      />
    </>
  );
}
