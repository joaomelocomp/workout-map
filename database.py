import psycopg2
import os
from dotenv import load_dotenv
from psycopg2 import Error

import psycopg2
import os
from dotenv import load_dotenv

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