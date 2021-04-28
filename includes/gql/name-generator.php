<?php
/**
 * Name Generator
 *
 * @package Hideous_Tuna
 */

/**
 * Creates the generateName field that returns a generated name.
 *
 * @return void
 */
function hideous_tuna_gql_name_generator() {
	register_graphql_field(
		'RootQuery',
		'GenerateName',
		array(
			'type'        => 'String',
			'description' => __( 'The most diabolical, heinous results known to man.', 'hideous-tuna' ),
			'resolve'     => function() {
				return hideous_tuna_random();
			},
		)
	);
}

add_action( 'graphql_register_types', 'hideous_tuna_gql_name_generator' );
