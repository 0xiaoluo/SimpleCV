document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const avatar = document.getElementById('avatar');
        const nameEl = document.getElementById('name');
        const subtitleEl = document.getElementById('subtitle');
        const tagsWrap = document.getElementById('tags-wrap');
        const introContent = document.getElementById('intro-content');
        const cardList = document.getElementById('card-list');
        const experienceSection = document.getElementById('experience-section');

        avatar.textContent = data.name ? data.name.charAt(0) : '?';
        nameEl.textContent = data.name || '';

        const nickname = data.nickname || '';
        if (nickname) {
            subtitleEl.textContent = nickname;
        } else {
            subtitleEl.style.display = 'none';
        }

        if (data.labels && data.labels.length > 0) {
            data.labels.forEach((label, index) => {
                const item = document.createElement('div');
                item.className = index > 0 ? 'tag-item skill' : 'tag-item';
                item.innerHTML = `
                    <span class="tag-label">${label.name}</span>
                    <span class="tag-value">${label.value}</span>`;
                tagsWrap.appendChild(item);
            });
        }

        introContent.textContent = data.description || '';

        if (data.experience && data.experience.length > 0) {
            data.experience.forEach(exp => {
                const item = document.createElement('div');
                item.className = 'card-item';

                const detailsHtml = exp.details && exp.details.length > 0
                    ? `<ul class="desc">
                        ${exp.details.filter(Boolean).map(d => `<li>${d}</li>`).join('')}
                       </ul>`
                    : '';

                item.innerHTML = `
                    <div class="card-item-card">
                        <div class="header">
                            <span class="title">${exp.unit || ''}</span>
                            <span class="date">${exp.time || ''}</span>
                        </div>
                        <div class="org">${exp.brief || ''}</div>
                        ${detailsHtml}
                    </div>`;

                cardList.appendChild(item);
            });
        } else {
            experienceSection.style.display = 'none';
        }
    } catch (error) {
        console.error(error);
    }
});
