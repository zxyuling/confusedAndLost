<template>
  <div :class="['home']">
    <div class="topmessage"><span>地点: 山洞</span><span>存活时间:3天</span><span>天气:☽</span><span>时间:晚上</span></div>
    <hr>

    <div class="op">
      <div>
        <div :class="['button', 'button1']" v-html="`探&nbsp;&nbsp;索`"></div>
        <div :class="['button', 'button2', 'highlight']" v-html="动作" @click="使用()"></div>
        <div class="op-button">
          <div 
              :class="['button', {
                    highlight:已选中主菜单==菜单, 
                    eq:菜单.状态=='装备'
                  }]" 
              v-for="菜单 in 主菜单"
               @click="菜单点选(菜单,1)">
            {{菜单.名称}}
          </div>
          <div class="op-subbutton">
            <div  
                v-if="子菜单" 
                :class="['button', {
                  highlight:已选中子菜单==菜单, 
                  eq:菜单.状态=='装备'
                }]" 
                v-for="菜单 in 子菜单" @click="菜单点选(菜单,2)">
                {{菜单.名称}}<i v-if="菜单.数量" class="count">{{菜单.数量}}</i>
            </div>
            <div class="op-subbutton">
              <div  
                  v-if="三级菜单" 
                  :class="['button', {
                    highlight:已选中三级菜单==菜单, 
                    eq:菜单.状态=='装备'
                  }]" 
                  v-for="菜单 in 三级菜单" @click="菜单点选(菜单,3)">
                  {{菜单.名称}}<i v-if="菜单.数量" class="count">{{菜单.数量}}</i>
              </div>
            </div>
          </div>
      </div>
      </div>
      <div class="op-message">
        <div class="message">
          <p v-for="描述 in 选中物品信息.描述">{{描述}}</p>
        </div>
        <div class="message2">
          <p>生命:{{基本信息.生命}}/{{基本信息.生命上限}}</p>
          <p>饱食:{{基本信息.饱食}}/{{基本信息.饱食上限}}</p>
          <p>攻击:{{基本信息.攻击}}</p>
          <p>防御:{{基本信息.防御}}</p>
        </div>
      </div>
      
    </div>
    <div>日记</div>
    <hr>
    <div class="log">
      <p v-for="单条日记 in 日记" :class="类型样式[单条日记.类型]">{{单条日记.描述}}</p>
    </div>
  </div>
</template>

<script>
import {获取菜单, 类型样式, 动作名称} from '../utils/const.ts'
const 角色信息 = window.角色信息
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data:()=>{
    return {
      角色信息,
      类型样式,
      start:false,
      主菜单:获取菜单('主菜单'),
      已选中主菜单:'',
      已选中子菜单:'',
      已选中三级菜单:'',
      日记:[],
      子菜单:[],
      三级菜单:[],
      物品信息:[],
      工作台:'仓库',

    }
  },
  updated(){
      console.log(this.角色信息)
  },
  computed:{
    动作(){
      return 动作名称(this.工作台)
    },
    选中物品信息(){
      return this.已选中三级菜单||this.已选中子菜单||this.已选中主菜单
    },
    基本信息(){
      const 角色信息 = this.角色信息
      let 攻击 = 角色信息.攻击
      let 防御 = 角色信息.防御
      let 生命上限 = 角色信息.生命上限
      let 饱食上限 = 角色信息.饱食上限
      let 生命 = 角色信息.生命
      let 饱食 = 角色信息.饱食
      for(let 位置 in 角色信息.装备){
          const 装备 = 角色信息.装备[位置]||{}
          攻击 += 装备.攻击||0
          防御 += 装备.防御||0
          生命 += 装备.生命||0
          饱食 += 装备.饱食||0
          生命上限+= 装备.生命上限||0
          饱食上限+= 装备.饱食上限||0


      }
      if(生命>生命上限){
        生命 = 生命上限
      }
      if(饱食>饱食上限){
        饱食 = 饱食上限
      }
      return {攻击, 防御, 生命上限, 饱食上限, 生命, 饱食}
    }
  },
  mounted(){
    setTimeout(()=>this.start = true)
  },
  methods:{
    菜单点选(菜单, 菜单类型){
      this.物品信息 = []
      switch(菜单类型){
        case 1:{
          this.已选中主菜单 = 菜单
          this.子菜单 = []
        }
        case 2:{
          this.已选中子菜单 = 菜单类型==2?菜单:''
          this.三级菜单 = []
        }
        case 3:{
          this.已选中三级菜单 = 菜单类型==3?菜单:''
        }
      }
      菜单.选择(this)
    },
    使用(){
      const 当前选择物品 = this.已选中三级菜单||this.已选中子菜单||this.已选中主菜单
      if(当前选择物品){
        当前选择物品.动作(this)
      }
    },
    动作名称(工作台){
      return 动作名称(工作台)
    }
  }
};

</script>

<style lang="less">
.home{
  .button{
    height: 20px;
    width: 50px;
    margin-bottom: 6px;
    text-align:center;
    line-height: 20px;
    border: 1px solid #fff;
    border-radius:5px;
    color:#aaa;
    position:relative;
  }
  .eq{
    &:before{
      content:' ';
      width:4px;
      height:4px;
      left:-2px;
      top:-2px;
      border-radius:50%;
      background:#fff;
      position:absolute;
    }
  }
  .count{
    position:absolute;
    font-style: normal;
    font-size: 12px;
    display: inline-block;
    background: #000;
    border-radius:3px;
    right: -5px;
    top:-12px;
  }
  .highlight{
    color:#fff;
  }
  .topmessage{
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
  }
  .op{
    position:relative;
    height: 60vh;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    .op-button{
      margin-left: 30px;
      margin-top:100px;
      width: 60vw;
      position:relative;
    }
    .op-subbutton{
      top:0;
      left: 60px;
      position:absolute;
    }
    .op-message{
      padding:40px 0 0 0;
      flex: 1;
      .message, .message2{
        border: 1px solid #fff;
        height: 60%;
        width: 80%;
        padding: 5px;
        border-radius:10px;
      }
      .message2{
        padding-top: 10px;
        margin-top:20px;
        height: 25%;
      }
    }
    .button1, .button2{
      position:absolute;
      top:50px;
      left: 40px;
      margin-bottom: 20px;
      margin-left: -10px;
      font-size: 14px;
      height: 25px;
      width: 65px;
      line-height: 25px;
    }
    .button2{
      left:120px;
    }
  }
  .log{
    height: 40vh;
    color:#999;
    overflow: auto;
    padding: 0 5px;
  }
  .log .dangerous{
    color:#fff;
  }
  
}
</style>
