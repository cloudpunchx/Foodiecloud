<!-- fix layout! -->
<!-- need delete button for menu -->

<template>
    <div>
        <v-row>       
            <v-card
            class="mx-auto"
            min-width="350"
            max-width="350"
            outlined
            v-for="item in menu"
            :key="item.menuId"
            >
                <v-responsive>
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                        {{item.menuId}}
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                        {{item.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                    ><img :src="item.imageUrl"></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn
                        outlined
                        text
                        @click="addToCart"
                    >
                        Add to Cart
                    </v-btn>        
                    </v-card-actions>
                </v-responsive>
            </v-card>
        </v-row> 

        <shoppingCart/>
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

</style>