/**
 * ScholarMatch - Scholarship Comparison AI Agent
 * Main application JavaScript for dynamic comparison and chatbot functionality
 */

// ========== NAVBAR SCROLL HIDE/SHOW ==========
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Scrolling DOWN
        header.classList.add('hide');
    } else {
        // Scrolling UP
        header.classList.remove('hide');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ========== SCHOLARSHIP DATABASE ==========
const scholarships = {
    // ===== NUS =====
    'nus-global-merit': {
        name: 'NUS Global Merit Scholarship',
        provider: 'National University of Singapore',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Living allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Overseas allowance, accommodation allowance, leadership programmes',
        careerFlexibility: 'Very High',
        flexibilityScore: 4,
        riskLevel: 'Low',
        overview: 'Prestigious scholarship for outstanding students with global exposure and maximum career flexibility.'
    },
    'nus-merit': {
        name: 'NUS Merit Scholarship',
        provider: 'National University of Singapore',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Living allowance, leadership programmes, enrichment activities',
        careerFlexibility: 'Very High',
        flexibilityScore: 4,
        riskLevel: 'Low',
        overview: 'Merit-based scholarship supporting academic excellence with strong flexibility.'
    },
    'nus-undergraduate': {
        name: 'NUS Undergraduate Scholarship',
        provider: 'National University of Singapore',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Academic enrichment, mentorship opportunities',
        careerFlexibility: 'High',
        flexibilityScore: 3.5,
        riskLevel: 'Low',
        overview: 'Scholarship recognising strong academic performance and all-round achievements.'
    },

    // ===== NTU =====
    'ntu-merit': {
        name: 'Nanyang Merit Scholarship',
        provider: 'Nanyang Technological University',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Accommodation allowance, leadership and development programmes',
        careerFlexibility: 'Very High',
        flexibilityScore: 4,
        riskLevel: 'Low',
        overview: 'Merit-based scholarship offering full financial support and flexibility.'
    },
    'ntu-global': {
        name: 'Nanyang Global Scholarship',
        provider: 'Nanyang Technological University',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Higher allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Overseas exposure funding, leadership training, global programmes',
        careerFlexibility: 'Very High',
        flexibilityScore: 4,
        riskLevel: 'Low',
        overview: 'Elite scholarship for globally-minded students with extensive international exposure.'
    },
    'ew-barker': {
        name: 'E. W. Barker Scholarship',
        provider: 'Nanyang Technological University',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Sports and leadership development support',
        careerFlexibility: 'High',
        flexibilityScore: 3.5,
        riskLevel: 'Low',
        overview: 'Scholarship recognising leadership, service, and excellence beyond academics.'
    },

    // ===== SMU =====
    'smu-merit': {
        name: 'SMU Merit Scholarship Programme',
        provider: 'Singapore Management University',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Leadership development, global exposure, enrichment activities',
        careerFlexibility: 'Very High',
        flexibilityScore: 4,
        riskLevel: 'Low',
        overview: 'Merit-based scholarship emphasising leadership and holistic development.'
    },
    'yip-pin-xiu': {
        name: 'Yip Pin Xiu Scholarship',
        provider: 'Singapore Management University',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Mentorship, leadership training, personal development',
        careerFlexibility: 'High',
        flexibilityScore: 3.5,
        riskLevel: 'Low',
        overview: 'Scholarship supporting resilient leaders who excel beyond academics.'
    },
    'lee-kong-chian': {
        name: "Lee Kong Chian Scholars' Programme",
        provider: 'Singapore Management University',
        bondLength: 'No bond',
        bondYears: 0,
        monthlyAllowance: 'Higher allowance provided',
        tuitionCovered: 'Full',
        benefits: 'Overseas exchanges, leadership coaching, exclusive networking',
        careerFlexibility: 'Very High',
        flexibilityScore: 4,
        riskLevel: 'Low',
        overview: 'SMU’s most prestigious scholarship for top-performing and high-potential students.'
    }
};

// ========== DOM ELEMENTS ==========
const scholarshipSelect1 = document.getElementById('scholarship-select-1');
const scholarshipSelect2 = document.getElementById('scholarship-select-2');
const comparisonResults = document.getElementById('comparison-results');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// ========== EVENT LISTENERS ==========
if (scholarshipSelect1) {
    scholarshipSelect1.addEventListener('change', handleScholarshipSelection);
}

if (scholarshipSelect2) {
    scholarshipSelect2.addEventListener('change', handleScholarshipSelection);
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
function handleScholarshipSelection() {
    const value1 = scholarshipSelect1 ? scholarshipSelect1.value : '';
    const value2 = scholarshipSelect2 ? scholarshipSelect2.value : '';
    
    // Disable selected option in the other dropdown
    if (scholarshipSelect1 && scholarshipSelect2) {
        Array.from(scholarshipSelect2.options).forEach(option => option.disabled = false);
        Array.from(scholarshipSelect1.options).forEach(option => option.disabled = false);
        
        if (value1) {
            Array.from(scholarshipSelect2.options).forEach(option => {
                if (option.value === value1) option.disabled = true;
            });
        }
        
        if (value2) {
            Array.from(scholarshipSelect1.options).forEach(option => {
                if (option.value === value2) option.disabled = true;
            });
        }
    }
    
    const selectedValues = [];
    if (value1) selectedValues.push(value1);
    if (value2) selectedValues.push(value2);

    if (selectedValues.length < 2) {
        comparisonResults.innerHTML = '';
        return;
    }

    renderComparison(selectedValues);
}

function renderComparison(selectedScholarshipIds) {
    const cards = selectedScholarshipIds.map(id => createComparisonCard(scholarships[id])).join('');

    const html = `
        <div class="comparison-card-wrapper">
            ${cards}
        </div>
        <div style="margin-top: var(--spacing-lg); padding: var(--spacing-lg); background: var(--color-neutral-light); border-radius: var(--border-radius-lg); text-align: center;">
            <h3 style="color: var(--color-primary); margin-bottom: var(--spacing-md); font-size: var(--font-size-lg);">💡 Quick Insights</h3>
            <p style="color: var(--color-text-dark); font-size: var(--font-size-md); line-height: 1.6;">${generateInsight(selectedScholarshipIds)}</p>
        </div>
    `;

    comparisonResults.innerHTML = html;
}

function createComparisonCard(scholarship) {
    const riskColor = scholarship.riskLevel === 'High' ? 'risk-high' : 
                      scholarship.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low';

    return `
        <div class="comparison-card">
            <h3 style="font-size: 1.25rem; margin-bottom: var(--spacing-sm); text-align: center;">${scholarship.name}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 600; margin-bottom: var(--spacing-md); text-align: center;">${scholarship.provider}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);">
                <div>
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
                        <div class="attribute-label">Career Flexibility</div>
                        <div class="attribute-value">${scholarship.careerFlexibility}</div>
                    </div>
                </div>

                <div>
                    <div class="comparison-attribute">
                        <div class="attribute-label">Overview</div>
                        <div class="attribute-value">${scholarship.overview}</div>
                    </div>

                    <div class="comparison-attribute">
                        <div class="attribute-label">Benefits</div>
                        <div class="attribute-value">${scholarship.benefits}</div>
                    </div>

                    <div class="comparison-attribute">
                        <div class="attribute-label">Risk Level</div>
                        <div class="attribute-value ${riskColor}">${scholarship.riskLevel}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateInsight(selectedIds) {
    if (selectedIds.length === 1) {
        const scholarship = scholarships[selectedIds[0]];
        const flexibility = scholarship.flexibilityScore >= 3 ? 'offers significant career flexibility' : 'requires moderate commitment';
        return `<strong>${scholarship.name}</strong> ${flexibility} with a ${scholarship.bondLength} bond. Consider this if ${
            scholarship.flexibilityScore >= 3 ? 'you value future career options' : 'you are committed to a specific path'
        }.`;  
    }

    const selectedScholarships = selectedIds.map(id => scholarships[id]);
    const mostFlexible = selectedScholarships.reduce((a, b) => a.flexibilityScore > b.flexibilityScore ? a : b);
    const leastFlexible = selectedScholarships.reduce((a, b) => a.flexibilityScore < b.flexibilityScore ? a : b);

    return `<strong>Most Flexible:</strong> ${mostFlexible.name} (${mostFlexible.careerFlexibility})<br><strong>Most Committed:</strong> ${leastFlexible.name} (${leastFlexible.bondLength} bond)<br><br>Choose based on your priority: prestige, benefits, or career flexibility.`;
}

// ========== CHATBOT FUNCTIONALITY ==========
function handleChatSend() {
    const message = chatInput.value.trim();
    if (!message) return;

    appendUserMessage(message);
    chatInput.value = '';

    setTimeout(() => {
        const response = generateAIResponse(message);
        appendBotMessage(response);
    }, 500);
}

function appendUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-user';
    messageElement.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-bot';
    messageElement.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('bond')) {
        return 'All scholarships on this platform are <strong>bond-free</strong>, giving you full freedom to explore any career path after graduation.';
    }

    if (message.includes('flexibility') || message.includes('career')) {
        return 'Most scholarships here offer <strong>very high career flexibility</strong>. Top options include <strong>NUS Global Merit</strong>, <strong>Nanyang Global</strong>, and <strong>Lee Kong Chian Scholars’ Programme</strong>.';
    }

    if (message.includes('best') || message.includes('prestigious')) {
        return 'The most prestigious scholarships include <strong>NUS Global Merit Scholarship</strong>, <strong>Nanyang Global Scholarship</strong>, and <strong>Lee Kong Chian Scholars’ Programme</strong>, all offering strong global exposure and leadership development.';
    }

    if (message.includes('money') || message.includes('allowance')) {
        return 'Most scholarships provide <strong>full tuition coverage</strong> plus a living allowance. Global and premier scholarships typically offer higher allowances and overseas funding.';
    }

    return 'I can help you compare scholarships based on prestige, benefits, flexibility, and university. Try asking:<br>• Which scholarship is most prestigious?<br>• Which offers the most flexibility?<br>• NUS vs NTU vs SMU scholarships<br>• Best scholarship for leadership or global exposure';
}

// ========== UTILITIES ==========
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========== INITIALIZATION ==========
function initializeApp() {
    console.log('ScholarMatch initialized. Ready to help students make confident scholarship decisions.');
}

document.addEventListener('DOMContentLoaded', initializeApp);
