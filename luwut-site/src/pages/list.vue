<template>
	<section class="container">
		<div class="col-md-12">
			<input v-on:keyup="searchList" v-model="getlist_obj.keywords" placeholder="歌曲或歌手名">
			<ul class="list">
				<li v-for="item in link_obj"><router-link :to='item'>{{item.query.name}}</router-link>
					<span>{{item.singer}}</span>

				</li>
			</ul>
		</div>

		<div class="col-md-12" id="page-div"></div>

		<router-view></router-view>
	</section>
</template>

<script>
	import Axios from 'axios';

	import 'layui-src/dist/layui';
	import 'layui-src/dist/lay/modules/laypage';
	import 'layui-src/dist/css/layui.css';
	export default {
		name:'list',
		data(){
			return {
				link_obj:[
					
				],
				getlist_obj:{
					keywords:'',
					page:1,
					size:10,
					is_first:true,
				},
				music_data:[],
				
			}
		},
		mounted:function(){
			
		},
		methods:{
			searchList:function(event){
				if(event.type=="keyup" && event.keyCode==13){
					var keywords=this.getlist_obj.keywords;
					this.getDate(this.getlist_obj);
				}
				
			},

			nextPage(){
				this.getlist_obj.page++;
				this.getDate(this.getlist_obj);
			},

			getDate:function(opt){															//获取数据
				let _this=this;
				Axios.get('/api?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61728455447676751&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p='+opt.page+'&n='+opt.size+'&w='+encodeURI(opt.keywords)+'&g_tk=611239124&jsonpCallback=MusicJsonCallback7967698634081082&loginUin=826202369&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0').then(function(response){
					let data=_this.changeStr(response.data);
					_this.music_data=data.data.song.list;


					_this.link_obj=[];
					_this.music_data.forEach(function(item){
						_this.link_obj.push({
							path:'/list/detail',
							singer:item.singer[0].name,
							query:{
								id:item.file.media_mid,
								name:item.name
							}
						})
					});
					
					_this.setPage(data.data.song.totalnum);

					_this.$parent.setDefaultHeight();

				}).catch(function(error){
					console.log(error)
				})
			},
			
			setPage:function(count){														//设置分页
				let _this=this;
				if(_this.getlist_obj.is_first==true){
					_this.getlist_obj.is_first=false;
					layui.use(['laypage'],function(){
						let laypage=layui.laypage;

						//完整功能
						laypage.render({
						    elem: 'page-div'
						    ,count: count
						    ,limit: _this.getlist_obj.size
						    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
						    ,jump: function(obj,first){
						    	
						    	if(!first){
							    	_this.getlist_obj.page=obj.curr;
						    		_this.getDate(_this.getlist_obj);
							    }
						    }
						});
					});
				}
			},
			changeStr:function(str){														//处理数据
				let re=/^.+\({/;
				let re_str=str.match(re)[0];
				str=str.replace(re_str,'{');
				str=str.substr(0,str.length-1);

				return JSON.parse(str);
			}
		}
	}
</script>