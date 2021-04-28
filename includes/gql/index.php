<?php
/**
 * GraphQL
 *
 * @package Hideous_Tuna
 */

/**
 * Requires all the GQL registrations if WP-GraphQL is detected.
 *
 * @return void
 */
function hideous_tuna_register_gql() {
	if ( function_exists( 'graphql_init' ) ) {

		// GenerateName Field.
		require_once __DIR__ . '/name-generator.php';

	}
}

add_action( 'plugins_loaded', 'hideous_tuna_register_gql' );
