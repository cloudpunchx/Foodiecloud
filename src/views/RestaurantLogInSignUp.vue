<template>
    <div>
        <PageHeader/>

        <!-- Router link to Client Login/Sign Up Page -->
        <router-link to="/login"
        ><v-btn
        class="clientLink"
        elevation="2"
        outlined>
            Customer Log In
        </v-btn></router-link>

        <div>
            <v-btn
            elevation="2"
            @click="toggleLogInSignUp"
            outlined
            >{{ buttonText }}</v-btn>
            <RestaurantLogin/>
        </div>

        <div v-if="signUp">
            <RestaurantSignUp/>
        </div>

        <PageFooter/>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import RestaurantLogin from '@/components/RestaurantLogin.vue'
import RestaurantSignUp from '@/components/RestaurantSignUp.vue'
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "RestaurantLogInSignUp",
        components: {
            PageHeader,
            RestaurantLogin,
            RestaurantSignUp,
            PageFooter
        },
        data() {
            return {
                buttonText: "Restaurant Sign Up",
                signUp: false
            }
        },
        methods: {
            // this function flips my text from Log In to Sign Up on button click
            toggleLogInSignUp() {
                this.signUp = !this.signUp;
                this.buttonText = this.signUp ? "Restaurant Log In" : "Restaurant Sign Up";
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
.clientLink{
    top: 5%;
    left: 90%;
}
</style>