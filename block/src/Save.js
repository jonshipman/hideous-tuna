import { RawHTML } from '@wordpress/element';

/**
 * Save WPElement Props
 *
 * @typedef {Object} SaveProps
 * @property {Object} attributes Attribute state for the Block.
 */

/**
 * Post content serialization.
 *
 * @param {...SaveProps} props Component props.
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	return (
		<RawHTML>{ `[hideous_tuna_form id="${ attributes.formName }"]` }</RawHTML>
	);
}
