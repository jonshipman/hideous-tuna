import { __ } from '@wordpress/i18n';
import { DataReducer } from './DataReducer';
import { useDataRefs } from './useDataRefs';
import { useActions } from './useActions';

import { useCallback, useReducer, useEffect } from '@wordpress/element';

export function useData( {
	key,
	initialData = {},
	endpoint,
	rows: includeRows,
} ) {
	const [
		{ loading, error, data, active, queried },
		updateData,
	] = useReducer( DataReducer, {
		error: false,
		loading: false,
		data: { [ key ]: initialData, rows: [] },
		key,
		initialData,
		active: {},
		includeRows,
		queried: false,
	} );

	const { updateTimeout, mounted, previousData, cache, init } = useDataRefs( {
		data,
		loading,
		initialData,
	} );

	const Actions = useActions( { endpoint, key } );

	const updateCache = useCallback(
		( _data ) => {
			cache.current = _data;
		},
		[ cache ]
	);

	const getCache = useCallback( () => {
		return cache.current || initialData;
	}, [ initialData, cache ] );

	/**
	 * Refetches the data.
	 */
	const refetch = useCallback( () => {
		updateData( { action: 'LOADING' } );

		const Get = async () => {
			const results = await Actions.Get();

			if ( mounted.current ) {
				updateData( { action: 'FILL', data: results } );
			}

			updateCache( results );

			return results;
		};

		return Get();
	}, [ Actions, key, initialData, updateCache, mounted ] );

	/**
	 * Updates the state and starts timer to send db update.
	 */
	const updateAsync = useCallback(
		( _data ) => {
			const UpdateAsync = async () => {
				clearTimeout( updateTimeout.current );

				const TimeoutPromise = () =>
					new Promise( ( resolve ) => {
						updateTimeout.current = setTimeout( resolve, 1000 );
					} );

				await TimeoutPromise();

				let result;

				try {
					result = await Actions.Update( _data );
				} catch ( e ) {
					result = null;
				}

				const cache_filler = { data: getCache() };

				if ( result?.success ) {
					if ( Array.isArray( cache_filler.data ) ) {
						cache_filler.data = _data;
					} else {
						cache_filler.data = {
							...( cache_filler.data || {} ),
							..._data,
						};
					}

					updateCache( cache_filler.data );
				}

				if ( mounted.current ) {
					if ( result?.success ) {
						updateData( { action: 'FINISHED_LOADING' } );
					} else {
						updateData( {
							key,
							action: 'ERROR',
							data: previousData.current,
							error:
								result?.message ||
								__( 'There has been an error', 'hideous-tuna' ),
						} );
					}
				}

				return result;
			};

			return UpdateAsync();
		},
		[
			Actions,
			initialData,
			updateCache,
			getCache,
			previousData,
			mounted,
			updateTimeout,
		]
	);

	/**
	 * Standard Update callback.
	 */
	const update = useCallback(
		( _data ) => {
			updateData( { action: 'UPDATE', data: _data, key, loading: true } );

			updateAsync( _data );
		},
		[ updateAsync, key ]
	);

	/**
	 * Sets the data (replaces).
	 */
	const set = useCallback(
		( _data ) => {
			updateData( { action: 'FILL', data: _data, key } );

			updateAsync( _data );
		},
		[ updateAsync, key ]
	);

	/**
	 * Adds a new item to a data array.
	 * Kicks off db update timer.
	 */
	const add = useCallback(
		( item, id = 0 ) => {
			updateData( { action: 'ADD', data: item, loading: true, id } );

			const cachedData = getCache();

			if ( Array.isArray( cachedData ) ) {
				updateAsync( [ ...cachedData, item ] );
			} else {
				updateAsync( { ...cachedData, [ id ]: item } );
			}
		},
		[ key, initialData, getCache, updateAsync ]
	);

	/**
	 * Deletes a item from an array.
	 */
	const remove = useCallback(
		( id ) => {
			const cachedData = getCache();

			if ( ! cachedData ) {
				updateData( {
					action: 'ERROR',
					error: __(
						"You're deleting nothing from cache.",
						'hideous-tuna'
					),
				} );
			} else {
				updateData( { action: 'DELETE', id } );

				if ( Array.isArray( cachedData ) ) {
					updateAsync(
						cachedData.filter( ( o ) => {
							if ( o?.id ) {
								return o.id !== id;
							}

							return o !== id;
						} )
					);
				} else {
					const { [ id ]: _, ...newData } = cachedData || {};
					updateAsync( newData );
				}
			}
		},
		[ getCache, updateAsync ]
	);

	// Sets the active object in the state.
	const setActive = useCallback( ( active ) => {
		updateData( { action: 'SET_ACTIVE', active } );
	}, [] );

	/**
	 * Updates the active object.
	 * Kicks off db update timer.
	 */
	const updateActive = useCallback(
		( active ) => {
			let _data = [ ...getCache() ];

			updateData( { action: 'UPDATE_ACTIVE', active } );

			// Replaces the item updating with the active item.
			_data = _data.map( ( o ) => {
				if ( o?.id === active?.id ) {
					return active;
				}

				return o;
			} );

			updateAsync( _data );
		},
		[ updateAsync, getCache ]
	);

	/**
	 * Loads initial data.
	 */
	useEffect( () => {
		if ( ! init.current ) {
			init.current = true;

			if ( mounted.current ) {
				refetch();
			}
		}
	}, [ refetch, mounted ] );

	const payload = {
		Actions,
		refetch,
		update,
		loading,
		error,
		[ key ]: data[ key ],
		mounted,
		updateTimeout,
		active,
		setActive,
		updateActive,
		remove,
		add,
		set,
		queried,
	};

	if ( includeRows ) {
		payload.rows = data.rows || [];
	}

	return payload;
}
