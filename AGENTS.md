# dublagens.com — contexto para implementar a primeira versão local

## Ponto de retomada · 15 de novembro de 2026

O planejamento, os esboços e os cadastros iniciais estão prontos. No momento desta passagem, a pasta do projeto contém documentação, arte e dados. A aplicação Astro ainda precisa ser criada. A próxima sessão começa em **implementação local** e termina com o acervo navegável e o percurso testado no navegador.

**Primeiro percurso:** Início → *Deu a Louca na Chapeuzinho* → **Ver elenco** → Lobo → **Lucca** → filme. Começar por esse percurso, completar os diretórios de Filmes e Dubladores e verificar os sete perfis. O autor precisa poder abrir o resultado no próprio computador. O lançamento público é uma etapa futura.

## Produto e decisões do autor

- **dublagens.com** é o nome de exibição atual, sujeito a mudança. O domínio definitivo está em aberto.
- Acervo pessoal de dublagens em **PT-BR**. Um único autor preenche arquivos-modelo privados. Visitantes leem o feed, exploram o elenco e seguem os links. A atualização é irregular e a estreia ainda não tem data.
- Cadastrar apenas **filmes inteiros com a dublagem finalizada**. Há uma ficha e uma única duração por filme. A sinopse resume a história. O modelo não precisa de campos de escopo, versões por cena, bastidores ou relato de produção.
- **Assistir no YouTube** abre a URL pública fornecida pelo autor. O site hospeda as páginas e imagens. A criação de um canal próprio não é pré-requisito para a prévia.
- A referência de fórum orienta a lista cronológica de publicações. Contas de visitantes, comentários, tópicos, busca por personagem, filtros, avaliações, estatísticas de acesso, edição pública de perfis e créditos de direção, tradução, adaptação ou mixagem estão fora do escopo da v0.
- O autor prioriza praticidade e custo idealmente zero. A stack planejada é **Astro estático, TypeScript, CSS, Node.js e npm**. As coleções leem os arquivos YAML e geram HTML com as relações já resolvidas. Esse fluxo dispensa banco de dados, API própria, API do YouTube, CMS e player incorporado.
- Para a estreia futura, a recomendação foi Cloudflare Pages no plano gratuito, com envio da pasta gerada e possibilidade de usar o subdomínio do serviço. Contratação, domínio e publicação ficam para quando o autor decidir lançar.

## Onde encontrar o trabalho já feito

Os caminhos são relativos à raiz do projeto. Em uma nova sessão, abrir a pasta que contém os cadastros e as pranchas.

| Fonte | Como usar |
| --- | --- |
| [Planejamento consolidado](PLANEJAMENTO-v0.md) | Escopo, rotina editorial, stack, revisão dos desenhos e critérios de aceite. |
| [Esboços e especificação visual](output/pdf/dublagens-v0-esbocos.pdf) | Pranchas 01–02 Início, 03–04 Filmes, 05–06 ficha completa, 07–08 Dubladores, 09–10 perfil de Lucca. Cada par traz desktop e celular. A prancha 11 traz as medidas, as fontes, o foco e a amostra de nota de versão. Usar “Ajustar à largura” para ler as duas fichas longas. |
| [Fontes editáveis das pranchas](output/pdf/dublagens-v0-fontes-svg.zip) | SVGs do desenho em cada largura. Referência para composição, hierarquia e arte provisória. Implementar a interface com texto, listas, tabelas e links reais. |
| [Briefing original dos esboços](PROMPT-esbocos-v0.md) | Histórico da etapa de desenho. A entrega das dez vistas já foi concluída. Para tipografia e composição, seguir as pranchas recebidas. |
| [Cadastro do filme de estreia](cadastros/filmes/deu-a-louca-na-chapeuzinho.yaml) | Fonte dos 50 créditos, da ordem editorial e da URL de vídeo. Ler diretamente na aplicação. |
| [Cadastros de dubladores](cadastros/dubladores/) | Sete arquivos, um por pessoa. A foto e a data ainda estão em branco. |
| [Modelos privados](cadastros/modelos/) | Exemplos preenchíveis de filme, dublador e versão. Excluir esta pasta da leitura das coleções. |

## Dados e regras editoriais

O **nome do arquivo sem extensão** é o identificador estável do registro. O nome de exibição vem do conteúdo. Por exemplo, o crédito de Lobo usa `dublador: lucca` e encontra o nome em [lucca.yaml](cadastros/dubladores/lucca.yaml). Uma correção de nome no perfil deve aparecer em todas as fichas. Uma correção de falas no filme deve refletir também na ordem dos papéis do dublador.

| Registro | Campos que já existem |
| --- | --- |
| Filme | `titulo`, `youtube`, `ano`, `genero`, `duracao`, `data_publicacao`, `sinopse`, `cartaz`, `banner`, `referencias` e `elenco`. As referências opcionais são `imdb`, `rotten_tomatoes` e `letterboxd`. Cada linha do elenco tem `personagem`, `falas` e `dublador`. |
| Dublador | `nome`, `foto` e `data_publicacao`. Calcular os papéis a partir do elenco dos filmes. |
| Versão do site | `versao`, `data_publicacao` e `nota`. O modelo está pronto e ainda não há nota real. A futura coleção em `cadastros/versoes/` pode estar ausente ou vazia. |

**Feed.** Gerar um anúncio por filme completo e um por dublador em seu primeiro cadastro. Uma pessoa que participar de outro filme recebe o novo papel no perfil. Edições de foto, nome ou crédito preservam a data original do anúncio. Uma terceira categoria traz notas curtas sobre versões do próprio site, escritas pelo autor.

Ordenar o feed da data de publicação mais recente para a mais antiga. Para a estreia simultânea, o desenho coloca o filme primeiro e os sete dubladores em ordem alfabética. São **oito posts individuais**, cada um dirigido à ficha ou ao perfil correspondente. A nota de versão ilustrativa da prancha 11 serve para testar o formato e não integra esses oito posts.

**Datas e prévia local.** Oito cadastros já existem e suas datas estão vazias. Para conseguir testar o feed agora, a solução sugerida é incluir esses registros na prévia local como uma estreia simultânea, com data visual pendente. Preservar os YAMLs originais. Para o feed público futuro, a regra editorial usa registros com `data_publicacao` preenchida pelo autor, no formato `AAAA-MM-DD`. Manter explícita essa diferença entre a prévia e a seleção pública.

**Validações.** Ao ler os dados, verificar identificadores, referências a dubladores existentes, quantidade inteira não negativa de falas e formato dos campos preenchidos. Tratar os campos YAML atualmente vazios como valores pendentes válidos na prévia. Os modelos e os arquivos de cadastro devem permanecer fora dos arquivos públicos enviados ao visitante.

## As cinco telas

O menu comum contém **Início**, **Filmes** e **Dubladores**. Cada ficha aceita acesso direto por URL.

| Tela e rota | Conteúdo e ações |
| --- | --- |
| Início · `/` | Título **Publicações**, tipo e data de cada post. O lançamento do filme abre a própria ficha. Cada anúncio de dublador abre seu perfil. A nota de versão exibe o texto no feed. Na revisão foi sugerido omitir a legenda do esboço, que só descreve duas das três categorias. |
| Filmes · `/filmes/` | Catálogo alfabético com cartaz, título e duração cadastrada. O único filme de estreia ocupa um cartão de tamanho normal. Clicar no cartão abre a ficha. |
| Filme · `/filmes/deu-a-louca-na-chapeuzinho/` | Banner, título, ano, gênero, duração, sinopse e referências opcionais. **Assistir no YouTube** abre o vídeo e **Ver elenco** salta aos créditos na mesma página. Exibir personagem, falas e dublador clicável em cada linha, na ordem do arquivo. Oferecer retorno ao catálogo e ao topo. |
| Dubladores · `/dubladores/` | Sete pessoas em ordem alfabética pelo nome de crédito. Foto ou iniciais, nome e link para o perfil. |
| Perfil · `/dubladores/{id}/` | Gerar os sete perfis com o mesmo layout. Mostrar foto ou iniciais, nome e lista de personagens de todos os filmes em ordem **decrescente de falas**. Em empate, ordenar pelo personagem em PT-BR e depois pelo título do filme. Cada papel tem contagem e título clicável que leva à ficha da obra. Há retorno ao diretório. |

## Referência visual e comportamento responsivo

Cinema retrô com tema escuro suave, inspirado em um programa de sessão impresso. Títulos condensados, dados legíveis e foco no elenco. A moldura e a numeração das pranchas pertencem ao material de revisão. A identidade e as artes finais ainda podem ser refinadas pelo autor.

| Uso | Referência da prancha 11 |
| --- | --- |
| Fundo e ação principal | Grafite `#424242` no fundo. Marfim `#FAF8F2` em textos e no botão de assistir, com texto escuro. |
| Acentos | Azul-ardósia `#414761` em faixas e seleção. Oliva `#615C4B` nos detalhes de arte. |
| Metadados e filetes | Areia clara `#C7C2B5` para texto pequeno sobre grafite (5,65:1). Areia `#AEA897` em linhas e molduras (4,23:1 sobre grafite). |
| Tipos | Noto Sans Condensed Bold para títulos, Source Sans Pro Regular/Semibold para leitura e Source Code Pro nas falas, alinhadas à direita. |
| Medidas | Em 1440 px, conteúdo de 1216 px com margens de 112 px. Em 390 px, conteúdo de 350 px com margens de 20 px. Espaçamentos de 8, 16, 24 e 32 px, filetes de 1 px. Corpo de 20–23 px no desktop e 17–19 px no celular. |
| Grades | Até quatro colunas de filmes e duas de dubladores no desktop. Uma coluna para ambos no celular. O menu continua visível. |
| Elenco e acessibilidade | Manter personagem, falas e voz legíveis nas duas larguras. Nomes longos quebram por palavra e ampliam a altura da linha. Link do dublador com área de toque de pelo menos 44 px de altura no celular. Links sublinhados, seção atual marcada por faixa e sublinhado, foco marfim de 2 px afastado 3 px. |

## Conteúdo de estreia e pendências

**Deu a Louca na Chapeuzinho** é o título escrito pelo autor. O cadastro contém o [endereço do vídeo fornecido](https://www.youtube.com/watch?v=rz588bfbFAU). Os dados do filme e os perfis foram conferidos com o material original. Os 50 créditos nas duas pranchas de ficha preservam a grafia e a ordem desse cadastro.

| Dublador | ID | Papéis na estreia |
| --- | --- | ---: |
| Dani | `dani` | 7 |
| Lucca | `lucca` | 5 |
| Manga | `manga` | 4 |
| Primo | `primo` | 12 |
| Rafael | `rafael` | 6 |
| Rors | `rors` | 7 |
| Tulera | `tulera` | 9 |

A soma é **50 créditos e 1.329 falas**. A ficha começa com **Narrador — 18 — Dani** e termina com **Mulher Europeia — 5 — Primo**. O perfil de Lucca deve mostrar, nesta ordem, **Lobo (230), Urso do campeonato (6), backvocal triste (3), Reporter 2 (2) e Coral de Passaros 1 (1)**. No PDF, Lucca é o exemplo de perfil navegável. No site, os sete nomes devem levar aos sete perfis.

O autor definirá ano, gênero, duração, sinopse, artes de cartaz e banner, fotos, datas editoriais e URLs de referência. Para a prévia, aceitar arte provisória, iniciais e indicação discreta de dado pendente quando ajudar a revisar o layout. Exibir links de cinema apenas quando houver URL. Preservar a grafia de trabalho dos personagens até a revisão editorial do autor. Antes da estreia pública, confirmar também que o vídeo indicado abre a dublagem completa em acesso público. Essas pendências permitem avançar com o teste do percurso local.

## Sequência de implementação e teste

1. **Preparar o projeto local.** Conferir a árvore atual e as versões de Node.js e npm. Criar a estrutura mínima do Astro compatível com o ambiente, preservando cadastros, documentos e pranchas. Configurar a leitura de YAML, as relações entre registros e a geração de páginas estáticas.
2. **Entregar primeiro o percurso principal.** Montar o feed local, a ficha, o salto para o elenco e o perfil de Lucca a partir dos arquivos. Abrir o navegador, escolher o filme, localizar Lobo, seguir para Lucca e retornar à ficha pelo título do filme.
3. **Completar a navegação da v0.** Gerar os demais perfis e os dois diretórios. Reusar os mesmos dados entre lista, ficha, feed e perfil. Incluir a apresentação de notas de versão para quando a coleção tiver uma entrada real.
4. **Verificar a prévia.** Conferir os oito anúncios, os sete destinos de perfil, os 50 créditos na ordem original, a soma de falas e os cinco papéis de Lucca. Testar o botão do YouTube, os retornos, o acesso direto e o teclado. Conferir o layout a 1440 e 390 px e a leitura dos nomes longos a 320 px. Testar empate de falas e créditos em mais de um filme com dados temporários. O acervo real de estreia continua com um filme.
5. **Entregar o resultado local.** Executar a geração estática e verificar no navegador o percurso solicitado. Informar o comando para iniciar ou reabrir o projeto, a URL local efetivamente testada, quais telas e verificações passaram e o que segue pendente de conteúdo do autor. Os comandos de desenvolvimento e build só passam a existir depois da criação da aplicação.