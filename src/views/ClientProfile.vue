<template>
    <div>
        <InsideHeader/>
        <LogOutButton/>

        <ClientEdit/>

        <InsidePageFooter/>
    </div>
</template>

<script>
import InsideHeader from '@/components/InsideHeader.vue'
import LogOutButton from '@/components/LogOutButton.vue';
import ClientEdit from '@/components/ClientEdit.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "ClientProfile",
        components: {
            InsideHeader,
            LogOutButton,
            ClientEdit,
            InsidePageFooter
        }
    }
</script>

<style scoped>

</style>