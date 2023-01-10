<template>
    <div>
        <v-card
        class="d-flex flex-column justify-center mb-6"
        >
            <v-app-bar width="100%" flat>
                <v-toolbar-title>
                    <p v-if="signUp" class="title">Sign Up | Restaurant</p>
                    <p v-else class="title">Log In | Restaurant</p>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                    outlined
                    text
                    @click="toggleLogInSignUp"
                    >
                        {{ buttonText }}
                    </v-btn>
            </v-app-bar>

            <v-form v-if="signUp">
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="name"
                            label="Restaurant Name"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="address"
                            label="Address"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="bio"
                            label="Bio"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="city"
                            label="City"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-Mail"
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
                            v-model="phoneNum"
                            label="Phone Number"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="restaurantSignUp"
                outlined
                >Submit</v-btn>
                <p class="error" v-if="signUpError">{{ signUpError }}</p>
            </v-form>

            <v-form v-else>
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="password"
                            type="password"
                            label="Password"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="restaurantLogin"
                outlined
                >Submit</v-btn>
                <p class="error" v-if="loginError">{{ loginError }}</p>
            </v-form>
        </v-card>

    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "RestaurantLogin",
        data() {
            return {
                valid: false,
                name: "",
                address: "",
                bio: "",
                city: "",
                email: "",
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                password: "",
                phoneNum: "",
                loginError: "",
                buttonText: "Sign Up",
                signUp: false,
                signUpError: "",
            }
        },
        methods: {
            restaurantLogin() {
                axios.request({
                    url: "https://foodierest.ml/api/restaurant-login",
                    method: "POST",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                }).then((response)=>{
                    // send to Restaurant Profile page after successful login
                    router.push("/restaurant/settings/account");
                    // set Session Token cookie after successful login
                    cookies.set(`sessionToken`, response.data.token);
                    cookies.set(`restaurantId`, response.data.restaurantId);
                }).catch((error)=>{
                    this.loginError = error;
                    this.loginError = "Incorrect Email or Password"
                    this.clearTextBox();
                })
            },
            restaurantSignUp() {
                axios.request({
                    url: "https://foodierest.ml/api/restaurant",
                    method: "POST",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    data: {
                        name: this.name,
                        address: this.address,
                        bio: this.bio,
                        city: this.city,
                        email: this.email,
                        password: this.password,
                        phoneNum: this.phoneNum,
                    },
                }).then((response)=>{
                    router.push("/restaurant/settings/account");
                    cookies.set(`sessionToken`, response.data.token);
                    cookies.set(`restaurantId`, response.data.restaurantId);
                }).catch((error)=>{
                    this.signUpError = error;
                    this.signUpError = "Phone Number must contain dashes XXX-XXX-XXXX"
                })
            },
            toggleLogInSignUp() {
                this.signUp = !this.signUp;
                this.buttonText = this.signUp ? "Log In" : "Sign Up";
            },
            clearTextBox(){
                this.name = "";
                this.address = "";
                this.bio = "";
                this.city = "";
                this.email = "";
                this.password = "";
                this.phoneNum = "";
            }
        },
    }
</script>

<style scoped>
.v-card{
    text-align: center;
    background-color: whitesmoke;
    padding: 25px;
    position: absolute;
    width: 40%;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid black;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
}
p{
    color: black;
    font-size: 16pt;
    font-weight: bold;
}
.error{
    color: white;
    font-weight: bold;
    font-size: 10pt;
    margin-top: 5px;
}
</style>