import { Link } from 'react-router'
import { totalCount } from '@/data'

export default function About() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-16">
      <p className="font-code text-[11px] uppercase tracking-[0.45em] text-primary">About</p>
      <h1 className="font-doc mt-3 text-4xl font-black tracking-[0.2em] text-foreground">关于本站</h1>

      <div className="font-doc mt-10 space-y-6 text-[15px] leading-[2.05] tracking-[0.02em] text-foreground/85">
        <p>
          《雨底之东》是一个以 2000 年代广州为底色的新怪谈世界观：一座多雨的城市，
          雨水里溶出另一重时间「潮底」；榕树把雨水固化在地下，也在人身上长出「地榕病」；
          深居人、水影人、避雨人、霓虹浮游与雨差，在雨里各守各的规矩。
        </p>
        <p>
          本站是这个世界观的一座「档案库」——以 SCP 基金会、后室维基那样的站内文档体例，
          把设定、地点、群体与故事写成一份份可阅读的潮湿档案。
          站内已有 {totalCount} 卷，其中相当一部分（湿信、订单存根、目击证词、回南天事件报告等）
          是为这座档案库新写的文本，与原始设定文档互为表里。
        </p>
        <p>
          世界观的视觉底色：旧楼拆迁与新楼并置、VCD 店与网吧相邻、申亚成功的狂热与非典创伤并存——
          希望与霉变交织。房价上涨的恐惧变成吞噬空间的怪物，对身份的迷茫变成在水面上模仿你的倒影。
        </p>
      </div>

      <div className="rule-dotted mt-10 text-muted-foreground" />

      <div className="font-doc mt-10 space-y-6 text-[15px] leading-[2.05] text-foreground/85">
        <h2 className="text-xl font-bold tracking-[0.3em] text-foreground">两种声音，两套体例</h2>
        <ul className="space-y-3">
          {[
            '铁盒笔记：编者自饼干铁盒转录的湿纸档案，六类编号（潮·榕·城·人·信·名），雨险等级薄雨至回南，密级可晾晒至珍藏。怀旧、矛盾、字迹洇开。',
            '潮底生存指南：避雨人内务手册，条目分「层」（深度带）与「实」（实体），条文编号，威胁分级可近 / 需避 / 必逃 / 无解。冷峻、祈使句、不解释。',
            '笔记里的 ████ 是原件涂黑；指南里的 ██ 是印刷缺损——前者来自过去，后者来自纪律。',
            '指南各条末尾的「参见」指向笔记：两套声音互相引用，如同一个人左手记日记、右手写操作规程。',
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/80" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rule-dotted mt-10 text-muted-foreground" />

      <div className="font-doc mt-10 space-y-6 text-[15px] leading-[2.05] text-foreground/85">
        <h2 className="text-xl font-bold tracking-[0.3em] text-foreground">写作还在继续</h2>
        <p>
          档案库会持续扩容：每一件潮底事物都「正常，只是不属于这个年代」——
          这意味着随便一件 2000 年代的老物事，都值得一份档案。
        </p>
        <p className="text-muted-foreground">
          想从哪一卷继续，告诉编者可好：
          一封新的湿信、一段霓虹浮游的数雨记录、
          某个还没名字的泛区街坊——档案馆的抽屉永远比铁盒大。
        </p>
        <p className="font-code text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
          All files are fiction. Any resemblance to a rainy city is intentional.
        </p>
      </div>

      <div className="mt-10 border border-border/60 bg-background/40 px-6 py-5">
        <p className="font-doc text-[14px] leading-[2] tracking-[0.08em] text-foreground/80">
          作者：胡凯迪<span className="text-muted-foreground">（系统策划 / 世界观策划）</span>
        </p>
        <a
          href="https://hukaidi1224-cloud.github.io/portfolio/"
          target="_blank"
          rel="noreferrer"
          className="font-doc mt-1 inline-block text-[13px] tracking-[0.25em] text-primary transition-colors hover:text-foreground"
        >
          更多作品 → 个人作品集
        </a>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/archive"
          className="font-doc border border-primary bg-primary/10 px-8 py-3 text-sm tracking-[0.4em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          回到档案库
        </Link>
        <Link
          to="/entry/zero"
          className="font-doc border border-border px-8 py-3 text-sm tracking-[0.4em] text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          重读编者说明
        </Link>
      </div>
    </div>
  )
}
