<template>
    <div>
        <div class="formContainer">
            <v-form>
                <v-container>
                    <!-- <p>Log In</p> -->
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
                            :rules="passwordRules"
                            label="Password"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="clientLogin"
                outlined
                >Submit</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
// import router from '@/router';

    export default {
        name: "ClientLogin",
        data() {
            return {
                valid: false,
                email: "",
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                loginError: "",
            }
        },
        methods: {
            clientLogin() {
                axios.request({
                    url: "https://foodierest.ml/api/client-login",
                    method: "POST",
                    data: {
                        // LEFT OFFF HERE
                        firstname: this.firstname.value,
                        lastname: this.lastname.value,
                        email: this.email.value,
                    }
                }).then((response)=>{
                    // router.push("/homepage");
                    cookies.set(`sessionToken`, response.data.token);
                }).catch((error)=>{
                    this.loginError = error;
                    this.loginError = "Incorrect Email or Password"
                })
            }
        },
    }
</script>

<style scoped>
/* .formContainer{
    background-image: url(../assets/foodbackground.png);
    background-repeat:repeat;
    background-size: cover;
} */
.v-form{
    color: white;
    text-align: center;
    background-color: whitesmoke;
    padding: 25px;
    margin: 25px;
    position: absolute;
    width: 30%;
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
    font-weight: bold;
    font-size: 18pt;
}
</style>