// domain.js
import { renderFileTree } from './renderFileTree.js';

document.addEventListener("DOMContentLoaded", function () {

    const domainInput = document.getElementById("domain");
    const domainList = document.getElementById("domainList");
    let fileTreeContainer = document.getElementById("fileTree");
    let domains, fileData;

    /**
     * Fetch data from data.json and render the file tree
     * @returns {Promise<void>}
     */
    async function fetchDataAndRender() {
        try {
            const response = await fetch('data.json');
            const jsonData = await response.json();

            // Extract domains and fileData
            domains = jsonData.domains;
            fileData = jsonData.fileData;

            // Add domains to datalist
            for (const domain of domains) {
                const option = document.createElement("option");
                option.value = domain;
                domainList.appendChild(option);
            }

            // Fetch and render data based on the input domain
            await handleDomainInput(fileData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /**
     * Event handler for domain input
     * @param {Array} fileData - The file tree data to be rendered.
     * @returns {Promise<void>}
     */
    async function handleDomainInput(fileData) {
        const selectedDomain = domainInput.value;
        // Fetch data and render only if in the predefined domain list
        await fetchDataAndRenderFileTree(fileData, selectedDomain);
    }

    /**
     * Fetch data and render the file tree
     * @param {Array} fileData - The file tree data to be rendered.
     * @param {string} domain - Selected domain
     */
    /**
     * Fetch data and render the file tree
     * @param {Array} fileData - The file tree data to be rendered.
     * @param {string} domain - Selected domain
     */
    async function fetchDataAndRenderFileTree(fileData, domain) {
        if (fileData) {
            renderFileTree(fileData, fileTreeContainer, domain);
        } else {
            console.error('File data is undefined.');
        }
    }


    // Add event listeners to the domain input
    if (domainInput) {
        domainInput.addEventListener("input", async function () {
            try {
                await handleDomainInput(fileData);
            } catch (error) {
                console.error('Error in input event handler:', error);
            }
        });

        domainInput.addEventListener("blur", async function () {
            try {
                await handleDomainInput(fileData);
            } catch (error) {
                console.error('Error in blur event handler:', error);
            }
        });

    } else {
        console.error("domainInput is null");
    }

    // Fetch and render data on initial load
    fetchDataAndRender().then(() => {
        console.log('Initial data fetch and render completed.');
    });
});
