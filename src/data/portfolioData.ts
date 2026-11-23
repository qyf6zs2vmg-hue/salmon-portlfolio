export type ProjectFilterCategory =
  | 'Avtomobil'
  | 'Texnologiya'
  | 'Brend tajribasi';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  filterKey: ProjectFilterCategory;
  category: string;
  subtitle: string;
  visualCharacter: string;
  imageUrl: string;
  imageAlt: string;
  surfaceBg: string;
  surfaceText: string;
  accentHex: string;
  palette: string[];
  layoutVariant:
    | 'tesla-cinematic'
    | 'xiaomi-wide'
    | 'snickers-experimental'
    | 'gallery-wide'
    | 'gallery-compact';
}

export type SkillLevelLabel = 'Kuchli' | 'Yaxshi' | 'O‘rta';

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevelLabel;
  steps: 1 | 2 | 3;
  relatedIds: string[];
}

export interface SkillGroup {
  id: string;
  index: string;
  title: string;
  accentColor: string;
  skills: SkillItem[];
}

export interface ServiceItem {
  index: string;
  title: string;
  descriptor: string;
  iconKey:
    | 'layout'
    | 'briefcase'
    | 'cart'
    | 'palette'
    | 'smartphone'
    | 'code'
    | 'layers'
    | 'database'
    | 'refresh'
    | 'sparkles';
  accentBg: string;
  accentInk: string;
}

export const PROFILE = {
  fullName: 'Salmon Davronov',
  initials: 'SD',
  role: 'Web Developer & UI/UX Designer',
  location: 'Toshkent, O‘zbekiston',
  education: 'Maktab o‘quvchisi',
  experienceSummary: 'Taxminan 5 yillik qiziqish va amaliyot',
  projectCountLabel: '~16 ta veb-sayt va loyihalar',
};

export const ABOUT_PARAGRAPHS = [
  'Men Salmon Davronov — Web Developer va UI/UX Designer. Taxminan 5 yildan beri web development va UI/UX dizayn sohasiga qiziqib, turli loyihalar ustida ishlab kelaman.',
  'Men uchun web development shunchaki kod yozish emas, balki g‘oyalarni real raqamli mahsulotlarga aylantirish imkoniyatidir. Kreativ fikrlash, zamonaviy texnologiyalar va dizayn uyg‘unligi orqali insonlar uchun qulay, chiroyli va funksional yechimlar yaratishga intilaman.',
  'Men mustaqil ishlashni, yangi texnologiyalarni o‘rganishni va har bir loyihada yangi tajriba orttirishni yaxshi ko‘raman.',
];

export const PERSONAL_QUALITIES = [
  'Kreativ fikrlash',
  'Detallarga e’tibor',
  'Zamonaviy dizaynga qiziqish',
  'Muammolarni hal qilish',
  'Mustaqil ishlash',
  'Doimiy o‘rganish',
];

export const WORK_EXPERIENCE_ITEMS = [
  'Mustaqil dasturchi va dizayner',
  'Shaxsiy loyihalar va amaliy tajribalar',
  'Mijozlar uchun loyihalar',
  'Asosan mustaqil faoliyat',
];

export const FUTURE_GOALS = [
  'Kuchli Full-Stack Developer bo‘lish',
  'Yuqori sifatli raqamli mahsulotlar yaratish',
  'Shaxsiy kreativ development studiyasini tashkil etish',
];

export const SPOKEN_LANGUAGES = ['O‘zbek tili', 'Ingliz tili', 'Rus tili'];

export const ABOUT_SCULPTURE = {
  src: '/src/assets/images/about_sculptural_forms_1795181606143.jpg',
  alt: 'Abstrakt geometrik shakllar va suzuvchi kobalt sferalardan tashkil topgan kreativ kompozitsiya',
};

export const HERO_HIGHLIGHTS = [
  { value: '~5 yil', label: 'Qiziqish va amaliy tajriba' },
  { value: '~16', label: 'Yaratilgan veb-sayt va loyihalar' },
  { value: '10', label: 'Asosiy xizmat yo‘nalishlari' },
  { value: '7', label: 'Namoyish etilgan veb-loyihalar' },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'tesla-digital',
    index: '01',
    title: 'Tesla',
    filterKey: 'Avtomobil',
    category: 'Avtomobil / Veb-sayt dizayni',
    subtitle: 'Tesla raqamli tajribasidan ilhomlangan zamonaviy avtomobil veb-sayti konsepsiyasi.',
    visualCharacter: 'Minimal · Premium · Kinematografik · Avtomobil',
    imageUrl: '/assets/aistudio/photo_4_2026-11-23_18-16-09_c9b3107f.jpg',
    imageAlt: 'Tesla Model 3 avtomobil veb-sayti bosh sahifa skrinshoti',
    surfaceBg: '#101014',
    surfaceText: '#F3F0E8',
    accentHex: '#C7FF3D',
    palette: ['#101014', '#F3F0E8', '#4C5BFF', '#C7FF3D'],
    layoutVariant: 'tesla-cinematic',
  },
  {
    id: 'xiaomi-commerce',
    index: '02',
    title: 'Xiaomi',
    filterKey: 'Texnologiya',
    category: 'Texnologiya / E-commerce veb-sayt',
    subtitle: 'Mahsulotga yo‘naltirilgan toza interfeysli zamonaviy texnologiya veb-sayti konsepsiyasi.',
    visualCharacter: 'Minimal · Nafis · Zamonaviy · Texnologik',
    imageUrl: '/assets/aistudio/photo_2_2026-11-23_18-16-09_b69cb8ea.jpg',
    imageAlt: 'Xiaomi 18 Pro Max mahsulot veb-sayti skrinshoti',
    surfaceBg: '#C7FF3D',
    surfaceText: '#101014',
    accentHex: '#4C5BFF',
    palette: ['#C7FF3D', '#F3F0E8', '#FF654F', '#101014'],
    layoutVariant: 'xiaomi-wide',
  },
  {
    id: 'snickers-experience',
    index: '03',
    title: 'Snickers',
    filterKey: 'Brend tajribasi',
    category: 'Brend tajribasi / Kreativ veb-sayt',
    subtitle: 'Snickers uchun rang-barang, jo‘shqin va qiziqarli promo veb-sayt konsepsiyasi.',
    visualCharacter: 'Dadil · O‘ynoqi · Energiyali · Rang-barang',
    imageUrl: '/assets/aistudio/photo_1_2026-11-23_18-16-09_2a55b832.jpg',
    imageAlt: 'Snickers Almond promo veb-sayti skrinshoti',
    surfaceBg: '#FF654F',
    surfaceText: '#F3F0E8',
    accentHex: '#C7FF3D',
    palette: ['#FF654F', '#4C5BFF', '#C7FF3D', '#101014'],
    layoutVariant: 'snickers-experimental',
  },
  {
    id: 'bentley-luxury',
    index: '04',
    title: 'Bentley',
    filterKey: 'Brend tajribasi',
    category: 'Brend tajribasi / Veb-sayt dizayni',
    subtitle: 'Bentley hashamatli kolleksiyasi uchun yaratilgan veb-sayt loyihasi.',
    visualCharacter: 'Hashamatli · To‘q · Nafis · Klassik',
    imageUrl: '/assets/aistudio/photo_3_2026-11-23_18-16-09_156f00ef.jpg',
    imageAlt: 'Bentley kolleksiyalari veb-sayti skrinshoti',
    surfaceBg: '#17171C',
    surfaceText: '#F3F0E8',
    accentHex: '#C7FF3D',
    palette: ['#101014', '#F3F0E8', '#166534', '#A1A1AA'],
    layoutVariant: 'gallery-wide',
  },
  {
    id: 'bmw-electric',
    index: '05',
    title: 'BMW',
    filterKey: 'Avtomobil',
    category: 'Avtomobil / Veb-sayt dizayni',
    subtitle: 'BMW Group va yangi BMW i3 modeli uchun yaratilgan veb-sayt loyihasi.',
    visualCharacter: 'Dinamik · Tungi · Texnologik · Avtomobil',
    imageUrl: '/assets/aistudio/photo_6_2026-11-23_18-16-09_2fcd10fb.jpg',
    imageAlt: 'BMW i3 veb-sayti bosh sahifa skrinshoti',
    surfaceBg: '#4C5BFF',
    surfaceText: '#F3F0E8',
    accentHex: '#C7FF3D',
    palette: ['#4C5BFF', '#101014', '#F3F0E8', '#38BDF8'],
    layoutVariant: 'gallery-compact',
  },
  {
    id: 'mercedes-editorial',
    index: '06',
    title: 'Mercedes',
    filterKey: 'Avtomobil',
    category: 'Avtomobil / Veb-sayt dizayni',
    subtitle: 'Mercedes-AMG GT SUV va 140 yillik ekspozitsiya veb-sayti loyihasi.',
    visualCharacter: 'Editorial · Oq · Minimal · Avtomobil',
    imageUrl: '/assets/aistudio/photo_7_2026-11-23_18-16-09_a14c8ffd.jpg',
    imageAlt: 'Mercedes-AMG GT SUV veb-sayti skrinshoti',
    surfaceBg: '#E6E1D5',
    surfaceText: '#101014',
    accentHex: '#4C5BFF',
    palette: ['#E6E1D5', '#F3F0E8', '#101014', '#FF654F'],
    layoutVariant: 'gallery-compact',
  },
  {
    id: 'apple-continuity',
    index: '07',
    title: 'Apple Ecosystem',
    filterKey: 'Texnologiya',
    category: 'Texnologiya / Veb-sayt dizayni',
    subtitle: 'iPhone, Mac va Apple qurilmalari integratsiyasi interfeysi loyihasi.',
    visualCharacter: 'Toza · Interaktiv · Zamonaviy · Texnologiya',
    imageUrl: '/assets/aistudio/photo_5_2026-11-23_18-16-09_91979f02.jpg',
    imageAlt: 'iPhone and Mac ekotizimi veb-sayt interfeysi skrinshoti',
    surfaceBg: '#101014',
    surfaceText: '#F3F0E8',
    accentHex: '#FF654F',
    palette: ['#101014', '#F3F0E8', '#4C5BFF', '#FF654F'],
    layoutVariant: 'gallery-wide',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'programming',
    index: '01',
    title: 'Dasturlash',
    accentColor: '#4C5BFF',
    skills: [
      { id: 'html', name: 'HTML', level: 'Kuchli', steps: 3, relatedIds: ['css', 'js', 'react'] },
      { id: 'css', name: 'CSS', level: 'Kuchli', steps: 3, relatedIds: ['html', 'figma', 'react'] },
      { id: 'js', name: 'JavaScript', level: 'Kuchli', steps: 3, relatedIds: ['html', 'react', 'rest-api'] },
    ],
  },
  {
    id: 'frameworks',
    index: '02',
    title: 'Freymvork va kutubxonalar',
    accentColor: '#C7FF3D',
    skills: [
      { id: 'react', name: 'React.js', level: 'O‘rta', steps: 1, relatedIds: ['js', 'css', 'firebase', 'rest-api'] },
    ],
  },
  {
    id: 'design',
    index: '03',
    title: 'UI/UX va Grafik dizayn',
    accentColor: '#FF654F',
    skills: [
      { id: 'figma', name: 'Figma', level: 'Yaxshi', steps: 2, relatedIds: ['css', 'photoshop', 'illustrator'] },
      { id: 'photoshop', name: 'Adobe Photoshop', level: 'O‘rta', steps: 1, relatedIds: ['figma', 'illustrator'] },
      { id: 'illustrator', name: 'Adobe Illustrator', level: 'O‘rta', steps: 1, relatedIds: ['figma', 'photoshop'] },
    ],
  },
  {
    id: 'backend-db',
    index: '04',
    title: 'Backend, Ma’lumotlar bazasi va API',
    accentColor: '#4C5BFF',
    skills: [
      { id: 'firebase', name: 'Firebase', level: 'Yaxshi', steps: 2, relatedIds: ['react', 'supabase', 'rest-api'] },
      { id: 'supabase', name: 'Supabase', level: 'Yaxshi', steps: 2, relatedIds: ['firebase', 'mysql', 'rest-api'] },
      { id: 'mysql', name: 'MySQL', level: 'Yaxshi', steps: 2, relatedIds: ['supabase', 'mongodb'] },
      { id: 'mongodb', name: 'MongoDB', level: 'Yaxshi', steps: 2, relatedIds: ['mysql', 'rest-api'] },
      { id: 'rest-api', name: 'REST API', level: 'Yaxshi', steps: 2, relatedIds: ['js', 'react', 'firebase'] },
    ],
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    index: '01',
    title: 'Landing Page yaratish',
    descriptor: 'Tezkor yuklanadigan, ta’sirchan bir sahifali veb-taqdimot.',
    iconKey: 'layout',
    accentBg: '#C7FF3D',
    accentInk: '#101014',
  },
  {
    index: '02',
    title: 'Business website yaratish',
    descriptor: 'Kompaniya ishonchini oshiruvchi tizimli korporativ sayt.',
    iconKey: 'briefcase',
    accentBg: '#4C5BFF',
    accentInk: '#F3F0E8',
  },
  {
    index: '03',
    title: 'E-commerce / Online shop',
    descriptor: 'Mahsulot katalogi va qulay xarid oqimiga ega onlayn do‘kon.',
    iconKey: 'cart',
    accentBg: '#FF654F',
    accentInk: '#F3F0E8',
  },
  {
    index: '04',
    title: 'UI/UX Design',
    descriptor: 'Foydalanuvchi mantiqiga asoslangan estetik interfeys tizimi.',
    iconKey: 'palette',
    accentBg: '#C7FF3D',
    accentInk: '#101014',
  },
  {
    index: '05',
    title: 'Responsive website',
    descriptor: 'Telefon, planshet va katta ekranlarda mukammal moslashuv.',
    iconKey: 'smartphone',
    accentBg: '#4C5BFF',
    accentInk: '#F3F0E8',
  },
  {
    index: '06',
    title: 'React.js development',
    descriptor: 'Modulli komponentlar va tezkor interaktiv frontend arxitekturasi.',
    iconKey: 'code',
    accentBg: '#FF654F',
    accentInk: '#F3F0E8',
  },
  {
    index: '07',
    title: 'Web application yaratish',
    descriptor: 'Murakkab jarayonlarni soddalashtiruvchi to‘liq veb-ilova.',
    iconKey: 'layers',
    accentBg: '#C7FF3D',
    accentInk: '#101014',
  },
  {
    index: '08',
    title: 'Database integration',
    descriptor: 'Firebase, Supabase, MySQL va MongoDB bilan ishonchli bog‘lash.',
    iconKey: 'database',
    accentBg: '#4C5BFF',
    accentInk: '#F3F0E8',
  },
  {
    index: '09',
    title: 'Website redesign',
    descriptor: 'Eskirgan saytlarni zamonaviy vizual til va tezlikka o‘tkazish.',
    iconKey: 'refresh',
    accentBg: '#FF654F',
    accentInk: '#F3F0E8',
  },
  {
    index: '10',
    title: 'Brand / Web design',
    descriptor: 'Brend xarakterini aks ettiruvchi noyob vizual yo‘nalish.',
    iconKey: 'sparkles',
    accentBg: '#C7FF3D',
    accentInk: '#101014',
  },
];
