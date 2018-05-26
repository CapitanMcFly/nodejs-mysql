### NodeJS-MySQL

*Read in [English](https://github.com/CapitanMcFly/nodejs-mysql)*

Código de un servidor backend simple (accesible a través de un API REST) que se conecta a una base de datos MySQL. El objetivo es mapear los comandos CRUD de MySQL (Create Read Update Delete) a verbos HTTP (GET POST PUT DELETE).

#### Instrucciones de uso:
```console
usuario@servidor:~$ git clone https://github.com/CapitanMcFly/nodejs-mysql.git
```
Tras clonar este repositorio es necesario ejecutar 'npm install' para que se descarguen todas las dependencias (node_modules).

- **Instalación de MySQL:**
```console
usuario@servidor:~$ sudo apt-get update
usuario@servidor:~$ sudo apt-get upgrade
usuario@servidor:~$ sudo apt-get install mysql-server
usuario@servidor:~$ mysql_secure_installation (Respuestas: N, N, Y, Y, Y, Y)
usuario@servidor:~$ sudo mysql_ssl_rsa_setup --uid=mysql
```

Añadir el certificado autofirmado y el par de claves RSA a la configuración del servidor (/etc/mysql/mysql.conf.d/mysqld.cnf):  
ssl-ca=/var/lib/mysql/ca.pem # Certificado autofirmado  
ssl-cert=/var/lib/mysql/server-cert.pem # Clave pública RSA  
ssl-key=/var/lib/mysql/server-key.pem # Clave privada RSA

Reiniciar el servicio para aplicar la nueva configuración:
```console
usuario@servidor:~$ sudo service mysql restart
```

**NOTA**: Es necesario reemplazar el certificado obtenido al clonar el repositorio, por el que se genera al ejecutar el script 'mysql_ssl_rsa_setup' (ca.pem).

- **Configuración de la base de datos:**

Para que se pueda establecer la conexión con la base de datos MySQL desde node, tiene que existir un usuario llamado 'prueba' (sin contraseña) con permiso para modificar una tabla llamada 'cities' almacenada en una base de datos llamada 'prueba'.

- **Ejecución del servidor backend:**
```console
usuario@servidor:~$ cd nodejs-mysql
usuario@servidor:~/nodejs-mysql$ node server.js
```
