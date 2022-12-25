<!-- need to get Client PATCH working -->
<!-- got it working once already not sure how -->

<template>
    <div>
        <!-- this div will be GET -->
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

        <!-- this div will be PATCH -->
        <div>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="email"
                            label="E-mail"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="username"
                            label="User Name"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="pictureUrl"
                            label="Picture URL"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="firstName"
                            label="First Name"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="lastName"
                            label="Last Name"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="password"
                            label="Password"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="editProfile"
                outlined
                >Submit</v-btn>
                <p v-if="editAlert" class="editAlert">{{editAlert}}</p>
            </v-form>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "ClientEdit",
        data() {
            return {
                clientId: null,
                token: "",
                client: [],
                valid: false,
                username: "",
                firstName: "",
                lastName: "",
                pictureUrl: "",
                email: "",
                password: "",
                createdAt: "",
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
                        // using variable we took from the cookie and using it as a param
                        clientId: this.clientId,
                    }
                }).then((response)=>{
                    this.client = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again."
                    alert(error);
                })
            },
            editProfile(){
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "PATCH",
                    headers: {
                        token: this.token, 
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    data: {
                        email: this.email,
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password,
                        pictureUrl: this.pictureUrl,
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param so we edit this profile
                        clientId: this.clientId,
                    }
                }).then(()=>{
                    this.editAlert = "Profile updated successfully!"
                    this.clearTextBox();
                    // reload GET info to show updated profile data
                    this.getProfile();
                }).catch((error)=>{
                    this.editAlert = error;
                    this.editAlert = "Something went wrong, please try again.";
                    this.clearTextBox();
                    // refresh page
                })
            },
            getClientId(){
                // grabbing restaurantId from cookie, putting it into variable
                this.clientId = cookies.get(`clientId`);
                this.token = cookies.get(`sessionToken`);
            },
            clearTextBox(){
                this.email = "",
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.password = "";
                this.pictureUrl = "";
            }
        },
        created () {
            this.getClientId();
            this.getProfile();
        },
    }
</script>

<style scoped>
.v-card, .v-form{
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
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
    width: 25%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 50px;
}
img{
    width: 10vw;
    position: absolute;
    left: 10%;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>