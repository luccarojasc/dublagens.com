import { loadCatalog, publicCatalog } from './catalog';
export const isPreview = process.env.ACERVO_PUBLICO !== '1';
const source = loadCatalog();
export const catalog = isPreview ? source : publicCatalog(source);
