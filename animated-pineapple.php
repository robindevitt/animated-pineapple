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
 *
 * @param array $attr Array of attributes from the block.
 *
 * @return string $html Returns HTML string.
 */
function animated_pineapple_block_render_products( $attr ) {
	$query    = new WC_Product_Query(
		array(
			'status'  => 'publish',
			'limit'   => 3,
			'orderby' => 'date',
			'order'   => 'DESC',
		)
	);
	$products = $query->get_products();

	$html = '';
	if ( $products ) {
		$html .= '<div class="wp-block-animated-pineapple-block-animated-pineapple">';
		foreach ( $products as $product ) {
			$html .= '<div class="animated-pineapple-product">';

				// Product Image.
				$html .= $product->get_image();

			// Product sale tag.
			if ( ( isset( $attr['displaySaleTag'] ) && $attr['displaySaleTag'] ) && $product->is_on_sale() ) {
				$tag_style = 'color:' . $attr['productButtonTextColor'] . ';background-color:' . $attr['productButtonBgColor'] . ';border-color:' . $attr['productButtonBgColor'] . ';';
				$html     .= '<span class="sale-tag" style="' . $tag_style . '">' . __( 'On Sale', 'animated-pineapple' ) . '</span>';
			}

				// Product name/title.
			if ( isset( $attr['displayProductTitle'] ) && $attr['displayProductTitle'] ) {
				$name_style = 'color:' . $attr['productTitleColor'] . ';';
				$html      .= '<h4 style="' . $name_style . '">' . $product->get_name() . '</h4>';
			}

				// Product Price.
			if ( isset( $attr['displayProductPrice'] ) && $attr['displayProductPrice'] ) {
				$price_style = 'color:' . $attr['productPriceColor'] . ';';
				$html       .= '<div style="' . $price_style . '">' . $product->get_price_html() . '</div>';
			}

			// Product button.
			if ( isset( $attr['displayAddToCartButton'] ) && $attr['displayAddToCartButton'] ) {
				$button_style = 'color:' . $attr['productButtonTextColor'] . ';background-color:' . $attr['productButtonBgColor'] . ';border-color:' . $attr['productButtonBgColor'] . ';';
				if ( $product->is_type( 'simple' ) ) {
					$html .= '<a href="?add-to-cart=' . esc_attr( $product->get_id() ) . '" data-quantity="1" style="' . $button_style . '" class="button wp-element-button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="' . esc_attr( $product->get_id() ) . '" data-product_sku="' . esc_attr( $product->get_sku() ) . '" >' . __( 'Add to cart', 'animated-pineapple' ) . '</a>';
				} else {
					$html .= '<a class="button" style="' . $button_style . '" href="' . get_permalink( $product->get_id() ) . '">' . __( 'View product', 'animated-pineapple' ) . '</a>';
				}
			}

			$html .= '</div>';
		}
		$html .= '</div>';
	}
	return $html;
}

function wpdocs_styles_method() {
		$custom_css = ".mycolor{ background: {$color};}";
		wp_add_inline_style( 'animated-pineapple-block-animated-pineapple-style', $custom_css );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_styles_method' );
