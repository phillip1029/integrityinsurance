export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
};

export function localePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "zh") {
    return normalized;
  }
  return normalized === "/" ? "/en" : `/en${normalized}`;
}

export function alternateLocalePath(locale: Locale, path = "/") {
  return localePath(locale === "en" ? "zh" : "en", path);
}

export const dictionary = {
  en: {
    nav: {
      medicare: "Medicare",
      marketplace: "Marketplace",
      articles: "Articles",
      contact: "Contact",
    },
    common: {
      call: "Call",
      coverage: "Coverage",
      contact: "Contact",
      privacy: "Privacy policy",
      medicarePlans: "Medicare plans",
      marketplacePlans: "Marketplace health insurance",
      lifeInsurance: "Life insurance",
      copyright: "All rights reserved.",
      readArticle: "Read article",
      viewAllArticles: "View all articles",
      backToArticles: "Back to articles",
      originallyPreparedFor: "Originally prepared for:",
      requestConsultation: "Request consultation",
      scheduleMeeting: "Schedule a meeting",
      startReview: "Start a plan review",
    },
    home: {
      eyebrow: "Licensed health insurance agency",
      headline: "Integrity Insurance LLC",
      lede:
        "Local Medicare and Marketplace health insurance guidance for people who want clear choices, careful explanations, and year-round support.",
      heroAlt:
        "A health insurance consultation desk with paperwork and a laptop",
      statTitle: "Personalized",
      statText: "plan guidance for Medicare and Marketplace coverage",
      whatWeDo: "What we do",
      whatWeDoHeadline: "Coverage decisions explained without pressure.",
      whatWeDoText:
        "Integrity Insurance LLC helps individuals and families understand eligibility windows, plan structures, prescription coverage, doctor networks, and expected costs before they enroll.",
      services: [
        {
          title: "Medicare guidance",
          text: "Compare Medicare Advantage, Medicare Supplement, and Part D options with a licensed agent who explains the practical tradeoffs.",
          href: "/medicare",
        },
        {
          title: "Marketplace health plans",
          text: "Review ACA Marketplace coverage, subsidy eligibility, provider networks, and Special Enrollment Period questions.",
          href: "/marketplace",
        },
        {
          title: "Life insurance planning",
          text: "Discuss term life, whole life, and final expense coverage for family protection and long-term planning.",
          href: "/life-insurance",
        },
      ],
      processEyebrow: "How appointments work",
      processHeadline: "A practical review from first question to enrollment.",
      process: [
        "Understand doctors, prescriptions, budget, and timing.",
        "Compare options in plain language, side by side.",
        "Support enrollment and help review changes each year.",
      ],
      articlesEyebrow: "Weekly newspaper articles",
      articlesHeadline: "Recent Medicare and Marketplace insights.",
    },
    articles: {
      title: "Articles",
      headline: "Medicare and Marketplace health insurance columns.",
      text:
        "Weekly educational articles written for local readers, republished here so clients can find timely guidance in one place.",
    },
    medicare: {
      eyebrow: "Medicare",
      headline: "Medicare choices made easier to compare.",
      text:
        "Whether you are enrolling for the first time, switching plans, or reviewing current coverage, a licensed agent can help you understand benefits, networks, prescriptions, and expected costs.",
      reviewTitle: "What we can review",
      items: [
        "Medicare Advantage plan options",
        "Medicare Supplement Insurance",
        "Prescription Drug Plans",
        "Annual Enrollment Period changes",
        "Doctor, hospital, and pharmacy networks",
      ],
      panelTitle: "First appointment focus",
      panelText:
        "Bring your Medicare card, prescription list, preferred doctors, and pharmacy names. The review is designed to show how plan details affect real care, not just premiums.",
    },
    marketplace: {
      eyebrow: "Marketplace health insurance",
      headline: "ACA plan help for individuals and families.",
      text:
        "Compare premiums, deductibles, provider networks, prescription coverage, subsidy eligibility, and enrollment timing with local guidance.",
      reviewTitle: "Common reasons to review coverage",
      items: [
        "Loss of employer coverage",
        "Family, income, or address changes",
        "Open Enrollment plan comparisons",
        "Provider or prescription changes",
        "Questions about tax credits and cost-sharing reductions",
      ],
      panelTitle: "Marketplace decisions are budget decisions.",
      panelText:
        "A plan with the lowest monthly premium may not be the lowest-cost option once prescriptions, doctors, deductibles, and copays are included.",
    },
    life: {
      eyebrow: "Life insurance",
      headline: "Coverage for family protection and final expenses.",
      text:
        "Discuss term life, whole life, and final expense insurance in the context of your budget, beneficiaries, and long-term needs.",
      products: ["Term life", "Whole life", "Final expense"],
      productText:
        "Review coverage amount, duration, eligibility, and affordability before choosing a policy.",
      cta: "Book a free consultation.",
      ctaButton: "Contact the agency",
    },
    contact: {
      eyebrow: "Contact",
      headline: "Schedule a free consultation.",
      text:
        "Please contact the agency with questions or to schedule a plan review. You are not obligated to enroll in any plan after a consultation.",
      officeTitle: "Reach the office",
      scheduleTitle: "Book online",
      scheduleText:
        "Use our scheduling page to choose a consultation time that works for you.",
      consentTitle: "Consent notice",
      consentText:
        "By submitting contact information by phone or email, you acknowledge that a licensed insurance agent may contact you by phone, email, or mail to discuss Medicare Advantage Plans, Medicare Supplement Insurance, Prescription Drug Plans, or Marketplace health insurance.",
    },
    privacy: {
      eyebrow: "Privacy policy",
      headline: "How Integrity Insurance LLC handles information.",
      paragraphs: [
        "This website is owned by Integrity Insurance LLC, Ellicott City, Maryland. We collect personal information such as name, contact details, and inquiries when visitors contact us. We may also collect information about site usage through cookies and similar tools.",
        "Information may be used to respond to inquiries, personalize service, provide support, protect against fraud, exercise legal rights, and conduct analytics or marketing. If information provided to us is combined with protected health information subject to HIPAA, we will protect it consistent with applicable obligations.",
        "By using this site and contacting the agency, you consent to the collection and use of information as described here, including phone, text, email, or mail communications. You may opt out of marketing communications at any time.",
        "We are not responsible for the privacy practices of third-party websites linked from this site. Visitors from outside the United States consent to transfer and processing of information under U.S. law.",
        "Last updated May 2, 2026.",
      ],
    },
  },
  zh: {
    nav: {
      medicare: "联邦医保",
      marketplace: "Marketplace 健康保险",
      articles: "文章",
      contact: "联系",
    },
    common: {
      call: "致电",
      coverage: "保险服务",
      contact: "联系方式",
      privacy: "隐私政策",
      medicarePlans: "联邦医保计划",
      marketplacePlans: "Marketplace 健康保险",
      lifeInsurance: "人寿保险",
      copyright: "版权所有。",
      readArticle: "阅读文章",
      viewAllArticles: "查看全部文章",
      backToArticles: "返回文章列表",
      originallyPreparedFor: "原稿用于：",
      requestConsultation: "预约咨询",
      scheduleMeeting: "在线预约",
      startReview: "开始计划评估",
    },
    home: {
      eyebrow: "持牌健康保险代理机构",
      headline: "Integrity Insurance LLC",
      lede:
        "为需要清晰选择、耐心解释和全年支持的客户，提供本地联邦医保与 Marketplace 健康保险咨询。",
      heroAlt: "保险咨询桌面，上面有文件和笔记本电脑",
      statTitle: "个性化",
      statText: "联邦医保与 Marketplace 计划咨询",
      whatWeDo: "我们的服务",
      whatWeDoHeadline: "无压力地解释保险选择。",
      whatWeDoText:
        "Integrity Insurance LLC 帮助个人和家庭在投保前了解注册时间、计划结构、处方药承保、医生网络以及预计费用。",
      services: [
        {
          title: "联邦医保咨询",
          text: "与持牌代理一起比较联邦医保优势计划、联邦医保补充保险和 Part D 选择，并了解实际取舍。",
          href: "/medicare",
        },
        {
          title: "Marketplace 健康保险",
          text: "评估 ACA Marketplace 保险、补贴资格、医生网络和特别注册期相关问题。",
          href: "/marketplace",
        },
        {
          title: "人寿保险规划",
          text: "讨论定期寿险、终身寿险和最终费用保险，用于家庭保障和长期规划。",
          href: "/life-insurance",
        },
      ],
      processEyebrow: "咨询流程",
      processHeadline: "从第一个问题到投保，务实地逐步评估。",
      process: [
        "了解医生、处方药、预算和时间安排。",
        "用清楚语言并排比较可选方案。",
        "协助投保，并每年帮助复查变化。",
      ],
      articlesEyebrow: "每周报纸文章",
      articlesHeadline: "近期联邦医保与 Marketplace 资讯。",
    },
    articles: {
      title: "文章",
      headline: "联邦医保与 Marketplace 健康保险专栏。",
      text:
        "为本地读者撰写的每周教育文章，也发布在这里，方便客户集中查找实用资讯。",
    },
    medicare: {
      eyebrow: "联邦医保",
      headline: "更容易比较的联邦医保选择。",
      text:
        "无论您是首次投保、转换计划，还是复查当前保险，持牌代理都可以帮助您理解福利、网络、处方药和预计费用。",
      reviewTitle: "我们可以协助评估",
      items: [
        "联邦医保优势计划选项",
        "联邦医保补充保险",
        "处方药计划",
        "年度开放注册期变化",
        "医生、医院和药房网络",
      ],
      panelTitle: "首次咨询重点",
      panelText:
        "请准备联邦医保卡、处方药清单、常用医生和药房名称。评估会重点说明计划细节如何影响实际就医，而不仅是保费。",
    },
    marketplace: {
      eyebrow: "Marketplace 健康保险",
      headline: "为个人和家庭提供 ACA 计划协助。",
      text:
        "在本地指导下比较保费、免赔额、医生网络、处方药承保、补贴资格和注册时间。",
      reviewTitle: "常见评估原因",
      items: [
        "失去雇主保险",
        "家庭、收入或住址变化",
        "开放注册期计划比较",
        "医生或处方药变化",
        "关于税收抵免和费用分摊减免的问题",
      ],
      panelTitle: "Marketplace 选择也是预算选择。",
      panelText:
        "如果把处方药、医生、免赔额和共付额计算在内，月保费最低的计划未必是总成本最低的选择。",
    },
    life: {
      eyebrow: "人寿保险",
      headline: "用于家庭保障和最终费用的保险。",
      text:
        "结合您的预算、受益人和长期需求，讨论定期寿险、终身寿险和最终费用保险。",
      products: ["定期寿险", "终身寿险", "最终费用保险"],
      productText: "选择保单前，评估保额、期限、资格和负担能力。",
      cta: "预约免费咨询。",
      ctaButton: "联系代理机构",
    },
    contact: {
      eyebrow: "联系",
      headline: "预约免费咨询。",
      text:
        "如有问题或需要安排计划评估，请联系本机构。免费咨询后，您没有义务购买任何计划。",
      officeTitle: "联系办公室",
      scheduleTitle: "在线预约",
      scheduleText: "通过我们的预约页面选择适合您的咨询时间。",
      consentTitle: "联系同意说明",
      consentText:
        "通过电话或电子邮件提交联系信息，即表示您确认持牌保险代理可能通过电话、电子邮件或邮件联系您，讨论联邦医保优势计划、联邦医保补充保险、处方药计划或 Marketplace 健康保险。",
    },
    privacy: {
      eyebrow: "隐私政策",
      headline: "Integrity Insurance LLC 如何处理信息。",
      paragraphs: [
        "本网站由 Integrity Insurance LLC 所有，位于马里兰州 Ellicott City。当访客联系我们时，我们会收集姓名、联系方式和咨询内容等个人信息。我们也可能通过 Cookie 或类似工具收集网站使用信息。",
        "信息可能用于回复咨询、个性化服务、提供支持、防止欺诈、行使合法权利，以及进行分析或营销。如果您提供的信息与受 HIPAA 约束的受保护健康信息结合，我们将按照适用义务进行保护。",
        "使用本网站并联系本机构，即表示您同意我们按此处说明收集和使用信息，包括通过电话、短信、电子邮件或邮件进行沟通。您可以随时选择退出营销沟通。",
        "对于本网站链接到的第三方网站，我们不对其隐私做法负责。美国境外访客同意信息按美国法律转移和处理。",
        "最后更新日期：2026 年 5 月 2 日。",
      ],
    },
  },
} as const;
