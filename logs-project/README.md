# Log Analysis Project
### Aaron Astle

---

## Setup

Confirm that you have the following tools installed on your machine

  * [Python3](https://www.python.org/)
  * [Vagrant](https://www.vagrantup.com/)
  * [VirtualBox](https://www.virtualbox.org/)

Once you have the tools installed and running properly, continue to the code.

## Code

1. Download or Clone this repo to your preferred directory.

2. Download the sql files for use. [Source Zip](https://d17h27t6h515a5.cloudfront.net/topher/2016/August/57b5f748_newsdata/newsdata.zip)

3. Copy the unzipped `*.sql` file to your cloned project.

4. Start the virtual machine:
  - Using the CLI (Command Line) `cd` in to your project
    `$ cd (project-directory)`
  
  - Once in the project directory you will want to start vagrant.
    - `$ vagrant up` - Wait for Completeion, once installed has completed your can ssh in to the vagrant box

    - `$ vagrant ssh` - to enter the Vagrant box

    - Check to make sure you are in the right directory, confirm that your news filse
      are in the current directory.  If not, `cd` in to the proper directory.
      - You are looking for `/(project-directory)`

    - Once in the proper directory, you can seed the sql data into postgresql.

5. Seed the SQL data.
  - Use the following command to create the database with the data
    - `$ psql -d news -f newsdata.sql`
  
  - To access the database:
    - `$ psql -d news` - Will connect you to the database for viewing

6. Run the log program:
  `$ python3 newsproject.py` - This will run the queries and output the results
  to a txt file for viewing.

  - Result should be located in the `newsproject.txt` file.

