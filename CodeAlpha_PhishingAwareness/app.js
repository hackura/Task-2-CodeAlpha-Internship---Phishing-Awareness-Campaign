const questions = [
  {
    prompt: 'You receive an unexpected email saying your work account will be disabled in 20 minutes. It includes a sign-in button. What should you do?',
    options: ['Click quickly so you do not lose access.', 'Use a saved bookmark or official app to check your account, then report the email.', 'Reply and ask the sender to prove they are IT.'],
    answer: 1,
    explanation: 'Correct. The deadline is pressure. Check by opening the service independently and report the unexpected message through your organization’s process.'
  },
  {
    prompt: 'A caller says they are from your bank and asks you to read them the one-time code that just arrived. What is safest?',
    options: ['Read it if the caller knows your name.', 'Ask them to send a link so you can verify.', 'Do not share the code. Hang up and call the bank using the number on your card or official site.'],
    answer: 2,
    explanation: 'Correct. One-time codes can authorize account access. End the call and contact the bank through a trusted number.'
  },
  {
    prompt: 'You clicked a suspicious link and entered your password. What should you do first?',
    options: ['Tell your IT/security team promptly and change the password from the official site.', 'Delete the message and hope nothing happens.', 'Wait until you see an unfamiliar login.'],
    answer: 0,
    explanation: 'Correct. Report quickly so the organization can respond. Change the exposed password through the real service, and change it anywhere else you reused it.'
  }
];

let current = 0;
let score = 0;
let answered = false;
let finished = false;
const questionText = document.querySelector('#question-text');
const answers = document.querySelector('#answers');
const count = document.querySelector('#question-count');
const progress = document.querySelector('#progress-fill');
const feedback = document.querySelector('#feedback');
const scoreText = document.querySelector('#score-text');
const nextButton = document.querySelector('#next-button');

function renderQuestion() {
  const question = questions[current];
  answered = false;
  finished = false;
  count.textContent = `QUESTION ${current + 1} OF ${questions.length}`;
  progress.style.width = `${((current + 1) / questions.length) * 100}%`;
  questionText.textContent = question.prompt;
  answers.replaceChildren();
  feedback.hidden = true;
  nextButton.disabled = true;
  nextButton.innerHTML = current === questions.length - 1 ? 'See results <span>→</span>' : 'Next question <span>→</span>';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    button.innerHTML = `<span class="letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector('span:last-child').textContent = option;
    button.addEventListener('click', () => chooseAnswer(index));
    answers.append(button);
  });
}

function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const question = questions[current];
  const buttons = [...answers.children];
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === question.answer) button.classList.add('correct');
    else if (i === index) button.classList.add('wrong');
  });
  if (index === question.answer) score++;
  scoreText.textContent = `Score: ${score}`;
  feedback.textContent = question.explanation;
  feedback.hidden = false;
  nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
  if (finished) {
    current = 0;
    score = 0;
    scoreText.textContent = 'Score: 0';
    renderQuestion();
    return;
  }
  if (!answered) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
    return;
  }
  count.textContent = 'TRAINING COMPLETE';
  finished = true;
  questionText.textContent = `You scored ${score} out of ${questions.length}.`;
  answers.replaceChildren();
  feedback.textContent = score === questions.length
    ? 'Excellent. Keep using the pause, verify, report routine.'
    : 'Review the explanations, then try again to reinforce the safest responses.';
  feedback.hidden = false;
  nextButton.disabled = false;
  nextButton.innerHTML = 'Try again <span>↻</span>';
});

renderQuestion();
