<template>
	<header class="page-header" ref="abc">
		<section class="container">
			<div class="navbar navbar-default">
				<ul class="nav nav-pills col-md-4">
					<li role="presentation" v-for="item in nav"><router-link :to='item.src'>{{item.title}}</router-link></li>
				</ul>
				<div class="col-md-4">
					<div class="input-group">
				      	<input type="text" class="form-control" placeholder="Search for...">
				      	<span class="input-group-btn">
				        	<button class="btn btn-default" type="button">Go!</button>
				      	</span>
				    </div>
				</div>
			</div>

		</section>
	</header>
</template>


<script>
	export default {
		name:'header-component',
		data(){
			return {
				nav:[
					{'src':'/home','title':'首页'},
					{'src':'/list','title':'发现'},
					{'src':'/news','title':'动态'},
				]
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/less/common/base.less";
</style>
<style lang="less">
	@import "../../static/less/common/main.less";
</style>
