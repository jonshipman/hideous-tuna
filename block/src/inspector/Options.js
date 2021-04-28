import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { useOptions } from '../state';

export function Options() {
	const { options, update, error } = useOptions();

	return Object.keys( options ).length > 0 ? (
		<PanelBody
			title={ __( 'Options for All Forms', 'hideous-tuna' ) }
			initialOpen={ false }
			className="hideous-tuna panel-hideous-tuna-options"
		>
			{ error && (
				<PanelRow>
					<div className="pa3 bg-red white">{ error }</div>
				</PanelRow>
			) }

			<PanelRow>
				<TextControl
					label={ __( 'Recaptcha v3 Site Key', 'hideous-tuna' ) }
					value={ options.recaptcha_site_key }
					onChange={ ( value ) =>
						update( { recaptcha_site_key: value } )
					}
				/>
			</PanelRow>

			<PanelRow>
				<TextControl
					label={ __( 'Recaptcha v3 Secret Key', 'hideous-tuna' ) }
					value={ options.recaptcha_secret }
					onChange={ ( value ) =>
						update( { recaptcha_secret: value } )
					}
				/>
			</PanelRow>
		</PanelBody>
	) : null;
}
