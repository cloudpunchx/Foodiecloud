<!-- when updating to new v card , add v-avatar vuetify - Avatars -->

<!-- fix button layouts -->
<template>
    <div>
        <div>
            <v-form>
                <v-container>
                    <v-row>
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
                client: [],
                valid: false,
                token: "",
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
                    this.editAlert = 'Profile updated successfully!'
                    this.clearTextBox();
                    // this.getProfile();
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
                this.pictureUrl = "";
            },
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
        },
        created () {
            this.getToken();
        },
    }
</script>

<style scoped>
.v-form{
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
</style>