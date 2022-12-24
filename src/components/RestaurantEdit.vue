<template>
    <!-- this div will be GRID so we can align these two divs below -->
    <div>
        <!-- this div will be GET -->
        <div>
            <v-card
            outlined
            tile
            class="d-flex flex-column justify-center mb-6"
            v-for="restaurant in restaurant"
            :key="restaurant.restaurantId"
            cols="3"
            sm="3"
            >
            <p>{{ restaurant.name }}</p>
            <img :src="restaurant.bannerUrl">
            <p>{{restaurant.bio}}</p>
            <p>
                {{restaurant.address}}
                {{restaurant.city}}
            </p>
            <p>{{restaurant.email}}</p>
            <p>{{restaurant.phoneNum}}</p>
            </v-card>
        </div>

        <!-- this div will be PATCH -->
        <!-- or could put the patch values in next to the get values? -->
        <div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RestaurantEdit",
        data() {
            return {
                restaurantId: null,
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
                        // using variable we took from the cookie and using it as a param
                        restaurantId: this.restaurantId,
                    }
                }).then((response)=>{
                    this.restaurant = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, try again."
                    alert(error);
                })
            },
            getRestaurantId(){
                // grabbing restaurantId from cookie, putting it into variable
                this.restaurantId = cookies.get(`restaurantId`);
            }
        },
        created () {
            // when you get to this page, run these functions
            this.getRestaurantId();
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
    width: 30%;
    border: 3px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>