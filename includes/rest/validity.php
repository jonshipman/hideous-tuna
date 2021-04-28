<?php
/**
 * Validity functions REST Route
 *
 * @package Hideous_Tuna
 */

/**
 * REST Route for getting an array of valid checking functions.
 *
 * @return void
 */
function hideous_tuna_rest_validity() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/get-validity-functions',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_validity_cb',
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_validity' );


/**
 * Validity function list REST Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_validity_cb() {
	return rest_ensure_response( hideous_tuna_validity_functions() );
}
