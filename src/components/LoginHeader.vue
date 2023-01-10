<template>
    <div>
        <img class="logo" src="../assets/foodiecloudlogo.png" alt="Foodiecloud Logo">
        
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
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.255), rgba(239, 237, 237, 0.101)), 
                    url(../assets/topviewtable.jpg);
    background-size: cover;
    height: 80vh;
    display: grid;
    justify-items: start;
}
.logo{
    width: 40vh;
    margin: 35px;
}
.phrase{
    width: 25vw;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translateX(-50%);
}
</style>