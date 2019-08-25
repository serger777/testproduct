import './index.styl';


class ProductListItem {
	constructor(el) {
		this.el = el;
		this.user = this.el.querySelector(".user");
		this.star = this.el.querySelector(".star");
		this.heart = this.el.querySelector(".favorite");
		this.name = this.el.querySelector(".name");

		this.initHandler();
	}

	initHandler() {
		this.clickHadler(this.user);
		this.clickHadler(this.star);
		this.clickHadler(this.heart);
		this.clickHadler(this.name);
		this.nameSliceHandler()
	}
	
	
	clickHadler(element){
		element.addEventListener("click",(e)=>{
			let target = e.currentTarget;
			let btn = target.closest("button");
			if(btn){
				btn.classList.toggle("active");
			}
			else{
				target.classList.toggle("active");
			}
			
		})
	}
	
	nameSliceHandler(){
		let text = this.name.textContent;
		if(text.length>30){
			let str = `${text.slice(0, 30)}...` ;
			this.name.textContent = str;
		}
		
	}
	
	
	

}

export default ProductListItem;