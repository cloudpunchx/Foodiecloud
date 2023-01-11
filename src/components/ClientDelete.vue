<template>
    <div>
        <v-btn
        outlined
        elevation="2"
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
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                response: "",
                token: "",
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            deleteClient() {
                axios.request({
                    url: this.apiUrl+"client",
                    method: "DELETE",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                }).then(()=>{
                    cookies.remove(`sessionToken`);
                    cookies.remove(`clientId`);
                    cookies.remove(`itemsInCart`);
                    // return to discover page after user is deleted
                    router.push("/discover");
                }).catch((error)=>{
                    error = "Something went wrong, please try again."
                    alert(error);
                })
            },
        },
        created () {
            this.getToken();
        },
    }
</script>

<style scoped>
.v-btn{
    font-size: 11.5pt;
    background-color: rgb(169, 14, 14);
    color: whitesmoke;
    position: absolute;
    right: 3%;
    bottom: 5%;
}
</style>