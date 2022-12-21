<template>
    <div>
        <div class="formContainer">
            <v-form>
                <v-container>
                    <p>Log In</p>
                    <v-row>
                        <v-col
                        cols="12"
                        md="4"
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
                        md="4"
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
                        md="4"
                        >
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="clientLogin"
                >Submit</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

    export default {
        name: "ClientLogin",
        data() {
            return {
                valid: false,
                firstname: "",
                lastname: "",
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                email: "",
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
            }
        },
        methods: {
            clientLogin() {
                axios.request({
                    url: "https://foodierest.ml/api/client-login",
                    method: "POST",
                    data: {
                        // LEFT OFFF HERE
                        firstname: this.firstname,
                        lastname: this.lastname,
                        email: this.email,
                    }
                })
            }
        },
    }
</script>

<style scoped>
.formContainer{
    background-image: url(../assets/foodbackground.png);
    background-repeat:repeat;
}
.v-form{
    background-color: #F3E8EE;
    padding: 25px;
    margin: 25px;
    position: relative;
    width: 30%;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid black;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.v-btn{
    font-size: 12pt;
    width: 25%;
    left: 37%;
}
p{
    font-weight: bold;
    font-size: 18pt;
}
</style>