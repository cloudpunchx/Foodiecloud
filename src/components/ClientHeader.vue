<!-- change name of Client Header?? to just header? -->

<!-- put api key into environment variable*** -->
<!-- check repos he sent, to see if it shows anything -->

<template>
    <div>
        <div>
            <v-app-bar width="100%" flat app>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>
                    Foodiecloud
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon @click="cart = !cart">mdi-cart</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer 
            v-model="drawer" 
            app 
            class="white inDrawer"
            >
                <div v-for="user in client" :key="user.clientId">
                    <router-link :to="'/user/'+user.clientId"
                    >My Account
                    </router-link>
                </div>
                <div>
                    <!-- NEED TO FIX LAYOUT AS ITS OBVS NOT CORRECT- CIRCLE BACK -->
                    <LogOutButton/>
                </div>
            </v-navigation-drawer>

            <v-navigation-drawer 
            v-model="cart" 
            app 
            class="white shoppingCart inDrawer"
            right
            >
                <div v-if="inCart">
                    <shoppingCart class="inDrawer"/>
                </div>
                <div v-else>
                    <!-- add little X to close drawer? -->
                    <!-- back up shopping cart to cookie, within that component, if there is nothing there, then display img -->
                    <!-- serialization/cookies -->
                    <!-- <shoppingCart v-if="inCart" class="inDrawer"/> -->
                    <img class="emptyCartImg" src="../assets/emptyCartImg.png" alt="Cart Is Empty Img">
                </div>
            </v-navigation-drawer>
        </div>

        <div class="logoContainer">
            <!-- Logo is also a link to discover page. -->
            <router-link to="/discover">
                <img class="logo" src="../assets/foodiecloudlogo.png" alt="Foodiecloud Logo">
            </router-link>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

import shoppingCart from '@/components/shoppingCart.vue';
import LogOutButton from '@/components/LogOutButton.vue';

    export default {
        name: "ClientHeader",
        components: {
            shoppingCart,
            LogOutButton
        },
        data() {
            return {
                drawer: false,
                cart: false,
                group: null,
                client: [],
                clientId: null,
                token: "",
                inCart: null,
            }
        },
        methods: {
            getProfile() {
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    params: {
                        clientId: this.clientId
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
                this.token = cookies.get(`sessionToken`);
            },
            itemsInCart(){
                this.inCart = cookies.get(`itemsInCart`);
            }
        },
        mounted () {
            this.getClientId();
            this.getProfile();
        },
    }
</script>

<style scoped>
.inDrawer{
    display: grid;
    justify-items: center;
}
.logo{
    width: 30vh;
    margin: 40px;
}
.emptyCartImg{
    width: 10vw;
    margin-top: 150px;
}
</style>