const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    const isClosing = sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
    const children = Array.from(sidebar.children);
    children.forEach(child => {
        const containsToggle = child.contains(toggleButton);
        if (isClosing) {
            if (!containsToggle) {
                child.style.display = 'none';
            } else {
                const logoText = child.querySelector('.logo-text');
                if (logoText) logoText.style.display = 'none';
            }
        } else {
            child.style.display = '';
            const logoText = child.querySelector('.logo-text');
            if (logoText) logoText.style.display = '';
        }
    });
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling?.classList.remove('rotate');
    });
}



function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if(sidebar.classList.contains('close')){
        sidebar.classList.toggle('close')
        toggleButton.classList.toggle('rotate')
    }
}

const popoverTrigger = document.getElementById('profilePopover');
const popover = new bootstrap.Popover(popoverTrigger);

document.addEventListener('click', function (event) {
    const popoverElement = document.querySelector('.popover');
    
    if (!popoverElement) return;

    const isClickInsidePopover = popoverElement.contains(event.target);
    const isClickOnTrigger = popoverTrigger.contains(event.target);

    if (!isClickInsidePopover && !isClickOnTrigger) {
        popover.hide();
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault(); 

const empId = document.getElementById('employeeId').value.trim();
const password = document.getElementById('password').value.trim();

if(empId === '1' && password === '1') {
    localStorage.setItem('isLoggedIn', 'true');

    document.querySelector('.home-section').style.display = '';
    document.querySelector('.menu').style.display = '';
    document.querySelector('.login-container').style.display = 'none';
} else {
    alert('Invalid Employee ID or Password');
}
});

function logout() {
    localStorage.removeItem('isLoggedIn');

    document.querySelector('.home-section').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.login-container').style.display = '';

    document.getElementById('employeeId').value = '';
    document.getElementById('password').value = '';

    popover.hide();

    alert('You have been logged out successfully!');
}


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-danger') && event.target.textContent.trim() === 'Logout') {
        logout();
    }
});

window.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        document.querySelector('.home-section').style.display = '';
        document.querySelector('.menu').style.display = '';
        document.querySelector('.login-container').style.display = 'none';
    }
});

document.getElementById('signupLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('registrationContainer').style.display = '';
});

document.querySelector('#registrationContainer .options a').addEventListener('click', function(e) {
    e.preventDefault();

    document.getElementById('registrationContainer').style.display = 'none';
    document.querySelector('.login-container').style.display = '';
});

let hasNavigated = false;

function showContent(contentId) {
    const sections = document.querySelectorAll('.sections-content');
    const masterScript = document.getElementById("master-Script")
    sections.forEach(section => section.style.display = 'none');

    const selectedSection = document.getElementById(contentId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    const navLinks = document.querySelectorAll("nav ul li");
    navLinks.forEach(link => link.classList.remove("active"));

    const matchingNav = document.querySelector(`[data-target="${contentId}"]`);
    if (matchingNav) {
        matchingNav.parentElement.classList.add("active");
    }
    // if (hasNavigated) {
    //     toggleSidebar();
    // } else {
    //     hasNavigated = true;
    // }
}

// document.addEventListener('DOMContentLoaded', () => {
//     showContent('master-Script');
// });

function searchMenu() {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.toLowerCase();
    var menuItems = document.querySelectorAll('#menuList li');
    
    menuItems.forEach(function(item) {
        var searchData = item.getAttribute('data-search');
        var itemText = item.textContent.toLowerCase();
        
        // Check if search term matches either data-search attribute or visible text
        if ((searchData && searchData.includes(searchTerm)) || itemText.includes(searchTerm)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    
    // If search is empty, show all items
    if (searchTerm === '') {
        menuItems.forEach(function(item) {
            item.classList.remove('hidden');
        });
    }
}

function copyToClipboard(textareaId, buttonElement) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) {
        alert("Textarea not found!");
        return;
    }
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    navigator.clipboard.writeText(textarea.value)
    .then(() => {
        const originalText = buttonElement.innerText;
        buttonElement.innerText = "Copied";
        buttonElement.disabled = true;
        setTimeout(() => {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
            textarea.blur();
            buttonElement.innerText = originalText;
            buttonElement.disabled = false;
        }, 3000);
    })
    .catch(err => {
        console.error('Copy failed:', err);
        alert('Failed to copy.');
    });
}
