import './index.styl'

export default class SlideBullet {
	constructor(el, hover) {
		this.el = el;
		this.hover = hover || false;
		this.slide = this.el.querySelectorAll(".slide-item");
		this.slideList = this.el.querySelector(".slide-list");
		this.picture = this.el.querySelector(".slide-item img");
		this.bullet = this.el.querySelectorAll(".bullet");
		this.target = 1;
		this.init();
	}

	init() {
		this.initSlider();

		if (this.hover) {
			this.hoverBulletHandeler();
		} else {
			this.clickBulletHandeler();
		}
		this.swipeSliderHandler()

	}

	hoverBulletHandeler() {
		this.bullet.forEach(item => {
			item.addEventListener("mouseenter", (e) => {
				let target = e.currentTarget;
				let src = e.target.dataset.src;
				this.picture.src = src;
				this.bullet.forEach(item => {
					if (target === item) {
						item.classList.add("active")
					} else {
						item.classList.remove("active")
					}
				});
			})
		})

	}

	initSlider() {
		this.slide.forEach((item, index) => {
			item.dataset.slide = index;
		})
	}

	slideChange(target) {
		const changeClass = (list, data) => {
			if (Number(list.dataset.glideDir) === Number(data) || Number(list.dataset.slide) === Number(data)) {
				list.classList.add("active")
			} else {
				list.classList.remove("active")
			}
		}

		this.slide.forEach(list => {
			changeClass(list, target)
		});
		this.bullet.forEach(list => {
			changeClass(list, target)
		});


	}

	clickBulletHandeler() {
		let intervalSlide;
		this.bullet.forEach(item => {
			item.addEventListener("click", (e) => {
				clearInterval(intervalSlide);
				this.target = e.currentTarget.dataset.glideDir;
				this.slideChange(this.target);
				startInterval()
			})
		});
		let startInterval = () => {
			intervalSlide = setInterval(() => {
				this.slideChange(this.target);
				this.target++;
				if (this.target > this.bullet.length - 1) {
					this.target = 0
				}
			}, 5000)
		};
		startInterval()
		this.el.addEventListener("mouseenter",()=>{
			clearInterval(intervalSlide);
		});
		this.el.addEventListener("mouseleave",()=>{
			startInterval();
		})
	}

	swipeSliderHandler() {
		let currentX;
		this.slideList.addEventListener("touchstart", (e) => {
			e.preventDefault();
			swipeStart(e);
		});
		this.slideList.addEventListener("mousedown", (e) => {
			e.preventDefault();
			swipeStart(e);
		});
		this.slideList.addEventListener("touchend", (e) => {
			e.preventDefault();
			e.stopPropagation();
			swipeEnd(e)
		});
		this.slideList.addEventListener("mouseup", (e) => {
			e.preventDefault();
			e.stopPropagation();
			swipeEnd(e)
		});
		const swipeStart = (e) => {
			currentX = e.touches ? e.touches[0].pageX : e.pageX;
		};
		const swipeEnd = (e) => {
			let	newX = e.touches ? e.changedTouches[0].pageX : e.pageX;
			if (currentX > newX) {
				this.target++;
				if (this.target > this.bullet.length - 1) {
					this.target = 0
				}
				this.slideChange(this.target);
			} else if (currentX < newX) {
				this.target--;
				if (this.target < 0) {
					this.target = this.bullet.length - 1;
				}
				this.slideChange(this.target);
			}
		}
	}
}