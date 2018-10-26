<template>
	<section>
		<h3>{{$route.query.name}}</h3>
		<p>{{$route.query.id}}</p>
		
	</section>
</template>

<script>
	import Axios from 'axios'
	export default {
		name:'detail',
		data(){
			return {
				data:{},
			}
		},

		mounted:function(){
            console.log(this.$route)
		},
		watch:{												//监听
			$route (to,form){
				let id=to.query.id;
				let name=to.query.name;

				this.data={
					id:id,
					name:name
				};
			}
		},
		methods:{
			
		}
	}
</script>



<style scoped lang="less" src="../../static/less/detail/test.less">
</style>
