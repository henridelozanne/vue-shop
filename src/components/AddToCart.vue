<template>
  <div class="add-to-cart">
    <button class="btn btn-primary" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
import jQuery from 'jquery';

export default {
  name: "AddToCart",
  props: {
    name: String,
    price: String,
    image: String,
    pId: String,
  },
  data() {
    return {
      item: {
        name: this.name,
        price: this.price,
        product_id: this.pId,
        productImage: this.image,
        productQuantity: 1,
      },
    };
  },
  methods: {
    addToCart() {
      jQuery('#miniCart').modal('show')
      this.$store.commit('AddToCart', this.item);
    }
  }
}
</script>
