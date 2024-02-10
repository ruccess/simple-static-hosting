/**
 * Render a file tree in the specified container.
 * @param {Array} data - The file tree data to be rendered.
 * @param {HTMLElement} container - The container where the file tree will be rendered.
 * @param {string} currentPath - The current path in the file tree.
 */
export function renderFileTree(data, container, currentPath) {
    // Remove existing file tree (if any)
    const existUl = container.querySelector('ul');
    if (existUl) {
        container.removeChild(existUl);
    }

    const ul = document.createElement("ul");
    const domainInput = document.getElementById("domain");
    const copyButton = createCopyButton();

    function createCopyButton() {
        const button = document.createElement("button");
        button.className = "copyButton";
        button.textContent = "Copy";
        return button;
    }

    function updateCopyButtonText(button) {
        button.textContent = "Copied";
        setTimeout(() => {
            button.textContent = "Copy";
        }, 1000);
    }

    data.forEach(item => {
        const li = document.createElement("li");

        // Handle folder items
        if (item.type === "folder") {
            const folderToggle = document.createElement("span");
            folderToggle.textContent = item.children ? "▼" : "▶";
            folderToggle.className = "folder-toggle";
            folderToggle.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleFolder(li, item.children, `${currentPath}${item.fileName}/`);
            });
            li.appendChild(folderToggle);
            li.classList.add("folder-li");
        }

        const icon = document.createElement("span");
        icon.className = "icon";

        switch (item.type) {
            case "folder":
                icon.textContent = "📁";
                break;
            case "text":
                icon.textContent = "📄";
                break;
            case "image":
                icon.textContent = "📷";
                break;
            case "js":
                icon.textContent = "📜";
                break;
            case "css":
                icon.textContent = "🎨";
                break;
            default:
                icon.textContent = "📁";
        }
        li.appendChild(icon);

        const fileLink = document.createElement("a");
        if (item.type !== "folder") {
            fileLink.href = `${domainInput.value}${currentPath}${item.fileName}`;
        }
        fileLink.textContent = item.fileName;

        const description = document.createElement("span");
        description.textContent = item.description || "";

        if (item.type !== "folder") {
            const copyButtonClone = copyButton.cloneNode(true);
            copyButtonClone.addEventListener("click", function () {
                copyToClipboard(`${domainInput.value}${currentPath}${item.fileName}`, item.type);
                updateCopyButtonText(copyButtonClone);
            });
            li.appendChild(copyButtonClone);
        }

        li.appendChild(fileLink);
        li.appendChild(description);

        ul.appendChild(li);
    });

    container.appendChild(ul);

    // Add click event listeners to folder list items for toggling
    const folderLiList = document.querySelectorAll(".folder-li");
    folderLiList.forEach(folderLi => {
        folderLi.addEventListener("click", function () {
            const folderToggle = folderLi.querySelector(".folder-toggle");
            folderToggle.click();
        });
    });

    /**
     * Copy the specified text to the clipboard with special handling for different file types.
     * @param {string} text - The text to be copied.
     * @param {string} fileType - The type of the file (image, css, js, etc.).
     */
    function copyToClipboard(text, fileType) {
        const tempInput = document.createElement("input");

        // Handle special formatting for different file types
        switch (fileType) {
            case "image":
                const imgTag = `<img src="${text}" alt="image" />`;
                tempInput.value = imgTag;
                break;
            case "css":
                tempInput.value = `<link rel="stylesheet" type="text/css" href="${text}" />`;
                break;
            case "js":
                tempInput.value = `<script src="${text}"></script>`;
                break;
            default:
                tempInput.value = text;
        }

        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }

    /**
     * Toggle the visibility of a folder in the file tree.
     * @param {HTMLElement} folderLi - The list item representing the folder.
     * @param {Array} children - The children items of the folder.
     * @param {string} currentPath - The current path in the file tree.
     */
    function toggleFolder(folderLi, children, currentPath) {
        folderLi.classList.toggle("open"); // Toggle the 'open' class
        const folderToggle = folderLi.querySelector(".folder-toggle");

        const folderUl = folderLi.querySelector("ul");
        if (folderUl) {
            folderUl.style.display = folderLi.classList.contains("open") ? "block" : "none";
        } else {
            const newFolderUl = document.createElement("ul");
            folderLi.appendChild(newFolderUl);
            renderFileTree(children, newFolderUl, currentPath);
        }
    }
}
