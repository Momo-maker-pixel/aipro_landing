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
    startISO: '2026-09-07T00:00:00+08:00', // 开营日期【暂定，走配置可调】
    endISO: '2026-09-11T00:00:00+08:00',
    days: 5,
    dailyMinutes: 40
  },

  /* 报名入口（FR-01：链接每期更换，必须可配置） */
  signup: {
    url: '', // 报名表单链接（宜搭，向陈如南获取，9/5 前到位）
    // 报名截止 2026-09-06 24:00（北京时间）= 09-07 00:00，用跨日写法保证各端解析一致
    deadlineISO: '2026-09-07T00:00:00+08:00',
    expiredUrl: '' // 截止后 CTA 跳转（可配置为咨询入口或下一期预约），留空则按钮置灰不可点
  },

  /* 往期成果数据条（S2）
   * ⚠️ 上线红线：当前为 mock 数据，对外发布前必须替换为运营确认的真实数据；
   * 若 9/6 上线前仍未取得，将 show 置为 false 直接隐藏数据条（无需发版）。 */
  stats: {
    show: true,
    sessions: 12,   // 期数
    learners: 3000, // 累计学员
    certified: 800  // 获得认证
  },

  /* 外部链接 */
  links: {
    helpDoc: 'https://help.aliyun.com/zh/quick-bi/', // 官方帮助文档（往期地址，AIPro 专属地址待确认）
    trial: 'https://auth.lydaas.com/login?redirect_uri=https%3A%2F%2Fquickbi.lydaas.com%2Fapi%2Fv2%2Ftrial%2FinitProOrgInfo&product=QuickBI#/register' // 免费试用申请链接（2026-09-03 运营提供）
  },

  /* 班主任咨询入口（S8） */
  contact: {
    name: '班主任',
    note: '联系方式 / 二维码待提供',
    qr: '' // 二维码图片地址，提供后填入 .qr-box 的 img
  },

  /* 页脚 */
  footer: {
    organizer: '主办方名称（待确认）',
    icp: '', // 备案号（待提供）
    year: 2026
  }
};
