import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { stringify } from 'yaml';
import { loadCatalog, rolesFor, feedFor, publicCatalog } from '../src/lib/catalog.ts';

const catalog = loadCatalog();
test('estreia preserva todos os créditos, sua ordem e as 1.329 falas', () => {
  const film = catalog.filmes[0];
  assert.equal(catalog.filmes.length, 1);
  assert.equal(catalog.dubladores.length, 7);
  assert.equal(film.elenco.length, 50);
  assert.equal(film.elenco.reduce((total, c) => total + c.falas, 0), 1329);
  const source = readFileSync('context/descricoes-deualoucanachapeuzinho.txt', 'utf8');
  const original = source.split(/\r?\n/).flatMap(line => {
    const match = line.match(/^(.+?)\s+-\s+(\d+)\s+-\s+(.+?)\s*$/);
    return match ? [{ personagem: match[1], falas: Number(match[2]), dublador: match[3].toLowerCase() }] : [];
  });
  assert.deepEqual(film.elenco, original);
  assert.deepEqual(film.elenco[0], { personagem: 'Narrador', falas: 18, dublador: 'dani' });
  assert.deepEqual(film.elenco.at(-1), { personagem: 'Mulher Europeia', falas: 5, dublador: 'primo' });
});
test('oito anúncios individuais e sete perfis; datas pendentes não entram na seleção pública', () => {
  assert.deepEqual(feedFor(catalog, true).map(post => post.titulo), ['Deu a Louca na Chapeuzinho', 'Dani', 'Lucca', 'Manga', 'Primo', 'Rafael', 'Rors', 'Tulera']);
  assert.equal(new Set(feedFor(catalog, true).map(post => post.href)).size, 8);
  assert.equal(feedFor(catalog, false).length, 0);
  assert.deepEqual(publicCatalog(catalog), { filmes: [], dubladores: [], versoes: [] });
  const counts = Object.fromEntries(catalog.dubladores.map(p => [p.id, rolesFor(p.id, catalog.filmes).length]));
  assert.deepEqual(counts, { dani: 7, lucca: 5, manga: 4, primo: 12, rafael: 6, rors: 7, tulera: 9 });
  assert.deepEqual(rolesFor('lucca', catalog.filmes).map(r => [r.personagem, r.falas]), [['Lobo',230],['Urso do campeonato',6],['backvocal triste',3],['Reporter 2',2],['Coral de Passaros 1',1]]);
});

function fixture(run: (root: string, write: (path: string, data: unknown) => void) => void) {
  const root = mkdtempSync(join(tmpdir(), 'dublagens-test-'));
  const write = (path: string, data: unknown) => {
    const file = join(root, path); mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, stringify(data));
  };
  try {
    write('dubladores/voz.yaml', { nome: 'Voz de teste', foto: null, data_publicacao: null });
    run(root, write);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
const movie = (extra: Record<string, unknown> = {}) => ({ titulo: 'Filme de teste', youtube: 'https://www.youtube.com/watch?v=teste', elenco: [{ personagem: 'Papel', falas: 0, dublador: 'voz' }], ...extra });

test('empates por personagem PT-BR e título, vários filmes e correções se propagam', () => fixture((root, write) => {
  write('filmes/zeta.yaml', movie({ titulo: 'Zeta', elenco: [{ personagem: 'Águia', falas: 3, dublador: 'voz' }, { personagem: 'Bode', falas: 3, dublador: 'voz' }] }));
  write('filmes/alfa.yaml', movie({ titulo: 'Alfa', elenco: [{ personagem: 'Águia', falas: 3, dublador: 'voz' }, { personagem: 'Lobo', falas: 8, dublador: 'voz' }] }));
  let data = loadCatalog(root);
  assert.deepEqual(rolesFor('voz', data.filmes).map(r => [r.personagem, r.filme.titulo]), [['Lobo','Alfa'],['Águia','Alfa'],['Águia','Zeta'],['Bode','Zeta']]);
  assert.equal(feedFor(data, true).filter(post => post.tipo === 'Dublador').length, 1);
  write('dubladores/voz.yaml', { nome: 'Nome corrigido', data_publicacao: '2026-11-01' });
  write('filmes/zeta.yaml', movie({ titulo: 'Zeta', elenco: [{ personagem: 'Bode', falas: 99, dublador: 'voz' }] }));
  data = loadCatalog(root);
  assert.equal(rolesFor('voz', data.filmes)[0].personagem, 'Bode');
  assert.equal(feedFor(data, true).find(post => post.tipo === 'Dublador')!.titulo, 'Nome corrigido');
}));
test('notas de versão, datas reais, ordem decrescente e modelos privados', () => fixture((root, write) => {
  write('versoes/v0-1.yaml', { versao: '0.1', data_publicacao: '2026-11-12', nota: 'Nota temporária de teste.' });
  write('filmes/teste.yaml', movie({ data_publicacao: '2026-11-10' }));
  write('modelos/invalido.yaml', { campos: 'não é um registro' });
  const data = loadCatalog(root);
  const posts = feedFor(data, false);
  assert.equal(posts.length, 2);
  assert.equal(posts[0].tipo, 'Versão');
  assert.equal(posts[0].nota, 'Nota temporária de teste.');
  assert.equal(posts[1].tipo, 'Filme');
  assert.throws(() => publicCatalog(data), /precisa de data/);
}));
test('datas inválidas, identificadores e campos preenchidos incorretos falham com contexto', () => {
  for (const extra of [
    { data_publicacao: '2026-02-30' }, { data_publicacao: '15/11/2026' }, { ano: '2005' },
    { genero: ['Animação'] }, { duracao: 'longa' }, { referencias: { imdb: 'javascript:alert(1)' } },
    { cartaz: '/cadastros/secreto.yaml' }, { youtube: 'https://example.com/video' },
    { elenco: [{ personagem: 'Papel', falas: -1, dublador: 'voz' }] },
    { elenco: [{ personagem: 'Papel', falas: 1.5, dublador: 'voz' }] },
    { elenco: [{ personagem: 'Papel', falas: 1, dublador: 'inexistente' }] },
  ]) fixture((root, write) => { write('filmes/teste.yaml', movie(extra)); assert.throws(() => loadCatalog(root), /teste/); });
  fixture((root, write) => { write('filmes/ID Invalido.yaml', movie()); assert.throws(() => loadCatalog(root), /identificador/); });
  fixture((root, write) => { write('filmes/teste.yaml', movie()); write('filmes/teste.yml', movie()); assert.throws(() => loadCatalog(root), /duplicado/); });
});

test('HTML gerado contém destinos, créditos e recursos locais; fontes privadas ficam fora de dist', () => {
  const root = resolve('dist');
  const files = readdirSync(root, { recursive: true }).filter((file): file is string => typeof file === 'string');
  assert.equal(files.filter(file => file.endsWith('index.html')).length, 11);
  assert.equal(files.some(file => /(?:cadastros|modelos|context|\.ya?ml$)/.test(file)), false);
  for (const path of files.filter(file => file.endsWith('.html'))) {
    const html = readFileSync(join(root, path), 'utf8');
    assert.match(html, /lang="pt-BR"/);
    assert.match(html, /name="viewport"/);
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const target = match[1].endsWith('/') ? `${match[1]}index.html` : match[1];
      assert.doesNotThrow(() => readFileSync(join(root, target)), `destino ausente ${match[1]} em ${path}`);
    }
  }
  const film = readFileSync(join(root, 'filmes/deu-a-louca-na-chapeuzinho/index.html'), 'utf8');
  assert.equal((film.match(/<th scope="row"/g) ?? []).length, 50);
  assert.match(film, /href="#elenco"/);
  assert.match(film, /id="elenco"/);
  assert.match(film, /href="https:\/\/www.youtube.com\/watch\?v=rz588bfbFAU" target="_blank"/);
  assert.equal((readFileSync(join(root, 'index.html'), 'utf8').match(/<article>/g) ?? []).length, 8);
});
