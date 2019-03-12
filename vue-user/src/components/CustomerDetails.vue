<template>
  <div class="details container">
		<!-- 返回按钮 -->
  	<router-link to="/" class="btn btn-default">返回</router-link>
    <h1 class="page-header">
    	{{customer.name}}

    	<span class="pull-right">

				<!-- 编辑按钮 -->
				<!-- 路由到编辑对应id的详情页-->
        <!-- 使用v-bind指令 绑定属性to，这样属性值可以是一个表达式 ，单纯的使用to，属性值只能是一个字符串-->
    		<router-link class="btn btn-primary" v-bind:to="'/edit/'+customer.id">编辑</router-link>

				<!-- 删除按钮 绑定点击事件 删除本详情页，删除的是数据库中的数据-->
    		<button class="btn btn-danger" v-on:click="deleteCustomer(customer.id)">删除</button>

    	</span>

    </h1>
    <ul class="list-group">
    	<li class="list-group-item">
				<!-- 图标 -->
    		<span class="glyphicon glyphicon-asterisk">  
    			{{customer.phone}}
    		</span>
    	</li>
    	<li class="list-group-item">
    		<span class="glyphicon glyphicon-plus"> 
    			{{customer.email}}
    		</span>
    	</li>
    </ul>

    <ul class="list-group">
    	<li class="list-group-item">
    		<span class="glyphicon glyphicon-asterisk">
    			{{customer.education}}
    		</span>
    	</li>
    	<li class="list-group-item">
    		<span class="glyphicon glyphicon-plus"> 
    			{{customer.graduationschool}}
    		</span>
    	</li>

		<li class="list-group-item">
			<span class="glyphicon glyphicon-asterisk"> 
				{{customer.profession}}
			</span>
		</li>
		<li class="list-group-item">
			<span class="glyphicon glyphicon-plus"> 
				{{customer.profile}}
			</span>
		</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'cumstomerdetails',
  data () {
    return {
      customer:""  //（用户详情数据）数据customer中含有id值
    }
  },
  methods:{
		//根据获取到的id值，发送请求获取对应id的数据
  	fetchCustomers(id){
      this.$http.get("http://localhost:3000/users/"+id)   //json-server搭建本地服务器的接口就是这么设计的（查看README文件）
          .then(function(response){
            // console.log(response);
            this.customer = response.body;  //将请求数据存储到data中
          })
		},
		//删除对应id的数据
    deleteCustomer(id){
    	this.$http.delete("http://localhost:3000/users/"+id)  //删除数据库中的数据
    		.then(function(response){
    			this.$router.push({path:"/",query:{alert:"用户删除成功!"}});  //主动跳转到主页，并传参
    		})
    }
	},

	//钩子函数，获取路由到此详情页时绑定的id值，在页面展示前，先获取到数据
	//这个阶段可用于获取路由参数并进行网络请求数据，初始化data数据
  created(){
  	this.fetchCustomers(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
