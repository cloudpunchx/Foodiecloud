<template>
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
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="description"
                            label="Description"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="price"
                            label="Price"
                            required
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
                elevation="2"
                @click="addMenuItem"
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
        name: "RestaurantAddMenu",
        data() {
            return {
                token: "",
                restaurantId: "",
                message: "",
                name: "",
                description: "",
                price: "",
                imageUrl: ""
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
            }
        },
        created () {
            this.getRestaurantId();
        },
    }
</script>

<style scoped>
.v-form{
    color: white;
    text-align: center;
    background-color: whitesmoke;
    padding: 25px;
    margin: 25px;
    /* position: absolute;
    width: 40%;
    top: 25%;
    left: 50%;
    transform: translateX(-50%); */
    border: 3px solid black;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
}
.error{
    color: white;
    font-weight: bold;
    font-size: 10pt;
    margin-top: 5px;
}
</style>