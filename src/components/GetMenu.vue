<template>
    <div>

        <div>
            <v-form>
                <v-container>
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
                text
                @click="editMenuItem"
                >Submit</v-btn>
                <p class="error" v-if="message">{{ message }}</p>
            </v-form>
        </div>

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

    export default {
        name: "GetMenu",
        data() {
            return {
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
            getMenu() {
                axios.request({
                    url: "https://foodierest.ml/api/menu",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
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
            getRestaurantId(){
                this.restaurantId = cookies.get(`restaurantId`);
                this.token = cookies.get(`sessionToken`);
            },
            editMenuItem() {
                axios.request({
                    url: "https://foodierest.ml/api/menu",
                    method: "PATCH",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
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
        },
    }
</script>

<style scoped>
.menuContainer{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
}
.v-card{
    color: black;
    background-color: white;
    text-align: center;
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%
}
img{
    width: 10vw;
}
</style>