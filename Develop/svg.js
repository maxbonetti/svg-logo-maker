const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  "Enter up to three characters: ",
  "Enter the text color (keyword or hex): ",
  "Choose a shape (circle, triangle, square): ",
  "Enter the shape's color (keyword or hex): "
];

function askQuestion(question) {
  return new Promise((resolve) => rl.question(question, answer => resolve(answer)));
}

async function main() {
  const answers = [];
  for (const question of questions) {
    const answer = await askQuestion(question);
    answers.push(answer);
  }
  rl.close();

  const [text, textColor, shapeType, shapeColor] = answers;
  const svgContent = generateSVG(text, textColor, shapeType, shapeColor);
  fs.writeFileSync('logo.svg', svgContent);
  console.log("Generated logo.svg");
}

function generateSVG(text, textColor, shapeType, shapeColor) {
  const shapes = {
    circle: `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`,
    triangle: `<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`,
    square: `<rect x="100" y="75" width="100" height="100" fill="${shapeColor}" />`
  };

  const shapeSvg = shapes[shapeType.toLowerCase()] || '';
  return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeSvg}
    <text x="150" y="125" font-size="20" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
}

main();