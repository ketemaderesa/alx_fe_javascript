// Quotes array with objects {text, category}
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", category: "Wisdom" }
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const categorySelect = document.getElementById("categorySelect");
const newQuoteTextInput = document.getElementById("newQuoteText");
const newQuoteCategoryInput = document.getElementById("newQuoteCategory");

// Initialize categories in dropdown
const populateCategories = () => {
  const categories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All";
  categorySelect.appendChild(allOption);

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
};

// Show random quote
const showRandomQuote = () => {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = selectedCategory === "All" ? quotes : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
};

// Add new quote
const addQuote = () => {
  const newQuoteText = newQuoteTextInput.value.trim();
  const newQuoteCategory = newQuoteCategoryInput.value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both quote text and category!");
    return;
  }

  // Prevent duplicate
  if (quotes.some(q => q.text === newQuoteText && q.category === newQuoteCategory)) {
    alert("This quote already exists!");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  populateCategories();
  newQuoteTextInput.value = "";
  newQuoteCategoryInput.value = "";
  alert("Quote added successfully!");
};

// Optional: Submit on Enter key
[newQuoteTextInput, newQuoteCategoryInput].forEach(input =>
  input.addEventListener("keypress", e => { if (e.key === "Enter") addQuote(); })
);

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Initialize
populateCategories();
