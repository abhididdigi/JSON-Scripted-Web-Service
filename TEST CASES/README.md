
## TEST CASES:

Note: In all the test cases, I will be using [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) as Caller - for calling all the JSON Scripted Web Services.

### Test Case 1: 

Send a `JSON` with all the incidents belonging to a Problem sys_id( that will be passed along with request.)

####### Input(from the caller): {"problem_id":"d7296d02c0a801670085e737da016e70"}

####### Output(From service now to caller) : 
```
[{"incident_number":"INC00051","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00052","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00053","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00054","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00055","problem_number":"d7296d02c0a801670085e737da016e70"}]
```

#### Screens : 

<img src="http://servicenowdiary.com/wp-content/uploads/2013/07/TestCase1.png"/>

#### Script :

<img src="http://servicenowdiary.com/wp-content/uploads/2013/07/TestCaseScript.png"/>

Code:
```
/***The following lines are added to make something work fine for you. Please donot modify these lines.**/
request = Packages.java.net.URLDecoder.decode(request);
request = new JSON().decode(request);
/*****************************************End of the addition-Start your script.*********************/
gs.log(request.problem_id);
var gr = new GlideRecord("incident");
gr.addQuery("problem_id",request.problem_id);
gr.query();
var arr = [];
while(gr.next()){
var o = {};
o['incident_number'] = gr.getValue('number');
o['problem_number'] = gr.getValue('problem_id');
arr.push(o);

}
JSUtil.logObject(arr,"Resulting Javascript Object");
return arr;
```


### Test Case 2 : Sending an Attachment and a record sys_id along with the tablename and file name, and store the attachment in Service Now.



#### Script :
````
/***The following lines are added to make something work fine for you. Please donot modify these lines.**/
request = Packages.java.net.URLDecoder.decode(request);
request = new JSON().decode(request);
/*****************************************End of the addition-Start your script.*********************/
 gs.log(request.table_name);
gs.log(request.sys_id);
gs.log(request.file_name);
gs.log(request.payload);

var value = GlideStringUtil.base64DecodeAsBytes(request.payload);
var attachResponse = new Attachment().write(request.table_name,request.sys_id,request.file_name,'',value);

return attachResponse;
````


### Important Notes:

* As you notice in above examples, what ever the user passes in the body of the REST call will be passed as `request` object that can be used in the Script of the JSON Scripted Web Service Module.
* What ever you return from the Script will be used to the caller as JSON object. 
* The XML in this folder will have all the scripts, so you can directly import them after loading the Update set.










