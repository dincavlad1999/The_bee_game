I used typescript dependency in order to compile the Typescript code to Javascript (tsconfig.json = typescript compiler configurations).
I used VS Code as IDE and the Live Server VS Code Extension(ritwickdey.LiveServer) in order to launch the project from the index.html file.
I used Jasmine framework for runninng unit tests on the code(I made a tsconfig.spec.json for TS tests compiation and then I run them) ---> See package.json scripts
I used @types/jasmine in order to be able to write unit tests with Typescript.
!!! I had to mock the SessionStorage when doing unit tests because there is no way I can acces it from jasmine (node.js environment);