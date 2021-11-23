// eslint-disable-next-line func-names
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    responsive_images: {
      dev: {
        options: {
          engine: "im",
          sizes: [
            {
              name: "micro-small",
              width: 65,
            },
            {
              name: "x-small",
              width: 80,
            },
            {
              name: "small",
              width: 90,
            },
            {
              name: "medium-small",
              width: 105,
            },
            {
              name: "medium",
              width: 120,
            },
            {
              name: "large",
              width: 130,
            },
            {
              name: "large_2x",
              width: 260,
            },
          ],
        },

        /*
            You don"t need to change this part if you don"t change
            the directory structure.
            */
        files: [
          {
            expand: true,
            src: ["*.{gif,jpg,png}"],
            cwd: "images/",
            dest: "dist/images/",
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
          "dist/js/main.js": "js/dev/main.js",
          "dist/js/projects.js": "js/dev/projects.js",
          "dist/js/slider.js": "js/dev/slider.js",
          "dist/js/contact.js": "js/dev/contact.js",
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
        syntax: "sass",
      },
      src: ["sass/**/*.scss"],
    },

    eslint: {
      options: {
        configFile: ".eslintrc.json",
        fix: true,
      },
      target: ["js/dev/*.js", "gruntfile.js", "js/*.js"],
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ["img"],
      },
      public: {
        src: ["dist/images"],
      },
    },

    /* Generate the directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ["img"],
        },
      },
      public: {
        options: {
          create: ["dist/images/"],
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
          // "destination": "source"
          "dist/index.html": "index.html",
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
        dest: "dist/js/<%= pkg.name %>.js",
      },
    },

    /**
     * Uglify
     */
    uglify: {
      options: {
        banner:
          "/*! <%= pkg.name %> <%= grunt.template.today('d-mm-yyyy') %> */\n",
      },

      my_target: {
        files: {
          "dist/js/main.min.js": ["js/dev/main.js"],
          "dist/js/projects.min.js": ["js/dev/projects.js"],
          "dist/js/slider.min.js": ["js/dev/slider.js"],
          "dist/js/contact.min.js": ["js/dev/contact.js"],
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
          // sourcemap: "auto",
        },

        files: {
          "css/style.css": "sass/style.scss",
          /* where file goes-----/where file from */
        },
      },
      public: {
        options: {
          style: "compressed",
          // sourcemap: "auto",
        },

        files: {
          "dist/css/style.min.css": "sass/style.scss",
          /* where file goes-----/where file from */
        },
      },
    },

    /**
     * watch
     */
    watch: {
      css: {
        files: ["sass/*.scss", "js/dev/*.js", "gruntfile.js", "js/*.js"],
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
    "sass",
    "watch",
    "responsive_images",
    "eslint",
    "concat",
    "uglify",
    "clean",
    "mkdir",
    "htmlmin",
    "babel",
  ]);
};

/* add bag (!) to wordpress css theme top-title so that it shows on minified file */
