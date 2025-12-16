// Sistema de Autenticação Admin

// Credenciais (em produção, isso deveria estar em um backend seguro)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'mundodosaber2025'
};

// Verificar se já está logado
if (localStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'dashboard.html';
}

// Form de Login
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validar credenciais
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Login bem-sucedido
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        window.location.href = 'dashboard.html';
    } else {
        // Login falhou
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Usuário ou senha incorretos!';

        // Limpar campos
        document.getElementById('password').value = '';

        // Shake animation
        errorMessage.classList.add('shake');
        setTimeout(() => {
            errorMessage.classList.remove('shake');
        }, 500);
    }
});

// Limpar mensagem de erro ao digitar
document.getElementById('username').addEventListener('input', () => {
    errorMessage.style.display = 'none';
});

document.getElementById('password').addEventListener('input', () => {
    errorMessage.style.display = 'none';
});
