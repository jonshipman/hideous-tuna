/**
 * Mock Control
 *
 * @package
 */

/**
 * Component to display a single field inside the Form Container.
 *
 * @param array field Field object shown.
 * @param function onClick Passed onClick action.
 * @param object active Current active field (highlighted).
 * @param array.field
 * @param array.onClick
 * @param array.active
 * @return JSX
 */
export function MockControl( { field, onClick, active } ) {
	const { weight, label, required } = field;
	let className = 'pa2 pointer flex-none ';

	switch ( weight ) {
		case 2:
			className += 'w-50-l';
			break;
		case 3:
			className += 'w-third-l';
			break;
		case 4:
			className += 'w-25-l';
			break;
		case 5:
			className += 'w-20-l';
			break;
		default:
			className += 'w-100';
	}

	return (
		<div { ...{ className, onClick } }>
			<div
				className={ `br2 pa2 ${
					active ? 'bg-green' : 'bg-near-white'
				}` }
			>
				<div className="pa2 bg-white br2">
					{ label }{ ' ' }
					{ required ? <span className="red">*</span> : null }
				</div>
			</div>
		</div>
	);
}
