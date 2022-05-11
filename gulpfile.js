import { src, dest, series, watch } from "gulp";
import pug from "gulp-pug";
import gulpSass from "gulp-sass";
import { log } from "gulp-util";
import dartSass from "sass";
const sass = gulpSass(dartSass);
import postcss from "gulp-postcss";
import terser from "gulp-terser";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import browserify from "browserify";
import del from "del";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import sync, { reload } from "browser-sync";

// variable set
const DEST = "dist";
const SRC = "src";
const SERVER_PORT = "9999";
const FILE_NAME = "hypai";

const PATH = {
    pug: {
        src: `${SRC}/view`,
        watch: `${SRC}/**/*.pug`,
        dest: `${DEST}`,
    },
    css: {
        src: `${SRC}/scss/*.scss`,
        dest: `${DEST}/css`,
    },
    js: {
        src: `${SRC}/js/app.js`,
        dest: `${DEST}/js`,
    },
    assets: {
        src: `${SRC}/assets/**/*`,
        dest: `${DEST}`,
    },
};

const entries = ["index.pug"];

// processing tasks
const view = async (reload) => {
    entries.forEach(async (entry) => {
        await src([`${PATH.pug.src}/${entry}`])
            .pipe(
                pug({
                    debug: false,
                    pretty: true,
                })
            )
            .on("error", (e) => logger.failed("pug", e))

            .pipe(dest(PATH.pug.dest))
            .on("end", () => {
                logger.success("pug");
                if (reload == true) {
                    sync.reload();
                }
            });
    });
};

const css = async (reload) => {
    await src(PATH.css.src, { sourcemaps: true })
        .pipe(
            sass({
                outputStyle: "compressed",
                includePaths: "node_modules",
                pretty: "true",
            }).on("error", sass.logError)
        )
        .on("error", (e) => logger.failed("sass", e))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .on("error", (e) => logger.failed("postcss", e))
        .pipe(rename(`${FILE_NAME}.css`))
        .on("error", (e) => logger.failed("rename", e))
        .pipe(dest(PATH.css.dest, { sourcemaps: "." }))
        .on("error", (e) => logger.failed("write", e))
        .on("end", () => {
            logger.success("SASS");
            if (reload == true) {
                sync.reload();
            }
        });
};

const js = async (reload) => {
    await browserify(PATH.js.src, { debug: true })
        .transform("babelify")
        .on("error", (e) => logger.failed("babelify", e))
        .bundle()
        .on("error", (e) => {
            log(`${e}`);
            logger.failed("", "browserify");
        })
        .pipe(source(`${FILE_NAME}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .on("error", (e) => logger.failed("terser", e))
        .pipe(sourcemaps.write("."))
        .pipe(dest(PATH.js.dest))
        .on("end", (e) => {
            logger.success("JS");
            if (reload == true) {
                sync.reload();
            }
        });
};

const assets = async (reload) => {
    await src(PATH.assets.src)
        .pipe(dest(PATH.assets.dest))
        .on("end", (e) => {
            logger.success("ASSETS");
            if (reload == true) {
                sync.reload();
            }
        });
};

// other tasks
const logger = {
    success: (msg) => {
        log(`✅ ${msg}: Success`);
    },
    failed: (msg, e) => {
        log(`❌ [${msg}] ${e}: Failed`);
    },
};

const clean = async () => {
    await del.sync([DEST]);
};

const server = async () => {
    await sync.init(null, {
        proxy: `http://localhost:${SERVER_PORT}`,
        open: false,
        notify: false,
    });
};

const watcher = () => {
    log("👀 Start watching...");
    watch(`${SRC}/**/*.scss`).on("change", (e) => {
        css(true);
        log(`\n\n🔄 Source Changed: ${e}`);
    });
    watch(`${SRC}/**/*.js`).on("change", (e) => {
        js(true);
        log(`\n\n🔄 Source Changed: ${e}`);
    });
    watch(`${SRC}/assets/**/*`).on("change", (e) => {
        assets(true);
        log(`\n\n🔄 Source Changed: ${e}`);
    });
    watch(`${SRC}/view/**/*.pug`).on("change", (e) => {
        view(true);
        log(`\n\n🔄 Source Changed: ${e}`);
    });
};

// run
exports.dev = series(
    [clean],
    [view],
    [js],
    [css],
    [assets],
    [server],
    [watcher]
);
