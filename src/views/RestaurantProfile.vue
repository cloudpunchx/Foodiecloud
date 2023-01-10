<template>
    <div>
        <PageHeader/>

        <div>
            <v-card
            class="d-flex flex-column justify-center mb-6"
            >
            <v-app-bar width="100%" flat>
                <v-toolbar-title v-if="openMenu">
                    <p class="title">Edit Your Menu</p>
                </v-toolbar-title>
                <v-toolbar-title v-else>
                    <p class="title">Edit Your Account</p>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                outlined
                text
                @click="viewMenu"
                >
                    {{ buttonText }}
                </v-btn>
            </v-app-bar>
                <div v-if="openMenu">
                    <GetMenu/>
                    <RestaurantAddMenu/>
                </div>
                <div v-else>
                    <v-form
                    v-for="restaurant in restaurant"
                    :key="restaurant.restaurantId"
                    >
                    <v-img
                    height="300"
                    :src="restaurant.bannerUrl"
                    ></v-img>
                        <v-container>
                            <v-row>
                                <v-list-item>
                                    <v-avatar
                                    size="175"
                                    class="profilePicture"
                                    >
                                    <v-img
                                    :src="restaurant.profileUrl"
                                    ></v-img>
                                    </v-avatar>
                                </v-list-item>
                                <v-col class="name">
                                    {{ restaurant.name }}
                                </v-col>
                                <v-col class="email">
                                    {{ restaurant.email }}
                                </v-col>
                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                    :v-model="restaurant.name"
                                    v-model="name"
                                    :label="restaurant.name"
                                    filled
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                    :v-model="restaurant.bio"
                                    v-model="bio"
                                    :label="restaurant.bio"
                                    filled
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                    :v-model="restaurant.address"
                                    v-model="address"
                                    :label="restaurant.address"
                                    filled
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                    :v-model="restaurant.city"
                                    v-model="city"
                                    :label="restaurant.city"
                                    filled
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                    :v-model="restaurant.phoneNum"
                                    v-model="phoneNum"
                                    :label="restaurant.phoneNum"
                                    filled
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                    :v-model="restaurant.bannerUrl"
                                    v-model="bannerUrl"
                                    :label="restaurant.bannerUrl"
                                    filled
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                    :v-model="restaurant.profileUrl"
                                    v-model="profileUrl"
                                    :label="restaurant.profileUrl"
                                    filled
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-btn
                        outlined
                        text
                        @click="editProfile"
                        >Submit</v-btn>
                        <p v-if="editAlert" class="editAlert">{{editAlert}}</p>
                    </v-form>
                </div>
            </v-card>
        </div>

        <InsidePageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

import PageHeader from '@/components/PageHeader.vue';
import GetMenu from '@/components/GetMenu.vue';
import RestaurantAddMenu from '@/components/RestaurantAddMenu.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "RestaurantProfile",
        components: {
            PageHeader,
            RestaurantAddMenu,
            GetMenu,
            InsidePageFooter
        },
        data() {
            return {
                restaurantId: null,
                restaurant: [],
                token: "",
                name: "",
                bannerUrl: "",
                profileUrl: "",
                bio: "",
                address: "",
                city: "",
                email: "",
                phoneNum: "",
                editAlert: "",
                openMenu: false,
                buttonText: "",
            }
        },
        methods: {
            getProfile() {
                axios.request({
                    url: "https://foodierest.ml/api/restaurant",
                    method: "GET",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param
                        restaurantId: this.restaurantId, 
                    }
                }).then((response)=>{
                    this.restaurant = response.data;
                }).catch((error)=>{
                    error = "Something went wrong, please try again."
                    alert(error);
                })
            },
            editProfile(){
                axios.request({
                    url: "https://foodierest.ml/api/restaurant",
                    method: "PATCH",
                    headers: {
                        'x-api-key': '1gE1w3C1NCFGYkoVYBQztYp1Xf5Zq1zk7QOezpMSSC5KL',
                        token: this.token, 
                    },
                    data: {
                        name: this.name,
                        address: this.address,
                        bannerUrl: this.bannerUrl,
                        bio: this.bio,
                        city: this.city,
                        email: this.email,
                        phoneNum: this.phoneNum,
                        profileUrl: this.profileUrl,
                    },
                    params: {
                        // using variable we took from the cookie and using it as a param so we edit this profile
                        restaurantId: this.restaurantId,
                    }
                }).then(()=>{
                    this.editAlert = "Profile updated successfully!"
                    this.clearTextBox();
                    // reload GET info to show updated profile data
                    this.getProfile();
                }).catch((error)=>{
                    this.editAlert = error;
                    this.editAlert = "Something went wrong. Phone Number must contain dashes XXX-XXX-XXXX";
                    this.clearTextBox();
                    // refresh page
                })
            },
            getRestaurantId(){
                // grabbing restaurantId from cookie, putting it into variable
                this.restaurantId = cookies.get(`restaurantId`);
                this.token = cookies.get(`sessionToken`);
            },
            clearTextBox(){
                this.name = "";
                this.address = "";
                this.bio = "";
                this.city = "";
                this.phoneNum = "";
            },
            viewMenu() {
                this.openMenu = !this.openMenu;
                this.buttonText = this.openMenu ? "Edit Account" : "Edit Menu";
            },
        },
        created () {
            this.getRestaurantId();
            this.getProfile();
        },
    }
</script>

<style scoped>
.v-card{
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
.profilePicture{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 15px;
}
.name{
    position: absolute;
    left: 35%;
    font-size: 14pt;
}
.email{
    position: absolute;
    top: 38%;
    left: 35%;
    font-size: 14pt;
}
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
}
</style>