module.exports = function (grunt){

    // Project configuration.
    grunt.initConfig({

        // load all grunt tasks matching the `grunt-*` pattern

        jshint: {
            all: ['js/*.js','js/**/*.js','!js/min.js','!foundation.min.js']
        },

        concat: {
            dist: {
                src: ['js/jquery-2.1.1.min.js','js/sidebar.js','js/app.js','js/*.js','js/**/*.js','!js/foundation/*.js','!js/min.js','!js/vendor/jquery.js'],
                dest: 'js/min.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'js/min.js': ['js/min.js']
                }
            }
        },

        sass: {
            //TODO Faire fonctionner pour qu'il créé les nouveaux fichiers dans folder css
            /*dist: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['sass/*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }*/

            dist: {

                options: {
                    style: 'expanded'
                },

                files: {
                    'css/custom.css': 'sass/custom.scss'
                }
            }

        },

        cssmin: {
            combine: {
                files: {
                    'css/min.css': ['css/foundation.min.css','css/custom.css','css/*.css', 'css/**/*.css', '!css/foundation.css','!css/min.css']
                }
            }
        },

        watch: {
            js: {
                files: ['js/*.js','js/**/*.js','!js/min.js'],
                tasks:[/*'jshint',*/'concat','uglify'],
                options:{spawn: false}
            },
            css: {
                files: ['css/*.css','css/**/*.css','!css/min.css'],
                tasks:['cssmin'],
                options:{spawn: false}
            },

            scss: {
                files: ['sass/*.scss','sass/**/*.scss'],
                tasks:['sass','cssmin'],
                options:{spawn: false}
            }

            //TODO rajouter la tâche pour les images avec plusieurs formats d'image
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'img/min'                  // Destination path prefix
                }]
            }
        },

        replace: {
            dist: {
                src: ['css/min.css'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: "img/",
                    to: "img/min/"
                }]
            }
        }

    });

    // Load des libraries
    //TODO faire fonctionner le module qui permet de loader les tasks automatiquement ?
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');


    // Default task(s).
    grunt.registerTask('default', ['jshint','concat','uglify','sass','cssmin'/*,'imagemin',"replace"*/]);

}