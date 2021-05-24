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
              width: 110,
            },
            {
              name: "medium",
              width: 140,
            },
            {
              name: "large",
              width: 170,
            },
            {
              name: "large_2x",
              width: 340,
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

    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      dist: {
        files: {
          "js/main.js": "js/dev/main.js",
        },
      },
    },

    stylelint: {
      options: {
        configFile: ".stylelintrc.json",
        formatter: "string",
        ignoreDisables: false,
        failOnError: true,
        outputFile: "",
        reportNeedlessDisables: false,
        fix: false,
        syntax: "",
      },
      src: ["sass/**/*.scss"],
    },

    eslint: {
      target: ["js/dev/*.js"],
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
        src: ["js/dev/*.js"],
        dest: "js/<%= pkg.name %>.js",
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
          "js/main.min.js": ["js/dev/main.js"],
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
          "css/style.css": "sass/style.scss",
          /*where file goes-----/where file from*/
        },
      },
      public: {
        options: {
          style: "compressed",
          sourcemap: "auto",
        },

        files: {
          "css/style.min.css": "sass/style.scss",
          /*where file goes-----/where file from*/
        },
      },
    },

    /**
     * watch
     */
    watch: {
      css: {
        files: ["sass/*.scss", "js/dev/*.js"],
        tasks: ["sass", "babel"],
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
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-stylelint");

  grunt.registerTask("default", [
    "eslint",
    "concat",
    "uglify",
    "clean",
    "mkdir",
    "htmlmin",
    "babel",
  ]);
  grunt.registerTask("default", ["sass", "watch", "responsive_images"]);
};

/* add bag (!) to wordpress css theme top-title so that it shows on minified file*/
