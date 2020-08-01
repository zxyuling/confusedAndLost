import {制作物品} from './const'
type 物品类型 = Array<'材料'|'可燃'|'装备'|'食物'>

export interface 日记  {
  '点燃'?:Array<string>
  '使用'?:Array<string>
  '装备'?:Array<string>
  '卸下'?:Array<string>
}

export interface 材料 {
  '名称':string,
  '类型':物品类型,
  '描述':Array<string>,
  '最大堆叠数量':number,
  '日记':日记,
}

export interface 食物 extends 材料 {
  '生命回复':number,
  '饱食回复':number
}

export interface 可燃 extends 材料 {
  '燃烧产物':string
}

export interface 装备 extends 材料 {
  '攻击':number,
  '防御':number,
  '位置':string,
}

export interface 材料需要 {
  '名称':string,
  '数量':number
}

export interface 图纸清单 {
  '名称':string,
  '材料':Array<材料需要>,
  '描述':Array<string>
}


export interface 装备栏 {
	'头部':制作物品|null,
	'双手':制作物品|null,
	'身体':制作物品|null,
	'脚部':制作物品|null
}

export interface 角色 {
  '生命':number,
  '生命上限':number,
  '饱食':number,
  '饱食上限':number,
  '攻击':number,
  '防御':number,
  '装备':装备栏
}

export interface 存档 {
	'角色':角色,
	'背包':Array<制作物品|null>,
	'仓库':Array<制作物品|null>,
}

