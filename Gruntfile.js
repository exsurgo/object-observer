﻿var fs = require('fs');

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                }
            }
        },
        uglify: {
            build: {
                options: {
                    screwIE8: true
                },
                files: {
                    'dist/object-observer.min.js': ['src/object-observer.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('build', 'Customized build', function () {
        grunt.log.writeln('Copy to "bin"');
        fs.writeFileSync('dist/object-observer.js', fs.readFileSync('src/object-observer.js'));
        grunt.log.ok();

        grunt.task.run('uglify:build');
    });

    grunt.registerTask('full-ci', 'Full CI Build cycle', function () {
        grunt.task.run('build');
        grunt.task.run('test');
    });
};