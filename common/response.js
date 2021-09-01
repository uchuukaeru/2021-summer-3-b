
/**
 * レスポンスを作成する
 * 
 * @param {string} type 
 * @param {Object} message 
 * @returns 
 */
function createResponse(type, message) {
    return {
        type: type,
        message: message
    };
}

/**
 * 成功のレスポンスを作成する
 * 
 * @param {Object} message 
 * @returns 
 */
function successResponse(message) {
    return createResponse("success", message);
}

/**
 * 失敗のレスポンスを作成する
 * 
 * @param {Object} message 
 * @returns 
 */
function errorResponse(message) {
    return createResponse("error", message);
}

export {successResponse, errorResponse}