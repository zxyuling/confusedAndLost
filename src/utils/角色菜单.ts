import {获取装备} from './const'
export const 角色 = [{
  名称:'头部',
  功能:that => {
    const 装备= 获取装备('头部')
    that.三级菜单 = 装备
  }
}, {
  名称:'双手',
  功能:that => {
    const 装备= 获取装备('双手')
    that.三级菜单 = 装备
  }
}, {
  名称:'身体',
  功能:that => {
    const 装备= 获取装备('身体')
    that.三级菜单 = 装备
  }
}, {
  名称:'脚部',
  功能:that => {
    const 装备= 获取装备('脚部')
    that.三级菜单 = 装备
  }
}]