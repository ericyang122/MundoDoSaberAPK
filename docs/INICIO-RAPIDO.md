# ⚡ Início Rápido - 5 Minutos

## 🎯 O Que Vai Acontecer

Quando você fizer upload de conteúdo, o sistema **automaticamente cria**:

```
conteudos/
└── nome-do-seu-arquivo/
    ├── index.html          ← Criado automaticamente!
    ├── video.mp4           ← Seu vídeo
    └── card-image.jpg      ← Sua imagem (opcional)
```

## 🚀 Começar Agora (3 Passos)

### 1️⃣ Instalar Node.js (se ainda não tem)

Baixe e instale: https://nodejs.org/

### 2️⃣ Instalar e Rodar

Abra o terminal na pasta do projeto e execute:

```bash
npm install
npm start
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3001
📁 Arquivos serão criados automaticamente na pasta "conteudos/"
```

### 3️⃣ Ativar o Sistema de Arquivos

**Edite [dashboard.html](dashboard.html) (linha ~185):**

Troque:
```html
<script src="../js/admin-dashboard.js"></script>
```

Por:
```html
<script src="../js/admin-server.js"></script>
```

**Edite [index.html](index.html) (linha ~84):**

Troque:
```html
<script src="js/script.js"></script>
```

Por:
```html
<script src="js/script-server.js"></script>
```

## ✅ Pronto!

Agora acesse:
- **Site:** http://localhost:3001/index.html
- **Admin:** http://localhost:3001/admin.html

Faça upload de um conteúdo e veja a mágica acontecer! 🪄

Os arquivos serão criados automaticamente na pasta `conteudos/`

---

📖 **Instruções completas:** Veja [INSTALACAO.md](INSTALACAO.md)
