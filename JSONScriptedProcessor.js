var JSONScriptedProcessor = Class.create();

JSONScriptedProcessor.prototype = {
   /**
    * Constructor - constructs a JSONScriptedProcessor object to process HTTP POST/GET
    * of JSON object
    *
    * @param request -
    *            HttpServletRequest object
    * @param response -
    *            HttpServletResponse object
    * @param table_name -
    *            the targeted table name in the URL
    * @processor - the Processor Java class that is handling this process
    */
   initialize : function(request, response, table_name, processor) {
      
      this.request = request;
      this.response = response;
      this.processor = processor;
      this.httpMethod = this.request.getMethod();
      
      
      this.error = false;
      // new sysParm object..
      this.sysparm = {};
      //JSON object, will be used in near future..
      this.json = new JSON();
      
      this._setURLParameter("scriptedName");
      this._setURLParameter("raw");
      this.message = this._getMessage(this.request);
      
      
      
   },
   
   //Set the parameters from the URL - It accepts two parameters - the name of the
   //Scripted JSON Processor to be invoked and if the response is to be raw response.
   _setURLParameter : function(name) {
      var value = this.request.getParameter("sysparm_" + name);
      if (value != null) {
         this.debug("Setting URL parameter: " + name + " = " + value);
         this.sysparm[name] = value;
      }
   },
   
   
   /*
    * Entry point for the script, Processors and prints output to the processor.
    * Only allows POST;GET, PUT are all rejected.
    *
    */
   
   process:function(){
      
      
      if(this.httpMethod != 'POST') _outputJSONError('Please only use POST method.');
         
      //If it's not any other method, then process the Script from Script Include.
      this._processScript(this.sysparm['scriptedName']);
      
      
      if(this.error) return;
         
   },
   
   //Processing the Scripted JSON processor.
   //Request object will contain the JSON passed as a part of request.
   //Response will be sent back as a JSOn String.
   
   
   _processScript : function(nameOfScript){
      
      if(JSUtil.nil(nameOfScript)){
         this._outputJSONError('Service Now Error:Scripted JSON Webservice Name not found.');
         return;
      }
      
      var gr = new GlideRecord("u_scripted_json_web_services");
      gr.addQuery("u_end_point_url",nameOfScript);
      gr.query();
      if(gr.getRowCount() > 1){
         this._outputJSONError("ServiceNow Error: There are two Scripted JSON Web Services with the same name.Please contact Service Now administrator.");
      }
      if(gr.next()){
         if(this.sysparm['raw'] == 'true'){// You just want to copy what's in there...
            
         
         this.createFunc(gr.u_script);
         
         
      }
      
      
   }
   
},

createFunc:function(script){
   
   var response;
   var input =this.message;
   var encoded = Packages.java.net.URLEncoder.encode(input, 'UTF-8');
   //var encoded = '';
   var func = 'executeScript("'+encoded+'");function executeScript(request){'+ script+ '}';
   
   if (typeof GlideEvaluator != 'undefined')
      response= GlideEvaluator.evaluateString(func);
   else{
      
      
      response= Packages.com.glide.script.Evaluator.evaluateString(func);
   }
   this._outputJSONResponse(response);
   
},


/**
 * output a JSON error object
 */
_outputJSONError : function(errorMsg,arg) {
   
   var msg = gs.getMessage(errorMsg, new String(arg));
   var response = {
      "error" : errorMsg
   };
   this._outputJSONResponse(response);
   this.error = true;
},
debug : function(msg) {
   if (!this.enableDebug)
      return;
   
   
},
_getMessage : function(request) {
   
   var message;
   var is = request.getInputStream();
   var sb;
   
   if(typeof GlideStringUtil != 'undefined'){
      sb =  GlideStringUtil.getStringFromStream(is);
   }
   else{
      
      sb = Packages.com.glide.util.StringUtil.getStringFromStream(is);
   }
   //get the message as string.
   return sb;
   
},
_outputJSONResponse : function(response) {
   
   var r = this.json.encode(response);
   this.response.setContentType("application/json");
   this.processor.writeOutput(r);
}

};
