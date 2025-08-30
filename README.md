# 🛒 MealDeals

**Video Demo:** [https://youtu.be/-tntCk6jStA](https://youtu.be/-tntCk6jStA)

## The Problem We're Solving 💸

Ever stare into your fridge, wondering what to cook, while your grocery budget feels tighter than ever? We've all been there. Trying to eat well, save money, and get creative in the kitchen can feel like three different, impossible tasks. Scrolling through multiple supermarket apps for discounts and then brainstorming a meal from those scattered ingredients is a chore.

## Our Solution: A Smarter Way to Save and Cook 🤖

**MealDeals** is the solution to this modern-day dilemma. We've built an intelligent web app that does the hard work for you. By fetching **live discounts from Sydney's biggest supermarkets** (Woolworths, Coles, Aldi, and IGA) using their official APIs, we give you a **real-time list of what's on sale**.  

But we don't stop there. We use a **locally hosted Llama 3.2 model (via Ollama)** to instantly generate **delicious, personalized recipes** tailored to your selected ingredients — complete with cooking instructions, difficulty levels, nutrition info, and estimated cook times.

It's not just a grocery list — it's a **meal plan powered by savings**.

---

## ✨ Key Features

### 🛒 The Supermarket Tracker
- **Live Deals:** See up-to-date discounted products from all your favorite supermarkets.
- **Save Smarter:** Instantly view original vs. discounted prices and your total savings.
- **Direct Links:** Click through to the official supermarket page for each item.

### 🔍 Find What You Need
- **Powerful Filtering:** Narrow sales by **store, category**, or specific **ingredients**.
- **Instant Search:** Quickly find the best price on that one item you've been waiting for.

### 👩‍🍳 Your Personal AI Chef
- **Tailored Recipes:** Generate unique, creative recipes using the discounted ingredients you select.
- **All-in-One View:** Each recipe highlights sale items, shows clear instructions, nutrition info, cook time, and difficulty level.
- **Endless Inspiration:** Not happy with a recipe? Hit "Generate" again to try new combinations instantly.

### 📱 Designed for You
- **Clean & Responsive UI:** A modern, mobile-friendly interface that works on any device.
- **Smart Savings Overview:** See how much you've saved while building your recipe basket.

### 🌟 Social & Premium Features *(Coming Soon!)*
- **Profiles:** Save your favorite recipes for later.
- **Trending Recipes:** Discover the most popular recipes and deals each week.
- **Influencer Content:** Premium users will access exclusive recipes from creators like *Andy Cooks* and *Nutrition by Kylie*.

---

## 🛠️ Tech Stack & How It's Built

- **Frontend:** React + Vite for a fast, dynamic, and responsive user interface.
- **Backend:** Node.js with Express for API handling and business logic.
- **AI Engine:** Llama 3.2 served locally via Ollama for lightning-fast recipe generation.
- **Data Sources:** Official APIs from Woolworths, Coles, Aldi, and IGA for accurate, real-time discounts.
- **Data Storage:** [e.g., PostgreSQL/MongoDB] to organize supermarket and user data. (temporarily using .csv file)
- **Ethics & Compliance:** Fully compliant with supermarket data usage policies and 100% open-source for community contributions.

---

## 🚀 Get It Running Locally

Want to see what's under the hood?

Make sure you have Ollama downloaded in your computer and download the llama3.2 model.

```bash
# 1. Clone the repo
git clone [Your GitHub Repository URL]

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

```

And you're good to go!

## 👥 Meet the Team
- [ZH-170](https://github.com/ZH-170) (Zi Heng Lim)
- [yiningit](https://github.com/yiningit) (Yi Ning Tan)
