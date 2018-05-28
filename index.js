//create a class call handler

class Handler{
    constructor(schema){
        this.schema = schema;
    }
    setSchema(schema){
        this.schema = schema;
    }
    getSchema(){
        const schemaArray = [];
        for(let schema of this.schema){
            schemaArray.push(schema.name);
        }
        return schemaArray;
    }
    getSchemaNames(){
        const schemaArray = [];
        for(let schema of this.schema){
            schemaArray.push(schema.name);
        }
        return schemaArray;
    }
    getSchemaType(name){
        let schemaType = "";
        for(let schema of this.schema){
            if(schema.name === name){
                schemaType = schema.type;
            }
        }
        // console.log(schemaType);
        return schemaType;
    }
    getSchemaRequired(name){
        let schemaRequired = false;
        for(let schema of this.schema){
            if(schema.name === name){
                schemaRequired = schema.required;
            }
        }
        return schemaRequired;
    }
    getSchemaLength(name){
        let schemaLength = {};
        for(let schema of this.schema){
            if(schema.name === name){
                schemaLength = schema.length;
            }
        }
        return schemaLength;
    }
    validate(request){
        const schemaNames = this.getSchema();
        const requestKeys = Object.keys(request);

        const result = {
            error:false,
            message:[]
        };

        //check to be sure that all parameter passed are defined in schema

        // for(let requestKey = 0; requestKey < requestKeys.length; requestKey++){
        //     if(schemaNames.indexOf(requestKeys[requestKey]) === -1){
        //         result.error = true;
        //         result.message.push(`"${requestKeys[requestKey]}" Property Not in Schema`);
        //     }
        // }

        for(let schema of schemaNames){
            let checkRequired = this.getSchemaRequired(schema);
            let lengthRes = this.getSchemaLength(schema);
            let type = this.getSchemaType(schema);
            console.log(type);

            if(checkRequired){
                if(request[schema] === undefined || request[schema].trim === ""){
                    result.error = true;
                    result.message.push(`"${schema}" Cannot be Null`);
                }
            }
            if(request[schema] !== undefined){
                if(lengthRes !== undefined){
                    if(lengthRes.min !== undefined){
                        if(request[schema].length < lengthRes.min){
                            result.error = true;
                            result.message.push(`"${schema}" requires minimum character length of ${lengthRes.min} found ${request[schema].length}`);
                        }
                    }
                    if(lengthRes.max !== undefined){
                        if(request[schema].length > lengthRes.max){
                            result.error = true;
                            result.message.push(`"${schema}" requires maximum character length of ${lengthRes.max} found ${request[schema].length}`);
                        }
                    }
                    
                }
            }
            if(request[schema] !== undefined){
                if(typeof request[schema] !== type){
                    result.error = true;
                    result.message.push(`"${schema}" needs to be a ${type} found ${typeof request[schema]}`);
                }
            }
        }
        return result;

    }
    
}
module.exports = Handler;
