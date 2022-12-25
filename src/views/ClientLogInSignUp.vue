<template>
    <div>
        <LoginHeader/>

        <!-- Router link to Restaurant Login/Sign Up Page -->
        <router-link to="/restaurant/login"
        ><v-btn
        class="restaurantLink"
        elevation="2"
        outlined>
            Restaurant Log In
        </v-btn></router-link>

        <div>
            <v-btn
            elevation="2"
            @click="toggleLogInSignUp"
            outlined
            >{{ buttonText }}</v-btn>
            <ClientLogin/>
        </div>

        <div v-if="signUp">
            <ClientSignUp/>
        </div>

        <PageFooter/>
    </div>
</template>

<script>
import LoginHeader from '@/components/LoginHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import ClientLogin from '@/components/ClientLogin.vue'
import ClientSignUp from '@/components/ClientSignUp.vue'

    export default {
        name: "ClientLogInSignUp",
        components: {
            LoginHeader,
            ClientLogin,
            ClientSignUp,
            PageFooter
        },
        data() {
            return {
                // we need to set the text up to initially say Sign Up, then we have a toggle to change it
                buttonText: "Sign Up",
                signUp: false
            }
        },
        methods: {
            // this function toggles my text from Log In to Sign Up on button click
            toggleLogInSignUp() {
                this.signUp = !this.signUp;
                this.buttonText = this.signUp ? "Log In" : "Sign Up";
            }
        },
    }
</script>

<style scoped>
.v-btn{
    color: white;
    background-color: black;
    position: absolute;
    top: 21.5%;
    left: 51%;
    transform: translateX(-50%);
}
.restaurantLink{
    top: 5%;
    left: 90%;
}
</style>