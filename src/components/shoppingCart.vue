<!-- 'STEPPER' IN VUETIFY -->

<template>
    <div v-if="shoppingCartItems.length">
        <!-- <div v-for="(items,index) in shoppingCartItems"
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
            </v-btn> -->


            <!-- need to make cart, do we want items shown in cart, and create array separately -->
            <!-- with the array of menu Ids , so it looks good -->

            <!-- send all info over -->
            <v-col>       
            <v-card
            class="mx-auto"
            outlined
            v-for="(items,index) in shoppingCartItems"
            :key="index"
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
                    ><img :src="item.imageUrl"></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn
                        outlined
                        text
                        @click="submitOrder"
                    >
                        Submit Order
                    </v-btn>        
                    </v-card-actions>
                </v-responsive>
            </v-card>
        </v-col> 
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