<!-- work on errors better -->
<!-- need to format and design -->

<template>
    <div> 
        <!-- this div will be GET -->
        <div>
            <v-card
            outlined
            tile
            class="d-flex flex-column justify-center mb-6"
            v-for="restaurant in restaurant"
            :key="restaurant.restaurantId"
            cols="3"
            sm="3"
            >
            <h2>Welcome {{ restaurant.name }}!</h2>
            <img :src="restaurant.bannerUrl">
            <p>Bio: {{restaurant.bio}}</p>
            <p>
                Address: {{restaurant.address}},
                {{restaurant.city}}
            </p>
            <p>E-mail: {{restaurant.email}}</p>
            <p>Ph #: {{restaurant.phoneNum}}</p>
            </v-card>
        </div>

        <!-- this div will be PATCH -->
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
                            label="Restaurant Name"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="address"
                            label="Address"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="bannerUrl"
                            label="Banner Image Url"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="bio"
                            label="Bio"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="city"
                            label="City"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="phoneNum"
                            label="Phone Number"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="profileUrl"
                            label="Profile Image Url"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                elevation="2"
                @click="editProfile"
                outlined
                >Submit</v-btn>
                <p v-if="editAlert" class="editAlert">{{editAlert}}</p>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RestaurantEditInfo",
        data() {
            return {
                restaurantId: null,
                restaurant: [],
                valid: false,
                token: "",
                name: "",
                address: "",
                bannerUrl: "",
                bio: "",
                city: "",
                phoneNum: "",
                profileUrl: "",
                editAlert: "",
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
            }
        },
        created () {
            // when you get to this page, run these functions
            this.getRestaurantId();
            this.getProfile();
        },
    }
</script>

<style scoped>
.v-card, .v-form{
    color: black;
    background-color: white;
    text-align: center;
    padding: 15px;
    margin: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
    border: 3px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
    width: 25%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 50px;
}
.editAlert{
    color: rgb(124, 0, 0);
    font-weight: bold;
    font-size: 10pt;
}
h2{
    margin-bottom: 10px;
}
img{
    width: 20vw;
}
</style>