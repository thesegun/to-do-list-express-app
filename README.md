This is a To-Do List App built With Express Framework

## Available Endpoints
* **"/"** : This is the endpoint for the Homepage

* **"/signup"** : METHOD **POST**. This is the endpoint for user to register.
	* **Request Object**:
		* firstName : Type(String)
		* lastName : Type(String)
		* username : Type(String)
		* password : Type(String)
		* bio : Type(String)
		* email": Type(String)
		* gender : Type(String)
		* phoneNumber : Type(Number)
		* address : Type(String)
		* state : Type(String)
}
	* **Response Object**:
		* firstName : Type(String)
		* lastName : Type(String)
		* username : Type(String)
		* password : Type(String)
		* bio : Type(String)
		* email": Type(String)
		* gender : Type(String)
		* phoneNumber : Type(Number)
		* address : Type(String)
		* state : Type(String)

* **"/login"** : METHOD **POST**. This is the endpoint for login to the app.
	* **Request Object**:
		* username : Type(String)
		* password : Type(String)

	* **Response Object**:
		* username : Type(String)
		* password : Type(String)

* "/task" : METHOD **POST**. This is the endpoint for user to add tasks.
	* **Request Object**:
		* taskName : Type(String)
		* time : Type(String)
		* description : Type(String)
		* isCompleted : Type(Boolean)
		* reminderTime : Type(Number)

	* **Response Object**:
		* taskName : Type(String)
		* time : Type(String)
		* description : Type(String)
		* isCompleted : Type(Boolean)
		* reminderTime : Type(Number)