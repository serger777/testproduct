import './page.styl';


import ProductListItem from "../../components/ProductListItem";
import Slider from "../../components/Slider";


const initProduct = () => {
	const listItems = document.querySelectorAll('.product-item');
	listItems.forEach(item => {
		new ProductListItem(item);
	});
};

const initSlider = () => {
	const slider = document.querySelector('.slider');
	new Slider(slider);
};


document.addEventListener('DOMContentLoaded', () => {
	initProduct();
	initSlider();
});