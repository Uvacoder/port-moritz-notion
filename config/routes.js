import { defaultSEO, extendSEO } from './seo.ts'

const routes = {
  home: {
    label: 'Home',
    path: '/',
    seo: defaultSEO,
  }, 
  production: {
    label: 'Music',
    path: '/production',
    seo: extendSEO({
      title: 'Production',
      url: 'production',
    }),
  },
  writing: {
    title: 'Writing',
    label: 'Writing',
    path: '/writing',
    seo: extendSEO({
      title: 'Writing',
      description: 'Small learnings which can be digested quick and easy.',
      url: 'writing',
    }),
  },
}

export default routes