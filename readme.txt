Pentru rulare fisierului .ts am instalat npm install -g ts-node typescript "@types/node"
Si utilized ts-node typescript-file.ts ca sa-l rulez din command line.

I must add .js at the end of each import made in the javascript compiled files in order to get rid of that issue:
(That's it in my case. My IDE automatically omitted the .js file extension when I created the import statement. Adding .js to import { thing } from './file.js'; did the trick.)