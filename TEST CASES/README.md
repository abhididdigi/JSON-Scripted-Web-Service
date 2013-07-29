---
published: false
---

## TEST CASES:

Note: In all the test cases, I will be using [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) as Caller - for calling all the JSON Scripted Web Services.

### Test Case 1: 

Send a `JSON` with all the incidents belonging to a Problem sys_id( that will be passed along with request.)

####### Input(from the caller): {"problem_id":"d7296d02c0a801670085e737da016e70"}

####### Output(From service now to caller) : 
```
[{"incident_number":"INC00051","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00052","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00053","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00054","problem_number":"d7296d02c0a801670085e737da016e70"},{"incident_number":"INC00055","problem_number":"d7296d02c0a801670085e737da016e70"}]
```

## Screens : 

[](/http://servicenowdiary.com/wp-content/uploads/2013/07/TestCase1.png)


