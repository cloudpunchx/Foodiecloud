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
                        @click="addToCart(item.menuId)"
                        >
                            Add to Cart
                        </v-btn>        
                    </v-card-actions>
                </v-responsive>
            </v-card>
        </v-row> 
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RestaurantMenu",
        data() {
            return {
                menu: [],
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
                    }
                }).then((response)=>{
                    this.menu = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            addToCart(menuId) {
                let menuItem = menuId;
                this.$root.$emit('addToCart', menuItem);
                // Setting cookie here so the header nav drawer displays Cart when items are added
                cookies.set(`itemsInCart`, `true`);
            }
        },
        created () {
            this.getMenu();
        },
    }
</script>

<style scoped>
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
}
</style>