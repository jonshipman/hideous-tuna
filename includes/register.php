<?php
/**
 * Registers the block editor.
 *
 * @package Hideous_Tuna
 */

/**
 * Registers block.json.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function hideous_tuna_block_init() {
	register_block_type_from_metadata( dirname( HIDETUNA_FILE ) . '/block' );
}

add_action( 'init', 'hideous_tuna_block_init' );
