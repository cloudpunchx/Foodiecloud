<template>
    <div>
        <PageHeader/>

        <div>
            <v-btn
                elevation="2"
                @click="loginSignUp"
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
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import ClientLogin from '@/components/ClientLogin.vue'
import ClientSignUp from '@/components/ClientSignUp.vue'

    export default {
        name: "ClientLogInSignUp",
        components: {
            PageHeader,
            ClientLogin,
            ClientSignUp,
            PageFooter
        },
        data() {
            return {
                buttonText: "Sign Up",
                signUp: false
            }
        },
        methods: {
            loginSignUp() {
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
</style>