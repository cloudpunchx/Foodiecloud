<template>
    <div>
        <div>
            <v-form>
                <v-container>
                    <p>Edit Existing Items</p>
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
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="menuId"
                            label="Menu Id - Required"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                outlined
                elevation="2"
                @click="editMenuItem"
                >Submit</v-btn>
                <p class="error" v-if="message">{{ message }}</p>
            </v-form>
            <RestaurantMenuDelete/>
        </div>

        <v-divider
        inset
        ></v-divider>

    <div class="menuContainer">
        <v-card
                outlined
                tile
                class="d-flex flex-column justify-center mb-6"
                v-for="item in menu"
                :key="item.menuId"
                >
                <v-card-title>{{item.name}}</v-card-title>
                <v-img
                width="15vw"
                :src="item.imageUrl"
                ></v-img>
            <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <div>
                        Menu Id: {{item.menuId}}
                    </div>
                </v-row>

                <div>
                    ${{ item.price }} 
                </div>

                <div>Item Description: {{item.description}}</div>
            </v-card-text>
        </v-card>
    </div>
</div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import RestaurantMenuDelete from '@/components/RestaurantMenuDelete.vue';

    export default {
        name: "GetMenu",
        components: {
            RestaurantMenuDelete
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                restaurantId: null,
                restaurant: [],
                menuId: null,
                menu: [],
                name: "",
                message: "",
                description: "",
                price: null,
                imageUrl: "",
            }
        },
        methods: {
            getRestaurantId(){
                this.restaurantId = cookies.get(`restaurantId`);
                this.token = cookies.get(`sessionToken`);
            },
            getMenu() {
                axios.request({
                    url: this.apiUrl+"menu",
                    method: "GET",
                    headers: {
                        'x-api-key': this.apiKey
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param
                        restaurantId: this.restaurantId,
                        menuId: this.menuId,
                    }
                }).then((response)=>{
                    this.menu = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            editMenuItem() {
                axios.request({
                    url: this.apiUrl+"menu",
                    method: "PATCH",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                    data: {
                        menuId: this.menuId,
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        imageUrl: this.imageUrl,
                    }
                }).then((response)=>{
                    this.menuId = response.data.menuId;
                    // it would be nice to have this refresh to see updated menu
                    this.message = "Successfully updated menu!";
                    this.getMenu();
                    this.clearTextBox();
                }).catch((error)=>{
                    error = "Something went wrong, please try again."
                    this.message = error;
                    this.clearTextBox();
                })
            },
            clearTextBox(){
                this.name = "";
                this.description = "";
                this.price = "";
                this.imageUrl = "";
                this.menuId = "";
            }, 
        },
        mounted () {
            this.getRestaurantId();
            this.getMenu();
            this.$root.$on(`reloadMenu`, this.getMenu);
        },
    }
</script>

<style scoped>
.menuContainer{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
}
.v-form{
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 75%
}
.v-card{
    width: 100%;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
img{
    width: 10vw;
}
p{
    color: black;
    font-weight: bold;
    font-size: 16pt;
    text-align: start;
}
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
}
</style>