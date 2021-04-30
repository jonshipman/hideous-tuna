import {
	createContext,
	useContext,
	useEffect,
	useRef,
} from '@wordpress/element';
import { useFields } from './state';

const AppContext = createContext( {} );
const QueryContext = createContext( {} );

export function useQueryContext() {
	return useContext( QueryContext );
}

export function useAppContext() {
	return useContext( AppContext );
}

export function AppProvider( { children } ) {
	const { isSelected, ...QueryValues } = useQueryContext();

	const {
		fields,
		rows,
		active,
		error,
		updateActive,
		setActive,
		remove,
		add,
		set,
		loading,
		refetch,
	} = useFields();

	const type = useRef( 'empty' );

	/**
	 * Refetches the fields when isSelected changes to true.
	 */
	useEffect( () => {
		if ( isSelected ) {
			refetch();
		}
	}, [ isSelected ] );

	return (
		<AppContext.Provider
			value={ {
				fields,
				rows,
				type,
				active,
				error,
				updateActive,
				setActive,
				remove,
				add,
				set,
				loading,
				refetch,
				isSelected,
				...QueryValues,
			} }
		>
			{ children }
		</AppContext.Provider>
	);
}

export function QueryProvider( { children, ...props } ) {
	const windowVariables = window.HIDEOUS_TUNA || {};

	return (
		<QueryContext.Provider
			value={ {
				...props,
				...windowVariables,
			} }
		>
			{ children }
		</QueryContext.Provider>
	);
}
