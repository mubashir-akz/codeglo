# codeglo

Clone:- git clone https://github.com/mubashir-akz/codeglo.git

Install dependencies: npm install

Run server: npm start

now server is started at port 3000 http://localhost:3000

Endpoints:-



	Admin:-

		/admin/login :- Login for Admin

			method: get

			data: 

				{

   					 "password":"admin123",

   					 "email": "admin@gmail.com"

				}



		/admin/register: Admin Register

			method: post

			data: 

				{

   					 "password":"admin123",

   					 "email": "admin@gmail.com”,

					“name”: “admin”

				}



		admin/candidates: add candidates 

			method: post

			data: 

				{

    					"name": "Candidate3",  // unique

   					 "candidate_id": 3   //unique

				}

			note: name and candidate id must be unique



		admin/candidates: get candidates 

			method: get





		admin/candidates/:_id : edit candidates

			method: put

				{

    					"name": "Candidate3",  

   					 "candidate_id": 3  

				}

			note: name and candidate id must be unique



		admin/candidates/:_id : delete candidates

			method: delete

				





	User:- 

		



		/users/register :- Register users

			method: post

			data: 

			{

   			 	"name":"usrer",

   				"password": "user123",

				"email": "user@gmail.com"

			}





		/users/login :-  Login users

			method: get

			data:

				{

					"password": "user123",

	    				"email": "user@gmail.com"

				}





		/users/candidate:- Get candidates list

			method: get


		/users/vote/:_id :- Vote candidates

			method: put

			note: one vote for per user

			



Database :- used mongo atlas cloud based storage
For authentication used jsonwebtoken
Used crypto for hashing passwords
using environmental variable used dotenv module
All the endpoints except login and register are authenticated
Edit and Add candidates api’s data validated using middlewares
Deployed in aws ec2 instance
Used pm2 module for server continous running




Aws server baseurl :- http://52.14.171.223:3000 

Local baseurl :- http://localhost:3000

