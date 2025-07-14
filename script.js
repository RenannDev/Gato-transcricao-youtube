// YouTube URL validation
function isValidYouTubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
}

// Extract video ID from YouTube URL
function extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
}

// Simulate transcript generation
function generateMockTranscript(videoId) {
    const mockTranscripts = [
        "Welcome to this amazing video! Today we're going to explore the fascinating world of technology and innovation. Throughout this presentation, we'll dive deep into various concepts that will help you understand the current landscape of digital transformation.",
        "In this tutorial, we'll walk through step-by-step instructions on how to optimize your workflow. First, let's start with the basics and gradually move towards more advanced techniques that professionals use in their daily work.",
        "Thank you for joining us today. This educational content covers important topics that are relevant to modern learning. We'll explore different perspectives and provide practical examples that you can apply in real-world scenarios.",
        "Hello everyone! In today's session, we're focusing on practical applications and real-world examples. This comprehensive guide will help you understand complex concepts through simple explanations and hands-on demonstrations.",
        "Welcome to our in-depth analysis of current trends and future predictions. We'll examine various case studies and provide insights that will help you make informed decisions in your professional journey."
    ];

    return mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
}

// Copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Create and show transcript modal
function showTranscriptModal(transcript, videoTitle = 'YouTube Video') {
    // Remove existing modal
    const existingModal = document.querySelector('.transcript-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'transcript-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Transcript Generated Successfully</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="transcript-info">
                        <h4>${videoTitle}</h4>
                        <p>Transcript extracted and ready to use</p>
                    </div>
                    <div class="transcript-content">
                        <textarea readonly>${transcript}</textarea>
                    </div>
                    <div class="modal-actions">
                        <button class="copy-btn" id="copyTranscript">Copy Transcript</button>
                        <button class="download-btn" id="downloadTranscript">Download as TXT</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .transcript-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        }

        .modal-backdrop {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal-content {
            background: white;
            border-radius: 16px;
            width: 100%;
            max-width: 600px;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
            padding: 24px 24px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h3 {
            margin: 0;
            font-size: 20px;
            color: #111827;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
        }

        .modal-close:hover {
            background: #f3f4f6;
            color: #374151;
        }

        .modal-body {
            padding: 24px;
        }

        .transcript-info {
            margin-bottom: 20px;
        }

        .transcript-info h4 {
            margin: 0 0 8px 0;
            color: #111827;
            font-size: 16px;
        }

        .transcript-info p {
            margin: 0;
            color: #6b7280;
            font-size: 14px;
        }

        .transcript-content textarea {
            width: 100%;
            height: 200px;
            padding: 16px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
            resize: vertical;
            background: #f9fafb;
        }

        .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 20px;
        }

        .copy-btn, .download-btn {
            flex: 1;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .copy-btn {
            background: linear-gradient(135deg, #b5559e 0%, #d946ef 100%);
            color: white;
        }

        .copy-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(181, 85, 158, 0.3);
        }

        .download-btn {
            background: white;
            color: #374151;
            border: 1px solid #d1d5db;
        }

        .download-btn:hover {
            background: #f9fafb;
            border-color: #b5559e;
            color: #b5559e;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;

    // Add styles to document if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(modal);

    // Modal event listeners
    const closeModal = () => modal.remove();

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    // Copy transcript functionality
    modal.querySelector('#copyTranscript').addEventListener('click', async () => {
        const success = await copyToClipboard(transcript);
        if (success) {
            showNotification('Transcript copied to clipboard!');
        } else {
            showNotification('Failed to copy transcript', 'error');
        }
    });

    // Download transcript functionality
    modal.querySelector('#downloadTranscript').addEventListener('click', () => {
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${videoTitle.replace(/[^a-z0-9]/gi, '_')}_transcript.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Transcript downloaded successfully!');
    });

    // Close modal with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('youtubeUrl');
    const extractBtn = document.getElementById('extractBtn');

    // Extract transcript functionality
    extractBtn.addEventListener('click', async function() {
        const url = urlInput.value.trim();

        if (!url) {
            showNotification('Please enter a YouTube URL', 'error');
            urlInput.focus();
            return;
        }

        if (!isValidYouTubeUrl(url)) {
            showNotification('Please enter a valid YouTube URL', 'error');
            urlInput.focus();
            return;
        }

        // Show loading state
        extractBtn.disabled = true;
        extractBtn.classList.add('loading');
        extractBtn.textContent = '';

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

            const videoId = extractVideoId(url);
            const transcript = generateMockTranscript(videoId);
            const videoTitle = `YouTube Video ${videoId}`;

            // Show success
            showNotification('Transcript extracted successfully!');
            showTranscriptModal(transcript, videoTitle);

        } catch (error) {
            showNotification('Failed to extract transcript. Please try again.', 'error');
        } finally {
            // Reset button state
            extractBtn.disabled = false;
            extractBtn.classList.remove('loading');
            extractBtn.textContent = 'Extract transcript';
        }
    });

    // Enter key support for input
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            extractBtn.click();
        }
    });

    // Real-time URL validation
    urlInput.addEventListener('input', function() {
        const url = this.value.trim();
        if (url && !isValidYouTubeUrl(url)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#d1d5db';
        }
    });

    // Additional option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Bulk')) {
                showNotification('Bulk extraction feature coming soon!', 'info');
            } else if (text.includes('Channel ID')) {
                showNotification('Channel ID extraction feature coming soon!', 'info');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add some demo data on page load
    setTimeout(() => {
        showNotification('Welcome! Try pasting a YouTube URL to extract its transcript.', 'info');
    }, 1000);
});


  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".feature-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2  // quando 20% do card estiver visível
    });

    cards.forEach(card => observer.observe(card));
  });

// FAQ

let question = document.querySelectorAll(".question");

question.forEach(question => {
  question.addEventListener("click", event => {
    const active = document.querySelector(".question.active");
    if(active && active !== question ) {
      active.classList.toggle("active");
      active.nextElementSibling.style.maxHeight = 0;
    }
    question.classList.toggle("active");
    const answer = question.nextElementSibling;
    if(question.classList.contains("active")){
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = 0;
    }
  })
})



// para a seção de testemunhos
// vars
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
}