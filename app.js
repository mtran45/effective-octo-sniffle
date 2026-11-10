const $ = (selector) => document.querySelector(selector);
const toast = (message) => { $('#toast-text').textContent = message; $('#toast').classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 2800); };
const findingNames = { setup: 'Get set a little earlier', contact: 'Meet the ball out in front', finish: 'Finish high and across' };
document.querySelectorAll('[data-finding]').forEach((item) => item.addEventListener('click', () => { const key = item.dataset.finding; document.querySelectorAll('.finding').forEach((f) => f.classList.toggle('active', f.dataset.finding === key)); document.querySelectorAll('.marker').forEach((m) => m.classList.toggle('selected', m.dataset.finding === key)); toast(`Jumped to ${findingNames[key]}`); }));
$('#play-btn').addEventListener('click', () => { $('#play-btn').textContent = $('#play-btn').textContent === 'Ⅱ' ? '▶' : 'Ⅱ'; toast($('#play-btn').textContent === 'Ⅱ' ? 'Playing clip' : 'Clip paused'); });
$('#upload-btn').addEventListener('click', () => $('#file-input').click());
$('#file-input').addEventListener('change', (event) => { if (event.target.files[0]) { toast(`${event.target.files[0].name} ready to upload`); $('#upload-btn').textContent = '✓ Video selected'; } });
$('#save-note').addEventListener('click', () => { $('#saved-state').textContent = 'Saved just now'; toast('Coach note saved'); });
$('#assign-btn').addEventListener('click', () => { $('#assign-btn').innerHTML = '✓ Assigned to Jordan'; $('#assign-btn').classList.add('assigned'); toast('Drill assigned to Jordan'); });
$('#change-drill').addEventListener('click', () => toast('Drill library opened'));
$('#add-finding').addEventListener('click', () => toast('Coach finding editor opened'));
$('#share-btn').addEventListener('click', () => toast('Review link copied'));
$('#complete-btn').addEventListener('click', () => { $('#complete-btn').innerHTML = '✓ Review complete'; toast('Review marked complete'); });
function showView(view) { const review = $('#review-view'); const other = $('#other-view'); if (view === 'review') { review.classList.remove('hidden'); other.classList.remove('show'); } else { review.classList.add('hidden'); other.classList.add('show'); $('#empty-title').textContent = view === 'history' ? 'Progress history' : view[0].toUpperCase() + view.slice(1); } document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === view)); }
document.querySelectorAll('[data-view]').forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));
