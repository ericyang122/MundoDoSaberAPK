// Mundo do Saber - Script Principal (Com Backend)
const SERVER_URL = 'http://localhost:3001';

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.querySelector('.theme-label');

if (themeToggle) {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    if (themeLabel) {
        themeLabel.textContent = currentTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        if (themeLabel) {
            themeLabel.textContent = newTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
        }
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Renderizar Vídeos do Servidor
const videosGrid = document.getElementById('videosGrid');
if (videosGrid) {
    loadVideosFromServer();
}

async function loadVideosFromServer() {
    try {
        const response = await fetch(`${SERVER_URL}/api/contents`);
        const result = await response.json();

        if (!result.success) {
            videosGrid.innerHTML = '<p style="text-align: center; color: #DC2626; padding: 2rem;">Erro ao carregar conteúdos.</p>';
            return;
        }

        const contents = result.contents;

        if (contents.length === 0) {
            videosGrid.innerHTML = '<p style="text-align: center; color: #718096; padding: 2rem;">Nenhum conteúdo publicado ainda. Use o painel Admin para adicionar!</p>';
        } else {
            contents.forEach(content => {
                const card = document.createElement('div');
                card.className = 'content-card';
                card.style.cursor = 'pointer';
                card.onclick = () => {
                    window.location.href = content.url;
                };

                // Verificar se tem imagem
                let cardHTML = '';
                if (content.cardImageType) {
                    // Extrair extensão do tipo MIME (image/jpeg -> jpeg, image/png -> png)
                    const extension = content.cardImageType.includes('/') ?
                        content.cardImageType.split('/')[1].replace('jpeg', 'jpg') :
                        'jpg';
                    const imagePath = `conteudos/${content.fileName}/card-image.${extension}`;

                    cardHTML = `
                        <div class="card-image">
                            <img src="${imagePath}" alt="${content.title}" onerror="this.style.display='none'">
                        </div>
                        <div class="card-content">
                            <div class="card-icon">${content.icon}</div>
                            <h3>${content.title}</h3>
                            <p>${content.description}</p>
                            <a class="btn-card">Assistir Agora</a>
                        </div>
                    `;
                } else {
                    cardHTML = `
                        <div class="card-content">
                            <div class="card-icon">${content.icon}</div>
                            <h3>${content.title}</h3>
                            <p>${content.description}</p>
                            <a class="btn-card">Assistir Agora</a>
                        </div>
                    `;
                }

                card.innerHTML = cardHTML;
                videosGrid.appendChild(card);
            });
        }
    } catch (error) {
        videosGrid.innerHTML = '<p style="text-align: center; color: #DC2626; padding: 2rem;">Erro ao conectar com o servidor. Certifique-se de que o servidor está rodando.</p>';
        console.error('Erro:', error);
    }
}

// Dados das Dicas
const tipsData = [
    {
        id: 1,
        title: "Organize seu Tempo",
        description: "Aprenda técnicas simples de gestão de tempo para ser mais produtivo",
        icon: "⏰"
    },
    {
        id: 2,
        title: "Comunicação Eficaz",
        description: "Dicas para melhorar sua comunicação no trabalho e vida pessoal",
        icon: "💬"
    },
    {
        id: 3,
        title: "Saúde Mental",
        description: "Cuide da sua mente com práticas de bem-estar e equilíbrio",
        icon: "🧠"
    },
    {
        id: 4,
        title: "Alimentação Saudável",
        description: "Dicas práticas para melhorar sua alimentação e qualidade de vida",
        icon: "🥗"
    },
    {
        id: 5,
        title: "Exercícios Físicos",
        description: "Mantenha-se ativo com exercícios simples que cabem na sua rotina",
        icon: "🏃"
    },
    {
        id: 6,
        title: "Finanças Pessoais",
        description: "Aprenda a economizar e gerenciar melhor seu dinheiro",
        icon: "💰"
    },
    {
        id: 7,
        title: "Desenvolvimento Pessoal",
        description: "Invista em você mesmo com hábitos que transformam sua vida",
        icon: "🌟"
    },
    {
        id: 8,
        title: "Relacionamentos",
        description: "Construa relações saudáveis com família, amigos e colegas",
        icon: "❤️"
    },
    {
        id: 9,
        title: "Produtividade",
        description: "Técnicas comprovadas para ser mais eficiente no dia a dia",
        icon: "📈"
    },
    {
        id: 10,
        title: "Leitura e Aprendizado",
        description: "Cultive o hábito da leitura e aprendizado contínuo",
        icon: "📚"
    },
    {
        id: 11,
        title: "Autocuidado",
        description: "Reserve tempo para cuidar de si mesmo e sua saúde",
        icon: "💆"
    },
    {
        id: 12,
        title: "Sono de Qualidade",
        description: "Dicas para melhorar seu sono e descanso diário",
        icon: "😴"
    }
];

// Renderizar Dicas
const tipsGrid = document.getElementById('tipsGrid');
if (tipsGrid) {
    tipsData.forEach(tip => {
        const card = document.createElement('div');
        card.className = 'tip-card';
        card.innerHTML = `
            <div class="tip-icon">${tip.icon}</div>
            <h3>${tip.title}</h3>
            <p>${tip.description}</p>
        `;
        tipsGrid.appendChild(card);
    });
}
