import './index.styl'


class Favorite {
	constructor(){
		this.el = document.querySelectorAll('.js-favorite');
		this.init();
	}
	init(){
		this.el.forEach(btn=>{
			btn.addEventListener('click',(e)=>{
				e.preventDefault();
				e.stopPropagation();
				if(btn.dataset.product){
					this.toogle(btn.dataset.product, this.callback);
				}
			})
		})
	}
	toogle(article, callback){
		this.el.forEach(btn=>{
			if(btn.dataset.product == article){
				btn.classList.toggle('added')
			}
		})
	}
}

export default Favorite;