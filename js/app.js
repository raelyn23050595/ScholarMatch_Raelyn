/**
 * ScholarMatch - Scholarship Comparison AI Agent
 * Main application JavaScript for dynamic comparison and chatbot functionality
 */

// ========== SCHOLARSHIP DATABASE ==========
const scholarships = {
    pscship: {
        name: 'PSC Scholarship',
        provider: 'Public Service Commission',
        bondLength: '6 years',
        bondYears: 6,
        monthlyAllowance: '$2,500',
        tuitionCovered: 'Full',
        benefits: 'Medical, dental, housing',
        careerFlexibility: 'Low',
        flexibilityScore: 1,
        riskLevel: 'High',
        overview: 'Government service bond with structured career progression.'
    },
    jship: {
        name: 'J Scholarship (Industry)',
        provider: 'Major Industry Partner',
        bondLength: '3 years',
        bondYears: 3,
        monthlyAllowance: '$1,800',
        tuitionCovered: 'Full',
        benefits: 'Professional development, mentoring',
        careerFlexibility: 'Medium',
        flexibilityScore: 2,
        riskLevel: 'Medium',
        overview: 'Industry-sponsored scholarship with technical focus.'
    },
    temasek: {
        name: 'Temasek Foundation Scholarship',
        provider: 'Temasek Foundation',
        bondLength: '4 years',
        bondYears: 4,
        monthlyAllowance: '$2,000',
        tuitionCovered: 'Full',
        benefits: 'Internships, networking events, leadership training',
        careerFlexibility: 'Medium-High',
        flexibilityScore: 2.5,
        riskLevel: 'Medium',
        overview: 'Merit-based scholarship supporting diverse career paths.'
    },
    'nus-ot': {
        name: 'NUS OfficialTies Award',
        provider: 'National University of Singapore',
        bondLength: '2 years',
        bondYears: 2,
        monthlyAllowance: '$1,500',
        tuitionCovered: 'Partial',
        benefits: 'Alumni network, research opportunities',
        careerFlexibility: 'High',
        flexibilityScore: 3,
        riskLevel: 'Low',
        overview: 'University award with minimal commitment.'
    },
    'ntu-merit': {
        name: 'NTU Merit Award',
        provider: 'Nanyang Technological University',
        bondLength: '1 year',
        bondYears: 1,
        monthlyAllowance: '$1,200',
        tuitionCovered: 'Partial',
        benefits: 'Campus activities, student groups',
        careerFlexibility: 'Very High',
        flexibilityScore: 4,
        riskLevel: 'Low',
        overview: 'University merit award with maximum flexibility.'
    }
};

// ========== DOM ELEMENTS ==========
const scholarshipSelect = document.getElementById('scholarship-select');
const comparisonResults = document.getElementById('comparison-results');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// ========== EVENT LISTENERS ==========
if (scholarshipSelect) {
    scholarshipSelect.addEventListener('change', handleScholarshipSelection);
}

if (chatSend) {
    chatSend.addEventListener('click', handleChatSend);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChatSend();
        }
    });
}

// ========== SCHOLARSHIP COMPARISON ==========
/**
 * Handle scholarship selection and trigger comparison rendering
 */
function handleScholarshipSelection() {
    const selectedOptions = Array.from(scholarshipSelect.selectedOptions);
    const selectedValues = selectedOptions.map(option => option.value);

    if (selectedValues.length === 0) {
        comparisonResults.innerHTML = '<p class="placeholder-text">Select scholarships to see a detailed comparison.</p>';
        return;
    }

    if (selectedValues.length > 3) {
        alert('Please select a maximum of 3 scholarships for comparison.');
        return;
    }

    renderComparison(selectedValues);
}

/**
 * Render scholarship comparison cards
 * @param {Array} selectedScholarshipIds - IDs of selected scholarships
 */
function renderComparison(selectedScholarshipIds) {
    const cards = selectedScholarshipIds.map(id => {
        const scholarship = scholarships[id];
        return createComparisonCard(scholarship);
    }).join('');

    const html = `
        <div class="comparison-card-wrapper">
            ${cards}
        </div>
        <div style="margin-top: var(--spacing-lg); padding: var(--spacing-lg); background: var(--color-neutral-light); border-radius: var(--border-radius-lg);">
            <h3 style="color: var(--color-primary); margin-bottom: var(--spacing-md); font-size: var(--font-size-lg);">💡 Quick Insights</h3>
            <p style="color: var(--color-text-dark); font-size: var(--font-size-md); line-height: 1.6;">${generateInsight(selectedScholarshipIds)}</p>
        </div>
    `;

    comparisonResults.innerHTML = html;
}

/**
 * Create a single comparison card for a scholarship
 * @param {Object} scholarship - Scholarship data object
 * @returns {string} HTML string for the card
 */
function createComparisonCard(scholarship) {
    const riskColor = scholarship.riskLevel === 'High' ? 'risk-high' : 
                      scholarship.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low';

    return `
        <div class="comparison-card">
            <h3>${scholarship.name}</h3>
            <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin-bottom: var(--spacing-md);">${scholarship.provider}</p>
            
            <div class="comparison-attribute">
                <div class="attribute-label">Overview</div>
                <div class="attribute-value">${scholarship.overview}</div>
            </div>

            <div class="comparison-attribute">
                <div class="attribute-label">Bond Duration</div>
                <div class="attribute-value">${scholarship.bondLength}</div>
            </div>

            <div class="comparison-attribute">
                <div class="attribute-label">Monthly Allowance</div>
                <div class="attribute-value">${scholarship.monthlyAllowance}</div>
            </div>

            <div class="comparison-attribute">
                <div class="attribute-label">Tuition Coverage</div>
                <div class="attribute-value">${scholarship.tuitionCovered}</div>
            </div>

            <div class="comparison-attribute">
                <div class="attribute-label">Benefits</div>
                <div class="attribute-value">${scholarship.benefits}</div>
            </div>

            <div class="comparison-attribute">
                <div class="attribute-label">Career Flexibility</div>
                <div class="attribute-value">${scholarship.careerFlexibility}</div>
            </div>

            <div class="comparison-attribute">
                <div class="attribute-label">Risk Level (Commitment)</div>
                <div class="attribute-value ${riskColor}">${scholarship.riskLevel}</div>
            </div>
        </div>
    `;
}

/**
 * Generate AI insight based on selected scholarships
 * @param {Array} selectedIds - IDs of selected scholarships
 * @returns {string} AI-generated insight text
 */
function generateInsight(selectedIds) {
    if (selectedIds.length === 1) {
        const scholarship = scholarships[selectedIds[0]];
        const flexibility = scholarship.flexibilityScore >= 3 ? 'offers significant career flexibility' : 'requires moderate commitment';
        return `<strong>${scholarship.name}</strong> ${flexibility} with a ${scholarship.bondLength} bond. Consider this if ${
            scholarship.flexibilityScore >= 3 ? 'you value future career options' : 'you are committed to a specific industry or sector'
        }.`;
    }

    const selectedScholarships = selectedIds.map(id => scholarships[id]);
    const mostFlexible = selectedScholarships.reduce((a, b) => a.flexibilityScore > b.flexibilityScore ? a : b);
    const leastFlexible = selectedScholarships.reduce((a, b) => a.flexibilityScore < b.flexibilityScore ? a : b);

    return `<strong>Most Flexible:</strong> ${mostFlexible.name} (${mostFlexible.careerFlexibility})<br><strong>Most Committed:</strong> ${leastFlexible.name} (${leastFlexible.bondLength} bond)<br><br>Choose based on your priority: stability and structured career growth, or flexibility to explore your options.`;
}

// ========== CHATBOT FUNCTIONALITY ==========
/**
 * Handle chat message submission
 */
function handleChatSend() {
    const message = chatInput.value.trim();

    if (!message) return;

    // Display user message
    appendUserMessage(message);
    chatInput.value = '';

    // Simulate AI response with slight delay
    setTimeout(() => {
        const response = generateAIResponse(message);
        appendBotMessage(response);
    }, 500);
}

/**
 * Append user message to chat
 * @param {string} message - User's message text
 */
function appendUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-user';
    messageElement.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Append bot message to chat
 * @param {string} message - Bot's response text
 */
function appendBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-bot';
    messageElement.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Generate AI response based on user query
 * @param {string} userMessage - User's message
 * @returns {string} AI-generated response
 */
function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Career flexibility queries
    if (message.includes('flexibility') || message.includes('career options')) {
        return 'If career flexibility is your priority, <strong>NTU Merit Award</strong> (1-year bond) or <strong>NUS OfficialTies Award</strong> (2-year bond) offer the most freedom to explore different career paths. PSC Scholarship locks you into 6 years of government service, which is less flexible but provides stability.';
    }

    // Bond/Commitment queries
    if (message.includes('bond') || message.includes('commitment') || message.includes('long-term')) {
        return 'Bond duration varies significantly:<br><strong>Shortest:</strong> NTU Merit (1 year)<br><strong>Short:</strong> NUS OfficialTies (2 years)<br><strong>Medium:</strong> J Scholarship (3 years) & Temasek (4 years)<br><strong>Longest:</strong> PSC Scholarship (6 years)<br><br>Longer bonds often come with better financial benefits, but less career flexibility.';
    }

    // Financial queries
    if (message.includes('money') || message.includes('allowance') || message.includes('benefit')) {
        return 'Here\'s the financial breakdown:<br><strong>Highest:</strong> PSC Scholarship ($2,500/month)<br><strong>High:</strong> Temasek ($2,000/month)<br><strong>Mid:</strong> J Scholarship ($1,800/month)<br><strong>Lower:</strong> NUS OfficialTies ($1,500/month) & NTU Merit ($1,200/month)<br><br>Higher allowances typically come with longer bond commitments.';
    }

    // Stability queries
    if (message.includes('stable') || message.includes('secure') || message.includes('structured')) {
        return 'For career stability and structure, <strong>PSC Scholarship</strong> and <strong>J Scholarship</strong> offer clear career progressions and long-term security. If you prefer stability with flexibility, <strong>Temasek Foundation Scholarship</strong> balances both well.';
    }

    // Industry focus
    if (message.includes('industry') || message.includes('tech') || message.includes('business')) {
        return 'If you\'re focused on industry experience, <strong>J Scholarship</strong> is specifically designed for industry partnerships with strong mentoring and professional development. <strong>Temasek Foundation</strong> also offers excellent internship opportunities across sectors.';
    }

    // Default response
    return 'Great question! I can help you compare scholarships based on flexibility, bond duration, financial benefits, and career impact. Try asking me about:<br>• Career flexibility and options<br>• Bond commitment length<br>• Monthly allowance and benefits<br>• Stability vs. flexibility trade-offs<br>• Specific scholarship recommendations<br><br>What matters most to you?';
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========== INITIALIZATION ==========
/**
 * Initialize the application
 */
function initializeApp() {
    console.log('ScholarMatch initialized. Ready to help students make confident scholarship decisions.');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
