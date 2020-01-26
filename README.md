# Jyll
An educational online multiplayer game on sustainable development.

# Installation

## Backend

The website uses a Django backend with a mysql database.
Therefore, functional python3 and mysql installations are required to follow this document.

All terminal commands in this section should be run in the backend/ directory:
```
cd backend
```

Note: mysql can be replaced with mariaDB without any additional steps.

#### Installing python dependencies (one time)
Create a new python virtual environment and activate it:
```
python3 -m venv venv
source venv/bin/activate
```
Your prompt should now be prefixed with (venv).

Install the backend's dependencies:
```
pip install -r requirements.txt
```

#### Setting up the database and mysql user (one time)
In a mysql command prompt, create a new database and user:
```
CREATE DATABASE jyll;
CREATE USER 'jyll'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON jyll.* TO 'jyll'@'localhost';
GRANT ALL PRIVILEGES ON test_jyll.* TO 'jyll'@'localhost';
FLUSH PRIVILEGES;
```
You can now migrate the database using a terminal:
```
python manage.py migrate
```

#### Running the web server (every time)
Start the django web server:
```
python manage.py runserver
```
The project should now be running [at this address](http://localhost:8000/)

#### About the virtual environment
The virtual environment can be exited using the following command:
```
deactivate
```
It is required to reactivate it after each reboot:
```
source venv/bin/activate
```

## Frontend

Coming soon~
