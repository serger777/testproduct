import './index.styl';
// import SizeSelector from 'Components/SizeSelector';

class ProductListItem {
	constructor(el) {
		this.el = el;
		this.bullets = this.el.querySelector('.bullets');
		this.addPhotosInterval;
		if(this.bullets)
			this.bulletsItem = this.bullets.querySelectorAll('span');
		this.init();
	}

	init() {
	
	}

	startAddPhotos(){
		let target = this.el.querySelector('img');
		this.addPhotosInterval = setInterval((e)=>{
			let next = this.bullets.querySelector('.active').nextElementSibling && this.bullets.querySelector('.active').nextElementSibling.matches('span') ? this.bullets.querySelector('.active').nextElementSibling : undefined;
			if (!next) next = this.bullets.querySelector('span');
			this.bulletsItem.forEach(span=>{
				span.classList.remove('active');
			})
			next.classList.add('active');
			this.viewAddPhotos();
		},2000);
	};

	viewAddPhotos(){
		let target = this.el.querySelector('img');
		let active = this.bullets.querySelector('.active');
		if (active) {
			let src = active.dataset.src;
			let srcset = active.dataset.srcset;
			if (src && srcset) {
				target.src = src;
				target.srcset = srcset;
			};
		};
	};

	stopAddPhotos(){
        var target = this.el.querySelector('img');
        clearInterval(this.addPhotosInterval);
        this.bulletsItem.forEach(span=>{
            span.classList.remove('active');
        })
        var first = this.bullets.querySelector('span');
        first.classList.add('active');
        target.src = first.dataset.src;
        target.srcset = first.dataset.srcset;
    };
	

}

export default ProductListItem;