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

        <PageFooter/>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "RestaurantLogInSignUp",
        components: {
            PageHeader,
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
.clientLink{
    top: 5%;
    left: 90%;
}
</style>