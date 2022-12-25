<template>
    <div>
        <InsideHeader/>
        <RestaurantLogOut/>

        <!-- after this, add the profile urls and test discovery page link to public page -->

        <RestaurantEdit/>

        <InsidePageFooter/>
    </div>
</template>

<script>
import InsideHeader from '@/components/InsideHeader.vue'
import RestaurantLogOut from '@/components/RestaurantLogOut.vue';
import RestaurantEdit from '@/components/RestaurantEdit.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "RestaurantProfile",
        components: {
            InsideHeader,
            RestaurantLogOut,
            RestaurantEdit,
            InsidePageFooter
        },
    }
</script>

<style scoped>

</style>