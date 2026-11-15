/*
 * Мини-тесты для Markdown-карточек.
 *
 * Автор пишет блок:
 *
 * ```quiz
 * { "type": "radio", "question": "...", "options": [...] }
 * ```
 *
 * Поддерживаются:
 *   radio / single / ratio  — один правильный вариант;
 *   checkbox / multiple     — несколько правильных;
 *   match / wires / provoda — соединить левое с правым.
 *
 * Текст вопроса, вариантов и объяснений поддерживает `код` в обратных
 * кавычках и переносы строк. HTML не поддерживается: всё вставляется
 * через textContent, чтобы автор случайно не сломал страницу.
 */
(() => {
  'use strict';

  let quizCounter = 0;

  const TYPE_ALIASES = {
    radio: 'radio',
    single: 'radio',
    ratio: 'radio',
    checkbox: 'checkbox',
    multiple: 'checkbox',
    multi: 'checkbox',
    match: 'match',
    wires: 'match',
    provoda: 'match',
  };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function formatInto(target, value) {
    const text = String(value ?? '');
    const parts = text.split(/(`[^`]*`)/g);

    for (const part of parts) {
      if (!part) continue;

      if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
        const code = document.createElement('code');
        code.textContent = part.slice(1, -1);
        target.appendChild(code);
        continue;
      }

      const lines = part.split('\n');
      lines.forEach((line, index) => {
        if (index) target.appendChild(document.createElement('br'));
        if (line) target.appendChild(document.createTextNode(line));
      });
    }
  }

  function normalizeType(data) {
    if (data && data.type) {
      const type = String(data.type).toLowerCase();
      return TYPE_ALIASES[type] || type;
    }

    if (data && Array.isArray(data.pairs)) return 'match';
    if (data && Array.isArray(data.options)) {
      const correct = data.options.filter((item) => item && item.correct).length;
      return correct > 1 ? 'checkbox' : 'radio';
    }
    return '';
  }

  function validate(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('тест должен быть JSON-объектом');
    }

    const type = normalizeType(data);
    if (!type) throw new Error('не указан type теста');
    if (!String(data.question || '').trim()) {
      throw new Error('не указан question');
    }

    if (type === 'radio' || type === 'checkbox') {
      if (!Array.isArray(data.options) || data.options.length < 2) {
        throw new Error('нужно минимум два варианта options');
      }

      const correct = data.options.filter((item) => item && item.correct);
      if (!correct.length) throw new Error('нет ни одного правильного варианта');

      if (type === 'radio' && correct.length !== 1) {
        throw new Error('для radio должен быть ровно один correct');
      }

      data.options.forEach((item, index) => {
        if (!item || !String(item.text || '').trim()) {
          throw new Error(`у варианта ${index + 1} нет text`);
        }
      });
    }

    if (type === 'match') {
      if (!Array.isArray(data.pairs) || data.pairs.length < 2) {
        throw new Error('нужно минимум две пары pairs');
      }

      data.pairs.forEach((pair, index) => {
        if (!pair || !String(pair.left || '').trim() || !String(pair.right || '').trim()) {
          throw new Error(`в паре ${index + 1} нужны left и right`);
        }
      });
    }

    if (type !== 'radio' && type !== 'checkbox' && type !== 'match') {
      throw new Error(`неизвестный type: ${type}`);
    }

    return type;
  }

  function hash(value) {
    let result = 2166136261;
    const text = String(value || '');
    for (let index = 0; index < text.length; index += 1) {
      result ^= text.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  }

  function shuffled(items, seed) {
    const result = [...items];
    let state = seed || 1;

    for (let index = result.length - 1; index > 0; index -= 1) {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const swap = state % (index + 1);
      [result[index], result[swap]] = [result[swap], result[index]];
    }

    // Если перемешивание случайно вернуло исходный порядок — сдвигаем.
    if (result.every((value, index) => value === index)) result.push(result.shift());
    return result;
  }

  function correctAnswerText(data, type) {
    if (type === 'match') {
      return data.pairs.map((pair) => `${pair.left} → ${pair.right}`).join('; ');
    }

    const correct = data.options.filter((item) => item.correct).map((item) => item.text);
    return correct.join('; ');
  }

  function showResult(result, kind, data, type) {
    result.replaceChildren();
    result.hidden = false;
    result.className = 'quiz-result is-' + kind;

    const titles = {
      correct: 'Верно',
      partial: 'Частично верно',
      wrong: 'Не совсем',
    };

    const title = element('p', 'quiz-result-title', titles[kind] || titles.wrong);
    result.appendChild(title);

    if (data.explanation) {
      const explanation = element('p', 'quiz-result-text');
      formatInto(explanation, data.explanation);
      result.appendChild(explanation);
    }

    if (kind !== 'correct') {
      const answer = element('p', 'quiz-result-answer');
      formatInto(answer, 'Правильный ответ: ' + correctAnswerText(data, type));
      result.appendChild(answer);
    }
  }

  function buildChoice(quiz, data, type, check, reset, result) {
    const options = element('div', 'quiz-options');
    const name = `quiz-${++quizCounter}`;
    const inputs = [];

    data.options.forEach((option, index) => {
      const label = element('label', 'quiz-option');
      const input = document.createElement('input');
      input.type = type === 'radio' ? 'radio' : 'checkbox';
      input.name = name;
      input.value = String(index);

      const box = element('span', 'quiz-box');
      box.setAttribute('aria-hidden', 'true');

      const text = element('span', 'quiz-option-text');
      formatInto(text, option.text);

      const note = element('span', 'quiz-option-note');
      note.setAttribute('aria-live', 'polite');

      label.append(input, box, text, note);
      options.appendChild(label);
      inputs.push(input);
    });

    quiz.appendChild(options);

    const syncButton = () => {
      check.disabled = !inputs.some((input) => input.checked);
    };

    inputs.forEach((input) => input.addEventListener('change', syncButton));

    check.addEventListener('click', () => {
      const selected = inputs
        .map((input, index) => (input.checked ? index : -1))
        .filter((index) => index >= 0);
      const correct = data.options
        .map((option, index) => (option.correct ? index : -1))
        .filter((index) => index >= 0);

      const exact =
        selected.length === correct.length &&
        selected.every((index) => correct.includes(index));
      const anyCorrect = selected.some((index) => correct.includes(index));
      const kind = exact ? 'correct' : type === 'checkbox' && anyCorrect ? 'partial' : 'wrong';

      inputs.forEach((input, index) => {
        const label = input.closest('.quiz-option');
        const isCorrect = correct.includes(index);
        const isSelected = input.checked;

        label.classList.remove('is-correct', 'is-wrong', 'is-missed');
        if (isCorrect && isSelected) label.classList.add('is-correct');
        else if (isCorrect && !isSelected) label.classList.add('is-missed');
        else if (!isCorrect && isSelected) label.classList.add('is-wrong');

        const note = label.querySelector('.quiz-option-note');
        if ((isCorrect || isSelected) && data.options[index].explanation) {
          formatInto(note, data.options[index].explanation);
        }

        input.disabled = true;
      });

      showResult(result, kind, data, type);
      check.hidden = true;
      reset.hidden = false;
    });

    reset.addEventListener('click', () => {
      inputs.forEach((input) => {
        input.checked = false;
        input.disabled = false;
        const label = input.closest('.quiz-option');
        label.classList.remove('is-correct', 'is-wrong', 'is-missed');
        label.querySelector('.quiz-option-note').replaceChildren();
      });
      result.hidden = true;
      result.replaceChildren();
      check.hidden = false;
      check.disabled = true;
      reset.hidden = true;
    });
  }

  function buildMatch(quiz, data, check, reset, result) {
    const board = element('div', 'quiz-match-board');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('quiz-match-lines');
    svg.setAttribute('aria-hidden', 'true');

    const leftColumn = element('div', 'quiz-match-col quiz-match-left');
    const rightColumn = element('div', 'quiz-match-col quiz-match-right');
    const leftButtons = [];
    const rightButtons = [];

    data.pairs.forEach((pair, index) => {
      const button = element('button', 'quiz-match-item');
      button.type = 'button';
      button.dataset.side = 'left';
      button.dataset.index = String(index);
      const text = element('span', 'quiz-match-text');
      formatInto(text, pair.left);
      button.appendChild(text);
      leftColumn.appendChild(button);
      leftButtons.push(button);
    });

    const order = shuffled(
      data.pairs.map((_, index) => index),
      hash(data.question)
    );

    order.forEach((index) => {
      const pair = data.pairs[index];
      const button = element('button', 'quiz-match-item');
      button.type = 'button';
      button.dataset.side = 'right';
      button.dataset.index = String(index);
      const text = element('span', 'quiz-match-text');
      formatInto(text, pair.right);
      button.appendChild(text);
      rightColumn.appendChild(button);
      rightButtons[index] = button;
    });

    board.append(svg, leftColumn, rightColumn);
    quiz.appendChild(board);

    const answers = element('div', 'quiz-match-answers');
    answers.hidden = true;
    quiz.appendChild(answers);

    const links = new Map();
    let activeLeft = null;
    let locked = false;

    const setActive = () => {
      leftButtons.forEach((button, index) => {
        button.classList.toggle('is-active', activeLeft === index);
        button.setAttribute('aria-pressed', activeLeft === index ? 'true' : 'false');
      });
      board.classList.toggle('is-connecting', activeLeft != null);
    };

    const drawLinks = () => {
      const boardRect = board.getBoundingClientRect();
      if (!boardRect.width || !boardRect.height) return;

      svg.setAttribute('viewBox', `0 0 ${boardRect.width} ${boardRect.height}`);
      svg.replaceChildren();

      for (const [leftIndex, rightIndex] of links) {
        const left = leftButtons[leftIndex];
        const right = rightButtons[rightIndex];
        if (!left || !right) continue;

        const leftRect = left.getBoundingClientRect();
        const rightRect = right.getBoundingClientRect();
        const x1 = leftRect.right - boardRect.left;
        const y1 = leftRect.top + leftRect.height / 2 - boardRect.top;
        const x2 = rightRect.left - boardRect.left;
        const y2 = rightRect.top + rightRect.height / 2 - boardRect.top;
        const middle = (x1 + x2) / 2;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute(
          'd',
          `M ${x1} ${y1} C ${middle} ${y1}, ${middle} ${y2}, ${x2} ${y2}`
        );
        path.classList.add('quiz-wire');
        if (locked) {
          path.classList.add(rightIndex === leftIndex ? 'is-correct' : 'is-wrong');
        }
        svg.appendChild(path);

        for (const [x, y] of [
          [x1, y1],
          [x2, y2],
        ]) {
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', String(x));
          dot.setAttribute('cy', String(y));
          dot.setAttribute('r', '3');
          dot.classList.add('quiz-wire-dot');
          if (locked) {
            dot.classList.add(rightIndex === leftIndex ? 'is-correct' : 'is-wrong');
          }
          svg.appendChild(dot);
        }
      }
    };

    const syncButton = () => {
      check.disabled = links.size === 0;
    };

    const clearRight = (rightIndex, exceptLeft) => {
      for (const [leftIndex, linkedRight] of links) {
        if (linkedRight === rightIndex && leftIndex !== exceptLeft) {
          links.delete(leftIndex);
        }
      }
    };

    leftButtons.forEach((button, index) => {
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        if (locked) return;

        if (links.has(index)) {
          links.delete(index);
          activeLeft = null;
        } else {
          activeLeft = activeLeft === index ? null : index;
        }

        setActive();
        syncButton();
        drawLinks();
      });
    });

    rightButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (locked) return;

        if (activeLeft == null) {
          clearRight(index, null);
        } else {
          clearRight(index, activeLeft);
          links.set(activeLeft, index);
          activeLeft = null;
        }

        setActive();
        syncButton();
        drawLinks();
      });
    });

    check.addEventListener('click', () => {
      locked = true;
      let correctCount = 0;

      leftButtons.forEach((button, index) => {
        const linked = links.get(index);
        const isCorrect = linked === index;
        if (isCorrect) correctCount += 1;

        button.classList.toggle('is-correct', isCorrect);
        button.classList.toggle('is-wrong', linked != null && !isCorrect);
        button.classList.toggle('is-missed', linked == null);
      });

      rightButtons.forEach((button, index) => {
        let source = null;
        for (const [leftIndex, rightIndex] of links) {
          if (rightIndex === index) {
            source = leftIndex;
            break;
          }
        }

        button.classList.toggle('is-correct', source === index);
        button.classList.toggle('is-wrong', source != null && source !== index);
        button.classList.toggle('is-missed', source == null);
      });

      const kind =
        correctCount === data.pairs.length
          ? 'correct'
          : correctCount > 0
            ? 'partial'
            : 'wrong';

      showResult(result, kind, data, 'match');

      answers.replaceChildren();
      const title = element('p', 'quiz-match-answers-title', 'Правильные пары');
      const list = document.createElement('ul');
      data.pairs.forEach((pair) => {
        const item = document.createElement('li');
        const left = document.createElement('strong');
        formatInto(left, pair.left);
        item.appendChild(left);
        item.appendChild(document.createTextNode(' → '));
        formatInto(item, pair.right);
        if (pair.explanation) {
          const note = element('span', 'quiz-match-answer-note');
          formatInto(note, ' — ' + pair.explanation);
          item.appendChild(note);
        }
        list.appendChild(item);
      });
      answers.append(title, list);
      answers.hidden = false;

      check.hidden = true;
      reset.hidden = false;
      activeLeft = null;
      setActive();
      drawLinks();
    });

    reset.addEventListener('click', () => {
      links.clear();
      activeLeft = null;
      locked = false;

      leftButtons.forEach((button) => {
        button.classList.remove('is-correct', 'is-wrong', 'is-missed', 'is-active');
        button.setAttribute('aria-pressed', 'false');
      });
      rightButtons.forEach((button) => {
        button.classList.remove('is-correct', 'is-wrong', 'is-missed');
      });

      result.hidden = true;
      result.replaceChildren();
      answers.hidden = true;
      answers.replaceChildren();
      check.hidden = false;
      check.disabled = true;
      reset.hidden = true;
      setActive();
      drawLinks();
    });

    if (window.ResizeObserver) {
      new ResizeObserver(drawLinks).observe(board);
    } else {
      window.addEventListener('resize', drawLinks);
    }

    requestAnimationFrame(drawLinks);
  }

  function build(data) {
    const type = validate(data);

    const quiz = element('section', 'quiz');
    quiz.dataset.quizType = type;

    const questionId = `quiz-question-${++quizCounter}`;
    quiz.setAttribute('role', 'group');
    quiz.setAttribute('aria-labelledby', questionId);

    const head = element('div', 'quiz-head');
    const kicker = element('span', 'quiz-kicker', 'Мини-тест');
    const question = element('p', 'quiz-question');
    question.id = questionId;
    formatInto(question, data.question);
    head.append(kicker, question);
    quiz.appendChild(head);

    const result = element('div', 'quiz-result');
    result.hidden = true;
    result.setAttribute('aria-live', 'polite');

    const actions = element('div', 'quiz-actions');
    const check = element('button', 'quiz-btn quiz-btn-primary', 'Проверить');
    check.type = 'button';
    check.disabled = true;

    const reset = element('button', 'quiz-btn quiz-btn-ghost', 'Ещё раз');
    reset.type = 'button';
    reset.hidden = true;

    actions.append(check, reset);

    if (type === 'match') {
      buildMatch(quiz, data, check, reset, result);
    } else {
      buildChoice(quiz, data, type, check, reset, result);
    }

    quiz.append(result, actions);
    return quiz;
  }

  function renderError(pre, message) {
    const box = element('div', 'quiz quiz-error');
    const title = element('p', 'quiz-error-title', 'Не удалось показать тест');
    const text = element('p', 'quiz-error-text', message);
    box.append(title, text);
    pre.replaceWith(box);
    console.error('[quiz]', message);
  }

  function isQuizCode(code) {
    if (!code || code.tagName !== 'CODE') return false;
    return (
      code.classList.contains('quiz') ||
      code.classList.contains('language-quiz') ||
      code.dataset.lang === 'quiz'
    );
  }

  function enhance(root) {
    const scope = root || document;
    const codes = Array.from(scope.querySelectorAll('pre > code')).filter(isQuizCode);

    for (const code of codes) {
      const pre = code.closest('pre');
      if (!pre) continue;

      try {
        const data = JSON.parse(code.textContent || '');
        pre.replaceWith(build(data));
      } catch (error) {
        renderError(pre, error && error.message ? error.message : 'некорректный JSON');
      }
    }
  }

  window.DokaQuiz = { enhance };
})();
