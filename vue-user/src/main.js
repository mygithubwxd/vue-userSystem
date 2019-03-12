// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//vue的模块化使用的是ES6的语法

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'
import CustomerDetails from './components/CustomerDetails'
import Edit from './components/Edit'

Vue.config.productionTip = false

Vue.use(VueRouter)  // 使用路由模块
Vue.use(VueResource)  //所以组件都可以就都可以使用VueResource的API了，对于axios插件不可以这么做

// 设置路由
// 可单独写在一个路由文件routes.js
// 实例化一个路由对象
const router = new VueRouter({
	//参数，选项名是固定的
	mode:"history", //去掉#号
	base:__dirname,
	routes:[    //构造函数参数中的routes选项
		{path:"/",component:Customers},  //页面加载时，默认展示的组件
		{path:"/about",component:About},
		{path:"/add",component:Add},
		{path:"/customerDetail/:id",component:CustomerDetails},   //id  详情页
		{path:"/edit/:id",component:Edit},    
	]
})

/* eslint-disable no-new */
new Vue({
	router,   //在创建根实例时，传入router选项  router:router ，将router注入到每个组件中；
	//同样的，在使用vueX时，我们需要传一个store选项
	//template选项，可以使用es6模版字符串，也可以将HTML内容单独放在<template id="a"></template>标签中，引用模版，id选择器
	//template模板中有且只有一个根元素
	//这里是根组件的模版，并手动挂载到根元素
  template: `   
	<div id="app">
		 <nav class="navbar navbar-default">
	      <div class="container">
	        <div class="navbar-header">
	          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	            <span class="sr-only">Toggle navigation</span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
						</button>
	          <a class="navbar-brand" href="#">用户管理系统</a>
	        </div>
	        <div id="navbar" class="collapse navbar-collapse">
	          <ul class="nav navbar-nav">
	            <li><router-link to="/">主页</router-link></li>
	            <li><router-link to="/about">关于我们</router-link></li>
	          </ul>

	          <ul class="nav navbar-nav navbar-right">
	            <li><router-link to="/add">添加用户</router-link></li>
	          </ul>
	        </div><!--/.nav-collapse -->
	      </div>
	    </nav>
		<router-view></router-view>
	</div>
  `
}).$mount("#app")

// 两者在使用效果上没有任何区别，都是为了将实例化后的vue挂载到指定的dom元素中。
// 如果在实例化vue的时候指定el，则该vue将会渲染在此el对应的dom中，
// 反之，若没有指定el，则vue实例会处于一种“未挂载”的状态，此时可以通过$mount来手动执行挂载。
// 注：如果$mount没有提供参数，模板将被渲染为文档之外的的元素，并且你必须使用原生DOM API把它插入文档中。
