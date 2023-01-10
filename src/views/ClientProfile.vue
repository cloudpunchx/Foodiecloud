<template>
    <div>
        <PageHeader/>

        <v-card
        class="d-flex flex-column justify-center mb-6"
        >
            <v-app-bar width="100%" flat app>
                <v-toolbar-title>
                    <p class="title">Edit Your Account</p>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn>
                    <span>Sign Out</span>
                </v-btn>
            </v-app-bar>
            <v-form
            v-for="client in client"
            :key="client.clientId">
                <v-container>
                    <v-row>
                        <v-list-item>
                            <v-avatar
                            size="175"
                            class="profilePicture"
                            >
                            <v-img
                            :src="client.pictureUrl"
                            ></v-img>
                            </v-avatar>
                        </v-list-item>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            :v-model="client.username"
                            v-model="username"
                            :label="client.username"
                            filled
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            :v-model="client.firstName"
                            v-model="firstName"
                            :label="client.firstName"
                            filled
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            :v-model="client.lastName"
                            v-model="lastName"
                            :label="client.lastName"
                            filled
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                        <!-- maybe move email up near top and not have it as an input field -->
                            <v-text-field
                            :v-model="client.email"
                            :label="client.email"
                            filled
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            :v-model="client.password"
                            v-model="password"
                            label="Password"
                            filled
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            :v-model="client.pictureUrl"
                            v-model="pictureUrl"
                            label="Picture URL"
                            filled
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                outlined
                @click="editProfile"
                >Submit</v-btn>
                <p v-if="editAlert" class="editAlert">{{editAlert}}</p>
            </v-form>
        </v-card>

        <ClientDelete/>

        <InsidePageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

import PageHeader from '@/components/PageHeader.vue'
import ClientDelete from '@/components/ClientDelete.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "ClientProfile",
        components: {
            PageHeader,
            ClientDelete,
            InsidePageFooter
        },
        data() {
            return {
                client: [],
                token: "",
                username: "",
                firstName: "",
                lastName: "",
                pictureUrl: "",
                email: "",
                password: "",
                editAlert: "",
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
                        clientId: this.$route.params.clientId
                    }
                }).then((response)=>{
                    this.client = response.data;
                }).catch((error)=>{
                    this.editAlert = error;
                    this.editAlert = "Something went wrong, please try again."
                })
            },
            getClientId(){
                this.token = cookies.get(`sessionToken`);
            },
            editProfile(){
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "PATCH",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    data: {
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password,
                        pictureUrl: this.pictureUrl,
                    }
                }).then(()=>{
                    this.editAlert = 'Profile updated successfully!';
                    this.clearTextBox();
                    this.getProfile();
                }).catch((error)=>{
                    this.editAlert = error;
                    this.editAlert = "Something went wrong, please try again."
                    this.clearTextBox();
                })
            },
            clearTextBox(){
                this.email = "",
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.password = "";
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
}
.profilePicture{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 15px;
}
.v-form{
    margin-top: 60px;
}
.title{
    padding-top: 18px;
}
</style>