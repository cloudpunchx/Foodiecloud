<!-- LEAVING OFF WITH PUTTING IN 1 TEXT BOX TO ENTER MENU ID THEN DELETE BUTTON CLICK -->

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
                elevation="2"
                @click="addMenuItem"
                outlined
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
                    url: "https://foodierest.ml/api/menu",
                    method: "POST",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
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
                    this.clearTextBox();
                }).catch((error)=>{
                    this.clearTextBox();
                    this.message = error;
                    this.message = "Something went wrong, please try again."
                })
            },
            deleteMenuItem(){
                axios.request({
                    url: "https://foodierest.ml/api/menu",
                    method: "DELETE",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    data: {
                        menuId: this.menuId,
                    }
                }).then(()=>{
                    // it would be nice to have this refresh to see updated menu
                    this.message = "Successfully deleted item";
                    this.getMenu();
                    // this.clearTextBox();
                }).catch((error)=>{
                    error = "Something went wrong, please try again."
                    this.message = error;
                    this.clearTextBox();
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
    color: black;
    background-color: white;
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