app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
    /*html*/
    `
   <div class="product-display">
        
    <div class="product-container">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h2>shirts</h2>
        <h1>{{ productDetail }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id"
          class="color-circle" 
          :style="{ backgroundColor: variant.color }"
          @mouseover="updateProduct(index)"
          >
        </div> 

        <button class="button" v-on:click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>
      </div>
    </div>

  </div>
   `,
  data() {
    return {
      product: 'shirts',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      variants: [
        {
          id: 2234,
          color: 'green',
          type: 'Matrix',
          detail: 'Matrix',
          image: './assets/images/matrix_shirt.jpg',
          quantity: 2
        },
        {
          id: 2235,
          type: 'Spider-man',
          color: 'red',
          detail: 'Spider-man',
          image: './assets/images/spiderman_shirt.jpg',
          quantity: 0
        },
        {
          id: 2236,
          type: 'West Side Story',
          color: 'grey',
          detail: 'West Side Story',
          image: './assets/images/westsidestory_shirt.jpg',
          quantity: 10
        },
      ],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
  },
  computed: {
    productName() {
      return this.brand + ' ' + this.product
    },
    productDetail() {
      return this.variants[this.selectedVariant].detail
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  }
})
