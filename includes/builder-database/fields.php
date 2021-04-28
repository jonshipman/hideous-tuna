<?php
/**
 * Field editing in the options table.
 *
 * @package Hideous_Tuna
 */

/**
 * Gets a form's fields from the options table.
 *
 * @param string $form_name Form name to use.
 * @return array Keys are the field names and the values is the config.
 */
function hideous_tuna_get_fields( $form_name ) {
	$fields = wp_cache_get( 'hideous_tuna_fields', $form_name );

	if ( false === $fields ) {
		$fields = get_option( 'hideous_tuna_fields_' . $form_name );

		if ( empty( $fields ) ) {
			$fields = array();
		}

		wp_cache_set( 'hideous_tuna_fields', $fields, $form_name );
	}

	return $fields;
}

/**
 * Add a field to a form.
 *
 * @param string $form_name Form name to use.
 * @param array  $field_data Field data array.
 * @return WP_Error|bool True if no error occurs.
 */
function hideous_tuna_add_field( $form_name, $field_data ) {
	if ( ! isset( $field_data['id'] ) ) {
		return new WP_Error( 'no_id', __( 'Please supply the id for the field', 'hideous-tuna' ) );
	}

	$field_id        = $field_data['id'];
	$existing_fields = hideous_tuna_get_fields( $form_name );
	$fields          = wp_list_pluck( $existing_fields, 'id' );

	if ( in_array( $field_id, $fields, true ) ) {
		return new WP_Error( 'already_exists', __( 'Provided Field ID already exists', 'hideous-tuna' ) );
	}

	$existing_fields[] = $field_data;

	update_option( 'hideous_tuna_fields_' . $form_name, $existing_fields );
	wp_cache_delete( 'hideous_tuna_fields', $form_name );
}

/**
 * Replaces all fields in a form.
 *
 * @param string $form_name Form name to use.
 * @param array  $fields Fields to set.
 * @return WP_Error|bool True if no error occurs.
 */
function hideous_tuna_set_fields( $form_name, $fields ) {
	foreach ( $fields as $f ) {
		if ( ! isset( $f['id'] ) ) {
			return new WP_Error( 'no_id', __( 'Please supply the id for all fields', 'hideous-tuna' ) );
		}
	}

	update_option( 'hideous_tuna_fields_' . $form_name, $fields );
	wp_cache_delete( 'hideous_tuna_fields', $form_name );
}

/**
 * Removes a field from a form.
 *
 * @param string $form_name Form name to use.
 * @return void
 */
function hideous_tuna_delete_fields( $form_name ) {
	delete_option( 'hideous_tuna_fields_' . $form_name );
	wp_cache_delete( 'hideous_tuna_fields', $form_name );
}
