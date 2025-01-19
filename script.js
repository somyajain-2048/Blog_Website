//signup

document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('signupBtn');
  const modal = document.getElementById('signupForm');
  const closeBtn = document.querySelector('.close');

  signupBtn.addEventListener('click', () => {
      modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});



// Text Editor Functionality

document.addEventListener('DOMContentLoaded', () => {
  const newPostBtn = document.getElementById('new-post-btn');
  const editorSection = document.getElementById('editor-section');
  const publishBtn = document.getElementById('publish-btn');
  const postsContainer = document.getElementById('posts-container');
  const toolbar = document.getElementById('toolbar');
  const editor = document.getElementById('editor');

  // Show or hide the editor section when 'Create New Post' button is clicked
  newPostBtn.addEventListener('click', () => {
      editorSection.classList.toggle('hidden');
  });

  // Toolbar button functionality
  toolbar.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
          const command = e.target.getAttribute('data-command');
          if (command === 'h1' || command === 'h2' || command === 'p') {
              document.execCommand('formatBlock', false, command);
          } else {
              document.execCommand(command, false, null);
          }
      }
  });

  // Publish post
  publishBtn.addEventListener('click', () => {
      const title = document.getElementById('post-title').value.trim();
      const content = editor.innerHTML.trim();

      if (title && content) {
          const post = { title, content };
          addPostToDOM(post);
          clearEditor();
          editorSection.classList.add('hidden');
      } else {
          alert('Please provide both a title and content for the post.');
      }
  });

  // Add post to the DOM
  function addPostToDOM(post) {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      postCard.innerHTML = `
          <h2 class="post-title">${post.title}</h2>
          <div class="post-content">${post.content}</div>
      `;
      postCard.addEventListener('click', () => {
          displayFullPost(post);
      });
      postsContainer.appendChild(postCard);
  }

  // Display full post in a modal or separate section
  function displayFullPost(post) {
      alert(`Title: ${post.title}\n\nContent: ${post.content}`);
  }

  // Clear the editor after publishing
  function clearEditor() {
      document.getElementById('post-title').value = '';
      editor.innerHTML = '';
  }
});
const filterItems = document.querySelectorAll(".filter-item");
const postBoxes = document.querySelectorAll(".post-box");

// event listeners for filter items
filterItems.forEach((filter) => {
  filter.addEventListener("click", () => {
    filterItems.forEach((item) => item.classList.remove("active-filter"));
    filter.classList.add("active-filter");
    const filterCategory = filter.textContent.trim().toLowerCase();

    // Show or hide posts based on the filter clicked
    postBoxes.forEach((post) => {
      // category (Tech, Food, Music) of the post
      const category = post.querySelector("h2.category").textContent.trim().toLowerCase();

      // If the filter is "All", show all posts. Otherwise, only show posts matching the filter category
      if (filterCategory === "all" || category === filterCategory) {
        post.style.display = "block";  // Show the matching post
      } else {
        post.style.display = "none";   // Hide non-matching post
      }
    });
  });
});

// Note-Taking Functionality
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const notesList = document.getElementById("notesList");

// Load notes from Local Storage when the page loads
window.onload = function () {
  loadNotes();
};

// Save Note
saveNoteBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();

  if (noteText === "") {
    alert("Please write something before saving.");
    return;
  }

  saveNoteToLocalStorage(noteText);
  addNoteToUI(noteText);
  noteInput.value = ""; // Clear textarea after saving
});

// Note to UI with Delete Icon
function addNoteToUI(noteText) {
  const li = document.createElement("li");
  li.textContent = noteText;

  // Create Delete Icon (Font Awesome Trash Icon)
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");

  // Delete functionality
  deleteIcon.addEventListener("click", () => {
    removeNoteFromLocalStorage(noteText);
    li.remove();
  });

  li.appendChild(deleteIcon);
  notesList.appendChild(li);
}

// Save Note to Local Storage
function saveNoteToLocalStorage(note) {
  let notes = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];

  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Load Notes from Local Storage
function loadNotes() {
  let notes = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];

  notes.forEach((note) => {
    addNoteToUI(note);
  });
}

// Remove Note from Local Storage
function removeNoteFromLocalStorage(noteToRemove) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter((note) => note !== noteToRemove);
  localStorage.setItem("notes", JSON.stringify(notes));
}





