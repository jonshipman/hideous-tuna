<?php
/**
 * Shared, common functions.
 *
 * @package Hideous_Tuna
 */

/**
 * Generates a random "name."
 * Not guarenteed to be unique.
 *
 * @return string Combo of adjective + noun.
 */
function hideous_tuna_random( $excludes = array() ) {
	$adjective = hideous_tuna_adjectives( true );
	$noun      = hideous_tuna_nouns( true );

	$name = sanitize_title( "${adjective}-${noun}" );

	if ( is_array( $excludes ) && ! empty( $excludes ) && in_array( $name, $excludes, true ) ) {
		return hideous_tuna_random( $excludes );
	}

	return $name;
}
