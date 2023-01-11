<template>
    <div>
        <div>
            <v-row>       
                <v-card
                class="mx-auto"
                min-width="200"
                max-width="200"
                outlined
                v-for="items in listedItems"
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
                <router-link
                to="/orders"
                        ><v-btn
                        elevation="2"
                        outlined
                        @click="submitOrder"
                        >
                        Submit Order
                        </v-btn>
                </router-link>
            </v-row> 
        </div>


    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "shoppingCart",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                shoppingCart: [],
                menuId: null,
                listedItems: [],
            }
        },
        methods: {
            getOrderList() {
                axios.request({
                    url: this.apiUrl+"menu",
                    method: "GET",
                    headers: {
                        'x-api-key': this.apiKey,
                    },
                    params: {
                        menuId: this.menuId,
                    }
                }).then((response)=>{
                    this.listedItems.push(response.data.imageUrl);
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
                }).then(()=>{
                    alert("success TEST");
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            addToCart(menuId) {
                this.shoppingCart.push(menuId);
                this.menuId = menuId;
                this.getOrderList();
            },
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted () {
            this.getToken();
            this.$root.$on('addToCart', this.addToCart);
        },
    }
</script>

<style scoped>

</style>