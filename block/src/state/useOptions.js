/**
 * Options Hook
 *
 * @package
 */

import { useData } from '../data';

/**
 * Options Data Wrap.
 *
 * @return object
 */
export function useOptions() {
	const { options, update, loading, error, refetch } = useData( {
		key: 'options',
		initialData,
	} );

	return { loading, options, update, refetch, error };
}

const initialData = {
	recaptcha_site_key: '',
	recaptcha_secret: '',
};
