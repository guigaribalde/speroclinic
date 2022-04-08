import DataTable from "../../components/ui/DataTable";
import { columns } from "./Data";
import { getUsers } from "@api/users";

const List = () => {
	const [isLoading, data, error] = getUsers();

	return (
		<div>
			<DataTable
				data={data}
				isLoading={isLoading}
				columns={columns}
				title="Usuários"
			/>
		</div>
	);
};

export default List;
