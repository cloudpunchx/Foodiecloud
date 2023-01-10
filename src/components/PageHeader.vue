<!-- change name of Client Header?? to just header? -->

<!-- put api key into environment variable*** -->
<!-- check repos he sent, to see if it shows anything -->

<template>
    <div>
        <div>
            <v-app-bar width="100%" flat app color="#f28935">
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon @click="cart = !cart">mdi-cart</v-icon>
                </v-btn>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            </v-app-bar>

            <v-navigation-drawer 
            v-model="drawer" 
            app 
            class="navDrawer inDrawer"
            right
            >
                <div  
                class="closeDrawer"
                @click="drawer = !drawer"
                >
                    <v-btn icon>
                        <v-icon>{{ svgPath }}</v-icon>
                    </v-btn>
                </div>

                <div v-if="clientId">
                    <div v-for="user in client" :key="user.clientId">
                        <v-list-item>
                            <router-link class="navBtns" 
                            to="/orders"
                            >Order History
                            </router-link>
                        </v-list-item>

                        <v-list-item>
                            <router-link class="navBtns" 
                            :to="'/user/'+user.clientId"
                            >Account
                            </router-link>
                        </v-list-item>
                    </div>
                    <div>
                        <LogOutButton/>
                    </div>
                </div>

                <div v-else-if="restaurantId">
                    <div v-for="user in client" :key="user.restaurantId">
                        <router-link class="navBtns" to="/orders"
                        >Order History
                        </router-link>
                        <router-link class="navBtns" to="/restaurant/settings/account"
                        >Account
                        </router-link>
                    </div>
                    <div>
                        <RestaurantLogOut/>
                    </div>
                </div>

                <div v-else>
                    <router-link class="navBtns" to="/client/login"
                        >Log In/Sign Up
                    </router-link>
                </div>
            </v-navigation-drawer>

            <v-navigation-drawer 
            v-model="cart" 
            app 
            class="shoppingCart inDrawer"
            right
            >
                <div 
                class="closeDrawer"
                >
                </div>
                <div v-if="inCart == 'true'">
                    <shoppingCart class="inDrawer"/>
                </div>
                <div v-else>
                    <img class="emptyCartImg" src="../assets/emptyCartImg.png" alt="Cart Is Empty Img">
                </div>
            </v-navigation-drawer>
        </div>

        <div class="logoContainer">
            <!-- Logo is also a link to discover page. -->
            <router-link to="/">
                <img class="logo" src="../assets/foodiecloudlogo.png" alt="Foodiecloud Logo">
            </router-link>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import { mdiCloseBox } from '@mdi/js';
import shoppingCart from '@/components/shoppingCart.vue';
import LogOutButton from '@/components/LogOutButton.vue';
import RestaurantLogOut from '@/components/RestaurantLogOut.vue';

    export default {
        name: "PageHeader",
        components: {
            shoppingCart,
            LogOutButton,
            RestaurantLogOut
        },
        data() {
            return {
                // svg path is importing the 'closed box' icon
                svgPath: mdiCloseBox,
                drawer: false,
                cart: false,
                group: null,
                client: [],
                clientId: null,
                restaurantId: null,
                token: "",
                inCart: "false",
            }
        },
        methods: {
            customerHeader() {
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    params: {
                        clientId: this.clientId,
                        restaurantId: this.restaurantId
                    }
                }).then((response)=>{
                    this.client = response.data;
                }).catch((error)=>{
                    this.editAlert = error;
                    this.editAlert = "Something went wrong, please try again."
                })
            },
            restaurantHeader() {
                axios.request({
                    url: "https://foodierest.ml/api/restaurant",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    params: {
                        restaurantId: this.restaurantId
                    }
                }).then((response)=>{
                    this.client = response.data;
                }).catch((error)=>{
                    this.editAlert = error;
                    this.editAlert = "Something went wrong, please try again."
                })
            },
            getClientId(){
                this.clientId = cookies.get(`clientId`);
                this.restaurantId = cookies.get(`restaurantId`);
                this.token = cookies.get(`sessionToken`);
                if(this.clientId != null){
                    this.customerHeader();
                } else if(this.restaurantId != null){
                    this.restaurantHeader();
                } else{
                    console.log('do nothing');
                }
            },
            itemsInCart(){
                this.inCart = cookies.get(`itemsInCart`);
            },
        },
        mounted () {
            this.getClientId();
            this.itemsInCart();
        },
    }
</script>

<style scoped>
.inDrawer{
    display: grid;
    justify-items: center;
    text-align: center;
}
.logo{
    width: 30vh;
    margin: 40px;
}
.emptyCartImg{
    width: 10vw;
    margin-top: 150px;
}
.navDrawer, .shoppingCart{
    margin-top: 80px;
    text-align: center;
}
.closeDrawer{
    position: absolute;
    left: 2%;
}
.navBtns{
    text-decoration: none;
    font-size: 1.5rem;
    color: black;
}
.navBtns:visited{
    color: black;
}
.navBtns:active{
    color: #90caf8;
}
</style>