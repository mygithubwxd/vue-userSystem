<!-- 主页面的弹窗提示(添加成功、删除成功、更新成功) -->
<template>
  <div class="alert alert-warning alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  {{message}}
</div>
</template>

<script>
export default {
  name: 'alert',
  props:["message"],//父组件向子组件传值，声明一个自定义属性
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
