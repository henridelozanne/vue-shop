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
      </div>
    </div>
  </div>
</template>
