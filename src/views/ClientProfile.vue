<template>
    <div>
        <ClientHeader/>

        <ClientEdit/>

        <ClientDelete/>

        <InsidePageFooter/>
    </div>
</template>

<script>
import ClientHeader from '@/components/ClientHeader.vue'
import ClientEdit from '@/components/ClientEdit.vue';
import ClientDelete from '@/components/ClientDelete.vue';
import InsidePageFooter from '@/components/InsidePageFooter.vue';

    export default {
        name: "ClientProfile",
        components: {
            ClientHeader,
            ClientEdit,
            ClientDelete,
            InsidePageFooter
        }
    }
</script>

<style scoped>

</style>