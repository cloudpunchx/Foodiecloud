<template>
    <div>
        <ClientHeader/>

        <div>
            <v-card
            outlined
            tile
            class="d-flex flex-column justify-center mb-6"
            v-for="client in client"
            :key="client.clientId"
            cols="3"
            sm="3"
            >
            <img :src="client.pictureUrl"> 
            <h2>Welcome {{ client.username }}!</h2>
            <p>First Name: {{ client.firstName }}</p>
            <p>Last Name: {{ client.lastName }}</p>
            <p>E-mail: {{client.email}}</p>
            <p>Member Since: {{client.createdAt}}</p>
            </v-card>
        </div>

        <ClientEdit/>

        <ClientDelete/>

        <InsidePageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

import ClientHeader from '@/components/ClientHeader.vue'
import ClientEdit from '@/components/ClientEdit.vue';
import ClientDelete from '@/components/ClientDelete.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "ClientProfile",
        components: {
            ClientHeader,
            ClientEdit,
            ClientDelete,
            InsidePageFooter
        },
        data() {
            return {
                clientId: null,
                client: [],
                valid: false,
                token: "",
            }
        },
        methods: {
            getProfile() {
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param
                        clientId: this.clientId,
                    }
                }).then((response)=>{
                    this.client = response.data;
                }).catch((error)=>{
                    this.editAlert = error;
                    this.editAlert = "Something went wrong, please try again."
                })
            },
            getClientId(){
                // grabbing clientId from cookie, putting it into variable
                this.clientId = cookies.get(`clientId`);
                this.token = cookies.get(`sessionToken`);
            },
        },
        created () {
            this.getClientId();
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
    width: 75%;
    border: 3px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
img{
    width: 10vw;
    position: absolute;
    left: 10%;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>