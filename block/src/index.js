import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import Edit from './Edit';
import save from './Save';
import icons from './icons';

/**
 * New block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'hideous-tuna/forms', {
	icon: icons.logo,

	attributes: {
		formName: {
			type: 'string',
			shortcode: ( attributes ) => attributes.named.id,
		},
	},

	keywords: [ __( 'form', 'hideous-tuna' ) ],

	edit: Edit,
	save,
} );
