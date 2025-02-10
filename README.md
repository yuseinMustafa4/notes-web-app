# Notes web application
This is a simple web application, which lets users create, read, update and delete (CRUD) notes. 

To build this web app, I used Python and Flask for the backened, and for the frontend I used HTML/CSS alongside with JS. 

**Prerequisites**:
Before running this program on your machine, make sure you have the following installed: 
 - Python 
 - MongoDB 
 - Flask
 - Flask - cors 

**Setup instructions**:

1. Clone this repository to your local machine or download the ZIP file.
2. Install Python dependencies such as creating a virtual environment(optional) and having the required packages (e.g. Flask/MongoDB).
3. Ensure that MongoDB is running on your local machine.
   - If MondoDB is not insatlled on your computer, you can install it form the official MongoDB website.
4. **IMPORTANT**: Make sure yhat MongoDB is running at the default address: mongodb://127.0.0.1:27017/ 


**Running the Application**:
1. Once MongoDB is running, start and run the Flask application, which is app.py
2. (By default, the Flask application will run on http://127.0.0.1:5000/, which you should see in the terminal. )
3. Open the frontend
   - navigate to the folder and you should be able to find index.html file
   - you can directly run it to view the frontend or alternitvely visit http://127.0.0.1:8000 to view the frontend.
  
**Troubleshooting**:
1. If MongoDB is not running, run mongod in your terminal.
2. If you have port issues, try app.run(debug=True, port=5001).
3. If you're running the frontend and backend on different ports, make sure CORS is properly configured. This project already includes the necessary CORS setup using the flask-cors library.

