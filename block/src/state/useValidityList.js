/**
 * Validity Function List Hook
 *
 * @package
 */

import { useData } from '../data';

/**
 * Validity Function List Hook.
 *
 * Gets a random name from REST.
 *
 * @return array[] {
 *   name string Function name.
 *   label string Human identifying label for function.
 * }
 */
export function useValidityList() {
	const { validityFunctions, update, loading, error, refetch } = useData( {
		key: 'validityFunctions',
		initialData: [],
		endpoint: 'validity-functions',
	} );

	return { loading, validityFunctions, update, refetch, error };
}
