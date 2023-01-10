<!-- Come back and fix error, make it better in AXIOS call -->
<template>
    <div>
        <PageHeader/>

        <img class="phrase" src="../assets/whateveryourmood.png" alt="Whatever You're In The Mood For text Img">

        <v-row>
            <v-card
            class="mx-auto my-12"
            max-width="374"
            v-for="restaurants of restaurants"
            :key="restaurants.restaurantId"
            >

                <v-img
                height="250"
                :src="restaurants.bannerUrl"
                ></v-img>

                <v-card-title>{{restaurants.name}}</v-card-title>

                <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ms-4">
                    4.5 (438)
                    </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                    $$ 
                </div>

                <div>{{restaurants.bio}}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                    <router-link
                    :to="{
                        name: 'RestaurantPublic',
                        params: {restaurantId: restaurants.restaurantId}
                    }"
                    ><v-btn
                    elevation="2"
                    outlined>
                    Order Here
                    </v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </v-row>

        <!-- <v-carousel
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
        </v-carousel> -->

        <InsidePageFooter/>
        
    </div>
</template>

<script>
import axios from "axios";

import PageHeader from '@/components/PageHeader.vue'
import InsidePageFooter from '@/components/InsidePageFooter.vue'

    export default {
        name: "DiscoverPage",
        components: {
            PageHeader,
            InsidePageFooter
        },
        data() {
            return {
                restaurants: [],
                selectedRestaurant: "",
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
                    {
                        src: "https://img.freepik.com/free-photo/assortment-pieces-cake_114579-30731.jpg?w=1380&t=st=1671868467~exp=1671869067~hmac=9e9e99a170abedb2a42df38ea3d056450298885370964424f5ae6ad92d10f5f1"
                    },
                ],
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
            },
        },
        mounted () {
            this.restaurantDiscover();
        },
    }
</script>

<style scoped>
.phrase{
    width: 33vw;
    position: absolute;
    top: 10%;
    left: 51%;
    transform: translateX(-50%);
}
.v-card{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 1;
    width: 20vw;
}
.profileButton{
    width: 12%;
    position: absolute;
    top: 2%;
    left: 87%;
}
.v-carousel{
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: 11%;
}

</style>