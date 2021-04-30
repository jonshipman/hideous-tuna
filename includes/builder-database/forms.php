<?php
/**
 * Form Name
 *
 * @package Hideous_Tuna
 */

/**
 * Gets all the forms saved in the options table.
 *
 * @return array Array of form names.
 */
function hideous_tuna_get_forms() {
	$forms = wp_cache_get( 'hideous_tuna_get_forms' );

	if ( false === $forms ) {
		$forms = get_option( 'hideous_tuna_forms' );
		$forms = apply_filters( 'hideous_tuna_get_forms', $forms );

		wp_cache_set( 'hideous_tuna_get_forms', $forms );
	}

	return $forms;
}

/**
 * Adds a new form to the list.
 *
 * @param string $form_name Form name to add to the list.
 * @return WP_Error|bool WP_Error if form name already exists.
 */
function hideous_tuna_add_form( $form_name ) {
	$forms = hideous_tuna_get_forms();

	if ( empty( $forms ) ) {
		$forms = array();
	}

	if ( ! is_array( $form_name ) ) {
		$form_name = array( $form_name );
	}

	foreach ( $form_name as $name ) {
		if ( ! in_array( $name, $forms, true ) ) {
			$forms[] = $name;

		}
	}

	wp_cache_delete( 'hideous_tuna_get_forms' );
	update_option( 'hideous_tuna_forms', $forms );

	return $forms;
}

/**
 * Updates the list of forms.
 *
 * @param string[] $forms Form names to replace the db entry with.
 * @return WP_Error|bool WP_Error if form name already exists.
 */
function hideous_tuna_update_forms( $forms ) {
	$existing_forms = hideous_tuna_get_forms();

	$f = array();

	foreach ( $forms as $name ) {
			$f[] = $name;
	}

	$diff = array_diff( $existing_forms, $f );

	if ( ! empty( $diff ) ) {
		foreach ( $diff as $deleted_form ) {
			hideous_tuna_delete_fields( $deleted_form );
		}
	}

	wp_cache_delete( 'hideous_tuna_get_forms' );
	update_option( 'hideous_tuna_forms', $f );

	return $f;
}

/**
 * Deletes a form from the list.
 *
 * @return void
 */
function hideous_tuna_delete_form( $form_name ) {
	$forms = hideous_tuna_get_forms();

	if ( in_array( $form_name, $forms, true ) ) {
		$forms = array_diff( $forms, array( $form_name ) );

		update_option( 'hideous_tuna_forms', $forms );
		wp_cache_delete( 'hideous_tuna_get_forms' );

		hideous_tuna_delete_fields( $form_name );
	}
}
