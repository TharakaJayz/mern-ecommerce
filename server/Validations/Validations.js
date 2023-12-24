const isEmptyValidator = (value) => {
   
    let emptyCount =0;
    for(const element of value){
        if(element ==="" || element === null){
            emptyCount ++;
            
        }
    }
    if(emptyCount===0){
        return false;
    }else{
        return true;
    }

};

module.exports = isEmptyValidator;