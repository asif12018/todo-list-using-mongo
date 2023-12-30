
exports.getDate =  function() {
    let today = new Date();
    var day = '';
    let currentDay = today.getDay();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    
    var day = today.toLocaleDateString('en-US', options);
    return day;
}


exports.getDay =  function (){
    let today = new Date();
    var day = '';
    let currentDay = today.getDay();
    let options = {
        weekday: 'long'
    }
    
    var day = today.toLocaleDateString('en-US', options);
    return day;
}

