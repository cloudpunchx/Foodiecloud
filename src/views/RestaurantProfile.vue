<template>
    <div>
        <RestaurantHeader/>

        <!-- after this, add the profile urls and test discovery page link to public page -->
        <RestaurantEditInfo/>

        <RestaurantMenu/>

        <RestaurantEditMenu/>

        <!-- GET menu so you can see what you're updating? -->
        <RestaurantAddMenu/>
        <!-- patch menu here -->

        <InsidePageFooter/>
    </div>
</template>

<script>
import RestaurantHeader from '@/components/RestaurantHeader.vue';
import RestaurantMenu from '@/components/RestaurantMenu.vue';
import RestaurantEditInfo from '@/components/RestaurantEditInfo.vue';
import RestaurantAddMenu from '@/components/RestaurantAddMenu.vue';
import RestaurantEditMenu from '@/components/RestaurantEditMenu.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "RestaurantProfile",
        components: {
            RestaurantHeader,
            RestaurantMenu,
            RestaurantEditInfo,
            RestaurantEditMenu,
            RestaurantAddMenu,
            InsidePageFooter
        },
    }
</script>

<style scoped>

</style>