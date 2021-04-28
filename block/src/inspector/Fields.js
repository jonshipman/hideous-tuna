import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import { useAppContext } from '../Context';
import { sanitize_id } from '../functions';
import { useFieldTypes, useValidityList } from '../state';

export function Fields() {
	const { updateActive, active, error } = useAppContext();
	const { validityFunctions } = useValidityList();
	const { fieldTypes } = useFieldTypes();
	const { id } = active || {};

	return active && id ? (
		<PanelBody
			title={ `${ __( 'Field: ', 'hideous-tuna' ) } ${ id }` }
			initialOpen={ true }
			className="hideous-tuna panel-hideous-tuna-field"
		>
			{ error && (
				<PanelRow>
					<div className="pa3 bg-red white">{ error }</div>
				</PanelRow>
			) }

			<PanelRow>
				<TextControl
					label={ __( 'Field ID', 'hideous-tuna' ) }
					value={ active.id }
					onChange={ ( _id ) => {
						if ( _id ) {
							updateActive( {
								...active,
								id: sanitize_id( id ),
							} );
						}
					} }
				/>
			</PanelRow>

			<PanelRow>
				<TextControl
					label={ __( 'Label', 'hideous-tuna' ) }
					value={ active.label }
					onChange={ ( label ) => {
						if ( label ) {
							updateActive( { ...active, label } );
						}
					} }
				/>
			</PanelRow>

			<PanelRow>
				<SelectControl
					label={ __( 'Type', 'hideous-tuna' ) }
					value={ active.type }
					options={ fieldTypes.map( ( v ) => ( {
						value: v.name,
						label: v.label,
					} ) ) }
					onChange={ ( type ) => {
						updateActive( { ...active, type } );
					} }
				/>
			</PanelRow>

			<PanelRow>
				<RangeControl
					label={ __( 'Weight', 'hideous-tuna' ) }
					value={ active.weight }
					onChange={ ( weight ) => {
						if ( weight ) {
							updateActive( { ...active, weight } );
						}
					} }
					min={ 1 }
					max={ 5 }
				/>
			</PanelRow>

			<PanelRow>
				<ToggleControl
					label={ __( 'Required', 'hideous-tuna' ) }
					checked={ active.required }
					onChange={ () => {
						updateActive( {
							...active,
							required: ! active.required,
						} );
					} }
				/>
			</PanelRow>

			{ active.required && (
				<PanelRow>
					<SelectControl
						label={ __( 'Validity Check', 'hideous-tuna' ) }
						value={ active.valid }
						options={ validityFunctions.map( ( v ) => ( {
							value: v.name,
							label: v.label,
						} ) ) }
						onChange={ ( valid ) => {
							updateActive( { ...active, valid } );
						} }
					/>
				</PanelRow>
			) }

			<PanelRow>
				<ToggleControl
					label={ __( 'ReCaptcha', 'hideous-tuna' ) }
					checked={ active.recaptcha }
					onChange={ () => {
						updateActive( {
							...active,
							recaptcha: ! active.recaptcha,
						} );
					} }
					help={ __(
						"When enabled, the ReCaptcha loading won't trigger until this field is correctly filled out.",
						'hideous-tuna'
					) }
				/>
			</PanelRow>
		</PanelBody>
	) : error ? (
		<PanelBody
			title={ __( 'Error', 'hideous-tuna' ) }
			initialOpen={ true }
			className="panel-hideous-tuna-error"
		>
			{ error && (
				<PanelRow>
					<div className="pa3 bg-red white">{ error }</div>
				</PanelRow>
			) }
		</PanelBody>
	) : null;
}
