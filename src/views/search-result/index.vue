<template>
    <div>
        搜索结果
    </div>
</template>

<script>
export default {
    props: ['q'],
    created () {
        console.log(this.q);
    }
};
</script>

<style>

</style>
