var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = function(env, argv){
    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/frontend-main.js',

        output: {
            path: path.resolve(__dirname, 'public/assets'),
            filename: 'bundle.js'
        },

        devtool: 'source-map',

        module: {
            rules: [
                { test: /\.css$/i, use: ['vue-style-loader', 'css-loader'] },
                { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
                { test: /\.vue$/, use: 'vue-loader' }
            ]
        },

        // watch: !env.production,

        plugins: [
            new VueLoaderPlugin(),
            new VuetifyLoaderPlugin()
        ]

    };
};



