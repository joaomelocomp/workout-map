from flask import render_template

def init_app(app):
    @app.route('/')
    def login():
        return render_template('login.html')

    @app.route('/home')
    def homepage():
        return render_template('home.html')
    
    @app.route('/treinos')
    def treinos():
        return render_template('treinos.html')
    
    @app.route('/sobre')
    def sobre():
        return render_template('sobre.html')