import * as 物品定义 from './物品定义'

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

export const 储存 = (物品名称, 数量, 储物间 = 仓库) => {
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
    switch(that.工作台){
      case '篝火':{
        const 库存差额 = 去库存(self.名称, 1, 仓库)
        !库存差额 && 储存(self.燃烧产物, 1, 仓库)
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