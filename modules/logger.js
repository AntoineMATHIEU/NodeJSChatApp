
function log(message,data)

{
    if(data)
    {
        console.log(`(module log) ${message} ${data}`);
        return;
    }
    else
    {
        console.log(`module log: ${message}`);
    }
    
}

module.exports = log;