// Initial quotes array
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "life" },
  { text: "Stay hungry, stay foolish.", category: "inspiration" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "life" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Please add some quotes.</p>";
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— ${quote.category}</em></p>
  `;
}

// Add a new quote
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  
  if (text && category) {
    quotes.push({ text, category });
    textInput.value = '';
    categoryInput.value = '';
    showRandomQuote();
    alert('Quote added successfully!');
  } else {
    alert('Please enter both quote text and category.');
  }
}

// Event listeners
newQuoteBtn.addEventListener('click', showRandomQuote);

// Initialize
showRandomQuote();


// Load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'quotes.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes = importedQuotes;
        saveQuotes();
        showRandomQuote();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid format: Expected an array of quotes.');
      }
    } catch (error) {
      alert('Error parsing JSON file: ' + error.message);
    }
  };
  reader.readAsText(file);
}

// Update the addQuote function to save to local storage
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  
  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    textInput.value = '';
    categoryInput.value = '';
    showRandomQuote();
    alert('Quote added successfully!');
  } else {
    alert('Please enter both quote text and category.');
  }
}

// Add export button event listener
document.addEventListener('DOMContentLoaded', function() {
  loadQuotes();
  showRandomQuote();
  
  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export Quotes';
  exportBtn.onclick = exportToJsonFile;
  document.body.appendChild(exportBtn);
  
  const importFileInput = document.createElement('input');
  importFileInput.type = 'file';
  importFileInput.id = 'importFile';
  importFileInput.accept = '.json';
  importFileInput.onchange = importFromJsonFile;
  document.body.appendChild(importFileInput);
  
  const importLabel = document.createElement('label');
  importLabel.textContent = 'Import Quotes: ';
  importLabel.htmlFor = 'importFile';
  document.body.insertBefore(importLabel, importFileInput);
});
