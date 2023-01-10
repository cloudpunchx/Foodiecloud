<template>
    <div>
        <LoginHeader/>

        <ClientLogin/>

        <!-- Router link to Restaurant Login/Sign Up Page -->
        <router-link to="/restaurant/login"
        ><v-btn
        class="restaurantLink"
        elevation="2"
        outlined>
            Restaurant Log In
        </v-btn></router-link>

        <PageFooter/>
    </div>
</template>

<script>
import LoginHeader from '@/components/LoginHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import ClientLogin from '@/components/ClientLogin.vue'

    export default {
        name: "ClientLogInSignUp",
        components: {
            LoginHeader,
            ClientLogin,
            PageFooter
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