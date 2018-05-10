<template>
	<section>
		<ul class="list">
			<li v-for="item in link_obj"><router-link :to='item'>{{item.query.id}}</router-link></li>
		</ul>
		<router-view></router-view>
	</section>
</template>

<script>
	export default {
		name:'list',
		data(){
			return {
				link_obj:[
					{
						path:'/list/detail',
						query:{
							id:1,
						}
					},
					{
						path:'/list/detail',
						query:{
							id:2,
						}
					}
				]
			}
		}
	}
</script>