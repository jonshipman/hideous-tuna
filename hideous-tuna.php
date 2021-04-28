<?php
/**
 * Plugin Name:       Hideous Tuna (Block Editor Form Editor)
 * Description:       Create and edit forms in the Block Editor (Gutenberg).
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Jon Shipman
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hideous-tuna
 *
 * @package           Hideous_Tuna
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'HIDETUNA_FILE' ) ) {
	// Define the plugin file to use within the plugin.
	define( 'HIDETUNA_FILE', __FILE__ );

	// Plugin components.
	require_once __DIR__ . '/includes/index.php';
}
