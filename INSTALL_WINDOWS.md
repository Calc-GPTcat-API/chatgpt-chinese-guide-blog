# Windows 本地运行

```powershell
cd C:\Users\Administrator\Desktop\chatgpt-chinese-guide-blog-bg-clean

dir package.json

taskkill /F /IM node.exe

Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

npm config set registry https://registry.npmmirror.com
npm config delete proxy
npm config delete https-proxy

npm install --no-audit --no-fund --legacy-peer-deps

npm run dev
```
