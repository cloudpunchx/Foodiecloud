<template>
    <div>
        <div>
            <p @click="logOut">Log Out</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "RestaurantLogOut",
        methods: {
            logOut() {
                axios.request({
                    url: "https://foodierest.ml/api/restaurant-login",
                    method: "DELETE",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: "",
                    },
                }).then(()=>{
                    this.token = cookies.get(`sessionToken`);
                    cookies.remove(`sessionToken`);
                    cookies.remove(`restaurantId`);
                    router.push("/restaurant/login");
                }).catch((error)=>{
                    error = "Unexpected error occurred, try again."
                    alert(error)
                })
            }
        },
    }
</script>

<style scoped>
p{
    font-size: 1.5rem;
    cursor: pointer;
}
p:active{
    color: #90caf8;
}
p:visited{
    color: black;
}
</style>