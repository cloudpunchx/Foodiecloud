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

        <!-- could have slideshow of food pics -->

        <!-- <v-carousel>
            <v-carousel-item

            >
            </v-carousel-item>

        </v-carousel> -->

        <PageFooter/>
    </div>
</template>

<script>
import axios from "axios";

import InsideHeader from '@/components/InsideHeader.vue'
import LogOutButton from '@/components/LogOutButton.vue';
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "DiscoverPage",
        components: {
            InsideHeader,
            LogOutButton,
            PageFooter
        },
        data() {
            return {
                // Empty Array to hold the response.data from API call
                restaurants: [],
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
    /* display: inline-flex; */
    top: -45vh;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    border: 3px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.name{
    font-size: 14pt;
    font-weight: bold;
}
.address{
    font-size: 10pt;
}
</style>