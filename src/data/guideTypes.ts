export type GuideCategory = '层' | '实' | '则'

export type Threat = '可近' | '需避' | '必逃' | '无解'

export type GSection =
  | { type: 'para'; text: string }
  | { type: 'clause'; no: string; title: string; text: string }
  | { type: 'warn'; level: '注意' | '警告' | '严禁'; text: string }
  | { type: 'specs'; items: [string, string][] }
  | { type: 'list'; items: string[] }
  | { type: 'figure'; src: string; caption?: string }
  | { type: 'refs'; ids: string[] }

export interface GuideEntry {
  id: string
  code: string
  title: string
  subtitle: string
  category: GuideCategory
  threat: Threat
  threatNote?: string
  depth?: string
  version: string
  date: string
  excerpt: string
  tags: string[]
  featured?: boolean
  body: GSection[]
}

export interface GuideCategoryMeta {
  key: GuideCategory
  name: string
  latin: string
  desc: string
}

export const GUIDE_CATEGORIES: GuideCategoryMeta[] = [
  {
    key: '层',
    name: '深度带',
    latin: 'STRATA',
    desc: '潮底以深度分层，愈深愈旧。每层一条生存要领。',
  },
  {
    key: '实',
    name: '实体',
    latin: 'ENTITIES',
    desc: '在潮底活动、会与你发生关系的存在。多数没有恶意——恶意是人类的概念。',
  },
  {
    key: '则',
    name: '守则',
    latin: 'PROTOCOLS',
    desc: '不针对任何单一对象的通用规程。背不下来的人，潮底会替你记住。',
  },
]

export const THREAT_DESC: Record<Threat, string> = {
  可近: '可与之接触、交易或交谈，遵守所列规程即可',
  需避: '不要主动接触；被接触时按规程脱身',
  必逃: '发现即撤离，不要观察，不要记录，先跑',
  无解: '规程仅用于延长确认时间，无已知生还路径',
}
