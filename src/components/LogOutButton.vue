<template>
    <div>
        <v-btn
        elevation="2"
        outlined
        @click="logOut"
        >
            Log Out
        </v-btn>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "LogOutButton",
        methods: {
            logOut() {
                axios.request({
                    url: "https://foodierest.ml/api/client-login",
                    method: "DELETE",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: "",
                    },
                }).then(()=>{
                    this.token = cookies.get(`sessionToken`);
                    cookies.remove(`sessionToken`);
                    cookies.remove(`clientId`);
                    // return to log in page after logout
                    router.push("/");
                }).catch((error)=>{
                    error = "Unexpected error occurred, try again."
                    alert(error)
                })
            }
        },
    }
</script>

<style scoped>
.v-btn{
    color: white;
    background-color: black;
    position: absolute;
    top: 2%;
    left: 93%;
}
</style>