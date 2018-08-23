//////////////////////////////////////////////
// Config Web API
//////////////////////////////////////////////
// Para ver mas reglas de configuracion de parametros
// https://github.com/node-modules/parameter

const ISO_8601  = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

module.exports = {
  v1:{
    
    /*==================================================================================== */
    user:{

      getUser:{
        description: "description...",
        verb: "GET",
        verifyParams:{
          id:       { type: 'string', required: false, description: "description..."},
          username: { type: 'string', required: false },
        }
      },

      postUser:{
        description: "description...",
        verb: "POST",
        verifyParams:{
          username: { type: 'string', required: true },
          otherData: {
            type:     'array',
            itemType: 'object',
            required: true,
            min:      1,
            rule: {
              otherDate:  { type: 'date',   required: true, description: "description..."},
              otheString: { type: 'string', required: true, description: "description...", format: ISO_8601 },
              otheNumber: { type: 'number', required: true, min: 0},
              otherInt:   { type: 'int',    required: true, min: 1000, max: 100000},
              otherEnum:  { type: 'enum', 	required: true, values: ['opcion1','opcion2']}, 
            }
          },
        }
      },

      updateUser:{
        description: "description...",
        verb: "PUT",
        verifyParams:{
          id:       { type: 'string', required: true },
          username: { type: 'string', required: false },
          otherData: {
            type:     'array',
            itemType: 'object',
            required: false,
            min:      1,
            rule: {
              otherDate:  { type: 'date',   required: true, description: "description..."},
              otheString: { type: 'string', required: true, description: "description...", format: ISO_8601 },
              otheNumber: { type: 'number', required: true, min: 0},
              otherInt:   { type: 'int',    required: true, min: 1000, max: 100000},
              otherEnum:  { type: 'enum', 	required: true, values: ['opcion1','opcion2']}, 
            }
          },
        }
      },
      
      deleteUser:{
        description: "description...",
        verb: "DEL",
        verifyParams:{
          id: { type: 'string', required: true },
        }
      },

    },
       
    /*==================================================================================== */
    article:{  

      postArticle:{
        verb: "POST",
        verifyParams:{
          title:        { type: 'string', required: true},
          billing_code: { type: 'string', required: true},          
        }
      },

      getArticle:{
        description: "description...",
        verb:"GET",
        verifyParams:{
          mccMnc: { type: 'int',  required: true },
        }
      },

    },
    
  },
}