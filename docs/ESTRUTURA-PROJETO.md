# 📁 Estrutura do Projeto - Mundo do Saber

## 🎯 Organização Final

```
EsproProjetoMobile/
│
├── 📄 Arquivos Principais (Raiz)
│   ├── index.html              # Página principal do site
│   ├── admin.html              # Tela de login administrativo
│   ├── dashboard.html          # Painel de controle admin
│   ├── server.js               # Servidor Node.js/Express
│   ├── package.json            # Dependências do projeto
│   ├── package-lock.json       # Lock de versões
│   ├── .gitignore              # Arquivos ignorados pelo Git
│   └── README.md               # Documentação principal
│
├── 📂 css/                     # Estilos CSS
│   ├── styles.css              # Estilos principais + Dark Mode + Animações
│   ├── admin.css               # Estilos do painel admin
│   └── content-page.css        # Estilos das páginas de conteúdo
│
├── 📂 js/                      # Scripts JavaScript
│   ├── script-server.js        # Script principal (com backend)
│   ├── admin-server.js         # Painel admin (com backend)
│   └── admin-login.js          # Sistema de login
│
├── 📂 docs/                    # Documentação
│   ├── INSTALACAO.md           # Guia completo de instalação
│   ├── INICIO-RAPIDO.md        # Guia rápido de 5 minutos
│   ├── TESTE-COMPLETO.md       # Checklist de testes
│   ├── DARK-MODE-E-ANIMACOES.md # Documentação Dark Mode
│   └── ESTRUTURA-PROJETO.md    # Este arquivo
│
├── 📂 img/                     # Imagens do site
│   └── (imagens estáticas)
│
├── 📂 conteudos/               # Conteúdos gerados automaticamente
│   └── [nome-do-conteudo]/     # Criado pelo sistema ao publicar
│       ├── index.html          # Página do conteúdo
│       ├── video.*             # Vídeo enviado
│       └── card-image.*        # Imagem do card
│
├── 📂 node_modules/            # Dependências instaladas (ignorado pelo Git)
│
└── 📄 contents-data.json       # Dados dos conteúdos (gerado automaticamente)
```

---

## 📋 Descrição Detalhada

### 🌐 Páginas HTML (Raiz)

**index.html**
- Página principal do site
- Exibe vídeo-aulas e dicas de vida
- Menu mobile com Dark Mode integrado
- Totalmente responsivo

**admin.html**
- Tela de login administrativo
- Credenciais padrão: admin / mundodosaber2025
- Validação simples com localStorage

**dashboard.html**
- Painel de controle completo
- 3 seções: Adicionar, Gerenciar, Pré-visualizar
- Upload de vídeos e imagens
- Criação automática de arquivos

---

### 🎨 CSS (css/)

**styles.css** (16KB)
- Reset e configurações básicas
- Sistema de cores com CSS Variables
- Dark Mode completo
- Animações (fadeIn, slideInLeft, pulse, spin)
- Responsividade mobile
- Loading spinner

**admin.css**
- Estilos exclusivos do painel admin
- Sidebar e formulários
- Cards de gerenciamento

**content-page.css**
- Estilos das páginas de conteúdo individual
- Video player
- Posts formatados

---

### 💻 JavaScript (js/)

**script-server.js**
- Gerencia página principal
- Dark Mode toggle com localStorage
- Carrega conteúdos via API
- Menu mobile responsivo
- Renderiza 12 dicas de vida

**admin-server.js**
- Gerencia painel administrativo
- Dark Mode toggle
- Upload de arquivos (vídeo + imagem)
- Preview de conteúdo
- Criação/Edição/Exclusão via API

**admin-login.js**
- Sistema de autenticação simples
- Validação de credenciais
- Redirecionamento seguro

---

### 📚 Documentação (docs/)

**INSTALACAO.md**
- Guia completo passo a passo
- Troubleshooting
- Configurações avançadas

**INICIO-RAPIDO.md**
- Guia de 5 minutos
- Comandos essenciais
- Teste rápido

**TESTE-COMPLETO.md**
- 13 passos de teste
- Checklist completo
- Validação de todas funcionalidades

**DARK-MODE-E-ANIMACOES.md**
- Documentação da implementação
- Código explicado
- Como testar

**ESTRUTURA-PROJETO.md**
- Este arquivo
- Visão geral da organização

---

### 🖼️ Imagens (img/)

Pasta para armazenar:
- Logo do site
- Ícones
- Imagens estáticas
- Backgrounds

---

### 📦 Conteúdos (conteudos/)

**Criado automaticamente** pelo sistema ao publicar conteúdo.

Estrutura de cada conteúdo:
```
conteudos/
└── nome-do-conteudo/
    ├── index.html          # Página gerada automaticamente
    ├── video.mp4           # Vídeo enviado
    └── card-image.jpg      # Imagem do card
```

**IMPORTANTE:** Esta pasta está no `.gitignore` para não versionar uploads.

---

### ⚙️ Arquivos de Configuração

**package.json**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1"
  }
}
```

**server.js** (11KB)
- Servidor Express rodando na porta 3001
- Rotas de API:
  - `GET /api/contents` - Lista conteúdos
  - `POST /api/contents` - Cria conteúdo
  - `PUT /api/contents/:id` - Edita conteúdo
  - `DELETE /api/contents/:id` - Remove conteúdo
- Middleware Multer para uploads
- Criação automática de pastas e arquivos HTML

**.gitignore**
```
node_modules/
conteudos/
contents-data.json
.claude/
*.log
```

---

## 🎯 Fluxo de Arquivos

### 1. Usuário Acessa o Site
```
index.html → script-server.js → GET /api/contents → Renderiza cards
```

### 2. Admin Faz Upload
```
dashboard.html → admin-server.js → POST /api/contents → server.js
   ↓
Cria pasta em conteudos/
   ↓
Salva vídeo + imagem
   ↓
Gera index.html automaticamente
   ↓
Atualiza contents-data.json
```

### 3. Usuário Clica em Card
```
Redireciona para: conteudos/[nome]/index.html
```

---

## 📊 Tamanho dos Arquivos Principais

```
server.js           ~12KB
styles.css          ~16KB
admin-server.js     ~25KB
script-server.js    ~7KB
dashboard.html      ~11KB
index.html          ~4KB
```

---

## ✅ Status de Implementação

- [x] Sistema de backend com Node.js
- [x] Upload de vídeos e imagens
- [x] Criação automática de arquivos
- [x] Dark Mode com toggle
- [x] Animações suaves
- [x] Design responsivo
- [x] Menu mobile funcional
- [x] Painel administrativo completo
- [x] Sistema de edição/exclusão
- [x] Preview de conteúdo
- [x] Documentação completa

---

## 🚀 Próximos Passos (Opcional)

- [ ] Adicionar autenticação JWT
- [ ] Implementar busca de conteúdos
- [ ] Sistema de categorias
- [ ] Comentários nos vídeos
- [ ] Analytics de visualizações
- [ ] PWA (Progressive Web App)

---

**Projeto 100% funcional e organizado! 🎉**

*Última atualização: 15 de Dezembro de 2025*
