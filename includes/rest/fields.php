<?php
/**
 * Fields
 *
 * @package Hideous_Tuna
 */

/**
 * REST Route Default Fields.
 *
 * @return void
 */
function hideous_tuna_rest_default_fields() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/get-defaultFields',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_default_fields_cb',
			'permission_callback' => '__return_true',
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_default_fields' );

/**
 * Default Fields REST Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_default_fields_cb() {
	return rest_ensure_response( hideous_tuna_default_fields() );
}

/**
 * REST Route for getting an array of field types.
 *
 * @return void
 */
function hideous_tuna_rest_field_types() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/get-fieldTypes',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_field_types_cb',
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_rest_route(
		$route,
		'/fieldTypes',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'hideous_tuna_rest_field_types_save_cb',
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_field_types' );

/**
 * Field types REST Callback.
 *
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_field_types_cb() {
	return rest_ensure_response( hideous_tuna_field_types() );
}

/**
 * Field type saving stub.
 * We don't actually save, but will be returning a custom error for the route.
 *
 * @return WP_Error
 */
function hideous_tuna_rest_field_types_save_cb() {
	return new WP_Error("saving_not_allowed",__("Field Types have no DB values","hideous-tuna"));
}

/**
 * REST Route for saving fields.
 *
 * @return void
 */
function hideous_tuna_rest_fields_add() {
	$route = hideous_tuna_rest_route();

	register_rest_route(
		$route,
		'/field-add/(?P<name>[a-zA-Z0-9-]+)',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'hideous_tuna_rest_field_add_cb',
			'args'                => array( 'name' => array() ),
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_rest_route(
		$route,
		'/fields/(?P<name>[a-zA-Z0-9-]+)',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'hideous_tuna_rest_fields_all_cb',
			'args'                => array( 'name' => array() ),
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_rest_route(
		$route,
		'/get-fields/(?P<name>[a-zA-Z0-9-]+)',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'hideous_tuna_rest_get_fields_cb',
			'args'                => array( 'name' => array() ),
			'permission_callback' => '__return_true',
		)
	);
}

add_action( 'rest_api_init', 'hideous_tuna_rest_fields_add' );

/**
 * Forms REST Add One Field Callback.
 *
 * @param array $data URL data.
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_field_add_cb( $data ) {
	$name = ! empty( $data['name'] ) ? $data['name'] : null;

	if ( null === $name ) {
		return new WP_Error( 'no_form_name', __( 'Please supply a form name', 'hideous-tuna' ) );
	}

	$json = file_get_contents( 'php://input' );

	if ( empty( $json ) ) {
		return new WP_Error( 'no_data', __( 'No data submitted', 'hideous-tuna' ) );
	}

	$data = json_decode( $json, true );

	$results = hideous_tuna_add_field( $name, $data );

	if ( ! is_wp_error( $results ) ) {
		$results = array( 'success' => true );
	}

	return rest_ensure_response( $results );
}

/**
 * Forms REST Replace All Field Data Callback.
 *
 * @param array $data URL data.
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_fields_all_cb( $data ) {
	$name = ! empty( $data['name'] ) ? $data['name'] : null;

	if ( null === $name ) {
		return new WP_Error( 'no_form_name', __( 'Please supply a form name', 'hideous-tuna' ) );
	}

	$json = file_get_contents( 'php://input' );

	if ( empty( $json ) ) {
		return new WP_Error( 'no_data', __( 'No data submitted', 'hideous-tuna' ) );
	}

	$data = json_decode( $json, true );

	$result = hideous_tuna_set_fields( $name, $data );

	if ( ! is_wp_error( $result ) ) {
		$result = array( 'success' => true );
	}

	return rest_ensure_response( $result );
}

/**
 * Forms REST Replace All Field Data Callback.
 *
 * @param array $data URL data.
 * @return WP_REST_Response|WP_Error
 */
function hideous_tuna_rest_get_fields_cb( $data ) {
	$name = ! empty( $data['name'] ) ? $data['name'] : null;

	if ( null === $name ) {
		return new WP_Error( 'no_form_name', __( 'Please supply a form name', 'hideous-tuna' ) );
	}

	return rest_ensure_response( hideous_tuna_get_fields( $name ) );
}
