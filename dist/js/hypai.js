!function _(o,r,n){function c(t,i){if(!r[t]){if(!o[t]){var l="function"==typeof require&&require;if(!i&&l)return l(t,!0);if(e)return e(t,!0);var u=new Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}var s=r[t]={exports:{}};o[t][0].call(s.exports,(function(_){return c(o[t][1][_]||_)}),s,s.exports,_,o,r,n)}return r[t].exports}for(var e="function"==typeof require&&require,t=0;t<n.length;t++)c(n[t]);return c}({1:[function(_,o,r){"use strict";var n=$(".hamburger"),c=$(".mobile-menu");$((function(){console.log("              _      _                     \n             (_)    | |                    \n  __ _  _ __  _   __| |%c  ___   _ __    ___ \n%c / _` || '__|| | / _` |%c / _ ' | '_ '  / _ '\n%c| (_| || |   | || (_| |%c| (_) || | | ||  __/\n%c '__, ||_|   |_| '__,_|%c '___/ |_| |_| '___|\n%c  __/ |                                    \n |___/                     (C) 2022 grid%cone","color: #E68011;","color: #000;","color: #E68011;","color: #000;","color: #E68011;","color: #000;","color: #E68011;","color: #000;","color: #E68011;"),n.on("click",(function(){n.toggleClass("active"),c.toggleClass("active"),$(this).hasClass("active")?$("body").css("overflow","hidden"):$("body").css("overflow","auto")}))}))},{}]},{},[1]);
//# sourceMappingURL=hypai.js.map
