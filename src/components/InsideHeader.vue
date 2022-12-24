<template>
    <div>
        <img class="logo" src="../assets/foodiecloudNew.png" alt="Foodiecloud Logo">
        <img class="phrase" src="../assets/gotwhatuwant.png" alt="We've got what you want">
    </div>
</template>

<script>
    export default {
        name: "InsideHeader"
    }
</script>

<style scoped>
div{
    /* background-image: linear-gradient(to bottom, rgba(33, 33, 33, 0.436), rgba(67, 66, 66, 0.158)), 
                    url(https://img.freepik.com/free-photo/food-delivery-new-normal-lifestyle-concept_53876-128946.jpg?w=1380&t=st=1671786802~exp=1671787402~hmac=7ea7b4c6e459a1fe7d82fb4d6f1446a992e3cc22507c3a5fa95dd7a44231f7e1);
    background-size: cover;
    background-position: center;
    height: 80vh; */
    display: grid;
    justify-items: start;
}
.logo{
    width: 30vh;
    margin: 40px;
}
.phrase{
    width: 33vw;
    position: absolute;
    top: 8%;
    left: 51%;
    transform: translateX(-50%);
}
</style>