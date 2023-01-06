<template>
    <div>

        <!-- LEFT OFF WORKING WITH DRAWER AND TOOLBAR -->
        <v-app-bar width="100%" flat app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <p>hi</p>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn>
                <span>Sign Out</span>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app class="white">
            <p>test</p>
        </v-navigation-drawer>

                <!-- Logo is also a link to discover page. -->
        <router-link to="/discover">
            <img class="logo" src="../assets/foodiecloudlogo.png" alt="Foodiecloud Logo">
        </router-link>

        <!-- <LogOutButton/> -->
    </div>
</template>

<script>
// import LogOutButton from '@/components/LogOutButton.vue';

    export default {
        name: "ClientHeader",
        components: {
            // LogOutButton
        },
        data() {
            return {
                drawer: false,
                group: null,
            }
        },
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