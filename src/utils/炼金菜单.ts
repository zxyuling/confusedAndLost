import {获取玄学符文制作清单} from './const'
export const 炼金 = [{
  名称:'玄学符文',
  描述:[
  '玄学符文',
  '伪科学教材:1',
  '石头:7',
  '墨汁:2',
  '按照书上的理论',
  '挑选一些的石头',
  '画一些扭曲的符号',
  '就会发生不可思议的事情',
  '等等,哪本书这样说的？'],
  行为:that => {
    
  },
  功能:that => {
    const t= 获取玄学符文制作清单()
    that.三级菜单 =t
  }
}, {
  名称:'扭曲法阵',
}, {
  名称:'古神祭坛',
}, {
  名称:'未名神奇',
}, ]