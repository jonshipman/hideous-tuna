/**
 * Form Hook
 *
 * @package
 */

import { useData } from '../data';

/**
 * Form Hook.
 *
 * Get forms from db.
 *
 * @return object { array forms }
 */
export function useForms() {
	const {
		forms,
		update,
		loading,
		error,
		refetch,
		remove,
		add,
		queried,
	} = useData( {
		key: 'forms',
		initialData: [],
	} );

	return { loading, forms, update, refetch, error, remove, add, queried };
}
