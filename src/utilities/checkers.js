module.exports = {

    /**
    * Verify all parameters in the request
    * @param {Any} params content to be checked
    * @returns {Boolean} true if all parameters are present, false otherwise
    */
	check_params(params) {
		if(typeof(params) === "object"){
			for(let key in params){
				if(params[key] == undefined || params[key] == null) return false
			}
		}
		else if (typeof (params) === "array") {
			for (let i = 0; i < params.length; i++) {
				if (params[i] == undefined || params[i] == null) return false
			}
		}
		else if (typeof (params) === "string" || typeof (params) === "number") {
			if(params == undefined || params == null) return false
		}
		else {
			return false
		}
		
		return true
	}  
}