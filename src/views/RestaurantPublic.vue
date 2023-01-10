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

        <!-- need to do something with menu, probably only import it here and send data to menu vue template? -->
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
    width: 70vw;
    left: 50%;
    transform: translateX(-50%);
}
.profilePicture{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 15px;
}
</style>