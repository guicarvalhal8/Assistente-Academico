import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai

# --- Configuração do Flask ---
# O 'static_folder' aponta para o diretório onde o index.html e outros arquivos estáticos estão
app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# --- Configuração da API Gemini ---
# Tenta configurar a API. Se a chave não for válida ou não estiver definida,
# a funcionalidade do chat retornará um erro amigável.
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
gemini_configured = False
if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_configured = True
        print("API Gemini configurada com sucesso.")
    except Exception as e:
        print(f"AVISO: Erro ao configurar a API Gemini. O chat não funcionará. Erro: {e}")
else:
    print("AVISO: A variável de ambiente GEMINI_API_KEY não foi definida. O chat não funcionará.")
    print("Para habilitar o chat, defina sua chave de API como uma variável de ambiente.")


# --- Rotas da Aplicação ---

# Rota para servir a página principal (index.html)
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

# Rota de Login (Simulada)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    matricula = data.get('matricula')
    senha = data.get('senha')

    if matricula == "12345" and senha == "aluno":
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 401

# Rota do Chat Acadêmico (Gemini)
@app.route('/api/chat', methods=['POST'])
def chat():
    if not gemini_configured:
        return jsonify({'error': 'A API de IA não está configurada no servidor. Contate o administrador.'}), 500

    data = request.get_json()
    pergunta = data.get('pergunta')

    if not pergunta:
        return jsonify({'error': 'Nenhuma pergunta fornecida'}), 400

    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(pergunta)
        return jsonify({'resposta': response.text})
    except Exception as e:
        print(f"Erro na chamada da API Gemini: {e}")
        return jsonify({'error': 'Falha ao se comunicar com a IA.'}), 500

# --- Inicialização do Servidor ---
if __name__ == '__main__':
    # A porta 5000 é o padrão, mas é bom especificar para clareza.
    app.run(debug=True, port=5000)
