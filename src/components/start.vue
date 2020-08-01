<template>
  <div :class="['begin']">
    <div :class="['button',{'begin-start':start}]" @click="gotoHome">开&nbsp;始</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data:()=>{
    return {
      start:false
    }
  },
  mounted(){
    setTimeout(()=>this.start = true)

  },
  methods:{
    gotoHome(){
      this.$router.push('/home')
    }
  }
};

</script>

<style lang="less">
.begin{
  display: flex;
  justify-content: center;
  .button{
    height: 20px;
    width: 50px;
    margin-top:30vh;
    text-align:center;
    line-height: 20px;
    border: 1px solid #fff;
    border-radius:5px;
    opacity: 0;
    transition: all 2s;
  }
  .begin-start{
    opacity: 1;
  }
}
</style>
