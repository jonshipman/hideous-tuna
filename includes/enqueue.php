<?php
/**
 * Additional Enqueues
 *
 * @package Hideous_Tuna
 */

/**
 * Adds the rest route variable to the window.
 *
 * @return void
 */
function hideous_tuna_add_admin_enqueue() {
	$handle = generate_block_asset_handle( 'hideous-tuna/forms', 'editorScript' );

	$javascript = array(
		'rest_route' => hideous_tuna_rest_route(),
		'WP_DEBUG'   => defined( 'WP_DEBUG' ) ? WP_DEBUG : false,
	);

	wp_add_inline_script(
		$handle,
		sprintf( 'var HIDEOUS_TUNA = %s;', wp_json_encode( $javascript ) )
	);
}

add_action( 'admin_enqueue_scripts', 'hideous_tuna_add_admin_enqueue' );
