# Fullstack Template

## Setup

### Step 1 (Clone Project)

Clone the project to your local computer

<pre>
  git clone https://github.com/FrithjofThorvik/FullstackTemplate.git
</pre>

### Step 2 (GitHub)

Create & connect to a new GitHub repository

<pre>
  rm -rf .git
  git init
  git remote add origin [GitHub Link]
  git add .
  git commit -m "First commit"
</pre>

### Step 3 (Heroku)

1. Create a new project in Heroku
2. Choose GitHub as Deployment Method and connect to your GitHub account
3. Connect the Heroku project to your repository by entering its name
4. Enable automatic deployments to master branch

### Step 4 (MySQL)

1. In Heroku, head to resources and install ClearDB MySQL
2. Connect it to your Heroku appplication
3. Head to settings -> Reveal Config Vars -> copy CLEARDB_DATABASE_URL
4. Insert these details into server -> configs -> replace all values
5. Use [MySQLWorkbeng](https://dev.mysql.com/downloads/workbench/) or another software to view database data

`ClearDB MySQL Fields: mysql://[username]:[password]@[host]/[database]?reconnect=true`

### Step 5 (Configs)

1. Enter your heroku url in the .env file in your ./client folder
2. Add all env configs to Heroku in Config Vars in settings
