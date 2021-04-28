/**
 * Form Container
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { Button, Spinner } from '@wordpress/components';
import { useAppContext } from '../Context';
import { useNameGeneration } from '../data';
import { useDefaultField } from '../state';
import { Container } from '../elements';
import { MockControl } from './MockControl';
import { capitalize } from '../functions';

import { useEffect, useState } from '@wordpress/element';

/**
 * Block display for the form fields.
 *
 * @return JSX
 */
export function FormContainer() {
	const { defaultFields } = useDefaultField();
	const [ excludes, setExcludes ] = useState( [] );
	const { name, loading, refetch } = useNameGeneration( { excludes } );
	const {
		loading: fieldLoading,
		attributes,
		type,
		active,
		fields,
		rows,
		setActive,
		remove,
		add,
		set,
	} = useAppContext();

	const { formName } = attributes || {};

	useEffect( () => {
		if (
			type.current === 'default' &&
			~~defaultFields?.length > 0 &&
			~~fields.length === 0
		) {
			set( defaultFields );
		}
	}, [ type, defaultFields, fields, set ] );

	const AddField = () => {
		let weight = Math.floor( Math.random() * 3 ) + 1;
		const lastRow = rows[ rows.length - 1 ];

		if ( lastRow ) {
			if ( ~~lastRow?.length > 2 ) {
				weight = 1;
			}
		}

		const newField = {
			id: name,
			type: 'text',
			label: capitalize( name ),
			required: false,
			error: '',
			weight,
			recaptcha: false,
			valid: '',
		};

		refetch( { excludes: [ ...excludes, name ] } );
		setExcludes( ( p ) => [ ...p, name ] );
		add( newField );
	};

	return (
		<Container>
			<div>
				{ __( 'Form', 'hideous-tuna' ) }: { formName }
				{ fieldLoading && <Spinner /> }
			</div>

			<div className="mv4 overflow-hidden">
				{ rows.map( ( row_fields ) => (
					<div
						className="flex-l nl2 nr2"
						key={ row_fields.map( ( f ) => f.id ).join( ',' ) }
					>
						{ row_fields.map( ( field ) => {
							return (
								<MockControl
									key={ field.id }
									active={ active?.id === field.id }
									onClick={ () => {
										setActive( field );
									} }
									{ ...{ field } }
								/>
							);
						} ) }
					</div>
				) ) }
			</div>

			<div className="overflow-hidden">
				<div className="flex nl2 nr2">
					{ active?.id && (
						<div className="w-50 ph2">
							<Button
								className="db w-100"
								isDestructive
								onClick={ () => remove( active.id ) }
							>
								{ __( 'Remove Field', 'hideous-tuna' ) }
							</Button>
						</div>
					) }
					<div className={ `${ active?.id ? 'w-50' : 'w-100' } ph2` }>
						<Button
							disabled={ loading }
							isPrimary
							className="db w-100"
							onClick={ AddField }
						>
							{ __( 'Add Field', 'hideous-tuna' ) }
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
}
