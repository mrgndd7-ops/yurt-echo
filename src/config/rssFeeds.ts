// RSS feed URL'lerini buraya yapıştırın
// Boş bırakılan kategoriler statik içerikle gösterilir
// Birden fazla feed için dizi kullanın: ['url1', 'url2']

export const RSS_FEEDS: Record<string, string | string[]> = {
  gundem: 'https://www.yenisafak.com/rss?xml=gundem',
  siyaset: 'https://www.yenisafak.com/rss-feeds?category=politika',
  guvenlik: 'https://www.dirilispostasi.com/rss',
  savunma: [
    'https://www.dirilispostasi.com/rss/savunma-sanayi',
    'https://www.yenisafak.com/rss-feeds?category=savunma-sanayi',
  ],
  dunya: 'https://www.dirilispostasi.com/rss/dunya',
  ekonomi: 'https://www.yenisafak.com/rss-feeds?category=turkiye-ekonomisi',
  tarih: 'https://www.ahaber.com.tr/rss/tarih.xml',
  analiz: 'https://www.dirilispostasi.com/rss/yorum',
};