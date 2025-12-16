# ✅ Checklist de Teste Completo - Mundo do Saber

## 🚀 PASSO 1: Verificar Servidor

```bash
# Se não estiver rodando, inicie:
npm start

# Deve aparecer:
# 🚀 Servidor rodando em http://localhost:3001
```

---

## 📱 PASSO 2: Testar Página Principal

### Acesse: http://localhost:3001/index.html

#### ✅ Checklist:
- [ ] Página carrega sem erros no console (F12)
- [ ] Menu mobile (3 barrinhas) aparece no mobile/tela pequena
- [ ] Clicar nas 3 barrinhas abre o menu
- [ ] Links do menu funcionam (Início, Vídeos, Dicas, Sobre, Admin)
- [ ] Seção "Quem Somos" aparece
- [ ] Seção "Dicas de Vida" aparece com 12 dicas
- [ ] Footer aparece

#### 🐛 Se algo não funcionar:
1. Abra o Console (F12)
2. Veja se tem erro de "script not found"
3. Recarregue com Ctrl + Shift + R

---

## 🔐 PASSO 3: Testar Login Admin

### Acesse: http://localhost:3001/admin.html

#### ✅ Checklist:
- [ ] Página de login aparece
- [ ] Digite:
  - Usuário: `admin`
  - Senha: `mundodosaber2025`
- [ ] Clique em "Entrar"
- [ ] Redireciona para dashboard.html

#### 🐛 Se não funcionar:
- Verifique se está acessando via `localhost:3001` e não `file://`

---

## 📝 PASSO 4: Testar Painel Admin

### Você está em: http://localhost:3001/dashboard.html

#### ✅ Checklist Sidebar (Menu Lateral):
- [ ] **"Adicionar Conteúdo"** está ativo (azul claro)
- [ ] Clicar em **"Gerenciar Conteúdos"** muda a aba
- [ ] Clicar em **"Pré-visualizar"** muda a aba
- [ ] Consegue voltar para "Adicionar Conteúdo"

#### ✅ Checklist Botão Sair:
- [ ] Botão "Sair" no canto superior direito aparece
- [ ] Clicar em "Sair" pede confirmação
- [ ] Confirmar volta para login (admin.html)

---

## 📤 PASSO 5: Testar Upload de Conteúdo

### Na aba "Adicionar Conteúdo"

#### ✅ Preencha o formulário:

1. **Informações Básicas:**
   - [ ] Título: `Teste do Sistema`
   - [ ] Subtítulo: `Verificando funcionamento`
   - [ ] Descrição: `Este é um teste para verificar se tudo funciona`
   - [ ] Ícone: `🧪`
   - [ ] Nome do Arquivo: `teste-sistema`

2. **Upload de Imagem (Card):**
   - [ ] Clique em "Imagem do Card"
   - [ ] Selecione uma imagem
   - [ ] Preview da imagem aparece abaixo

3. **Upload de Vídeo:**
   - [ ] Clique em "Upload de Vídeo"
   - [ ] Selecione um vídeo MP4
   - [ ] Preview do vídeo aparece abaixo
   - [ ] Consegue dar play no preview

4. **Posts:**
   - [ ] Preencha o Post 1:
     - Título: `Introdução`
     - Data: `14 de Dezembro de 2025`
     - Conteúdo: `<p>Este é um teste de conteúdo.</p>`

   - [ ] Clique em "+ Adicionar Mais um Post"
   - [ ] Post 2 aparece
   - [ ] Preencha o Post 2:
     - Título: `Conclusão`
     - Conteúdo: `<p>Teste finalizado com sucesso!</p>`

5. **Botões:**
   - [ ] Botão "👁️ Pré-visualizar" aparece
   - [ ] Botão "✅ Publicar Conteúdo" aparece

---

## 👁️ PASSO 6: Testar Pré-visualização

- [ ] Clique em "👁️ Pré-visualizar"
- [ ] Aba "Pré-visualizar" abre automaticamente
- [ ] Mostra como ficará o conteúdo
- [ ] Vídeo aparece
- [ ] Posts aparecem formatados

---

## ✅ PASSO 7: Publicar Conteúdo

- [ ] Volte para "Adicionar Conteúdo"
- [ ] Clique em "✅ Publicar Conteúdo"
- [ ] Aparece mensagem "⏳ Processando conteúdo..."
- [ ] Aguarde alguns segundos
- [ ] Aparece modal de sucesso:
  ```
  🎉 Arquivos Criados Automaticamente!
  Tudo pronto!

  📁 Os seguintes arquivos foram criados:
  conteudos/teste-sistema/index.html
  conteudos/teste-sistema/video.*
  conteudos/teste-sistema/card-image.*
  ```
- [ ] Clique em "Ver na Página Principal"

---

## 🎯 PASSO 8: Verificar Conteúdo Criado

### Na Página Principal (index.html)

- [ ] Card "Teste do Sistema" aparece na seção "Vídeo-Aulas"
- [ ] Imagem do card aparece
- [ ] Ícone 🧪 aparece
- [ ] Título e descrição aparecem
- [ ] Clicar no card abre: `http://localhost:3001/conteudos/teste-sistema/index.html`

### Na Página do Conteúdo

- [ ] Página carrega corretamente
- [ ] Vídeo player aparece e funciona
- [ ] Posts aparecem formatados
- [ ] Navbar funciona
- [ ] Breadcrumb mostra: Início / Teste do Sistema

---

## 📋 PASSO 9: Testar Gerenciar Conteúdos

### No dashboard, aba "Gerenciar Conteúdos"

- [ ] Lista mostra o conteúdo "Teste do Sistema"
- [ ] Mostra ícone 🧪
- [ ] Mostra título e descrição
- [ ] Mostra data de criação
- [ ] Mostra pasta: `conteudos/teste-sistema/`

#### Botões de Ação:
- [ ] Botão "✏️ Editar" aparece
- [ ] Botão "👁️ Visualizar" aparece
- [ ] Botão "🗑️ Excluir" aparece

---

## ✏️ PASSO 10: Testar Edição

- [ ] Clique em "✏️ Editar" do conteúdo teste
- [ ] Volta para aba "Adicionar Conteúdo"
- [ ] Formulário está preenchido com dados existentes
- [ ] Botão muda para "✅ Atualizar Conteúdo"
- [ ] Aparece botão "❌ Cancelar Edição"
- [ ] Altere o título para: `Teste do Sistema - Editado`
- [ ] Clique em "✅ Atualizar Conteúdo"
- [ ] Mostra mensagem de sucesso
- [ ] Volte para "Gerenciar Conteúdos"
- [ ] Título está atualizado

---

## 👁️ PASSO 11: Testar Visualizar

- [ ] Clique em "👁️ Visualizar"
- [ ] Abre o conteúdo em nova aba
- [ ] Página carrega corretamente

---

## 🗑️ PASSO 12: Testar Exclusão

- [ ] Volte para "Gerenciar Conteúdos"
- [ ] Clique em "🗑️ Excluir"
- [ ] Aparece confirmação: "Tem certeza que deseja excluir..."
- [ ] Clique em "OK"
- [ ] Mostra mensagem: "Conteúdo excluído com sucesso!"
- [ ] Conteúdo some da lista
- [ ] Volte para página principal
- [ ] Card "Teste do Sistema" não aparece mais

---

## 📂 PASSO 13: Verificar Arquivos Criados

### No explorador de arquivos, vá para:
```
EsproProjetoMobile/conteudos/
```

- [ ] Pasta `teste-sistema/` foi criada (ou foi deletada se você excluiu)
- [ ] Dentro tem: `index.html`, `video.*`, `card-image.*`

---

## 🎉 Resultado Final

Se TODOS os itens acima funcionaram:
✅ **SISTEMA 100% FUNCIONAL!**

Se algo não funcionou:
❌ **Anote qual passo falhou e me avise!**

---

## 🐛 Troubleshooting Rápido

### Menu mobile não abre:
- Abra F12 (Console)
- Veja se tem erro de script
- Recarregue com Ctrl + Shift + R

### Upload não mostra preview:
- Verifique se está usando localhost:3001
- Verifique se o servidor está rodando
- Veja erros no console (F12)

### Publicar não cria arquivos:
- Abra console (F12)
- Veja se tem erro de conexão
- Verifique se servidor está rodando
- Verifique se está em localhost:3001

### Dicas de Vida não aparecem:
- Verifique se index.html está carregando `script-server.js`
- Veja console para erros
- Recarregue página

---

## 📞 Se Nada Funcionar

1. Feche o servidor (Ctrl + C no terminal)
2. Execute:
```bash
npm install
npm start
```
3. Acesse: http://localhost:3001/index.html
4. Teste novamente desde o PASSO 2

---

**Criado para garantir que TUDO funcione perfeitamente! ✨**
