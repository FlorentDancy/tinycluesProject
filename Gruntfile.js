module.exports = function (grunt){

    // Project configuration.
    grunt.initConfig({

        // load all grunt tasks matching the `grunt-*` pattern

        jshint: {
            all: ['app/js/*.js','js/**/*.js']
        },

        concat: {
            dist: {
                src: ['app/js/*.js','app/js/**/*.js','!app/js/app.js','!app/js/app.min.js'],
                dest: 'app/js/app.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'app/js/app.min.js': ['app/js/app.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'app/css/app.css': 'app/scss/app.scss'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'app/css/app.min.css': ['app/css/app.css']
                }
            }
        },

        watch: {
            js: {
                files: ['app/js/*.js','app/js/**/*.js'],
                tasks:[/*'jshint',*/'concat','uglify'],
                options:{spawn: false}
            },
            scss: {
                files: ['app/scss/*.scss','app/scss/**/*.scss'],
                tasks:['sass','cssmin'],
                options:{spawn: false}
            }
            //,
            //karma: {
            //    files: ['app/js/**/*.js', 'app/test/**/*.js'],
            //    tasks: ['karma:unit:run'] //NOTE the :run flag
            //}
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'app/img/min'                  // Destination path prefix
                }]
            }
        },

        replace: {
            dist: {
                src: ['app/css/min.css'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: "app/img/",
                    to: "app/img/min/"
                }]
            }
        },

        karma: {
            unit: {
                configFile: 'myKarma.conf.js',
                background: true,
                singleRun: false
            }
        }

    });

    // Load des libraries
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', [/*'jshint',*/'concat','uglify','sass','cssmin'/*,'imagemin',"replace"*/]);

};