module.exports = {
    user: "models/user.js",
    project: "models/project.js",
    api: "models/api.js",
    express: "models/express.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    }/*,
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }*/
};
