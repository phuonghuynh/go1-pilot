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
            exclude: /(node_modules|\.spec\.js$)/,
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
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-jasmine-html-reporter',
            'karma-coverage-istanbul-reporter'
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        files: [
            './src/**/*.js',
            './test/**/*.js'
        ],
        preprocessors: {
            './src/**/*.js': ['webpack', 'sourcemap'],
            './test/**/*.js': ['webpack', 'sourcemap'],
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
        singleRun: false
    });
};