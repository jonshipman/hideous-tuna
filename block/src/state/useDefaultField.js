/**
 * Default Fields State Hook
 *
 * @package
 */

import { useData } from '../data';

/**
 * Default Fields Hook.
 *
 * Gets the default fields from REST and stores in AppContext.
 *
 * @return object { array defaultFields }
 */
export function useDefaultField() {
	const { defaultFields, update, loading, error, refetch } = useData( {
		key: 'defaultFields',
		initialData: [],
	} );

	return { loading, defaultFields, update, refetch, error };
}
