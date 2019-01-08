<template>
    <div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
            }
        },
        mounted() {

        },
        methods: {
            deployChange(index) {
                this.deploy.status = index == 2 ? "success" : "process"
                this.deploy.active = index
            },
            useChange(index) {
                this.use.status = index == 2 ? "success" : "process"
                this.use.active = index
            }
        }
    }
</script>