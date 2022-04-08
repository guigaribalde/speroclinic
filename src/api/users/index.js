import { useQuery } from "react-query";
import axios from "axios";

async function fetchUsers() {
	const { data } = await axios.get("/user");
	console.log(data);
	return data;
}

export const getUsers = () => {
	const { isLoading, data, error } = useQuery("users", fetchUsers, {
		onSuccess: (data) => {
			return data;
		},
		onError: (error) => {
			return error;
		},
		refetchOnWindowFocus: true,
		refetchInterval: 1000,
	});
	return [isLoading, data, error];
};
