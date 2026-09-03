/* ============================================================
 * AIPro 新手训练营宣传页 · 内容配置（FR-02）
 * 换期只改本文件，禁止把以下内容硬编码进 HTML/CSS/JS。
 * 语言相关的展示文案见 js/i18n.js（与配置合并管理）。
 * ============================================================ */
window.PAGE_CONFIG = {
  /* 训练营基本信息（S0 首屏信息条 / S3 课程安排 / S8）
   * 产品名统一写法：AIPro（无空格，AI 大写、Pro 仅 P 大写） */
  camp: {
    name: 'AIPro 新手训练营',
    session: '第一期',
    startISO: '2026-09-10T00:00:00+08:00', // 开营日期（2026-09-03 确认：9/10 开营，营期 9/10–9/14；原 9/7 已废止）
    endISO: '2026-09-14T00:00:00+08:00',
    days: 5,
    dailyMinutes: 40
  },

  /* 报名入口（FR-01：链接每期更换，必须可配置） */
  signup: {
    url: '', // 报名表单链接（宜搭，向陈如南获取）
    // 报名截止 2026-09-10 09:00（北京时间，2026-09-03 确认；原 9/6 24:00 已废止）
    deadlineISO: '2026-09-10T09:00:00+08:00',
    expiredUrl: '' // 截止后 CTA 跳转（可配置为咨询入口或下一期预约），留空则按钮置灰不可点
  },

  /* 往期成果数据条（S2）
   * 口径：Quick BI 新手训练营历史数据（AIPro 为第一期，页面脚注已标注口径）。
   * 2026-09-03 运营确认真实数据替换 mock，后续变动直接改本配置。 */
  stats: {
    show: true,
    sessions: 7,    // 期数
    learners: 1000, // 累计学员（页面展示 1,000+）
    certified: 267  // 获得认证（精确值，不带 +）
  },

  /* 外部链接 */
  links: {
    helpDoc: 'https://help.aliyun.com/zh/quick-bi/user-guide/quick-bi-aipro-overview', // QBI AIPro 专属帮助中心（2026-09-03 运营提供）
    trial: 'https://auth.lydaas.com/login?redirect_uri=https%3A%2F%2Fquickbi.lydaas.com%2Fapi%2Fv2%2Ftrial%2FinitProOrgInfo&product=QuickBI#/register' // 免费试用申请链接（2026-09-03 运营提供）
  },

  /* 班主任咨询入口（S8） */
  contact: {
    name: '班主任',
    qr: 'https://img.alicdn.com/imgextra/i1/O1CN01xqCACFp1UyG1EmzI_!!6000000002944-2-tps-610-630.png' // 群二维码（2026-09-03 提供，已在 index.html 的 .qr-box 直接引用；注意群码满 200 人失效风险）
  },

  /* 页脚（2026-09-03 确认署名「瓴羊 × Quick BI 团队」，取代素材清单单署名「瓴羊」口径） */
  footer: {
    organizer: '瓴羊 × Quick BI 团队',
    icp: '', // 备案号（待提供）
    year: 2026
  }
};
