
<template>
	<section class="container">
		<div class="col-md-12">
			<ul class="list">
				<li v-for="item in link_obj"><router-link :to='item'>{{item.title}}</router-link>
					

				</li>
			</ul>
		</div>

		<!-- <router-view></router-view> -->
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
					{path:'/news/detail',title:'xxx听了<沧海一声笑>',query:{
                        id:1,
                        name:'沧海一声笑'
                    }}
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
			

		}
	}
</script>