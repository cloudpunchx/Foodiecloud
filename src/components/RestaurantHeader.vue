<template>
    <div>

        <!-- change this link to the restaurant public page -->
        <router-link to="/restaurant">
            <img class="logo" src="../assets/foodiecloudlogo.png" alt="Foodiecloud Logo">
        </router-link>

        <RestaurantLogOut/>
    </div>
</template>

<script>
import RestaurantLogOut from '@/components/RestaurantLogOut.vue';

    export default {
        name: "RestaurantHeader",
        components: {
            RestaurantLogOut
        }
    }
</script>

<style scoped>
div{
    display: grid;
    justify-items: start;
}
.logo{
    width: 30vh;
    margin: 40px;
}

</style>