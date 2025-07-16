from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexión a la base de datos MySQL con XAMPP
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost/portal_noticias_db?charset=utf8mb4"

# Se crea el "motor" de la base de datos
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Se crea una sesión para conectarnos a la BD. Usaremos esto en cada petición.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Una clase base que usarán nuestros modelos de datos (ORM)
Base = declarative_base()