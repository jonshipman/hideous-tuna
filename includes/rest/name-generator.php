<?php
/**
 * Name Generator REST Route
 *
 * @package Hideous_Tuna
 */

/**
 * REST Route for Name/ID generation.
 *
 * @return void
 */
function hideous_tuna_rest_name_generator() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/generate-name',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_name_generator_cb',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		$route,
		'/generate-name/(?P<excludes>[a-zA-Z0-9-,]+)',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_name_generator_cb',
			'args'                => array( 'excludes' => array() ),
			'permission_callback' => '__return_true',
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_name_generator' );


/**
 * Name Generator REST Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_name_generator_cb( $data ) {
	$excludes = isset( $data['excludes'] ) ? $data['excludes'] : '';
	$excludes = (array) apply_filters( 'hideous_tuna_rest_name_generator_excludes', explode( ',', $excludes ) );

	return rest_ensure_response( hideous_tuna_random( $excludes ) );
}
