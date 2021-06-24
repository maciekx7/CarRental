exports.sendStatus = (res, status, message) => {
    return res.status(status).send({
        message: message
    })
}

exports.isNullData = (data) => {
    var undef;
    if (data == "" || data == undef || data == null) {
        return true;
    } else {
        return false;
    }
}

exports.checkIsInteger = (data) => {
    if(Number.isInteger(+data)) {
        return true;
    } else {
        return false;
    }
}