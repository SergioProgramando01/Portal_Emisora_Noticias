from pydantic import BaseModel
from datetime import datetime

class NoticiaBase(BaseModel):
    titulo: str
    subtitulo: str | None = None
    contenido: str
    category: str | None = None # <-- Asegúrate que esta línea esté

class Noticia(NoticiaBase):
    id: int
    fecha_creacion: datetime
    class Config:
        from_attributes = True

class UsuarioBase(BaseModel):
    email: str

class UsuarioCreate(UsuarioBase):
    password: str

class Usuario(UsuarioBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True