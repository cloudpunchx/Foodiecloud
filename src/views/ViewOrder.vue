<template>
    <div>
        <PageHeader/>

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
                token: "",
                orders: []
            }
        },
        methods: {
            getOrders() {
                axios.request({
                    url: "https://foodierest.ml/api/order",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token,
                    },
                }).then((response)=>{
                    this.orders = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again.";
                    alert(error);
                })
            },
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted () {
            this.getToken();
            this.getOrders();
        },
    }
</script>

<style scoped>
.v-card{
    width: 70vw;
    left: 50%;
    transform: translateX(-50%);
}
</style>