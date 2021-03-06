import {食物, 可燃, 材料} from './interface'

export const 胡萝卜:食物 &  可燃 = {
  '名称':'胡萝卜',
  '类型':['食物','可燃'],
  '最大堆叠数量':20,
  '日记':{
    '点燃':[
      '获得了烤胡萝卜 X1',
      '胡萝卜烧烤后发出了奇异的香味']
  },
  '饱食回复':1,
  '生命回复':1,
  '燃烧产物':'烤胡萝卜',
  '描述':[
    '物品名称：胡萝卜',
    '攻击:1',
    '饱食回复:1',
    '血量回复:1',
    '从林间捡起来的野萝卜，实在没什么吃的，也可以将就'
  ]

}

export const 烤胡萝卜:食物 &  可燃 = {
  '名称':'烤胡萝卜',
  '类型':['食物','可燃'],
  '最大堆叠数量':20,
  '日记':{
    '点燃':[
      '获得了灰烬 X1',
      '尘归尘，土归土']
  },
  '饱食回复':2,
  '生命回复':2,
  '燃烧产物':'灰烬',
  '描述':[
    '烤胡萝卜',
    '饱食回复:2',
    '血量回复:2',
    '胡萝卜烧烤之后,难看、难闻但是能吃'],
}

export const 灰烬:材料 = {
  '名称':'胡萝卜',
  '类型':['材料'],
  '最大堆叠数量':20,
  '日记':{},
  '描述':[
    '灰烬',
    '毫无意义']
}


// const 物品定义 ={
//   '原木':{
//     名称:'原木',
//     类型:['材料', '可燃'],
//     热量:3,
//     描述:[
//     '物品名称:原木',
//     '刚刚砍伐下来的木头，除了能当柴烧没办法直接使用'],
//   }, 
//   '石头':{
//     名称:'石头',
//     类型:'材料',
//     攻击:'3',
//     描述:[
//     '物品名称:石头',
//     '攻击:3',
//     '地上随便捡起来的小石块，如果敲到了头上，一定很头疼'],
//   }, 
//   '木板':{
//     名称:'木板',
//     类型:['材料', '可燃'],
//     最大堆叠数量:20,
//     燃烧产物:'灰烬',
//     描述:[
//     '物品名称:木板',
//     '使用原木制作的木板,是制作其他工具的原材料']
//   }, 
//   '木甲':{
//     名称:'木甲',
//     类型:['装备', '可燃'],
//     防御:10,
//     位置:['身体'],
//     描述:[
//     '物品名称:木甲',
//     '防御:10',
//     '使用木板制作的板甲，看起来防御力还可以']
//   }, 
//   '胡萝卜':{
//     名称:'胡萝卜',
//     类型:['食物', '装备', '可燃'],
//     燃烧产物:'烤胡萝卜',
//     位置:['双手'],
//     最大堆叠数量:20,
//     饱食:1,
//     血量:1,
//     攻击:1,
//     描述:[
//     '物品名称：胡萝卜',
//     '攻击:1',
//     '饱食回复:1',
//     '血量回复:1',
//     '从林间捡起来的野萝卜，实在没什么吃的，也可以将就'],
//     日记:{
//       点燃:[{
//         描述:'获得了烤胡萝卜 X1',
//       }, {
//         描述:'胡萝卜烧烤后发出了奇异的香味',
//       }]
//     }
//   }, 
//   '烤胡萝卜':{
//     名称:'烤胡萝卜',
//     类型:['食物', '可燃'],
//     饱食:2,
//     血量:2,
//     燃烧产物:'灰烬',
//     最大堆叠数量:20,
//     描述:[
//     '烤胡萝卜',
//     '饱食回复:2',
//     '血量回复:2',
//     '胡萝卜烧烤之后,难看、难闻但是能吃'],
//     日记:{
//       点燃:[{
//         描述:'获得了灰烬 X1',
//       }, {
//         描述:'尘归尘，土归土',
//       }]
//     }
//   }, 
//   '灰烬':{
//     名称:'灰烬',
//     类型:['材料'],
//     最大堆叠数量:20,
//     描述:[
//     '灰烬',
//     '毫无意义']
//   },
//   '冰果':{
//     名称:'冰果',
//     类型:['食物', '可燃'],
//     饱食:5,
//     血量:-1,
//     描述:[
//     '冰果',
//     '饱食回复:5',
//     '血量回复:-1',
//     '远看是一个雪球，它其实是一个西瓜，近看是一个西瓜，破开了发现还真是个雪球']
//   }
// }