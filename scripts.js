document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);

            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const form = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `<strong>${name}:</strong> <p>${comment}</p>`;
        commentsList.appendChild(commentElement);

        saveComment(name, comment);

        form.reset();
    });

    loadComments();

    function saveComment(name, comment) {
        let comments = localStorage.getItem('comments');
        if (!comments) {
            comments = [];
        } else {
            comments = JSON.parse(comments);
        }
        comments.push({ name, comment });
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        let comments = localStorage.getItem('comments');
        if (comments) {
            comments = JSON.parse(comments);
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `<strong>${comment.name}:</strong> <p>${comment.comment}</p>`;
                commentsList.appendChild(commentElement);
            });
        }
    }
});