<template>
    <div>
        <v-form>
                <v-container>
                    <p>Edit Menu</p>
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
                @click="editMenuItem"
                outlined
                >Submit</v-btn>
                <p class="error" v-if="message">{{ message }}</p>
            </v-form>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RestaurantEditMenu",
        data() {
            return {
                message: "",
                name: "",
                description: "",
                price: "",
                imageUrl: "",
                menuId: null,
                token: ""
            }
        },
        methods: {
            editMenuItem() {
                axios.request({
                    url: "https://foodierest.ml/api/menu",
                    method: "PATCH",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param

                        // LEFT OFF HERE
                        menuId: this.menuId,
                    },
                    data: {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        imageUrl: this.imageUrl,
                    }
                }).then((response)=>{
                    this.menuId = response.data.menuId;
                    this.message = "Successfully updated menu!";
                    this.clearTextBox();
                }).catch((error)=>{
                    error = "Something went wrong, please try again."
                    this.message = error;
                    this.clearTextBox();
                })
            },
            getToken(){
                // grabbing restaurantId from cookie, putting it into variable
                this.token = cookies.get(`sessionToken`);
            },
            clearTextBox(){
                this.name = "";
                this.description = "";
                this.price = "";
                this.imageUrl = "";
                this.menuId = "";
            }, 
        },
    }
</script>

<style scoped>

</style>