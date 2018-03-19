# Linux Project - Udacity Full Stack Nanodegree
---

This project is to share the instructions for locating and interacting with my
linux server on the AWS Lightsail platform.


## Site Info

The Ip to the site on AWS Lightsail is:

  - ### IP Addresses
    `54.244.63.96` and can be viewed at this link to the [SITE](http://54.244.63.96.xip.io)

  - ### SSH Port
    The SSH Post has been changed from `22` to `2200` per the instructions on this
    project.

  - ### Software Used
    - Using the course work in the path, I used AWS Lightsail as a host.
    [AWS LightSail](https://lightsail.aws.amazon.com)
    - Ubuntu 16.04 LTS
    - Apache, Python3, PostgreSQL, Flask

## Step Taken

1. Purchase $5/mo plan on AWS and set it up with Ubuntu.

2. Download/Setup basic Key Auth for `ubuntu` user. Allowing console `ssh` to be
a little easier then through the GUI portal on AWS.

3. Update the packages right off the bat.

  `$ sudo apt-get update`

4. Change AWS ssh port to `2200` per instructions.

  `$ sudo vim /etc/ssh/sshd_config`

  `$ sudo service ssh restart`

  - In the broswer make sure the networking tab of the Lightsail instance has 
  `22` removed and replace it with `other` & `2200`

5. Address the Firewall through linux and UFW.

  ```bash
  $ sudo ufw allow 2200
  $ sudo ufw allow www
  $ sudo ufw allow ntp
  $ sudo ufw enable
  $ sudo ufw status // Should see the following

    Status: active

    To                         Action      From
    --                         ------      ----
    2200/tcp                   ALLOW       Anywhere
    80/tcp                     ALLOW       Anywhere
    123                        ALLOW       Anywhere
    2200/tcp (v6)              ALLOW       Anywhere (v6)
    80/tcp (v6)                ALLOW       Anywhere (v6)
    123 (v6)                   ALLOW       Anywhere (v6)
  ```

6. Add the grader user through linux.

  - `$ sudo adduser grader`
  
  - Add as a sudo users

    `$ sudo vim /etc/sudoers.d/grader/`

    - `grader ALL=(ALL) NOPASSWD:ALL` as contents to that file

  - Create directory for SSH Keys

    ```bash
      $ su - grader
      $ mkdir .ssh
      $ chmod 700 .ssh // Set permissions for adding files
      $ sudo vim .ssh/authorized_keys // File to house pub key
      $ chmod 644 .ssh/authorized_keys // Remove permissions other than grader
    ```
   - NOTE: Grader will need to add key provided in notes to the local file `.ssh/grader` for ssh
     access.

  - Once Grader key is added.  Ssh in to the machine with the following command

    `$ ssh -p 2200 -i ~/.ssh/grader grader@54.244.63.96`

6. Checked Timezone for appropriate UTC time

  `$ sudo timedatectl set-timezone UTC`

7. Installed Supporting Software - Apache, Mod WSGI, PostGreSQL and Python 3 support libraries

  `$ sudo apt install apache2 python3 libapache2-mod-wsgi-py3`
  `$ sudo apt-get install postgresql`

8. Double check the PostgreSQL isnt allowing Remote Connections by reviewing the following file:

  `$ sudo vim /etc/postgres/9.5/main/pg_hgba.conf`
  - Confirm that no external addresses are allowed. Then Save.

9. Create Database and limited usage of database by 'Catalog' owners.

  `$ sudo -u postgred psql` - Log in as super user

  `postgres=# CREATE USER catalog WITH PASSWORD 'password';` - User with limited ability

  `postgres=# CREATE DATABASE catalog WITH OWNER catalog;` - Catalog database owned by limited ability user

10. Installing git for repo access.

  `$ sudo apt-get install git`

  - NOTE:  I used this only to pull large project repo then pull out the catalog
  project only.  Removed the rest of the repo.

11. Prevent `.git` from being recognized by Apache
  
  `$ sudo vim /var/www/catalog/.htaccess`

  - Add the following: `RedirectMatch 404 /\.git`

12. After downloading the Catalog project and mitigating a few bugs and namespaces
the following commands got the sytem up and running.

  ```bash
  $ sudo apt install python3-pip
  $ sudo pip3 install --upgrade pip
  $ sudo pip3 Flask httplib2 requests oauth2client sqlalchemy psycopg2 // Multiple package named at once

  ```

13.  Once the packages are install and the local running of the python app are working,
then it was time to set up all of the virtual-host files. Guided by this article:

  - [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps)


14. Google API for Oauth and adding the current IP/address to the Accepted URLs

15. Remove Root login ability.

  `$ sudo vim /etc/ssh/sshd_config`

  - Editing or confirm the info to follow the next few lines:
    
    ```
    PermitRootLogin no
    PasswordAuthenticated no
    ```

16. Restart and the application should be working in the browser.

  `$ sudo service ssh restart`
  
  `$ sudo servce apache2 restart  // Could use reload instead`



### Now to View the site

[Working AWS Site](http://54.244.63.96.xip.io)

## External Resources
  - [Digital Ocean Article](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps)

  - [Flask Deployment Docs](http://flask.pocoo.org/docs/0.12/deploying/mod_wsgi/)

  - Videos from Course Info were helpful too.




