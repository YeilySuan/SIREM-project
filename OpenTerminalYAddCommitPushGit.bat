@echo off
cd /d "%~dp0"

:: Obtener la fecha y hora de hoy (formato YYYY-MM-DD-HH-MM-SS)
for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set today=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%-%datetime:~8,2%-%datetime:~10,2%-%datetime:~12,2%

:: Semilla para la generación aleatoria
setlocal enabledelayedexpansion
set "letters=ABCDEFGHIJKLMNOPQRSTUVWXYZ"
set "randomStr="

:: Utilizar la fecha y hora como semilla para la generación de letras aleatorias
:: Generar 4 letras aleatorias
for /L %%i in (1,1,4) do (
    set /a "rand=!today:~%%i,1! + !today:~%%i+1,1! + !today:~%%i+2,1!" %% 26
    set "randomStr=!randomStr!!letters:~%rand%,1!"
)

:: Mensaje de commit con la fecha completa y las 4 letras aleatorias
set "commitMessage=%today%-%randomStr%"

:: Ejecutar los comandos de Git
git add .
git commit -m "%commitMessage%"
git push origin main

endlocal






