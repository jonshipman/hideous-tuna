<?php
/**
 * tuna_entry
 *
 * @package Hideous_Tuna
 */

/**
 * Adds the form submission post type.
 *
 * @return void
 */
function hideous_tuna_form_submission_cpt() {
	if ( ! post_type_exists( 'tuna_entry' ) ) {
		$labels = array(
			'name'                  => 'Form Submissions',
			'singular_name'         => 'Form Submission',
			'menu_name'             => 'Form Submissions',
			'new_item'              => __( 'New Form Submission', 'hideous-tuna' ),
			'add_new_item'          => __( 'Add new Form Submission', 'hideous-tuna' ),
			'edit_item'             => __( 'Edit Form Submission', 'hideous-tuna' ),
			'view_item'             => __( 'View Form Submission', 'hideous-tuna' ),
			'view_items'            => __( 'View Form Submissions', 'hideous-tuna' ),
			'search_items'          => __( 'Search Form Submissions', 'hideous-tuna' ),
			'not_found'             => __( 'No Form Submissions found', 'hideous-tuna' ),
			'not_found_in_trash'    => __( 'No Form Submissions found in trash', 'hideous-tuna' ),
			'all_items'             => __( 'All Form Submissions', 'hideous-tuna' ),
			'archives'              => __( 'Form Submission Archives', 'hideous-tuna' ),
			'attributes'            => __( 'Form Submission Attributes', 'hideous-tuna' ),
			'insert_into_item'      => __( 'Insert into Form Submissions', 'hideous-tuna' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Form Submission', 'hideous-tuna' ),
			'parent_item'           => __( 'Parent Form Submission', 'hideous-tuna' ),
			'parent_item_colon'     => __( 'Parent Form Submission:', 'hideous-tuna' ),
			'archive_title'         => 'Form Submissions',
		);

		$args = array(
			'labels'              => $labels,
			'description'         => 'Forms submitted from the frontend into backend.',
			'public'              => false,
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'query_var'           => false,
			'show_in_admin_bar'   => false,
			'capability_type'     => 'post',
			'has_archive'         => false,
			'hierarchical'        => false,
			'supports'            => array( '' ),
			'menu_position'       => 175,
			'menu_icon'           => 'dashicons-format-aside',
			'show_in_nav_menus'   => false,
			'rewrite'             => false,
			'show_in_rest'        => true,
		);

		register_post_type( 'tuna_entry', $args );
	}
}

add_action( 'init', 'hideous_tuna_form_submission_cpt' );

/**
 * Adds email, phone, and location to the form submissions.
 *
 * @param array $columns Associative array of columns and labels.
 * @return array
 */
function hideous_tuna_entry_columns( $columns ) {
	$date = $columns['date'];
	unset( $columns['date'] );
	unset( $columns['title'] );
	unset( $columns['form'] );

	$columns['name']  = __( 'Name', 'hideous-tuna' );
	$columns['email'] = __( 'Email', 'hideous-tuna' );
	$columns['phone'] = __( 'Phone', 'hideous-tuna' );

	$columns['date'] = $date;
	return $columns;
}

add_filter( 'manage_form_submission_posts_columns', 'hideous_tuna_entry_columns' );

/**
 * Custom form submission column content.
 *
 * @param string $column Column name.
 * @param int    $post_id Post ID.
 * @return void
 */
function hideous_tuna_entry_column_content( $column, $post_id ) {
	switch ( $column ) {
		case 'name':
			$name = get_post_meta( $post_id, 'name', true );
			if ( empty( $name ) ) {
				$name = get_post_meta( $post_id, 'first-name', true ) . ' ' . get_post_meta( $post_id, 'last-name', true );
			}

			echo esc_html( $name );

			break;

		case 'email':
			echo esc_html( get_post_meta( $post_id, 'email', true ) );
			break;

		case 'phone':
			echo esc_html( get_post_meta( $post_id, 'phone', true ) );
			break;

		default:
			break;

	}
}

add_action( 'manage_form_submission_posts_custom_column', 'hideous_tuna_entry_column_content', 10, 2 );
