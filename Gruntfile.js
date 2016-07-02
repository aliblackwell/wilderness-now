module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    respimg: {
      default: {
        options: {
          widths: [ 1280 ],
          widthAsDir: true
        },
        files: [ {
            expand: true,
            cwd: 'cdn/optimise',
            src: ['**.jpg'],
            dest: 'cdn/optimised'
          }]
        }
      }
  });

  grunt.loadNpmTasks('grunt-respimg');

  grunt.registerTask('default', ['respimg']);
};

