<!-- Come back and fix error, make it better in AXIOS call -->
<template>
    <div>
        <PageHeader/>

        <img class="phrase" src="../assets/whateveryourmood.png" alt="Whatever You're In The Mood For text Img">

        <v-container class="restContainer">
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
                    outlined
                    >
                    Order Here
                    </v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </v-container>

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
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                restaurants: [],
                selectedRestaurant: "",
            }
        },
        methods: {
            restaurantDiscover() {
                axios.request({
                    url: this.apiUrl+"restaurant",
                    method: "GET",
                    headers: {
                        'x-api-key': this.apiKey,
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
.restContainer{
    width: 85%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
.v-card{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 1;
}
</style>