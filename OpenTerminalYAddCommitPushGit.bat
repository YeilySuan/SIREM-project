@echo off
cd /d "%~dp0"

:: Obtener la fecha de hoy (formato YYYY-MM-DD)
for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set today=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%

:: Obtener la hora actual en formato HHMM
set hour=%time:~0,2%
if "%hour:~0,1%"==" " set hour=0%hour:~1,1%

:: Generar 4 letras aleatorias usando una semilla basada en la hora actual
setlocal enabledelayedexpansion
set "letters=ABCDEFGHIJKLMNOPQRSTUVWXYZ"
set "randomStr="
set /a "seed=!random! * !hour!"

for /L %%i in (1,1,4) do (
    set /a "rand=!seed! * %%i %% 26"
    set "randomStr=!randomStr!!letters:~%rand%,1!"
)

:: Mensaje de commit con la fecha de hoy y las 4 letras aleatorias
set "commitMessage=%today%-%randomStr%"

:: Ejecutar los comandos de Git
git add .
git commit -m "%commitMessage%"
git push origin main

endlocal



