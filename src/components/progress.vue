<template>
    <div v-if="showProgressDialog">
        <el-dialog
                :visible.sync="showProgress"
                width="35%"
                :close-on-press-escape="false"
                :show-close="false"
                center
        >
            <span>{{fileName}}</span>
            <el-progress
                    :stroke-width="20"
                    :color="customColor"
                    :text-inside="true"
                    :percentage="progressing"
                    class="e-pr"
            />
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['progressing','showProgressDialog','fileName'],
        data() {
            return {
                showProgress: true,
                customColor: '#409eff'
            };
        }
    }
</script>

<style scoped>
    .e-pr{
        width: 100%;
        top: 20%
    }
</style>
