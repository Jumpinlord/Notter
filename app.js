const addBtn = document.querySelector('.note__add');
const noteShell = document.querySelector('#note__shell');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach(note => addNewNote(note));
};

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
      <p class="note__text ${text ? '' : 'hidden'}"></p>
      <textarea class="note__textarea ${text ? 'hidden' : ''}" placeholder="..."></textarea>
      <div class="note__tools">
        <button class="note__edit btn">Сохранить</button>
        <button class="note__delete btn">Удалить</button>
      </div>
    `;

  const editBtn = note.querySelector('.note__edit');
  const deleteBtn = note.querySelector('.note__delete');
  const noteText = note.querySelector('.note__text');
  const textArea = note.querySelector('.note__textarea');

  textArea.value = text;
  noteText.innerHTML = text;

  editBtn.addEventListener('click', () => {
    noteText.classList.toggle('hidden');
    textArea.classList.toggle('hidden');

    if (!noteText.classList.contains('hidden')) {
      editBtn.textContent = 'Изменить';
    }
    else if (noteText.classList.contains('hidden')) {
      editBtn.textContent = 'Сохранить';
    }
  });

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  textArea.addEventListener('input', e => {
    const {value } = e.target;

    noteText.textContent = value;
    updateLS();
  });

  noteShell.insertAdjacentElement('afterbegin', note);


  if (!noteText.classList.contains('hidden')) {
    editBtn.textContent = 'Изменить';
  }
  else if (noteText.classList.contains('hidden')) {
    editBtn.textContent = 'Сохранить';
  }
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];

  notesText.forEach(note => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}




