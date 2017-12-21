# Bikes N Things Item Catalog
---

### Project Overview
> To Develop an application that provides a list of items within a variety of
categories as well as provide a user registration and authentication system.
Registered users will have the ability to post, edit and delete their own items.

### Why This Project?
> Modern web applications perform a variety of functions and provide amazing
features and utilities to their users; but deep down, it’s really all just
creating, reading, updating and deleting data. In this project, you’ll combine
your knowledge of building dynamic websites with persistent data storage to
create a web application that provides a compelling service to your users.

### What Will I Learn?
  * Develop a RESTful web application using the Python framework Flask
  * Implementing third-party OAuth authentication.
  * Implementing CRUD (create, read, update and delete) operations.

### PreRequisites
  * [Python ~2.7](https://www.python.org/)
  * [Vagrant](https://www.vagrantup.com/)
  * [VirtualBox](https://www.virtualbox.org/)

### Setup Project:
  1. Install Vagrant and VirtualBox
  2. Download or Clone [This Project Repo](https://github.com/AaronAstle/FSND-Projects) repository.
  3. Change directory in to the `/project-4/` directory.  This is where the catalog project is located.
  [Here](https://github.com/AaronAstle/FSND-Projects/tree/master/project-4). NOTE:  You should be in this directory while reading this.



## How to Run?
---

  ### Launch Project
  1. Confirm you are in the proper directory `/FSND-Projects/project-4/`.
  2. Launch the Vagrant VM using command:
    ```
      $ vagrant up
    ```
  3. SSH in to the vagrant virtual machine
    ```
      $ vagrant ssh
    ```
      - NOTE: Vagrant may prompt you to change directories in to the `/vagrant/`
        directory.  The following command should take you there properly.
        ```
          $ cd /vagrant/
        ```
      - When in the proper directory, you should see the files of the `/project-4/` clone.

  4. Run the Database Setup script.
    ```
      $ python database_setup.py
    ```

  5. Seed sample data in to the Database. This seed script will also ask you for
  your email in order to set up the catalog. Please enter when prompt asks.
    ```
      $ python database_seed.py
    ```
  6. And now you can start the project server.
    ```
      $ python project.py
    ```
  
  7. Access and test your application by visiting [http://localhost:5000](http://localhost:5000).

  8. When accessing the authorization, the prompt will only allow of a Google option.
