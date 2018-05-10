<template>
	<section>
		<h3>{{data.title}}</h3>
		<p>{{data.content}}</p>
	</section>
</template>

<script>
	export default {
		name:'detail',
		data(){
			return {
				detail_data:{
					'1':{
						title:'我是标题1',
						content:'我是内容1'
					},
					'2':{
						title:'我是标题2',
						content:'我是内容2'
					}
				},
				data:{}
			}
		},
		created : function(){								//创建时检测
			let id=this.$route.query.id;
			this.data=this.detail_data[id];
			console.time("a");
		},
		mounted:function(){
			console.timeEnd("a");
		},
		watch:{												//监听
			$route (to,form){
				let id=to.query.id;
				this.data=this.detail_data[id];
			}
		}
	}
</script>