const vscode = acquireVsCodeApi();

const foldersArea = document.getElementById('folders-area');
const rootArea = document.getElementById('root-area');
const hiddenArea = document.getElementById('hidden-area');
const hiddenList = document.getElementById('hidden-list');
const toggleBtn = document.getElementById('toggle-hidden');

window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'render') {
        renderData(message.data);
    }
});

function renderData(dataArray) {

    foldersArea.innerHTML = '';
    rootArea.innerHTML = '';
    hiddenList.innerHTML = '';

    //属于文件夹的放在 foldersMap 里，属于散落区的放在 rootList 里，属于隐藏区的放在 hiddenListData 里
    const foldersMap = {};
    const rootList = [];  
    const hiddenListData = []; 

    dataArray.forEach(ext => {
        if (ext.isHidden) {
            hiddenListData.push(ext);
        } else if (ext.belong) {
            if (!foldersMap[ext.belong]){ foldersMap[ext.belong] = [];}
            foldersMap[ext.belong].push(ext);
        } else {
            rootList.push(ext);
        }
    });

    //-------------------------渲染-------------------------
    Object.keys(foldersMap).forEach(folderName => {
        const title = document.createElement('div');
        title.className = 'folder-title';
        title.innerText = `[文件夹] ${folderName}`;
        foldersArea.appendChild(title);

        foldersMap[folderName].forEach(ext => {
            foldersArea.appendChild(createExtItem(ext, false));
        });
    });

    rootList.forEach(ext => {
        rootArea.appendChild(createExtItem(ext, false));
    });

    hiddenListData.forEach(ext => {
        hiddenList.appendChild(createExtItem(ext, true));
    });
}

//----------------------拓展列表DOM-----------------------
function createExtItem(ext, isHidden) {
    const item = document.createElement('div');
    item.className = 'ext-item';
    
    const icon = ext.iconUri || 'https://cdn.jsdelivr.net/npm/@vscode/codicons/dist/extension.svg';

    item.innerHTML = `
        <img class="ext-icon" src="${icon}">
        <div class="ext-info">
            <div class="ext-name">${ext.name}</div>
            <div class="ext-desc">${ext.description}</div>
            <div class="ext-version">v${ext.version}</div>
        </div>
        <div class="ext-actions">
            ${isHidden 
                ? `<button class="action-btn" title="显示">🔄</button>`
                : `<button class="action-btn" title="隐藏">👁️</button>`
            }
        </div>
    `;


    item.addEventListener('click', () => {
        vscode.postMessage({ command: 'openExtension', id: ext.id });
    });

    const btn = item.querySelector('.action-btn');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        vscode.postMessage({ 
            command: isHidden ? 'unhideExtension' : 'hideExtension', 
            id: ext.id 
        });
    });

    return item;
}


toggleBtn.addEventListener('click', () => {
    const isHiddenVisible = hiddenArea.style.display === 'block';
    hiddenArea.style.display = isHiddenVisible ? 'none' : 'block';
    toggleBtn.innerText = isHiddenVisible ? '显示已隐藏' : '隐藏已隐藏';
});