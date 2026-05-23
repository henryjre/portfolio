import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const routes = ['', '/projects', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : 0.8,
  }));
}
