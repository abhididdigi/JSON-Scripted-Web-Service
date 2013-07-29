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








