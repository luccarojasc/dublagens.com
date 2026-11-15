# Hospedagem

## Publicacao atual

- Plataforma: Cloudflare Pages, envio direto de arquivos estaticos.
- Projeto: `dublagens-com`.
- Endereco publicado: https://dublagens-com.pages.dev/
- Branch de producao: `main`.
- Diretorio publicado: `dist-publico/`.
- O dominio proprio ainda nao foi configurado.

A publicacao contem 12 rotas de conteudo: inicio, diretorio de filmes, ficha do filme, diretorio de dubladores e oito perfis. A pagina `404.html` cobre caminhos inexistentes. Os cadastros YAML e modelos privados nao fazem parte da saida publicada; o teste de um caminho de cadastro respondeu 404.

## Publicar atualizacoes

1. Edite os cadastros em `cadastros/` e as artes em `public/artes/`.
2. Gere a saida publica:

   ```powershell
   npm run build:publico
   ```

3. Revise localmente, se necessario:

   ```powershell
   npm run preview:publico
   ```

   Abra `http://127.0.0.1:4322/` e encerre o servidor com `Ctrl+C`.

4. Com o Wrangler autenticado, envie a nova versao:

   ```powershell
   npx wrangler pages deploy dist-publico --project-name dublagens-com --branch main
   ```

5. Confirme o resultado em https://dublagens-com.pages.dev/.

Nao envie `dist/`, os YAMLs, `cadastros/modelos/` nem os documentos de planejamento. Para autenticar o Wrangler neste computador, use `npx wrangler login` e conclua a autorizacao no navegador.
