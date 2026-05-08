from flask import Flask, render_template, request, redirect, url_for, session
from utilidades import criptografar
from database import inserir_usuario, buscar_usuario

def init_app(app):
    @app.route('/', methods=['GET', 'POST'])
    def login():
        if request.method=='POST':
            user = request.form.get('user')
            senha = request.form.get('senha')

            print("user:", user)
            print("senha criptografada:", criptografar(senha))
            print("resultado busca:", buscar_usuario(user, criptografar(senha)))

            if buscar_usuario(user, criptografar(senha)):
                session['user'] = user
                return redirect(url_for('homepage', usr=user))
            else:
                return render_template('login-esquerda.html', erro="Usuário ou senha inválidos")
        return render_template('login-esquerda.html')
    

    @app.route('/cadastrar', methods=['GET', 'POST'])
    def cadastrar():
        if request.method=='POST':
            user = request.form.get('user')
            
            email = request.form.get('email')

            senha = request.form.get('senha')
            if len(senha) >= 4:
                senha = criptografar(senha)
            else:
                return 'Senha inválida'
            
            if inserir_usuario(user, email, senha):
                return redirect(url_for('login'))
            else:
                return "Erro ao cadastrar usuário. Tente novamente."

        return render_template('login-direita.html')

    @app.route('/homepage/<usr>')
    def homepage(usr):
        return render_template('home.html', usr=usr)
    
    @app.route('/treinos')
    def treinos():
        return render_template('treinos.html', usr=session.get('user'))
    
    @app.route('/status')
    def frequencia():
        return render_template('frequencia.html', usr=session.get('user'))  
    
    @app.route('/sobre')
    def sobre():
        return render_template('sobre.html', usr=session.get('user'))
    
    @app.route('/logout')
    def logout():
        session.pop('user', None)
        return redirect(url_for('login'))