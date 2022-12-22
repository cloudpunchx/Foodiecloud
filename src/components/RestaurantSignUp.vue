<!-- Come back to: -->
<!-- 2nd password box to verify entry? -->
<!-- :rules ? -->

<!-- how to set phone number rule so dash is mandatory? -->

<template>
    <div>
        <div class="formContainer">
            <v-form>
                <v-container>
                    <p>Restaurant Sign Up</p>
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
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "RestaurantSignUp",
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
                signUpError: "",
            }
        },
        methods: {
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
                    // send to Discover page after successful login
                    router.push("/discover");
                    // set Session Token cookie after successful login
                    cookies.set(`sessionToken`, response.data.token);
                }).catch((error)=>{
                    // let error be this.loginError
                    this.signUpError = error;
                    // then display my text if there is an error
                    this.signUpError = "Phone Number must contain dashes XXX-XXX-XXXX"
                    // clear text boxes after failure so user can re-enter information
                    this.name = "";
                    this.address = "";
                    this.bio = "";
                    this.city = "";
                    this.email = "";
                    this.password = "";
                    this.phoneNum = "";
                })
            }
        },
    }
</script>

<style scoped>
.v-form{
    color: white;
    text-align: center;
    background-color: whitesmoke;
    padding: 25px;
    margin: 25px;
    position: absolute;
    width: 40%;
    top: 25%;
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
    font-weight: bold;
    font-size: 16pt;
}
.error{
    color: white;
    font-weight: bold;
    font-size: 10pt;
    margin-top: 5px;
}
</style>