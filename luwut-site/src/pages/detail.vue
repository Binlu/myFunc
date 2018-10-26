<template>
	<section>
		<h3>{{data.name}}</h3>
		<p>{{data.id}}</p>
		<audio :src="now_music_src" controls="controls" autoplay="true" loop="loop">
		</audio>
	</section>
</template>

<script>
	import Axios from 'axios'
	export default {
		name:'detail',
		data(){
			return {
				data:{},
				now_music_src:''
			}
		},

		mounted:function(){
		},
		watch:{												//监听
			$route (to,form){
				let id=to.query.id;
				let name=to.query.name;

				this.data={
					id:id,
					name:name
				};

				this.getMusicName(id);
			}
		},
		methods:{
			getMusicName:function(id){
				let _this=this;

				Axios.get('/fcg?g_tk=611239124&jsonpCallback=MusicJsonCallback9119786627458644&loginUin=826202369&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&callback=MusicJsonCallback9119786627458644&uin=826202369&songmid='+id+'&filename=C400'+id+'.m4a&guid=1296463848').then(function(response){

					let data=_this.$parent.changeStr(response.data);
					_this.now_music_src='http://dl.stream.qqmusic.qq.com/'+data.data.items[0].filename+'?vkey='+data.data.items[0].vkey+'&guid=1296463848&uin=826202369&fromtag=66';

					_this.$parent.$parent.setDefaultHeight();
				}).catch(function(error){
					console.log(error);
				})
			},
		}
	}
</script>



<style scoped lang="less" src="../../static/less/detail/test.less">
</style>
