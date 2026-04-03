const canvas = document.getElementById('canvas');
const addBtn = document.getElementById('add-note');

let isDragging = false;
let currentTarget = null;
let offset = { x: 0, y: 0 };

// 메모 추가 함수
addBtn.addEventListener('click', () => {
    createNote(100, 100, "새로운 메모...");
});

function createNote(x, y, text) {
    const note = document.createElement('div');
    note.className = 'note';
    note.style.left = x + 'px';
    note.style.top = y + 'px';

    note.innerHTML = `
        <textarea>${text}</textarea>
        <div style="font-size: 10px; color: #aaa; text-align: right;">Drag Me</div>
    `;

    // 드래그 시작
    note.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'TEXTAREA') return; // 텍스트 입력시는 드래그 방지
        isDragging = true;
        currentTarget = note;
        offset.x = e.clientX - note.offsetLeft;
        offset.y = e.clientY - note.offsetTop;
        note.style.zIndex = 1000; // 잡은 놈을 맨 위로
    });

    canvas.appendChild(note);
}

// 마우스 이동 시 드래그 처리
document.addEventListener('mousemove', (e) => {
    if (!isDragging || !currentTarget) return;

    currentTarget.style.left = (e.clientX - offset.x) + 'px';
    currentTarget.style.top = (e.clientY - offset.y) + 'px';
});

// 드래그 종료
document.addEventListener('mouseup', () => {
    isDragging = false;
    if (currentTarget) {
        currentTarget.style.zIndex = 1;
        currentTarget = null;
    }
});