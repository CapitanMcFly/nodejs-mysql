### NodeJS-MySQL

*Leer en [Español](https://github.com/CapitanMcFly/nodejs-mysql/blob/master/README.ES.md)*

Code of a simple backend server (available through a REST API) that connects to a MySQL database. The main goal is to map MySQL CRUD (Create Read Update Delete) into HTTP verbs (GET POST PUT DELETE).

#### Usage instructions:
```console
user@server:~$ git clone https://github.com/CapitanMcFly/nodejs-mysql.git
```
After cloning this repository it's necessary to execute 'npm install' in order to download all dependencies (node_modules).

- **MySQL installation:**
```console
user@server:~$ sudo apt-get update
user@server:~$ sudo apt-get upgrade
user@server:~$ sudo apt-get install mysql-server
user@server:~$ mysql_secure_installation (Answers: N, N, Y, Y, Y, Y)
user@server:~$ sudo mysql_ssl_rsa_setup --uid=mysql
```

Add the self-signed certificate and the RSA key pair to the server configuration (/etc/mysql/mysql.conf.d/mysqld.cnf):  
ssl-ca=/var/lib/mysql/ca.pem # Self-signed certificate  
ssl-cert=/var/lib/mysql/server-cert.pem # RSA public key  
ssl-key=/var/lib/mysql/server-key.pem # RSA private key

Restart the service to apply the new configuration:
```console
user@server:~$ sudo service mysql restart
```

**NOTE**: Replace the certificate obtained when cloning the repository, by the one generated when executing the script 'mysql_ssl_rsa_setup' (ca.pem).

- **Database configuration:**

To be able to establish the connection with the MySQL database from node, there must be a user named 'prueba' (without password) with permission to modify a table named 'cities' stored in a database named 'prueba'.

- **Backend server execution:**
```console
user@server:~$ cd nodejs-mysql
user@server:~/nodejs-mysql$ node server.js
```
