<template>
    <div>
        <!-- logo is a link to discover page -->
        <router-link to="/discover">
            <img class="logo" src="../assets/foodiecloudlogo.png" alt="Foodiecloud Logo">
        </router-link>

        <LogOutButton/>
    </div>
</template>

<script>
import LogOutButton from '@/components/LogOutButton.vue';

    export default {
        name: "ClientHeader",
        components: {
            LogOutButton
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