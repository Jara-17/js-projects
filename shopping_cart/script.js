const DB = {
	methods: {
		find: (id) => {
			return DB.items.find((item) => item.id === id);
		},
		remove: (items) => {
			items.forEach((item) => {
				const product = DB.methods.find(item.id);
				product.qty = product.qty - item.qty;
			});

			console.log(DB);
		},
	},
	items: [
		{
			id: 0,
			title: "Funko Pop",
			price: 250,
			qty: 5,
		},

		{
			id: 1,
			title: "Harry Potter",
			price: 345,
			qty: 50,
		},

		{
			id: 2,
			title: "Phillip Hue",
			price: 1300,
			qty: 80,
		},
	],
};

const shoppingCart = {
	items: [],
	methods: {
		add: (id, qty) => {
			const cartItem = shoppingCart.methods.get(id);

			if (cartItem) {
				if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
					cartItem.qty += qty;
				} else {
					alert("Not enough inventory");
				}
			} else {
				shoppingCart.items.push({ id, qty });
			}
		},
		remove: (id, qty) => {
			const cartItem = shoppingCart.methods.get(id);

			if (cartItem.qty - qty > 0) {
				cartItem.qty -= qty;
			} else {
				shoppingCart.items = shoppingCart.items.filter(
					(item) => item.id !== id
				);
			}
		},
		count: () => {
			return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
		},
		get: (id) => {
			const index = shoppingCart.items.findIndex((item) => item.id === id);
			return index >= 0 ? shoppingCart.items[index] : null;
		},
		getTotal: () => {
			const total = shoppingCart.items.reduce((acc, item) => {
				const found = DB.methods.find(item.id);
				return acc + found.price * item.qty;
			}, 0);
			return total;
		},
		hasInventory: (id, qty) => {
			return DB.items.find((item) => item.id === id).qty - qty >= 0;
		},
		purchase: () => {
			DB.methods.remove(shoppingCart.items);
			shoppingCart.items = [];
		},
	},
};

renderStore();

function renderStore() {
	const html = DB.items.map((item) => {
		return `
      <div class="item">
        <div class="title">${item.title}</div>
        <div class="price">${numberToCurrency(item.price)}</div>
        <div class="qty">${item.qty} units</div>

        <div class="actions">
          <button class="add" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    `;
	});

	document.getElementById("store-container").innerHTML = html.join("");

	document.querySelectorAll(".item .actions .add").forEach((button) => {
		button.addEventListener("click", (e) => {
			const id = parseInt(button.getAttribute("data-id"));
			const item = DB.methods.find(id);

			if (item && item.qty - 1 > 0) {
				// Add to cart
				shoppingCart.methods.add(id, 1);
				console.log(shoppingCart);
				renderSoppingCart();
			} else {
				console.log("Not enough inventory");
			}
		});
	});
}

function renderSoppingCart() {
	const html = shoppingCart.items.map((item) => {
		const dbItem = DB.methods.find(item.id);
		return `
      <div class="item">
        <div class="title">${dbItem.title}</div>
        <div class="price">${numberToCurrency(dbItem.price)}</div>
        <div class="qty">${item.qty} units</div>
        <div class="subtotal">
          Subtotal: ${numberToCurrency(dbItem.price * item.qty)}
        </div>

        <div class="actions">
          <button class="addOne" data-id="${item.id}">+</button>
          <button class="removeOne" data-id="${item.id}">-</button>
        </div>
      </div>
    `;
	});

	const closeButton = `
    <div class="cart-header">
      <button class="bclose">Close</button>  
    </div>
  `;

	const purchaseButton =
		shoppingCart.items.length > 0
			? `
    <div class="cart-actions">
      <button id="bpurchase">Purchase</button>
    </div>
  `
			: "";

	const total = shoppingCart.methods.getTotal();
	const totalContainer = `
    <div class="total">
      Total: ${numberToCurrency(total)}
    </div>
  `;

	const shoppingCartContainer = document.getElementById(
		"shopping-cart-container"
	);

	shoppingCartContainer.classList.remove("hide");
	shoppingCartContainer.classList.add("show");

	shoppingCartContainer.innerHTML =
		closeButton + html.join("") + purchaseButton + totalContainer;

	document.querySelectorAll(".addOne").forEach((button) => {
		button.addEventListener("click", (e) => {
			const id = parseInt(button.getAttribute("data-id"));
			shoppingCart.methods.add(id, 1);
			renderSoppingCart();
		});
	});

	document.querySelectorAll(".removeOne").forEach((button) => {
		button.addEventListener("click", (e) => {
			const id = parseInt(button.getAttribute("data-id"));
			shoppingCart.methods.remove(id, 1);
			renderSoppingCart();
		});
	});

	document.querySelector(".bclose").addEventListener("click", (e) => {
		shoppingCartContainer.classList.remove("show");
		shoppingCartContainer.classList.add("hide");
	});

	const bpurchase = document.querySelector("#bpurchase");

	if (bpurchase) {
		bpurchase.addEventListener("click", (e) => {
			shoppingCart.methods.purchase();
			renderStore();
			renderSoppingCart();
		});
	}
}

function numberToCurrency(num) {
	return new Intl.NumberFormat("es-ES", {
		maximumSignificantDigits: 2,
		style: "currency",
		currency: "EUR",
	}).format(num);
}
