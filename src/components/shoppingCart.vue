<!-- 4:30pm Jan 7 - post for order is working, need to get the items to display (visual only no actual logic req'd) -->

<template>
    <div>
        <v-row>       
            <v-card
            class="mx-auto"
            min-width="350"
            max-width="350"
            outlined
            v-for="items in shoppingCart"
            :key="items.menuId"
            >
                <v-responsive>
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                        {{items.menuId}}
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                        {{items.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{items.description}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                    ><img :src="items.imageUrl"></v-list-item-avatar>
                    </v-list-item>
                </v-responsive>
            </v-card>
            <v-btn
            outlined
            text
            @click="submitOrder"
            >
            Submit Order
            </v-btn> 
        </v-row> 

    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "shoppingCart",
        data() {
            return {
                shoppingCart: [],
                token: "",
                // menuId: null,
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
                    // params: {
                    //     menuId: this.menuId,
                    // }
                }).then((response)=>{
                    this.shoppingCart = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
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
                        items: this.shoppingCart,
                    }
                }).then((response)=>{
                    // is this correct for 2nd param in cookie set?
                    cookies.set(`shoppingCart`, response);
                    alert("success TEST");
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            addToCart(menuId) {
                this.shoppingCart.push(menuId)
                // mark said push
            },
            getToken(){
                // grabbing restaurantId from cookie, putting it into variable
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted () {
            this.$root.$on('addToCart', this.addToCart);
            this.getToken();
        },
    }
</script>
<!-- shopping cart is functional part for api call, details just visual -->
<!-- 1st is array for item in shopping cart, make an api call to get details for specific item, then append to details array -->
<!-- make 2nd array for details - just for looks -->

<style scoped>

</style>