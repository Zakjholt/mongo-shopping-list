exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://zakHolt:pwholt@ds044989.mlab.com:44989/mongo-shopping-list' :
        'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;
