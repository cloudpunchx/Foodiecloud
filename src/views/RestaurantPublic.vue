<template>
    <div>
        <PageHeader/>

        <v-card
        outlined
        class="d-flex flex-column justify-center mb-6"
        v-for="restaurant in restaurant"
        :key="restaurant.restaurantId"
        >
            <v-img
            height="300"
            :src="restaurant.bannerUrl"
            ></v-img>

            <v-avatar
            size="175"
            class="profilePicture"
            >
            <v-img
            :src="restaurant.profileUrl"
            ></v-img>
            </v-avatar>

            <v-card-title>{{ restaurant.name }}</v-card-title>

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
                    4.5 (413)
                    </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                    $ • Italian, Cafe
                </div>

                <div>{{restaurant.bio}}</div>
            </v-card-text>
        </v-card>

        <RestaurantMenu/>

        <PageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import PageHeader from '@/components/PageHeader.vue';
import RestaurantMenu from '@/components/RestaurantMenu.vue';
import PageFooter from '@/components/PageFooter.vue';

    export default {
        name: "RestaurantPublic",
        components: {
            PageHeader,
            RestaurantMenu,
            PageFooter
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                restaurantId: this.$route.params.restaurantId,
                restaurant: [],
            }
        },
        methods: {
            getProfile() {
                axios.request({
                    url: this.apiUrl+"restaurant",
                    method: "GET",
                    headers: {
                        'x-api-key': this.apiKey,
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
    width: 70vw;
    left: 50%;
    transform: translateX(-50%);
}
.profilePicture{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 15px;
}
</style>