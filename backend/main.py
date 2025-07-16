from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Annotated
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware

from . import models, schemas
from .database import SessionLocal, engine

# --- CONFIGURACIÓN DE SEGURIDAD Y METADATOS ---
models.Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "UNA_LLAVE_SECRETA_MUY_DIFICIL_DE_ADIVINAR"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI(title="API del Portal de Emisora y Noticias")

# --- CONFIGURACIÓN DE CORS ---
origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- FUNCIONES DE UTILIDAD ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.Usuario).filter(models.Usuario.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# --- ENDPOINTS ---

@app.get("/")
def leer_raiz():
    return {"mensaje": "¡Bienvenido a la API del Portal de Emisora y Noticias!"}

@app.post("/token")
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/usuarios/", response_model=schemas.Usuario)
def crear_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    hashed_password = get_password_hash(usuario.password)
    db_user = models.Usuario(email=usuario.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/noticias/", response_model=schemas.Noticia)
def crear_noticia(noticia: schemas.NoticiaBase, db: Session = Depends(get_db), current_user: schemas.Usuario = Depends(get_current_user)):
    db_noticia = models.Noticia(**noticia.model_dump())
    db.add(db_noticia)
    db.commit()
    db.refresh(db_noticia)
    return db_noticia

@app.get("/noticias/", response_model=List[schemas.Noticia])
def leer_noticias(category: str | None = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    if category:
        noticias = db.query(models.Noticia).filter(models.Noticia.category == category).offset(skip).limit(limit).all()
    else:
        noticias = db.query(models.Noticia).offset(skip).limit(limit).all()
    return noticias

@app.get("/noticias/{noticia_id}", response_model=schemas.Noticia)
def leer_noticia(noticia_id: int, db: Session = Depends(get_db)):
    db_noticia = db.query(models.Noticia).filter(models.Noticia.id == noticia_id).first()
    if db_noticia is None:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")
    return db_noticia

@app.put("/noticias/{noticia_id}", response_model=schemas.Noticia)
def actualizar_noticia(
    noticia_id: int, 
    noticia: schemas.NoticiaBase, 
    db: Session = Depends(get_db), 
    current_user: schemas.Usuario = Depends(get_current_user)
):
    db_noticia = db.query(models.Noticia).filter(models.Noticia.id == noticia_id).first()
    if db_noticia is None:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    # Asignamos los nuevos valores
    db_noticia.titulo = noticia.titulo
    db_noticia.subtitulo = noticia.subtitulo # <-- AQUÍ ESTABA EL ERROR
    db_noticia.contenido = noticia.contenido
    db_noticia.category = noticia.category

    db.commit()
    db.refresh(db_noticia)
    return db_noticia

@app.delete("/noticias/{noticia_id}")
def eliminar_noticia(noticia_id: int, db: Session = Depends(get_db), current_user: schemas.Usuario = Depends(get_current_user)):
    db_noticia = db.query(models.Noticia).filter(models.Noticia.id == noticia_id).first()
    if db_noticia is None:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")
    db.delete(db_noticia)
    db.commit()
    return {"mensaje": "Noticia eliminada exitosamente"}