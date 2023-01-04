<template>
    <div>
        <v-btn
        elevation="2"
        outlined
        @click="deleteClient"
        >Delete Profile</v-btn>
        <p>{{ response }}</p>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "ClientDelete",
        data() {
            return {
                response: "",
                // token: "",
            }
        },
        methods: {
            deleteClient() {
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "DELETE",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: "",
                    },
                }).then(()=>{
                    this.token = cookies.get(`sessionToken`);
                    cookies.remove(`sessionToken`);
                    cookies.remove(`clientId`);
                    // return to discover page after user is deleted
                    router.push("/discover");
                }).catch((error)=>{
                    error = "Unexpected error occurred, try again."
                    this.response = error;
                })
            }
        },
    }
</script>

<style scoped>
.v-btn{
    font-size: 11.5pt;
    color: rgb(248, 6, 6);
    background-color: whitesmoke;
    font-weight: bold;
    width: 17.5%;
    position: absolute;
    left: 70%;
    top: 54%;
}
</style>