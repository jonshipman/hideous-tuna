import apiFetch from '@wordpress/api-fetch';
import { useQueryContext } from '../Context';

import { useMemo } from '@wordpress/element';

export function useActions( { key, endpoint } ) {
	const { rest_route } = useQueryContext();

	/**
	 * Memo of Raw db actions.
	 */
	return useMemo( () => {
		const _endpoint = endpoint ? endpoint : key;

		return {
			Get() {
				if ( false === endpoint ) {
					return new Promise( ( res ) => res( [] ) );
				}

				const path = `/${ rest_route }/get-${ _endpoint }`;

				return apiFetch( { path } );
			},

			Update( data ) {
				if ( false === endpoint ) {
					return new Promise( ( res ) => res( [] ) );
				}

				const path = `/${ rest_route }/${ _endpoint }`;

				return apiFetch( { path, method: 'POST', data } );
			},
		};
	}, [ rest_route, key, endpoint ] );
}
