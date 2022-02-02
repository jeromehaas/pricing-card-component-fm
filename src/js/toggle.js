class Toggle {
	
	constructor() {
		this.name = 'toggle';
		this.toggle = document.querySelector('.toggle__switch');
		this.toggleMode = 'monthly';
		this.prices = {
			basic: {
				element: document.querySelector('.price__amount--basic'),
				prices: {
					monthly: '19.99',
					annually: '199.99'	
				}
			},
			professional: {
				element: document.querySelector('.price__amount--professional'),
				prices: {
					monthly: '24.99',
					annually: '249.99'	
				}
			},
			master: {
				element: document.querySelector('.price__amount--master'),
				prices: {
					monthly: '39.99',
					annually: '399.99'	
				}
			}
		}
		this.init();
	}
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return
		this.addEventlistener();
		this.setPrices();
	}

	addEventlistener() {
			this.toggle.addEventListener('click', () => {
				this.toggleState();
			})
	}

	toggleState () {
		if (this.toggleMode === 'monthly' ) {
			this.toggleMode = 'annually' 
			this.toggle.classList.remove('toggle__switch--monthly')
			this.toggle.classList.add('toggle__switch--annually')
		} else {	
			this.toggleMode = 'monthly';
			this.toggle.classList.remove('toggle__switch--annually')
			this.toggle.classList.add('toggle__switch--monthly')
		}
		this.setPrices();
	}

	setPrices () {
		this.prices.basic.element.innerText = this.prices.basic.prices[this.toggleMode]
		this.prices.professional.element.innerText = this.prices.professional.prices[this.toggleMode]
		this.prices.master.element.innerText = this.prices.master.prices[this.toggleMode]
	}

}

new Toggle();