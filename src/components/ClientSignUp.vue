<!-- Come back to: -->
<!-- 2nd password box to verify entry? -->
<!-- :rules ? -->

<template>
    <div>
        <div class="formContainer">
            <v-form>
                <v-container>
                    <p>Sign Up</p>
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
                            v-model="username"
                            :rules="nameRules"
                            label="Username"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="firstname"
                            :rules="nameRules"
                            label="First Name"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="lastname"
                            :rules="nameRules"
                            label="Last Name"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                        <!-- :rules="passwordRules" do we need? -->
                            <v-text-field
                            v-model="password"
                            label="Password"
                            required
                            ></v-text-field>
                        </v-col>
                        <!-- COME BACK TO THIS LATER, CONFIRM PASSWORD SETTING -->
                        <!-- <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Re-Enter Password"
                            required
                            ></v-text-field>
                        </v-col> -->
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="clientSignUp"
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
        name: "ClientSignUp",
        data() {
            return {
                valid: false,
                email: "",
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                username: "",
                firstname: "",
                lastname: "",
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                password: "",
                signUpError: "",
            }
        },
        methods: {
            clientSignUp() {
                axios.request({
                    url: "https://foodierest.ml/api/client",
                    method: "POST",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    data: {
                        email: this.email,
                        username: this.username,
                        firstName: this.firstname,
                        lastName: this.lastname,
                        password: this.password,
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
                    this.signUpError = "Something went wrong, try again."
                    // clear text boxes after failure so user can re-enter information
                    this.email = "";
                    this.username = "";
                    this.firstname = "";
                    this.lastname = "";
                    this.password = "";
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