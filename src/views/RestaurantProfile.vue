<template>
    <div>
        <RestaurantHeader/>

        <!-- after this, add the profile urls and test discovery page link to public page -->

        <RestaurantEdit/>

        <InsidePageFooter/>
    </div>
</template>

<script>
import RestaurantHeader from '@/components/RestaurantHeader.vue'
import RestaurantEdit from '@/components/RestaurantEdit.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "RestaurantProfile",
        components: {
            RestaurantHeader,
            RestaurantEdit,
            InsidePageFooter
        },
    }
</script>

<style scoped>

</style>