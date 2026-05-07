from flask import render_template, request, redirect, url_for
from utilidades import criptografar
from database import inserir_usuario

def init_app(app):
    @app.route('/')
    def inicio():
        return render_template('login-direita.html')

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method=='POST':
            user = request.form.get('user')
            
            email = request.form.get('email')

            senha = request.form.get('senha')
            if len(senha) >= 4:
                senha = criptografar(senha)
            else:
                return 'Senha inválida'
            
            if inserir_usuario(user, email, senha):
                return redirect(url_for('inicio'))
            else:
                return "Erro ao cadastrar usuário. Tente novamente."

        return render_template('login-esquerda.html')

    @app.route('/home')
    def homepage():
        return render_template('home.html')
    
    @app.route('/treinos')
    def treinos():
        return render_template('treinos.html')
    
    @app.route('/status')
    def frequencia():
        return render_template('frequencia.html')  
    
    @app.route('/sobre')
    def sobre():
        return render_template('sobre.html')