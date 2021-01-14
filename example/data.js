const email = [
  {
    sender: 'Rockbell Automail',
    subject: 'Your order is ready!',
    body: 'Hi Preetam, the item you ordered is now available for pickup!',
  },
  {
    sender: 'Amestris Kebab',
    subject: 'Your Receipt',
    body: 'Thank you for dining with us last night!',
  },
  {
    sender: 'Alphonse Elric',
    subject: 'Recommendations?',
    body: 'Was wondering if you had any recs for Chinese food in the area?',
  },
  {
    sender: 'Edward Elric',
    subject: 'I figured it out!',
    body:
      'Had an insight that we can apply alkahestry to to solve an alchemical paradox!',
  },
  {
    sender: 'SpammyCo',
    subject: 'WEEEKEND SALE!',
    body: "Don't miss out on our latest weekend sale!",
  },
  {
    sender: 'Winry Rockbell',
    subject: 'Where the hell is Ed??',
    body: 'Guess what? Ed skipped out on our family dinner last night.',
  },
  {
    sender: 'SpammyCo2',
    subject: 'Last chance for 20% OFF!',
    body: 'Going once, going twice!',
  },
  {
    sender: 'Roy Mustang',
    subject: 'Surprise Party',
    body: "You'd better be at my party next weekend.",
  },
  {
    sender: 'Alex Louis Armstrong',
    subject: 'Gym Meet!',
    body: "I'm hosting a training event at my gym next month!",
  },
  {
    sender: 'Riza Hawkeye',
    subject: 'Can you do me a favor?',
    body: 'Have to ask you for a quick favor.',
  },
  {
    sender: 'Lin Yao',
    subject: 'Amestris Trip',
    body: "I'll be in town this week - wanna grab some food?",
  },
];

// add unique keys
email.forEach((x, i) => (x.id = `${i}`));

export default email;
