import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://atsmartliving.com';
  const currentDate = new Date().toISOString();

  const coreRoutes = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/experience-center',
    '/careers',
    '/terms',
    '/privacy',
  ];

  const residentialRoutes = [
    '/residential',
    '/residential/lighting-automation',
    '/residential/curtain-automation',
    '/residential/mdu-automation',
    '/residential/audio-video-automation',
    '/residential/security-automation',
    '/residential/wifi-networking',
    '/residential/brochure-download',
  ];

  const hospitalityRoutes = [
    '/hospitality',
    '/hospitality/public-area-automation',
    '/hospitality/boardroom-automation',
    '/hospitality/banquet-hall-automation',
    '/hospitality/restaurant-automation',
    '/hospitality/spa-and-wellness',
    '/hospitality/guest-room-automation',
  ];

  const commercialRoutes = [
    '/commercial',
    '/commercial/restaurant-automation',
    '/commercial/office-automation',
    '/commercial/institutes',
    '/commercial/exhibitions',
    '/commercial/retail-automation',
    '/commercial/multiplexes',
    '/commercial/airport-lounges',
  ];

  const disciplineRoutes = [
    '/disciplines/lighting-automation',
    '/disciplines/audio-video',
    '/disciplines/shade-automation',
    '/disciplines/hvac-automation',
    '/disciplines/security-automation',
    '/disciplines/wifi-automation',
    '/disciplines/amc',
  ];

  const projectSlugs = [
    'horizon-estate',
    'lumina-hq',
    'azure-resort',
    'penthouse-42',
    'silicon-valley',
    'glass-house',
    'dixit-nene',
    'rajan-mittal',
    'bkt-farms',
  ];

  const blogSlugs = [
    'building-a-market-before-the-market-existed',
    'starting-anusha-technovision-building-from-trust',
    'preparation-meets-opportunity',
    'the-invisible-interface',
  ];

  const allStaticRoutes = [
    ...coreRoutes.map(path => ({ path, priority: path === '' ? 1.0 : 0.8, changeFrequency: 'weekly' as const })),
    ...residentialRoutes.map(path => ({ path, priority: 0.9, changeFrequency: 'monthly' as const })),
    ...hospitalityRoutes.map(path => ({ path, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...commercialRoutes.map(path => ({ path, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...disciplineRoutes.map(path => ({ path, priority: 0.8, changeFrequency: 'monthly' as const })),
    ...projectSlugs.map(slug => ({ path: `/projects/${slug}`, priority: 0.75, changeFrequency: 'monthly' as const })),
    ...blogSlugs.map(slug => ({ path: `/blog/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const })),
  ];

  return allStaticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }));
}
