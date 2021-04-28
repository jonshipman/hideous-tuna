/**
 * Block Container
 *
 * @package
 */

/**
 * Container for all direct block editor components.
 *
 * @param JSX children Children to render.
 * @param JSX.children
 * @return JSX
 */
export function Container( { children } ) {
	return <div className="pa3 bg-white br2 shadow-4">{ children }</div>;
}
