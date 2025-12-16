# 🚀 Instalação e Uso - Sistema com Criação Automática de Arquivos

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **Node.js** (versão 14 ou superior)
   - Baixe em: https://nodejs.org/
   - Durante a instalação, marque a opção "Add to PATH"

## 🔧 Instalação Passo a Passo

### 1. Instalar Dependências

Abra o terminal/prompt de comando na pasta do projeto e execute:

```bash
npm install
```

Isso irá instalar:
- Express (servidor web)
- Multer (upload de arquivos)
- CORS (permitir requisições do frontend)
- Nodemon (reiniciar servidor automaticamente)

### 2. Iniciar o Servidor

Execute o comando:

```bash
npm start
```

Você verá a mensagem:
```
🚀 Servidor rodando em http://localhost:3001
📁 Arquivos serão criados automaticamente na pasta "conteudos/"
```

**IMPORTANTE:** Deixe o terminal aberto! O servidor precisa estar rodando para o sistema funcionar.

## 🎯 Como Usar

### Passo 1: Ativar o Sistema de Arquivos Automático

1. Abra o arquivo [dashboard.html](dashboard.html)
2. Localize a linha que carrega o script (próximo ao final do arquivo):
   ```html
   <script src="../js/admin-dashboard.js"></script>
   ```
3. Troque por:
   ```html
   <script src="../js/admin-server.js"></script>
   ```

### Passo 2: Ativar no Index

1. Abra o arquivo [index.html](index.html)
2. Localize a linha:
   ```html
   <script src="js/script.js"></script>
   ```
3. Troque por:
   ```html
   <script src="js/script-server.js"></script>
   ```

### Passo 3: Acessar o Painel Admin

1. Abra no navegador: `http://localhost:3001/admin.html`
2. Faça login com:
   - **Usuário:** `admin`
   - **Senha:** `mundodosaber2025`

### Passo 4: Adicionar Conteúdo

1. Preencha o formulário normalmente
2. Faça upload do vídeo e imagem (opcional)
3. Adicione os posts
4. Clique em **"✅ Publicar Conteúdo"**

### ✨ O Que Acontece Automaticamente:

Quando você publicar um conteúdo, o sistema **automaticamente cria**:

```
conteudos/
└── nome-do-arquivo/
    ├── index.html          ← Página do conteúdo (criada automaticamente!)
    ├── video.mp4           ← Vídeo enviado
    └── card-image.jpg      ← Imagem do card (se enviou)
```

**Exemplo real:**

Se você criar um conteúdo com fileName = `python-iniciantes`, será criado:

```
conteudos/
└── python-iniciantes/
    ├── index.html
    ├── video.mp4
    └── card-image.jpg
```

## 🌐 Acessando o Site

Com o servidor rodando, acesse:

- **Página Principal:** http://localhost:3001/index.html
- **Painel Admin:** http://localhost:3001/admin.html
- **Conteúdo Individual:** http://localhost:3001/conteudos/nome-do-arquivo/index.html

## 📂 Estrutura de Arquivos

```
EsproProjetoMobile/
├── server.js                    ← Servidor Node.js (NOVO!)
├── package.json                 ← Dependências (NOVO!)
├── contents-data.json           ← Banco de dados dos conteúdos (gerado automaticamente)
├── conteudos/                   ← Pasta com conteúdos (gerada automaticamente)
│   └── [nome-arquivo]/
│       ├── index.html
│       ├── video.*
│       └── card-image.*
├── index.html                   ← Página principal
├── admin.html                   ← Login admin
├── dashboard.html               ← Painel de controle
├── css/
│   ├── styles.css
│   ├── content-page.css
│   └── admin.css
└── js/
    ├── admin-login.js
    ├── admin-server.js          ← Script do painel (NOVO!)
    ├── script-server.js         ← Script principal (NOVO!)
    ├── admin-dashboard.js       ← Script antigo (IndexedDB)
    ├── script.js                ← Script antigo (IndexedDB)
    ├── storage.js               ← Sistema antigo (IndexedDB)
    └── view-content.js          ← Sistema antigo (IndexedDB)
```

## 🔄 Diferenças Entre os Sistemas

### Sistema Antigo (IndexedDB):
- ✅ Não precisa de servidor
- ❌ Dados ficam só no navegador
- ❌ Não cria arquivos reais
- ❌ Difícil de fazer backup

### Sistema Novo (Node.js + Arquivos):
- ✅ Cria arquivos HTML reais
- ✅ Pastas organizadas automaticamente
- ✅ Fácil fazer backup (copiar pasta `conteudos/`)
- ✅ Pode hospedar em qualquer servidor
- ⚠️ Precisa do Node.js instalado
- ⚠️ Servidor deve estar rodando

## 🛠️ Comandos Úteis

### Iniciar servidor normalmente:
```bash
npm start
```

### Iniciar com auto-reload (para desenvolvimento):
```bash
npm run dev
```

### Parar o servidor:
Pressione `Ctrl + C` no terminal

### Reinstalar dependências (se der erro):
```bash
npm install
```

## 🐛 Solução de Problemas

### Erro: "Cannot find module 'express'"
**Solução:** Execute `npm install` na pasta do projeto

### Erro: "Port 3001 already in use"
**Solução:**
1. Feche outros servidores rodando na porta 3001
2. Ou mude a porta em [server.js](server.js:5) (linha `const PORT = 3001;`)

### Erro: "CORS error" no navegador
**Solução:** Certifique-se de acessar via `http://localhost:3001/` e não `file:///`

### Conteúdos não aparecem na página
**Solução:**
1. Verifique se o servidor está rodando
2. Abra o console do navegador (F12) e veja se há erros
3. Confirme que trocou os scripts conforme Passo 1 e 2

### Vídeo não carrega
**Solução:**
1. Certifique-se de que o vídeo está em formato MP4 ou WebM
2. Verifique se o arquivo foi salvo na pasta `conteudos/nome-do-arquivo/`

## 📤 Fazendo Backup

Para fazer backup de todos os conteúdos:

1. Copie a pasta `conteudos/`
2. Copie o arquivo `contents-data.json`

Esses dois itens contêm todos os seus conteúdos!

## 🌍 Publicar Online

Para colocar o site online:

1. **Hospedar em serviço com Node.js:**
   - Heroku
   - Render
   - Railway
   - Vercel (com configuração de API)

2. **Ou hospedar só os arquivos estáticos:**
   - Copie a pasta `conteudos/`, `css/`, `img/` e os arquivos HTML
   - Hospede em GitHub Pages, Netlify, Vercel
   - **Desvantagem:** Não poderá adicionar novos conteúdos pelo painel (só editar manualmente)

## 🔐 Segurança

⚠️ **IMPORTANTE antes de publicar online:**

1. Altere as credenciais de admin em [js/admin-login.js](js/admin-login.js)
2. Configure variáveis de ambiente para senhas
3. Adicione autenticação real (JWT, OAuth, etc.)
4. Use HTTPS
5. Limite o tamanho máximo de uploads

## 📞 Suporte

Se tiver dúvidas:
1. Verifique a seção "Solução de Problemas" acima
2. Abra o console do navegador (F12) para ver erros
3. Verifique o terminal do servidor para logs

---

**Desenvolvido para democratizar o acesso à educação**
Mundo do Saber - Transformando vidas através do conhecimento ✨
