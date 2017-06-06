const path = require('path');

const webpackConfig = {
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            enforce: 'pre'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', { modules: false }]
                    ]
                }
            }]
        }, {
            test: /\.js$/,
            include: path.resolve('src/'),
            exclude: /\.spec\.js/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post',
            options: {
                esModules: true
            }
        }]
    }
};

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-sourcemap-loader'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter')
        ],
        client: {
            clearContext: false
        },
        files: [
            { pattern: './karma-test-shim.js', watched: false }
        ],
        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            dir: path.join(__dirname, 'coverage'),
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'coverage-istanbul', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};