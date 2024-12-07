import { app, BrowserWindow } from 'electron';  
//import { join } from 'path';  

function createWindow() {  
  const win = new BrowserWindow({  
    width: 800,  
    height: 600,  
    webPreferences: {  
      nodeIntegration: true,  
      contextIsolation: false,  
      preload: join('./preloads.js'),
    },  
  });  

  win.loadURL('http://localhost:3000'); // This points to your Next.js app  
}  

app.on('ready', createWindow);  

app.on('window-all-closed', () => {  
  if (process.platform !== 'darwin') {  
    app.quit();  
  }  
});  

app.on('activate', () => {  
  if (BrowserWindow.getAllWindows().length === 0) {  
    createWindow();  
  }  
});

