import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import './editor.scss';

import {
	ColorPicker,
	PanelRow,
	PanelBody,
	ToggleControl,
	RangeControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		productGap,
		productTitleColor,
		productPriceColor,
		productButtonTextColor,
		productButtonBgColor,
		displaySaleTag,
		displayProductTitle,
		displayProductPrice,
		displayAddToCartButton
	} = attributes;

	const fetchProducts = async () => {
		try {
			const fetchedProducts = await wp.apiFetch({
				path: '/wc/v2/products?status=publish',
			});
			return fetchedProducts;
		} catch (error) {
			return []; 
		}
	};

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts().then((fetchedProducts) => {
			setProducts(fetchedProducts);
		});
	}, []);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Product Spacing', 'animated-pineapple')} initialOpen={ false }>
					<PanelRow>
						<RangeControl
							label={__('Set a value between 0 and 100.', 'animated-pineapple')}
							value={productGap}
							onChange={
								function (value) {
									setAttributes({ productGap: value });
								}
							}
							min={0}
							max={100}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Product Title Color', 'animated-pineapple')} initialOpen={false}>
					<PanelRow>
						{displayProductTitle ? (						
							<ColorPicker
								color={productTitleColor}
								onChangeComplete={
									function (color) {
										setAttributes({ productTitleColor: color.hex });
									}
								}
								disableAlpha
							/>
						) : (
							__('Enable the Display Product Title\'s option.', 'animated-pineapple')
						) }
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Product Price Color', 'animated-pineapple')} initialOpen={false}>
					<PanelRow>
						{displayProductPrice ? (
							<ColorPicker
								color={productPriceColor}
								onChangeComplete={
									function (color) {
										setAttributes({ productPriceColor: color.hex });
									}
								}
								disableAlpha
							/>
						) : (
							__('Enable the Display Product Title\'s option.', 'animated-pineapple')
						)}
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Product Button Text Color', 'animated-pineapple')} initialOpen={false}>
					<PanelRow>
						{displayAddToCartButton ? (
							<ColorPicker
								color={productButtonTextColor}
								onChangeComplete={
									function (color) {
										setAttributes({ productButtonTextColor: color.hex });
									}
								}
								disableAlpha
							/>
						) : (
							__('Enable the Display Product Title\'s option.', 'animated-pineapple')
						)}
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Product Button Background Color', 'animated-pineapple')} initialOpen={false}>
					<PanelRow>
						{displayAddToCartButton ? (
							<ColorPicker
								color={productButtonBgColor}
								onChangeComplete={
									function (color) {
										setAttributes({ productButtonBgColor: color.hex });
									}
								}
								disableAlpha
							/>
						) : (
							__('Enable the Display Product Title\'s option.', 'animated-pineapple')
						)}
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Product Display Options', 'animated-pineapple')} initialOpen={false}>
					<PanelRow>
						<ToggleControl
							label={__('Display Product Sale Tag\'s', 'animated-pineapple')}
							checked={displaySaleTag}
							onChange={() =>
								setAttributes({ displaySaleTag: !displaySaleTag })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Display Product Title\'s', 'animated-pineapple')}
							checked={displayProductTitle}
							onChange={() =>
								setAttributes({ displayProductTitle: !displayProductTitle })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Display Product Price\'s', 'animated-pineapple')}
							checked={displayProductPrice}
							onChange={() =>
								setAttributes({ displayProductPrice: !displayProductPrice })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Display Product Button\'s', 'animated-pineapple')}
							checked={displayAddToCartButton}
							onChange={() =>
								setAttributes({ displayAddToCartButton: !displayAddToCartButton })
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ gap: productGap, rowGap: productGap }}>
				{products.map((product) => (
					<div class="animated-pineapple-product" key={product.id}>
						<img src={product.images[0].src}/>
						{displaySaleTag && ( 
							product.on_sale 
							? <span class="sale-tag" style={{ 
								color: productButtonTextColor,
								backgroundColor: productButtonBgColor,
								borderColor: productButtonBgColor 
							}}>On Sale</span>
							: ''
						)}

						{displayProductTitle && (
							<h4 style={{ color: productTitleColor }}>{product.name}</h4>
						) }

						{displayProductPrice && (
							<div style={{ color: productPriceColor }} dangerouslySetInnerHTML={{ __html: product.price_html }}></div>
						)}

						{displayAddToCartButton && (
							<a 
								style={{ 
									color: productButtonTextColor,
									backgroundColor: productButtonBgColor,
									borderColor: productButtonBgColor 
								}}
								class="button" 
								href={
									product.type === 'simple' ? 
									'?add-to-cart=" + product.id + "&quantity=1' : 
									product.permalink 
									}
							>
									{product.type === 'simple' ?
									__('Add to cart', 'animated-pineapple') :
									__('View product', 'animated-pineapple')
									}
							</a>
						)}
					</div>
				))}
			</div>
		</>
	);
}
