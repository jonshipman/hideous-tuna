/**
 * Capitalize
 *
 * @package
 */

/**
 * Converts a dashed id into a suitable label.
 *
 * @param string str String to convert.
 * @param str
 * @return string Converted string.
 */
export function capitalize( str ) {
	str = str.replace( /-/g, ' ' );
	let arr = str.split( ' ' );
	arr = arr.map(
		( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 )
	);

	return arr.join( ' ' );
}
