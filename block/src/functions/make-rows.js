/**
 * Make Rows.
 *
 * @package
 */

/**
 * Takes the field array and produces manageable rows.
 *
 * @param array form_fields The array of field objects.
 * @param form_fields
 * @return array Array of arrays of form_fields chunked.
 */
export function make_rows( form_fields ) {
	const rows = [];
	let _t = [];

	form_fields.forEach( ( field ) => {
		if ( ! field ) {
			return;
		}

		if ( field.weight === 1 ) {
			if ( _t.length > 0 ) {
				rows.push( _t );
				_t = [];
			}

			rows.push( [ field ] );
		} else {
			_t.push( field );
		}
	} );

	if ( _t.length > 0 ) {
		rows.push( _t );
		_t = [];
	}

	return rows;
}
