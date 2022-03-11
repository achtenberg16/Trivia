const NUMBER = 0.5;
const shuffleArray = (arr) => [...arr]
  .sort(() => Math.random() - NUMBER);

export default shuffleArray;
