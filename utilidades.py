import hashlib

def criptografar(senha):
    hash_obj = hashlib.sha256(senha.encode('utf-8'))
    return hash_obj.hexdigest()