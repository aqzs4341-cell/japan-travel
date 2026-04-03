const firebaseConfig = {
  apiKey: "AIzaSyCX4hr8AauLtShugeHdogIa9WlKG1GeLDA",
  authDomain: "japan-travel-b6597.firebaseapp.com",
  databaseURL: "https://japan-travel-b6597-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "japan-travel-b6597",
  storageBucket: "japan-travel-b6597.firebasestorage.app",
  messagingSenderId: "207320927993",
  appId: "1:207320927993:web:df014223249603767a1c28",
  measurementId: "G-QTGGD2L5RC"
};

const canvas = document.getElementById('canvas');
const addBtn = document.getElementById('add-note');

let isDragging = false;
let currentTarget = null;
let offset = { x: 0, y: 0 };

// 메모 추가 함수
addBtn.addEventListener('click', () => {
    createNote(100, 100, "새로운 메모...");
});

function createNote(x, y, text, id) {
    const note = document.createElement('div');
    note.className = 'note';
    note.style.left = x + 'px';
    note.style.top = y + 'px';
    note.dataset.id = id; // 파이어베이스와 연동할 때 필요한 ID

    note.innerHTML = `
        <textarea readonly>${text}</textarea>
        <div class="handle">⠿</div>
    `;

    const textarea = note.querySelector('textarea');

    // [핵심 1] 더블클릭 시 편집 모드 활성화
    note.addEventListener('dblclick', () => {
        textarea.readOnly = false;
        textarea.focus();
        note.classList.add('editing'); // 편집 중임을 알리는 스타일용
    });

    // [핵심 2] 포커스를 잃으면 다시 읽기 전용으로 (편집 완료)
    textarea.addEventListener('blur', () => {
        textarea.readOnly = true;
        note.classList.remove('editing');
        
        // 여기서 파이어베이스에 내용 업데이트 코드를 넣으면 친구 화면에도 바뀜!
        // updateNoteInFirebase(id, textarea.value); 
    });

    // 드래그 로직 (기존 유지하되 textarea가 readonly일 때만 작동하게 설정 가능)
    note.addEventListener('mousedown', (e) => {
        // 편집 중(readonly가 아닐 때)에는 드래그 방지
        if (!textarea.readOnly) return; 

        isDragging = true;
        currentTarget = note;
        offset.x = e.clientX - note.offsetLeft;
        offset.y = e.clientY - note.offsetTop;
        note.style.zIndex = 1000;
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
