export type Category = '潮' | '榕' | '城' | '人' | '信' | '名'

export type Hazard = '薄雨' | '骤雨' | '暴雨' | '回南'

export type Clearance = '可晾晒' | '避雨' | '珍藏'

export type Section =
  | { type: 'para'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; by?: string }
  | { type: 'table'; cols: string[]; rows: string[][] }
  | { type: 'list'; items: string[] }
  | { type: 'stamp'; text: string }
  | { type: 'note'; text: string }

export interface Entry {
  id: string
  code: string
  title: string
  subtitle?: string
  category: Category
  hazard: Hazard
  clearance: Clearance
  date: string
  location?: string
  source?: string
  excerpt: string
  tags: string[]
  featured?: boolean
  body: Section[]
}

export interface CategoryMeta {
  key: Category
  name: string
  latin: string
  desc: string
}

export const CATEGORIES: CategoryMeta[] = [
  {
    key: '潮',
    name: '现象档案',
    latin: 'PHENOMENA',
    desc: '关于潮底本身，以及雨如何把城市泡出另一重时间。',
  },
  {
    key: '榕',
    name: '病变档案',
    latin: 'AFFLICTION',
    desc: '地榕病的临床、地质与家族记录。树在地下生长，也在人身上生长。',
  },
  {
    key: '城',
    name: '地点档案',
    latin: 'LOCATIONS',
    desc: '现世与潮底重叠的城市坐标。每一个地点都有两副面孔。',
  },
  {
    key: '人',
    name: '群体档案',
    latin: 'GROUPS',
    desc: '深居人、水影人、避雨人、霓虹浮游与雨差。城里的雨都落在他们身上。',
  },
  {
    key: '信',
    name: '文献与事件',
    latin: 'RECORDS',
    desc: '湿信、证词、事故报告与订单存根。事件的碎片，字迹多半洇开了。',
  },
  {
    key: '名',
    name: '人物档案',
    latin: 'PERSONS',
    desc: '有名有姓的个案。他们比档案厚，比城市薄。',
  },
]

export const HAZARD_DESC: Record<Hazard, string> = {
  薄雨: '可近观，保持距离即可',
  骤雨: '需要经验与准备',
  暴雨: '不建议无陪同接触',
  回南: '无法评级。能离多远离多远',
}

export const CLEARANCE_DESC: Record<Clearance, string> = {
  可晾晒: '可公开，可置于日光下晾晒而不受损',
  避雨: '内部传阅，请勿带出防雨柜',
  珍藏: '原铁盒层。编号即锁',
}
