// Servidor Node.js para criar arquivos automaticamente
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(express.static(__dirname));

// Configurar multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const contentFolder = path.join(__dirname, 'conteudos', req.body.fileName);
        if (!fs.existsSync(contentFolder)) {
            fs.mkdirSync(contentFolder, { recursive: true });
        }
        cb(null, contentFolder);
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'videoFile') {
            cb(null, 'video.' + file.originalname.split('.').pop());
        } else if (file.fieldname === 'cardImage') {
            cb(null, 'card-image.' + file.originalname.split('.').pop());
        }
    }
});

const upload = multer({ storage: storage });

// Arquivo JSON para armazenar metadados dos conteúdos
const CONTENTS_FILE = path.join(__dirname, 'contents-data.json');

// Função para ler conteúdos do arquivo JSON
function readContents() {
    if (!fs.existsSync(CONTENTS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(CONTENTS_FILE, 'utf8');
    return JSON.parse(data);
}

// Função para salvar conteúdos no arquivo JSON
function saveContentsData(contents) {
    fs.writeFileSync(CONTENTS_FILE, JSON.stringify(contents, null, 2));
}

// Template HTML para páginas de conteúdo
function createContentHTML(content) {
    const videoExtension = content.videoType ? content.videoType.split('/')[1] : 'mp4';
    const imageExtension = content.cardImageType ? content.cardImageType.split('/')[1] : 'jpg';

    const postsHTML = content.posts.map(post => `
            <article class="post-card">
                <div class="post-header">
                    <h3>Post ${post.number}: ${post.title}</h3>
                    ${post.date ? `<span class="post-date">${post.date}</span>` : ''}
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
            </article>
    `).join('');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title} - Mundo do Saber</title>
    <link rel="stylesheet" href="../../css/styles.css">
    <link rel="stylesheet" href="../../css/content-page.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="../../index.html"><h1>Mundo do Saber</h1></a>
            </div>
            <button class="menu-toggle" id="menuToggle" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="../../index.html">Início</a></li>
                <li><a href="../../index.html#videos">Vídeos</a></li>
                <li><a href="../../index.html#dicas">Dicas</a></li>
                <li><a href="../../index.html#sobre">Sobre</a></li>
            </ul>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <div class="container">
            <a href="../../index.html">Início</a> / <span>${content.title}</span>
        </div>
    </div>

    <!-- Content Header -->
    <section class="content-header">
        <div class="container">
            <h1>${content.title}</h1>
            <p class="subtitle">${content.subtitle}</p>
        </div>
    </section>

    <!-- Video Section -->
    <section class="video-section">
        <div class="container">
            <div class="video-wrapper">
                <video controls controlsList="nodownload" style="width: 100%; border-radius: 12px;">
                    <source src="video.${videoExtension}" type="${content.videoType}">
                    Seu navegador não suporta vídeos.
                </video>
            </div>
        </div>
    </section>

    <!-- Posts Section -->
    <section class="posts-section">
        <div class="container">
            <h2>Posts Relacionados</h2>
            <div id="postsContainer">
                ${postsHTML}
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
        <div class="container">
            <h2>Quer aprender mais?</h2>
            <p>Explore outros conteúdos educacionais do Mundo do Saber</p>
            <a href="../../index.html#videos" class="btn-primary">Ver Mais Conteúdos</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Mundo do Saber - Educação sem fins lucrativos</p>
            <p>Compartilhe conhecimento, transforme vidas</p>
        </div>
    </footer>

    <script src="../../js/script.js"></script>
</body>
</html>`;
}

// Endpoint para salvar conteúdo
app.post('/api/save-content', upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'cardImage', maxCount: 1 }
]), (req, res) => {
    try {
        const { title, subtitle, description, icon, fileName, posts, videoType, cardImageType } = req.body;

        // Parse dos posts
        const parsedPosts = JSON.parse(posts);

        // Criar objeto do conteúdo
        const content = {
            id: Date.now(),
            title,
            subtitle,
            description,
            icon,
            fileName,
            videoType,
            cardImageType: cardImageType || null,
            posts: parsedPosts,
            createdAt: new Date().toISOString(),
            url: `/conteudos/${fileName}/index.html`
        };

        // Criar pasta do conteúdo
        const contentFolder = path.join(__dirname, 'conteudos', fileName);
        if (!fs.existsSync(contentFolder)) {
            fs.mkdirSync(contentFolder, { recursive: true });
        }

        // Criar arquivo index.html
        const htmlContent = createContentHTML(content);
        fs.writeFileSync(path.join(contentFolder, 'index.html'), htmlContent);

        // Salvar metadados
        const contents = readContents();
        contents.push(content);
        saveContentsData(contents);

        res.json({
            success: true,
            message: 'Conteúdo salvo com sucesso!',
            content
        });
    } catch (error) {
        console.error('Erro ao salvar conteúdo:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao salvar conteúdo: ' + error.message
        });
    }
});

// Endpoint para atualizar conteúdo
app.post('/api/update-content/:id', upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'cardImage', maxCount: 1 }
]), (req, res) => {
    try {
        const contentId = parseInt(req.params.id);
        const { title, subtitle, description, icon, fileName, posts, videoType, cardImageType } = req.body;

        const parsedPosts = JSON.parse(posts);

        // Ler conteúdos existentes
        let contents = readContents();
        const existingIndex = contents.findIndex(c => c.id === contentId);

        if (existingIndex === -1) {
            return res.status(404).json({ success: false, message: 'Conteúdo não encontrado' });
        }

        const existingContent = contents[existingIndex];

        // Atualizar conteúdo
        const updatedContent = {
            ...existingContent,
            title,
            subtitle,
            description,
            icon,
            fileName,
            videoType: videoType || existingContent.videoType,
            cardImageType: cardImageType || existingContent.cardImageType,
            posts: parsedPosts,
            url: `/conteudos/${fileName}/index.html`
        };

        // Se mudou o nome do arquivo, mover pasta
        if (fileName !== existingContent.fileName) {
            const oldFolder = path.join(__dirname, 'conteudos', existingContent.fileName);
            const newFolder = path.join(__dirname, 'conteudos', fileName);

            if (fs.existsSync(oldFolder)) {
                fs.renameSync(oldFolder, newFolder);
            }
        }

        // Criar/atualizar index.html
        const contentFolder = path.join(__dirname, 'conteudos', fileName);
        if (!fs.existsSync(contentFolder)) {
            fs.mkdirSync(contentFolder, { recursive: true });
        }

        const htmlContent = createContentHTML(updatedContent);
        fs.writeFileSync(path.join(contentFolder, 'index.html'), htmlContent);

        // Atualizar metadados
        contents[existingIndex] = updatedContent;
        saveContentsData(contents);

        res.json({
            success: true,
            message: 'Conteúdo atualizado com sucesso!',
            content: updatedContent
        });
    } catch (error) {
        console.error('Erro ao atualizar conteúdo:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar conteúdo: ' + error.message
        });
    }
});

// Endpoint para deletar conteúdo
app.delete('/api/delete-content/:id', (req, res) => {
    try {
        const contentId = parseInt(req.params.id);

        let contents = readContents();
        const contentIndex = contents.findIndex(c => c.id === contentId);

        if (contentIndex === -1) {
            return res.status(404).json({ success: false, message: 'Conteúdo não encontrado' });
        }

        const content = contents[contentIndex];

        // Deletar pasta do conteúdo
        const contentFolder = path.join(__dirname, 'conteudos', content.fileName);
        if (fs.existsSync(contentFolder)) {
            fs.rmSync(contentFolder, { recursive: true, force: true });
        }

        // Remover dos metadados
        contents.splice(contentIndex, 1);
        saveContentsData(contents);

        res.json({
            success: true,
            message: 'Conteúdo deletado com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao deletar conteúdo:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar conteúdo: ' + error.message
        });
    }
});

// Endpoint para buscar todos os conteúdos
app.get('/api/contents', (req, res) => {
    try {
        const contents = readContents();
        res.json({ success: true, contents });
    } catch (error) {
        console.error('Erro ao buscar conteúdos:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar conteúdos: ' + error.message
        });
    }
});

// Endpoint para buscar conteúdo por ID
app.get('/api/content/:id', (req, res) => {
    try {
        const contentId = parseInt(req.params.id);
        const contents = readContents();
        const content = contents.find(c => c.id === contentId);

        if (!content) {
            return res.status(404).json({ success: false, message: 'Conteúdo não encontrado' });
        }

        res.json({ success: true, content });
    } catch (error) {
        console.error('Erro ao buscar conteúdo:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar conteúdo: ' + error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Arquivos serão criados automaticamente na pasta "conteudos/"`);
});
