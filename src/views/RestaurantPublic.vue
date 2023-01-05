<!-- Need to format page and edit the info box -->
<!-- could make 1 GET restaurant component and use it here and on profile edit? come back to at the end -->

<!-- new idea, scrap this get request and use dynamic routing from discover page? -->

<template>
    <div>
        <RestaurantHeader/>

        <div class="restaurant">
            <v-card
            outlined
            tile
            class="d-flex flex-column justify-center mb-6"
            v-for="restaurant in restaurant"
            :key="restaurant.restaurantId"
            >
            <h2>{{ restaurant.name }}!</h2>
            <img :src="restaurant.bannerUrl">
            <p>{{restaurant.bio}}</p>
            <p>
                {{restaurant.address}},
                {{restaurant.city}}
            </p>
            <p>{{restaurant.email}}</p>
            <p>{{restaurant.phoneNum}}</p>
            </v-card>
        </div>

        <!-- need to do something with menu, probably only import it here and send data to menu vue template? -->
        <RestaurantMenu/>

        <PageFooter/>
    </div>
</template>

<script>
import axios from "axios";

import RestaurantHeader from '@/components/RestaurantHeader.vue';
import RestaurantMenu from '@/components/RestaurantMenu.vue';
import PageFooter from '@/components/PageFooter.vue';

    export default {
        name: "RestaurantPublic",
        components: {
            RestaurantHeader,
            RestaurantMenu,
            PageFooter
        },
        data() {
            return {
                restaurantId: this.$route.params.restaurantId,
                restaurant: [],
            }
        },
        methods: {
            getProfile() {
                axios.request({
                    url: "https://foodierest.ml/api/restaurant",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    params: {
                        restaurantId: this.$route.params.restaurantId
                    }
                }).then((response)=>{
                    this.restaurant = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
        },
        mounted () {
            this.getProfile();
        },
    }
</script>

<style scoped>
.v-card{
    color: black;
    background-color: white;
    text-align: center;
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
    border: 3px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>