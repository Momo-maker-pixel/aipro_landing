/* ============================================================
 * AIPro 新手训练营宣传页 · 多语言文案包（FR-06）
 * 架构要求：全部文案接入 i18n，禁止在 HTML 中硬编码不可切换的文案。
 * 降级策略：en-US 缺失的键自动回退 zh-CN（见 main.js 的 t()）。
 * HTML 内的中文默认文案与 zh-CN 包保持一致，作为最终兜底。
 * ============================================================ */
window.I18N = {

  /* ---------------- 中文（默认） ---------------- */
  'zh-CN': {
    /* 页面元信息（FR-03 分享优化） */
    'meta.title': 'AIPro 新手训练营第一期 · 免费报名中',
    'meta.desc': '5 天从 0 到 1 玩转 AIPro，导师带教，打卡赢好礼，完成学习可得官方认证证书',

    /* 顶栏 */
    'nav.cta': '立即报名',

    /* S0 首屏 Hero */
    'hero.eyebrow': 'AIPro 新手训练营 · 第一期',
    'hero.title': '5 天，从 0 到 1 玩转 <em>AIPro</em>',
    'hero.sub': '官方带教 · 社群伴学 · 打卡激励 · 免费参加',
    'hero.info.start': '{date}（{week}）开营',
    'hero.info.duration': '{days} 天 · {range}',
    'hero.info.daily': '每天约 {min} 分钟',
    'hero.info.free': '免费参加',
    'hero.info.quota': '名额有限 · 报满即止',
    'hero.mock.question': '9 月各区域销售额是多少？',
    'hero.mock.answer': '已生成分析图表',
    'hero.mock.board': '销售分析看板',

    /* CTA 与倒计时（FR-01） */
    'cta.signup': '立即报名',
    'cta.expired': '本期报名已截止',
    'cta.pending': '报名链接待配置',
    'countdown.label': '距报名截止',
    'countdown.expired': '报名已截止',
    'unit.day': '天',
    'unit.hour': '时',
    'unit.min': '分',

    /* S1 产品速览 */
    's1.eyebrow': '产品速览',
    's1.title': '先认识 AIPro',
    's1.tagline': 'AIPro 是 <em>AI-native</em> 的企业级智能分析产品，助力企业实现数据驱动业务增长',
    's1.sub': '分析力、理解力、行动力、可信度、成长性五大维度能力，让数据真正成为增长引擎',
    's1.c1.title': '分析力 <em>UP</em>',
    's1.c1.desc': '决策高效：一个入口，多轮对话完成综合深度分析，有洞察更有行动建议',
    's1.c2.title': '理解力 <em>UP</em>',
    's1.c2.desc': '洞察精准：懂业务语言与行业口径，沉淀记忆，越用越懂你',
    's1.c3.title': '行动力 <em>UP</em>',
    's1.c3.desc': '执行闭环：主动巡检推送，对接业务系统 MCP，把分析嵌入业务流',
    's1.c4.title': '可信度 <em>UP</em>',
    's1.c4.desc': '安全可信：全链路可解释可追溯，统一口径、数据溯源、权限、信创',
    's1.c5.title': '成长性 <em>UP</em>',
    's1.c5.desc': '组织进化：从个人会分析提效到组织能协同进化，越用越进化',
    's1.show.prev': '上一张',
    's1.show.next': '下一张',
    's1.show.dot': '第 {n} 张',
    's1.show.zoom': '点击查看大图',
    's1.show.close': '关闭',

    /* S2 训练营亮点 */
    's2.eyebrow': '训练营亮点',
    's2.title': '为什么参加训练营',
    's2.h1.title': '阶梯式学习',
    's2.h1.desc': '5 天课程由浅入深，平均每天约 40 分钟，用最短路径掌握核心功能',
    's2.h2.title': '双导师伴学',
    's2.h2.desc': '专属学习社群，产品运营带教 + 技术专家答疑，全流程陪伴你的学习',
    's2.h3.title': '激励与认证',
    's2.h3.desc': '完成每日打卡可参与当日抽奖，完成全部任务可参加结营特别抽奖，并获得官方认证证书',
    's2.stats.u1': '期',
    's2.stats.l1': '已连续举办',
    's2.stats.l2': '累计学员参与',
    's2.stats.l3': '获得官方认证',
    's2.stats.note': '数据口径：Quick BI 新手训练营历史数据',

    /* S3 课程安排 */
    's3.eyebrow': '课程安排',
    's3.title': '5 天课程安排',
    's3.sub': '由浅入深，每天一个学习主题',
    's3.d1.theme': '新手入门：认识 AIPro，基于内置数据快速体验',
    's3.d1.out': '知识测验与基础操作题',
    's3.d2.theme': '掌握数据上传、智能问数、报告生成与定时订阅',
    's3.d2.out': '一份完整的分析报告或 HTML 页面',
    's3.d3.theme': '掌握 Dashboard 调整与可视化优化',
    's3.d3.out': '一个符合业务展示需求的 Dashboard',
    's3.d4.theme': '掌握洞察分析、归因分析与 Skill 沉淀',
    's3.d4.out': '一份分析报告及一个可复用 Skill',
    's3.d5.theme': '通过自由探索或综合案例融会贯通',
    's3.d5.out': '一份完整的综合分析报告或 HTML 页面',
    's3.duration': '约 40 分钟',
    's3.note': '打卡时间不强制，可按自己的节奏学习，结营前完成全部任务即可（含补卡期）',

    /* S4 适合人群 */
    's4.eyebrow': '适合人群',
    's4.title': '适合谁参加',
    's4.p1.title': '零基础新手',
    's4.p1.desc': '第一次接触 AIPro，想系统入门而不是碎片化看文档',
    's4.p2.title': '需要带教督学',
    's4.p2.desc': '自学容易放弃，需要社群氛围和班主任督促',
    's4.p3.title': '客户方新员工',
    's4.p3.desc': '公司已采购产品，新接手报表工作，想快速上手',

    /* S5 激励与认证 */
    's5.eyebrow': '激励与认证',
    's5.title': '完成任务，赢取奖励',
    's5.daily.label': '每日打卡抽奖',
    's5.daily.note': '完成当天打卡任务，即可获得次日抽奖资格，每天开奖',
    's5.daily.p1': '第一行代码帆布包',
    's5.daily.p2': '阿里云折叠雨伞',
    's5.daily.p3': '云小宝公仔',
    's5.daily.p4': '阿里云保温杯',
    's5.final.label': '结营特别奖',
    's5.final.note': '完成全部 5 天打卡任务，可参与结营特别抽奖',
    's5.final.t1.rank': '一等奖 · 1 名',
    's5.final.t1.name': '阿里云拍拍灯 + Quick BI 课程名额',
    's5.final.t1.value': '价值 ¥699',
    's5.final.t2.rank': '二等奖 · 3 名',
    's5.final.t2.name': '云小宝大抱枕 + Quick BI 课程名额',
    's5.final.t2.value': '价值 ¥699',
    's5.final.t3.rank': '三等奖 · 5 名',
    's5.final.t3.name': 'Quick BI 课程名额',
    's5.final.t3.value': '价值 ¥699',
    's5.cert.label': '官方认证证书',
    's5.cert.note': '结营前完成全部打卡任务，可获得官方认证证书（结营后统一发放）',
    's5.cert.name': 'Quick BI 高级开发者认证',

    /* S6 参与流程 */
    's6.eyebrow': '参与流程',
    's6.title': '四步，从报名到结营',
    's6.s1.title': '立即报名',
    's6.s1.desc': '点击「立即报名」填写报名表单（约 1 分钟）',
    's6.s2.title': '加入社群',
    's6.s2.desc': '按表单引导加入专属学习群，领取学习资料',
    's6.s3.title': '每日打卡',
    's6.s3.desc': '每天约 40 分钟：看课程 + 做习题 + 提交打卡（时间不强制，含补卡期）',
    's6.s4.title': '结营领奖',
    's6.s4.desc': '完成全部任务，获得官方认证证书并参与结营特别抽奖',

    /* S7 常见问题 */
    's7.eyebrow': '常见问题',
    's7.title': '你可能想问',
    's7.q1': '完全零基础可以参加吗？',
    's7.a1': '可以。课程从零开始设计，每天任务配有学习文档与操作视频，跟着做就能完成。',
    's7.q2': '每天需要花多少时间？打卡有强制时间吗？',
    's7.a2': '平均每天约 40 分钟。打卡时间不强制，可按自己的节奏学习，结营前完成全部任务即可，另设补卡期。',
    's7.q3': '需要提前准备什么？要连接自己的数据库吗？',
    's7.a3': '不需要。下载官方提供的数据源文件，按任务指引上传后即可开始学习。',
    's7.q4': '没有产品账号怎么办？',
    's7.a4': '已购买产品的客户使用正式账号即可；暂无账号可{link}。',
    's7.trial': '点击申请免费试用',
    's7.q5': '学习中遇到问题怎么办？',
    's7.a5': '三重支持：① 学习群内班主任与技术专家答疑；② 产品内「帮助与反馈 → AI 助理」7×24 快速响应；③ 官方帮助文档。',
    's7.q6': '证书如何获得？',
    's7.a6': '结营前完成全部打卡任务即可获得官方认证证书，结营后统一发放。',
    's7.q7': '名额满了 / 错过报名怎么办？',
    's7.a7': '本期名额有限、报满即止，可关注后续开营通知。',
    's7.q8': '抽奖如何参与、何时开奖？',
    's7.a8': '完成当日打卡即获得次日抽奖资格；完成全部任务可参与结营特别抽奖，开奖结果在学习群内公布。',
    's7.more': '更多产品问题，可查阅',
    's7.doc': 'Quick BI 官方帮助文档',

    /* S8 底部 CTA 与页脚 */
    's8.title': '名额有限，立即报名',
    's8.sub': '{date} 开营 · 免费 · 报满即止',
    's8.contact.label': '报名咨询',
    's8.contact.default': '班主任',
    'footer.organizer': '主办方',
    'footer.copyright': '© {year} {org} 版权所有',
    'footer.icp': '备案号待提供'
  },

  /* ---------------- English ---------------- */
  'en-US': {
    /* Page meta (FR-03) */
    'meta.title': 'AIPro Beginner Bootcamp · Free Registration Open',
    'meta.desc': 'Master AIPro from 0 to 1 in 5 days. Expert-led, community-based learning with daily check-ins, prizes, and an official certificate.',

    /* Top bar */
    'nav.cta': 'Sign Up',

    /* S0 Hero */
    'hero.eyebrow': 'AIPro Beginner Bootcamp · Session 1',
    'hero.title': '5 Days, from 0 to 1, Master <em>AIPro</em>',
    'hero.sub': 'Official Mentoring · Peer Community · Check-in Rewards · Free to Join',
    'hero.info.start': 'Starts {date} ({week})',
    'hero.info.duration': '{days} Days · {range}',
    'hero.info.daily': 'About {min} min per day',
    'hero.info.free': 'Free to Join',
    'hero.info.quota': 'Limited Seats · First Come, First Served',
    'hero.mock.question': 'What were the sales by region in September?',
    'hero.mock.answer': 'Chart generated',
    'hero.mock.board': 'Sales Analytics Dashboard',

    /* CTA & countdown (FR-01) */
    'cta.signup': 'Sign Up Now',
    'cta.expired': 'Registration Closed',
    'cta.pending': 'Signup link not configured yet',
    'countdown.label': 'Registration closes in',
    'countdown.expired': 'Registration Closed',
    'unit.day': 'd',
    'unit.hour': 'h',
    'unit.min': 'm',

    /* S1 Product */
    's1.eyebrow': 'PRODUCT',
    's1.title': 'Meet AIPro First',
    's1.tagline': 'AIPro is an <em>AI-native</em> enterprise analytics product that helps businesses grow with data-driven decisions',
    's1.sub': 'Five capability dimensions — analytics, comprehension, execution, trust, and growth — turning data into a true growth engine',
    's1.c1.title': 'Analytics <em>UP</em>',
    's1.c1.desc': 'Efficient decisions: one entry point, multi-turn dialogue for comprehensive, in-depth analysis — insights plus actionable recommendations',
    's1.c2.title': 'Comprehension <em>UP</em>',
    's1.c2.desc': 'Precise insights: understands business language and industry metrics, and builds memory — the more you use it, the better it knows you',
    's1.c3.title': 'Execution <em>UP</em>',
    's1.c3.desc': 'Closed-loop execution: proactive monitoring and push alerts, MCP integration with business systems — analysis embedded in your workflows',
    's1.c4.title': 'Trust <em>UP</em>',
    's1.c4.desc': 'Secure and trustworthy: explainable and traceable end to end — unified metrics, data lineage, permissions, and Xinchuang (IT localization) compliance',
    's1.c5.title': 'Growth <em>UP</em>',
    's1.c5.desc': 'Organizational evolution: from individuals analyzing faster to whole teams evolving together — the more you use it, the more it evolves',
    's1.show.prev': 'Previous',
    's1.show.next': 'Next',
    's1.show.dot': 'Slide {n}',
    's1.show.zoom': 'Click to enlarge',
    's1.show.close': 'Close',

    /* S2 Highlights */
    's2.eyebrow': 'HIGHLIGHTS',
    's2.title': 'Why Join the Bootcamp',
    's2.h1.title': 'Step-by-Step Learning',
    's2.h1.desc': 'A 5-day curriculum from basics to advanced, about 40 minutes a day — the shortest path to core skills',
    's2.h2.title': 'Dual-Mentor Support',
    's2.h2.desc': 'A dedicated learning community with product mentors and technical experts accompanying you all the way',
    's2.h3.title': 'Rewards & Certification',
    's2.h3.desc': 'Daily check-ins enter daily draws; completing all tasks enters the closing draw and earns an official certificate',
    's2.stats.u1': '',
    's2.stats.l1': 'bootcamps held',
    's2.stats.l2': 'learners joined',
    's2.stats.l3': 'earned official certificates',
    's2.stats.note': 'Data covers all historical Quick BI beginner bootcamps',

    /* S3 Curriculum */
    's3.eyebrow': 'CURRICULUM',
    's3.title': 'The 5-Day Curriculum',
    's3.sub': 'One theme per day, from basics to mastery',
    's3.d1.theme': 'Getting started: meet AIPro and get hands-on fast with built-in sample data',
    's3.d1.out': 'A knowledge quiz & basic hands-on exercises',
    's3.d2.theme': 'Master data upload, AI-powered Q&A, report generation, and scheduled subscriptions',
    's3.d2.out': 'A complete analysis report or HTML page',
    's3.d3.theme': 'Master Dashboard adjustments and visualization optimization',
    's3.d3.out': 'A Dashboard that meets business presentation needs',
    's3.d4.theme': 'Master insight analysis, attribution analysis, and Skill building',
    's3.d4.out': 'An analysis report and a reusable Skill',
    's3.d5.theme': 'Put it all together through free exploration or a comprehensive case study',
    's3.d5.out': 'A complete comprehensive analysis report or HTML page',
    's3.duration': '~40 min',
    's3.note': 'Check-in times are flexible — learn at your own pace and finish all tasks before closing (make-up window included)',

    /* S4 Audience */
    's4.eyebrow': 'AUDIENCE',
    's4.title': 'Who Is It For',
    's4.p1.title': 'Complete Beginners',
    's4.p1.desc': 'New to AIPro and want a structured path instead of scattered docs',
    's4.p2.title': 'Learners Who Need Support',
    's4.p2.desc': 'Self-study never sticks? You need a community and mentors to keep you going',
    's4.p3.title': 'New Team Members',
    's4.p3.desc': 'Your company already uses the product and you just took over reporting — get up to speed fast',

    /* S5 Rewards */
    's5.eyebrow': 'REWARDS',
    's5.title': 'Complete Tasks, Win Rewards',
    's5.daily.label': 'Daily Check-in Draws',
    's5.daily.note': "Finish each day's task to enter the next day's draw — winners drawn daily",
    's5.daily.p1': '"First Line of Code" canvas tote',
    's5.daily.p2': 'Alibaba Cloud folding umbrella',
    's5.daily.p3': 'Alibaba Cloud mascot plush',
    's5.daily.p4': 'Alibaba Cloud thermos',
    's5.final.label': 'Closing Grand Prizes',
    's5.final.note': 'Finish all 5 days of tasks to enter the closing draw',
    's5.final.t1.rank': '1st Prize · 1 winner',
    's5.final.t1.name': 'Alibaba Cloud tap light + Quick BI course seat',
    's5.final.t1.value': 'Worth ¥699',
    's5.final.t2.rank': '2nd Prize · 3 winners',
    's5.final.t2.name': 'Mascot plush + Quick BI course seat',
    's5.final.t2.value': 'Worth ¥699',
    's5.final.t3.rank': '3rd Prize · 5 winners',
    's5.final.t3.name': 'Quick BI course seat',
    's5.final.t3.value': 'Worth ¥699',
    's5.cert.label': 'Official Certificate',
    's5.cert.note': 'Complete all tasks before closing to earn the official certificate (issued after the camp)',
    's5.cert.name': 'Quick BI Advanced Developer Certification',

    /* S6 Process */
    's6.eyebrow': 'HOW TO JOIN',
    's6.title': 'Four Steps from Sign-up to Graduation',
    's6.s1.title': 'Sign Up',
    's6.s1.desc': 'Click "Sign Up Now" and fill in the form (about 1 minute)',
    's6.s2.title': 'Join the Community',
    's6.s2.desc': 'Follow the form to join the learning group and get your materials',
    's6.s3.title': 'Daily Check-ins',
    's6.s3.desc': 'About 40 minutes a day: lessons + exercises + submission (flexible timing, make-up window included)',
    's6.s4.title': 'Graduate & Win',
    's6.s4.desc': 'Complete all tasks, earn your certificate and enter the closing draw',

    /* S7 FAQ */
    's7.eyebrow': 'FAQ',
    's7.title': 'You Might Be Wondering',
    's7.q1': 'Can complete beginners join?',
    's7.a1': 'Yes. The course is designed from scratch, with daily lessons, walkthrough videos, and hands-on exercises — just follow along.',
    's7.q2': 'How much time does it take each day? Is there a fixed check-in deadline?',
    's7.a2': 'About 40 minutes per day on average. Check-in times are flexible — learn at your own pace and finish all tasks before the camp ends. A make-up window is also provided.',
    's7.q3': 'What should I prepare? Do I need to connect my own database?',
    's7.a3': 'No. Just download the official sample data files and upload them as guided — no database connection needed.',
    's7.q4': "What if I don't have a product account?",
    's7.a4': "Existing customers can use their official accounts. If you don't have one, you can {link}.",
    's7.trial': 'apply for a free trial',
    's7.q5': 'Where can I get help during the camp?',
    's7.a5': 'Three support channels: ① mentors and technical experts in the learning group; ② the in-product AI Assistant (24/7) via "Help & Feedback"; ③ official documentation.',
    's7.q6': 'How do I earn the certificate?',
    's7.a6': "Complete all daily tasks before the camp ends and you'll receive the official certificate, issued after closing.",
    's7.q7': 'What if the camp is full or I missed registration?',
    's7.a7': 'Seats are limited and registration closes once full. Follow our announcements for the next session.',
    's7.q8': 'How does the lottery work and when are winners drawn?',
    's7.a8': "Complete a day's task to enter the next day's draw; finish all tasks to enter the closing draw. Winners are announced in the learning group.",
    's7.more': 'For more product questions, see',
    's7.doc': 'Quick BI official documentation',

    /* S8 Footer CTA */
    's8.title': 'Seats Are Limited — Sign Up Now',
    's8.sub': '{date} · Free · First come, first served',
    's8.contact.label': 'Contact',
    's8.contact.default': 'Class Advisor',
    'footer.organizer': 'Organizer',
    'footer.copyright': '© {year} {org}. All rights reserved.',
    'footer.icp': 'ICP filing to be provided'
  }
};

/* 日期本地化辅助（月份 / 星期，供 main.js 的日期格式化使用） */
window.I18N_CAL = {
  months: {
    'zh-CN': null, // 中文直接用数字月，如「9 月 7 日」
    'en-US': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  week: {
    'zh-CN': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }
};
