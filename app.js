document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const btnLogin = document.getElementById('btn-login');

    const navChat = document.getElementById('nav-chat');
    const navQuiz = document.getElementById('nav-quiz');
    const navComunidade = document.getElementById('nav-comunidade');

    const chatContent = document.getElementById('chat-content');
    const quizContent = document.getElementById('quiz-content');
    const comunidadeContent = document.getElementById('comunidade-content');

    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const btnSendChat = document.getElementById('btn-send-chat');

    const quizBox = document.getElementById('quiz-box');
    const comunidadeBox = document.getElementById('comunidade-box');

    const API_URL = 'http://127.0.0.1:5000/api';

    // Lógica de Login
    btnLogin.addEventListener('click', async () => {
        const matricula = document.getElementById('matricula').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matricula, senha })
            });
            const data = await response.json();

            if (data.success) {
                loginView.style.display = 'none';
                dashboardView.style.display = 'flex';
                chatContent.style.display = 'block'; // Mostra o chat por padrão
            } else {
                alert('Matrícula ou senha inválida!');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao tentar fazer login. Verifique o console.');
        }
    });

    // Lógica de Navegação
    function showContent(contentToShow) {
        [chatContent, quizContent, comunidadeContent].forEach(content => {
            content.style.display = 'none';
        });
        contentToShow.style.display = 'block';
    }

    navChat.addEventListener('click', () => showContent(chatContent));

    navQuiz.addEventListener('click', async () => {
        showContent(quizContent);
        try {
            const response = await fetch(`${API_URL}/quiz`);
            const data = await response.json();
            quizBox.textContent = data.quiz;
        } catch (error) {
            console.error('Erro ao buscar quiz:', error);
            quizBox.textContent = 'Erro ao carregar o quiz.';
        }
    });

    navComunidade.addEventListener('click', async () => {
        showContent(comunidadeContent);
        try {
            const response = await fetch(`${API_URL}/comunidade/chat`);
            const data = await response.json();
            comunidadeBox.innerHTML = '';
            data.forEach(msg => {
                const p = document.createElement('p');
                p.textContent = `${msg.user}: ${msg.msg}`;
                comunidadeBox.appendChild(p);
            });
        } catch (error) {
            console.error('Erro ao buscar chat da comunidade:', error);
            comunidadeBox.textContent = 'Erro ao carregar o chat da comunidade.';
        }
    });

    // Lógica do Chat
    btnSendChat.addEventListener('click', async () => {
        const pergunta = chatInput.value;
        if (!pergunta) return;

        appendMessage('Você', pergunta);
        chatInput.value = '';

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pergunta })
            });
            const data = await response.json();
            appendMessage('Assistente', data.resposta);
        } catch (error) {
            console.error('Erro no chat:', error);
            appendMessage('Assistente', 'Erro ao obter resposta.');
        }
    });

    function appendMessage(sender, message) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
