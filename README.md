# WebSite Colloboration-Platform

The CB-Platform project is an innovative platform for creating and supporting charitable projects and initiatives. Our mission is to bring people together and inspire good deeds. Together we can change the world!

---

## Requirements

- mySQL
- react
- node
- python

---

# Installation and launch
## Configuration
If manual 
`server/api/database/db_data.py`
change `HOST` on `localhost`


If your launch using docker 
`website-colloboration-platform-database-1`


## Docker
`docker-compose up -d --build`

## Manual launch

Server:
1. Open terminal for server
2. `cd server`
3. Create venv `python -m venv venv`
4. `venv\Scripts\activate`
5. `pip install -r requirements.txt`
6. `python app.py`

Client:
1. Open terminal for client
2. `cd client`
3. `npm install`
4. `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Warning
if your have problem with Database

try this:
1. `pip3 install PyMySQL`

And in directory 

`server/api/database/db_data.py`

change string 

`uri = f'mysql:...`

on

`uri = f'mysql+pymysql:...`

Also start mysql from CMD, Mac OS or Linux

`sudo mysql.server start`
