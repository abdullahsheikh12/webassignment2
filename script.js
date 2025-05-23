// Client-side JavaScript for the expense tracker
document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today for the date input
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${year}-${month}-${day}`;
    }

    // Add any client-side validation or interactivity here
    const form = document.querySelector('.expense-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const amount = document.getElementById('amount').value;
            const title = document.getElementById('title').value;
            
            if (!title.trim()) {
                e.preventDefault();
                alert('Please enter a title for the expense');
                return;
            }
            
            if (isNaN(amount) || parseFloat(amount) <= 0) {
                e.preventDefault();
                alert('Please enter a valid positive amount');
                return;
            }
        });
    }
    
    // Edit form validation
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            const amount = document.getElementById('edit-amount').value;
            const title = document.getElementById('edit-title').value;
            
            if (!title.trim()) {
                e.preventDefault();
                alert('Please enter a title for the expense');
                return;
            }
            
            if (isNaN(amount) || parseFloat(amount) <= 0) {
                e.preventDefault();
                alert('Please enter a valid positive amount');
                return;
            }
        });
    }
    
    // Modal functionality
    const modal = document.getElementById('editModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
    }
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

// Function to open the edit modal and populate it with expense data
function openEditModal(expense) {
    const modal = document.getElementById('editModal');
    
    // Populate form fields with expense data
    document.getElementById('edit-id').value = expense.id;
    document.getElementById('edit-title').value = expense.title;
    document.getElementById('edit-amount').value = expense.amount;
    
    // Format date for input field (YYYY-MM-DD)
    const expenseDate = new Date(expense.date);
    const year = expenseDate.getFullYear();
    const month = String(expenseDate.getMonth() + 1).padStart(2, '0');
    const day = String(expenseDate.getDate()).padStart(2, '0');
    document.getElementById('edit-date').value = `${year}-${month}-${day}`;
    
    document.getElementById('edit-category').value = expense.category;
    document.getElementById('edit-description').value = expense.description || '';
    
    // Display the modal
    modal.style.display = 'block';
}
