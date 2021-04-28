import { __, sprintf } from '@wordpress/i18n';
import { make_rows } from '../functions';

export function DataReducer(
	state,
	{ action, error = false, loading = false, data, key, active, id }
) {
	let workingData, _key;

	if ( key ) {
		_key = key;
	} else {
		_key = state.key;
	}

	switch ( action ) {
		case 'UPDATE_ACTIVE':
			if ( ! Array.isArray( state.data[ _key ] ) ) {
				return {
					...state,
					error: sprintf(
						__(
							'%s requires the data to be an array.',
							'hideous-tuna'
						),
						action
					),
				};
			}

		default:
			break;
	}

	switch ( action ) {
		case 'UPDATE_ACTIVE':
			if ( state.active?.id !== active.id ) {
				// Check for matching ids when the id changes.
				const error =
					state.data[ _key ].filter( ( f ) => f.id === active.id )
						.length > 0;

				if ( error ) {
					return {
						...state,
						error: __(
							'ID already exists. Choose another ID.',
							'hideous-tuna'
						),
					};
				}
			}

			// Update the Working Data from active update.
			workingData = {
				...state.data,
				[ _key ]: state.data[ _key ].map( ( f ) => {
					if ( state.active?.id === f.id ) {
						return { ...f, ...active };
					}

					return f;
				} ),
			};

			break;

		case 'DELETE':
			if ( Array.isArray( state.data[ _key ] ) ) {
				const deleteArrayData = state.data[ _key ].filter(
					( f ) => f && f.id !== id
				);

				workingData = {
					...state.data,
					[ _key ]: deleteArrayData,
				};
			} else {
				const { [ id ]: _, ...deletedData } = state.data[ _key ];
				workingData = {
					...state.data,
					[ _key ]: deletedData,
				};
			}
			break;

		case 'ADD':
			if ( Array.isArray( state.data[ _key ] ) ) {
				workingData = {
					...state.data,
					[ _key ]: [ ...state.data[ _key ], data ],
				};
			} else {
				if ( ! id ) {
					return {
						...state,
						error: sprintf(
							__(
								'%s requires the data to include an id when sending an object.',
								'hideous-tuna'
							),
							action
						),
					};
				}

				workingData = {
					...state.data,
					[ _key ]: { ...state.data[ _key ], [ id ]: data },
				};
			}
			break;

		case 'UPDATE':
			if ( Array.isArray( data ) ) {
				workingData = {
					...state.data,
					[ _key ]: data,
				};
			} else {
				workingData = {
					...state.data,
					[ _key ]: { ...state.data[ _key ], ...data },
				};
			}
			break;

		default:
			if ( data ) {
				workingData = {
					...state.data,
					[ _key ]: data,
				};
			} else {
				workingData = state.data;
			}
			break;
	}

	if ( state.includeRows ) {
		workingData = {
			...workingData,
			rows: make_rows( workingData[ _key ] ),
		};
	}

	switch ( action ) {
		case 'SET_ACTIVE':
			return {
				...state,
				data: workingData,
				active,
			};
		case 'UPDATE_ACTIVE':
			return {
				...state,
				data: workingData,
				loading: true,
				active,
			};
		case 'LOADING':
			return { ...state, loading: true };
		case 'FINISHED_LOADING':
			return { ...state, error: false, loading: false };
		case 'DELETE':
			return { ...state, data: workingData, loading, error, active: {} };
		case 'ERROR':
		case 'UPDATE':
		case 'ADD':
		case 'FILL':
			return { ...state, data: workingData, loading, error };
		case 'RESET':
			return {
				...state,
				data: { [ _key ]: state.initialData, rows: [] },
				loading: false,
				error: false,
			};
		default:
			return state;
	}
}
