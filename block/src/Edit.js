import { useBlockProps } from '@wordpress/block-editor';
import { Creation, FormContainer } from './form-builder';
import { AppProvider, QueryProvider } from './Context';
import Inspector from './Inspector';
import './styles/editor.scss';

/**
 * Edit WPElement Props
 *
 * @typedef {Object} EditProps
 * @property {Object} attributes Attribute state for the Block.
 * @property {Function} setAttributes State setter for attributes.
 * @property {boolean} isSelected If the block is selected.
 */

/**
 * Edit Function.
 *
 * @param {...EditProps} props - Component props.
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	return (
		<div { ...useBlockProps() }>
			<QueryProvider
				{ ...{ attributes, setAttributes, isSelected, clientId } }
			>
				<AppProvider>
					<Inspector />

					<div className="hideous-tuna">
						{ ! attributes.formName ? (
							<Creation />
						) : (
							<FormContainer />
						) }
					</div>
				</AppProvider>
			</QueryProvider>
		</div>
	);
}
