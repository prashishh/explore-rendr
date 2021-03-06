'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    handlebars: {
      compile: {
        options: {
          namespace: false,
          commonjs: true,
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace('.hbs', '');
          }
        },
        files: {
          'app/templates/compiledTemplates.js': ['app/templates/**/*.hbs']
        },
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs.
          return filename.slice(0, 2) !== '__';
        }
      }
    },

    stylus: {
      compile: {
        options: {
          paths: ['assets/stylesheets'],
          'include css': true
        },
        files: {
          'public/styles.css': 'assets/stylesheets/index.styl'
        }
      }
    },
    
    browserify: {
      options: {
        debug: true,
        alias: [
          'node_modules/rendr-handlebars/index.js:rendr-handlebars'
        ],
        aliasMappings: [
          {
            cwd: 'app/',
            src: ['**/*.js'],
            dest: 'app/'
          }
        ],
        shim: {
          jquery: {
            path: 'assets/vendor/jquery-1.9.1.min.js',
            exports: '$'
          }
        }
      },
      app: {
        src: [ 'app/**/*.js' ],
        dest: 'public/mergedAssets.js'
      },
      tests: {
        src: [
          'test/helper.js',
          'test/app/**/*.js'
        ],
        dest: 'public/testBundle.js'
      }
    },

    watch: {
      scripts: {
        files: 'app/**/*.js',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      },
      templates: {
        files: 'app/**/*.hbs',
        tasks: ['handlebars'],
        options: {
          interrupt: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'api/app.js',
        options: {
          args: [],
          ext: 'js',
          delayTime: 1,
          cwd: __dirname
        }
      }
    },
    karma: {
      unit: {
        options: {
          files: ['test/**/*.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('runNode', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['./node_modules/nodemon/nodemon.js', 'index.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // app task(s).
  // grunt.registerTask('app', ['clean:lib', 'copy:all', 'env:dev', 'jshint', 'concurrent:app']);

  // api task(s).
  // grunt.registerTask('api', ['clean:lib', 'copy:all', 'env:dev', 'jshint', 'concurrent:api']);

  // default
  grunt.registerTask('app', ['handlebars', 'browserify', 'stylus', 'runNode', 'watch']);

  // api server
  grunt.registerTask('api', ['nodemon']);

  // api server
  grunt.registerTask('test', ['karma']);

};
