@echo off
echo ========================================
echo CRIAR REPOSITORIO NO GITHUB
echo ========================================
echo.
echo Por favor, siga estes passos:
echo.
echo 1. Abra: https://github.com/new
echo 2. Nome do repositorio: benny-standup
echo 3. Visibilidade: Public
echo 4. NAO inicialize com README/gitignore/license
echo 5. Clique em "Create repository"
echo.
echo Pressione qualquer tecla apos criar o repositorio...
pause > nul

echo.
echo ========================================
echo QUAL E SEU USERNAME DO GITHUB?
echo ========================================
set /p GITHUB_USER="Digite seu username: "

echo.
echo Configurando remote...
git remote add origin https://github.com/%GITHUB_USER%/benny-standup.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo SUCESSO!
echo ========================================
echo Repositorio: https://github.com/%GITHUB_USER%/benny-standup
echo.
pause
