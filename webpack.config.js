const path = require('path');

module.exports = {
    mode:"development",
    entry:"./src/script/main.js",
    output:{
       path: path.resolve(__dirname, 'dist'),
       filename:"bundle.js"
    },
    module:{
        rules: [
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            }
        ]
    }
}