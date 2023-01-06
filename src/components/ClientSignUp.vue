<template>
    <div>
        <v-card
        class="d-flex flex-column justify-center mb-6"
        >
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
                            v-model="firstName"
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
                            v-model="lastName"
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
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="clientSignUp"
                outlined
                >Submit</v-btn>
                <p class="error" v-if="signUpError">{{ signUpError }}</p>
            </v-form>
        </v-card>

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
                firstName: "",
                lastName: "",
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
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password,
                    },
                }).then((response)=>{
                    router.push("/discover");
                    cookies.set(`sessionToken`, response.data.token);
                    cookies.set(`clientId`, response.data.clientId);
                }).catch((error)=>{
                    this.signUpError = error;
                    this.signUpError = "Something went wrong, try again."
                    this.email = "";
                    this.username = "";
                    this.firstName = "";
                    this.lastName = "";
                    this.password = "";
                })
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