import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useAppContext } from '../Context';
import { useForms } from '../state';

export function Form() {
	const {
		attributes: { formName },
	} = useAppContext();
	const [ confirmDeleteOpen, setOpen ] = useState( false );
	const open = () => setOpen( true );
	const close = () => setOpen( false );
	const { remove } = useForms();

	return (
		<PanelBody
			title={ __( 'Form', 'hideous-tuna' ) }
			initialOpen={ true }
			className="hideous-tuna panel-hideous-tuna-form"
		>
			<Button className="db w-100" isDestructive onClick={ open }>
				{ __( 'Remove Form', 'hideous-tuna' ) }
			</Button>

			{ confirmDeleteOpen && (
				<Modal
					title={ __( 'Really Delete this Form?', 'hideous-tuna' ) }
					onRequestClose={ close }
					className="hideous-tuna"
				>
					<p>
						{ __(
							'Deletion is permanent and will remove all other instances of this form.',
							'hideous-tuna'
						) }
					</p>

					<div className="overflow-hidden">
						<div className="flex nl2 nr2">
							<div className="w-50 ph2">
								<Button
									isDestructive
									className="db w-100"
									onClick={ () =>
										close() && remove( formName )
									}
								>
									{ sprintf(
										__( 'Delete %s', 'hideous-tuna' ),
										formName
									) }
								</Button>
							</div>
							<div className="w-50 ph2">
								<Button
									isPrimary
									onClick={ close }
									className="db w-100"
								>
									{ __(
										'Take Me Outta Here!',
										'hideous-tuna'
									) }
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			) }
		</PanelBody>
	);
}
