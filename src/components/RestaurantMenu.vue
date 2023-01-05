<!-- fix layout! -->

<template>
    <div>
        <v-card
            outlined
            tile
            class="d-flex flex-column justify-center mb-6"
            v-for="item in menu"
            :key="item.menuId"
            cols="3"
            sm="3"
            >
            <h2>{{item.name}}!</h2>
            <img :src="item.imageUrl">
            <p>{{item.description}}</p>
            <p>{{item.price}}</p>
            <p>{{item.menuId}}</p>
            <v-btn
            elevation="2"
            outlined
            @click="addToCart"
            >
            Add to Cart
            </v-btn>
        </v-card>

        <shoppingCart />
    </div>
</template>

<script>
import axios from "axios";

import shoppingCart from '@/components/shoppingCart.vue';

    export default {
        name: "RestaurantMenu",
        components: {
            shoppingCart
        },
        data() {
            return {
                menuId: null,
                menu: [],
                selectedItem: null,
            }
        },
        methods: {
            getMenu() {
                axios.request({
                    url: "https://foodierest.ml/api/menu",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    params: {
                        restaurantId: this.$route.params.restaurantId,
                        menuId: this.menuId,
                    }
                }).then((response)=>{
                    this.menu = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            addToCart() {
                // I think issue is it isn't grabbing menu ID 
                this.$root.$emit('shoppingCart', this.selectedItem);
            }
        },
        created () {
            this.getMenu();
        },
    }
</script>

<style scoped>
img{
    width: 10vw;
}
.v-btn{
    color: white;
    background-color: black;
    width: 20%;
    left: 50%;
    transform: translateX(-50%);
}
</style>