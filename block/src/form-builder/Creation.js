/**
 * Creation
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { TextControl, Button, Spinner } from '@wordpress/components';
import { useNameGeneration } from '../data';
import { useAppContext } from '../Context';
import { Container } from '../elements';
import { useState, useEffect } from '@wordpress/element';
import { useForms } from '../state';

/**
 * Form creation.
 *
 * Type out your ID and choose to start with the default form or empty form.
 *
 * @return JSX
 */
export function Creation() {
	const { setAttributes, type } = useAppContext();
	const { name, loading } = useNameGeneration();
	const { add, forms } = useForms();
	const [ value, setValue ] = useState( '' );

	useEffect( () => {
		if ( name && ! value ) {
			setValue( name );
		}
	}, [ name, value ] );

	const onChange = ( formName ) => {
		setValue( formName );
	};

	const onSave = ( _t ) => {
		let formName = value;
		if ( ! formName ) {
			formName = name;
		}

		type.current = _t;

		add( formName );
		setAttributes( { formName } );
	};

	return (
		<Container>
			<div className="overflow-hidden">
				<div className="flex-l items-center-l mb3 nl3 nr3">
					<div className="fw7 ph3">
						{ __( 'Give your form a name:', 'hideous-tuna' ) }
					</div>

					<div className="flex-auto ph3">
						{ loading ? (
							<Spinner />
						) : (
							<TextControl
								className="nb2"
								{ ...{ value, onChange } }
							/>
						) }
					</div>
				</div>

				<div className="flex-l items-center-l tc nl3-l nr3-l">
					<div className="w-50-l mv3 mv0-l ph3-l">
						<Button
							isSecondary
							className="db w-100"
							onClick={ () => onSave( 'empty' ) }
						>
							{ __( 'Empty Form', 'hideous-tuna' ) }
						</Button>
					</div>
					<div className="w-50-l ph3-l">
						<Button
							isPrimary
							className="db w-100"
							onClick={ () => onSave( 'default' ) }
						>
							{ __( 'Default Form', 'hideous-tuna' ) }
						</Button>
					</div>
				</div>

				{ forms?.length > 0 && (
					<>
						<div className="mv4 flex items-center nl2 nr2">
							<div className="mh2 flex-auto b--light-gray bb" />
							<div className="flex-none mh2 ttu">or</div>
							<div className="mh2 flex-auto b--light-gray bb" />
						</div>
						<div className="flex-l items-center-l mb3 nl3 nr3">
							<div className="fw7 ph3">
								{ __(
									'Select an existing form',
									'hideous-tuna'
								) }
							</div>

							<div className="flex-auto ph3">
								<TextControl className="nb2" />
							</div>
						</div>
					</>
				) }
			</div>
		</Container>
	);
}
