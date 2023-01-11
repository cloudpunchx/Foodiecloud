<template>
    <div>
        <PageHeader/>

        <div class="formContainer" v-if="restaurantId">
            <v-form>
                <v-card-title>Confirm Order | Complete Order</v-card-title>
                <v-row>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="orderId"
                        label="Order Id"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn
                        outlined
                        elevation="2"
                        @click="confirmOrder"
                        >
                        Confirm Order
                        </v-btn>
                        <v-btn
                        outlined
                        elevation="2"
                        @click="completeOrder"
                        >
                        Complete Order
                        </v-btn>
                        <p v-if="message">{{ message }}</p>
                    </v-col>
                </v-row>
            </v-form>
        </div>
        <div v-else>
            <v-form>
                <v-card-title>Cancel Your Order</v-card-title>
                <v-row>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="orderId"
                        label="Order Id"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn
                        outlined
                        elevation="2"
                        @click="cancelOrder"
                        >
                        Cancel Order
                        </v-btn>
                        <p v-if="message">{{ message }}</p>
                    </v-col>
                </v-row>
            </v-form>
        </div>

        <div>
            <v-card>
                <v-card-title>Order History</v-card-title>
                <v-card
                outlined
                class="d-flex flex-column justify-center mb-6"
                v-for="order in orders"
                :key="order.orderId"
                >
                    <v-card-text>
                        <v-row
                        align="center"
                        class="mx-0"
                        >
                            <div class="grey--text ms-4">
                                Order Id: {{ order.orderId }}
                            </div>
                        </v-row>
                            <div class="my-4 text-subtitle-1">
                                Items In Order: {{ order.items }}
                            </div>
                            <div class="my-4 text-subtitle-1">
                                Order Created: {{ order.createdAt }}
                            </div>
                        </v-card-text>
                </v-card>
            </v-card>
        </div>

        <PageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';


    export default {
        name: "ViewOrder",
        components: {
            PageHeader,
            PageFooter
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                restaurantId: null,
                orders: [],
                orderId: null,
                message: ""
            }
        },
        methods: {
            getOrders() {
                axios.request({
                    url: this.apiUrl+"order",
                    method: "GET",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                }).then((response)=>{
                    this.orders = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            cancelOrder() {
                axios.request({
                    url: this.apiUrl+"order",
                    method: "PATCH",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                    data: {
                        orderId: this.orderId,
                    }
                }).then(()=>{
                    this.message = "Successfully cancelled order."
                    this.getOrders();
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            confirmOrder() {
                axios.request({
                    url: this.apiUrl+"order",
                    method: "PATCH",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                    data: {
                        orderId: this.orderId,
                    }
                }).then(()=>{
                    this.message = "Successfully confirmed order."
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            completeOrder() {
                axios.request({
                    url: this.apiUrl+"order",
                    method: "PATCH",
                    headers: {
                        'x-api-key': this.apiKey,
                        token: this.token,
                    },
                    data: {
                        orderId: this.orderId,
                    }
                }).then(()=>{
                    this.message = "Successfully completed order."
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            getRestaurantId(){
                // if a restaurant visits the page show different divs with options
                this.restaurantId = cookies.get(`restaurantId`);
            },
        },
        mounted () {
            this.getToken();
            this.getOrders();
            this.getRestaurantId();
        },
    }
</script>

<style scoped>
.v-card{
    width: 70vw;
    left: 50%;
    transform: translateX(-50%);
}
.v-form{
    border: 1px solid black;
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 30%
}
.v-btn{
    position: relative;
    font-size: 12pt;
    color: white;
    background-color: black;
}
</style>