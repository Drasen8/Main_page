@echo off
echo Desplegando a GitHub Pages...

REM Hacer build
echo Haciendo build...
call npm run build:gh-pages

REM Ir a la carpeta de build
cd dist\angular-vite\browser

REM Inicializar git temporal
git init
git add .
git commit -m "Deploy to GitHub Pages"

REM Añadir remote (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/Drasen8/Main_page.git

REM Push a rama gh-pages (forzado)
git push -f origin master:gh-pages

REM Limpiar
cd ..\..\..
rmdir /s /q dist\angular-vite\browser\.git

echo ¡Desplegado exitosamente!
pause
