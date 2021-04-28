<?php
/**
 * Default Fields
 *
 * @package Hideous_Tuna
 */

/**
 * Returns an array of default fields for a form.
 *
 * @return array Default fields.
 */
function hideous_tuna_default_fields() {
	$defaults = array(
		array(
			'type'     => 'text',
			'label'    => __( 'Name', 'hideous-tuna' ),
			'error'    => __( 'Name is required.', 'hideous-tuna' ),
			'required' => true,
			'weight'   => 1,
			'id'       => 'name',
		),
		array(
			'type'      => 'email',
			'label'     => __( 'Email', 'hideous-tuna' ),
			'error'     => __( 'Email is required.', 'hideous-tuna' ),
			'required'  => true,
			'weight'    => 2,
			'id'        => 'email',
			'recaptcha' => true,
			'valid'     => 'Email',
		),
		array(
			'type'     => 'tel',
			'label'    => __( 'Phone', 'hideous-tuna' ),
			'error'    => __( 'Phone is required.', 'hideous-tuna' ),
			'required' => false,
			'weight'   => 2,
			'id'       => 'phone',
		),
		array(
			'type'     => 'textarea',
			'label'    => __( 'Message', 'hideous-tuna' ),
			'error'    => __( 'Message is required.', 'hideous-tuna' ),
			'required' => false,
			'weight'   => 1,
			'id'       => 'message',
		),
	);

	$fields = apply_filters( 'hideous_tuna_default_fields', $defaults );

	return $fields;
}
