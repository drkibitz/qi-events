"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            test: ['Gruntfile.js', 'events.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jsdoc: {
            all: {
                src: ['package.json', 'README.md', 'events.js'],
                dest: 'build/artifacts/api'
            }
        },
        simplemocha: {
            test: { src: ['test/**/*.js'] },
            options: {
                reporter: 'spec'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('test', ['jshint', 'simplemocha']);
    grunt.registerTask('default', ['test', 'jsdoc']);
};
