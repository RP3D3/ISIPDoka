/*
 * Прогресс чтения тем.
 *
 * Прочитанные темы хранятся в localStorage как массив путей вида
 * content/csharp/osnovy/hello-world.md. В интерфейсе непрочитанные
 * темы показываются с opacity 0.8, прочитанные — с opacity 1.
 *
 * Для тестов из консоли:
 *   DokaProgress.getRead()
 *   DokaProgress.isRead('content/.../topic.md')
 *   DokaProgress.markRead('content/.../topic.md')
 *   DokaProgress.markUnread('content/.../topic.md')
 *   DokaProgress.reset()   // очистить весь прогресс
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'dokaReadTopics';
  const CHANGE_EVENT = 'doka-progress-change';

  function normalize(url) {
    let value = String(url ?? '').trim();
    if (!value) return '';

    try {
      if (/^https?:\/\//i.test(value)) {
        value = new URL(value).pathname;
      }
    } catch (_) {
      /* оставляем строку как есть */
    }

    return value
      .replace(/^\.?\//, '')
      .split('#')[0]
      .split('?')[0];
  }

  function readSet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list)) return new Set();
      return new Set(list.map(normalize).filter(Boolean));
    } catch (_) {
      return new Set();
    }
  }

  function notify() {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }

  function writeSet(set) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    } catch (_) {
      /* приватный режим может запрещать localStorage */
    }
    notify();
  }

  function isRead(url) {
    const key = normalize(url);
    return Boolean(key) && readSet().has(key);
  }

  function markRead(url) {
    const key = normalize(url);
    if (!key) return false;

    const set = readSet();
    if (set.has(key)) return false;
    set.add(key);
    writeSet(set);
    return true;
  }

  function markUnread(url) {
    const key = normalize(url);
    if (!key) return false;

    const set = readSet();
    if (!set.delete(key)) return false;
    writeSet(set);
    return true;
  }

  function setRead(urls) {
    const set = new Set(
      (Array.isArray(urls) ? urls : []).map(normalize).filter(Boolean)
    );
    writeSet(set);
    return Array.from(set);
  }

  function getRead() {
    return Array.from(readSet());
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      /* приватный режим может запрещать localStorage */
    }
    notify();
  }

  window.DokaProgress = {
    key: STORAGE_KEY,
    changeEvent: CHANGE_EVENT,
    normalize,
    isRead,
    markRead,
    markUnread,
    setRead,
    getRead,
    getAll: getRead,
    reset,
    resetAll: reset,
    clear: reset,
  };
})();
