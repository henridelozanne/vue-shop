<template>
  <div class="checkout">
    <Navbar />
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-9">
          <h4>Checkout page</h4>  
          <ul>
            <li v-for="item in this.$store.state.cart" :key="item.name">
              <img :src="item.productImage" width="80px" class="align-self-center mr-3">
              <div class="media-body">
                <h5 class="mt-0">
                  {{item.name}}
                  <span class="float-right" @click="$store.commit('removeFromCart', item)">X</span>
                </h5>
              </div>
              <p class="mt-0">{{item.price | currency}}</p>
              <p class="mt-0">Quantity: {{item.productQuantity}}</p>
            </li>
          </ul>
        </div>
        <div class="col-md-9">
          Total Price : {{ this.$store.getters.totalPrice | currency }}
        </div>
        <button class="btn btn-primary" @click="pay">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script src="https://js.stripe.com/v3/"></script>

<script>
import axios from 'axios';
var stripe = Stripe('pk_test_R7D9yfu7xo9fBZmcOhkvi1II00uh7k5vYx');

export default {
  data() {
    return {
      sessionId: '',
    };
  },
  methods: {
    pay() {
      let data = this.$store.state.cart.map(item => ({ [item.product_id] : item.productQuantity}));
      data = Object.assign({}, ...data);
      axios
        .get('https://us-central1-vue-shop-411af.cloudfunctions.net/CheckoutSession', {
          params: {
            products: data
          }
        })
        .then(response => {
          this.sessionId = response.data;
          console.log('response ?', response.data);

          stripe.redirectToCheckout({
            sessionId: this.sessionId.id
          }).then(function () {
              console.log('in the last then');
          });
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
};

</script>