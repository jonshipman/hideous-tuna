import { createContext, useContext, useRef } from '@wordpress/element';
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
	const QueryValues = useQueryContext();

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
	} = useFields();

	const type = useRef( 'empty' );

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
				...QueryValues,
			} }
		>
			{ children }
		</AppContext.Provider>
	);
}

export function QueryProvider( {
	children,
	attributes,
	setAttributes,
	isSelected,
} ) {
	const windowVariables = window.HIDEOUS_TUNA || {};

	return (
		<QueryContext.Provider
			value={ {
				attributes,
				setAttributes,
				isSelected,
				...windowVariables,
			} }
		>
			{ children }
		</QueryContext.Provider>
	);
}
