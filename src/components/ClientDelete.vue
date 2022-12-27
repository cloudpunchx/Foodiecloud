<template>
    <div>
        <v-btn
        elevation="2"
        @click="deleteProfile"
        outlined
        >Delete Profile</v-btn>
        <p>{{ response }}</p>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "ClientDelete",
        data() {
            return {
                response: "",
                token: "",
                clientId: null,
            }
        },
        methods: {
            deleteProfile() {
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "DELETE",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param
                        clientId: this.clientId,
                    }
                }).then((response)=>{
                    console.log(response);
                    this.response = "Successfully deleted account."
                }).catch((error)=>{
                    this.response = error;
                    this.response = "Something went wrong, please try again.";
                })
            },
            getClientId(){
                // grabbing clientId from cookie, putting it into variable
                this.clientId = cookies.get(`clientId`);
                this.token = cookies.get(`sessionToken`);
            },
            created () {
                this.getClientId();
            },
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