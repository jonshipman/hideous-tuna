<?php
/**
 * Options REST Routes
 *
 * @package Hideous_Tuna
 */

/**
 * REST route for saving options.
 *
 * @return void
 */
function hideous_tuna_rest_options() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/options',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'hideous_tuna_rest_options_cb',
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_rest_route(
		$route,
		'/get-options',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_options_get_cb',
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_rest_route(
		$route,
		'/option/(?P<name>[a-zA-Z0-9-_]+)',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_option_get_cb',
			'args'                => array( 'name' => array() ),
			'permission_callback' => '__return_true',
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_options' );

/**
 * Options REST Saving Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_options_cb() {
	$result = array();

	$json = file_get_contents( 'php://input' );
	$data = json_decode( $json, true );

	if ( empty( $data ) ) {
		return new WP_Error( 'no_data', __( 'No data submitted', 'hideous-tuna' ) );
	}

	$safe_list = apply_filters( 'hideous_tuna_options_safe_list', array( 'recaptcha_site_key', 'recaptcha_secret' ) );
	$payload   = array();

	foreach ( $safe_list as $safe ) {
		if ( ! empty( $data[ $safe ] ) ) {
			update_option( 'hideous_tuna_' . $safe, $data[ $safe ] );
			$payload[ $safe ] = $data[ $safe ];
		}
	}

	$result['success'] = true;
	$result['data']    = $payload;

	return rest_ensure_response( $result );
}

/**
 * Get a single option REST Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_option_get_cb( $data ) {
	if ( isset( $data['name'] ) ) {
		return rest_ensure_response( hideous_tuna_option( $data['name'] ) );
	} else {
		return new WP_Error( 'no_name', __( 'This route requires a name.', 'hideous-tuna' ) );
	}
}

/**
 * Get all available REST options.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_options_get_cb() {
	return rest_ensure_response( hideous_tuna_options() );
}
