<template>
    <div>
        <v-form>
            <v-row>
                <v-col
                cols="12"
                md="6"
                >
                    <v-text-field
                    v-model="menuId"
                    label="Menu Id"
                    required
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-btn
                    outlined
                    elevation="2"
                    @click="deleteMenuItem"
                    >
                    Remove Menu Item
                    </v-btn>
                    <p class="error" v-if="message">{{ message }}</p>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RestaurantMenuDelete",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                menuId: null,
                message: "",
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            deleteMenuItem(){
                axios.request({
                    url: this.apiUrl+"menu",
                    method: "DELETE",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                    data: {
                        menuId: this.menuId,
                    }
                }).then(()=>{
                    this.message = "Successfully removed item."
                    this.$root.$emit(`reloadMenu`, `reload`);
                    this.menuId = "";
                }).catch((error)=>{
                    this.message = error;
                    this.message = "Something went wrong, please try again."
                    this.menuId = "";
                })
            },
        },
        created () {
            this.getToken();
        },
    }
</script>

<style scoped>
.v-form{
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 75%
}
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
}
</style>