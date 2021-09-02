function createResponce(type,message){
    return {
        type:type,
        message:message
    };
}

export function successResponce(message){
    return createResponce("success",message);
}

export function errorResponce(message){
    return createResponce("error",message);
}