<template>
    <div>
        <PageHeader/>
        <ClientLogin/>
        <ClientSignUp/>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import ClientLogin from '@/components/ClientLogin.vue'
import ClientSignUp from '@/components/ClientSignUp.vue'

    export default {
        name: "ClientLogInSignUp",
        components: {
            PageHeader,
            ClientLogin,
            ClientSignUp
        },
    }
</script>

<style scoped>

</style>