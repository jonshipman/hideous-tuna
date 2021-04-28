/**
 * Name Generation Hook
 *
 * @package
 */

import apiFetch from '@wordpress/api-fetch';
import { useAppContext } from '../Context';

import { useEffect, useCallback, useReducer } from '@wordpress/element';

/**
 * Name Generation Hook.
 *
 * Gets a random name from REST.
 *
 * @param p object{
 * 	array excludes Array of names to exclude.
 * }
 * @return object {
 * string name A Random name as returned.
 * bool loading When loading the REST name.
 * function GetNewName Call to get a promise for a new name.
 * }
 */
export function useNameGeneration( p ) {
	const { excludes = [] } = p || {};
	const { rest_route = '' } = useAppContext();
	const [ { name, loading }, updateName ] = useReducer( GeneratorReducer, {
		name: '',
		loading: false,
	} );

	const refetch = useCallback(
		( refetch_props ) => {
			const { excludes: _excludes } = refetch_props || {};

			updateName( { action: 'GET', loading: true } );

			let path = `/${ rest_route }/generate-name`;

			if ( _excludes ) {
				path += `/${ _excludes.join( ',' ) }`;
			} else if ( excludes?.length > 0 ) {
				path += `/${ excludes.join( ',' ) }`;
			}

			apiFetch( { path } ).then( ( response ) => {
				updateName( { action: 'GET', name: response, loading: false } );
			} );
		},
		[ excludes ]
	);

	useEffect( () => {
		if ( ! name && ! loading ) {
			refetch();
		}
	}, [ refetch, name, loading ] );

	return { name, loading, refetch };
}

function GeneratorReducer( state, { action, name, loading } ) {
	switch ( action ) {
		case 'GET':
			return { ...state, name, loading };
		default:
			return state;
	}
}
