
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Dolat-Website/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Dolat-Website"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Dolat-Website",
    "route": "/Dolat-Website/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 15597, hash: '8805cd7bb2b44a458667d82965fc85a5131eb9396a5af82e9bba84d7928ec8ba', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2998, hash: '3f7e006ad20c85e15027673727213b8109caa7f6b502ddba1cedd241f6191286', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 109120, hash: 'd663fca3f2a76003136ba2f919ffd5881db5d614805784033dad712fef76c64d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6B6J3JEC.css': {size: 13982, hash: 'k+j6gLbXYOg', text: () => import('./assets-chunks/styles-6B6J3JEC_css.mjs').then(m => m.default)}
  },
};
