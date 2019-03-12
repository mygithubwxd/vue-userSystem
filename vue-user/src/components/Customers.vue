<template>
  <div class="customers container">
    <!-- 使用自定义标签（组件） -->
    <!-- props 父组件给子组件传值 -->
    <!-- v-if根据值是true/false决定是否展示，注意和v-show的区别 -->
    <Alert v-if="alert"  v-bind:message="alert"></Alert>
    <h1 class="page-header">用户管理系统</h1>

    <!-- 搜索按钮 -->
    <input type="text" class="form-control" placeholder="搜索" v-model="filterInput">

    <br>

    <!-- 表格 -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- 根据搜索框中输入的内容进行过滤并展示 -->
        <tr v-for="customer in filterBy(customers,filterInput)">
          <td>{{customer.name}}</td>
          <td>{{customer.phone}}</td>
          <td>{{customer.email}}</td>

          <!-- 点击详情按钮跳转详情页 路由绑定id值 -->
          <!-- rest风格的URL -->
          <!-- 使用v-bind指令 绑定属性to，这样属性值可以是一个表达式 ，单纯的使用to，属性值只能是一个字符串-->
          <!-- 路由到的是同一个组件，只是url中的id不一样，组件根据id获取的数据也不一样，显示出来的数据自然也不同 -->
          <td><router-link class="btn btn-default" v-bind:to="'/customerDetail/'+customer.id">详情</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'customers',
  //数据来源：自定义和请求获得数据挂载到data中

  //子组件中必须是data函数，返回定义的数据，不能像根组件那样使用data对象定义数据
  data () {
    return {
      customers:[],
      alert:"",
      filterInput:""  //搜索框中输入的内容
    }
  },
  methods:{
    
    fetchCustomers(){
      // 使用vue-resource网络模块的API来获取自己搭建的本地数据接口中的数据
      this.$http.get("http://localhost:3000/users")
          .then(function(response){
            // console.log(response);
            this.customers = response.body; //拿到db.json中的users数组，存储到data中的customers属性中
          })
    },

    filterBy(customers,filterInput){
      return customers.filter(function(customer){   //ES5数组的过滤方法
         return customer.name.match(filterInput);  //如果filterInput中没有输入值，则为空字符串''，返回customers中的所有数据
      })
    }
  },
  //钩子函数，每次路由跳转过来时，都事先重新获取一下数据
  created(){
    if (this.$route.query.alert) {  //判断Add.vue中路由时过来是否携带url中是否携带参数this.$route.query.alert
      this.alert = this.$route.query.alert;  //存储获取的参数
    }
    this.fetchCustomers();   //页面还未显示前先进行数据请求，获取到数据，最后渲染到页面
  },

  updated(){
    this.fetchCustomers();  
  },
  // 生命周期函数（钩子函数）
  // beforeCreate:function(){
  //   alert("组件实例化之前执行的函数");
  // },
  // created:function(){
  //   alert("组件实例化完毕，但页面还未显示"); 用于请求数据的阶段
  // },
  // beforeMount:function(){
  //   alert("组件挂载前，页面仍未展示，但虚拟DOM已经配置");
  // },
  // mounted:function(){
  //   alert("组件挂载后，此方法执行之后，页面显示");
  // },
  // beforeUpdate:function(){
  //   alert("组件更新前，页面仍未更新，但虚拟Dom已经配置");
  // },
  // updated:function(){
  //   alert("组件更新，此方法执行之后，页面显示");
  // },
  // beforeDestroy:function(){
  //   alert("组件销毁前");
  // },
  // destory:function(){
  //   alert("组件销毁");
  // }

  // 注册组件(弹窗提示组件)，自定义标签
  components:{
    Alert  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    

</style>