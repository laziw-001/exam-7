const url = 'https://dummyjson.com/products'

async function products() {
	let response = await fetch(url)
	let data = await response.json()
	const productParent = document.querySelector('.product')
	const searchInput = document.querySelector('#search')

	function renderProducts(filteredProducts) {
		productParent.innerHTML = ''

		filteredProducts.forEach(product => {
			const card = document.createElement('div')
			card.classList = 'card'
			const stars = '⭐'.repeat(Math.round(product.rating))

			card.innerHTML = `
				<img src="${product.images[0]}" alt="${product.title}">
				<p>${product.category}</p>
				<h3>${product.title}</h3>
				<p>${stars} ${product.rating.toFixed(1)}</p>
				<div class="add">
					<span>$${product.price}</span>
					<button>+ Add</button>
				</div> 
			`

			productParent.appendChild(card)
		})
	}

	renderProducts(data.products)

	searchInput.addEventListener('input', function () {
		const searchText = searchInput.value.toLowerCase()
		const filteredProducts = data.products.filter(product =>
			product.title.toLowerCase().includes(searchText)
		)
		renderProducts(filteredProducts)
	})
}

products()
