<template>
    <div>
        <p @click="logOut">Log Out</p>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "LogOutButton",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
            }
        },
        methods: {
            logOut() {
                axios.request({
                    url: this.apiUrl+"client-login",
                    method: "DELETE",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: "",
                    },
                }).then(()=>{
                    this.token = cookies.get(`sessionToken`);
                    cookies.remove(`sessionToken`);
                    cookies.remove(`clientId`);
                    cookies.remove(`itemsInCart`);
                    // return to discover page after logout
                    router.push("/client/login");
                }).catch((error)=>{
                    error = "Unexpected error occurred, try again."
                    alert(error)
                })
            }
        },
    }
</script>

<style scoped>
p{
    font-size: 1.5rem;
    cursor: pointer;
}
p:active{
    color: #90caf8;
}
p:visited{
    color: black;
}
</style>