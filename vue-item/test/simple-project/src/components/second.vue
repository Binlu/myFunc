<template>
    <section>
        第二页
        <p>{{msg}}</p>
    </section>
        
</template>

<script>
export default {
    name: "frist",
    data() {
        return {
            msg: "我是第二页的数据"
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
