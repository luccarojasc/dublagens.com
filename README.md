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

## Refinamento visual · 15/11/2026

Revisão com as skills taste-skill e soft-skill: destaque ilustrado do filme no feed, títulos condensados maiores, navegação arredondada, cartões com moldura interna discreta, avatares em iniciais, ações junto ao título da ficha e filetes mais suaves nas listas. O movimento se limita à entrada do cabeçalho e ao hover/pressionamento; a preferência por movimento reduzido desativa as animações.

A identidade grafite, marfim e azul-ardósia segue o briefing. Os cadastros, o feed cronológico e as relações entre filmes e pessoas foram preservados. As artes continuam provisórias.

Validação: build estático com 11 páginas, Astro sem erros/avisos e seis testes aprovados. Capturas em Chrome headless em output/design/ (pasta local ignorada pelo Git). Revisão da página inicial em 1440/390 px, ficha em 1440/320 px, diretórios e perfil de Lucca em 1440/390 px. Os demais perfis usam o mesmo componente/layout e foram gerados; não houve navegação manual individual por teclado nesta revisão.

A auditoria genérica da taste-skill retornou GATE: FAIL 25 (round 1 of 3). Ela classifica o projeto como uma página comercial e cobra hero/rodapé de tela inteira, CTAs comerciais, nomes de produtos em todos os títulos, momentos animados e estrutura específica do kit. Essas regras não foram impostas ao acervo: o briefing exige Publicações, oito posts individuais, nomes dos dubladores, listas contínuas e menu visível. Também mantivemos os metadados areia com contraste de 5,65:1 especificado pelo autor (o checker exige 7:1 para a introdução). O alerta de área de toque do logotipo foi corrigido para 44 px. Não se trata de aprovação integral do gate; o relatório bruto está em .taste-skill/gate/consistency/report.json.

Para abrir: npm run dev, depois http://127.0.0.1:4321/ (ou a porta indicada no terminal).

## Retomada do plano · etapas 2 e 3

Categoria de notas: Atualização do site. Sete testes de dados aprovados, incluindo segundo filme, voz recorrente/nova e manutenção da data após correção. Cinco testes de navegador aprovados no Chrome instalado: percurso principal por cliques, menu e elenco por teclado, foco visível, acesso direto às 11 páginas, imagens, transbordamento e altura dos links em 1440/390/320 px.

Para repetir a conferência da saída estática:

```sh
npm run build
npm run test:browser
```

Os testes usam o Chrome instalado (`channel: chrome`) e iniciam uma prévia temporária em 127.0.0.1:4322, encerrada automaticamente. A porta precisa estar livre. Não alteram os YAMLs reais. A reprodução completa no YouTube ainda depende da confirmação editorial do autor.

Etapa atual: 4, revisão com o autor. Abrir a prévia com `npm run dev` e revisar: encontrar o filme; identificar a voz de Lobo e seus outros personagens. O progresso atualizado está no fim de AGENTS.md.

### Conferir a seleção pública local

O cadastro já tem os dados editoriais informados e os oito registros usam 2026-11-25. Para revisar a saída pública sem publicar na internet:

```powershell
npm run build:publico
npm run preview:publico
```

Abra http://127.0.0.1:4322/. Este servidor local aponta para `dist-publico/`; encerre com Ctrl+C. As 11 rotas esperadas e a arte respondem HTTP 200. O arquivo de cadastro YAML responde 404. As grafias ficaram como estão até o autor revisá-las. Nenhum upload público foi feito.
