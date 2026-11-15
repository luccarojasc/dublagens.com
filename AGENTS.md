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
| Filme | `titulo`, `youtube`, `ano`, `genero`, `duracao`, `data_publicacao`, `sinopse`, `cartaz`, `banner`, `referencias` e `elenco`. As referências opcionais são `imdb`, `rotten_tomatoes` e `letterboxd`. Cada linha do elenco tem `personagem`, `foto` opcional, `falas` e `dublador`. A foto do personagem fica em `public/artes/` e usa caminho `/artes/arquivo.jpg`. |
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

# dublagens.com — plano da primeira versão local à estreia pública

**Começar aqui.** Em 15/11/2026, o planejamento, as dez vistas e os cadastros da estreia estavam prontos. A aplicação Astro ainda precisava ser criada. Ao retomar em outra sessão, conferir a pasta e o registro de progresso no fim deste documento, identificar a primeira etapa pendente e continuar dali.

**O que significa terminar a v0.** O autor consegue compartilhar um endereço público, o visitante consegue abrir o filme completo no YouTube e percorrer os créditos dos sete dubladores no computador ou celular. O autor consegue corrigir um crédito ou cadastrar o próximo filme pelos modelos privados e publicar a atualização. O acervo pode continuar crescendo depois desse ponto, sem calendário fixo.

## Referências do projeto

| Material existente | Para que serve |
| --- | --- |
| [Contexto preparado para AGENTS.md](CONTEXTO-v0-para-AGENTS.md) e [planejamento da v0](PLANEJAMENTO-v0.md) | Decisões do autor, regras editoriais e histórico. |
| [Pranchas em PDF](output/pdf/dublagens-v0-esbocos.pdf) e [originais editáveis em SVG](output/pdf/dublagens-v0-fontes-svg.zip) | As pranchas 01–10 cobrem as cinco telas em 1440 e 390 px. A prancha 11 especifica fontes, cores, foco, medidas e links. As fichas 05 e 06 mostram os 50 créditos. |
| [Filme de estreia](cadastros/filmes/deu-a-louca-na-chapeuzinho.yaml) e [sete dubladores](cadastros/dubladores/) | Dados reais para desenvolver e conferir a navegação. Usar os YAMLs como fonte única dos créditos. |
| Modelos de [filme](cadastros/modelos/filme.yaml), [dublador](cadastros/modelos/dublador.yaml) e [versão do site](cadastros/modelos/versao.yaml) | Arquivos privados que o autor copia e preenche para alimentar o acervo. |

## 1. Montar a primeira versão local

**Entrega:** uma prévia que o autor consiga abrir em seu computador e usar para percorrer o primeiro filme.

1. Conferir o estado atual da pasta, as versões de Node.js e npm e a compatibilidade com o Astro escolhido. Montar a aplicação com **Astro estático, TypeScript e CSS**. Preservar os cadastros e as pranchas. Registrar as versões utilizadas e os comandos para instalar as dependências, iniciar a prévia, gerar os arquivos finais e inspecionar o resultado.
2. Ler os filmes, dubladores e futuras notas de versão em coleções de conteúdo. Usar o nome do arquivo, sem extensão, como identificador estável. A pasta de modelos é material do autor. A coleção de versões pode começar vazia.
3. Validar os vínculos. Cada crédito contém personagem, contagem inteira não negativa de falas e identificador de um dublador existente. Gerar o perfil de cada pessoa consultando o elenco dos filmes. Uma correção na origem precisa atualizar todas as telas afetadas.
4. Criar primeiro o feed, a ficha do filme e o perfil de Lucca. Abrir **Início → Deu a Louca na Chapeuzinho → Ver elenco → Lobo → Lucca → filme**. Conferir que “Ver elenco” salta aos créditos, que “Lucca” abre o perfil e que o título da obra retorna à ficha.
5. Na prévia de desenvolvimento, permitir a leitura dos oito cadastros com datas editoriais em branco, como uma estreia simultânea. Usar iniciais, arte provisória e indicação discreta de campos pendentes. Preservar os arquivos originais até o autor fornecer os dados reais.

**Critério de saída:** o percurso funciona por cliques no navegador, ao recarregar a página e por endereço direto. Registrar o comando e a URL local que foram efetivamente testados.

## 2. Completar as cinco telas e o feed

| Tela | Comportamento esperado |
| --- | --- |
| **Início** · `/` | Feed “Publicações”, da data mais recente para a mais antiga. Mostrar **oito posts** na estreia simultânea: primeiro o filme, depois Dani, Lucca, Manga, Primo, Rafael, Rors e Tulera. Cada item tem tipo, data e destino. Um filme leva à ficha e uma pessoa leva ao perfil. A terceira categoria, “Atualização do site”, exibe versão e nota curta no feed quando houver um registro real. |
| **Filmes** · `/filmes/` | Grade alfabética com cartaz, título e a duração cadastrada pelo autor. Com um único filme, o cartão mantém as proporções previstas no esboço. |
| **Ficha do filme** · `/filmes/deu-a-louca-na-chapeuzinho/` | Banner, título, ano, gênero, duração, sinopse e links para IMDb, Rotten Tomatoes e Letterboxd quando preenchidos. “Assistir no YouTube” abre o vídeo público completo. “Ver elenco” leva à lista de personagem, falas e dublador clicável. Preservar a ordem do YAML e oferecer retorno ao catálogo e ao topo. |
| **Dubladores** · `/dubladores/` | Diretório alfabético com os sete nomes, foto ou iniciais e acesso individual a cada perfil. |
| **Perfil** · `/dubladores/{id}/` | Nome, foto ou iniciais, personagem, filme clicável e falas. Ordenar os papéis de **todos os filmes** pelo número de falas, do maior para o menor. Em empate, ordenar por personagem em PT-BR e, em seguida, pelo título do filme. |

O menu comum contém Início, Filmes e Dubladores. O site é um acervo público em PT-BR de **filmes completos com dublagem finalizada**. O roteiro da v0 compreende cadastro privado por um autor, navegação e links externos. Contas, comentários, tópicos, cenas avulsas, busca, filtros, avaliações, equipe técnica, player incorporado, métricas de visitas, painel editorial, banco de dados e API própria ficam fora desta entrega.

**Critério de saída:** os dois diretórios, os oito posts e cada nome do elenco têm destinos válidos. O PDF demonstra Lucca, e o site deve gerar todos os sete perfis.

## 3. Conferir dados, visual e navegação

Usar o **cinema retrô em tema escuro suave** da prancha 11. Fundo grafite `#424242`, marfim `#FAF8F2` para texto e botão, azul-ardósia `#414761` para faixas, oliva `#615C4B` para detalhes, areia `#AEA897` para filetes e areia clara `#C7C2B5` para texto secundário. As fontes das pranchas são Noto Sans Condensed Bold nos títulos, Source Sans Pro no texto e Source Code Pro nas contagens de falas.

| Conferência | Resultado esperado |
| --- | --- |
| **Integridade do elenco** | 50 créditos e 1.329 falas no cadastro de estreia. A primeira linha é Narrador, 18, Dani. A última é Mulher Europeia, 5, Primo. Papéis por pessoa: Dani 7, Lucca 5, Manga 4, Primo 12, Rafael 6, Rors 7 e Tulera 9. |
| **Perfil de Lucca** | Lobo (230), Urso do campeonato (6), backvocal triste (3), Reporter 2 (2), Coral de Passaros 1 (1). Cada linha volta à ficha. Preservar as grafias fornecidas até a revisão do autor. |
| **Celular e desktop** | Conferir a 1440, 390 e 320 px. Referências de conteúdo: 1216 px no desktop de 1440 e 350 px no celular de 390. Grade de filmes com até quatro colunas e diretório com duas no desktop, ambos com uma no celular. Nomes longos quebram por palavra, os números permanecem alinhados à direita e cada link de voz dispõe de pelo menos 44 px de altura no celular. |
| **Teclado e links** | Percorrer o menu, o botão de assistir, o salto ao elenco e os links dos nomes usando o teclado. O item atual tem indicação visual além da cor. Links de nomes sublinhados e foco marfim de 2 px com afastamento de 3 px. Conferir retornos, imagens, iniciais e abertura direta de fichas. |
| **Próximos cadastros** | Com dados temporários, testar um segundo filme, uma voz recorrente, uma nova, um empate de falas e uma nota de versão. A voz recorrente ganha o papel no perfil e a nova ganha um único anúncio. Uma correção mantém a data original. Retirar o material de teste antes de preparar a estreia. |

**Critério de saída:** as cinco telas passaram pela conferência no navegador. Registrar o que foi testado e corrigir as falhas encontradas. Distinguir problemas de navegação de campos que aguardam conteúdo editorial.

## 4. Revisar a prévia com o autor

Entregar o endereço local e o comando para reabrir o projeto. Convidar o autor a fazer duas tarefas: **encontrar e abrir o filme** e **descobrir quem dubla o Lobo e quais outros personagens essa pessoa interpreta**. Isso permite avaliar a hierarquia das ações, o tema retrô, a leitura dos créditos no celular e a volta ao filme.

Registrar o retorno concreto por tela. Aplicar os ajustes solicitados, repetir os percursos afetados e mostrar o resultado. Se a aplicação já tiver sido revisada em outra sessão, usar o retorno registrado como ponto de partida.

**Critério de saída:** os ajustes combinados foram conferidos e as pendências de conteúdo para a estreia estão identificadas.

## 5. Preparar o conteúdo real de estreia

| Item | Quem decide e o que conferir |
| --- | --- |
| **Filme** | O autor fornece ano, gênero, duração que quer exibir, sinopse, cartaz e banner. Aplicar a mesma duração no catálogo e na ficha. Preparar as imagens nas proporções dos desenhos e conferir o enquadramento no celular. |
| **Dubladores e créditos** | O autor revisa as grafias públicas dos sete nomes e dos personagens. Inserir os retratos disponíveis e usar iniciais para quem ainda estiver sem foto. As contagens de referência são as do cadastro original. Se o autor corrigir alguma, atualizar também a conferência correspondente. |
| **Vídeo** | Confirmar que o endereço cadastrado abre, em acesso público, a dublagem integral que deve acompanhar a ficha. A v0 utiliza um link externo. [Vídeo indicado pelo autor](https://www.youtube.com/watch?v=rz588bfbFAU) |
| **Referências de cinema** | Preencher as URLs disponíveis de IMDb, Rotten Tomatoes e Letterboxd. Conferir o destino de cada uma. Omitir da interface as que estiverem em branco. |
| **Datas e anúncios** | O autor escolhe a data editorial real da estreia. Preencher `data_publicacao` no filme e em cada um dos sete perfis, no formato `AAAA-MM-DD`. A primeira publicação tem um filme e sete anúncios de voz. A nota ilustrativa da prancha 11 permanece apenas como exemplo. |

**Critério de saída:** as fichas têm o conteúdo que o autor escolheu tornar público, o vídeo foi conferido e os oito anúncios podem ser gerados pelos dados reais.

## 6. Testar localmente a cópia que será publicada

1. Gerar o site estático com as regras públicas. Os anúncios usam registros com data preenchida. O comportamento de prévia que mostrava os registros pendentes fica restrito ao desenvolvimento.
2. Abrir localmente a **saída de produção**. Em Astro, os comandos usuais do projeto são `npm run build` e `npm run preview`, com saída em `dist/` por padrão. Confirmar e registrar os comandos reais após a implementação. [Guia de publicação do Astro](https://docs.astro.build/en/guides/deploy/)
3. Conferir os oito posts e as **11 páginas públicas esperadas**: início, dois diretórios, uma ficha de filme e sete perfis. Abrir a ficha e um perfil diretamente, recarregá-los e repetir o percurso principal. Conferir a presença das imagens finais e o destino das referências preenchidas.
4. Inspecionar a pasta gerada. Somente o conteúdo destinado aos visitantes deve seguir para a hospedagem. Guardar em privado os modelos, os YAMLs de origem, os documentos de planejamento, as pranchas e uma cópia recuperável do projeto e das artes.

**Critério de saída:** a cópia de produção revisada está pronta no computador. Informar ao autor qual pasta foi verificada. Publicar quando o autor decidir colocar a v0 no ar.

## 7. Publicar e verificar no endereço público

1. Usar a hospedagem combinada para o lançamento. A recomendação do plano é **Cloudflare Pages**, com envio direto e endereço inicial fornecido pelo serviço. Verificar o plano gratuito e seus limites no momento da estreia. **dublagens.com** é o nome de exibição e a compra de domínio é opcional. [Limites do Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/)
2. Com a decisão de lançamento do autor, criar ou selecionar o projeto de hospedagem e enviar a pasta estática validada. Anotar o endereço público e a identificação da publicação. O envio direto permite carregar a pasta gerada pelo computador. [Publicação por envio direto](https://developers.cloudflare.com/pages/get-started/direct-upload/)
3. Abrir o endereço público em uma janela sem sessão iniciada. Conferir feed, diretórios, as sete URLs de perfil e a ficha. Repetir **filme → elenco → Lucca → filme → YouTube**. Conferir também fotos ou iniciais, imagens, referências, navegação em largura de celular e acesso por link compartilhado.
4. Se houver falha, identificar se a origem é o cadastro, o código ou a hospedagem. Corrigir a origem, gerar novamente e conferir a publicação corrigida. Em uma atualização posterior, se já existir uma versão pública funcional, ela poderá ser restaurada enquanto o erro é corrigido. [Restauração de uma publicação anterior](https://developers.cloudflare.com/pages/configuration/rollbacks/)

**Critério de saída:** o endereço público está acessível e o percurso foi testado nele. Entregar ao autor a URL, o procedimento efetivo de atualização e qualquer pendência editorial opcional.

## 8. Manter o acervo depois da estreia

| Quando acontecer | Rotina do autor | Efeito esperado |
| --- | --- | --- |
| **Concluir outro filme** | Copiar o modelo de filme, escolher um identificador único e preencher vídeo, metadados, artes, data e elenco. Reutilizar os IDs das vozes existentes e cadastrar uma vez cada pessoa nova. | Um post para o filme, um por dublador novo e os perfis antigos atualizados com os novos papéis. |
| **Corrigir dados ou trocar uma foto** | Editar o YAML ou a arte de origem, preservar o identificador e a data inicial, conferir a prévia e publicar a atualização. | A URL compartilhada continua válida. Ficha, catálogo e perfis refletem a correção. |
| **Anunciar uma versão do site** | Copiar o modelo de versão para a coleção `cadastros/versoes/`. Preencher versão, data e nota curta. | O feed ganha uma nota sobre o site, classificada pela data. |
| **Atualizar o endereço do vídeo** | Trocar o link no cadastro do filme e testar o botão após gerar e publicar. Se a exibição ficar indisponível, preservar o registro do filme e seus créditos. | O catálogo e os perfis continuam documentando o trabalho. |

Para qualquer atualização, repetir **editar → revisar localmente → gerar a pasta pública → enviar → conferir o endereço público**. Manter o histórico e a cópia privada dos cadastros. A v0 está entregue quando o site passou pela verificação pública e o autor consegue repetir esse fluxo a partir dos modelos. O segundo filme pode entrar quando a próxima dublagem ficar pronta.

## Registro para continuar em outra sessão

Atualizar esta tabela ao concluir uma etapa. Anotar fatos verificados e a próxima ação específica, inclusive quando ela depender de uma escolha do autor.

| Campo | Situação verificada em 15/11/2026 |
| --- | --- |
| Última entrega conferida | Aplicação Astro estática com 11 páginas, cinco tipos de tela, oito posts e sete perfis. Refinamento visual local aplicado; categoria das notas ajustada para “Atualização do site”. |
| Etapa atual | 6 — cópia pública gerada e servida localmente em http://127.0.0.1:4322/ para revisão. O autor adiou a correção de grafias. Nenhuma publicação externa foi feita. |
| Comando e URL local testados | `npm run build:publico`; `npm run preview:publico`: http://127.0.0.1:4322/. O servidor atual serve `dist-publico/`; Ctrl+C encerra. `/`, `/filmes/`, ficha, diretório e sete perfis retornaram 200; arte final retorna 200; arquivo YAML privado retorna 404. |
| Testes executados | Astro sem erros/avisos; testes de dados, relações, datas, empates, segundo filme, voz recorrente/nova e notas temporárias. Cinco testes no Chrome: percurso por cliques, teclado/foco e 11 páginas em 1440/390/320 px, imagens carregadas, ausência de transbordamento e alvos de toque >=44 px no celular. Conferência visual por capturas na sessão anterior. O link/target do YouTube foi conferido; a reprodução integral pública ainda requer confirmação. |
| Pendências do autor | Confirmar as grafias públicas dos nomes e personagens; fornecer fotos finais se disponíveis; confirmar andamento editorial do vídeo integral público; decidir se quer publicar após revisar a saída de produção. |
| Endereço público e data da publicação | A preencher após a estreia. |
| Próxima ação | O autor revisar a cópia pública local e, mais tarde, fornecer as correções de grafia. Regerar e repetir a verificação antes de qualquer publicação externa. As grafias atuais foram preservadas por instrução do autor. |

**Comandos públicos efetivos:** `npm run build:publico` usa somente registros datados e gera `dist-publico/`; `npm run build` mantém a prévia em `dist/`. Os oito registros da estreia agora estão datados para 2026-11-25; gerar e verificar novamente a seleção pública antes de publicar.

**Localização efetiva das referências:** as pranchas estão em `context/dublagens-v0-esbocos.pdf` e `context/dublagens-v0-fontes-svg.zip`. Alguns caminhos anteriores neste plano são históricos. O README contém a rotina local e o registro do refinamento visual.
