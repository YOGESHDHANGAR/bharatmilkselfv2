@echo off

set MYSQL_USER=root
set MYSQL_PASSWORD=487215
set BACKUP_DIR=D:\
set DRIVE_DIR="I:\My Drive"
set DATE=%date:~10,4%-%date:~4,2%-%date:~7,2%
set TIME=%time:~0,2%-%time:~3,2%-%time:~6,2%
set FILENAME=%DATE%_%TIME%.sql

cd "C:\Program Files\MySQL\MySQL Server 8.0\bin\"

mysqldump -u %MYSQL_USER% -p%MYSQL_PASSWORD% bharatmilk > %BACKUP_DIR%\%FILENAME%

@REM copy /Y %BACKUP_DIR%\%FILENAME% %DRIVE_DIR%\%FILENAME%

echo Backup complete.
