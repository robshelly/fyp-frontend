var gulp = require("gulp");

gulp.task("watch", function() {
  gulp.watch("docs/swagger.yaml", ["swagger"])
});