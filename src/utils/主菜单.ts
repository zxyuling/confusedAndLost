import {获取菜单,获取可燃物品,获取炼金菜单,获取背包物品,获取仓库物品} from './const'


export const 主菜单 = [{
  名称:'角色',
  功能:that => {
    that.子菜单 = 获取菜单('角色')
  }
}, {
  名称:'篝火',
  描述:[
  '物品名称:篝火',
  '莫名的火焰'],
  功能:that => {
    that.子菜单 = 获取可燃物品()
  }
}, {
  名称:'炼金',
  功能:that => {
    that.子菜单 = 获取炼金菜单()
  }
}, {
  名称:'仓库',
  功能:that => {
    const a = 获取仓库物品()
    that.子菜单 = a
  }
}, {
  名称:'背包',
  功能:that => {
    that.子菜单 = 获取背包物品()
  }
}]