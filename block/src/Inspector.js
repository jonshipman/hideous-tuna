import { InspectorControls } from '@wordpress/block-editor';
import { Fields, Form, Options } from './inspector';

export function Inspector() {
	return (
		<InspectorControls>
			<Fields />

			<Form />

			<Options />
		</InspectorControls>
	);
}

export default Inspector;
