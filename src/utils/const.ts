import {存档} from './interface'
import * as 物品定义 from './物品定义'
import * as 图纸清单 from './图纸清单'
import {主菜单} from './主菜单'
import {角色} from './角色菜单'
import {炼金} from './炼金菜单'


export const 菜单列表 = {
  主菜单,
  角色,
  炼金
}


export const 获取菜单 = (菜单名称) => {
  return 菜单列表[菜单名称].map(item=>new 书写菜单(item))
}

export const 获取装备 = (位置) => {
  const 物品= 获取所有物品()
  return 物品.filter(item=>{
    if((item as any).位置){
      if((item as any).位置.indexOf(位置)!=-1){
        return true
      }
    }else{
      return null
    }
  })
}
export const 天气 = {
  '星星':'✨',
  '小雪':'❃',
  '大雪':'❆',
  '太阳':'✹',
  '月亮':'☽',
}


export const 玄学符文图纸清单 = ['木板']


export const 获取玄学符文制作清单 = () => {
 return 玄学符文图纸清单.map(item=>new 图纸(item))
}
export const 获取炼金菜单 = () => {
  return 炼金.map(item=>new 建设炼金(item))
}

class 图纸 {
  constructor(名称){
    Object.assign(this,图纸清单[名称])
  }
  动作(that){
    const self = this as any
    储存(self.名称, 1)
  }
}

class 书写菜单 {
  constructor(菜单){
    Object.assign(this,菜单)
  }
  选择(that){
    const self = this as any
    that.工作台 = self.名称;
    if(self.功能){
      self.功能(that)
    }
  }
}

class 建设炼金 extends 书写菜单{
  状态:string
  constructor(菜单){
    super(菜单)
    Object.assign(this,菜单)
    this.状态 = '关'
  }
  选择(that){
    const self = this as any
    that.工作台 = `${self.名称}·${self.状态}`;
    if(self.功能 && self.状态 == '开'){
      self.功能(that)
    }
  }
  动作(that){
    const self = this as any
    if(self.行为 && self.状态 == '关'){
      self.状态 = '开'
      self.行为(that)
      self.选择(that)//EFF:更新dom使用
    }
  }
}
export class 制作物品 {
  数量:number
  constructor(名称, 数量){
    Object.assign(this,物品定义[名称])
    this.数量 = 数量
  } 
  选择(that){
    that.物品信息 = (this as any).描述
  }
  动作(that){
    const self = this as any
    const Gloabl = window as any
    switch(that.工作台){
      case '篝火':{
        const 库存差额 = 去库存(self.名称, 1, Gloabl.仓库)
        !库存差额 && 储存(self.燃烧产物, 1, Gloabl.仓库)
        that.主菜单[1].选择(that)//EFF:更新dom使用
        that.日记 = [...self.日记.点燃.map(item=>{
          return {描述:item}
        }), ...that.日记]
        break;
      };break;
      case '仓库':{
        that.日记 = [...self.日记.使用.map(item=>{
          return {描述:item}
        }), ...that.日记]
        break;
      };break;
      case '头部':
      case '双手':
      case '身体':
      case '脚部': {
        const 角色信息 = that.角色信息
        if(self.状态 == '装备'){
          self.状态 = ''
          角色信息.装备[that.工作台] = null
        }else{
          self.状态 = '装备'
          角色信息.装备[that.工作台] = self
        }
        that.角色信息 = Object.assign({},角色信息)//EFF:更新dom使用
      };break;
      case '背包':{
        that.日记 = [...self.日记.使用, ...that.日记]
        break;
      };break;
    }
    that.$forceUpdate()//EFF:更新dom使用
  }
}




export const 获取仓库物品 = () => {
  return (window as any).仓库.filter(item=>item)
}

export const 获取背包物品 = () => {
  return (window as any).背包.filter(item=>item)
}

export const 获取所有物品 = () => {
  return [...获取仓库物品(), ...获取背包物品()]
}

export const 获取可燃物品 = () => {
  const 物品 = 获取所有物品()
  return 物品.filter(item=>{
    if((item as any).类型){
      if((item as any).类型.indexOf('可燃')!=-1){
        return true
      }
    }else{
      return null
    }
  })
}

export const 去库存 = (物品名称, 数量, 储物间 = 仓库) => {
  for(let 格子编号 = 储物间.length - 1 ; 格子编号>=0; 格子编号--){
    const 格子 = 储物间[格子编号]
    if(格子 && (格子 as any).名称 === 物品名称){
      if(格子.数量>数量){
        格子.数量-=数量
        数量 = 0
        break
      }else{
        数量 = 数量 - 格子.数量
        储物间.splice(格子编号, 1)
        储物间.push(null)
        格子编号++
      }
    }
  }
  return 数量
}

export const 储存 = (物品名称, 数量, 储物间 = (window as any).仓库) => {
  for(let 格子编号 = 0 ; 格子编号<储物间.length; 格子编号++){
    if(!储物间[格子编号]){//如果开始占用新格子，就创建一个格子使用
      储物间[格子编号] = new 制作物品(物品名称, 0)
    }
    const 格子 = 储物间[格子编号]
    if((格子 as any).名称 === 物品名称){//找到当前物品占用的格子
      //如果堆叠数量没有达到上限，就直接堆叠
      if(格子.数量+数量<=(格子 as any).最大堆叠数量){
        格子.数量+=数量
        数量 = 0
        break
      }else{
        //不然达到最大堆叠数量，然后计算剩余数量，进入下一个格子继续堆叠
        const 最大堆叠数量 = (格子 as any).最大堆叠数量
        数量 =  数量 + 格子.数量 - 最大堆叠数量
        格子.数量 = (格子 as any).最大堆叠数量
      }
    }
  }
  return 数量
}

export const 类型样式 = {
  '危险':'dangerous'
}

export const 动作名称 = (工作台) =>  {
  switch(工作台){
    case '篝火': return '燃&nbsp;&nbsp;烧';
    case '头部':
    case '双手':
    case '身体':
    case '脚部': return '装备|卸下';
    case `${工作台}·关`: return '开启';
    case `${工作台}·开`: return '制作';
    default: return '使&nbsp;&nbsp;用'
  }
}


export const 载入:() => 存档  = () => {
  const 初始角色信息 = {
    生命:100,
    生命上限:100,
    饱食:30,
    饱食上限:30,
    攻击:10,
    防御:10,
    装备:{头部:null, 双手:null, 身体:null, 脚部:null}
  }
  const 初始背包 = new Array(10).fill(null)
  const 初始仓库 = new Array(30).fill(null)
  const 数据:any = localStorage['存档']
  const 存档数据:存档 =  {
    '角色':数据?.角色||初始角色信息,
    '背包':(数据?.背包||初始背包).map(item=>item?new 制作物品(item.名称, item.数量):null),
    '仓库':(数据?.仓库||初始仓库).map(item=>item?new 制作物品(item.名称, item.数量):null),
  }
  return 存档数据
}

export const 保存:(that:any)=>boolean = () => {
  const 角色 = that.
  return true
}

export const 初始化 = () => {
  const Gloabl = window as any
  const 存档数据:存档 = 载入()
  Gloabl.背包 = 存档数据.背包
  Gloabl.角色信息 = 存档数据.角色
  Gloabl.仓库 = 存档数据.仓库
}

初始化()