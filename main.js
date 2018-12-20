// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');
const isMac = process.platform === 'darwin';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const template = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin'
    ? [
        {
          label: app.getName(),
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
            },
          ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' },
          ]
        : [{ role: 'close' }]),
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Developer Guide',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://manual.apiapp.co/developer-guide/');
        },
      },
      {
        label: 'Connectors',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://manual.apiapp.co/connectors/');
        },
      },
      { type: 'separator' },
      {
        label: 'Process flow',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal(
            'https://manual.apiapp.co/developer-guide/process-flow/untitled'
          );
        },
      },
      {
        label: 'API Management',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal(
            'https://manual.apiapp.co/developer-guide/api-management/introduction'
          );
        },
      },
      {
        label: 'Policies',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal(
            'https://manual.apiapp.co/developer-guide/policies'
          );
        },
      },
      { type: 'separator' },
      {
        label: 'Website',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://apiapp.co');
        },
      },
      {
        label: 'Blog',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://apiapp.co/blog');
        },
      },
    ],
  },
];

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1350,
    minWidth: 1281,
    minHeight: 800,
    title: 'api App Platform',
    icon: path.join(__dirname, 'build/icons/1024.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, 'build/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  // Create the Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
