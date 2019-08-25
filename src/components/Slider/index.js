import './index.styl'
import ProductListItem from "../ProductListItem";

export default class Slider {
	constructor(el) {
		this.el = el
		this.slider = this.el.querySelector(".slider-wrap");
		this.controlsWrap = this.el.querySelector(".controls-wrap");
		this.startData = 0;
		this.target = 5;
		this.init();
	}

	async init() {
		await fetch("/slider.json")
			.then(response => response.json())
			.then(slider => {
				this.dataSlider = slider;
			});
		await this.initSlider();
		this.initChangeSlider();

	}

	async initSlider() {
		await this.dataSlider.slider.forEach((item, idx) => {
			const sliderItem = `
				<img src='${item.img}'>
				  <button class="name">${item.name}</button>
				  <div class="wrap">
					<button class="user">${item.username}</button>
					<button class="star">
					  <svg class="icon icon-star">
						<use xlink:href="/interface/sprite.svg#star"></use>
					  </svg><span>(${item.star})</span>
					</button>
				  </div>
				  <div class="wrap">
					<button class="favorite" type="default">
					  <svg class="icon icon-heart_background">
						<use xlink:href="/interface/sprite.svg#heart_background"></use>
					  </svg>
					</button>
					<div class="price-item">${item.price}</div>
				  </div>
		`;

			const sliderShow = () => {
				const sliderDiv = document.createElement("div");
				sliderDiv.classList = "product-item slider-item";
				sliderDiv.innerHTML = sliderItem;
				this.slider.appendChild(sliderDiv);
			};

			if (idx >= this.startData && idx < this.target) {
				sliderShow()
				
			}

		});
		const listItems = document.querySelectorAll('.slider .product-item');
		listItems.forEach(item => {
			new ProductListItem(item);
		});
	}

	initChangeSlider() {
		this.sliderControl = document.createElement("div");
		this.controlsWrap.appendChild(this.sliderControl);
		this.next = document.createElement("button");
		this.next.classList = "slider-arrow next ";
		this.prev = document.createElement("button");
		this.prev.classList = "slider-arrow prev ";
		this.sliderControl.appendChild(this.prev);
		this.sliderControl.appendChild(this.next);

		this.next.addEventListener("click", () => {
			this.startData = this.startData + 5;
			this.target = this.target + 5;
			
			if (this.startData < 0) {
				this.startData = this.dataSlider.slider.length - 5;
				this.target = this.dataSlider.slider.length;
			}
			if (this.target > this.dataSlider.slider.length){
				this.startData = 0;
				this.target = 5;
			}
			this.slider.innerHTML = "";
			this.initSlider()
			console.log(this.startData);
			console.log(this.target );
		});
		this.prev.addEventListener("click", () => {
			this.startData = this.startData - 5;
			this.target = this.target - 5;
			console.log(this.dataSlider.slider.length);
			if (this.startData < 0) {
				this.startData = this.dataSlider.slider.length - 5;
				this.target = this.dataSlider.slider.length;
			}
			if (this.target > this.dataSlider.slider.length){
				this.startData = 0;
				this.target = 5;
			} 
			this.slider.innerHTML = "";
			console.log(this.startData);
			console.log(this.target );
			this.initSlider()
		})
	}

}