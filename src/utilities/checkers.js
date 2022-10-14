module.exports = {

    /**
    * Verify all parameters in the request
    * @param {String} params content of req.body or req.query
    * @param {Object} params content of req.body or req.query
    * @returns {Boolean} true if all parameter are valid
    */
         check_params(...params) {
            if(typeof(params) === "object"){
              for(let param in params){
                if(!params[param]) return false
              }
            }
            else {
              if(!params) return false
            }
            
            return true
          }  
}