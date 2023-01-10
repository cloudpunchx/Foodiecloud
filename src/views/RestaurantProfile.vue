<template>
    <div>
        <PageHeader/>

        <!-- after this, add the profile urls and test discovery page link to public page -->
        <RestaurantEditInfo/>

        <div>
            <v-card
                outlined
                tile
                class="d-flex flex-column justify-center mb-6"
                v-for="item in menu"
                :key="item.menuId"
                cols="3"
                sm="3"
                >
                <h2>{{item.name}}!</h2>
                <img :src="item.imageUrl">
                <p>{{item.description}}</p>
                <p>{{item.price}}</p>
                <p>{{item.menuId}}</p>
            </v-card>
        </div>

        <RestaurantEditMenu/>

        <RestaurantAddMenu/>
        <!-- patch menu here -->

        <InsidePageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

import PageHeader from '@/components/PageHeader.vue';
import RestaurantEditInfo from '@/components/RestaurantEditInfo.vue';
import RestaurantAddMenu from '@/components/RestaurantAddMenu.vue';
import RestaurantEditMenu from '@/components/RestaurantEditMenu.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "RestaurantProfile",
        components: {
            PageHeader,
            RestaurantEditInfo,
            RestaurantEditMenu,
            RestaurantAddMenu,
            InsidePageFooter
        },
        data() {
            return {
                restaurantId: null,
                menuId: null,
                menu: [],
                valid: false,
                token: "",
                name: "",
                imageUrl: "",
                description: "",
                price: "",
            }
        },
        methods: {
            getMenu() {
                axios.request({
                    url: "https://foodierest.ml/api/menu",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param
                        restaurantId: this.restaurantId,
                        menuId: this.menuId,
                    }
                }).then((response)=>{
                    this.menu = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            getRestaurantId(){
                // grabbing restaurantId from cookie, putting it into variable
                this.restaurantId = cookies.get(`restaurantId`);
                this.token = cookies.get(`sessionToken`);
            },
        },
        created () {
            this.getRestaurantId();
            this.getMenu();
        },
    }
</script>

<style scoped>
img{
    width: 10vw;
}
</style>