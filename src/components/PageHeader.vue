<template>
    <div>
        <img class="logo" src="../assets/foodiecloudNew.png" alt="Foodiecloud Logo">
        <img class="phrase" src="../assets/foodiecloudPhrase.png" alt="Foodiecloud phrase">
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
                        url(../assets/giorgio-trovato-H8X-2bchJI8-unsplash.jpg); */
    background-image: linear-gradient(to bottom, rgba(33, 33, 33, 0.436), rgba(67, 66, 66, 0.158)), 
                    url(../assets/topviewtable.jpg);
    background-size: cover;
    height: 80vh;
    display: grid;
    justify-items: start;
}
.logo{
    width: 15vh;
    margin: 40px;
}
.phrase{
    width: 25vw;
    position: absolute;
    left: 51.5%;
    top: 16%;
    transform: translateX(-50%);
}
</style>