<template>
    <div>
        <div>
            <v-form>
                <v-container>
                    <p>Add To Menu</p>
                    <v-row>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="name"
                            label="Item Name"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="description"
                            label="Description"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="price"
                            label="Price"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="imageUrl"
                            label="Image Url"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                outlined
                elevation="2"
                @click="addMenuItem"
                >Submit</v-btn>
                <p class="error" v-if="message">{{ message }}</p>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RestaurantAddMenu",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                restaurantId: "",
                message: "",
                name: "",
                description: "",
                price: "",
                imageUrl: "",
                menuId: null,
            }
        },
        methods: {
            addMenuItem() {
                axios.request({
                    url: this.apiUrl+"menu",
                    method: "POST",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                    data: {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        imageUrl: this.imageUrl,
                    }
                }).then(()=>{
                    this.message = "Successfully added to menu!";
                    this.$root.$emit(`reloadMenu`, `reload`);
                    this.clearTextBox();
                }).catch((error)=>{
                    this.clearTextBox();
                    this.message = error;
                    this.message = "Something went wrong, please try again."
                })
            },
            getRestaurantId(){
                // grabbing restaurantId from cookie, putting it into variable
                this.restaurantId = cookies.get(`restaurantId`);
                this.token = cookies.get(`sessionToken`);
            },
            clearTextBox(){
                this.name = "";
                this.description = "";
                this.price = "";
                this.imageUrl = "";
                this.menuId = "";
            }
        },
        created () {
            this.getRestaurantId();
        },
    }
</script>

<style scoped>
.v-form{
    text-align: center;
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
}
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
}
p{
    color: black;
    font-weight: bold;
    font-size: 16pt;
    text-align: start;
}
.error{
    color: white;
    font-weight: bold;
    font-size: 10pt;
    margin-top: 5px;
}
</style>