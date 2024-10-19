function extractDomain(url) {
    let domain;
    // Remove protocol (http, https), www, and extract domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    // Remove port number if present
    domain = domain.split(':')[0];
    return domain;
}

document.getElementById('clearHistory').addEventListener('click', () => {
    chrome.storage.local.set({visits: []}, () => {
        // Clear the displayed list and optionally show a message
        document.getElementById('sitesList').innerHTML = '';
        console.log('History cleared.');
    });
});

chrome.storage.local.get({visits: []}, (result) => {
    const list = document.getElementById('sitesList');
    list.innerHTML = ''; // Clear previous entries
    result.visits.forEach(visit => {
        const li = document.createElement('li');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = extractDomain(visit.url); // Use the domain name instead of the full URL
        titleSpan.className = 'site-title';

        const timeSpan = document.createElement('span');
        timeSpan.textContent = ` - Visited at: ${visit.time}`;
        timeSpan.className = 'site-time';

        li.appendChild(titleSpan);
        li.appendChild(timeSpan);
        list.appendChild(li);
    });
});
