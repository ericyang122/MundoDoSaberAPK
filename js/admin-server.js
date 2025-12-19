// Admin Dashboard com Backend (Criação Automática de Arquivos)
// URL do servidor
const SERVER_URL = 'http://localhost:3001';

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

if (themeToggle) {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    if (themeLabel) {
        themeLabel.textContent = currentTheme === 'dark' ? 'Light' : 'Dark';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        if (themeLabel) {
            themeLabel.textContent = newTheme === 'dark' ? 'Light' : 'Dark';
        }
    });
}

// Verificar se está logado ao carregar a página
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin.html';
}

// Adicionar flag de sessão única - se sair, não pode voltar sem login
window.addEventListener('focus', () => {
    // Verificar novamente quando a janela recebe foco
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin.html';
    }
});

// Botão Sair
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        window.location.href = 'admin.html';
    }
});

// Interceptar todos os cliques em links e botões para fazer logout automático
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    const button = e.target.closest('button');

    // Verificar cliques em links
    if (link && link.href) {
        const url = new URL(link.href);
        // Se está navegando para fora da área admin (index.html, outras páginas)
        if (url.pathname.includes('index.html') ||
            url.pathname.includes('conteudos/') ||
            (!url.pathname.includes('dashboard.html') &&
             !url.pathname.includes('admin.html') &&
             url.pathname !== '/' &&
             url.pathname !== '')) {
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminUsername');
        }
    }

    // Verificar cliques em botões que abrem páginas externas
    if (button && button.onclick) {
        const onclickStr = button.onclick.toString();
        if (onclickStr.includes('index.html') || onclickStr.includes('window.open')) {
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminUsername');
        }
    }
});

// Alternar entre abas (sidebar)
document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;

        document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(section).classList.add('active');
    });
});

// Controle de posts
let postCount = 1;

document.getElementById('addPostBtn').addEventListener('click', () => {
    if (postCount >= 4) {
        alert('Você pode adicionar no máximo 4 posts por conteúdo');
        return;
    }

    postCount++;
    const postsContainer = document.getElementById('postsContainer');

    const newPost = document.createElement('div');
    newPost.className = 'post-form';
    newPost.setAttribute('data-post', postCount);
    newPost.innerHTML = `
        <div class="post-header-form">
            <h4>Post ${postCount}</h4>
            <button type="button" class="btn-remove-post" onclick="removePost(this)">
                🗑️ Remover Post
            </button>
        </div>
        <div class="form-group">
            <label for="postTitle${postCount}">Título do Post ${postCount}</label>
            <input type="text" class="post-title" id="postTitle${postCount}" placeholder="Ex: Introdução ao Python" required>
        </div>
        <div class="form-group">
            <label for="postDate${postCount}">Data (opcional)</label>
            <input type="text" class="post-date" id="postDate${postCount}" placeholder="Ex: 15 de Janeiro de 2025">
        </div>
        <div class="form-group">
            <label for="postContent${postCount}">Conteúdo do Post ${postCount}</label>
            <textarea class="post-content" id="postContent${postCount}" rows="8" placeholder="Escreva o conteúdo usando HTML..." required></textarea>
        </div>
    `;

    postsContainer.appendChild(newPost);
});

function removePost(button) {
    const postForm = button.closest('.post-form');
    postForm.remove();
    postCount--;

    // Renumerar posts
    const allPosts = document.querySelectorAll('.post-form');
    allPosts.forEach((post, index) => {
        post.setAttribute('data-post', index + 1);
        post.querySelector('h4').textContent = `Post ${index + 1}`;
    });
}

// Fazer file inputs funcionarem clicando na label
document.querySelectorAll('.file-upload-label').forEach(label => {
    label.addEventListener('click', function(e) {
        e.preventDefault();
        const fileUpload = this.closest('.file-upload');
        const input = fileUpload.querySelector('input[type="file"]');
        if (input) {
            input.click();
        }
    });
});

// Preview da Imagem do Card
document.getElementById('cardImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const imagePreview = document.getElementById('imagePreview');
        const img = imagePreview.querySelector('img');

        const url = URL.createObjectURL(file);
        img.src = url;
        imagePreview.style.display = 'block';
    }
});

// Preview do Vídeo
document.getElementById('videoFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const videoPreview = document.getElementById('videoPreview');
        const video = videoPreview.querySelector('video');

        const url = URL.createObjectURL(file);
        video.src = url;
        videoPreview.style.display = 'block';
    }
});

// Validar Nome do Arquivo
document.getElementById('fileName').addEventListener('input', function(e) {
    let value = e.target.value;
    // Remover espaços e caracteres especiais
    value = value.toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    e.target.value = value;
});

// Botão Pré-visualizar
document.getElementById('previewBtn').addEventListener('click', () => {
    // Mudar para aba de pré-visualização
    document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));

    document.querySelector('[data-section="preview"]').classList.add('active');
    document.getElementById('preview').classList.add('active');

    // Gerar preview do conteúdo
    const title = document.getElementById('contentTitle').value || 'Título do Conteúdo';
    const subtitle = document.getElementById('contentSubtitle').value || 'Subtítulo';

    // Coletar posts
    const posts = [];
    document.querySelectorAll('.post-form').forEach((postForm, index) => {
        const postTitle = postForm.querySelector('.post-title').value;
        const postDate = postForm.querySelector('.post-date').value;
        const postContent = postForm.querySelector('.post-content').value;

        if (postTitle && postContent) {
            posts.push({
                number: index + 1,
                title: postTitle,
                date: postDate,
                content: postContent
            });
        }
    });

    // Gerar HTML do preview
    const postsHTML = posts.map(post => `
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

    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = `
        <div class="preview-page">
            <h1>${title}</h1>
            <p class="subtitle">${subtitle}</p>

            <div class="video-section">
                <h3>Vídeo</h3>
                ${document.getElementById('videoFile').files[0] ?
                    '<video controls style="width: 100%; max-width: 800px; border-radius: 8px;"><source src="' + URL.createObjectURL(document.getElementById('videoFile').files[0]) + '"></video>' :
                    '<p style="color: #DC2626;">Nenhum vídeo foi enviado</p>'
                }
            </div>

            <div class="posts-section">
                <h2>Posts Relacionados</h2>
                ${posts.length > 0 ? postsHTML : '<p class="empty-state">Nenhum post adicionado ainda</p>'}
            </div>
        </div>
    `;
});

// Submeter formulário
document.getElementById('contentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coletar todos os dados
    const formData = new FormData();
    formData.append('title', document.getElementById('contentTitle').value);
    formData.append('subtitle', document.getElementById('contentSubtitle').value);
    formData.append('description', document.getElementById('contentDescription').value);
    formData.append('icon', document.getElementById('contentIcon').value);
    formData.append('fileName', document.getElementById('fileName').value);

    // Adicionar imagem do card (se houver)
    const cardImageFile = document.getElementById('cardImage').files[0];
    if (cardImageFile) {
        formData.append('cardImage', cardImageFile);
        formData.append('cardImageType', cardImageFile.type);
    }

    // Adicionar vídeo
    const videoFile = document.getElementById('videoFile').files[0];
    if (videoFile) {
        formData.append('videoFile', videoFile);
        formData.append('videoType', videoFile.type);
    }

    // Coletar posts
    const posts = [];
    document.querySelectorAll('.post-form').forEach((postForm, index) => {
        const postTitle = postForm.querySelector('.post-title').value;
        const postDate = postForm.querySelector('.post-date').value;
        const postContent = postForm.querySelector('.post-content').value;

        posts.push({
            number: index + 1,
            title: postTitle,
            date: postDate,
            content: postContent
        });
    });

    formData.append('posts', JSON.stringify(posts));

    // Validar
    if (posts.length < 1) {
        alert('Adicione pelo menos 1 post antes de publicar');
        return;
    }

    // Verificar se está editando
    const isEditing = document.getElementById('contentForm').dataset.editingId;

    // Se não está editando e não tem vídeo, exigir vídeo
    if (!isEditing && !videoFile) {
        alert('Faça upload do vídeo antes de publicar');
        return;
    }

    // Mostrar loading
    const loadingMsg = document.createElement('div');
    loadingMsg.style.position = 'fixed';
    loadingMsg.style.top = '50%';
    loadingMsg.style.left = '50%';
    loadingMsg.style.transform = 'translate(-50%, -50%)';
    loadingMsg.style.background = 'white';
    loadingMsg.style.padding = '2rem';
    loadingMsg.style.borderRadius = '12px';
    loadingMsg.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
    loadingMsg.style.zIndex = '10000';
    loadingMsg.innerHTML = `<h3>⏳ ${isEditing ? 'Atualizando' : 'Processando'} conteúdo...</h3><p>Criando arquivos automaticamente...</p>`;
    document.body.appendChild(loadingMsg);

    try {
        let response;

        if (isEditing) {
            // Atualizar conteúdo existente
            response = await fetch(`${SERVER_URL}/api/update-content/${isEditing}`, {
                method: 'POST',
                body: formData
            });
        } else {
            // Criar novo conteúdo
            response = await fetch(`${SERVER_URL}/api/save-content`, {
                method: 'POST',
                body: formData
            });
        }

        const result = await response.json();

        // Remover loading
        document.body.removeChild(loadingMsg);

        if (result.success) {
            // Mostrar modal de sucesso
            showSuccessInstructions(result.content, isEditing);

            // Limpar formulário e edição
            setTimeout(() => {
                document.getElementById('contentForm').reset();
                document.getElementById('videoPreview').style.display = 'none';
                document.getElementById('imagePreview').style.display = 'none';
                postCount = 1;

                // Remover modo de edição
                delete document.getElementById('contentForm').dataset.editingId;
                const submitBtn = document.querySelector('.btn-submit');
                submitBtn.textContent = '✅ Publicar Conteúdo';
                const cancelBtn = document.getElementById('cancelEditBtn');
                if (cancelBtn) cancelBtn.remove();
            }, 1000);

            // Atualizar lista de conteúdos
            loadContentsList();
        } else {
            alert('Erro: ' + result.message);
        }
    } catch (error) {
        document.body.removeChild(loadingMsg);
        alert('Erro ao salvar conteúdo: ' + error.message);
    }
});

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Carregar lista de conteúdos
async function loadContentsList() {
    const contentList = document.getElementById('contentList');

    try {
        const response = await fetch(`${SERVER_URL}/api/contents`);
        const result = await response.json();

        if (!result.success) {
            contentList.innerHTML = '<p class="empty-state">Erro ao carregar conteúdos.</p>';
            return;
        }

        const contents = result.contents;

        if (contents.length === 0) {
            contentList.innerHTML = '<p class="empty-state">Nenhum conteúdo publicado ainda.</p>';
            return;
        }

        contentList.innerHTML = contents.map(content => `
            <div class="content-item">
                <div class="content-item-icon">${content.icon}</div>
                <div class="content-item-info">
                    <h3>${content.title}</h3>
                    <p>${content.description}</p>
                    <small>Criado em: ${new Date(content.createdAt).toLocaleDateString('pt-BR')}</small>
                    <small style="display: block; margin-top: 0.5rem; color: #10B981;">📁 Pasta: conteudos/${content.fileName}/</small>
                </div>
                <div class="content-item-actions">
                    <button onclick="editContent(${content.id})" class="btn-edit">
                        ✏️ Editar
                    </button>
                    <button onclick="viewContent('${content.url}')" class="btn-download">
                        👁️ Visualizar
                    </button>
                    <button onclick="deleteContentItem(${content.id})" class="btn-delete">
                        🗑️ Excluir
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar conteúdos:', error);
        contentList.innerHTML = '<p class="empty-state">Erro ao conectar com o servidor. Certifique-se de que o servidor está rodando.</p>';
    }
}

function viewContent(url) {
    window.open(url, '_blank');
}

async function deleteContentItem(contentId) {
    if (!confirm('Tem certeza que deseja excluir este conteúdo? A pasta e todos os arquivos serão deletados!')) return;

    try {
        const response = await fetch(`${SERVER_URL}/api/delete-content/${contentId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            alert('Conteúdo excluído com sucesso!');
            loadContentsList();
        } else {
            alert('Erro: ' + result.message);
        }
    } catch (error) {
        alert('Erro ao excluir conteúdo: ' + error.message);
    }
}

// Carregar lista ao iniciar
loadContentsList();

// Função para mostrar instruções de sucesso
function showSuccessInstructions(content, isEditing) {
    const modal = document.getElementById('successModal');

    modal.innerHTML = `
        <div class="modal-content success">
            <h3>${isEditing ? '✅ Conteúdo Atualizado!' : '🎉 Arquivos Criados Automaticamente!'}</h3>
            <p style="text-align: center; margin: 2rem 0; font-size: 1.1rem;">
                <strong style="color: #10B981;">${isEditing ? 'Suas alterações foram salvas!' : 'Tudo pronto!'}</strong><br><br>

                📁 Os seguintes arquivos foram criados:<br><br>

                <code style="background: #F3F4F6; padding: 0.5rem; border-radius: 4px; display: block; margin: 1rem 0;">
                conteudos/${content.fileName}/index.html<br>
                conteudos/${content.fileName}/video.*<br>
                ${content.cardImageType ? `conteudos/${content.fileName}/card-image.*` : ''}
                </code>

                O card "${content.title}" já está na página principal! 🚀<br><br>

                Não precisa fazer mais nada!
            </p>
            <button onclick="closeSuccessModal();" class="btn-submit">
                OK
            </button>
            <button onclick="logoutAndOpenIndex();" class="btn-preview" style="margin-left: 1rem;">
                Ver na Página Principal
            </button>
        </div>
    `;
    modal.style.display = 'flex';
}

// Variável global para controlar edição
let editingContentId = null;

// Função para editar conteúdo
async function editContent(contentId) {
    try {
        const response = await fetch(`${SERVER_URL}/api/content/${contentId}`);
        const result = await response.json();

        if (!result.success) {
            alert('Conteúdo não encontrado!');
            return;
        }

        const content = result.content;

        // Marcar que estamos editando
        editingContentId = contentId;
        document.getElementById('contentForm').dataset.editingId = contentId;

        // Preencher formulário
        document.getElementById('contentTitle').value = content.title;
        document.getElementById('contentSubtitle').value = content.subtitle;
        document.getElementById('contentDescription').value = content.description;
        document.getElementById('contentIcon').value = content.icon;
        document.getElementById('fileName').value = content.fileName;

        // Limpar posts adicionais (manter apenas o primeiro)
        const postsContainer = document.getElementById('postsContainer');
        const allPostForms = postsContainer.querySelectorAll('.post-form');

        // Remover todos exceto o primeiro
        allPostForms.forEach((postForm, index) => {
            if (index > 0) {
                postForm.remove();
            }
        });

        // Resetar contador para 1 (já existe o Post 1 no HTML)
        postCount = 1;

        // Preencher posts
        if (content.posts && content.posts.length > 0) {
            // Preencher o primeiro post (que já existe no HTML)
            const firstPostForm = postsContainer.querySelector('.post-form');
            if (firstPostForm && content.posts[0]) {
                firstPostForm.querySelector('.post-title').value = content.posts[0].title || '';
                firstPostForm.querySelector('.post-date').value = content.posts[0].date || '';
                firstPostForm.querySelector('.post-content').value = content.posts[0].content || '';
            }

            // Adicionar posts adicionais (do segundo em diante)
            for (let i = 1; i < content.posts.length; i++) {
                // Clicar no botão para adicionar novo post
                document.getElementById('addPostBtn').click();

                // Aguardar um pouco para o DOM atualizar
                await new Promise(resolve => setTimeout(resolve, 50));

                // Preencher o post recém-criado
                const postForms = postsContainer.querySelectorAll('.post-form');
                const postForm = postForms[i];
                if (postForm && content.posts[i]) {
                    postForm.querySelector('.post-title').value = content.posts[i].title || '';
                    postForm.querySelector('.post-date').value = content.posts[i].date || '';
                    postForm.querySelector('.post-content').value = content.posts[i].content || '';
                }
            }
        }

        // Mudar texto do botão de submit
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.textContent = '✅ Atualizar Conteúdo';

        // Adicionar botão de cancelar edição
        if (!document.getElementById('cancelEditBtn')) {
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.id = 'cancelEditBtn';
            cancelBtn.className = 'btn-preview';
            cancelBtn.textContent = '❌ Cancelar Edição';
            cancelBtn.onclick = cancelEdit;

            const formActions = document.querySelector('.form-actions');
            formActions.insertBefore(cancelBtn, submitBtn);
        }

        // Ir para a aba de adicionar conteúdo
        document.querySelector('[data-section="add-content"]').click();

        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        alert('Erro ao carregar conteúdo para edição: ' + error.message);
    }
}

// Função para cancelar edição
function cancelEdit() {
    editingContentId = null;
    delete document.getElementById('contentForm').dataset.editingId;

    document.getElementById('contentForm').reset();
    document.getElementById('videoPreview').style.display = 'none';
    document.getElementById('imagePreview').style.display = 'none';

    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.textContent = '✅ Publicar Conteúdo';

    const cancelBtn = document.getElementById('cancelEditBtn');
    if (cancelBtn) {
        cancelBtn.remove();
    }

    postCount = 1;
}

// Função para fazer logout e abrir a página principal
function logoutAndOpenIndex() {
    closeSuccessModal();
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    window.open('../index.html', '_blank');
}
