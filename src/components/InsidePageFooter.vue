<template>
    <div>
        <img src="../assets/cloudpunchMedia.png" alt="Cloudpunch Media">
        <p>Copyright © 2022 Cloudpunch Media</p>
    </div>
</template>

<script>
    export default {
        name: "InsidePageFooter"
    }
</script>

<style scoped>
div{
    text-align: center;
    background-image: linear-gradient(to bottom, rgba(69, 69, 69, 0.032), rgba(67, 66, 66, 0.317)), 
                    url(https://img.freepik.com/free-photo/food-delivery-new-normal-lifestyle-concept_53876-128946.jpg?w=1380&t=st=1671786802~exp=1671787402~hmac=7ea7b4c6e459a1fe7d82fb4d6f1446a992e3cc22507c3a5fa95dd7a44231f7e1);
    background-size: cover;
    background-position: center;
    height: 70vh;
    padding-top: 30%;
}
img{
    width: 10vw;
}
p{
    font-size: 10pt;
}
</style>