function criateResponce(type,message){
    return {
        type:type,
        message:message
    };
}

export function successResponce(message){
    return criateResponce("success",message);
}

export function errorResponce(message){
    return criateResponce("error",message);
}