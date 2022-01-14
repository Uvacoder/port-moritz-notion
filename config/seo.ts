const isProduction = process.env.NODE_ENV === 'production';
export const baseUrl = isProduction ? 'https://moritz.works' : ''

export const defaultSEO = {
  title: 'moritz.works',
  description: '',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'moritz.works',
    images: [
      {
        url: `${baseUrl}/static/og/default.png`,
        alt: 'Moritz',
      },
    ],
  },
  twitter: {
    handle: '@mrzmyr',
    site: '@mrzmyr',
    cardType: 'summary_large_image',
  },
};

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function extendSEO(options: SEOProps) {
  return {
    ...defaultSEO,
    ...options,
    url: `${baseUrl}/${options.url}`,
    openGraph: {
      ...defaultSEO.openGraph,
      url: `${baseUrl}/${options.url}`,
    },
  }
}