import { useRef, useEffect } from '@wordpress/element';

export function useDataRefs( { data, loading, initialData } ) {
	const updateTimeout = useRef();
	const mounted = useRef( true );
	const previousData = useRef();
	const init = useRef();
	const cache = useRef( initialData );

	// Change mounted status stored in ref.
	useEffect( () => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, [] );

	useEffect( () => {
		if ( ! loading ) {
			previousData.current = data;
		}
	}, [ data, loading ] );

	return { updateTimeout, mounted, previousData, init, cache };
}
