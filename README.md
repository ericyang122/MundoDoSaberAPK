# 🎓 Mundo do Saber

> Democratizando o acesso à educação através de conteúdos gratuitos e de qualidade

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

## 📚 Sobre o Projeto

O **Mundo do Saber** é uma plataforma educacional 100% sem fins lucrativos que oferece vídeo-aulas, workshops e dicas de vida para pessoas que não têm acesso à educação tradicional.

## ✨ Características

- 📹 Sistema de vídeo-aulas com upload automático
- 🎨 Interface moderna e responsiva
- 📁 **Criação automática de arquivos** - Quando você faz upload, o sistema cria pastas e arquivos HTML automaticamente
- 🔐 Painel administrativo seguro
- ✏️ Editor e exclusão de conteúdos
- 💾 Backend Node.js com criação automática de arquivos e pastas

## 🚀 Início Rápido

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 14 ou superior
- npm (vem com Node.js)

### Instalação

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor
npm start
```

O servidor estará rodando em: **http://localhost:3001**

📖 **Documentação completa**: [docs/INSTALACAO.md](docs/INSTALACAO.md)

## 📁 Estrutura do Projeto

```
EsproProjetoMobile/
├── css/                    # Estilos CSS
│   ├── styles.css         # Estilos principais
│   ├── content-page.css   # Estilos de páginas de conteúdo
│   └── admin.css          # Estilos do painel admin
├── js/                     # Scripts JavaScript (sistema novo)
│   ├── admin-login.js     # Sistema de login
│   ├── admin-server.js    # Painel admin com backend
│   └── script-server.js   # Script principal com backend
├── img/                    # Imagens do site
├── docs/                   # Documentação
│   ├── INSTALACAO.md      # Guia completo de instalação
│   └── INICIO-RAPIDO.md   # Guia rápido de 5 minutos
├── conteudos/             # Conteúdos gerados (criado automaticamente)
├── index.html             # Página principal
├── admin.html             # Login admin
├── dashboard.html         # Painel de controle
├── server.js              # Servidor Node.js
└── package.json           # Dependências
```

## 🔐 Acesso Administrativo

### Login Padrão:
- **Usuário:** `admin`
- **Senha:** `mundodosaber2025`

⚠️ **IMPORTANTE:** Altere essas credenciais antes de usar em produção!

### Como Alterar Credenciais:
1. Abra [js/admin-login.js](js/admin-login.js)
2. Localize:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'mundodosaber2025'
};
```
3. Altere para suas credenciais desejadas
4. Salve o arquivo

## 🎯 Como Funciona

### Sistema de Criação Automática

Quando você publica um conteúdo com `fileName = "python-iniciantes"`:

```
conteudos/
└── python-iniciantes/
    ├── index.html          ← Criado automaticamente!
    ├── video.mp4           ← Seu vídeo
    └── card-image.jpg      ← Sua imagem
```

O arquivo `index.html` é uma página completa com navbar, vídeo player, posts e footer!

### Fluxo de Trabalho

1. 📝 Acesse http://localhost:3001/admin.html e faça login
2. 📤 Preencha o formulário e faça upload do vídeo
3. ⚡ Clique em "Publicar Conteúdo"
4. ✅ Sistema cria automaticamente a pasta e arquivos
5. 🎉 Conteúdo aparece na página principal!

## 🛠️ Comandos Disponíveis

```bash
# Iniciar servidor
npm start

# Iniciar com auto-reload (desenvolvimento)
npm run dev

# Instalar dependências
npm install
```

### Formatação HTML nos Posts

```html
<!-- Parágrafos -->
<p>Seu texto aqui</p>

<!-- Títulos -->
<h4>Título de Seção</h4>
<h5>Subtítulo</h5>

<!-- Listas -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Caixas de Destaque -->
<div class="tip-box">
    <h4>Dica:</h4>
    <p>Conteúdo da dica</p>
</div>

<div class="highlight-box">
    <h4>Importante:</h4>
    <p>Informação importante</p>
</div>

<div class="example-box">
    <h4>Exemplo:</h4>
    <p>Exemplo prático</p>
</div>
```

### Classes CSS Disponíveis

- `.tip-box` - Caixa azul para dicas
- `.highlight-box` - Caixa verde para destaques
- `.example-box` - Caixa roxa para exemplos
- `.info-box` - Caixa amarela para informações
- `.error-box` - Caixa vermelha para erros
- `.quote-box` - Caixa rosa para citações

## 🎨 Personalização de Cores

As cores pastéis estão definidas em [css/styles.css](css/styles.css):

```css
:root {
    --primary-color: #A8D5E2;   /* Azul pastel */
    --secondary-color: #FFD5CD; /* Rosa pastel */
    --accent-color: #FFF4B3;    /* Amarelo pastel */
}
```

Altere esses valores para personalizar as cores do site.

## 💾 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Upload**: Multer
- **Sistema de Arquivos**: fs (Node.js)
- **Design**: Responsivo com gradientes pastéis

## 🌐 Deploy

### Para hospedar online:

**Opção 1: Hospedar com Node.js**
- Heroku, Render, Railway, Vercel (com API)
- Permite adicionar conteúdo pelo painel admin

**Opção 2: Hospedar apenas arquivos estáticos**
- GitHub Pages, Netlify, Vercel
- Copie `conteudos/`, `css/`, `img/` e arquivos HTML
- Não poderá adicionar novos conteúdos pelo painel

## 🔐 Segurança

⚠️ **IMPORTANTE antes de publicar online:**

1. Altere as credenciais de admin em `js/admin-login.js`
2. Configure variáveis de ambiente para senhas
3. Adicione autenticação real (JWT, OAuth, etc.)
4. Use HTTPS
5. Limite o tamanho máximo de uploads

## 📖 Documentação

- **[Guia Rápido (5 min)](docs/INICIO-RAPIDO.md)** - Comece em minutos
- **[Instalação Completa](docs/INSTALACAO.md)** - Guia detalhado com troubleshooting

## 🤝 Contribuindo

Este é um projeto educacional sem fins lucrativos. Contribuições são bem-vindas!

## 💡 Suporte

Dúvidas? Consulte a documentação em [docs/](docs/)

---

**Desenvolvido com ❤️ para democratizar a educação**

*Mundo do Saber - Transformando vidas através do conhecimento* ✨
