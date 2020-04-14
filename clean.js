function cleanText(body){
    let processed = body.toLowerCase().replace(/[^\w\s]/gi,'');
    return processed;
}