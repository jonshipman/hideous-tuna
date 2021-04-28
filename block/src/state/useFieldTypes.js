/**
 * Field Types Hook
 *
 * @package
 */

import { useData } from '../data';

/**
 * Field Types Hook.
 *
 * Gets a random name from REST.
 *
 * @return array[] {
 *   name string Function name.
 *   label string Human identifying label for function.
 * }
 */
export function useFieldTypes() {
	const { fieldTypes, update, loading, error, refetch } = useData( {
		key: 'fieldTypes',
		initialData: [],
	} );

	return { loading, fieldTypes, update, refetch, error };
}
