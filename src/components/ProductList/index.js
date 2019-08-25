import './index.styl';

import ProductListItem from '../ProductListItem';


class ProductList {
	constructor(el) {
		this.el = el;
		this.init();
	}

	init() {

		this.initProductItems();
	}
	// Стартуем карточки товаров
	initProductItems() {
		const listItems = document.querySelectorAll('.product-item');
		listItems.forEach(item => {
			new ProductListItem(item);
		});
	}
}

export default ProductList;