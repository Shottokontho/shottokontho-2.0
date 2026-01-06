
import { Article, Category, Language, User } from './types';

export const CATEGORIES_LIST = [
  { id: Category.DAILY, bn: 'প্রতিদিনের খবর', en: 'Daily News' },
  { id: Category.NATIONAL, bn: 'জাতীয়', en: 'National' },
  { id: Category.INTERNATIONAL, bn: 'আন্তর্জাতিক', en: 'International' },
  { id: Category.VIRAL, bn: 'ভাইরাল', en: 'Viral' },
  { id: Category.TRAVEL, bn: 'ভ্রমণ', en: 'Travel' },
  { id: Category.BUSINESS, bn: 'বাণিজ্য', en: 'Business' },
  { id: Category.SPORTS, bn: 'খেলাধুলা', en: 'Sports' },
  { id: Category.ENTERTAINMENT, bn: 'বিনোদন', en: 'Entertainment' },
  { id: Category.HEALTH, bn: 'স্বাস্থ্য', en: 'Health' },
  { id: Category.TECH, bn: 'প্রযুক্তি', en: 'Tech' }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Admin User',
  email: 'admin@shottokontho.com',
  aiSubscription: {
    expiryDate: '2026-12-31',
    isActive: true
  },
  investment: {
    sharePercentage: 1,
    amountInvested: 100000,
    totalROI: 18000
  },
  articlesPublished: ['daily-1', 'national-2', 'tech-3', 'viral-4']
};

const generateArticles = (): Article[] => {
  const articles: Article[] = [];
  const authors = ["Rahim Khan", "Sabbir Ahmed", "Nusrat Jahan", "Tanvir Hasan", "Admin User"];
  const authorIds = ["a1", "a2", "a3", "a4", "u1"];
  const date = "Jan 6, 2026";

  const videoMap: Record<Category, string> = {
    [Category.DAILY]: "dQw4w9WgXcQ",
    [Category.INTERNATIONAL]: "J_lS8YI0_jM",
    [Category.NATIONAL]: "X76iMv6U8gA",
    [Category.VIRAL]: "9bZkp7q19f0",
    [Category.TRAVEL]: "G5_W_h9lP5I",
    [Category.BUSINESS]: "7E0fNI_vFUA",
    [Category.SPORTS]: "M7lc1UVf-VE",
    [Category.ENTERTAINMENT]: "X_yS_xG-y-E",
    [Category.HEALTH]: "p_N-SREH-v0",
    [Category.TECH]: "vH_28T1e-m0"
  };

  CATEGORIES_LIST.forEach((cat) => {
    for (let i = 1; i <= 20; i++) {
      articles.push({
        id: `${cat.id}-${i}`,
        category: cat.id,
        title: {
          bn: `${cat.bn} এর বড় খবর ${i}: নতুন দিগন্ত উন্মোচিত`,
          en: `Major ${cat.en} News ${i}: New Horizons Unfolded`
        },
        summary: {
          bn: `এটি ${cat.bn} বিভাগের একটি গুরুত্বপূর্ণ সংবাদ। ২০২৬ সালের নতুন পরিবর্তনের প্রেক্ষাপটে এই খবরটি অত্যন্ত তাৎপর্যপূর্ণ।`,
          en: `This is an important update in the ${cat.en} sector. In the context of the new changes of 2026, this news is highly significant.`
        },
        content: {
          bn: `বিস্তারিত খবর... ২০২৬ সালের জানুয়ারি মাস থেকেই বাংলাদেশের প্রযুক্তি এবং অর্থনীতিতে বড় পরিবর্তন লক্ষ করা যাচ্ছে। বিশেষ করে ${cat.bn} বিভাগে আমূল পরিবর্তন এসেছে। শত্তকণ্ঠের অনুসন্ধানী প্রতিবেদনে উঠে এসেছে যে কীভাবে এই পরিবর্তন সাধারণ মানুষের জীবনে প্রভাব ফেলছে। ভবিষ্যতে এই ধারা অব্যাহত থাকলে আমরা একটি উন্নত বাংলাদেশের স্বপ্ন দেখতে পারি।`,
          en: `Detailed report... Since January 2026, significant changes have been observed in Bangladesh's technology and economy. Especially in the ${cat.en} sector, radical shifts have occurred. ShottoKontho's investigative report reveals how these changes are affecting the lives of ordinary people. If this trend continues, we can dream of a developed Bangladesh.`
        },
        image: `https://picsum.photos/seed/${cat.id}-${i}/800/450`,
        gallery: [
          `https://picsum.photos/seed/${cat.id}-g1-${i}/800/450`,
          `https://picsum.photos/seed/${cat.id}-g2-${i}/800/450`,
          `https://picsum.photos/seed/${cat.id}-g3-${i}/800/450`
        ],
        videoUrl: videoMap[cat.id],
        author: authors[i % authors.length],
        authorId: authorIds[i % authorIds.length],
        date: date,
        isBreaking: i === 1,
        views: Math.floor(Math.random() * 50000) + 1000
      });
    }
  });
  return articles;
};

export const MOCK_ARTICLES = generateArticles();

export const LANGUAGES = [
  { id: Language.BN, label: 'বাংলা' },
  { id: Language.EN, label: 'English' }
];
