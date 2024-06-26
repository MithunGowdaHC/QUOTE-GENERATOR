const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader"); 

let apiQuotes = [];



function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete() {
    quoteContainer.hidden = false;

    loader.hidden = true;
}


function newQuote() {
    // loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 70) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
//   complete();

}

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    let quotesData = await response.json();

apiQuotes = quotesData.map(quote => {
    quote.author = quote.author.replace(", type.fit", "");
    return quote;
});
    newQuote();
  } catch (error) {

  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
  window.open(twitterUrl,'_blank');

}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuotes();

