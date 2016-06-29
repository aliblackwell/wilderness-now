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
            cwd: 'raw/act4',
            src: ['**.jpg'],
            dest: 'new_cdn/act4'
          }]
        }
      }
  });

  grunt.loadNpmTasks('grunt-respimg');

  grunt.registerTask('default', ['respimg']);
};

