
const quotes = [
{
quote:"Small daily improvements are the key to long-term results.",
author:"Robin Sharma"
},
{
quote:"Success is the sum of small efforts repeated day in and day out.",
author:"Robert Collier"
},
{
quote:"Don't watch the clock; do what it does. Keep going.",
author:"Sam Levenson"
},
{
quote:"Discipline is choosing between what you want now and what you want most.",
author:"Abraham Lincoln"
},
{
quote:"Dream big. Start small. Act now.",
author:"Robin Sharma"
}
];

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("newQuote");

btn.addEventListener("click",()=>{

const random = quotes[Math.floor(Math.random()*quotes.length)];

quote.innerHTML=`"${random.quote}"`;
author.innerHTML=`— ${random.author}`;

});