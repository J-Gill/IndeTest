module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

  cucumberjs: {
    options: {
      format: 'html',
      output: 'IndeTest.html',
      theme: 'bootstrap',
      steps: 'features/step_definitions'
    },
    src: 'features',
    my_features: ['features/SmokeTest.feature']
  }, 

  watch: {
    cucumber: {
      files: ['features/**/*.js', 'script/**/*.js'],
      tasks: ['cucumberjs']
    }
  }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cucumberjs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('watch-tests', 'Starts a watch for test automation.', ['watch:cucumber']);

};