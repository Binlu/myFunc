<template>
    <section>
        第一页
        <p>{{count}}</p>
        <button @click="setCount">操作</button>
        <router-view></router-view>
        
    </section>
    
    
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "frist",
    data() {
        return {
            msg: "我是第一页的数据",
        };
    },
    computed:{
        ...mapState(['count']),
        
    },
    methods:{
        setCount(){
            this.$store.state.count+=2;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
