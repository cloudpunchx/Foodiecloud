<template>
    <div>
        <img class="logo" src="../assets/foodiecloudlogo.png" alt="Foodiecloud Logo">

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