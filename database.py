import psycopg2
import os
from dotenv import load_dotenv
from psycopg2 import Error

load_dotenv()

def conectar():

    DATABASE_URL = os.getenv("DATABASE_URL")

    try:

        if "localhost" in DATABASE_URL:
            conn = psycopg2.connect(DATABASE_URL)
        else:
            conn = psycopg2.connect(
                DATABASE_URL,
                sslmode='require'
            )

        return conn

    except Exception as e:
        print("Erro ao conectar:", e)
        return None

def inserir_usuario(user, email, senha):

    conn = conectar()

    if not conn:
        return False

    try:

        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO users (usuario, email, senha)
            VALUES (%s, %s, %s)
        """, (user, email, senha))

        conn.commit()

        return True

    except Error as e:

        print(f"Erro ao inserir usuário: {e}")

        conn.rollback()

        return False

    finally:

        if 'cursor' in locals():
            cursor.close()

        conn.close()

'''conn = conectar()
cursor = conn.cursor()
cursor.execute("SELECT * FROM workoutmap")
print(cursor.fetchall())'''

def buscar_usuario(user, senha):
    conn = conectar()
    if not conn:
        return False

    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT usuario FROM users 
            WHERE usuario = %s AND senha = %s
        """, (user, senha))
        
        resultado = cursor.fetchone()
        return resultado is not None

    except Error as e:
        print(f"Erro ao buscar usuário: {e}")
        return False

    finally:
        if 'cursor' in locals():
            cursor.close()
        conn.close()

def criar_tabela():
    conn = conectar()
    if not conn:
        return

    try:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                usuario VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL
            )
        """)
        conn.commit()
        print("Tabela criada com sucesso!")

    except Error as e:
        print(f"Erro ao criar tabela: {e}")

    finally:
        if 'cursor' in locals():
            cursor.close()
        conn.close()