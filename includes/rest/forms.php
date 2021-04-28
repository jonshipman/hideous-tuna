<?php
/**
 * Forms REST Routes
 *
 * @package Hideous_Tuna
 */

/**
 * REST Route for getting a list of forms.
 *
 * @return void
 */
function hideous_tuna_rest_forms() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/get-forms',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_forms_cb',
			'permission_callback' => '__return_true',
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_forms' );

/**
 * Forms REST Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_forms_cb() {
	return rest_ensure_response( hideous_tuna_get_forms() );
}

/**
 * REST Route for saving a form.
 *
 * @return void
 */
function hideous_tuna_rest_form_add() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/forms',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'hideous_tuna_rest_form_add_cb',
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_form_add' );

/**
 * Forms REST Saving Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_form_add_cb() {
	$json = file_get_contents( 'php://input' );
	$data = json_decode( $json, true );

	if ( empty( $data ) ) {
		return new WP_Error( 'no_data', __( 'No data submitted', 'hideous-tuna' ) );
	}

	$payload = hideous_tuna_add_form( $data );

	if ( ! is_wp_error( $payload ) ) {
		$result            = array();
		$result['success'] = true;
		$result['data']    = $payload;
	} else {
		$result = $payload;
	}

	return rest_ensure_response( $result );
}
