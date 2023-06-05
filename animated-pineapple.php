<?php
/**
 * Plugin Name:       Animated Pineapple
 * Description:       A custom block to showcase recently added products.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Robin Devitt
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       animated-pineapple
 *
 * @package           animated-pineapple-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function animated_pineapple_block_init() {
	register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => 'animated_pineapple_block_render_products',
		)
	);
}
add_action( 'init', 'animated_pineapple_block_init' );

/**
 * Render the block data.
 */
function animated_pineapple_block_render_products(){
	return 'animated_pineapple_block_render_products';
}
