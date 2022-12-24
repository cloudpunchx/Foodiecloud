<template>
    <div>
        <InsideHeader/>
        <LogOutButton/>

        <!-- add field on the rhs for editing account info -->
        <!-- PATCH to API -->
        <!-- confirm changes and refresh to show updated info -->

        <!-- after this, add the profile urls and test discovery page link to public page -->

        <RestaurantEdit/>

        <InsidePageFooter/>
    </div>
</template>

<script>
import InsideHeader from '@/components/InsideHeader.vue'
import LogOutButton from '@/components/LogOutButton.vue';
import RestaurantEdit from '@/components/RestaurantEdit.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "RestaurantProfile",
        components: {
            InsideHeader,
            LogOutButton,
            RestaurantEdit,
            InsidePageFooter
        },
    }
</script>

<style scoped>

</style>