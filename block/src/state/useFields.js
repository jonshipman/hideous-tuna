import { useData } from '../data';
import { useQueryContext } from '../Context';

export function useFields() {
	const { attributes } = useQueryContext();

	const key = 'fields';

	const {
		[ key ]: fields,
		rows,
		active,
		setActive,
		updateActive,
		update,
		loading,
		error,
		refetch,
		remove,
		add,
		set,
	} = useData( {
		key: 'fields',
		endpoint: attributes.formName
			? `fields/${ attributes.formName }`
			: false,
		initialData: [],
		rows: true,
	} );

	return {
		loading,
		fields,
		rows,
		update,
		refetch,
		error,
		active,
		setActive,
		updateActive,
		remove,
		add,
		set,
	};
}
