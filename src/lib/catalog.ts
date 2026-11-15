import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseDocument } from 'yaml';

export interface Credit { personagem: string; foto: string | null; falas: number; dublador: string }
export interface Person { id: string; nome: string; foto: string | null; data_publicacao: string | null }
export interface Film {
  id: string; titulo: string; youtube: string; ano: number | null; genero: string | null;
  duracao: string | null; data_publicacao: string | null; sinopse: string | null;
  cartaz: string | null; banner: string | null; referencias: Record<string, string | null>; elenco: Credit[];
}
export interface Version { id: string; versao: string; data_publicacao: string | null; nota: string }
export interface Catalog { filmes: Film[]; dubladores: Person[]; versoes: Version[] }
export interface Role extends Credit { filme: Film }
export interface Post { id: string; titulo: string; tipo: 'Filme' | 'Dublador' | 'Atualização do site'; data: string | null; href?: string; nota?: string }
const collator = new Intl.Collator('pt-BR');
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fail = (label: string, message: string): never => { throw new Error(`${label}: ${message}`); };

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(label, 'esperado um objeto YAML');
  return value as Record<string, unknown>;
}
function string(value: unknown, label: string, required = false): string | null {
  if (value == null || value === '') {
    if (required) fail(label, 'preenchimento obrigatório');
    return null;
  }
  if (typeof value !== 'string' || !value.trim()) fail(label, 'esperado texto não vazio');
  return value as string;
}
function date(value: unknown, label: string): string | null {
  const result = string(value, label);
  if (result && (!/^\d{4}-\d{2}-\d{2}$/.test(result) || !Number.isFinite(Date.parse(result)) || new Date(result).toISOString().slice(0, 10) !== result)) fail(label, 'use uma data válida AAAA-MM-DD');
  return result;
}
function url(value: unknown, label: string, required = false): string | null {
  const result = string(value, label, required);
  if (result) {
    let parsed: URL;
    try { parsed = new URL(result); } catch { return fail(label, 'URL inválida'); }
    if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password) fail(label, 'use URL HTTP(S) sem credenciais');
  }
  return result;
}
function asset(value: unknown, label: string): string | null {
  const result = string(value, label);
  if (result && !/^\/artes\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:svg|png|jpe?g|webp|avif)$/.test(result)) fail(label, 'use /artes/arquivo.svg, png, jpg, webp ou avif');
  if (result && !existsSync(resolve('public', result.slice(1)))) fail(label, 'imagem não encontrada em public/artes');
  return result;
}
function records(root: string, folder: string): Record<string, unknown>[] {
  const directory = resolve(root, folder);
  if (!existsSync(directory)) return [];
  const ids = new Set<string>();
  return readdirSync(directory).filter(name => /\.ya?ml$/.test(name)).sort().map(name => {
    const id = name.replace(/\.ya?ml$/, '');
    if (!idPattern.test(id) || ids.has(id)) fail(name, 'identificador inválido ou duplicado');
    ids.add(id);
    const document = parseDocument(readFileSync(resolve(directory, name), 'utf8'), { uniqueKeys: true });
    if (document.errors.length) fail(name, document.errors.map(error => error.message).join('; '));
    const data = object(document.toJS(), name);
    if ('id' in data) fail(name, 'o identificador vem do nome do arquivo; remova o campo id');
    return { ...data, id };
  });
}

export function loadCatalog(root = resolve('cadastros')): Catalog {
  const dubladores = records(root, 'dubladores').map(data => ({
    id: data.id as string, nome: string(data.nome, `${data.id}.nome`, true)!,
    foto: asset(data.foto, `${data.id}.foto`), data_publicacao: date(data.data_publicacao, `${data.id}.data_publicacao`),
  })).sort((a, b) => collator.compare(a.nome, b.nome));
  const people = new Set(dubladores.map(person => person.id));
  const filmes = records(root, 'filmes').map((data): Film => {
    const id = data.id as string;
    if (data.ano != null && (!Number.isInteger(data.ano) || Number(data.ano) < 1888 || Number(data.ano) > 9999)) fail(`${id}.ano`, 'esperado ano com quatro dígitos a partir de 1888');
    const duracao = string(data.duracao, `${id}.duracao`);
    if (duracao && !/^(?:[1-9]\d* min|[1-9]\d*h(?: [0-5]?\d min)?)$/.test(duracao)) fail(`${id}.duracao`, 'use 80 min ou 1h 20 min');
    const youtube = url(data.youtube, `${id}.youtube`, true)!;
    if (!['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'].includes(new URL(youtube).hostname)) fail(`${id}.youtube`, 'esperado endereço do YouTube');
    const references = data.referencias == null ? {} : object(data.referencias, `${id}.referencias`);
    const referencias = Object.fromEntries(['imdb', 'rotten_tomatoes', 'letterboxd'].map(key => [key, url(references[key], `${id}.referencias.${key}`)]));
    if (!Array.isArray(data.elenco) || !data.elenco.length) fail(`${id}.elenco`, 'adicione ao menos um crédito');
    const elenco = (data.elenco as unknown[]).map((value, index): Credit => {
      const label = `${id}.elenco[${index}]`;
      const credit = object(value, label);
      const dublador = string(credit.dublador, `${label}.dublador`, true)!;
      if (!people.has(dublador)) fail(label, `dublador inexistente: ${dublador}`);
      if (!Number.isInteger(credit.falas) || Number(credit.falas) < 0) fail(label, 'falas deve ser inteiro não negativo');
      return { personagem: string(credit.personagem, `${label}.personagem`, true)!, foto: asset(credit.foto, `${label}.foto`), falas: Number(credit.falas), dublador };
    });
    return { id, titulo: string(data.titulo, `${id}.titulo`, true)!, youtube, ano: data.ano == null ? null : Number(data.ano),
      genero: string(data.genero, `${id}.genero`), duracao, data_publicacao: date(data.data_publicacao, `${id}.data_publicacao`),
      sinopse: string(data.sinopse, `${id}.sinopse`), cartaz: asset(data.cartaz, `${id}.cartaz`), banner: asset(data.banner, `${id}.banner`), referencias, elenco };
  }).sort((a, b) => collator.compare(a.titulo, b.titulo));
  const versoes = records(root, 'versoes').map(data => ({ id: data.id as string, versao: string(data.versao, `${data.id}.versao`, true)!,
    data_publicacao: date(data.data_publicacao, `${data.id}.data_publicacao`), nota: string(data.nota, `${data.id}.nota`, true)! }));
  return { filmes, dubladores, versoes };
}
export function rolesFor(id: string, films: Film[]): Role[] {
  return films.flatMap(filme => filme.elenco.filter(credit => credit.dublador === id).map(credit => ({ ...credit, filme })))
    .sort((a, b) => b.falas - a.falas || collator.compare(a.personagem, b.personagem) || collator.compare(a.filme.titulo, b.filme.titulo));
}
export function feedFor(catalog: Catalog, preview: boolean): Post[] {
  const posts: Post[] = [
    ...catalog.filmes.map(f => ({ id: `filme-${f.id}`, titulo: f.titulo, tipo: 'Filme' as const, data: f.data_publicacao, href: `/filmes/${f.id}/` })),
    ...catalog.dubladores.map(p => ({ id: `dublador-${p.id}`, titulo: p.nome, tipo: 'Dublador' as const, data: p.data_publicacao, href: `/dubladores/${p.id}/` })),
    ...catalog.versoes.map(v => ({ id: `versao-${v.id}`, titulo: `Versão ${v.versao}`, tipo: 'Atualização do site' as const, data: v.data_publicacao, nota: v.nota })),
  ];
  const order = { Filme: 0, Dublador: 1, 'Atualização do site': 2 };
  return posts.filter(post => preview || post.data).sort((a, b) => (b.data ?? '9999-12-31').localeCompare(a.data ?? '9999-12-31') || order[a.tipo] - order[b.tipo] || collator.compare(a.titulo, b.titulo));
}
export function publicCatalog(catalog: Catalog): Catalog {
  const dubladores = catalog.dubladores.filter(person => person.data_publicacao);
  const ids = new Set(dubladores.map(person => person.id));
  const filmes = catalog.filmes.filter(film => film.data_publicacao);
  for (const film of filmes) for (const credit of film.elenco) if (!ids.has(credit.dublador)) fail(film.id, `o perfil ${credit.dublador} precisa de data para acompanhar o filme público`);
  return { filmes, dubladores, versoes: catalog.versoes.filter(version => version.data_publicacao) };
}
export const formatDate = (value: string) => new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
export const initials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toLocaleUpperCase('pt-BR');
