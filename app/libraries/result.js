module.exports = (data = {}, code = 200, message = "OK") => {
		
		return { 
      code        : code,
      message     : message,
      data        : data || {}
    };

	}
