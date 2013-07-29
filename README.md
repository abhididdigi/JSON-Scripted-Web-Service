---
published: false
---

JSON-Scripted-Web-Service
=========================

A Script Include to cater to Scripted Web services, using JSON over REST.

** What is this: **

JSON Scripted Web Service consists of all the parts that one would need to write Scripted Web Service code for REST (instead of SOAP).
If you already have worked with [Scripted WebServices for SOAP](http://wiki.servicenow.com/index.php?title=Scripted_Web_Services), this Script Include is same concept extending it to REST .

** What can I do with this? **

You can write code in the Script Part of JSON Scripted WebService Module(just same as how you write it for Scripted Web Service), which will be executed,and the results(in JSON) will be passed to the caller of that Web Service.

** Components: **

* A table where you can write the Code that you want to execute.
* A Script Include that takes the Script that you have written, executes the code and passes the result to the caller.

** Installation: **

Install the Update Set `JSONScriptedWebServices` update set from the Update Set  folder.
Once you install that Update Set, You will be greeted with a new module called ** Scripted JSON Web Service  ** and a new Script Include called ** JSONScriptedProcessor **

** Usage: **


### Step 1:
Go to Scripted JSON Web Service , Click on `new` (which opens a new record) which has two columns:

* END Point URL - The URL to which the Caller,calling this Web Service will `POST`.

* The Script which you would want to run. Remember, this script should ** always ** have a `return` statement, and it always should return [`JSON`](http://www.json.org/)

This variable that you return will be passed back to the caller.

Once you are done writing your script - Click on `Submit` or `Save`. Notice that once you Save/Submit there will be a couple of lines that will be added to the Script. Please don't modify those lines, unless you know what you're doing.

### Step2: Pulling/Calling the Script written in Step 1 
You can call any JSON Scripted Web Service  over REST using this URL:

https://[your_instance].service-now.com/ScriptedJSON.do?sysparm_raw=true&sysparm_scriptedName=[name_of_the_scripted_service_created_in_step_1]

#### Setting the Authentication:

The headers should be set to use Basic Authentication.

#### Setting the Body:


The parameters should be passed as body of this REST request. Remember, the parameter should always be in JSON format.
The Parameter will be available to the Script of JSON Scripted Web service as `request` object. See the TEST CASES folder for examples and screens.













