# Product App

Deliverable project to display Most Reviewed and Best Rated products. 

## Prerequisites

Below is a list of software that needs to be downloaded locally to be able to run the application on your own PC.
         
* WSL2
* Node.js
* Go

## Startup
To be able to run the application, open WSL2, navigate to the directory the product app is saved under. Then navigate to the scripts directory and execute the start script.

    cd scripts && ./start.sh

## Shutdown
To shutdown both the go and react server execute `Ctrl + C` in terminal

## Schema Changes
* Added "lastPage" property to determine the last page of products.
* Changed "totalReview" to "totalReviews" to be more accurate. 
* Changed "Rating" to "rating" to follow camelCase convention throughout json document.

## Future Development
Here is a list of future development that can be done to fully flesh out the Product App
* Color Scheme for UI.
* Use database to store product data.
* Have REST API retrieve data from database and send data back to client.
* Implement security protocals to secure API, client and database. 
* Gather more details about routing. Implement routing using React Router.