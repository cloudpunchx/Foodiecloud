<!-- Come back and fix error, make it better in AXIOS call -->
<!-- not sure if bannerUrl works in template v-card, check after putting bannerurl in a restaurant -->

<template>
    <div>
        <InsideHeader/>

        <LogOutButton/>

        <v-card
        outlined
        tile
        class="d-flex flex-column justify-center mb-6"
        v-for="restaurants of restaurants"
        :key="restaurants.restaurantId"
        cols="3"
        sm="3"
        >
            <p class="name">{{restaurants.name}}</p>
            <img :src="restaurants.bannerUrl">
            <p>{{restaurants.bio}}</p>
            <p class="address">
                {{restaurants.address}}
                {{restaurants.city}}
            <!-- need to add url to restaurant page -->
            </p>
        </v-card>

        <v-carousel
        hide-delimiters
        hide-delimiter-background
        show-arrows-on-hover
        cycle
        height="500"
        >
            <v-carousel-item
            v-for="(img,i) in photoCarousel"
            :key="i"
            :src="img.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
            >
            </v-carousel-item>
        </v-carousel>

        <InsidePageFooter/>
    </div>
</template>

<script>
import axios from "axios";

import InsideHeader from '@/components/InsideHeader.vue'
import LogOutButton from '@/components/LogOutButton.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue'

    export default {
        name: "DiscoverPage",
        components: {
            InsideHeader,
            LogOutButton,
            InsidePageFooter
        },
        data() {
            return {
                // Empty Array to hold the response.data from API call
                restaurants: [],
                photoCarousel: [
                    {
                        src: "https://img.freepik.com/free-photo/serving-homemade-pappardelle-pasta-with-mushrooms-parmesan-cheese_53876-105902.jpg?w=1060&t=st=1671866019~exp=1671866619~hmac=366f4c49dd540d7d3d36190e08910a0466696dc9dee362b2cee25bf9819794ff"
                    },
                    {
                        src: "https://img.freepik.com/premium-photo/breakfast-buffet-full-continental-english_79295-5883.jpg?w=1380"
                    },
                    {
                        src: "https://img.freepik.com/free-photo/healthy-oatmeal-recipe-with-fruits-nuts_53876-110646.jpg?w=1380&t=st=1671866076~exp=1671866676~hmac=793746af1bc79c722e5e9c2eaac3f72273fd605c429fedb378ace119c6b62e75",
                    },
                    {
                        src: "https://img.freepik.com/premium-photo/row-assorted-mexican-street-tacos-with-garnishes-wide-banner-composition_250927-495.jpg?w=1800"
                    },
                    {
                        src: "https://img.freepik.com/free-photo/top-view-bowls-with-indian-food_23-2148723454.jpg?w=1380&t=st=1671865643~exp=1671866243~hmac=6c62bb36281b8d679bdf3baddb23ec6ffca987e483d62d5c19c0dac8016dc01a"
                    },
                ]
            }
        },
        methods: {
            restaurantDiscover() {
                axios.request({
                    url: "https://foodierest.ml/api/restaurant",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                }).then((response)=>{
                    this.restaurants = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, try again."
                    alert(error);
                })
            }
        },
        mounted () {
            // I want the restaurant information to display when the page loads so user can see selection of restaurants.
            this.restaurantDiscover();
        },
    }
</script>

<style scoped>
.v-card{
    color: black;
    background-color: rgb(240, 255, 253);
    text-align: center;
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    border: 3px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 1;
}
.name{
    font-size: 14pt;
    font-weight: bold;
}
.address{
    font-size: 10pt;
}
.v-carousel{
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: 12%;
}
</style>