<template>
    <div v-if="shoppingCartItems.length">
        <div v-for="(items,index) in shoppingCartItems"
        :key="index"
        >
        <p>{{ items }}</p>  
        </div>
        <v-btn
            elevation="2"
            outlined
            @click="submitOrder"
            >
            Submit Order
            </v-btn>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "shoppingCart",
        data() {
            return {
                shoppingCartItems: [],
                token: "",
            }
        },
        methods: {
            submitOrder() {
                axios.request({
                    url: "https://foodierest.ml/api/order",
                    method: "POST",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    data: {
                        restaurantId: this.$route.params.restaurantId,
                        items: this.shoppingCartItems,
                    }
                }).then((success)=>{
                    console.log(success);
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            shoppingCart(selectedItem) {
                this.shoppingCartItems.push(selectedItem);
            },
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
        },
        created () {
            this.getToken();
        },
        mounted () {
            this.$root.$on('shoppingCart', this.shoppingCart);
        },
    }
</script>

<style scoped>
.v-btn{
    color: white;
    background-color: black;
    width: 20%;
    left: 50%;
    transform: translateX(-50%);
}
</style>