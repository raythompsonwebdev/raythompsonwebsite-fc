module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    responsive_images: {
      dev: {
        options: {
          engine: "im",
          sizes: [
            {
              name: "small",
              width: 100,
            },
            {
              name: "medium",
              width: 150,
            },
            {
              name: "large",
              width: 200,
            },
            {
              name: "large_2x",
              width: 400,
            },
          ],
        },

        /*
            You don't need to change this part if you don't change
            the directory structure.
            */
        files: [
          {
            expand: true,
            src: ["*.{gif,jpg,png}"],
            cwd: "images/",
            dest: "img/",
          },
        ],
      },
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ["img"],
      },
      public: {
        src: ["public/images"],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ["img"],
        },
      },
      public: {
        options: {
          create: ["public/images/"],
        },
      },
    },

    htmlmin: {
      // Task
      public: {
        // Target
        options: {
          // Target options
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          // Dictionary of files
          // 'destination': 'source'
          "public/index.html": "index.html",
        },
      },
    },

    /**
     * Concat
     */
    concat: {
      options: {
        separator: ";",
      },
      public: {
        src: ["js/main.js"],
        dest: "public/js/<%= pkg.name %>.js",
      },
    },

    /**
     * Uglify
     */
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      },

      my_target: {
        files: {
          "public/js/main.min.js": ["scripts/main.js"],
        },
      },
    },

    /**
     * sass Task
     */
    sass: {
      dev: {
        options: {
          style: "expanded",
          sourcemap: "auto",
        },

        files: {
          "css/style.css": "css/style.scss",
          /*where file goes-----/where file from*/
        },
      },

      public: {
        options: {
          style: "compressed",
          sourcemap: "auto",
        },
        files: {
          "public/css/style.css": "css/style.scss",
          /*where file goes-----/where file from*/
        },
      },
    },

    /**
     * watch
     */
    watch: {
      css: {
        files: ["css/*.scss"],
        tasks: ["sass"],
      },
    },
  });

  grunt.loadNpmTasks("grunt-responsive-images");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-mkdir");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask("default", [
    "concat",
    "uglify",
    "clean",
    "mkdir",
    "htmlmin",
  ]);
  grunt.registerTask("default", ["sass", "watch", "responsive_images"]);
};

/* add bag (!) to wordpress css theme top-title so that it shows on minified file*/
