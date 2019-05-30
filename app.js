var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')

const port = process.env.PORT || 3000

let uri = "mongodb+srv://thesegun:layomaserati@expressapp-cplmn.mongodb.net/expressapp?retryWrites=true"

let options = {
	reconnectTries : Number.MAX_VALUE,
	poolSize : 10
}

mongoose.connect(uri, options)
.then( ()=> {console.log("Connection established")},
	err => { console.log("Error occured")}
	)


//import database model

var Login = require('./model/login')
var SignUp = require('./model/signup')
var Task = require('./model/task')



app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.send('<h1>Welcome, This is a To-Do list Web Application</h1>')
})


app.post('/signup', function(req, res){
	var signupData = req.body
	//then save the data inside the database
	var saveSignUpData = new SignUp(req.body)
	saveSignUpData.save(function(err, dataSignUp){
		if (err) {res.json({err})}
			else{
				var saveLoginData = new Login({username : req.body.username, password : req.body.password})

				saveLoginData.save(function(err, data){
					if (err) {res.json(err)}
						else{res.json(dataSignUp)}
				})
			}
	})

})

//handle login route
app.post('/login', function(req, res){
	var loginData = req.body
	//check if the login credentials is correct in your database
	Login.find({username: req.body.username, password: req.body.password}, function(err, data){
		if (err) {res.json({err})}
			else{
				console.log(data)
				if (data[0]) {
					res.json({
						text: 'Login successful'
					})
				}
				else{
					res.json({
						text: 'User does not exist!'
					})
				}
	}
})

//handle the route for posting task
app.post('/task', function(req, res){
	var taskData = req.body

	var saveTaskData = new Task(req.body)
	saveTaskData.save(function(err, data){
		if (err) {res.json({err})}
			else{
				res.json(data)
			}

		})
	})

	//route to update the task if it is completed
	app.put('/update/:taskId', function(req, res){
		//get data from the request
		var update = req.body
		//update your database
		Task.findByIdAndUpdate({_id : req.params.taskId}, update, function(err, data){
			if (err) {res.json({err})}
				else{res.json(data)}
		})
	})

	//handle the delete task route

	app.delete('/delete/:taskId', function(req, res){
		//get the task Id
		var taskID = req.body //the req.params  is made available for use by the body parser module
		Task.findByIdAndDelete({_id:req.params.taskId}, function(err,data){
			if (err) {res.json({err})}

			console.log(data)
			res.json({
			text: 'Task Deleted!'
			})
		})
	})

	//handle logout route
	app.get('/logout', function(req, res){
		res.json({
			text: 'Logout successful'
		})
	})
})

	//handle get method to get all task from database
	app.get('/all_task', function(req, res){
		Task.find({}, function(err, dara){
			if(err){ res.json({err})}
			else{
				res.json(data)
			}
		})
	})
app.listen(port, function(){ console.log(`Server started at port ${port}`)})