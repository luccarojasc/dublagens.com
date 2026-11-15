# dublagens.com — prévia local

Aplicação estática em Astro, TypeScript e CSS. A publicação não foi realizada.

## Abrir no computador

No PowerShell, dentro desta pasta:

```powershell
npm run dev
```

Abra **http://127.0.0.1:4321/**. Mantenha o terminal aberto enquanto usa o site; pressione `Ctrl+C` para encerrar. Se a porta estiver ocupada, use a URL exibida pelo Astro no terminal.

As dependências já estão instaladas neste computador. Em uma nova cópia, use `npm ci` antes. O projeto foi preparado com Node.js 24.19.0 e npm 10.8.2. Consulte os requisitos de instalação em https://docs.astro.build/en/install-and-setup/.

Para abrir a geração estática:

```powershell
npm run build
npm run preview
```

O `build` cria `dist/`. Abra pelo servidor HTTP, pois os caminhos do site partem da raiz; não abra os arquivos HTML com duplo clique.

## Percurso inicial

Início → Deu a Louca na Chapeuzinho → Ver elenco → linha Lobo → Lucca → título do filme.

Rotas: `/`, `/filmes/`, `/filmes/deu-a-louca-na-chapeuzinho/`, `/dubladores/` e `/dubladores/{id}/` para Dani, Lucca, Manga, Primo, Rafael, Rors e Tulera.

## Editar o acervo

Os YAMLs são lidos diretamente de `cadastros/filmes/`, `cadastros/dubladores/` e, opcionalmente, `cadastros/versoes/`. `cadastros/modelos/` nunca participa da leitura. O nome do arquivo sem extensão é o ID estável; use letras minúsculas, números e hífens. O nome de exibição vem do cadastro de cada pessoa.

Nesta entrega, os YAMLs citados pelo AGENTS.md não estavam na pasta. O filme e os sete perfis foram criados a partir de `context/descricoes-deualoucanachapeuzinho.txt`, sem alterar o original. As 50 linhas mantêm a grafia, a contagem e a ordem originais. As três ilustrações provisórias foram extraídas dos SVGs fornecidos em `context/dublagens-v0-fontes-svg.zip`.

Preencha os campos vazios conforme a revisão editorial. Duração aceita texto como `80 min` ou `1h 20 min`; ano é um número de quatro dígitos; datas usam `AAAA-MM-DD`. Imagens ficam em `public/artes/` e seus campos usam `/artes/arquivo.webp` (também aceitos SVG, PNG, JPG e AVIF). URLs de referência vazias não geram links. Conteúdo de notas é texto, sem HTML.

Depois de alterar os YAMLs, reinicie o servidor (`Ctrl+C`, depois `npm run dev`) e atualize a página para recarregar os cadastros. Após mudanças, rode novamente os comandos de validação e geração. Datas de anúncios existentes devem ser preservadas. Papéis e nomes são derivados em todas as páginas, sem duplicar créditos nos perfis.

## Prévia e seleção pública

`npm run dev` e `npm run build` incluem os registros sem data, exibindo “Data a definir”, aviso de prévia e `noindex`. Os registros pendentes aparecem juntos antes dos datados; em empate, filmes vêm primeiro e os dubladores ficam em ordem alfabética PT-BR. Não há nota de versão fictícia no acervo.

`npm run build:publico` gera **outra pasta**, `dist-publico/`, apenas com registros datados. Esse comando não publica nada. Ele também exige que cada dublador de um filme datado tenha data, evitando links para perfis ausentes. Com os cadastros atuais, essa seleção está vazia. Antes da estreia, revisar o conteúdo e confirmar que o vídeo é público e contém a dublagem completa.

Somente HTML, CSS, fontes e imagens são copiados para as saídas estáticas. YAMLs, modelos, documentos, testes e referências de planejamento permanecem fora delas. Não use o servidor de desenvolvimento como hospedagem pública.

## Validação

```powershell
npm run check
npm run build
npm test
```

Os testes cobrem a correspondência dos 50 créditos com a fonte, 1.329 falas, oito anúncios, sete perfis, os cinco papéis de Lucca, empates PT-BR, vários filmes, mudanças de crédito/nome, notas de versão, seleção pública, dados inválidos e links/recursos do HTML gerado. Dados temporários ficam fora do acervo real e são removidos após os testes.

Resultado desta sessão: `check` sem erros ou avisos, seis testes aprovados, 11 páginas geradas na prévia e três páginas vazias na seleção pública (todos os registros atuais estão sem data). As 11 rotas retornaram HTTP 200 em `http://127.0.0.1:4321/`; URLs de cadastros, AGENTS.md e texto original retornaram 404 no servidor da geração estática.

A verificação visual no navegador ficou pendente nesta sessão: o controle do Brave foi interrompido pela ferramenta por não conseguir determinar a URL atual com segurança. Conferir manualmente o percurso acima em 1440, 390 e 320 px, os nomes longos, foco por Tab/Enter, saltos, retornos e abertura do YouTube. O endereço foi verificado via HTTP, não por navegação visual. O servidor usado nos testes foi encerrado; inicie-o novamente com os comandos acima.

Pendências editoriais: ano, gênero, duração, sinopse, cartaz e banner finais, fotos, datas, referências opcionais e confirmação do vídeo completo público.
