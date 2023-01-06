<template>
    <div>

        <v-toolbar width="100%" flat app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <p>hi</p>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn>
                <span>Sign Out</span>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="white">
            <p>test</p>
        </v-navigation-drawer>

        <!-- hhhhhhhhhhhhhhh -->
        

        <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-navigation-drawer
        app
        v-model="drawer"
        absolute
        temporary
        >
            <v-list
            nav
            dense
            >
                <v-list-item-group
                v-model="group"
                >
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer> -->


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