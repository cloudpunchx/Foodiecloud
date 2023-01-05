<!-- fix layout! -->

<template>
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
</template>

<script>
import axios from "axios";

    export default {
        name: "RestaurantMenu",
        data() {
            return {
                // restaurantId: null,
                menuId: null,
                menu: [],
                valid: false,
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
                        restaurantId: this.$route.params.restaurantId,
                        menuId: this.menuId,
                    }
                }).then((response)=>{
                    this.menu = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
        },
        created () {
            this.getMenu();
        },
    }
</script>

<style scoped>
img{
    width: 10vw;
}
</style>