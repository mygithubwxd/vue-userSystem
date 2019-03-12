<template>
  <div class="add container">
		<!-- 父组件通过自定义属性向子组件传值 -->
  	<Alert v-if="alert" v-bind:message="alert"></Alert>
    <h1 class="page-header">添加用户</h1>
		<!-- 表单 -->
    <form v-on:submit="addCustomer($event)">
    	<div class="well">
    		<h4>用户信息</h4>
    		<div class="form-group">
    			<label>姓名</label>
					<!-- v-model数据的双向绑定 -->
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
				<!-- 添加提交按钮按钮，这里会触发提交的方法-->
				<!-- 在调用方法时，参数中可以传入一个 $event 特殊变量，在methods方法中我们就可以访问原生事件对象event。 -->
    		<button type="submit" class="btn btn-primary">添加</button>
    	</div>
    </form>
  </div>
</template>

<script>
// 引入组件
import Alert from './Alert'
export default {
  name: 'add',
  data () {
    return {
      customer:{}, //v-model绑定的值
      alert:""
    }
  },
  methods:{
  	addCustomer(e){
  		if (!this.customer.name || !this.customer.phone || !this.customer.email) {
  			// 这些数据不能为空，只要有一个为空就弹出提示框
				this.alert = "请添加对应的信息!";
  		}else{
				//将添加的所有信息存储到一个对象中
  			let newCustomer = {
  				name:this.customer.name,
  				phone:this.customer.phone,
  				email:this.customer.email,
  				education:this.customer.education,
  				graduationschool:this.customer.graduationschool,
  				profession:this.customer.profession,
  				profile:this.customer.profile
  			}
				//向搭建的本地数据接口传数据
				//该数据接口支持数据的增删改查
				//方法返回一个promise对象
  			this.$http.post("http://localhost:3000/users/",newCustomer)
  				.then(function(response){
						// 成功添加数据之后，调用方法，自动跳转到主页中，并给主页传参
						// 1.go 跳转到上一次浏览的页面
            // this.$router.go(-1) 
            // 2.replace 指定跳转的具体地址，该方法不会向history中添加一条历史记录
            // this.$router.replace("/menu")
            // replace指定跳转的路由的名字
            // this.$router.replace({name:"menuLink"})
            // 3.push 指定跳转的具体地址，该方法会向history中添加一条历史记录
            // this.$router.push("/menu")
  					this.$router.push({path:"/",query:{alert:"用户信息添加成功!"}});   //可以传参数
  				})
  			e.preventDefault();//阻止默认事件
  		}
  		e.preventDefault();//阻止默认事件
  	}
  },
  components:{    //注册引入的组件
  	Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>