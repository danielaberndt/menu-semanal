# Menú Semanal - Instrucciones para Vercel

## Paso 1: Crear repositorio en GitHub

1. Ve a **github.com** y crea una cuenta (si no tienes)
2. Haz clic en "New repository"
3. Nombre: **menu-semanal**
4. Selecciona "Public"
5. Haz clic en "Create repository"

## Paso 2: Subir los archivos

Tienes 2 opciones:

### Opción A - Drag and Drop (MÁS FÁCIL)
1. En tu nuevo repositorio, haz clic en "uploading an existing file"
2. Descarga todos los archivos de esta carpeta a tu computadora
3. Arrastra y suelta los archivos en GitHub
4. Haz clic en "Commit changes"

### Opción B - Línea de comandos (para usuarios avanzados)
```bash
git clone https://github.com/TU-USUARIO/menu-semanal.git
cd menu-semanal
# Copia los archivos aquí
git add .
git commit -m "Initial commit"
git push
```

## Paso 3: Conectar a Vercel

1. Ve a **vercel.com** e inicia sesión
2. Haz clic en "New Project"
3. Selecciona "Import Git Repository"
4. Busca y selecciona "menu-semanal"
5. Haz clic en "Deploy"
6. **¡Listo! En 2 minutos tu app estará online**

## Paso 4: Agregar a tu celular

Cuando Vercel termine de desplegar:
1. Copia la URL que te da Vercel (algo como menu-semanal-xyz.vercel.app)
2. Abre esa URL en tu celular
3. Toca el botón de compartir (iOS) o menú (Android)
4. Selecciona "Agregar a pantalla de inicio"
5. ¡Tu app estará en tu celular como una app instalada!

---

**Si tienes dudas en algún paso, avísame.**
