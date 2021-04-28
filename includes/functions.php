<?php
/**
 * Shared, common functions.
 *
 * @package Hideous_Tuna
 */

/**
 * REST Route.
 *
 * @return string REST route.
 */
function hideous_tuna_rest_route() {
	return apply_filters( 'hideous_tuna_rest_route', 'hideous-tuna/v1' );
}

/**
 * Get all available validity methods.
 *
 * @return array[] Strings mapped to the name of functions avialble in the Valid JS object.
 */
function hideous_tuna_validity_functions() {
	return apply_filters(
		'hideous_tuna_validity_functions',
		array(
			array(
				'name'  => 'NotEmptyString',
				'label' => __( 'No empty strings.', 'hideous-tuna' ),
			),
			array(
				'name'  => 'Email',
				'label' => _( 'Must be a valid email.', 'hideous-tuna' ),
			),
			array(
				'name'  => 'Phone',
				'label' => __( 'Must be a valid phone number.', 'hideous-tuna' ),
			),
		)
	);
}

/**
 * Get all available field types
 *
 * @return array[] Strings mapped to the name of functions avialble in the Valid JS object.
 */
function hideous_tuna_field_types() {
	return apply_filters(
		'hideous_tuna_field_types',
		array(
			array(
				'name'  => 'text',
				'label' => __( 'Text', 'hideous-tuna' ),
			),
			array(
				'name'  => 'textarea',
				'label' => _( 'Textarea', 'hideous-tuna' ),
			),
			array(
				'name'  => 'select',
				'label' => __( 'Select (Single)', 'hideous-tuna' ),
			),
			array(
				'name'  => 'select-multiple',
				'label' => __( 'Select (Multiple)', 'hideous-tuna' ),
			),
			array(
				'name'  => 'checkbox',
				'label' => __( 'Checkboxes', 'hideous-tuna' ),
			),
			array(
				'name'  => 'radio',
				'label' => __( 'Radio', 'hideous-tuna' ),
			),
		)
	);
}

/**
 * Get options table settings.
 *
 * @return array[] Key value pairs without the db prefix.
 */
function hideous_tuna_options() {
	$options = apply_filters( 'hideous_tuna_options_safe_list', array( 'recaptcha_site_key', 'recaptcha_secret' ) );
	$result  = wp_cache_get( 'hideous_tuna_options' );

	if ( false === $result ) {

		foreach ( $options as $option ) {
			$result[ $option ] = get_option( 'hideous_tuna_' . $option, '' );
		}

		wp_cache_set( 'hideous_tuna_options', $result );
	}

	return $result;
}

/**
 * Get options table settings (one option).
 *
 * @param string $name DB name without 'hideous_tuna_'.
 * @param mixed  $default Default value.
 * @return mixed Option from db by unprefixed key.
 */
function hideous_tuna_option( $name, $default = '' ) {
	$options = hideous_tuna_options();

	if ( ! empty( $options[ $name ] ) ) {
		return $options[ $name ];
	} else {
		return $default;
	}
}
