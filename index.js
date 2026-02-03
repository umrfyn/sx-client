// If it works, don’t touch anything. If you don’t trust it, just read through the src, dawg.
// free shit atleast it works

// rewritten

const { Client, RichPresence, CustomStatus } = require("discord.js-selfbot-v13");
const { Streamer, Utils, prepareStream, playStream } = require("@dank074/discord-video-stream");
const { schedule } = require("node-cron");
const moment = require("moment-timezone");
const os = require("os");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const si = require("systeminformation");
const crypto = require("crypto");
const chalkAnimation = require("chalk-animation").default;
require("colors");

const fetch = (...args) => import("node-fetch").then(m => m.default(...args));


const ASCII = `                        
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠋⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⢀⣀⣀⣠⣤⣀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀⠀⠀⠙⠿⠿⠟⠛⠛⠋⠉⠉⠛⣷⡄
⠀⠀⠀⠀⠀⠀⠀⢠⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇
⠀⠀⠀⠀⣀⣤⣶⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠃
⠀⣠⣶⠿⠛⠉⠀⠀⠀⠀⠀message from⠀⠀⠀⠀⣠⡿⠃⠀
⢸⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀umrfyn⠀⠀⠀⠀⠀⢠⡿⠁⠀⠀
⢸⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡀⠀⠀
⠀⠙⠿⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡄⠀
⠀⠀⠀⠀⠉⠛⠿⣶⣄⠀⠀⠀enjoy! ⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡄
⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇
⠀⠀⠀⠀⠀⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⣠⣶⣶⣦⣤⣤⣄⣀⣀⣤⡿⠃
⠀⠀⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⣠⣾⠏⠀⠀⠀⠈⠉⠉⠙⠛⠉⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣄⠀⠀⣠⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠛⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

process.removeAllListeners("warning");
process.on("warning", (warning) => {
  if (!String(warning).includes("DeprecationWarning")) {
    console.warn(warning);
  }
});

const originalStderrWrite = process.stderr.write;
process.stderr.write = (chunk, ...args) => {
  if (typeof chunk === "string" && chunk.includes("The system cannot find the path specified")) {
    return;
  }
  return originalStderrWrite.call(process.stderr, chunk, ...args);
};


let loggerHeaderPrinted = false;

function fuck_logger_header(configPath) {
  if (loggerHeaderPrinted) return;

  const now = new Date();
  const timestamp = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const kali = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    promptBlue: "\x1b[38;5;33m",
    accentBlue: "\x1b[38;5;39m",
    white: "\x1b[37m",
  };

  const username = "opensrc"
  const hostname = "sx-client"
  const displayPath = configPath;

  const headerLine = `${kali.promptBlue}${kali.bold}──(${username}㉿${hostname})${kali.reset}${kali.promptBlue}-[${kali.accentBlue}${kali.bold}${timestamp}${kali.reset}${kali.promptBlue}] - [${kali.white}${displayPath}${kali.promptBlue}]${kali.reset}`;
  console.log(headerLine);
  loggerHeaderPrinted = true;
}

function fuck_logger(type, message) {
  const kali = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    promptBlue: "\x1b[38;5;33m",
    white: "\x1b[37m",
    red: "\x1b[38;5;196m",
    yellow: "\x1b[38;5;226m",
    green: "\x1b[38;5;46m",
    cyan: "\x1b[38;5;51m",
    magenta: "\x1b[38;5;201m",
  };

  const typeStyles = {
    success: { color: kali.green, label: "SUCCESS" },
    error: { color: kali.red, label: "ERROR" },
    warning: { color: kali.yellow, label: "WARNING" },
    info: { color: kali.cyan, label: "INFO" },
    debug: { color: kali.magenta, label: "DEBUG" },
  };

  const style = typeStyles[type.toLowerCase()] || { color: kali.white, label: "LOG" };

  const subLine = `   ${kali.promptBlue}${kali.bold}>${kali.reset} ${style.color}${kali.bold}${style.label}${kali.reset} ${kali.dim}→${kali.reset} ${message}`;
  console.log(subLine);
}

process.on("uncaughtException", (error) => {
  fuck_logger("error", `[Uncaught Exception] ${error.message}`);
});

process.on("unhandledRejection", (reason, promise) => {
  fuck_logger("error", `[Unhandled Rejection] ${reason}`);
});

process.on("error", (error) => {
  fuck_logger("error", `[Process Error] ${error.message}`);
});

// Login via encode 
let vmA = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : global, vmq = Object['defineProperty'], vml = Object['create'], vmI = Object['getOwnPropertyDescriptor'], vmc = Object['getOwnPropertyNames'], vmr = Object['getOwnPropertySymbols'], vmV = Object['setPrototypeOf'], vmR = Object['getPrototypeOf'], vmb_5c3957 = vmA['vmb_5c3957'] || (vmA['vmb_5c3957'] = {}); const vmp_d7b698 = (function () { let v = [{ 'i': [0x0, 0x0, 0x7, 0x0, 0x6, 0x0, 0x0, 0x1, 0x4b, 0x2, 0x4, null, 0x46, 0x3, 0x0, 0x4, 0x37, 0x1, 0x4, null, 0x46, 0x5, 0x0, 0x4, 0x37, 0x1, 0x4, null, 0x46, 0x6, 0x0, 0x7, 0x37, 0x0, 0x7, 0x1, 0x5a, null, 0x6, 0x1, 0x5b, null, 0x4b, 0x8, 0x5b, null, 0x4b, 0x9, 0x4, null, 0x46, 0xa, 0x0, 0x4, 0x37, 0x1, 0x0, 0x1, 0x4b, 0x2, 0x4, null, 0x46, 0x3, 0x0, 0x4, 0x37, 0x1, 0x4, null, 0x46, 0x5, 0x0, 0x4, 0x37, 0x1, 0x4, null, 0x46, 0x6, 0x0, 0x7, 0x37, 0x0, 0x7, 0x2, 0x6, 0x2, 0x38, null], 'c': ['c3BpdGVjb2xsZWN0c2hvd25oYXBwZW50ZW50dGhyb3duZHVldGVhcG9zdHJvbGxhY3I', 'sha256', 'crypto', 'createHash', 0x1, 'update', 'digest', 0x0, 'SYSPATCH', 'Buffer', 'concat'], 'p': 0x0, 'l': 0x3, 'sp': 0x1 }, { 'i': [0xd3, 0x0, 0x0, 0x1, 0x36, 0x0, 0x7, 0x1, 0x0, 0x2, 0x4b, 0x3, 0x4, null, 0x46, 0x4, 0x0, 0x5, 0x37, 0x1, 0x7, 0x2, 0x0, 0x6, 0x4b, 0x3, 0x4, null, 0x46, 0x4, 0x0, 0x5, 0x37, 0x1, 0x7, 0x3, 0x6, 0x1, 0x6, 0x3, 0xd3, 0x7, 0x0, 0x8, 0x0, 0x9, 0x4b, 0x3, 0x4, null, 0x46, 0xa, 0x0, 0xb, 0x37, 0x5, 0x7, 0x4, 0x0, 0xc, 0x6, 0x4, 0x6, 0x2, 0x4b, 0x3, 0x4, null, 0x46, 0xd, 0x0, 0xe, 0x37, 0x3, 0x7, 0x5, 0x8, 0x0, 0x0, 0xf, 0x0, 0x10, 0x6, 0x5, 0x4, null, 0x46, 0x11, 0x0, 0xe, 0x37, 0x3, 0x7, 0x6, 0x6, 0x6, 0x0, 0x10, 0x6, 0x5, 0x4, null, 0x46, 0x12, 0x0, 0x5, 0x37, 0x1, 0xa, null, 0x4, null, 0x7, 0x6, 0x3, null, 0x5a, null, 0x0, 0x13, 0x4b, 0x14, 0x4, null, 0x46, 0x15, 0x0, 0x5, 0x37, 0x1, 0x5b, null, 0x6, 0x3, 0x5b, null, 0x6, 0x2, 0x5b, null, 0x6, 0x6, 0x0, 0x10, 0x4b, 0x14, 0x4, null, 0x46, 0x15, 0x0, 0x16, 0x37, 0x2, 0x5b, null, 0x4b, 0x14, 0x4, null, 0x46, 0x17, 0x0, 0x5, 0x37, 0x1, 0x7, 0x7, 0xd3, 0x18, 0x0, 0x10, 0x6, 0x7, 0x4, null, 0x46, 0x19, 0x0, 0x5, 0x37, 0x1, 0xa, null, 0x38, null], 'c': ['getSecretKey', 0x0, 0x10, 'crypto', 'randomBytes', 0x1, 0x8, 'ITERATIONS', 0x20, 'sha256', 'pbkdf2Sync', 0x5, 'aes-256-cbc', 'createCipheriv', 0x3, 'utf8', 'base64', 'update', 'final', 'Salted__', 'Buffer', 'from', 0x2, 'concat', 'ENC_PREFIX', 'toString'], 'p': 0x1, 'l': 0x7, 'sp': 0x1 }, { 'i': [0xd3, 0x0, 0x8, 0x0, 0x4, null, 0x46, 0x1, 0x0, 0x2, 0x37, 0x1, 0x20, null, 0x34, null, 0x8, 0x0, 0x38, null, 0xd3, 0x3, 0x0, 0x4, 0x36, 0x0, 0x7, 0x1, 0xd3, 0x0, 0x46, 0x5, 0x8, 0x0, 0x4, null, 0x46, 0x6, 0x0, 0x2, 0x37, 0x1, 0x0, 0x7, 0x4b, 0x8, 0x4, null, 0x46, 0x9, 0x0, 0xa, 0x37, 0x2, 0x7, 0x2, 0x0, 0xb, 0x0, 0xc, 0x6, 0x2, 0x4, null, 0x46, 0x6, 0x0, 0xa, 0x37, 0x2, 0x7, 0x3, 0x0, 0xc, 0x0, 0xd, 0x6, 0x2, 0x4, null, 0x46, 0x6, 0x0, 0xa, 0x37, 0x2, 0x7, 0x4, 0x0, 0xd, 0x6, 0x2, 0x4, null, 0x46, 0x6, 0x0, 0x2, 0x37, 0x1, 0x7, 0x5, 0x6, 0x1, 0x6, 0x3, 0xd3, 0xe, 0x0, 0xd, 0x0, 0xf, 0x4b, 0x10, 0x4, null, 0x46, 0x11, 0x0, 0x12, 0x37, 0x5, 0x7, 0x6, 0x0, 0x13, 0x6, 0x6, 0x6, 0x4, 0x4b, 0x10, 0x4, null, 0x46, 0x14, 0x0, 0x15, 0x37, 0x3, 0x7, 0x7, 0x6, 0x5, 0x4b, 0x16, 0x0, 0x17, 0x6, 0x7, 0x4, null, 0x46, 0x18, 0x0, 0x15, 0x37, 0x3, 0x7, 0x8, 0x6, 0x8, 0x0, 0x17, 0x6, 0x7, 0x4, null, 0x46, 0x19, 0x0, 0x2, 0x37, 0x1, 0xa, null, 0x4, null, 0x7, 0x8, 0x3, null, 0x6, 0x8, 0x38, null], 'c': ['ENC_PREFIX', 'startsWith', 0x1, 'getSecretKey', 0x0, 'length', 'slice', 'base64', 'Buffer', 'from', 0x2, 0x8, 0x10, 0x20, 'ITERATIONS', 'sha256', 'crypto', 'pbkdf2Sync', 0x5, 'aes-256-cbc', 'createDecipheriv', 0x3, 'undefined', 'utf8', 'update', 'final'], 'p': 0x1, 'l': 0x8, 'j': { 0x7: 0xa }, 'sp': 0x1 }, { 'i': [0xd5, 0x0, 0xd2, 0x0, 0x0, 0x0, 0x0, 0x1, 0xd3, 0x2, 0x46, 0x3, 0x46, 0x4, 0xa, null, 0x4b, 0x5, 0x0, 0x6, 0x36, 0x2, 0x3, null], 'c': ['success', 'Logged\x20in\x20as\x20', '_0x3db312$$7', 'user', 'tag', 'fuck_logger', 0x2], 'p': 0x0, 'l': 0x0, 'a': 0x1, 'sp': 0x1 }, { 'i': [0xd5, 0x0, 0xd2, 0x0, 0x0, 0x0, 0x0, 0x1, 0x8, 0x0, 0x46, 0x2, 0xa, null, 0x4b, 0x3, 0x0, 0x4, 0x36, 0x2, 0x3, null], 'c': ['error', 'Login\x20error:\x20', 'message', 'fuck_logger', 0x2], 'p': 0x1, 'l': 0x0, 'a': 0x1, 'sp': 0x1 }, { 'i': [0xd5, 0x0, 0xd2, 0x0, 0x3a, null, 0xd5, 0x0, 0xd2, 0x0, 0xda, 0x0, 0x4b, 0x1, 0x0, 0x2, 0x0, 0x3, 0x4b, 0x4, 0x4, null, 0x46, 0x5, 0x0, 0x6, 0x37, 0x3, 0xd9, 0x0, 0xd3, 0x0, 0x4b, 0x7, 0x4, null, 0x46, 0x8, 0x0, 0x9, 0x37, 0x1, 0x34, null, 0xd5, 0x0, 0xd2, 0x0, 0xda, 0xa, 0xda, 0xb, 0xda, 0xc, 0xd3, 0x0, 0x0, 0xd, 0x4b, 0x7, 0x4, null, 0x46, 0xe, 0x0, 0xf, 0x37, 0x2, 0xd9, 0xa, 0xd3, 0xa, 0x4b, 0x10, 0x4, null, 0x46, 0x11, 0x0, 0x9, 0x37, 0x1, 0xd9, 0xb, 0xd3, 0xb, 0x4, null, 0x34, null, 0x3, null, 0xd3, 0xb, 0x46, 0x12, 0x4, null, 0x34, null, 0x3, null, 0xd3, 0xb, 0x46, 0x12, 0x4b, 0x13, 0x4, null, 0x46, 0x14, 0x0, 0x9, 0x37, 0x1, 0x34, null, 0xd3, 0xb, 0x46, 0x12, 0x32, null, 0x5a, null, 0xd9, 0xc, 0xd3, 0xc, 0x46, 0x15, 0x0, 0x16, 0x2e, null, 0x34, null, 0xd5, 0x0, 0xd2, 0x0, 0xd3, 0xc, 0x7f, null, 0x7, 0x4, 0x3, null, 0x0, 0x17, 0x7, 0x5, 0x3, null, 0x0, 0x17, 0x7, 0x5, 0x3, null, 0x6, 0x4, 0x7b, null, 0x4, null, 0x80, null, 0x33, null, 0xd5, 0x0, 0xd2, 0x0, 0x46, 0x18, 0xd9, 0x19, 0x3a, null, 0xd5, 0x0, 0xd2, 0x0, 0xd3, 0x19, 0x46, 0x1a, 0x34, null, 0xd5, 0x0, 0xd2, 0x0, 0xda, 0x1b, 0xd3, 0x19, 0x46, 0x1a, 0xd7, 0x1b, 0xd3, 0x1b, 0x4b, 0x1c, 0x0, 0x9, 0x36, 0x1, 0x34, null, 0x3a, null, 0xd3, 0x1b, 0xd3, 0x1d, 0x0, 0x9, 0x36, 0x1, 0x4, null, 0xd4, 0x1b, 0x3, null, 0x0, 0x1e, 0x0, 0x1f, 0x4b, 0x20, 0x0, 0xf, 0x36, 0x2, 0x3, null, 0x3b, null, 0x32, null, 0xd5, 0x0, 0xd2, 0x0, 0x3c, 0x21, 0x0, 0x22, 0x0, 0x23, 0xd3, 0x21, 0x46, 0x24, 0xa, null, 0x4b, 0x20, 0x0, 0xf, 0x36, 0x2, 0x3, null, 0x0, 0x25, 0x7, 0x5, 0x3, null, 0xd6, 0x0, 0xd6, 0x0, 0xd6, 0x0, 0xd6, 0x0, 0x40, null, 0xd6, 0x0, 0x32, null, 0x3a, null, 0xd5, 0x0, 0xd2, 0x0, 0xda, 0x26, 0x4b, 0x27, 0x4d, null, 0x4, null, 0x0, 0x17, 0x47, 0x28, 0x3, null, 0x4, null, 0x0, 0x25, 0x47, 0x29, 0x3, null, 0x0, 0x9, 0x68, 0x1, 0xd9, 0x26, 0x0, 0x2a, 0x0, 0x2b, 0x64, null, 0xd3, 0x26, 0x4, null, 0x46, 0x2c, 0x0, 0xf, 0x37, 0x2, 0x3, null, 0xd3, 0x1b, 0x34, null, 0x0, 0x2d, 0x64, null, 0xd3, 0x1b, 0xd3, 0x26, 0x4, null, 0x46, 0x2e, 0x0, 0x9, 0x37, 0x1, 0x4, null, 0x46, 0x2f, 0x0, 0x9, 0x37, 0x1, 0x3, null, 0xd6, 0x0, 0x3b, null, 0x32, null, 0xd5, 0x0, 0xd2, 0x0, 0x3c, 0x30, 0x0, 0x22, 0x0, 0x31, 0xd3, 0x30, 0x46, 0x24, 0xa, null, 0x4b, 0x20, 0x0, 0xf, 0x36, 0x2, 0x3, null, 0xd6, 0x0, 0x32, null, 0xd6, 0x0, 0xd6, 0x0, 0xd6, 0x0, 0x3b, null, 0x32, null, 0x3d, null, 0x6, 0x5, 0x33, null, 0x6, 0x4, 0x7c, null, 0x3e, null, 0x3, null, 0xd6, 0x0, 0xd6, 0x0, 0xd6, 0x0, 0x3b, null, 0x32, null, 0xd5, 0x0, 0xd2, 0x0, 0x3c, 0x32, 0x0, 0x22, 0x0, 0x33, 0xd3, 0x32, 0x46, 0x24, 0xa, null, 0x4b, 0x20, 0x0, 0xf, 0x36, 0x2, 0x3, null, 0xd6, 0x0, 0x32, null, 0xd6, 0x0, 0x1, null, 0x38, null], 'c': ['_0x7f556b$$1', '__dirname', 'CONFIG', 'config.yml', 'path', 'join', 0x3, 'fs', 'existsSync', 0x1, '_0x43944d$$2', '_0x448097$$2', '_0x1447ec$$2', 'utf8', 'readFileSync', 0x2, 'yaml', 'load', 'INPUTS', 'Array', 'isArray', 'length', 0x0, ![], 'value', '_0xd65a3f', 'token', '_0x4d6ffd$$6', 'isEncrypted', 'decrypt', 'info', 'Token\x20decrypted', 'fuck_logger', '_0x252cde$$8', 'error', 'decryption\x20failed:\x20', 'message', !![], '_0x3db312$$7', 'Client', 'checkUpdate', 'patchVoice', 'ready', 0x3, 'on', 0x4, 'login', 'catch', '_0x5230bc$$7', 'Failed\x20to\x20initialize\x20client:\x20', '_0x5bb910$$1', 'Failed\x20in\x20custom\x20login\x20handler:\x20'], 'p': 0x0, 'l': 0x8, 'j': { 0x15: 0xd9, 0x2c: 0x30, 0x31: 0x3a, 0x3a: 0x3e, 0x3d: 0x3f, 0x44: 0xd8, 0x55: 0xd6, 0x5f: 0xcc, 0x6a: 0x91, 0x7a: 0x91, 0x8e: 0xcf, 0x90: 0x91, 0xac: 0xba, 0xbc: 0xcb, 0xca: 0xcb, 0xcf: 0x4e, 0xd2: 0xd5, 0xdb: 0xea, 0xe9: 0xea }, 'x': { 0x2: [0xdc, -0x1, 0xea], 0x5a: [-0x1, 0xd0, 0xd7], 0x6b: [0x7b, -0x1, 0x91], 0x91: [0xbd, -0x1, 0xcb] }, 's': 0x1, 'sp': 0x1 }]; function o(K) { return v[K]; } for (let K = 0x0; K < v['length']; K++) { let N = v[K]; if (N['c']) for (let T = 0x0; T < N['c']['length']; T++) { let i = N['c'][T]; if (typeof i === 'string' && i['length'] > 0x1 && i[i['length'] - 0x1] === 'n') try { N['c'][T] = BigInt(i['slice'](0x0, -0x1)); } catch (C) { } } } let u = { 0x0: 0xc7, 0x1: 0x26, 0x2: 0x11, 0x3: 0xc6, 0x4: 0x17d, 0x5: 0x45, 0x6: 0x1f, 0x7: 0x1e, 0x8: 0x1e4, 0x9: 0x16d, 0xa: 0x102, 0xb: 0x68, 0xc: 0x48, 0xd: 0x65, 0xe: 0x13d, 0xf: 0x9c, 0x10: 0x85, 0x11: 0x10, 0x12: 0xf8, 0x13: 0x1ac, 0x14: 0x108, 0x15: 0x81, 0x16: 0x137, 0x17: 0x111, 0x18: 0x9, 0x19: 0x27, 0x1a: 0x2c, 0x1b: 0x8f, 0x1c: 0xdd, 0x20: 0x13b, 0x28: 0xea, 0x29: 0x1cf, 0x2a: 0x1d2, 0x2b: 0x51, 0x2c: 0x124, 0x2d: 0x127, 0x2e: 0x13f, 0x2f: 0xad, 0x32: 0x1ef, 0x33: 0xa5, 0x34: 0xc3, 0x35: 0x36, 0x36: 0x19b, 0x37: 0x20, 0x38: 0x1aa, 0x39: 0x177, 0x3a: 0x195, 0x3b: 0x1db, 0x3c: 0x34, 0x3d: 0x17e, 0x3e: 0x160, 0x3f: 0x11f, 0x40: 0x113, 0x41: 0x129, 0x46: 0xda, 0x47: 0x1f2, 0x48: 0x5c, 0x49: 0x15, 0x4a: 0xb, 0x4b: 0x198, 0x4c: 0x9f, 0x4d: 0x89, 0x4e: 0xab, 0x4f: 0x12d, 0x50: 0x1c4, 0x51: 0x35, 0x52: 0x1b8, 0x53: 0x18f, 0x54: 0x16b, 0x5a: 0x8, 0x5b: 0x2, 0x5c: 0x9d, 0x5d: 0x1c9, 0x5e: 0xcb, 0x5f: 0x1e0, 0x64: 0xe7, 0x65: 0x98, 0x66: 0xbc, 0x67: 0x84, 0x68: 0x101, 0x69: 0x1c8, 0x6a: 0x1dc, 0x6b: 0x1, 0x6e: 0xeb, 0x6f: 0x11b, 0x70: 0x22, 0x78: 0x7b, 0x79: 0x63, 0x7a: 0x1f5, 0x7b: 0xf, 0x7c: 0x100, 0x7d: 0x40, 0x7e: 0x182, 0x7f: 0x139, 0x80: 0x8e, 0x81: 0x115, 0x82: 0xd5, 0x83: 0x50, 0x84: 0x2d, 0x8c: 0x7, 0x8d: 0x10e, 0x8e: 0x16f, 0x8f: 0x12e, 0x90: 0x131, 0x91: 0x76, 0x92: 0x1f1, 0x93: 0x181, 0x94: 0x75, 0x95: 0x145, 0x96: 0x5, 0x97: 0xec, 0x98: 0x162, 0x99: 0x169, 0x9a: 0x66, 0x9b: 0x1a2, 0x9c: 0x1b0, 0x9d: 0xd, 0x9e: 0x116, 0xa0: 0x15e, 0xa1: 0x4a, 0xa2: 0x146, 0xa3: 0x15d, 0xa4: 0x2a, 0xa5: 0xd7, 0xa6: 0xae, 0xa7: 0xc9, 0xa8: 0xf6, 0xa9: 0xd6, 0xb4: 0xe5, 0xb5: 0x152, 0xb6: 0x13, 0xb7: 0x95, 0xb8: 0x18d, 0xb9: 0xfb, 0xc8: 0x6c, 0xc9: 0xfe, 0xca: 0x67, 0xd2: 0x47, 0xd3: 0x17a, 0xd4: 0x61, 0xd5: 0x1a9, 0xd6: 0x1e9, 0xd7: 0xaa, 0xd8: 0x179, 0xd9: 0x14, 0xda: 0xbf, 0xdb: 0xf5, 0xdc: 0x1b3, 0xfa: 0x53, 0xfb: 0x18e, 0xfc: 0x82, 0xfd: 0x186, 0xfe: 0x10c, 0xff: 0x1fb, 0x100: 0xd3, 0x101: 0xb7, 0x102: 0x1d6, 0x103: 0x1e1, 0x104: 0x132, 0x105: 0x10f }; const m = {}, p = 0x1, H = 0x2, B = 0x3, n = 0x4, S = 0x78, j = 0x79, b = 0x7a; let A = new WeakSet(), x = new WeakSet(); function k(h, G, W) { try { vmq(h, G, W); } catch (a) { } } function q(h, G) { let W = []; for (let a = 0x0; a < G; a++) { let t = h(); if (t && typeof t === 'object' && A['has'](t)) { let s = t['value']; if (Array['isArray'](s)) for (let v0 = s['length'] - 0x1; v0 >= 0x0; v0--) { W['push'](s[v0]); } } else W['push'](t); } return W['reverse'](), W; } function l(h) { let G = []; for (let W in h) { G['push'](W); } return G; } function I(h) { let G = []; for (let W = 0x0; W < h['length']; W++) { G['push'](h[W]); } return G; } function c(h) { return typeof h === 'function' && h['prototype'] ? h['prototype'] : h; } function r(h) { if (typeof h === 'function') return vmR(h); let G = vmR(h), W = G && G['constructor'] && G['constructor']['prototype'] === G; if (W) return vmR(G); return G; } function V(h, G) { let W = h; while (W !== null) { let a = vmI(W, G); if (a) return { 'desc': a, 'proto': W }; W = vmR(W); } return { 'desc': null, 'proto': h }; } function R(h, G) { if (!h['_$KD0zjB']) return; G in h['_$KD0zjB'] && delete h['_$KD0zjB'][G]; let W = G['split']('$$')[0x0]; W !== G && W in h['_$KD0zjB'] && delete h['_$KD0zjB'][W]; } function D(h, G) { let W = h; while (W) { R(W, G), W = W['_$wbxkap']; } } function z(h, G, W, a) { if (a) { let t = Reflect['set'](h, G, W); if (!t) throw new TypeError('Cannot\x20assign\x20to\x20read\x20only\x20property\x20\x27' + String(G) + '\x27\x20of\x20object'); } else Reflect['set'](h, G, W); } function J() { return !vmb_5c3957['_$AexUST'] && (vmb_5c3957['_$AexUST'] = new Map()), vmb_5c3957['_$AexUST']; } function X() { return vmb_5c3957['_$AexUST'] || null; } function Q(h, G, W) { if (h['ni'] === undefined || !W) return; let a = h['c'][h['ni']]; G['_$UQQKD7'][a] = W; if (h['nfe']) { if (!G['_$unVGdO']) G['_$unVGdO'] = {}; G['_$unVGdO'][a] = !![]; } k(W, 'name', { 'value': a, 'writable': ![], 'enumerable': ![], 'configurable': !![] }); } function Z(h) { return '_$TjCG84' + h['substring'](0x1) + '_$YuJKMs'; } function L(h) { return '_$v2AOtJ' + h['substring'](0x1) + '_$ry4u0B'; } let d = ![], Y = 0x0, O = 0x0, g = ![], E = 0x1388, U = 0x3; function f() { if (!d || g) return; let h = Date['now'](); if (Y === 0x0) { Y = h; return; } let G = h - Y; Y = h; if (G > E) { O++; if (O >= U) { g = !![]; for (let W in u) { u[W] = u[W] + 0x1 & 0x1ff; } } } else O = 0x0; } function P(h, G, W, a, t, s) { let v0 = [], v1 = 0x0, v2 = new Array((h['p'] || 0x0) + (h['l'] || 0x0)), v3 = 0x0, v4 = h['c'], v5 = h['i'], v6 = h['j'] || {}, v7 = h['x'] || {}, v8 = v5['length'] >> 0x1, v9 = vK => vK << 0x1, vv = vK => (vK << 0x1) + 0x1, vo = [], vu = null, vm = { ['_$wuXEBW']: ![], ['_$AIWPOp']: undefined }, vp = { ['_$1jfZqV']: ![], ['_$5Acr92']: 0x0 }, vH = { ['_$AETnwi']: ![], ['_$gl2Ob0']: 0x0 }, vB = h['o'] || u, vn = !!h['st'], vS = !!h['sp'], vj = !!h['dc'], vb = !!h['nte'], vA = s, vx = !!h['a']; !vn && !vx && (s === undefined || s === null) && (s = vmA); var vk = 0x0, vq = null, vl = null; let vI = h['seKey'], vc, vr, vV, vR, vD, vz; if (vI !== undefined) { let vK = vN => typeof vN === 'number' && Number['isFinite'](vN) && Number['isInteger'](vN) && vN >= -0x80000000 && vN <= 0x7fffffff && !Object['is'](vN, -0x0) ? vN ^ vI | 0x0 : vN; vc = vN => { v0[v1++] = vK(vN); }, vr = () => vK(v0[--v1]), vV = () => vK(v0[v1 - 0x1]), vR = vN => { v0[v1 - 0x1] = vK(vN); }, vD = vN => vK(v0[v1 - vN]), vz = (vN, vT) => { v0[v1 - vN] = vK(vT); }; } else vc = vN => { v0[v1++] = vN; }, vr = () => v0[--v1], vV = () => v0[v1 - 0x1], vR = vN => { v0[v1 - 0x1] = vN; }, vD = vN => v0[v1 - vN], vz = (vN, vT) => { v0[v1 - vN] = vT; }; let vJ = vN => vN, vX = { ['_$wbxkap']: W, ['_$UQQKD7']: vml(null) }; if (G) for (let vN = 0x0; vN < Math['min'](G['length'], h['p'] || 0x0); vN++) { v2[vN] = G[vN]; } let vQ = vn && G ? I(G) : null, vZ = null, vL = ![]; vb && (!vX['_$KD0zjB'] && (vX['_$KD0zjB'] = vml(null)), vX['_$KD0zjB']['__this__'] = !![]); Q(h, vX, a); while (v3 < v8) { try { while (v3 < v8) { let vT = v5[v9(v3)], vi = vT, ve = vB[vi], vC = v5[vv(v3)], vh = vC === null ? undefined : vC; if (typeof vw === 'undefined') var vd = ![], vY, vO = ![], vg = ![], vE = ![], vU = ![], vf = ![], vP = undefined, vM = null, vy = null, vF = { 0x0: 0x74, 0x1: 0xc, 0x2: 0x21, 0x3: 0x71, 0x4: 0x46, 0x5: 0x22, 0x6: 0x64, 0x7: 0x61, 0x8: 0x45, 0x9: 0x6b, 0xa: 0xa, 0xb: 0x85, 0xc: 0xd, 0xd: 0x44, 0xe: 0x82, 0xf: 0x7d, 0x10: 0x7, 0x11: 0x54, 0x12: 0x5, 0x13: 0xf, 0x14: 0x3c, 0x15: 0x23, 0x16: 0x70, 0x17: 0x5e, 0x18: 0x93, 0x19: 0x1d, 0x1a: 0x7f, 0x1b: 0x78, 0x1c: 0x4e, 0x20: 0xb, 0x28: 0x25, 0x29: 0x6a, 0x2a: 0x76, 0x2b: 0x5c, 0x2c: 0x3b, 0x2d: 0x28, 0x2e: 0x49, 0x2f: 0x87, 0x32: 0x30, 0x33: 0x4c, 0x34: 0x3a, 0x35: 0x63, 0x36: 0x3, 0x37: 0x8a, 0x38: 0x2f, 0x39: 0x7a, 0x3a: 0x1f, 0x3b: 0x19, 0x3c: 0x42, 0x3d: 0x8e, 0x3e: 0x75, 0x3f: 0x50, 0x40: 0x8d, 0x46: 0x32, 0x47: 0x11, 0x48: 0x4a, 0x49: 0x83, 0x4a: 0x51, 0x4b: 0x2b, 0x4c: 0x8, 0x4d: 0x57, 0x4e: 0x48, 0x4f: 0x17, 0x51: 0x81, 0x52: 0x55, 0x53: 0x24, 0x54: 0x66, 0x5a: 0x77, 0x5b: 0x1e, 0x5d: 0x8c, 0x5e: 0x26, 0x5f: 0x67, 0x64: 0x4b, 0x68: 0x80, 0x69: 0x7e, 0x6a: 0x33, 0x6e: 0x13, 0x6f: 0x84, 0x70: 0x14, 0x7b: 0x18, 0x7c: 0x36, 0x7f: 0x5a, 0x80: 0x43, 0x81: 0x5d, 0x82: 0x10, 0x83: 0x3e, 0x84: 0x73, 0x8c: 0x40, 0x8d: 0x41, 0x8e: 0x7b, 0x8f: 0x4, 0x90: 0x68, 0x91: 0x15, 0x92: 0x7c, 0x93: 0x27, 0x94: 0x1, 0x95: 0x6e, 0x96: 0x89, 0x97: 0x58, 0x98: 0x1b, 0x99: 0x62, 0x9a: 0x2c, 0x9b: 0x0, 0x9c: 0x47, 0x9d: 0x72, 0x9e: 0x29, 0xa0: 0x34, 0xa1: 0x39, 0xa2: 0x9, 0xa3: 0x6, 0xa4: 0x1c, 0xa5: 0x88, 0xa6: 0x3f, 0xa7: 0x2, 0xa8: 0x37, 0xa9: 0x5f, 0xb4: 0x56, 0xb5: 0x69, 0xb6: 0x6c, 0xb7: 0x91, 0xb8: 0x6d, 0xb9: 0x92, 0xc8: 0x59, 0xc9: 0x2d, 0xca: 0x86, 0xd2: 0x35, 0xd3: 0x16, 0xd4: 0x79, 0xd5: 0x3d, 0xd6: 0x38, 0xd7: 0xe, 0xd8: 0x5b, 0xd9: 0x52, 0xda: 0x12, 0xdb: 0x65, 0xdc: 0x60, 0xfa: 0x6f, 0xfb: 0x4d, 0xfc: 0x4f, 0xfd: 0x53, 0xfe: 0x8b, 0xff: 0x2e, 0x100: 0x90, 0x101: 0x2a, 0x102: 0x20, 0x103: 0x8f, 0x104: 0x1a, 0x105: 0x31 }, vw = [function (vG) { while (!![]) { let vW = vr(), va = v4[vG]; if (vW == null) { vc(undefined), v3++; break; } let vt = J(), vs = vt['get'](va); if (!vs || !vs['has'](vW)) throw new TypeError('Cannot\x20read\x20private\x20member\x20' + va + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); vc(vs['get'](vW)), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(), vt = v4[vG]; vmq(va, vt, { 'get': vW, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { if (vG === -0x1) vc(Symbol()); else { let vW = vr(); vc(Symbol(vW)); } v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vmb_5c3957['_$HSYyzG']; vmb_5c3957['_$HSYyzG'] = undefined; try { let vs = va['apply'](undefined, q(vr, vW)); vc(vs); } finally { vmb_5c3957['_$HSYyzG'] = vt; } v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vr(), vs = r(vt), o0 = V(vs, va); o0['desc'] && o0['desc']['set'] ? o0['desc']['set']['call'](vt, vW) : vt[va] = vW; vc(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va ** vW), v3++; break; } }, function (vG) { while (!![]) { vr(), vc(undefined), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vc(typeof vW === 'bigint' ? vW + 0x1n : +vW + 0x1), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = v4[vG]; if (vmb_5c3957['_$5L5rWq'] && va in vmb_5c3957['_$5L5rWq']) throw new ReferenceError('Cannot\x20access\x20\x27' + va + '\x27\x20before\x20initialization'); let vt = !(va in vmb_5c3957) && !(va in vmA); vmb_5c3957[va] = vW; va in vmA && (vmA[va] = vW); vt && (vmA[va] = vW); vc(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >> 0x10, vt = v4[vW], vs = v4[va]; vc(new RegExp(vt, vs)), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va + vW), v3++; break; } }, function (vG) { while (!![]) { vc(!vr()), v3++; break; } }, function (vG) { while (!![]) { vc(undefined), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va * vW), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG], va = vr(); R(vy, vW), vy['_$UQQKD7'][vW] = va, v3++; break; } }, function (vG) { while (!![]) { vc(+vr()), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vW['next'](); vc(Promise['resolve'](va)), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = v4[vG]; if (va === null || va === undefined) throw new TypeError('Cannot\x20set\x20property\x20\x27' + String(vt) + '\x27\x20of\x20' + va); z(va, vt, vW, vO), vc(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG]; !vy['_$KD0zjB'] && (vy['_$KD0zjB'] = {}); vy['_$KD0zjB'][vW] = !![], v3++; break; } }, function (vG) { while (!![]) { vc(typeof vr()), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG]; vW in vmb_5c3957 ? vc(typeof vmb_5c3957[vW]) : vc(typeof vmA[vW]); v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(), vt = v4[vG], vs = c(va); vmq(vs, vt, { 'get': vW, 'enumerable': vs === va, 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG]; if (vW === '__this__') { let o2 = vy; while (o2) { if (o2['_$KD0zjB'] && '__this__' in o2['_$KD0zjB']) throw new ReferenceError('Cannot\x20access\x20\x27__this__\x27\x20before\x20initialization'); if (o2['_$UQQKD7'] && '__this__' in o2['_$UQQKD7']) break; o2 = o2['_$wbxkap']; } vc(s), v3++; break; } let va = vy, vt, vs = ![], o0 = vW['indexOf']('$$'), o1 = o0 !== -0x1 ? vW['substring'](0x0, o0) : null; while (va) { if (va['_$KD0zjB'] && vW in va['_$KD0zjB']) throw new ReferenceError('Cannot\x20access\x20\x27' + vW + '\x27\x20before\x20initialization'); if (o1 && va['_$KD0zjB'] && o1 in va['_$KD0zjB']) { if (!(va['_$UQQKD7'] && vW in va['_$UQQKD7'])) throw new ReferenceError('Cannot\x20access\x20\x27' + o1 + '\x27\x20before\x20initialization'); } if (va['_$UQQKD7'] && vW in va['_$UQQKD7']) { vt = va['_$UQQKD7'][vW], vs = !![]; break; } va = va['_$wbxkap']; } !vs && (vW in vmb_5c3957 ? vt = vmb_5c3957[vW] : vt = vmA[vW]); vc(vt), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va in vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vW['next'](); vc(va), v3++; break; } }, function (vG) { while (!![]) { vo['pop'](), v3++; break; } }, function (vG) { while (!![]) { let vW = v2[vG] + 0x1; v2[vG] = vW, vc(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = v4[vG], vs = J(); !vs['has'](vt) && vs['set'](vt, new WeakMap()); let o0 = vs['get'](vt); if (o0['has'](va)) throw new TypeError('Cannot\x20initialize\x20' + vt + '\x20twice\x20on\x20the\x20same\x20object'); o0['set'](va, vW), v3++; break; } }, function (vG) { while (!![]) { vc(t), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va >> vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(); va['push'](vW), v3++; break; } }, function (vG) { while (!![]) { let vW = v7[v3]; vo['push']({ ['_$rap1ZX']: vW[0x0] >= 0x0 ? vJ(vW[0x0]) : undefined, ['_$ACRL5d']: vW[0x1] >= 0x0 ? vJ(vW[0x1]) : undefined, ['_$eliJSn']: vW[0x2] >= 0x0 ? vJ(vW[0x2]) : undefined, ['_$mKZhIl']: v1 }), v3++; break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >>> 0x10, vt = vr(), vs = q(vr, vt), o0 = v2[vW], o1 = v4[va], o2 = o0[o1]; vc(o2['apply'](o0, vs)), v3++; break; } }, function (vG) { while (!![]) { vc(null), v3++; break; } }, function (vG) { while (!![]) { let vW = vV(); vR(vD(0x2)), vz(0x2, vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va | vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = v4[vG]; vmq(va, vt, { 'value': vW, 'writable': !![], 'enumerable': !![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va == vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(); if (Array['isArray'](vW)) Array['prototype']['push']['apply'](va, vW); else for (let vt of vW) { va['push'](vt); } v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(), vt = v4[vG]; vmq(va, vt, { 'value': vW, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va <= vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = v4[vG], vs = X(); if (vs) { let o1 = 'set_' + vt, o2 = vs['get'](o1); if (o2 && o2['has'](va)) { let o4 = o2['get'](va); o4['call'](va, vW), vc(vW), v3++; break; } let o3 = vs['get'](vt); if (o3 && o3['has'](va)) { o3['set'](va, vW), vc(vW), v3++; break; } } let o0 = Z(vt); if (o0 in va) { va[o0] = vW, vc(vW), v3++; break; } throw new TypeError('Cannot\x20write\x20private\x20member\x20' + vt + '\x20to\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >>> 0x10; v2[vW] < v4[va] ? v3 = vJ(v6[v3]) : v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG], va; if (vmb_5c3957['_$5L5rWq'] && vW in vmb_5c3957['_$5L5rWq']) throw new ReferenceError('Cannot\x20access\x20\x27' + vW + '\x27\x20before\x20initialization'); if (vW in vmb_5c3957) va = vmb_5c3957[vW]; else { if (vW in vmA) va = vmA[vW]; else throw new ReferenceError(vW + '\x20is\x20not\x20defined'); } vc(va), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = v4[vG], vs = null, o0 = X(); if (o0) { let o3 = o0['get'](vt); o3 && o3['has'](va) && (vs = o3['get'](va)); } if (vs === null) { let o4 = L(vt); o4 in va && (vs = va[o4]); } if (vs === null) throw new TypeError('Cannot\x20read\x20private\x20member\x20' + vt + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); if (typeof vs !== 'function') throw new TypeError(vt + '\x20is\x20not\x20a\x20function'); let o1 = q(vr, vW), o2 = vs['apply'](va, o1); vc(o2), v3++; break; } }, function (vG) { while (!![]) { v3++; break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >>> 0x10, vt = v2[vW], vs = v4[va]; vc(vt[vs]), v3++; break; } }, function (vG) { while (!![]) { if (vo['length'] > 0x0) { let vW = vo[vo['length'] - 0x1]; if (vW['_$ACRL5d'] !== undefined) { vm['_$wuXEBW'] = !![], vm['_$AIWPOp'] = vr(), v3 = vW['_$ACRL5d']; break; } } vm['_$wuXEBW'] && (vm['_$wuXEBW'] = ![], vm['_$AIWPOp'] = undefined); vd = !![], vY = vr(); return; break; } }, function (vG) { while (!![]) { v3 = vJ(v6[v3]); break; } }, function (vG) { while (!![]) { let vW = v2[vG] - 0x1; v2[vG] = vW, vc(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = v4[vG]; if (vW === null || vW === undefined) throw new TypeError('Cannot\x20read\x20property\x20\x27' + String(va) + '\x27\x20of\x20' + vW); vc(vW[va]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vc(import(vW)), v3++; break; } }, function (vG) { while (!![]) { if (vE && !vf) throw new ReferenceError('Must\x20call\x20super\x20constructor\x20in\x20derived\x20class\x20before\x20accessing\x20\x27this\x27\x20or\x20returning\x20from\x20derived\x20constructor'); vc(s), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = { ['_$UQQKD7']: vml(null), ['_$pXrZwW']: vml(null), ['_$KD0zjB']: vml(null), ['_$wbxkap']: vW }; vy = va, v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vW && typeof vW['return'] === 'function' && vW['return'](); v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG]; vc(Symbol['for'](vW)), v3++; break; } }, function (vG) { while (!![]) { vy && vy['_$wbxkap'] && (vy = vy['_$wbxkap']); v3++; break; } }, function (vG) { while (!![]) { if (vZ === null) { if (vO || !vg) { vZ = []; let vW = vM || G; if (vW) for (let va = 0x0; va < vW['length']; va++) { vZ[va] = vW[va]; } if (vO) { let vt = function () { throw new TypeError('\x27caller\x27,\x20\x27callee\x27,\x20and\x20\x27arguments\x27\x20properties\x20may\x20not\x20be\x20accessed\x20on\x20strict\x20mode\x20functions\x20or\x20the\x20arguments\x20objects\x20for\x20calls\x20to\x20them'); }; vmq(vZ, 'callee', { 'get': vt, 'set': vt, 'enumerable': ![], 'configurable': ![] }); } else vmq(vZ, 'callee', { 'value': a, 'writable': !![], 'enumerable': ![], 'configurable': !![] }); } else { let vs = G ? G['length'] : 0x0, o0 = {}, o1 = function (o5) { return typeof o5 === 'string' ? parseInt(o5, 0xa) : NaN; }, o2 = function (o5) { return !isNaN(o5) && o5 >= 0x0; }, o3 = function (o5) { return o5 < G['length'] ? G[o5] : o0[o5]; }, o4 = function (o5) { return o5 < G['length'] ? o5 in G : o5 in o0; }; vZ = new Proxy([], { 'get': function (o5, o6, o7) { if (o6 === 'length') return vs; if (o6 === 'callee') return a; if (o6 === Symbol['iterator']) return function () { let ov = 0x0; return { 'next': function () { if (ov < vs) return { 'value': o3(ov++), 'done': ![] }; return { 'done': !![] }; } }; }; let o8 = o1(o6); if (o2(o8)) return o3(o8); if (o6 === 'hasOwnProperty') return function (ov) { if (ov === 'length' || ov === 'callee') return !![]; let oo = o1(ov); return o2(oo) && oo < vs && o4(oo); }; let o9 = Array['prototype'][o6]; if (typeof o9 === 'function') return function () { let ov = []; for (let oo = 0x0; oo < vs; oo++)ov[oo] = o3(oo); return o9['apply'](ov, arguments); }; return undefined; }, 'set': function (o5, o6, o7) { if (o6 === 'length') return vs = o7, !![]; let o8 = o1(o6); if (o2(o8)) { if (o8 < G['length']) G[o8] = o7; else o0[o8] = o7; if (o8 >= vs) vs = o8 + 0x1; return !![]; } return !![]; }, 'has': function (o5, o6) { if (o6 === 'length' || o6 === 'callee') return !![]; let o7 = o1(o6); if (o2(o7) && o7 < vs) return o4(o7); return o6 in Array['prototype']; }, 'deleteProperty': function (o5, o6) { let o7 = o1(o6); if (o2(o7)) { if (o7 < G['length']) delete G[o7]; else delete o0[o7]; } return !![]; }, 'getOwnPropertyDescriptor': function (o5, o6) { if (o6 === 'callee') return { 'value': a, 'writable': !![], 'enumerable': ![], 'configurable': !![] }; if (o6 === 'length') return { 'value': vs, 'writable': !![], 'enumerable': ![], 'configurable': !![] }; let o7 = o1(o6); if (o2(o7) && o7 < vs && o4(o7)) return { 'value': o3(o7), 'writable': !![], 'enumerable': !![], 'configurable': !![] }; return undefined; }, 'ownKeys': function (o5) { let o6 = []; for (let o7 = 0x0; o7 < vs; o7++)if (o4(o7)) o6['push'](String(o7)); return o6['push']('length', 'callee'), o6; } }); } } vc(vZ), v3++; break; } }, function (vG) { while (!![]) { !vr() ? v3 = vJ(v6[v3]) : v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va < vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va & vW), v3++; break; } }, function (vG) { while (!![]) { vc(vy), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vW && typeof vW['return'] === 'function' ? vc(Promise['resolve'](vW['return']())) : vc(Promise['resolve']()); v3++; break; } }, function (vG) { while (!![]) { vc(vmk[vG]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vG, vs = function (o0, o1) { let o2 = function () { if (o0) { o1 && (vmb_5c3957['_$Pz6Ieh'] = o2); let o3 = '_$9LcLjl' in vmb_5c3957; !o3 && (vmb_5c3957['_$9LcLjl'] = new.target); try { return o0['apply'](this, I(arguments)); } finally { o1 && delete vmb_5c3957['_$Pz6Ieh'], !o3 && delete vmb_5c3957['_$9LcLjl']; } } }; return o2; }(va, vt); vW && vmq(vs, 'name', { 'value': vW, 'configurable': !![] }); vc(vs), v3++; break; } }, function (vG) { while (!![]) { let va = vr(), vt = vV(); if (va === null) { vmV(vt['prototype'], null), vmV(vt, Function['prototype']), vt['_$GOO4LC'] = null, v3++; break; } let vs = ![]; try { let o0 = vml(va['prototype']), o1 = va['apply'](o0, []); o1 !== undefined && o1 !== o0 && (vs = !![]); } catch (o2) { o2 instanceof TypeError && (o2['message']['includes']('\x27new\x27') || o2['message']['includes']('constructor') || o2['message']['includes']('Illegal\x20constructor')) && (vs = !![]); } if (vs) { let o3 = vt, o4 = vmb_5c3957, o5 = '_$9LcLjl', o6 = '_$Pz6Ieh', o7 = '_$QTk2Bd'; function vW(...o8) { let o9 = vml(va['prototype']); o4[o7] = { 'parent': va, 'newTarget': new.target || vW }, o4[o6] = new.target || vW; let ov = o5 in o4; if (!ov) o4[o5] = new.target; try { let oo = o3['apply'](o9, o8); oo !== undefined && typeof oo === 'object' && (o9 = oo); } finally { delete o4[o7], delete o4[o6]; if (!ov) delete o4[o5]; } return o9; } vW['prototype'] = vml(va['prototype']), vW['prototype']['constructor'] = vW, vmV(vW, va), vmc(o3)['forEach'](function (o8) { o8 !== 'prototype' && o8 !== 'length' && o8 !== 'name' && k(vW, o8, vmI(o3, o8)); }); o3['prototype'] && (vmc(o3['prototype'])['forEach'](function (o8) { o8 !== 'constructor' && k(vW['prototype'], o8, vmI(o3['prototype'], o8)); }), vmr(o3['prototype'])['forEach'](function (o8) { k(vW['prototype'], o8, vmI(o3['prototype'], o8)); })); vr(), vc(vW), vW['_$GOO4LC'] = va, v3++; break; } vmV(vt['prototype'], va['prototype']), vmV(vt, va), vt['_$GOO4LC'] = va, v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); if (vG >= 0x0) { let va = v4[vG]; vy['_$UQQKD7'][va] = vW; } v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vc(!!vW['done']), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va / vW), v3++; break; } }, function (vG) { while (!![]) { vc(G[vG]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vc(vW), vc(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vr(); let va = vV(), vt = v4[vG], vs = J(); !vs['has'](vt) && vs['set'](vt, new WeakMap()); let o0 = vs['get'](vt); o0['set'](va, vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = v4[vG]; vW === null || vW === undefined ? vc(undefined) : vc(vW[va]); v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va > vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); if (va === null || va === undefined) throw new TypeError('Cannot\x20read\x20property\x20\x27' + String(vW) + '\x27\x20of\x20' + va); vc(va[vW]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = o(vW), vt = va && va['a'], vs = va && va['s'], o0 = va && va['g'], o1 = va && va['m'], o2 = vy, o3 = va && va['ni'] !== undefined ? va['c'][va['ni']] : undefined, o4 = va && va['p'] || 0x0, o5 = va && va['st'], o6 = vt ? vP : undefined, o7, o8 = o5 ? function (o9) { return o9 === vmA ? [undefined, ![]] : [m, !![]]; } : function (o9) { return [m, !![]]; }; if (o0) o7 = function o9() { let ov = I(arguments), [oo, ou] = o8(this); if (ou) return w['call'](this, vW, ov, o2, o7, undefined, oo); return w(vW, ov, o2, o7, undefined, oo); }, x['add'](o7); else { if (vs) { if (vt) o7 = { 'yQyQFa': async (...ov) => { return await F(vW, ov, o2, o7, undefined, undefined, o6); } }['yQyQFa']; else o1 ? o7 = { async 'yQyQFa'() { let ov = I(arguments), oo = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [ou, om] = o8(this); if (om) return await F['call'](this, vW, ov, o2, o7, oo, undefined, ou); return await F(vW, ov, o2, o7, oo, undefined, ou); } }['yQyQFa'] : o7 = async function ov() { let oo = I(arguments), ou = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [om, oH] = o8(this); if (oH) return await F['call'](this, vW, oo, o2, o7, ou, undefined, om); return await F(vW, oo, o2, o7, ou, undefined, om); }; } else { if (vt) o7 = { 'yQyQFa': (...oo) => { return y(vW, oo, o2, o7, undefined, o6); } }['yQyQFa']; else o1 ? o7 = { 'yQyQFa'() { let oo = I(arguments), ou = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [om, oH] = o8(this); if (oH) return y['call'](this, vW, oo, o2, o7, ou, om); return y(vW, oo, o2, o7, ou, om); } }['yQyQFa'] : o7 = function oo() { let ou = I(arguments), om = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [oH, oB] = o8(this); if (oB) return y['call'](this, vW, ou, o2, o7, om, oH); return y(vW, ou, o2, o7, om, oH); }; } } k(o7, 'length', { 'value': o4, 'writable': ![], 'enumerable': ![], 'configurable': !![] }), vc(o7), v3++; break; } }, function (vG) { while (!![]) { vr() ? v3 = vJ(v6[v3]) : v3++; break; } }, function (vG) { while (!![]) { v2[vG] = v2[vG] - 0x1, v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vc(typeof vW === 'bigint' ? vW : +vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >>> 0x10; vc(v2[vW] + v4[va]), v3++; break; } }, function (vG) { while (!![]) { let vW = vJ(v6[v3]); if (vo['length'] > 0x0) { let va = vo[vo['length'] - 0x1]; if (va['_$ACRL5d'] !== undefined && vW >= va['_$eliJSn']) { vp['_$1jfZqV'] = !![], vp['_$5Acr92'] = vW, v3 = va['_$ACRL5d']; break; } } v3 = vW; break; } }, function (vG) { while (!![]) { let vW, va; vG !== undefined ? (va = vr(), vW = v4[vG]) : (vW = vr(), va = vr()); let vt = delete va[vW]; if (vO && !vt) throw new TypeError('Cannot\x20delete\x20property\x20\x27' + String(vW) + '\x27\x20of\x20object'); vc(vt), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG], va = vr(); R(vy, vW), vy['_$UQQKD7'][vW] = va; !vy['_$pXrZwW'] && (vy['_$pXrZwW'] = {}); vy['_$pXrZwW'][vW] = !![], v3++; break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >>> 0x10; vc(v2[vW] - v4[va]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vc(typeof vW === 'bigint' ? vW - 0x1n : +vW - 0x1), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); va === null || va === undefined ? vc(undefined) : vc(va[vW]); v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vV(); vmq(vt['prototype'], va, { 'value': vW, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { vc({}), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = v4[vG], vs = J(), o0 = 'set_' + vt, o1 = vs['get'](o0); if (o1 && o1['has'](va)) { let o5 = o1['get'](va); o5['call'](va, vW), vc(vW), v3++; break; } let o2 = '_$v2AOtJ' + 'set_' + vt['substring'](0x1) + '_$ry4u0B'; if (va['constructor'] && o2 in va['constructor']) { let o6 = va['constructor'][o2]; o6['call'](va, vW), vc(vW), v3++; break; } let o3 = vs['get'](vt); if (o3 && o3['has'](va)) { o3['set'](va, vW), vc(vW), v3++; break; } let o4 = Z(vt); if (o4 in va) { va[o4] = vW, vc(vW), v3++; break; } throw new TypeError('Cannot\x20write\x20private\x20member\x20' + vt + '\x20to\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (vG) { while (!![]) { debugger; v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); if (vW == null) throw new TypeError('Cannot\x20iterate\x20over\x20' + vW); let va = vW[Symbol['iterator']]; if (typeof va !== 'function') throw new TypeError('Object\x20is\x20not\x20iterable'); vc(va['call'](vW)), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG], va = vr(), vt = vy, vs = ![]; while (vt) { if (vt['_$UQQKD7'] && vW in vt['_$UQQKD7']) { if (vt['_$pXrZwW'] && vW in vt['_$pXrZwW']) break; vt['_$UQQKD7'][vW] = va; !vt['_$pXrZwW'] && (vt['_$pXrZwW'] = {}); vt['_$pXrZwW'][vW] = !![], vs = !![]; break; } vt = vt['_$wbxkap']; } !vs && (D(vy, vW), vy['_$UQQKD7'][vW] = va, !vy['_$pXrZwW'] && (vy['_$pXrZwW'] = {}), vy['_$pXrZwW'][vW] = !![]); v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va !== vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); if (vW == null) throw new TypeError('Cannot\x20iterate\x20over\x20' + vW); let va = vW[Symbol['asyncIterator']]; if (typeof va === 'function') vc(va['call'](vW)); else { let vt = vW[Symbol['iterator']]; if (typeof vt !== 'function') throw new TypeError('Object\x20is\x20not\x20async\x20iterable'); vc(vt['call'](vW)); } v3++; break; } }, function (vG) { while (!![]) { vc(~vr()), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vc(Symbol['keyFor'](vW)), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = v4[vG]; if (vO && !(va in vmA) && !(va in vmb_5c3957)) throw new ReferenceError(va + '\x20is\x20not\x20defined'); vmb_5c3957[va] = vW, vmA[va] = vW, vc(vW), v3++; break; } }, function (vG) { while (!![]) { v2[vG] = vr(), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = v4[vG], vt = ![], vs = X(); if (vs) { let o0 = vs['get'](va); vt = o0 && o0['has'](vW); } vc(vt), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(); vW !== null && vW !== undefined ? v3 = vJ(v6[v3]) : v3++; break; } }, function (vG) { while (!![]) { vc(v2[vG]), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG], va = vr(), vt = vy['_$wbxkap']; vt && (vt['_$UQQKD7'][vW] = va); v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vr(); vmq(vt, va, { 'value': vW, 'writable': !![], 'enumerable': !![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vV(); vW['length']++, v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(), vt = v4[vG]; vmq(va['prototype'], vt, { 'value': vW, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vV(); vmq(vt, va, { 'value': vW, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va != vW), v3++; break; } }, function (vG) { while (!![]) { G[vG] = vr(), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vV(), vs = c(vt); vmq(vs, va, { 'get': vW, 'enumerable': vs === vt, 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vV(); vmq(vt, va, { 'get': vW, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(), vt = v4[vG]; vmq(va, vt, { 'set': vW, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { v2[vG] = v2[vG] + 0x1, v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va ^ vW), v3++; break; } }, function (vG) { while (!![]) { vr(), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = v4[vG], vt = X(); if (vt) { let o0 = 'get_' + va, o1 = vt['get'](o0); if (o1 && o1['has'](vW)) { let o3 = o1['get'](vW); vc(o3['call'](vW)), v3++; break; } let o2 = vt['get'](va); if (o2 && o2['has'](vW)) { vc(o2['get'](vW)), v3++; break; } } let vs = Z(va); if (vs in vW) { vc(vW[vs]), v3++; break; } throw new TypeError('Cannot\x20read\x20private\x20member\x20' + va + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (vG) { while (!![]) { let vW = vr(); vc(l(vW)), v3++; break; } }, function (vG) { while (!![]) { vc(v4[vG]), v3++; break; } }, function (vG) { while (!![]) { if (vm['_$wuXEBW']) { let vW = vm['_$AIWPOp']; vm['_$wuXEBW'] = ![], vm['_$AIWPOp'] = undefined, vd = !![], vY = vW; return; } if (vp['_$1jfZqV']) { let va = vp['_$5Acr92']; vp['_$1jfZqV'] = ![], vp['_$5Acr92'] = 0x0, v3 = va; break; } if (vH['_$AETnwi']) { let vt = vH['_$gl2Ob0']; vH['_$AETnwi'] = ![], vH['_$gl2Ob0'] = 0x0, v3 = vt; break; } if (vu !== null) { let vs = vu; vu = null; throw vs; } v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va === vW), v3++; break; } }, function (vG) { while (!![]) { vc([]), v3++; break; } }, function (vG) { while (!![]) { let vW = vD(0x3), va = vD(0x2), vt = vV(); vz(0x3, va), vz(0x2, vt), vR(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = v4[vG], va = vr(), vt = vy, vs = ![]; while (vt) { if (vt['_$KD0zjB'] && vW in vt['_$KD0zjB']) throw new ReferenceError('Cannot\x20access\x20\x27' + vW + '\x27\x20before\x20initialization'); if (vt['_$UQQKD7'] && vW in vt['_$UQQKD7']) { if (vt['_$unVGdO'] && vW in vt['_$unVGdO']) { if (vO) throw new TypeError('Assignment\x20to\x20constant\x20variable.'); vs = !![]; break; } if (vt['_$pXrZwW'] && vW in vt['_$pXrZwW']) throw new TypeError('Assignment\x20to\x20constant\x20variable.'); vt['_$UQQKD7'][vW] = va, vs = !![]; break; } vt = vt['_$wbxkap']; } if (!vs) { if (vW in vmb_5c3957) vmb_5c3957[vW] = va; else vW in vmA ? vmA[vW] = va : vmA[vW] = va; } v3++; break; } }, function (vG) { while (!![]) { throw vr(); break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vmb_5c3957['_$HSYyzG'], vs = vt ? vmR(vt) : r(va), o0 = V(vs, vW), o1; if (o0['desc'] && o0['desc']['get']) o1 = o0['desc']['get']['call'](va), vc(o1); else { if (o0['desc'] && o0['desc']['set'] && !('value' in o0['desc'])) vc(undefined); else { o1 = o0['proto'] ? o0['proto'][vW] : vs[vW]; if (typeof o1 === 'function') { let o2 = o0['proto'] || vs, o3 = o1['bind'](va), o4 = o1['constructor'] && o1['constructor']['name'], o5 = o4 === 'GeneratorFunction' || o4 === 'AsyncFunction' || o4 === 'AsyncGeneratorFunction'; !o5 && (!vmb_5c3957['_$VUW6xB'] && (vmb_5c3957['_$VUW6xB'] = new WeakMap()), vmb_5c3957['_$VUW6xB']['set'](o3, o2)), vc(o3); } else vc(o1); } } v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(), vt = v4[vG], vs = c(va); vmq(vs, vt, { 'set': vW, 'enumerable': vs === va, 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { vc(-vr()), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = q(vr, vW), vt = vr(); if (vG === 0x1) { vc(va), v3++; break; } if (vmb_5c3957['_$bikybH']) { v3++; break; } let vs = vmb_5c3957['_$QTk2Bd']; if (vs) { let o0 = vs['parent'], o1 = vs['newTarget'], o2 = Reflect['construct'](o0, va, o1); s && s !== o2 && vmc(s)['forEach'](function (o3) { !(o3 in o2) && (o2[o3] = s[o3]); }); s = o2, vf = !![]; vU && (R(vy, '__this__'), vy['_$UQQKD7']['__this__'] = s); v3++; break; } if (typeof vt !== 'function') throw new TypeError('Super\x20expression\x20must\x20be\x20a\x20constructor'); vmb_5c3957['_$9LcLjl'] = t; try { let o3 = vt['apply'](s, va); o3 !== undefined && o3 !== s && typeof o3 === 'object' && (s && Object['assign'](o3, s), s = o3), vf = !![], vU && (R(vy, '__this__'), vy['_$UQQKD7']['__this__'] = s); } catch (o4) { if (o4 instanceof TypeError && (o4['message']['includes']('\x27new\x27') || o4['message']['includes']('constructor'))) { let o5 = Reflect['construct'](vt, va, t); o5 !== s && s && Object['assign'](o5, s), s = o5, vf = !![], vU && (R(vy, '__this__'), vy['_$UQQKD7']['__this__'] = s); } else throw o4; } finally { delete vmb_5c3957['_$9LcLjl']; } v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va >>> vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = q(vr, vW), vt = vr(); if (typeof vt !== 'function') throw new TypeError(vt + '\x20is\x20not\x20a\x20constructor'); if (x['has'](vt)) throw new TypeError(vt['name'] + '\x20is\x20not\x20a\x20constructor'); let vs = vmb_5c3957['_$HSYyzG']; vmb_5c3957['_$HSYyzG'] = undefined; let o0; try { o0 = Reflect['construct'](vt, va); } finally { vmb_5c3957['_$HSYyzG'] = vs; } vc(o0), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vV(); vW !== null && vW !== undefined && Object['assign'](va, vW); v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va % vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vr(); if (vt === null || vt === undefined) throw new TypeError('Cannot\x20set\x20property\x20\x27' + String(va) + '\x27\x20of\x20' + vt); z(vt, va, vW, vO), vc(vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va instanceof vW), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va - vW), v3++; break; } }, function (vG) { while (!![]) { return v1 > 0x0 ? vr() : undefined; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va >= vW), v3++; break; } }, function (vG) { while (!![]) { vc(vmx[vG]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = v4[vG], vt = J(), vs = 'get_' + va, o0 = vt['get'](vs); if (o0 && o0['has'](vW)) { let o4 = o0['get'](vW); vc(o4['call'](vW)), v3++; break; } let o1 = '_$v2AOtJ' + 'get_' + va['substring'](0x1) + '_$ry4u0B'; if (vW['constructor'] && o1 in vW['constructor']) { let o5 = vW['constructor'][o1]; vc(o5['call'](vW)), v3++; break; } let o2 = vt['get'](va); if (o2 && o2['has'](vW)) { vc(o2['get'](vW)), v3++; break; } let o3 = Z(va); if (o3 in vW) { vc(vW[o3]), v3++; break; } throw new TypeError('Cannot\x20read\x20private\x20member\x20' + va + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vr(); if (typeof va !== 'function') throw new TypeError(va + '\x20is\x20not\x20a\x20function'); let vs = vmb_5c3957['_$VUW6xB'], o0 = vs && vs['get'](va), o1 = vmb_5c3957['_$HSYyzG']; o0 && (vmb_5c3957['_$Sg7Wec'] = !![], vmb_5c3957['_$HSYyzG'] = o0); try { let o2 = va['apply'](vt, q(vr, vW)); vc(o2); } finally { o0 && (vmb_5c3957['_$Sg7Wec'] = ![], vmb_5c3957['_$HSYyzG'] = o1); } v3++; break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >>> 0x10; vc(v2[vW] * v4[va]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = { 'value': vW }; A['add'](va), vc(va), v3++; break; } }, function (vG) { while (!![]) { let vW = vJ(v6[v3]); if (vo['length'] > 0x0) { let va = vo[vo['length'] - 0x1]; if (va['_$ACRL5d'] !== undefined && vW >= va['_$eliJSn']) { vH['_$AETnwi'] = !![], vH['_$gl2Ob0'] = vW, v3 = va['_$ACRL5d']; break; } } v3 = vW; break; } }, function (vG) { while (!![]) { if (vo['length'] > 0x0) { let vW = vo[vo['length'] - 0x1]; vW['_$ACRL5d'] === v3 && (vW['_$PEh7f9'] !== undefined && (vu = vW['_$PEh7f9']), vo['pop']()); } v3++; break; } }, function (vG) { while (!![]) { v2[vG] = vr(), v3++; break; } }, function (vG) { while (!![]) { let vW = vG & 0xffff, va = vG >>> 0x10; vc(v2[vW] < v4[va]), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vV(), vs = c(vt); vmq(vs, va, { 'set': vW, 'enumerable': vs === vt, 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(), vt = vV(); vmq(vt, va, { 'set': vW, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (vG) { while (!![]) { let vW = vr(), va = vr(); vc(va << vW), v3++; break; } }]; vO = vn, vg = vS, vE = vj, vU = vb, vf = vL, vP = vA, vM = vQ, vy = vX, vw[vF[vi]](vh), vX = vy, vL = vf; if (vd) return vd = ![], vY; } break; } catch (vG) { if (vo['length'] > 0x0) { let vW = vo[vo['length'] - 0x1]; v1 = vW['_$mKZhIl']; if (vW['_$rap1ZX'] !== undefined) vc(vG), v3 = vW['_$rap1ZX'], vW['_$rap1ZX'] = undefined, vW['_$ACRL5d'] === undefined && vo['pop'](); else vW['_$ACRL5d'] !== undefined ? (v3 = vW['_$ACRL5d'], vW['_$PEh7f9'] = vG) : (v3 = vW['_$eliJSn'], vo['pop']()); continue; } throw vG; } } return v1 > 0x0 ? vr() : vL ? s : undefined; } function* M(h, G, W, a, t, s) { let v0 = [], v1 = 0x0, v2 = new Array((h['p'] || 0x0) + (h['l'] || 0x0)), v3 = 0x0, v4 = h['c'], v5 = h['i'], v6 = h['j'] || {}, v7 = h['x'] || {}, v8 = v5['length'] >> 0x1, v9 = vK => vK << 0x1, vv = vK => (vK << 0x1) + 0x1, vo = [], vu = null, vm = { ['_$wuXEBW']: ![], ['_$AIWPOp']: undefined }, vp = { ['_$1jfZqV']: ![], ['_$5Acr92']: 0x0 }, vH = { ['_$AETnwi']: ![], ['_$gl2Ob0']: 0x0 }, vB = h['o'] || u, vn = !!h['st'], vS = !!h['sp'], vj = !!h['dc'], vb = !!h['nte'], vA = s, vx = !!h['a']; !vn && !vx && (s === undefined || s === null) && (s = vmA); var vk = 0x0, vq = null, vl = null; let vI = h['seKey'], vc, vr, vV, vR, vD, vz; if (vI !== undefined) { let vK = vN => typeof vN === 'number' && Number['isFinite'](vN) && Number['isInteger'](vN) && vN >= -0x80000000 && vN <= 0x7fffffff && !Object['is'](vN, -0x0) ? vN ^ vI | 0x0 : vN; vc = vN => { v0[v1++] = vK(vN); }, vr = () => vK(v0[--v1]), vV = () => vK(v0[v1 - 0x1]), vR = vN => { v0[v1 - 0x1] = vK(vN); }, vD = vN => vK(v0[v1 - vN]), vz = (vN, vT) => { v0[v1 - vN] = vK(vT); }; } else vc = vN => { v0[v1++] = vN; }, vr = () => v0[--v1], vV = () => v0[v1 - 0x1], vR = vN => { v0[v1 - 0x1] = vN; }, vD = vN => v0[v1 - vN], vz = (vN, vT) => { v0[v1 - vN] = vT; }; let vJ = vN => vN, vX = { ['_$wbxkap']: W, ['_$UQQKD7']: vml(null) }; if (G) for (let vN = 0x0; vN < Math['min'](G['length'], h['p'] || 0x0); vN++) { v2[vN] = G[vN]; } let vQ = vn && G ? I(G) : null, vZ = null, vL = ![]; vb && (!vX['_$KD0zjB'] && (vX['_$KD0zjB'] = vml(null)), vX['_$KD0zjB']['__this__'] = !![]); Q(h, vX, a); while (v3 < v8) { try { while (v3 < v8) { let vT = v5[v9(v3)], vi = vT, ve = vB[vi], vC = v5[vv(v3)], vh = vC === null ? undefined : vC; if (vi === b) { let vG = vr(), vW = yield { ['_$CO0V9A']: p, ['_$Mj9zDU']: vG }; vc(vW), v3++; continue; } if (vi === S) { let va = vr(), vt = yield { ['_$CO0V9A']: H, ['_$Mj9zDU']: va }; if (vt && typeof vt === 'object' && vt['_$CO0V9A'] === n) { let vs = vt['_$Mj9zDU']; if (vo['length'] > 0x0) { let o0 = vo[vo['length'] - 0x1]; if (o0['_$ACRL5d'] !== undefined) { vm['_$wuXEBW'] = !![], vm['_$AIWPOp'] = vs, v3 = o0['_$ACRL5d']; continue; } } return vs; } vc(vt), v3++; continue; } if (vi === j) { let o1 = vr(), o2 = yield { ['_$CO0V9A']: B, ['_$Mj9zDU']: o1 }; vc(o2), v3++; continue; } if (typeof vw === 'undefined') var vd = ![], vY, vO = ![], vg = ![], vE = ![], vU = ![], vf = ![], vP = undefined, vM = null, vy = null, vF = { 0x0: 0x74, 0x1: 0xc, 0x2: 0x21, 0x3: 0x71, 0x4: 0x46, 0x5: 0x22, 0x6: 0x64, 0x7: 0x61, 0x8: 0x45, 0x9: 0x6b, 0xa: 0xa, 0xb: 0x85, 0xc: 0xd, 0xd: 0x44, 0xe: 0x82, 0xf: 0x7d, 0x10: 0x7, 0x11: 0x54, 0x12: 0x5, 0x13: 0xf, 0x14: 0x3c, 0x15: 0x23, 0x16: 0x70, 0x17: 0x5e, 0x18: 0x93, 0x19: 0x1d, 0x1a: 0x7f, 0x1b: 0x78, 0x1c: 0x4e, 0x20: 0xb, 0x28: 0x25, 0x29: 0x6a, 0x2a: 0x76, 0x2b: 0x5c, 0x2c: 0x3b, 0x2d: 0x28, 0x2e: 0x49, 0x2f: 0x87, 0x32: 0x30, 0x33: 0x4c, 0x34: 0x3a, 0x35: 0x63, 0x36: 0x3, 0x37: 0x8a, 0x38: 0x2f, 0x39: 0x7a, 0x3a: 0x1f, 0x3b: 0x19, 0x3c: 0x42, 0x3d: 0x8e, 0x3e: 0x75, 0x3f: 0x50, 0x40: 0x8d, 0x46: 0x32, 0x47: 0x11, 0x48: 0x4a, 0x49: 0x83, 0x4a: 0x51, 0x4b: 0x2b, 0x4c: 0x8, 0x4d: 0x57, 0x4e: 0x48, 0x4f: 0x17, 0x51: 0x81, 0x52: 0x55, 0x53: 0x24, 0x54: 0x66, 0x5a: 0x77, 0x5b: 0x1e, 0x5d: 0x8c, 0x5e: 0x26, 0x5f: 0x67, 0x64: 0x4b, 0x68: 0x80, 0x69: 0x7e, 0x6a: 0x33, 0x6e: 0x13, 0x6f: 0x84, 0x70: 0x14, 0x7b: 0x18, 0x7c: 0x36, 0x7f: 0x5a, 0x80: 0x43, 0x81: 0x5d, 0x82: 0x10, 0x83: 0x3e, 0x84: 0x73, 0x8c: 0x40, 0x8d: 0x41, 0x8e: 0x7b, 0x8f: 0x4, 0x90: 0x68, 0x91: 0x15, 0x92: 0x7c, 0x93: 0x27, 0x94: 0x1, 0x95: 0x6e, 0x96: 0x89, 0x97: 0x58, 0x98: 0x1b, 0x99: 0x62, 0x9a: 0x2c, 0x9b: 0x0, 0x9c: 0x47, 0x9d: 0x72, 0x9e: 0x29, 0xa0: 0x34, 0xa1: 0x39, 0xa2: 0x9, 0xa3: 0x6, 0xa4: 0x1c, 0xa5: 0x88, 0xa6: 0x3f, 0xa7: 0x2, 0xa8: 0x37, 0xa9: 0x5f, 0xb4: 0x56, 0xb5: 0x69, 0xb6: 0x6c, 0xb7: 0x91, 0xb8: 0x6d, 0xb9: 0x92, 0xc8: 0x59, 0xc9: 0x2d, 0xca: 0x86, 0xd2: 0x35, 0xd3: 0x16, 0xd4: 0x79, 0xd5: 0x3d, 0xd6: 0x38, 0xd7: 0xe, 0xd8: 0x5b, 0xd9: 0x52, 0xda: 0x12, 0xdb: 0x65, 0xdc: 0x60, 0xfa: 0x6f, 0xfb: 0x4d, 0xfc: 0x4f, 0xfd: 0x53, 0xfe: 0x8b, 0xff: 0x2e, 0x100: 0x90, 0x101: 0x2a, 0x102: 0x20, 0x103: 0x8f, 0x104: 0x1a, 0x105: 0x31 }, vw = [function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3]; if (o4 == null) { vc(undefined), v3++; break; } let o6 = J(), o7 = o6['get'](o5); if (!o7 || !o7['has'](o4)) throw new TypeError('Cannot\x20read\x20private\x20member\x20' + o5 + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); vc(o7['get'](o4)), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(), o6 = v4[o3]; vmq(o5, o6, { 'get': o4, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { if (o3 === -0x1) vc(Symbol()); else { let o4 = vr(); vc(Symbol(o4)); } v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vmb_5c3957['_$HSYyzG']; vmb_5c3957['_$HSYyzG'] = undefined; try { let o7 = o5['apply'](undefined, q(vr, o4)); vc(o7); } finally { vmb_5c3957['_$HSYyzG'] = o6; } v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vr(), o7 = r(o6), o8 = V(o7, o5); o8['desc'] && o8['desc']['set'] ? o8['desc']['set']['call'](o6, o4) : o6[o5] = o4; vc(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 ** o4), v3++; break; } }, function (o3) { while (!![]) { vr(), vc(undefined), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(typeof o4 === 'bigint' ? o4 + 0x1n : +o4 + 0x1), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3]; if (vmb_5c3957['_$5L5rWq'] && o5 in vmb_5c3957['_$5L5rWq']) throw new ReferenceError('Cannot\x20access\x20\x27' + o5 + '\x27\x20before\x20initialization'); let o6 = !(o5 in vmb_5c3957) && !(o5 in vmA); vmb_5c3957[o5] = o4; o5 in vmA && (vmA[o5] = o4); o6 && (vmA[o5] = o4); vc(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >> 0x10, o6 = v4[o4], o7 = v4[o5]; vc(new RegExp(o6, o7)), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 + o4), v3++; break; } }, function (o3) { while (!![]) { vc(!vr()), v3++; break; } }, function (o3) { while (!![]) { vc(undefined), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 * o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3], o5 = vr(); R(vy, o4), vy['_$UQQKD7'][o4] = o5, v3++; break; } }, function (o3) { while (!![]) { vc(+vr()), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = o4['next'](); vc(Promise['resolve'](o5)), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = v4[o3]; if (o5 === null || o5 === undefined) throw new TypeError('Cannot\x20set\x20property\x20\x27' + String(o6) + '\x27\x20of\x20' + o5); z(o5, o6, o4, vO), vc(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3]; !vy['_$KD0zjB'] && (vy['_$KD0zjB'] = {}); vy['_$KD0zjB'][o4] = !![], v3++; break; } }, function (o3) { while (!![]) { vc(typeof vr()), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3]; o4 in vmb_5c3957 ? vc(typeof vmb_5c3957[o4]) : vc(typeof vmA[o4]); v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(), o6 = v4[o3], o7 = c(o5); vmq(o7, o6, { 'get': o4, 'enumerable': o7 === o5, 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3]; if (o4 === '__this__') { let ov = vy; while (ov) { if (ov['_$KD0zjB'] && '__this__' in ov['_$KD0zjB']) throw new ReferenceError('Cannot\x20access\x20\x27__this__\x27\x20before\x20initialization'); if (ov['_$UQQKD7'] && '__this__' in ov['_$UQQKD7']) break; ov = ov['_$wbxkap']; } vc(s), v3++; break; } let o5 = vy, o6, o7 = ![], o8 = o4['indexOf']('$$'), o9 = o8 !== -0x1 ? o4['substring'](0x0, o8) : null; while (o5) { if (o5['_$KD0zjB'] && o4 in o5['_$KD0zjB']) throw new ReferenceError('Cannot\x20access\x20\x27' + o4 + '\x27\x20before\x20initialization'); if (o9 && o5['_$KD0zjB'] && o9 in o5['_$KD0zjB']) { if (!(o5['_$UQQKD7'] && o4 in o5['_$UQQKD7'])) throw new ReferenceError('Cannot\x20access\x20\x27' + o9 + '\x27\x20before\x20initialization'); } if (o5['_$UQQKD7'] && o4 in o5['_$UQQKD7']) { o6 = o5['_$UQQKD7'][o4], o7 = !![]; break; } o5 = o5['_$wbxkap']; } !o7 && (o4 in vmb_5c3957 ? o6 = vmb_5c3957[o4] : o6 = vmA[o4]); vc(o6), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 in o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = o4['next'](); vc(o5), v3++; break; } }, function (o3) { while (!![]) { vo['pop'](), v3++; break; } }, function (o3) { while (!![]) { let o4 = v2[o3] + 0x1; v2[o3] = o4, vc(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = v4[o3], o7 = J(); !o7['has'](o6) && o7['set'](o6, new WeakMap()); let o8 = o7['get'](o6); if (o8['has'](o5)) throw new TypeError('Cannot\x20initialize\x20' + o6 + '\x20twice\x20on\x20the\x20same\x20object'); o8['set'](o5, o4), v3++; break; } }, function (o3) { while (!![]) { vc(t), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 >> o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(); o5['push'](o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = v7[v3]; vo['push']({ ['_$rap1ZX']: o4[0x0] >= 0x0 ? vJ(o4[0x0]) : undefined, ['_$ACRL5d']: o4[0x1] >= 0x0 ? vJ(o4[0x1]) : undefined, ['_$eliJSn']: o4[0x2] >= 0x0 ? vJ(o4[0x2]) : undefined, ['_$mKZhIl']: v1 }), v3++; break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >>> 0x10, o6 = vr(), o7 = q(vr, o6), o8 = v2[o4], o9 = v4[o5], ov = o8[o9]; vc(ov['apply'](o8, o7)), v3++; break; } }, function (o3) { while (!![]) { vc(null), v3++; break; } }, function (o3) { while (!![]) { let o4 = vV(); vR(vD(0x2)), vz(0x2, o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 | o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = v4[o3]; vmq(o5, o6, { 'value': o4, 'writable': !![], 'enumerable': !![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 == o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(); if (Array['isArray'](o4)) Array['prototype']['push']['apply'](o5, o4); else for (let o6 of o4) { o5['push'](o6); } v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(), o6 = v4[o3]; vmq(o5, o6, { 'value': o4, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 <= o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = v4[o3], o7 = X(); if (o7) { let o9 = 'set_' + o6, ov = o7['get'](o9); if (ov && ov['has'](o5)) { let ou = ov['get'](o5); ou['call'](o5, o4), vc(o4), v3++; break; } let oo = o7['get'](o6); if (oo && oo['has'](o5)) { oo['set'](o5, o4), vc(o4), v3++; break; } } let o8 = Z(o6); if (o8 in o5) { o5[o8] = o4, vc(o4), v3++; break; } throw new TypeError('Cannot\x20write\x20private\x20member\x20' + o6 + '\x20to\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >>> 0x10; v2[o4] < v4[o5] ? v3 = vJ(v6[v3]) : v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3], o5; if (vmb_5c3957['_$5L5rWq'] && o4 in vmb_5c3957['_$5L5rWq']) throw new ReferenceError('Cannot\x20access\x20\x27' + o4 + '\x27\x20before\x20initialization'); if (o4 in vmb_5c3957) o5 = vmb_5c3957[o4]; else { if (o4 in vmA) o5 = vmA[o4]; else throw new ReferenceError(o4 + '\x20is\x20not\x20defined'); } vc(o5), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = v4[o3], o7 = null, o8 = X(); if (o8) { let oo = o8['get'](o6); oo && oo['has'](o5) && (o7 = oo['get'](o5)); } if (o7 === null) { let ou = L(o6); ou in o5 && (o7 = o5[ou]); } if (o7 === null) throw new TypeError('Cannot\x20read\x20private\x20member\x20' + o6 + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); if (typeof o7 !== 'function') throw new TypeError(o6 + '\x20is\x20not\x20a\x20function'); let o9 = q(vr, o4), ov = o7['apply'](o5, o9); vc(ov), v3++; break; } }, function (o3) { while (!![]) { v3++; break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >>> 0x10, o6 = v2[o4], o7 = v4[o5]; vc(o6[o7]), v3++; break; } }, function (o3) { while (!![]) { if (vo['length'] > 0x0) { let o4 = vo[vo['length'] - 0x1]; if (o4['_$ACRL5d'] !== undefined) { vm['_$wuXEBW'] = !![], vm['_$AIWPOp'] = vr(), v3 = o4['_$ACRL5d']; break; } } vm['_$wuXEBW'] && (vm['_$wuXEBW'] = ![], vm['_$AIWPOp'] = undefined); vd = !![], vY = vr(); return; break; } }, function (o3) { while (!![]) { v3 = vJ(v6[v3]); break; } }, function (o3) { while (!![]) { let o4 = v2[o3] - 0x1; v2[o3] = o4, vc(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3]; if (o4 === null || o4 === undefined) throw new TypeError('Cannot\x20read\x20property\x20\x27' + String(o5) + '\x27\x20of\x20' + o4); vc(o4[o5]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(import(o4)), v3++; break; } }, function (o3) { while (!![]) { if (vE && !vf) throw new ReferenceError('Must\x20call\x20super\x20constructor\x20in\x20derived\x20class\x20before\x20accessing\x20\x27this\x27\x20or\x20returning\x20from\x20derived\x20constructor'); vc(s), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = { ['_$UQQKD7']: vml(null), ['_$pXrZwW']: vml(null), ['_$KD0zjB']: vml(null), ['_$wbxkap']: o4 }; vy = o5, v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); o4 && typeof o4['return'] === 'function' && o4['return'](); v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3]; vc(Symbol['for'](o4)), v3++; break; } }, function (o3) { while (!![]) { vy && vy['_$wbxkap'] && (vy = vy['_$wbxkap']); v3++; break; } }, function (o3) { while (!![]) { if (vZ === null) { if (vO || !vg) { vZ = []; let o4 = vM || G; if (o4) for (let o5 = 0x0; o5 < o4['length']; o5++) { vZ[o5] = o4[o5]; } if (vO) { let o6 = function () { throw new TypeError('\x27caller\x27,\x20\x27callee\x27,\x20and\x20\x27arguments\x27\x20properties\x20may\x20not\x20be\x20accessed\x20on\x20strict\x20mode\x20functions\x20or\x20the\x20arguments\x20objects\x20for\x20calls\x20to\x20them'); }; vmq(vZ, 'callee', { 'get': o6, 'set': o6, 'enumerable': ![], 'configurable': ![] }); } else vmq(vZ, 'callee', { 'value': a, 'writable': !![], 'enumerable': ![], 'configurable': !![] }); } else { let o7 = G ? G['length'] : 0x0, o8 = {}, o9 = function (om) { return typeof om === 'string' ? parseInt(om, 0xa) : NaN; }, ov = function (om) { return !isNaN(om) && om >= 0x0; }, oo = function (om) { return om < G['length'] ? G[om] : o8[om]; }, ou = function (om) { return om < G['length'] ? om in G : om in o8; }; vZ = new Proxy([], { 'get': function (om, oH, oB) { if (oH === 'length') return o7; if (oH === 'callee') return a; if (oH === Symbol['iterator']) return function () { let oj = 0x0; return { 'next': function () { if (oj < o7) return { 'value': oo(oj++), 'done': ![] }; return { 'done': !![] }; } }; }; let on = o9(oH); if (ov(on)) return oo(on); if (oH === 'hasOwnProperty') return function (oj) { if (oj === 'length' || oj === 'callee') return !![]; let ob = o9(oj); return ov(ob) && ob < o7 && ou(ob); }; let oS = Array['prototype'][oH]; if (typeof oS === 'function') return function () { let oj = []; for (let ob = 0x0; ob < o7; ob++)oj[ob] = oo(ob); return oS['apply'](oj, arguments); }; return undefined; }, 'set': function (om, oH, oB) { if (oH === 'length') return o7 = oB, !![]; let on = o9(oH); if (ov(on)) { if (on < G['length']) G[on] = oB; else o8[on] = oB; if (on >= o7) o7 = on + 0x1; return !![]; } return !![]; }, 'has': function (om, oH) { if (oH === 'length' || oH === 'callee') return !![]; let oB = o9(oH); if (ov(oB) && oB < o7) return ou(oB); return oH in Array['prototype']; }, 'deleteProperty': function (om, oH) { let oB = o9(oH); if (ov(oB)) { if (oB < G['length']) delete G[oB]; else delete o8[oB]; } return !![]; }, 'getOwnPropertyDescriptor': function (om, oH) { if (oH === 'callee') return { 'value': a, 'writable': !![], 'enumerable': ![], 'configurable': !![] }; if (oH === 'length') return { 'value': o7, 'writable': !![], 'enumerable': ![], 'configurable': !![] }; let oB = o9(oH); if (ov(oB) && oB < o7 && ou(oB)) return { 'value': oo(oB), 'writable': !![], 'enumerable': !![], 'configurable': !![] }; return undefined; }, 'ownKeys': function (om) { let oH = []; for (let oB = 0x0; oB < o7; oB++)if (ou(oB)) oH['push'](String(oB)); return oH['push']('length', 'callee'), oH; } }); } } vc(vZ), v3++; break; } }, function (o3) { while (!![]) { !vr() ? v3 = vJ(v6[v3]) : v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 < o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 & o4), v3++; break; } }, function (o3) { while (!![]) { vc(vy), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); o4 && typeof o4['return'] === 'function' ? vc(Promise['resolve'](o4['return']())) : vc(Promise['resolve']()); v3++; break; } }, function (o3) { while (!![]) { vc(vmk[o3]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = o3, o7 = function (o8, o9) { let ov = function () { if (o8) { o9 && (vmb_5c3957['_$Pz6Ieh'] = ov); let oo = '_$9LcLjl' in vmb_5c3957; !oo && (vmb_5c3957['_$9LcLjl'] = new.target); try { return o8['apply'](this, I(arguments)); } finally { o9 && delete vmb_5c3957['_$Pz6Ieh'], !oo && delete vmb_5c3957['_$9LcLjl']; } } }; return ov; }(o5, o6); o4 && vmq(o7, 'name', { 'value': o4, 'configurable': !![] }); vc(o7), v3++; break; } }, function (o3) { while (!![]) { let o5 = vr(), o6 = vV(); if (o5 === null) { vmV(o6['prototype'], null), vmV(o6, Function['prototype']), o6['_$GOO4LC'] = null, v3++; break; } let o7 = ![]; try { let o8 = vml(o5['prototype']), o9 = o5['apply'](o8, []); o9 !== undefined && o9 !== o8 && (o7 = !![]); } catch (ov) { ov instanceof TypeError && (ov['message']['includes']('\x27new\x27') || ov['message']['includes']('constructor') || ov['message']['includes']('Illegal\x20constructor')) && (o7 = !![]); } if (o7) { let oo = o6, ou = vmb_5c3957, om = '_$9LcLjl', oH = '_$Pz6Ieh', oB = '_$QTk2Bd'; function o4(...on) { let oS = vml(o5['prototype']); ou[oB] = { 'parent': o5, 'newTarget': new.target || o4 }, ou[oH] = new.target || o4; let oj = om in ou; if (!oj) ou[om] = new.target; try { let ob = oo['apply'](oS, on); ob !== undefined && typeof ob === 'object' && (oS = ob); } finally { delete ou[oB], delete ou[oH]; if (!oj) delete ou[om]; } return oS; } o4['prototype'] = vml(o5['prototype']), o4['prototype']['constructor'] = o4, vmV(o4, o5), vmc(oo)['forEach'](function (on) { on !== 'prototype' && on !== 'length' && on !== 'name' && k(o4, on, vmI(oo, on)); }); oo['prototype'] && (vmc(oo['prototype'])['forEach'](function (on) { on !== 'constructor' && k(o4['prototype'], on, vmI(oo['prototype'], on)); }), vmr(oo['prototype'])['forEach'](function (on) { k(o4['prototype'], on, vmI(oo['prototype'], on)); })); vr(), vc(o4), o4['_$GOO4LC'] = o5, v3++; break; } vmV(o6['prototype'], o5['prototype']), vmV(o6, o5), o6['_$GOO4LC'] = o5, v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); if (o3 >= 0x0) { let o5 = v4[o3]; vy['_$UQQKD7'][o5] = o4; } v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(!!o4['done']), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 / o4), v3++; break; } }, function (o3) { while (!![]) { vc(G[o3]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(o4), vc(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vr(); let o5 = vV(), o6 = v4[o3], o7 = J(); !o7['has'](o6) && o7['set'](o6, new WeakMap()); let o8 = o7['get'](o6); o8['set'](o5, o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3]; o4 === null || o4 === undefined ? vc(undefined) : vc(o4[o5]); v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 > o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); if (o5 === null || o5 === undefined) throw new TypeError('Cannot\x20read\x20property\x20\x27' + String(o4) + '\x27\x20of\x20' + o5); vc(o5[o4]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = o(o4), o6 = o5 && o5['a'], o7 = o5 && o5['s'], o8 = o5 && o5['g'], o9 = o5 && o5['m'], ov = vy, oo = o5 && o5['ni'] !== undefined ? o5['c'][o5['ni']] : undefined, ou = o5 && o5['p'] || 0x0, om = o5 && o5['st'], oH = o6 ? vP : undefined, oB, on = om ? function (oS) { return oS === vmA ? [undefined, ![]] : [m, !![]]; } : function (oS) { return [m, !![]]; }; if (o8) oB = function oS() { let oj = I(arguments), [ob, oA] = on(this); if (oA) return w['call'](this, o4, oj, ov, oB, undefined, ob); return w(o4, oj, ov, oB, undefined, ob); }, x['add'](oB); else { if (o7) { if (o6) oB = { 'yQyQFa': async (...oj) => { return await F(o4, oj, ov, oB, undefined, undefined, oH); } }['yQyQFa']; else o9 ? oB = { async 'yQyQFa'() { let oj = I(arguments), ob = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [oA, ox] = on(this); if (ox) return await F['call'](this, o4, oj, ov, oB, ob, undefined, oA); return await F(o4, oj, ov, oB, ob, undefined, oA); } }['yQyQFa'] : oB = async function oj() { let ob = I(arguments), oA = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [ox, ok] = on(this); if (ok) return await F['call'](this, o4, ob, ov, oB, oA, undefined, ox); return await F(o4, ob, ov, oB, oA, undefined, ox); }; } else { if (o6) oB = { 'yQyQFa': (...ob) => { return y(o4, ob, ov, oB, undefined, oH); } }['yQyQFa']; else o9 ? oB = { 'yQyQFa'() { let ob = I(arguments), oA = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [ox, ok] = on(this); if (ok) return y['call'](this, o4, ob, ov, oB, oA, ox); return y(o4, ob, ov, oB, oA, ox); } }['yQyQFa'] : oB = function ob() { let oA = I(arguments), ox = new.target !== undefined ? new.target : vmb_5c3957['_$9LcLjl'], [ok, oq] = on(this); if (oq) return y['call'](this, o4, oA, ov, oB, ox, ok); return y(o4, oA, ov, oB, ox, ok); }; } } k(oB, 'length', { 'value': ou, 'writable': ![], 'enumerable': ![], 'configurable': !![] }), vc(oB), v3++; break; } }, function (o3) { while (!![]) { vr() ? v3 = vJ(v6[v3]) : v3++; break; } }, function (o3) { while (!![]) { v2[o3] = v2[o3] - 0x1, v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(typeof o4 === 'bigint' ? o4 : +o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >>> 0x10; vc(v2[o4] + v4[o5]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vJ(v6[v3]); if (vo['length'] > 0x0) { let o5 = vo[vo['length'] - 0x1]; if (o5['_$ACRL5d'] !== undefined && o4 >= o5['_$eliJSn']) { vp['_$1jfZqV'] = !![], vp['_$5Acr92'] = o4, v3 = o5['_$ACRL5d']; break; } } v3 = o4; break; } }, function (o3) { while (!![]) { let o4, o5; o3 !== undefined ? (o5 = vr(), o4 = v4[o3]) : (o4 = vr(), o5 = vr()); let o6 = delete o5[o4]; if (vO && !o6) throw new TypeError('Cannot\x20delete\x20property\x20\x27' + String(o4) + '\x27\x20of\x20object'); vc(o6), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3], o5 = vr(); R(vy, o4), vy['_$UQQKD7'][o4] = o5; !vy['_$pXrZwW'] && (vy['_$pXrZwW'] = {}); vy['_$pXrZwW'][o4] = !![], v3++; break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >>> 0x10; vc(v2[o4] - v4[o5]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(typeof o4 === 'bigint' ? o4 - 0x1n : +o4 - 0x1), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); o5 === null || o5 === undefined ? vc(undefined) : vc(o5[o4]); v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vV(); vmq(o6['prototype'], o5, { 'value': o4, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { vc({}), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = v4[o3], o7 = J(), o8 = 'set_' + o6, o9 = o7['get'](o8); if (o9 && o9['has'](o5)) { let om = o9['get'](o5); om['call'](o5, o4), vc(o4), v3++; break; } let ov = '_$v2AOtJ' + 'set_' + o6['substring'](0x1) + '_$ry4u0B'; if (o5['constructor'] && ov in o5['constructor']) { let oH = o5['constructor'][ov]; oH['call'](o5, o4), vc(o4), v3++; break; } let oo = o7['get'](o6); if (oo && oo['has'](o5)) { oo['set'](o5, o4), vc(o4), v3++; break; } let ou = Z(o6); if (ou in o5) { o5[ou] = o4, vc(o4), v3++; break; } throw new TypeError('Cannot\x20write\x20private\x20member\x20' + o6 + '\x20to\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (o3) { while (!![]) { debugger; v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); if (o4 == null) throw new TypeError('Cannot\x20iterate\x20over\x20' + o4); let o5 = o4[Symbol['iterator']]; if (typeof o5 !== 'function') throw new TypeError('Object\x20is\x20not\x20iterable'); vc(o5['call'](o4)), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3], o5 = vr(), o6 = vy, o7 = ![]; while (o6) { if (o6['_$UQQKD7'] && o4 in o6['_$UQQKD7']) { if (o6['_$pXrZwW'] && o4 in o6['_$pXrZwW']) break; o6['_$UQQKD7'][o4] = o5; !o6['_$pXrZwW'] && (o6['_$pXrZwW'] = {}); o6['_$pXrZwW'][o4] = !![], o7 = !![]; break; } o6 = o6['_$wbxkap']; } !o7 && (D(vy, o4), vy['_$UQQKD7'][o4] = o5, !vy['_$pXrZwW'] && (vy['_$pXrZwW'] = {}), vy['_$pXrZwW'][o4] = !![]); v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 !== o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); if (o4 == null) throw new TypeError('Cannot\x20iterate\x20over\x20' + o4); let o5 = o4[Symbol['asyncIterator']]; if (typeof o5 === 'function') vc(o5['call'](o4)); else { let o6 = o4[Symbol['iterator']]; if (typeof o6 !== 'function') throw new TypeError('Object\x20is\x20not\x20async\x20iterable'); vc(o6['call'](o4)); } v3++; break; } }, function (o3) { while (!![]) { vc(~vr()), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(Symbol['keyFor'](o4)), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3]; if (vO && !(o5 in vmA) && !(o5 in vmb_5c3957)) throw new ReferenceError(o5 + '\x20is\x20not\x20defined'); vmb_5c3957[o5] = o4, vmA[o5] = o4, vc(o4), v3++; break; } }, function (o3) { while (!![]) { v2[o3] = vr(), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3], o6 = ![], o7 = X(); if (o7) { let o8 = o7['get'](o5); o6 = o8 && o8['has'](o4); } vc(o6), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(); o4 !== null && o4 !== undefined ? v3 = vJ(v6[v3]) : v3++; break; } }, function (o3) { while (!![]) { vc(v2[o3]), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3], o5 = vr(), o6 = vy['_$wbxkap']; o6 && (o6['_$UQQKD7'][o4] = o5); v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vr(); vmq(o6, o5, { 'value': o4, 'writable': !![], 'enumerable': !![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vV(); o4['length']++, v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(), o6 = v4[o3]; vmq(o5['prototype'], o6, { 'value': o4, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vV(); vmq(o6, o5, { 'value': o4, 'writable': !![], 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 != o4), v3++; break; } }, function (o3) { while (!![]) { G[o3] = vr(), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vV(), o7 = c(o6); vmq(o7, o5, { 'get': o4, 'enumerable': o7 === o6, 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vV(); vmq(o6, o5, { 'get': o4, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(), o6 = v4[o3]; vmq(o5, o6, { 'set': o4, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { v2[o3] = v2[o3] + 0x1, v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 ^ o4), v3++; break; } }, function (o3) { while (!![]) { vr(), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3], o6 = X(); if (o6) { let o8 = 'get_' + o5, o9 = o6['get'](o8); if (o9 && o9['has'](o4)) { let oo = o9['get'](o4); vc(oo['call'](o4)), v3++; break; } let ov = o6['get'](o5); if (ov && ov['has'](o4)) { vc(ov['get'](o4)), v3++; break; } } let o7 = Z(o5); if (o7 in o4) { vc(o4[o7]), v3++; break; } throw new TypeError('Cannot\x20read\x20private\x20member\x20' + o5 + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (o3) { while (!![]) { let o4 = vr(); vc(l(o4)), v3++; break; } }, function (o3) { while (!![]) { vc(v4[o3]), v3++; break; } }, function (o3) { while (!![]) { if (vm['_$wuXEBW']) { let o4 = vm['_$AIWPOp']; vm['_$wuXEBW'] = ![], vm['_$AIWPOp'] = undefined, vd = !![], vY = o4; return; } if (vp['_$1jfZqV']) { let o5 = vp['_$5Acr92']; vp['_$1jfZqV'] = ![], vp['_$5Acr92'] = 0x0, v3 = o5; break; } if (vH['_$AETnwi']) { let o6 = vH['_$gl2Ob0']; vH['_$AETnwi'] = ![], vH['_$gl2Ob0'] = 0x0, v3 = o6; break; } if (vu !== null) { let o7 = vu; vu = null; throw o7; } v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 === o4), v3++; break; } }, function (o3) { while (!![]) { vc([]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vD(0x3), o5 = vD(0x2), o6 = vV(); vz(0x3, o5), vz(0x2, o6), vR(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = v4[o3], o5 = vr(), o6 = vy, o7 = ![]; while (o6) { if (o6['_$KD0zjB'] && o4 in o6['_$KD0zjB']) throw new ReferenceError('Cannot\x20access\x20\x27' + o4 + '\x27\x20before\x20initialization'); if (o6['_$UQQKD7'] && o4 in o6['_$UQQKD7']) { if (o6['_$unVGdO'] && o4 in o6['_$unVGdO']) { if (vO) throw new TypeError('Assignment\x20to\x20constant\x20variable.'); o7 = !![]; break; } if (o6['_$pXrZwW'] && o4 in o6['_$pXrZwW']) throw new TypeError('Assignment\x20to\x20constant\x20variable.'); o6['_$UQQKD7'][o4] = o5, o7 = !![]; break; } o6 = o6['_$wbxkap']; } if (!o7) { if (o4 in vmb_5c3957) vmb_5c3957[o4] = o5; else o4 in vmA ? vmA[o4] = o5 : vmA[o4] = o5; } v3++; break; } }, function (o3) { while (!![]) { throw vr(); break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vmb_5c3957['_$HSYyzG'], o7 = o6 ? vmR(o6) : r(o5), o8 = V(o7, o4), o9; if (o8['desc'] && o8['desc']['get']) o9 = o8['desc']['get']['call'](o5), vc(o9); else { if (o8['desc'] && o8['desc']['set'] && !('value' in o8['desc'])) vc(undefined); else { o9 = o8['proto'] ? o8['proto'][o4] : o7[o4]; if (typeof o9 === 'function') { let ov = o8['proto'] || o7, oo = o9['bind'](o5), ou = o9['constructor'] && o9['constructor']['name'], om = ou === 'GeneratorFunction' || ou === 'AsyncFunction' || ou === 'AsyncGeneratorFunction'; !om && (!vmb_5c3957['_$VUW6xB'] && (vmb_5c3957['_$VUW6xB'] = new WeakMap()), vmb_5c3957['_$VUW6xB']['set'](oo, ov)), vc(oo); } else vc(o9); } } v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(), o6 = v4[o3], o7 = c(o5); vmq(o7, o6, { 'set': o4, 'enumerable': o7 === o5, 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { vc(-vr()), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = q(vr, o4), o6 = vr(); if (o3 === 0x1) { vc(o5), v3++; break; } if (vmb_5c3957['_$bikybH']) { v3++; break; } let o7 = vmb_5c3957['_$QTk2Bd']; if (o7) { let o8 = o7['parent'], o9 = o7['newTarget'], ov = Reflect['construct'](o8, o5, o9); s && s !== ov && vmc(s)['forEach'](function (oo) { !(oo in ov) && (ov[oo] = s[oo]); }); s = ov, vf = !![]; vU && (R(vy, '__this__'), vy['_$UQQKD7']['__this__'] = s); v3++; break; } if (typeof o6 !== 'function') throw new TypeError('Super\x20expression\x20must\x20be\x20a\x20constructor'); vmb_5c3957['_$9LcLjl'] = t; try { let oo = o6['apply'](s, o5); oo !== undefined && oo !== s && typeof oo === 'object' && (s && Object['assign'](oo, s), s = oo), vf = !![], vU && (R(vy, '__this__'), vy['_$UQQKD7']['__this__'] = s); } catch (ou) { if (ou instanceof TypeError && (ou['message']['includes']('\x27new\x27') || ou['message']['includes']('constructor'))) { let om = Reflect['construct'](o6, o5, t); om !== s && s && Object['assign'](om, s), s = om, vf = !![], vU && (R(vy, '__this__'), vy['_$UQQKD7']['__this__'] = s); } else throw ou; } finally { delete vmb_5c3957['_$9LcLjl']; } v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 >>> o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = q(vr, o4), o6 = vr(); if (typeof o6 !== 'function') throw new TypeError(o6 + '\x20is\x20not\x20a\x20constructor'); if (x['has'](o6)) throw new TypeError(o6['name'] + '\x20is\x20not\x20a\x20constructor'); let o7 = vmb_5c3957['_$HSYyzG']; vmb_5c3957['_$HSYyzG'] = undefined; let o8; try { o8 = Reflect['construct'](o6, o5); } finally { vmb_5c3957['_$HSYyzG'] = o7; } vc(o8), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vV(); o4 !== null && o4 !== undefined && Object['assign'](o5, o4); v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 % o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vr(); if (o6 === null || o6 === undefined) throw new TypeError('Cannot\x20set\x20property\x20\x27' + String(o5) + '\x27\x20of\x20' + o6); z(o6, o5, o4, vO), vc(o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 instanceof o4), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 - o4), v3++; break; } }, function (o3) { while (!![]) { return v1 > 0x0 ? vr() : undefined; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 >= o4), v3++; break; } }, function (o3) { while (!![]) { vc(vmx[o3]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = v4[o3], o6 = J(), o7 = 'get_' + o5, o8 = o6['get'](o7); if (o8 && o8['has'](o4)) { let ou = o8['get'](o4); vc(ou['call'](o4)), v3++; break; } let o9 = '_$v2AOtJ' + 'get_' + o5['substring'](0x1) + '_$ry4u0B'; if (o4['constructor'] && o9 in o4['constructor']) { let om = o4['constructor'][o9]; vc(om['call'](o4)), v3++; break; } let ov = o6['get'](o5); if (ov && ov['has'](o4)) { vc(ov['get'](o4)), v3++; break; } let oo = Z(o5); if (oo in o4) { vc(o4[oo]), v3++; break; } throw new TypeError('Cannot\x20read\x20private\x20member\x20' + o5 + '\x20from\x20an\x20object\x20whose\x20class\x20did\x20not\x20declare\x20it'); break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vr(); if (typeof o5 !== 'function') throw new TypeError(o5 + '\x20is\x20not\x20a\x20function'); let o7 = vmb_5c3957['_$VUW6xB'], o8 = o7 && o7['get'](o5), o9 = vmb_5c3957['_$HSYyzG']; o8 && (vmb_5c3957['_$Sg7Wec'] = !![], vmb_5c3957['_$HSYyzG'] = o8); try { let ov = o5['apply'](o6, q(vr, o4)); vc(ov); } finally { o8 && (vmb_5c3957['_$Sg7Wec'] = ![], vmb_5c3957['_$HSYyzG'] = o9); } v3++; break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >>> 0x10; vc(v2[o4] * v4[o5]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = { 'value': o4 }; A['add'](o5), vc(o5), v3++; break; } }, function (o3) { while (!![]) { let o4 = vJ(v6[v3]); if (vo['length'] > 0x0) { let o5 = vo[vo['length'] - 0x1]; if (o5['_$ACRL5d'] !== undefined && o4 >= o5['_$eliJSn']) { vH['_$AETnwi'] = !![], vH['_$gl2Ob0'] = o4, v3 = o5['_$ACRL5d']; break; } } v3 = o4; break; } }, function (o3) { while (!![]) { if (vo['length'] > 0x0) { let o4 = vo[vo['length'] - 0x1]; o4['_$ACRL5d'] === v3 && (o4['_$PEh7f9'] !== undefined && (vu = o4['_$PEh7f9']), vo['pop']()); } v3++; break; } }, function (o3) { while (!![]) { v2[o3] = vr(), v3++; break; } }, function (o3) { while (!![]) { let o4 = o3 & 0xffff, o5 = o3 >>> 0x10; vc(v2[o4] < v4[o5]), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vV(), o7 = c(o6); vmq(o7, o5, { 'set': o4, 'enumerable': o7 === o6, 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(), o6 = vV(); vmq(o6, o5, { 'set': o4, 'enumerable': ![], 'configurable': !![] }), v3++; break; } }, function (o3) { while (!![]) { let o4 = vr(), o5 = vr(); vc(o5 << o4), v3++; break; } }]; vO = vn, vg = vS, vE = vj, vU = vb, vf = vL, vP = vA, vM = vQ, vy = vX, vw[vF[vi]](vh), vX = vy, vL = vf; if (vd) return vd = ![], vY; } break; } catch (o3) { if (vo['length'] > 0x0) { let o4 = vo[vo['length'] - 0x1]; v1 = o4['_$mKZhIl']; if (o4['_$rap1ZX'] !== undefined) vc(o3), v3 = o4['_$rap1ZX'], o4['_$rap1ZX'] = undefined, o4['_$ACRL5d'] === undefined && vo['pop'](); else o4['_$ACRL5d'] !== undefined ? (v3 = o4['_$ACRL5d'], o4['_$PEh7f9'] = o3) : (v3 = o4['_$eliJSn'], vo['pop']()); continue; } throw o3; } } return v1 > 0x0 ? vr() : vL ? s : undefined; } let y = function (h, G, W, a, t, s) { vmb_5c3957['_$Sg7Wec'] ? vmb_5c3957['_$Sg7Wec'] = ![] : vmb_5c3957['_$HSYyzG'] = undefined; let v0 = s === m ? this : s, v1 = o(h); return P(v1, G, W, a, t, v0); }, F = async function (h, G, W, a, t, s, v0) { let v1 = v0 === m ? this : v0, v2 = o(h), v3 = M(v2, G, W, a, t, v1), v4 = v3['next'](); while (!v4['done']) { if (v4['value']['_$CO0V9A'] === p) try { let v5 = await Promise['resolve'](v4['value']['_$Mj9zDU']); vmb_5c3957['_$HSYyzG'] = s, v4 = v3['next'](v5); } catch (v6) { vmb_5c3957['_$HSYyzG'] = s, v4 = v3['throw'](v6); } else throw new Error('Unexpected\x20yield\x20in\x20async\x20context'); } return v4['value']; }, w = function (h, G, W, a, t, s) { let v0 = s === m ? this : s, v1 = o(h), v2 = M(v1, G, W, a, undefined, v0), v3 = ![], v4 = null, v5 = undefined, v6 = ![]; function v7(vm, vp) { if (v3) return { 'value': undefined, 'done': !![] }; vmb_5c3957['_$HSYyzG'] = t; if (v4) { let vB; try { vB = vp ? typeof v4['throw'] === 'function' ? v4['throw'](vm) : (v4 = null, (function () { throw vm; }())) : v4['next'](vm); } catch (vn) { v4 = null; try { let vS = v2['throw'](vn); return v8(vS); } catch (vj) { v3 = !![]; throw vj; } } if (!vB['done']) return { 'value': vB['value'], 'done': ![] }; v4 = null, vm = vB['value'], vp = ![]; } let vH; try { vH = vp ? v2['throw'](vm) : v2['next'](vm); } catch (vb) { v3 = !![]; throw vb; } return v8(vH); } function v8(vm) { if (vm['done']) { v3 = !![]; if (v6) return v6 = ![], { 'value': v5, 'done': !![] }; return { 'value': vm['value'], 'done': !![] }; } let vp = vm['value']; if (vp['_$CO0V9A'] === H) return { 'value': vp['_$Mj9zDU'], 'done': ![] }; if (vp['_$CO0V9A'] === B) { let vH = vp['_$Mj9zDU'], vB = vH; vB && typeof vB[Symbol['iterator']] === 'function' && (vB = vB[Symbol['iterator']]()); if (vB && typeof vB['next'] === 'function') { let vn = vB['next'](); if (!vn['done']) return v4 = vB, { 'value': vn['value'], 'done': ![] }; return v7(vn['value'], ![]); } return v7(undefined, ![]); } throw new Error('Unexpected\x20signal\x20in\x20generator'); } let v9 = v1 && v1['s'], vv = async function (vm) { if (v3) return { 'value': vm, 'done': !![] }; if (v4 && typeof v4['return'] === 'function') { try { await v4['return'](); } catch (vH) { } v4 = null; } let vp; try { vmb_5c3957['_$HSYyzG'] = t, vp = v2['next']({ ['_$CO0V9A']: n, ['_$Mj9zDU']: vm }); } catch (vB) { v3 = !![]; throw vB; } while (!vp['done']) { let vn = vp['value']; if (vn['_$CO0V9A'] === p) try { let vS = await Promise['resolve'](vn['_$Mj9zDU']); vmb_5c3957['_$HSYyzG'] = t, vp = v2['next'](vS); } catch (vj) { vmb_5c3957['_$HSYyzG'] = t, vp = v2['throw'](vj); } else { if (vn['_$CO0V9A'] === H) try { vmb_5c3957['_$HSYyzG'] = t, vp = v2['next'](); } catch (vb) { v3 = !![]; throw vb; } else break; } } return v3 = !![], { 'value': vp['value'], 'done': !![] }; }, vo = function (vm) { if (v3) return { 'value': vm, 'done': !![] }; if (v4 && typeof v4['return'] === 'function') { try { v4['return'](); } catch (vH) { } v4 = null; } v5 = vm, v6 = !![]; let vp; try { vmb_5c3957['_$HSYyzG'] = t, vp = v2['next']({ ['_$CO0V9A']: n, ['_$Mj9zDU']: vm }); } catch (vB) { v3 = !![], v6 = ![]; throw vB; } if (!vp['done'] && vp['value'] && vp['value']['_$CO0V9A'] === H) return { 'value': vp['value']['_$Mj9zDU'], 'done': ![] }; return v3 = !![], v6 = ![], { 'value': vp['value'], 'done': !![] }; }; if (v9) { let vm = async function (vp, vH) { if (v3) return { 'value': undefined, 'done': !![] }; vmb_5c3957['_$HSYyzG'] = t; if (v4) { let vn; try { vn = vH ? typeof v4['throw'] === 'function' ? await v4['throw'](vp) : (v4 = null, (function () { throw vp; }())) : await v4['next'](vp); } catch (vS) { v4 = null; try { vmb_5c3957['_$HSYyzG'] = t; let vj = v2['throw'](vS); return await vu(vj); } catch (vb) { v3 = !![]; throw vb; } } if (!vn['done']) return { 'value': vn['value'], 'done': ![] }; v4 = null, vp = vn['value'], vH = ![]; } let vB; try { vB = vH ? v2['throw'](vp) : v2['next'](vp); } catch (vA) { v3 = !![]; throw vA; } return await vu(vB); }; async function vu(vp) { while (!vp['done']) { let vH = vp['value']; if (vH['_$CO0V9A'] === p) { let vB; try { vB = await Promise['resolve'](vH['_$Mj9zDU']), vmb_5c3957['_$HSYyzG'] = t, vp = v2['next'](vB); } catch (vn) { vmb_5c3957['_$HSYyzG'] = t, vp = v2['throw'](vn); } continue; } if (vH['_$CO0V9A'] === H) return { 'value': vH['_$Mj9zDU'], 'done': ![] }; if (vH['_$CO0V9A'] === B) { let vS = vH['_$Mj9zDU'], vj = vS; if (vj && typeof vj[Symbol['asyncIterator']] === 'function') vj = vj[Symbol['asyncIterator']](); else vj && typeof vj[Symbol['iterator']] === 'function' && (vj = vj[Symbol['iterator']]()); if (vj && typeof vj['next'] === 'function') { let vb = await vj['next'](); if (!vb['done']) return v4 = vj, { 'value': vb['value'], 'done': ![] }; vmb_5c3957['_$HSYyzG'] = t, vp = v2['next'](vb['value']); continue; } vmb_5c3957['_$HSYyzG'] = t, vp = v2['next'](undefined); continue; } throw new Error('Unexpected\x20signal\x20in\x20async\x20generator'); } v3 = !![]; if (v6) return v6 = ![], { 'value': v5, 'done': !![] }; return { 'value': vp['value'], 'done': !![] }; } return { 'next': function (vp) { return vm(vp, ![]); }, 'return': vv, 'throw': function (vp) { if (v3) return Promise['reject'](vp); return vm(vp, !![]); }, [Symbol['asyncIterator']]: function () { return this; } }; } else return { 'next': function (vp) { return v7(vp, ![]); }, 'return': vo, 'throw': function (vp) { if (v3) throw vp; return v7(vp, !![]); }, [Symbol['iterator']]: function () { return this; } }; }; return function (h, G, W, a, t) { let s = o(h); if (s && s['g']) { let v0 = vmb_5c3957['_$HSYyzG']; return w['call'](this, h, G, W, a, v0, m); } else { if (s && s['s']) { let v1 = vmb_5c3957['_$HSYyzG']; return F['call'](this, h, G, W, a, t, v1, m); } else { if (s && s['st'] && this === vmA) return y(h, G, W, a, t, undefined); return y['call'](this, h, G, W, a, t, m); } } }; }()); try { Buffer, Object['defineProperty'](vmb_5c3957, 'Buffer', { 'get': function () { return Buffer; }, 'set': function (o) { Buffer = o; }, 'configurable': !![] }); } catch (vmol) { } try { crypto, Object['defineProperty'](vmb_5c3957, 'crypto', { 'get': function () { return crypto; }, 'set': function (o) { crypto = o; }, 'configurable': !![] }); } catch (vmoI) { } try { undefined, Object['defineProperty'](vmb_5c3957, 'undefined', { 'get': function () { return undefined; }, 'set': function (o) { undefined = o; }, 'configurable': !![] }); } catch (vmoc) { } try { global, Object['defineProperty'](vmb_5c3957, 'global', { 'get': function () { return global; }, 'set': function (o) { global = o; }, 'configurable': !![] }); } catch (vmor) { } try { path, Object['defineProperty'](vmb_5c3957, 'path', { 'get': function () { return path; }, 'set': function (o) { path = o; }, 'configurable': !![] }); } catch (vmoV) { } try { fs, Object['defineProperty'](vmb_5c3957, 'fs', { 'get': function () { return fs; }, 'set': function (o) { fs = o; }, 'configurable': !![] }); } catch (vmoR) { } try { yaml, Object['defineProperty'](vmb_5c3957, 'yaml', { 'get': function () { return yaml; }, 'set': function (o) { yaml = o; }, 'configurable': !![] }); } catch (vmoD) { } try { Array, Object['defineProperty'](vmb_5c3957, 'Array', { 'get': function () { return Array; }, 'set': function (o) { Array = o; }, 'configurable': !![] }); } catch (vmoz) { } try { isEncrypted, Object['defineProperty'](vmb_5c3957, 'isEncrypted', { 'get': function () { return isEncrypted; }, 'set': function (o) { isEncrypted = o; }, 'configurable': !![] }); } catch (vmoJ) { } try { fuck_logger, Object['defineProperty'](vmb_5c3957, 'fuck_logger', { 'get': function () { return fuck_logger; }, 'set': function (o) { fuck_logger = o; }, 'configurable': !![] }); } catch (vmoX) { } try { Client, Object['defineProperty'](vmb_5c3957, 'Client', { 'get': function () { return Client; }, 'set': function (o) { Client = o; }, 'configurable': !![] }); } catch (vmoQ) { } vmb_5c3957['decrypt'] = decrypt; globalThis['decrypt'] = vmb_5c3957['decrypt'], vmb_5c3957['encrypt'] = encrypt; globalThis['encrypt'] = vmb_5c3957['encrypt'], vmb_5c3957["getSecretKey"] = getSecretKey; globalThis['getSecretKey'] = vmb_5c3957['getSecretKey'], vmb_5c3957['_$5L5rWq'] = { 'ENC_PREFIX': !![], 'ITERATIONS': !![], 'SYSPATCH': !![], 'TokenCrypto': !![] }; const ENC_PREFIX = 'ENC::'; vmb_5c3957['ENC_PREFIX'] = ENC_PREFIX; globalThis['ENC_PREFIX'] = vmb_5c3957['ENC_PREFIX'], vmb_5c3957["ENC_PREFIX"] = ENC_PREFIX; globalThis['ENC_PREFIX'] = ENC_PREFIX; delete vmb_5c3957['_$5L5rWq']['ENC_PREFIX']; const ITERATIONS = 0x927c0; vmb_5c3957['ITERATIONS'] = ITERATIONS; globalThis['ITERATIONS'] = vmb_5c3957['ITERATIONS'], vmb_5c3957["ITERATIONS"] = ITERATIONS; globalThis['ITERATIONS'] = ITERATIONS; delete vmb_5c3957['_$5L5rWq']['ITERATIONS']; const SYSPATCH = Buffer['from']([0x73, 0x70, 0x69, 0x74, 0x65, 0x63, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x73, 0x68, 0x6f, 0x77, 0x6e, 0x68, 0x61, 0x70, 0x70, 0x65, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x74, 0x68, 0x72, 0x6f, 0x77, 0x6e, 0x64, 0x75, 0x65, 0x74, 0x65, 0x61, 0x70, 0x6f, 0x73, 0x74, 0x72, 0x6f, 0x6c, 0x6c, 0x61, 0x63, 0x72]); vmb_5c3957['SYSPATCH'] = SYSPATCH; globalThis['SYSPATCH'] = vmb_5c3957['SYSPATCH'], vmb_5c3957["SYSPATCH"] = SYSPATCH; globalThis['SYSPATCH'] = vmb_5c3957['SYSPATCH']; delete vmb_5c3957['_$5L5rWq']['SYSPATCH']; function getSecretKey() { return vmp_d7b698['call'](this, 0x0, Array['from'](arguments), undefined, undefined, new.target); } function encrypt(v) { return vmp_d7b698['call'](this, 0x1, Array['from'](arguments), { ['_$wbxkap']: undefined, ['_$UQQKD7']: Object['defineProperties']({ 'ITERATIONS': ITERATIONS, 'ENC_PREFIX': ENC_PREFIX }, { ['getSecretKey']: { 'get': function () { return getSecretKey; }, 'set': function (o) { getSecretKey = o; }, 'enumerable': !![] } }), ['_$pXrZwW']: { ['ITERATIONS']: !![], ['ENC_PREFIX']: !![] } }, undefined, new.target); } function decrypt(v) { return vmp_d7b698['call'](this, 0x2, Array['from'](arguments), { ['_$wbxkap']: undefined, ['_$UQQKD7']: Object['defineProperties']({ 'ENC_PREFIX': ENC_PREFIX, 'ITERATIONS': ITERATIONS }, { ['getSecretKey']: { 'get': function () { return getSecretKey; }, 'set': function (o) { getSecretKey = o; }, 'enumerable': !![] } }), ['_$pXrZwW']: { ['ENC_PREFIX']: !![], ['ITERATIONS']: !![] } }, undefined, new.target); } const TokenCrypto = { 'encrypt': encrypt, 'decrypt': decrypt, 'resolveToken': v => decrypt(v), 'getSecretKey': getSecretKey }; vmb_5c3957['TokenCrypto'] = TokenCrypto; globalThis['TokenCrypto'] = vmb_5c3957['TokenCrypto'], vmb_5c3957['TokenCrypto'] = TokenCrypto; globalThis['TokenCrypto'] = vmb_5c3957['TokenCrypto']; delete vmb_5c3957['_$5L5rWq']['TokenCrypto'], global['TokenCrypto'] = vmb_5c3957['TokenCrypto'], (async () => { return vmp_d7b698['call'](this, 0x5, [], { ['_$wbxkap']: undefined, ['_$UQQKD7']: Object['defineProperties']({}, { ['decrypt']: { 'get': function () { return decrypt; }, 'set': function (v) { decrypt = v; }, 'enumerable': !![] } }) }, undefined, undefined); })();

// external Image
class GetExternalImage {
  constructor(client) {
    this.client = client;
  }

  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async get(url1, url2) {
    try {
      const { getExternal } = RichPresence;

      const urls = [url1, url2].map(url => (this.isValidURL(url) ? url : null));
      const validUrls = urls.filter(Boolean);

      if (validUrls.length === 0) {
        return { bigImage: null, smallImage: null };
      }

      const images = await getExternal(this.client, "1438613688406769778", ...validUrls);
      let finalUrl1 = null;
      let finalUrl2 = null;

      for (const img of images) {
        const { url, external_asset_path } = img;
        const finalPath = url.includes("attachments") ? url : external_asset_path;

        if (url === url1) finalUrl1 = finalPath;
        if (url === url2) finalUrl2 = finalPath;
      }

      return {
        bigImage: finalUrl1,
        smallImage: finalUrl2,
      };
    } catch (error) {
      console.error("[GetExternalImage Error]:", error);
      return { bigImage: null, smallImage: null };
    }
  }
}


// config.yml
let config;
(function loadConfig() {
  function findConfigFile(dir, filename = "config.yml", depth = 0, maxDepth = 5) {
    if (depth > maxDepth) return null;

    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        if (item === filename) {
          const fullPath = path.join(dir, item);
          if (fs.statSync(fullPath).isFile()) {
            return fullPath;
          }
        }
      }

      for (const item of items) {
        const fullPath = path.join(dir, item);

        if (["node_modules", ".git", ".vscode", "dist", "build"].includes(item)) {
          continue;
        }

        try {
          if (fs.statSync(fullPath).isDirectory()) {
            const found = findConfigFile(fullPath, filename, depth + 1, maxDepth);
            if (found) return found;
          }
        } catch (err) {
          continue;
        }
      }
    } catch (err) {
      return null;
    }

    return null;
  }

  try {
    const configPath = findConfigFile(__dirname);

    if (!configPath) {
      fuck_logger("error", "Could not find config.yml anywhere in the project directory");
      process.exit(1);
    }

    const fileContents = fs.readFileSync(configPath, "utf8");
    config = yaml.load(fileContents);
    global.config = config;

  } catch (error) {
    fuck_logger("error", `Failed to load config.yml: ${error.message}`);
    process.exit(1);
  }
})();


// Weather
class Weather {
  constructor(tz) {
    this.tz = tz;

    this.name = "";
    this.region = "";
    this.country = "";
    this.lat = 0;
    this.lon = 0;
    this.tz_id = "";
    this.localtime = "";

    this.last_updated = "";
    this.temp_c = 0;
    this.temp_f = 0;
    this.is_day = 0;
    this.condition = {
      text: "",
      icon: "",
      code: 0,
    };

    this.wind_mph = 0;
    this.wind_kph = 0;
    this.wind_degree = 0;
    this.wind_dir = "";
    this.pressure_mb = 0;
    this.pressure_in = 0;
    this.precip_mm = 0;
    this.precip_in = 0;
    this.humidity = 0;
    this.cloud = 0;
    this.feelslike_c = 0;
    this.feelslike_f = 0;
    this.windchill_c = 0;
    this.windchill_f = 0;
    this.heatindex_c = 0;
    this.heatindex_f = 0;
    this.dewpoint_c = 0;
    this.dewpoint_f = 0;
    this.vis_km = 0;
    this.vis_miles = 0;
    this.uv = 0;
    this.gust_mph = 0;
    this.gust_kph = 0;

    this.co = 0;
    this.no2 = 0;
    this.o3 = 0;
    this.so2 = 0;
    this.pm2_5 = 0;
    this.pm10 = 0;
    this.us_epa_index = 0;
    this.gb_defra_index = 0;

    this.stop = 0;


    schedule("*/5 * * * *", () => this.update());
  }

  async update() {
    try {
      const params = new URLSearchParams();
      params.append("key", "1e1a0f498dbf472cb3991045241608");
      params.append("q", encodeURIComponent(this.tz));
      params.append("aqi", "yes");

      const response = await fetch(`https://api.weatherapi.com/v1/current.json?${params}`);
      const data = await response.json();

      this.name = data.location.name;
      this.region = data.location.region;
      this.country = data.location.country;
      this.lat = data.location.lat;
      this.lon = data.location.lon;
      this.tz_id = data.location.tz_id;
      this.localtime = data.location.localtime;

      this.last_updated = data.current.last_updated;
      this.temp_c = data.current.temp_c;
      this.temp_f = data.current.temp_f;
      this.is_day = data.current.is_day;
      this.condition.text = data.current.condition.text;
      this.condition.icon = data.current.condition.icon;
      this.condition.code = data.current.condition.code;

      this.wind_mph = data.current.wind_mph;
      this.wind_kph = data.current.wind_kph;
      this.wind_degree = data.current.wind_degree;
      this.wind_dir = data.current.wind_dir;
      this.pressure_mb = data.current.pressure_mb;
      this.pressure_in = data.current.pressure_in;
      this.precip_mm = data.current.precip_mm;
      this.precip_in = data.current.precip_in;
      this.humidity = data.current.humidity;
      this.cloud = data.current.cloud;
      this.feelslike_c = data.current.feelslike_c;
      this.feelslike_f = data.current.feelslike_f;
      this.windchill_c = data.current.windchill_c;
      this.windchill_f = data.current.windchill_f;
      this.heatindex_c = data.current.heatindex_c;
      this.heatindex_f = data.current.heatindex_f;
      this.dewpoint_c = data.current.dewpoint_c;
      this.dewpoint_f = data.current.dewpoint_f;
      this.vis_km = data.current.vis_km;
      this.vis_miles = data.current.vis_miles;
      this.uv = data.current.uv;
      this.gust_mph = data.current.gust_mph;
      this.gust_kph = data.current.gust_kph;

      if (data.current.air_quality) {
        this.co = data.current.air_quality.co;
        this.no2 = data.current.air_quality.no2;
        this.o3 = data.current.air_quality.o3;
        this.so2 = data.current.air_quality.so2;
        this.pm2_5 = data.current.air_quality.pm2_5;
        this.pm10 = data.current.air_quality.pm10;
        this.us_epa_index = data.current.air_quality["us-epa-index"];
        this.gb_defra_index = data.current.air_quality["gb-defra-index"];
      }

      this.stop = 0;
    } catch (err) {
      fuck_logger("error", `weather update failed ${err.message}`);
      if (this.stop > 10) return;
      this.stop++;
      setTimeout(() => this.update(), 10000);
    }
  }
}

class SystemInfo {
  constructor() {
    this.cpuName = os.cpus()[0]?.model || "Unknown";
    this.cpuCores = os.cpus().length;
    this.cpuSpeedGHz = (os.cpus()[0]?.speed / 1000 || 0).toFixed(1);
    this.cpuUsage = 0;

    this.totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    this.usedRAM = 0;
    this.freeRAM = 0;
    this.ramUsage = 0;

    this.osType = os.type();
    this.osVersion = os.release();
    this.arch = os.arch();
    this.hostname = os.hostname();
    this.uptime = this._formatTime(os.uptime());

    this.gpus = [];

    this.diskTotal = 0;
    this.diskUsed = 0;
    this.diskUsage = 0;
  }

  async getCpuUsageOverInterval(interval = 1000) {
    return new Promise((resolve) => {
      const start = this._measureCpuTimes();
      setTimeout(() => {
        const end = this._measureCpuTimes();
        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;
        const usage = 100 - Math.floor((idleDiff / totalDiff) * 100);
        resolve(usage);
      }, interval);
    });
  }

  _measureCpuTimes() {
    let totalIdle = 0;
    let totalTick = 0;
    const cpus = os.cpus();
    cpus.forEach((cpu) => {
      for (let type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });
    return { idle: totalIdle, total: totalTick };
  }

  getRamUsage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    return {
      used: (usedMem / 1024 / 1024 / 1024).toFixed(2),
      free: (freeMem / 1024 / 1024 / 1024).toFixed(2),
      total: (totalMem / 1024 / 1024 / 1024).toFixed(2),
      percent: Math.floor((usedMem / totalMem) * 100),
    };
  }

  async getGpuInfo() {
    try {
      const graphics = await si.graphics();
      return graphics.controllers.map((gpu) => ({
        model: gpu.model,
        vendor: gpu.vendor,
        vram: gpu.vram,
        usage: gpu.utilizationGpu || 0,
      }));
    } catch (err) {
      fuck_logger("warn", "Unable to get GPU info:", err.message);
      return [];
    }
  }

  async getDiskUsage() {
    try {
      const disks = await si.fsSize();
      const total = disks.reduce((sum, d) => sum + d.size, 0);
      const used = disks.reduce((sum, d) => sum + d.used, 0);
      return {
        total: (total / 1024 / 1024 / 1024).toFixed(2),
        used: (used / 1024 / 1024 / 1024).toFixed(2),
        percent: Math.floor((used / total) * 100),
      };
    } catch (err) {
      fuck_logger("[WARN] Unable to get Disk info:", err.message);
      return { total: 0, used: 0, percent: 0 };
    }
  }

  async update() {
    this.cpuUsage = await this.getCpuUsageOverInterval(1000);

    const ram = this.getRamUsage();
    this.usedRAM = ram.used;
    this.freeRAM = ram.free;
    this.ramUsage = ram.percent;

    const gpuData = await this.getGpuInfo();
    this.gpus = gpuData;

    const diskData = await this.getDiskUsage();
    this.diskTotal = diskData.total;
    this.diskUsed = diskData.used;
    this.diskUsage = diskData.percent;

    this.uptime = this._formatTime(os.uptime());
  }

  _formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  }
}

class Emoji {
  getTime(hour) {
    const parsedHour = parseInt(hour, 10);
    return isNaN(parsedHour)
      ? "Invalid hour"
      : parsedHour >= 6 && parsedHour < 18
        ? "☀️"
        : "🌙";
  }

  getClock(hour) {
    const parsedHour = parseInt(hour, 10);
    const clocks = [
      "🕛",
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚",
    ];
    return parsedHour >= 0 && parsedHour <= 23
      ? clocks[parsedHour % 12]
      : "Invalid hour";
  }
}

class TextFont {
  getFont1(text) {
    const fontMap = {
      a: "𝕒",
      b: "𝕓",
      c: "𝕔",
      d: "𝕕",
      e: "𝕖",
      f: "𝕗",
      g: "𝕘",
      h: "𝕙",
      i: "𝕚",
      j: "𝕛",
      k: "𝕜",
      l: "𝕝",
      m: "𝕞",
      n: "𝕟",
      o: "𝕠",
      p: "𝕡",
      q: "𝕢",
      r: "𝕣",
      s: "𝕤",
      t: "𝕥",
      u: "𝕦",
      v: "𝕧",
      w: "𝕨",
      x: "𝕩",
      y: "𝕪",
      z: "𝕫",
      A: "𝔸",
      B: "𝔹",
      C: "ℂ",
      D: "𝔻",
      E: "𝔼",
      F: "𝔽",
      G: "𝔾",
      H: "ℍ",
      I: "𝕀",
      J: "𝕁",
      K: "𝕂",
      L: "𝕃",
      M: "𝕄",
      N: "ℕ",
      O: "𝕆",
      P: "ℙ",
      Q: "ℚ",
      R: "ℝ",
      S: "𝕊",
      T: "𝕋",
      U: "𝕌",
      V: "𝕍",
      W: "𝕎",
      X: "𝕏",
      Y: "𝕐",
      Z: "ℤ",
      0: "𝟘",
      1: "𝟙",
      2: "𝟚",
      3: "𝟛",
      4: "𝟜",
      5: "𝟝",
      6: "𝟞",
      7: "𝟟",
      8: "𝟠",
      9: "𝟡",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont2(text) {
    const fontMap = {
      a: "𝗮",
      b: "𝗯",
      c: "𝗰",
      d: "𝗱",
      e: "𝗲",
      f: "𝗳",
      g: "𝗴",
      h: "𝗵",
      i: "𝗶",
      j: "𝗷",
      k: "𝗸",
      l: "𝗹",
      m: "𝗺",
      n: "𝗻",
      o: "𝗼",
      p: "𝗽",
      q: "𝗾",
      r: "𝗿",
      s: "𝘀",
      t: "𝘁",
      u: "𝘂",
      v: "𝘃",
      w: "𝘄",
      x: "𝘅",
      y: "𝘆",
      z: "𝘇",
      A: "𝗔",
      B: "𝗕",
      C: "𝗖",
      D: "𝗗",
      E: "𝗘",
      F: "𝗙",
      G: "𝗚",
      H: "𝗛",
      I: "𝗜",
      J: "𝗝",
      K: "𝗞",
      L: "𝗟",
      M: "𝗠",
      N: "𝗡",
      O: "𝗢",
      P: "𝗣",
      Q: "𝗤",
      R: "𝗥",
      S: "𝗦",
      T: "𝗧",
      U: "𝗨",
      V: "𝗩",
      W: "𝗪",
      X: "𝗫",
      Y: "𝗬",
      Z: "𝗭",
      0: "𝟬",
      1: "𝟭",
      2: "𝟮",
      3: "𝟯",
      4: "𝟰",
      5: "𝟱",
      6: "𝟲",
      7: "𝟳",
      8: "𝟴",
      9: "𝟵",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont3(text) {
    const fontMap = {
      a: "𝒶",
      b: "𝒷",
      c: "𝒸",
      d: "𝒹",
      e: "𝑒",
      f: "𝒻",
      g: "𝑔",
      h: "𝒽",
      i: "𝒾",
      j: "𝒿",
      k: "𝓀",
      l: "𝓁",
      m: "𝓂",
      n: "𝓃",
      o: "𝑜",
      p: "𝓅",
      q: "𝓆",
      r: "𝓇",
      s: "𝓈",
      t: "𝓉",
      u: "𝓊",
      v: "𝓋",
      w: "𝓌",
      x: "𝓍",
      y: "𝓎",
      z: "𝓏",
      A: "𝒜",
      B: "ℬ",
      C: "𝒞",
      D: "𝒟",
      E: "ℰ",
      F: "ℱ",
      G: "𝒢",
      H: "ℋ",
      I: "ℐ",
      J: "𝒥",
      K: "𝒦",
      L: "ℒ",
      M: "ℳ",
      N: "𝒩",
      O: "𝒪",
      P: "𝒫",
      Q: "𝒬",
      R: "ℛ",
      S: "𝒮",
      T: "𝒯",
      U: "𝒰",
      V: "𝒱",
      W: "𝒲",
      X: "𝒳",
      Y: "𝒴",
      Z: "𝒵",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont4(text) {
    const fontMap = {
      a: "𝓪",
      b: "𝓫",
      c: "𝓬",
      d: "𝓭",
      e: "𝓮",
      f: "𝓯",
      g: "𝓰",
      h: "𝓱",
      i: "𝓲",
      j: "𝓳",
      k: "𝓴",
      l: "𝓵",
      m: "𝓶",
      n: "𝓷",
      o: "𝓸",
      p: "𝓹",
      q: "𝓺",
      r: "𝓻",
      s: "𝓼",
      t: "𝓽",
      u: "𝓾",
      v: "𝓿",
      w: "𝔀",
      x: "𝔁",
      y: "𝔂",
      z: "𝔃",
      A: "𝓐",
      B: "𝓑",
      C: "𝓒",
      D: "𝓓",
      E: "𝓔",
      F: "𝓕",
      G: "𝓖",
      H: "𝓗",
      I: "𝓘",
      J: "𝓙",
      K: "𝓚",
      L: "𝓛",
      M: "𝓜",
      N: "𝓝",
      O: "𝓞",
      P: "𝓟",
      Q: "𝓠",
      R: "𝓡",
      S: "𝓢",
      T: "𝓣",
      U: "𝓤",
      V: "𝓥",
      W: "𝓦",
      X: "𝓧",
      Y: "𝓨",
      Z: "𝓩",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont5(text) {
    const fontMap = {
      a: "ⓐ",
      b: "ⓑ",
      c: "ⓒ",
      d: "ⓓ",
      e: "ⓔ",
      f: "ⓕ",
      g: "ⓖ",
      h: "ⓗ",
      i: "ⓘ",
      j: "ⓙ",
      k: "ⓚ",
      l: "ⓛ",
      m: "ⓜ",
      n: "ⓝ",
      o: "ⓞ",
      p: "ⓟ",
      q: "ⓠ",
      r: "ⓡ",
      s: "ⓢ",
      t: "ⓣ",
      u: "ⓤ",
      v: "ⓥ",
      w: "ⓦ",
      x: "ⓧ",
      y: "ⓨ",
      z: "ⓩ",
      A: "Ⓐ",
      B: "Ⓑ",
      C: "Ⓒ",
      D: "Ⓓ",
      E: "Ⓔ",
      F: "Ⓕ",
      G: "Ⓖ",
      H: "Ⓗ",
      I: "Ⓘ",
      J: "Ⓙ",
      K: "Ⓚ",
      L: "Ⓛ",
      M: "Ⓜ",
      N: "Ⓝ",
      O: "Ⓞ",
      P: "Ⓟ",
      Q: "Ⓠ",
      R: "Ⓡ",
      S: "Ⓢ",
      T: "Ⓣ",
      U: "Ⓤ",
      V: "Ⓥ",
      W: "Ⓦ",
      X: "Ⓧ",
      Y: "Ⓨ",
      Z: "Ⓩ",
      0: "⓪",
      1: "①",
      2: "②",
      3: "③",
      4: "④",
      5: "⑤",
      6: "⑥",
      7: "⑦",
      8: "⑧",
      9: "⑨",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }
}

class NyxClient extends Client {
  constructor(token, config) {
    try {
      const ClientUserSettingManager = require("discord.js-selfbot-v13/src/managers/ClientUserSettingManager");
      if (
        ClientUserSettingManager &&
        ClientUserSettingManager.prototype &&
        ClientUserSettingManager.prototype._patch
      ) {
        const originalPatch = ClientUserSettingManager.prototype._patch;
        ClientUserSettingManager.prototype._patch = function (data) {
          if (!data) data = {};
          if (!data.friend_source_flags) {
            data.friend_source_flags = { all: false };
          }
          return originalPatch.call(this, data);
        };
        fuck_logger("success", "Patched ClientUserSettingManager before client creation");
      }
    } catch (error) {
      fuck_logger("warning", `Pre-patching attempt failed: ${error.message}`);
    }

    super({
      checkUpdate: false,
      autoRedeemNitro: false,
      captchaKey: null,
      captchaService: null,
      DMSync: false,
      cloudStreamingKill: true,
      browser: "Chrome",
      patchVoice: false,
      keepAlive: true,
      sweepers: {
        messages: {
          interval: 120,
          lifetime: 60,
        },
      },
      ws: {
        properties: {
          browser: "Chrome",
          os: "Windows",
          device: "Chrome",
        },
        reconnect: true,
        intents: 32767,
      },
      rest: {
        userAgentAppendix: "Discord-Selfbot/1.0.0",
        timeout: 30000,
        retries: 3,
      },
      messageCacheMaxSize: 5,
      messageCacheLifetime: 60,
      messageSweepInterval: 120,
    });

    const inputs = config.INPUTS || config.inputs || [{}];
    const input = Array.isArray(inputs) ? inputs[0] : inputs;
    const options = config.OPTIONS || config.options || {};
    const voice = config.VOICE || config.voice || {};
    const status = config.STATUS || config.status || {};
    const rpc = config.RPC || config.rpc || {};

    this.TOKEN = token;
    this.config = config;
    this.customStatusEnabled = input.customStatus === true;
    this.voiceEnabled = input.voiceEnabled === true;
    this.activityType = input.activity?.type || "STREAMING";
    this.currentStreamingActivity = null;
    this.voiceConnections = new Map();
    this.voiceConfig = {
      data: voice.data || "sx!",
      streaming: voice.streaming !== undefined ? voice.streaming : true,
      ffmpegEnabled: voice.ffmpeg === true,
      autoRejoinDelay: voice.autoRejoinDelay || 5000
    };
    this.lastVoiceChannelId = null;
    this.lastVoiceGuildId = null;
    this.isAutoRejoining = false;
    this.intervals = new Set();

    this.streamer = new Streamer(this);
    this.streamController = null;

    const streamOpts = voice.streamOpts || voice;
    this.streamConfig = {
      width: streamOpts.width || 1280,
      height: streamOpts.height || 720,
      fps: streamOpts.fps || 30,
      bitrateKbps: streamOpts.bitrateKbps || 1000,
      maxBitrateKbps: streamOpts.maxBitrateKbps || 2500,
      hardwareAcceleration: streamOpts.hardware_acceleration || streamOpts.hardwareAcceleration || false,
      videoCodec: streamOpts.videoCodec || "H264"
    };

    this.weather = new Weather(options.tz || "Asia/Bangkok");
    this.sys = new SystemInfo();
    this.emoji = new Emoji();
    this.textFont = new TextFont();
    this.getExternal = new GetExternalImage(this);
    this.cacheImage = new Map();

    this.statusConfig = {
      delay: status.delay || 4000,
      data: status.data || []
    };

    this.rpcConfig = {
      delay: rpc.delay || 4000,
      timestamp: rpc.timestamp || {},
      twitchURL: rpc.TwitchURL || rpc.twitchURL || "",
      youtubeURL: rpc.YoutubeURL || rpc.youtubeURL || "",
      name: rpc.name || [],
      state: rpc.state || [],
      details: rpc.details || [],
      assetsLargeText: rpc.assetsLargeText || [],
      assetsSmallText: rpc.assetsSmallText || [],
      assetsLargeImage: rpc.assetsLargeImage || [],
      assetsSmallImage: rpc.assetsSmallImage || [],
      buttonFirst: rpc.buttonFirst || [],
      buttonSecond: rpc.buttonSecond || []
    };

    this.lib = {
      count: 0,
      timestamp: 0,
    };

    this.index = {
      url: 0,
      status: 0,
      state: 0,
      details: 0,
      assetsLargeText: 0,
      assetsSmallText: 0,
      assetsLargeImage: 0,
      assetsSmallImage: 0,
      bt_1: 0,
      bt_2: 0,
    };

    this.statusIndex = 0;
    this.lastRestartTime = 0;
    this.restartCount = 0;
    this.lastConnectionCheck = Date.now();
    this.isRunningStream = false;

    this.on("disconnect", () => {
      fuck_logger("warning", `Client disconnected for token: ${this.maskToken(this.TOKEN)}`);
    });

    this.on("reconnecting", () => {
      fuck_logger("warning", `Client reconnecting for token: ${this.maskToken(this.TOKEN)}`);
    });

    this.on("resumed", () => {
      fuck_logger("success", `Client resumed for token: ${this.maskToken(this.TOKEN)}`);
    });

    this.on("ready", this._onReady.bind(this));
    this.on("error", this._onError.bind(this));
    this.on("messageCreate", this._onMessage.bind(this));

    this.on("voiceStateUpdate", (oldState, newState) => {
      try {
        if (newState.member?.id === this.user?.id) {
          // User joined or switched to a channel
          if (newState.channelId) {
            this.lastVoiceChannelId = newState.channelId;
            this.lastVoiceGuildId = newState.guild?.id;
            this.isAutoRejoining = false;
            fuck_logger("log", `Voice state: Joined/switched to channel ${newState.channelId}`);
          }
          // User left a channel (disconnected)
          else if (oldState.channelId && !newState.channelId) {
            const channelId = this.lastVoiceChannelId || oldState.channelId;
            const guildId = this.lastVoiceGuildId || oldState.guild?.id;

            if (channelId && guildId && !this.isAutoRejoining) {
              this.isAutoRejoining = true;
              fuck_logger("warning", `Disconnected from voice channel. Auto-rejoining in ${this.voiceConfig.autoRejoinDelay}ms...`);

              setTimeout(async () => {
                try {
                  if (this.voiceConfig.ffmpegEnabled) {
                    await this.streamer.joinVoice(guildId, channelId);
                  } else {
                    await this.connectToVoiceChannel(channelId, true, true, false);
                  }
                  fuck_logger("success", `Auto-rejoined voice channel ${channelId}`);
                } catch (rejoinErr) {
                  fuck_logger("error", `Failed to auto-rejoin: ${rejoinErr.message}`);
                } finally {
                  this.isAutoRejoining = false;
                }
              }, this.voiceConfig.autoRejoinDelay);
            }
          }
        }
      } catch (err) {
        fuck_logger("warning", `Voice state update error: ${err.message}`);
      }
    });

    this.on("warn", (warning) => {
      fuck_logger("warning", `Client warning: ${warning}`);
    });
  }

  _onReady() {
    if (!this.user.settings) {
      this.user.settings = {
        friend_source_flags: { all: true },
        custom_status: null,
      };
    } else if (!this.user.settings.friend_source_flags) {
      this.user.settings.friend_source_flags = { all: true };
    }

    if (this.user.settings && this.user.settings._patch) {
      const originalPatch = this.user.settings._patch;
      this.user.settings._patch = function (data) {
        if (!data) data = {};
        if (!data.friend_source_flags) {
          data.friend_source_flags = { all: false };
        }
        return originalPatch.call(this, data);
      };
      fuck_logger("success", "Patched settings._patch method");
    }

    this.restartCount = 0;
    this.startPingChecker();
    this.streaming();

    const statusData = this.statusConfig.data || [];

    if (this.customStatusEnabled && Array.isArray(statusData) && statusData.length > 0) {
      setTimeout(() => this.customStatus(), 2000);
    } else {
      if (!this.customStatusEnabled) {
        fuck_logger("log", "Custom status is disabled in config");
      } else if (!Array.isArray(statusData) || statusData.length === 0) {
        fuck_logger("warning", "No valid custom status data found");
      }
    }
  }

  _onError(error) {
    fuck_logger("error", `Client encountered an error: ${error.message || error}`);

    if (error.message && error.message.includes("WebSocket")) {
      fuck_logger("warning", "WebSocket error detected, attempting to continue...");
      return;
    }

    if (error.message && (error.message.includes("voice") || error.message.includes("connection was established"))) {
      fuck_logger("warning", "Voice connection error detected, continuing without voice...");
      return;
    }

    if (error.message && error.message.includes("Cannot read properties of null")) {
      fuck_logger("warning", "Attempting to recover from null property error...");
      if (this.user && !this.user.settings) {
        this.user.settings = {
          friend_source_flags: { all: true },
          custom_status: null,
          status: "online",
        };
      }
    }
  }

  async _onMessage(message) {
    try {
      if (message.author.id !== this.user.id) return;
      if (!this.voiceEnabled) {
        fuck_logger("log", `Voice commands disabled for token: ${this.maskToken(this.TOKEN)}`);
        return;
      }

      const prefix = this.voiceConfig.data || "sx!";
      if (!message.content.startsWith(prefix)) return;

      const args = message.content.slice(prefix.length).trim().split(" ");
      let command = args[0];
      const channelId = args[1];
      const url = args[2];

      const aliases = {
        j: "join",
        pl: "play-live",
        pc: "play-cam",
        s: "stop-stream",
        l: "leave",
        ls: "list"
      };

      if (aliases[command]) command = aliases[command];

      if (!command) {
        fuck_logger("warning", `Usage: ${prefix} <join|leave|list|play-live|play-cam|stop-stream>`);
        return;
      }

      switch (command.toLowerCase()) {
        case "join":
          if (!channelId) return fuck_logger("warning", `Usage: ${prefix} j <channelId>`);
          if (this.voiceConfig.ffmpegEnabled) {
            // Use ffmpeg streamer for joining (supports streaming features)
            const channel = this.channels.cache.get(channelId);
            if (!channel) {
              fuck_logger("error", `Channel ${channelId} not found`);
              break;
            }
            const isVoice = channel.type === 2 || channel.type === "GUILD_VOICE" || channel.type === 13;
            if (!isVoice) {
              fuck_logger("error", `Channel ${channelId} is not a voice channel`);
              break;
            }
            fuck_logger("log", `Joining voice channel with ffmpeg streamer: ${channel.name}`);
            await this.streamer.joinVoice(channel.guild.id, channelId);
            fuck_logger("success", `Connected to voice channel (ffmpeg mode): ${channel.name}`);
          } else {
            await this.connectToVoiceChannel(channelId, true, true, false);
          }
          break;

        case "play-live":
        case "play-cam":
          if (!this.voiceConfig.ffmpegEnabled) {
            fuck_logger("warning", "ffmpeg is disabled in config. Enable it with 'ffmpeg: true' to use streaming commands.");
            break;
          }
          if (!channelId || !url) return fuck_logger("warning", `Usage: ${prefix} ${command} <channelId> <url>`);
          await this.playVideoStream(channelId, url);
          break;

        case "stop-stream":
          this.stopStream();
          break;

        case "leave":
          this.stopStream();
          if (channelId) this.disconnectFromVoiceChannel(channelId);
          else {
            this.streamer.leaveVoice();
            for (const [id] of this.voiceConnections) this.disconnectFromVoiceChannel(id);
          }
          break;

        case "list":
          fuck_logger("success", "Available voice channels:");
          this.channels.cache.forEach(ch => {
            if (ch.type === 2 || ch.type === "GUILD_VOICE") {
              console.log(`- ${ch.name} (${ch.id})`);
            }
          });
          break;

        default:
          fuck_logger("warning", `Unknown command: ${command}`);
          break;
      }
    } catch (err) {
      fuck_logger("error", `Error processing voice command: ${err.message}`);
    }
  }


  async resolveStreamUrl(url) {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const needsResolution = /youtube\.com|youtu\.be|twitch\.tv|twitter\.com|x\.com/i.test(url);

    if (!needsResolution) {
      return url;
    }

    fuck_logger("log", "Resolving stream URL...");

    try {
      if (/youtube\.com|youtu\.be/i.test(url)) {
        const commands = [
          { cmd: 'yt-dlp', args: '-f 18 --get-url' },
          { cmd: 'yt-dlp', args: '-f "bestvideo[ext=mp4][protocol=https]+bestaudio[ext=m4a][protocol=https]/best[protocol=https][protocol!*=m3u]" --get-url' },
          { cmd: 'yt-dlp', args: '-f "best[protocol=https][protocol!*=m3u]" --get-url' },
          { cmd: 'yt-dlp', args: '-f "best" --get-url --no-check-formats' },
          { cmd: 'youtube-dl', args: '-f 18 -g' }
        ];

        for (const { cmd, args } of commands) {
          try {
            fuck_logger("log", `Trying ${cmd} with format selection...`);
            const { stdout, stderr } = await execAsync(`${cmd} ${args} "${url}"`, { timeout: 20000 });
            const resolvedUrl = stdout.trim().split('\n')[0];

            if (resolvedUrl && resolvedUrl.startsWith('http')) {
              if (resolvedUrl.includes('.m3u8') || resolvedUrl.includes('/manifest/')) {
                fuck_logger("warning", "Skipping HLS manifest URL, trying next format...");
                continue;
              }
              fuck_logger("success", `Stream URL resolved with ${cmd}`);
              return resolvedUrl;
            }
          } catch (cmdError) {
            fuck_logger("warning", `${cmd} with these args failed, trying next...`);
            continue;
          }
        }
      }

      if (/youtube\.com|youtu\.be/i.test(url)) {
        try {
          const ytdl = require('ytdl-core');
          fuck_logger("log", "Using ytdl-core to resolve YouTube URL...");

          const info = await ytdl.getInfo(url);
          const format = ytdl.chooseFormat(info.formats, {
            quality: 'highest',
            filter: (format) => format.hasVideo && format.hasAudio
          });

          if (format && format.url) {
            fuck_logger("success", "YouTube URL resolved with ytdl-core");
            return format.url;
          }
        } catch (ytdlError) {
          fuck_logger("warning", `ytdl-core failed: ${ytdlError.message}`);
        }
      }

      const commands = [
        'yt-dlp -f "best[ext=mp4]/best" --get-url',
        'youtube-dl -f "best[ext=mp4]/best" -g'
      ];

      for (const cmd of commands) {
        try {
          const { stdout } = await execAsync(`${cmd} "${url}"`, { timeout: 15000 });
          const resolvedUrl = stdout.trim().split('\n')[0];
          fuck_logger("success", `Stream URL resolved with ${cmd.split(' ')[0]}`);
          return resolvedUrl;
        } catch (cmdError) {
          fuck_logger("warning", `${cmd.split(' ')[0]} not available or failed`);
          continue;
        }
      }

      throw new Error("No URL resolver available");

    } catch (error) {
      fuck_logger("error", `Failed to resolve URL: ${error.message}`);
      fuck_logger("warning", "Install one of these URL resolvers:");
      fuck_logger("warning", "  Option 1: pip install yt-dlp (recommended)");
      fuck_logger("warning", "  Option 2: Download yt-dlp.exe from https://github.com/yt-dlp/yt-dlp/releases");
      fuck_logger("warning", "  Option 3: npm install ytdl-core (may not work with recent YouTube changes)");
      throw new Error("Could not resolve streaming URL. Install yt-dlp.");
    }
  }

  async playVideoStream(channelId, url) {
    try {
      const channel = this.channels.cache.get(channelId);
      if (!channel) {
        fuck_logger("error", `Channel ${channelId} not found`);
        return;
      }

      const isVoice =
        channel.type === 2 || channel.type === "GUILD_VOICE" || channel.type === 13;
      if (!isVoice) {
        fuck_logger("error", `Channel ${channelId} is not a voice channel`);
        return;
      }

      const current = this.user?.voice?.channelId;
      if (current) {
        if (current === channelId) {
          fuck_logger("log", `Already connected to ${channelId}, proceeding with stream...`);
        } else {
          fuck_logger("log", `Already in ${current}, leaving before rejoining...`);
          await this.streamer.leaveVoice().catch(() => { });
          fuck_logger("log", `Joining voice channel ${channel.guild.id}/${channelId}`);
          await this.streamer.joinVoice(channel.guild.id, channelId);
        }
      } else {
        fuck_logger("log", `Joining voice channel ${channel.guild.id}/${channelId}`);
        await this.streamer.joinVoice(channel.guild.id, channelId);
      }

      const { StageChannel } = require("discord.js-selfbot-v13");
      if (channel instanceof StageChannel) {
        await this.user?.voice?.setSuppressed(false).catch(() => { });
      }

      if (this.streamController) {
        fuck_logger("log", "Stopping existing stream before starting new one...");
        this.streamController.abort();
      }
      this.streamController = new AbortController();

      fuck_logger("success", `Preparing stream from: ${url}`);

      let streamUrl;
      try {
        streamUrl = await this.resolveStreamUrl(url);
      } catch (resolveError) {
        fuck_logger("error", resolveError.message);
        this.streamer.leaveVoice();
        return;
      }

      fuck_logger("log", `Using resolved URL for streaming`);

      const { command, output } = prepareStream(
        streamUrl,
        {
          width: this.streamConfig.width,
          height: this.streamConfig.height,
          frameRate: this.streamConfig.fps,
          bitrateVideo: this.streamConfig.bitrateKbps,
          bitrateVideoMax: this.streamConfig.maxBitrateKbps,
          hardwareAcceleratedDecoding: this.streamConfig.hardwareAcceleration,
          videoCodec: Utils.normalizeVideoCodec(this.streamConfig.videoCodec)
        },
        this.streamController.signal
      );

      command.on("error", (err) => {
        fuck_logger("error", "FFmpeg error occurred");
        fuck_logger("error", err.message);
      });

      fuck_logger("success", `Starting video stream in ${channel.name}`);

      await playStream(output, this.streamer, undefined, this.streamController.signal)
        .catch((err) => {
          fuck_logger("error", `Stream playback error: ${err.message}`);
          this.streamController?.abort();
        });

      this.isRunningStream = true;
      this.voiceConnections.set(channelId, { channel, streaming: true });

    } catch (error) {
      fuck_logger("error", `Failed to play video stream: ${error.message}`);
      this.stopStream();
    }
  }

  stopStream() {
    if (this.streamController) {
      fuck_logger("log", "Stopping video stream...");
      this.streamController.abort();
      this.streamController = null;
      this.isRunningStream = false;
      fuck_logger("success", "Video stream stopped");
    } else {
      fuck_logger("warning", "No active stream to stop");
    }
  }

  async connectToVoiceChannel(channelId, selfMute = true, selfDeaf = true, createStream = false) {
    try {
      const channel = this.channels.cache.get(channelId);
      if (!channel) {
        fuck_logger("error", `Channel ${channelId} not found`);
        return null;
      }

      if (channel.type !== 2 && channel.type !== 'GUILD_VOICE') {
        fuck_logger("error", `Channel ${channelId} is not a voice channel`);
        return null;
      }

      const connectionOptions = { selfMute, selfDeaf, selfVideo: false };
      let connection;

      try {
        connection = await this.voice.joinChannel(channel, connectionOptions);
      } catch (error) {
        fuck_logger("error", `Failed to connect to ${channel.name}: ${error.message}`);
        return null;
      }

      if (!connection) {
        fuck_logger("error", `Failed to connect to ${channel.name}`);
        return null;
      }

      fuck_logger("success", `Connected to voice channel: ${channel.name}`);
      this.voiceConnections.set(channelId, connection);

      if (createStream) {
        try {
          const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
          const player = createAudioPlayer();
          const resource = createAudioResource('./audio.mp3');
          player.play(resource);
          connection.subscribe(player);

          fuck_logger("success", `Audio stream started in ${channel.name}`);
        } catch (streamError) {
          fuck_logger("error", `Failed to create stream in ${channel.name}: ${streamError.message}`);
        }
      }

      return connection;
    } catch (error) {
      fuck_logger("error", `Failed to connect to voice channel ${channelId}: ${error.message}`);
      return null;
    }
  }

  disconnectFromVoiceChannel(channelId) {
    try {
      const connection = this.voiceConnections.get(channelId);
      if (connection) {
        if (connection.disconnect) {
          connection.disconnect();
        }
        this.voiceConnections.delete(channelId);
        fuck_logger("success", `Disconnected from channel ${channelId}`);
      } else {
        fuck_logger("warning", `No active connection found for channel ${channelId}`);
      }
    } catch (error) {
      fuck_logger("error", `Error disconnecting from voice channel: ${error.message}`);
    }
  }

  startPingChecker() {
    const checkerId = setInterval(() => {
      if (this.isRunningStream) return;

      try {
        if (this.ws && this.ws.status === 0 && this.ws.ping < 3000) {
          if (this.restartCount > 0) {
            fuck_logger("success", `Connection stabilized for token: ${this.maskToken(this.TOKEN)}`);
            this.restartCount = 0;
          }
        }
      } catch (err) {
        fuck_logger("error", `Error in ping checker: ${err.message}`);
      }
    }, 30000);

    this.intervals.add(checkerId);
  }

  getDefaultActivityName(activityType, platform) {
    if (platform) return platform;

    switch (activityType) {
      case "STREAMING":
        return "Streaming";
      case "PLAYING":
        return "Playing";
      case "LISTENING":
        return "Listening to";
      case "WATCHING":
        return "Watching";
      case "COMPETING":
        return "Competing in";
      default:
        return "Activity";
    }
  }

  async streaming() {
    if (this.isRunningStream) return;

    this.isRunningStream = true;
    try {
      const currentTime = Date.now();
      let connectionHasIssues = false;

      if (!this.ws || this.ws.status !== 0) {
        connectionHasIssues = true;
      } else if (this.ws.ping > 5000) {
        connectionHasIssues = true;
      }

      if (connectionHasIssues) {
        if (this.restartCount < 5 && currentTime - this.lastRestartTime > 60000) {
          this.lastRestartTime = currentTime;
          this.restartCount++;
          fuck_logger("warning", `Connection issues detected, reconnection attempt #${this.restartCount}`);
          setTimeout(() => this.streaming(), Math.max(10000, this.rpcConfig.delay));
          this.isRunningStream = false;
          return;
        }
      }

      const watchUrls = [];
      if (this.rpcConfig.twitchURL) watchUrls.push(this.rpcConfig.twitchURL);
      if (this.rpcConfig.youtubeURL) watchUrls.push(this.rpcConfig.youtubeURL);

      let watchUrl = null;
      if (watchUrls.length > 0) {
        watchUrl = watchUrls[this.index.url % watchUrls.length];
      }

      if (this.activityType === "STREAMING") {
        if (!watchUrl || !this.getExternal.isValidURL(watchUrl)) {
          fuck_logger("warning", "No valid streaming URL found for STREAMING type. Using fallback URL.");
          watchUrl = "https://www.twitch.tv/4levy_z1";
        }
      }

      let platform = "";
      if (watchUrl) {
        if (watchUrl.includes("twitch.tv")) {
          platform = "Twitch";
        } else if (watchUrl.includes("youtube.com") || watchUrl.includes("youtu.be")) {
          platform = "YouTube";
        } else if (watchUrl.includes("spotify.com")) {
          platform = "Spotify";
        } else {
          platform = "Custom";
        }
      }

      const presence = new RichPresence(this)
        .setApplicationId("1438613688406769778")
        .setType(this.activityType);

      if (this.activityType === "LISTENING") {
        if (this.rpcConfig.timestamp && this.rpcConfig.timestamp.start && this.rpcConfig.timestamp.end) {
          const start = this.parseTimestamp(this.rpcConfig.timestamp.start);
          const end = this.parseTimestamp(this.rpcConfig.timestamp.end);
          if (start && end) {
            const total = end - start;
            const current = Date.now() % total;
            presence.setStartTimestamp(Date.now() - current)
              .setEndTimestamp(Date.now() + (total - current));
          }
        }
      } else if (this.activityType === "STREAMING" && watchUrl) {
        presence.setURL(watchUrl);
      }

      const details = this.getNextItem(this.rpcConfig.details, 'details');
      let activityName;

      if (this.activityType === "STREAMING" && platform) {
        if (platform === "Twitch") {
          activityName = "Twitch";
        } else if (platform === "YouTube") {
          activityName = "YouTube";
        } else if (platform === "Spotify") {
          activityName = "Spotify";
        } else {
          activityName = platform;
        }
      } else {
        activityName = this.SPT(details) || this.getDefaultActivityName(this.activityType, platform);
      }

      presence.setName(activityName);

      // Set details
      if (details) {
        presence.setDetails(this.SPT(details));
      }

      // Set state
      const state = this.getNextItem(this.rpcConfig.state, 'state');
      if (state) {
        presence.setState(this.SPT(state));
      }

      // Set assets
      const largeText = this.getNextItem(this.rpcConfig.assetsLargeText, 'assetsLargeText');
      if (largeText) {
        presence.setAssetsLargeText(this.SPT(largeText));
      }

      const smallText = this.getNextItem(this.rpcConfig.assetsSmallText, 'assetsSmallText');
      if (smallText) {
        presence.setAssetsSmallText(this.SPT(smallText));
      }

      const largeImage = this.getNextItem(this.rpcConfig.assetsLargeImage, 'assetsLargeImage');
      const smallImage = this.getNextItem(this.rpcConfig.assetsSmallImage, 'assetsSmallImage');

      if (largeImage || smallImage) {
        try {
          const processedLargeImage = largeImage ? this.SPT(largeImage) : null;
          const processedSmallImage = smallImage ? this.SPT(smallImage) : null;

          const images = await this.getImage(processedLargeImage, processedSmallImage);
          if (images.bigImage) {
            presence.setAssetsLargeImage(images.bigImage);
          }
          if (images.smallImage) {
            presence.setAssetsSmallImage(images.smallImage);
          }
        } catch (imgError) {
          fuck_logger("warning", `Failed to set images: ${imgError.message}`);
        }
      }

      if (this.rpcConfig.timestamp.start || this.rpcConfig.timestamp.end) {
        if (this.rpcConfig.timestamp.start) {
          const start = this.parseTimestamp(this.rpcConfig.timestamp.start);
          if (start) presence.setStartTimestamp(start);
        }
        if (this.rpcConfig.timestamp.end) {
          const end = this.parseTimestamp(this.rpcConfig.timestamp.end);
          if (end) presence.setEndTimestamp(end);
        }
      }

      if (this.rpcConfig.buttonFirst && this.rpcConfig.buttonFirst.length > 0) {
        try {
          const button1 = this.rpcConfig.buttonFirst[0];
          if (button1 && button1.label && button1.url) {
            presence.addButton(this.SPT(button1.label), button1.url);
          }
        } catch (buttonError) {
          fuck_logger("warning", `Failed to add button 1: ${buttonError.message}`);
        }
      }

      if (this.rpcConfig.buttonSecond && this.rpcConfig.buttonSecond.length > 0) {
        try {
          const button2 = this.rpcConfig.buttonSecond[0];
          if (button2 && button2.label && button2.url) {
            presence.addButton(this.SPT(button2.label), button2.url);
          }
        } catch (buttonError) {
          fuck_logger("warning", `Failed to add button 2: ${buttonError.message}`);
        }
      }

      if (this.customStatusEnabled) {
        this.currentStreamingActivity = presence;
      } else {
        try {
          await this.user?.setPresence({
            activities: [presence],
            status: "online",
          });
        } catch (presenceError) {
          fuck_logger("warning", `Failed to update presence: ${presenceError.message}`);
        }
      }

      this.updateIndices();

      setTimeout(() => this.streaming(), this.rpcConfig.delay);
    } catch (error) {
      fuck_logger("error", `Error in streaming method: ${error.message}`);
      setTimeout(() => this.streaming(), 30000);
    } finally {
      this.isRunningStream = false;
    }
  }

  updateIndices() {
    this.lib.count++;

    const urlCount = [this.rpcConfig.twitchURL, this.rpcConfig.youtubeURL].filter(Boolean).length;
    this.index.url = (this.index.url + 1) % Math.max(1, urlCount);

    this.index.bt_1 = (this.index.bt_1 + 1) % Math.max(1, this.rpcConfig.buttonFirst?.length || 1);
    this.index.bt_2 = (this.index.bt_2 + 1) % Math.max(1, this.rpcConfig.buttonSecond?.length || 1);
  }

  async customStatus() {
    try {
      if (!this.statusConfig || !this.statusConfig.data) {
        fuck_logger("warning", "No status configuration found");
        return;
      }

      const statusData = this.statusConfig.data;
      const delay = Math.max(this.statusConfig.delay || 4000, 4000);

      if (!Array.isArray(statusData) || statusData.length === 0) {
        fuck_logger("warning", "No status data available");
        return;
      }

      const currentStatus = statusData[this.index.status];
      if (!currentStatus) {
        this.index.status = 0;
        return;
      }

      let emoji = "";
      let text = "";

      if (typeof currentStatus === "string") {
        const spaceIndex = currentStatus.indexOf(" ");
        if (spaceIndex > 0) {
          emoji = currentStatus.substring(0, spaceIndex).trim();
          text = currentStatus.substring(spaceIndex + 1).trim();
        } else {
          text = currentStatus.trim();
        }
      } else if (typeof currentStatus === "object") {
        emoji = currentStatus.emoji || "";
        text = currentStatus.text || "";
      }

      const customStatus = new CustomStatus(this)
        .setEmoji(this.replaceVariables(emoji))
        .setState(this.replaceVariables(text));

      const currentPresence = this.user?.presence;
      const activities = [customStatus];

      if (this.currentStreamingActivity) {
        activities.push(this.currentStreamingActivity);
      }

      await this.user?.setPresence({
        activities: activities,
        status: currentPresence?.status || "online",
      });

      this.index.status = (this.index.status + 1) % statusData.length;

      setTimeout(() => this.customStatus(), delay);

    } catch (error) {
      fuck_logger("error", `Custom status error: ${error.message}`);
      setTimeout(() => this.customStatus(), 10000);
    }
  }

  async getImage(bigImg, smallImg) {
    try {
      const validBigImg = bigImg && bigImg.trim() && this.getExternal.isValidURL(bigImg) ? bigImg : null;
      const validSmallImg = smallImg && smallImg.trim() && this.getExternal.isValidURL(smallImg) ? smallImg : null;

      if (!validBigImg && !validSmallImg) {
        return { bigImage: null, smallImage: null };
      }

      const cachedBigImage = validBigImg ? this.cacheImage.get(validBigImg) : null;
      const cachedSmallImage = validSmallImg ? this.cacheImage.get(validSmallImg) : null;

      let fetchedImages = { bigImage: null, smallImage: null };
      try {
        fetchedImages = await this.getExternal.get(validBigImg, validSmallImg);
      } catch (error) {
        fuck_logger("warning", `Error fetching images: ${error.message}`);
      }

      const finalBigImage = fetchedImages.bigImage || cachedBigImage || null;
      const finalSmallImage = fetchedImages.smallImage || cachedSmallImage || null;

      if (fetchedImages.bigImage && validBigImg) this.cacheImage.set(validBigImg, fetchedImages.bigImage);
      if (fetchedImages.smallImage && validSmallImg) this.cacheImage.set(validSmallImg, fetchedImages.smallImage);

      return { bigImage: finalBigImage, smallImage: finalSmallImage };
    } catch (error) {
      fuck_logger("warning", `Image processing error: ${error.message}`);
      return { bigImage: null, smallImage: null };
    }
  }

  getNextItem(array, indexKey) {
    if (!array || array.length === 0) return null;
    const item = array[this.index[indexKey] % array.length];
    this.index[indexKey]++;
    return item;
  }

  parseTimestamp(timestamp) {
    if (!timestamp) return null;
    if (typeof timestamp === 'number') return timestamp;
    if (typeof timestamp === 'string') {
      const date = new Date(timestamp);
      return date.getTime();
    }
    return null;
  }

  SPT(text) {
    if (!text) return text || null;

    try {
      const { weather, sys, emoji, textFont } = this;
      const currentMoment = moment()
        .locale("th")
        .tz(weather.tz || this.config.OPTIONS?.tz || this.config.options?.tz || "Asia/Bangkok");

      const day = currentMoment.date();
      const daySuffix = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
        }
      };
      const dayWithSuffix = `${day}${daySuffix(day)}`;
      const currentMomentEN = currentMoment.clone().locale("en");

      const variables = {
        // Time
        "hour:1": currentMoment.format("HH"),
        "hour:2": currentMoment.format("hh"),
        "min:1": currentMoment.format("mm"),
        "min:2": currentMoment.format("mm A"),
        // Time (EN)
        "time:en:24": currentMomentEN.format("HH:mm"),
        "time:en:12": currentMomentEN.format("hh:mm A"),
        "hour:en": currentMomentEN.format("hh"),
        "minute:en": currentMomentEN.format("mm"),
        "ampm:en": currentMomentEN.format("A"),
        // Thai Date
        "th=date": currentMoment.format("D"),
        "th=week:1": currentMoment.format("ddd"),
        "th=week:2": currentMoment.format("dddd"),
        "th=month:1": currentMoment.format("M"),
        "th=month:2": currentMoment.format("MMM"),
        "th=month:3": currentMoment.format("MMMM"),
        "th=year:1": (parseInt(currentMoment.format("YYYY")) + 543).toString().slice(-2),
        "th=year:2": (parseInt(currentMoment.format("YYYY")) + 543).toString(),
        // English Date
        "en=date": currentMoment.locale("en").format("Do"),
        "en=week:1": currentMoment.locale("en").format("ddd"),
        "en=week:2": currentMoment.locale("en").format("dddd"),
        "en=month:1": currentMoment.locale("en").format("M"),
        "en=month:2": currentMoment.locale("en").format("MMM"),
        "en=month:3": currentMoment.locale("en").format("MMMM"),
        "en=year:1": currentMoment.locale("en").format("YY"),
        "en=year:2": currentMoment.locale("en").format("YYYY"),
        // Weather
        "city": weather.name || "Unknown",
        "region": weather.region || "",
        "country": weather.country || "",
        "lat": weather.lat || 0,
        "lon": weather.lon || 0,
        "tz_id": weather.tz_id || "",
        "localtime": weather.localtime || "",
        "last_updated": weather.last_updated || "",
        "temp:c": weather.temp_c ?? 0,
        "temp:f": weather.temp_f ?? 32,
        "is_day": weather.is_day ?? 0,
        "condition:text": weather.condition?.text || "",
        "condition:icon": weather.condition?.icon || "",
        "condition:code": weather.condition?.code || 0,
        "wind:kph": weather.wind_kph ?? 0,
        "wind:mph": weather.wind_mph ?? 0,
        "wind:degree": weather.wind_degree ?? 0,
        "wind:dir": weather.wind_dir || "N",
        "gust:kph": weather.gust_kph ?? 0,
        "gust:mph": weather.gust_mph ?? 0,
        "pressure:mb": weather.pressure_mb ?? 1013,
        "pressure:in": weather.pressure_in ?? 29.92,
        "precip:mm": weather.precip_mm ?? 0,
        "precip:in": weather.precip_in ?? 0,
        "humidity": weather.humidity ?? 50,
        "cloud": weather.cloud ?? 0,
        "feelslike:c": weather.feelslike_c ?? 0,
        "feelslike:f": weather.feelslike_f ?? 32,
        "windchill:c": weather.windchill_c ?? 0,
        "windchill:f": weather.windchill_f ?? 32,
        "heatindex:c": weather.heatindex_c ?? 0,
        "heatindex:f": weather.heatindex_f ?? 32,
        "dewpoint:c": weather.dewpoint_c ?? 0,
        "dewpoint:f": weather.dewpoint_f ?? 32,
        "uv": weather.uv ?? 0,
        "vis:km": weather.vis_km ?? 10,
        "vis:mi": weather.vis_miles ?? 6.2,
        "co": weather.co ?? 0,
        "no2": weather.no2 ?? 0,
        "o3": weather.o3 ?? 0,
        "so2": weather.so2 ?? 0,
        "pm2.5": weather.pm2_5 ?? 0,
        "pm10": weather.pm10 ?? 0,
        "us_epa_index": weather.us_epa_index ?? 0,
        "gb_defra_index": weather.gb_defra_index ?? 0,

        // System
        "ping": Math.round(this.ws?.ping || 0),
        "cpu:name": sys.cpuName || "CPU",
        "cpu:cores": sys.cpuCores || 1,
        "cpu:speed": sys.cpuSpeedGHz || "0.0",
        "cpu:usage": sys.cpuUsage || 0,
        "ram:usage": sys.ramUsage || 0,
        "uptime:days": Math.trunc(os.uptime() / 86400),
        "uptime:hours": Math.trunc((os.uptime() / 3600) % 24),
        "uptime:minutes": Math.trunc((os.uptime() / 60) % 60),
        "uptime:seconds": Math.trunc(os.uptime() % 60),

        // User
        "user:name": this.user?.username || "User",
        "user:icon": this.user?.displayAvatarURL({ dynamic: true, size: 1024 }) || "",
        "user:banner": this.user?.bannerURL({ dynamic: true, size: 1024 }) || "",
        "guild=members": (guildId) => {
          try {
            return this.guilds.cache.get(guildId)?.memberCount || "?";
          } catch (e) {
            return "?";
          }
        },
        "guild=name": (guildId) => {
          try {
            return this.guilds.cache.get(guildId)?.name || "Unknown";
          } catch (e) {
            return "Unknown";
          }
        },
        "guild=icon": (guildId) => {
          try {
            return this.guilds.cache.get(guildId)?.iconURL() || "";
          } catch (e) {
            return "";
          }
        },
        "emoji:time": emoji.getTime(currentMoment.format("HH")),
        "emoji:clock": () => emoji.getClock(currentMoment.format("HH")),
        random: (text) => {
          try {
            const options = text.split(",").map((t) => t.trim());
            return options[Math.floor(Math.random() * options.length)];
          } catch (e) {
            return text;
          }
        },
      };

      const processFont = (fontNum, content) => {
        try {
          const processedContent = content.replace(
            /\{([^{}]+)\}/g,
            (_, key) => {
              if (key in variables) {
                const value = variables[key];
                return typeof value === 'function' ? (value() ?? "") : (value ?? "");
              }

              if (key.includes(':')) {
                const [funcName, param] = key.split(':', 2);
                if (funcName in variables && typeof variables[funcName] === 'function') {
                  try {
                    return variables[funcName](param) ?? "";
                  } catch (e) {
                    return key;
                  }
                }
              }

              return key;
            }
          );
          return (
            textFont[`getFont${fontNum}`]?.(processedContent) ||
            processedContent
          );
        } catch (e) {
          return content;
        }
      };

      const processText = (input) => {
        try {
          return input
            .replace(/\{NF(\d)\((.*?)\)\}/g, (_, num, content) => {
              return processFont(num, content);
            })
            .replace(/\{([^{}]+)\}/g, (_, key) => {
              if (key in variables) {
                const value = variables[key];
                return typeof value === 'function' ? (value() ?? "") : (value ?? "");
              }
              if (key.includes(':')) {
                const [funcName, param] = key.split(':', 2);
                if (funcName in variables && typeof variables[funcName] === 'function') {
                  try {
                    return variables[funcName](param) ?? "";
                  } catch (e) {
                    return key;
                  }
                }
              }

              return key;
            });
        } catch (e) {
          return input;
        }
      };

      let result = text;
      let prev;
      let iterations = 0;
      const MAX_ITERATIONS = 5;

      do {
        prev = result;
        result = processText(prev);
        iterations++;
      } while (result !== prev && iterations < MAX_ITERATIONS);

      return result;
    } catch (error) {
      fuck_logger("error", `Error in SPT: ${error.message}`);
      return text;
    }
  }

  replaceVariables(text) {
    return this.SPT(text);
  }

  startInterval(callback, interval) {
    const id = setInterval(callback, interval);
    this.intervals.add(id);
    return id;
  }

  stopAllIntervals() {
    for (let id of this.intervals) clearInterval(id);
    this.intervals.clear();

    for (const [channelId, connection] of this.voiceConnections) {
      try {
        connection.disconnect();
      } catch (error) {
        fuck_logger("warning", `Error disconnecting from voice channel ${channelId}: ${error.message}`);
      }
    }
    this.voiceConnections.clear();
  }

  maskToken(token) {
    const parts = token.split(".");
    if (parts.length < 2) return token;
    return `${parts[0]}.##########`;
  }

  async start() {
    try {
      try {
        await this.weather.update();
        await this.sys.update();
      } catch (initError) {
        fuck_logger("warning", `Info initialization error: ${initError.message}`);
      }

      const originalLoginMethod = this.login;
      this.login = async function (token) {
        try {
          try {
            const path = require.resolve("discord.js-selfbot-v13");
            const basePath = path.substring(0, path.indexOf("node_modules") + "node_modules".length);
            const READYPath = `${basePath}/discord.js-selfbot-v13/src/client/websocket/handlers/READY`;
            const READY = require(READYPath);

            const originalHandler = READY.exports;
            READY.exports = function (client, packet) {
              if (packet && packet.d && packet.d.user_settings) {
                if (!packet.d.user_settings.friend_source_flags) {
                  packet.d.user_settings.friend_source_flags = { all: false };
                }
              }
              return originalHandler(client, packet);
            };
            fuck_logger("success", "Successfully patched READY handler");
          } catch (e) {
            fuck_logger("warning", `Failed to patch READY handler: ${e.message}`);
          }

          return await originalLoginMethod.call(this, token);
        } catch (loginError) {
          fuck_logger("error", `Login error: ${loginError.message}`);
          throw loginError;
        }
      };

      await this.login(this.TOKEN);

      this.lib.timestamp = Date.now();
      const updateInterval = 60000;
      this.startInterval(() => this.sys.update(), updateInterval);

      await this.streaming();

      return {
        success: true,
        username: this.user?.tag || "Unknown",
      };
    } catch (error) {
      fuck_logger("error", `Client start error: ${error.message}`);
      this.destroy();
      return { success: false, error: error.message };
    }
  }

  end() {
    try {
      this.stopAllIntervals();
      this.destroy();
    } catch (error) {
      fuck_logger("error", `Error during client cleanup: ${error.message}`);
    }
  }
}

class nyx {
  constructor() {
    this.activeClients = new Map();
  }

  async startStream(config) {
    try {
      const inputs = config.INPUTS || config.inputs || [];
      const inputArray = Array.isArray(inputs) ? inputs : [inputs];

      const enabledTokens = inputArray.filter(input => input.ignore !== true && input.token);

      if (enabledTokens.length === 0) {
        fuck_logger("error", "No valid tokens found in configuration");
        return { success: false, error: "No valid tokens" };
      }

      let successCount = 0;
      let failedCount = 0;

      for (const input of enabledTokens) {
        try {
          const token = TokenCrypto.resolveToken(input.token);

          if (!token || token.includes("SELFBOT TOKEN")) {
            fuck_logger("warning", "Invalid token format, skipping");
            failedCount++;
            continue;
          }

          const client = new NyxClient(token, config);
          const result = await client.start();

          if (result.success) {
            this.activeClients.set(token, client);
            successCount++;
            fuck_logger("success", `READY: [${result.username}]`);
          } else {
            failedCount++;
            fuck_logger("error", `Failed to start token: ${client.maskToken(token)}`);
          }
        } catch (error) {
          failedCount++;
          fuck_logger("error", `Error with token: ${error.message}`);
        }
      }

      if (successCount > 0) {
        return {
          success: true,
          successCount,
          failedCount,
          totalCount: enabledTokens.length,
        };
      }

      return {
        success: false,
        failedCount,
        totalCount: enabledTokens.length,
      };
    } catch (error) {
      fuck_logger("error", `Stream start error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async stopStream() {
    try {
      for (const client of this.activeClients.values()) {
        client.end();
      }
      this.activeClients.clear();
      return true;
    } catch (error) {
      fuck_logger("error", `Error stopping streams: ${error.message}`);
      return false;
    }
  }
}

async function main() {
  try {
    console.clear();
    const rainbow = chalkAnimation.radar(ASCII);

    await new Promise(resolve => setTimeout(resolve, 2000));
    rainbow.stop();
    console.clear();
    console.log(ASCII)
    console.log('\n');

    fuck_logger_header(config.token ? "~/CONFIG/config.yml" : "~");

    const streamManager = new nyx();

    fuck_logger("success", "Loaded");

    const result = await streamManager.startStream(config);

    if (result.success) {
      fuck_logger("success", `Successfully started ${result.successCount}/${result.totalCount} client(s)`);
      if (result.failedCount > 0) {
        fuck_logger("warning", `Failed to start ${result.failedCount} client(s)`);
      }

      process.on('SIGINT', async () => {
        fuck_logger("info", "Shutting down gracefully...");
        await streamManager.stopStream();
        process.exit(0);
      });

    } else {
      fuck_logger("error", `Failed to start any clients. ${result.failedCount || 0} token(s) failed`);
      process.exit(1);
    }

  } catch (error) {
    fuck_logger("error", `Error starting the bot: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = new nyx();