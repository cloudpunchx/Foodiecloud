<template>
    <div>
        <img class="logo" src="../assets/foodiecloud1.png" alt="Foodiecloud Logo">
        <img class="phrase" src="../assets/foodiecloud2.png" alt="Foodiecloud phrase">
    </div>
</template>

<script>
    export default {
        name: "PageHeader"
    }
</script>

<style scoped>
div{
    /* background-image: linear-gradient(to bottom, rgba(135, 135, 135, 0.238), rgba(135, 135, 135, 0.158)),
                        url(../assets/giorgio-trovato-H8X-2bchJI8-unsplash.jpg);
    background-size: cover; */
    background-image: linear-gradient(#F3E8EE, #F3E8EE, white);
    display: grid;
    justify-items: center;
}
.logo{
    height: 30vh;
}
.phrase{
    width: 15vw;
    position: relative;
    top: -50%;
    left: 2%;
}
</style>