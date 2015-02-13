'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dev: {
        files: [
          {
          
          }
        ]
      }
    },
    clean: {
      lib: {
        src: [

        ]
      }
    },
    watch: {
      js: {
        files: ['Gruntfile.js', 'app.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
        tasks: ['jshint'],
        options: {
            livereload: true
        }
      },
      html: {
        files: ['public/views/**', 'app/views/**'],
        options: {
            livereload: true
        }
      },
      css: {
        files: ['public/css/**'],
        options: {
            livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: ['Gruntfile.js', 'app.js', 'app/**/*.js', 'app/**/**/*.js','public/js/**'],
        options: {
            jshintrc: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app/page/app.js',
        options: {
          args: [],
          ext: 'js',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
            dev: {
              NODE_ENV: 'development',
              PORT: 3000
            }
          },
          cwd: __dirname
        }
      },
      api: {
        script: 'app/api/app.js',
        options: {
          args: [],
          ext: 'js',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
            dev: {
              NODE_ENV: 'development',
              PORT: 3000
            }
          },
          cwd: __dirname
        }
      },
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'app.js'
      },
      src: ['test/mocha/**.js', 'app/controllers/order.js']
    },
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test',
        MONGODB_URI: 'localhost/rendr-test'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // page task(s).
  grunt.registerTask('build', ['clean:lib', 'copy:dev', 'env:dev', 'jshint', 'concurrent', 'nodeunit']);

  // api task(s).
  grunt.registerTask('api', ['clean:lib', 'copy:dev', 'env:dev', 'jshint', 'concurrent', 'nodeunit']);
};
