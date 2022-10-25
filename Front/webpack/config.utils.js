const path = require("path");
const getAbsPath = (dirOrFile) => path.resolve(process.cwd(), dirOrFile);
exports.getAbsPath = getAbsPath;
