<!-- 编辑页面和添加页面类似 -->

<template>
  <div class="edit container">
		<!-- 弹窗提示 v-if根据表达式的值是true/false决定是否显示，注意和v-show指令的区别-->
    <Alert v-if="alert" v-bind:message="alert"></Alert>

    <h1 class="page-header">编辑用户</h1>
    <form v-on:submit="updateCustomer">
    	<div class="well">
    		<h4>用户信息</h4>
    		<div class="form-group">
    			<label>姓名</label>
    			<input type="text" class="form-control" placeholder="name" v-model="customer.name">
    		</div>
    		<div class="form-group">
    			<label>电话</label>
    			<input type="text" class="form-control" placeholder="phone" v-model="customer.phone">
    		</div>
    		<div class="form-group">
    			<label>邮箱</label>
    			<input type="text" class="form-control" placeholder="email" v-model="customer.email">
    		</div>
    		<div class="form-group">
    			<label>学历</label>
    			<input type="text" class="form-control" placeholder="education" v-model="customer.education">
    		</div>
    		<div class="form-group">
    			<label>毕业学校</label>
    			<input type="text" class="form-control" placeholder="graduationschool" v-model="customer.graduationschool">
    		</div>
    		<div class="form-group">
    			<label>职业</label>
    			<input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
    		</div>
    		<div class="form-group">
    			<label>个人简介</label>
    			<!-- <input type="text" class="form-control" placeholder="profile" v-model="customer.profile"> -->
    			<textarea class="form-control" rows="10" v-model="customer.profile"></textarea>
    		</div>

				<!-- 更新按钮 -->
    		<button type="submit" class="btn btn-primary">更新</button>
    	</div>
    </form>
  </div>
</template>

<script>

import Alert from './Alert'

export default {
	name: 'add',
	//es6函数简写形式
  data () {
    return {
      customer:{},
      alert:""
    }
  },
  methods:{
    fetchCustomer(id){
        this.$http.get("http://localhost:3000/users/"+id)
            .then(function(response){
              // console.log(response);
              this.customer = response.body;  //存储到data中，展示到页面
            })
    },
  	updateCustomer(e){
  		// console.log(123);
  		if (!this.customer.name || !this.customer.phone || !this.customer.email) {
  			this.alert = "请添加对应的信息!";  //后面的代码不会执行
  		}else{
  			let updateCustomer = {
  				name:this.customer.name,
  				phone:this.customer.phone,
  				email:this.customer.email,
  				education:this.customer.education,
  				graduationschool:this.customer.graduationschool,
  				profession:this.customer.profession,
  				profile:this.customer.profile
				}
				//更新时使用put方法，更新对应id用户的数据
				//Edit组件和Add组件差不多
  			this.$http.put("http://localhost:3000/users/"+this.$route.params.id,updateCustomer)
  				.then(function(response){
						// console.log(response);
						//更新成功之后，跳转到主页
  					this.$router.push({path:"/",query:{alert:"用户信息更新成功!"}});
  				})
  			e.preventDefault();
  		}
  		e.preventDefault();
  	}
	},
	//钩子函数
  created(){
    this.fetchCustomer(this.$route.params.id);  //事先请求数据，展示对应id的编辑页面
  },
  components:{
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
