/*
 * Общий модуль локальной админки.
 *
 * Подключается на index.html, domain.html и admin.html.
 * Если /api/admin/status недоступен (GitHub Pages), модуль молча выключается:
 * никакие админ-кнопки не появляются.
 */
(() => {
  'use strict';

  const PREVIEW_KEY = 'dokaAdminPreview';
  const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  const TRANSLIT = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c',
    ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e',
    ю: 'yu', я: 'ya',
  };

  function slugify(value) {
    let out = '';
    for (const ch of String(value ?? '').toLowerCase()) {
      if (TRANSLIT[ch] !== undefined) out += TRANSLIT[ch];
      else if (/[a-z0-9]/.test(ch)) out += ch;
      else out += '-';
    }
    return out.replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function apiUrl(pathname) {
    return new URL('.' + pathname, window.location.href).href;
  }

  /* ====================================================================== *
   * Доступность бэкенда                                                   *
   * ====================================================================== */

  let availablePromise = null;

  function ready() {
    if (!availablePromise) {
      availablePromise = (async () => {
        try {
          const res = await fetch(apiUrl('/api/admin/status'), {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
          });
          if (!res.ok) return false;
          const data = await res.json();
          return Boolean(data && data.admin);
        } catch (_) {
          return false;
        }
      })();
    }
    return availablePromise;
  }

  /* ====================================================================== *
   * Переключение «админ-режим / просмотр»                                 *
   * ====================================================================== */

  function readPreviewMode() {
    try {
      return localStorage.getItem(PREVIEW_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function writePreviewMode(enabled) {
    try {
      localStorage.setItem(PREVIEW_KEY, enabled ? '1' : '0');
    } catch (_) {
      /* приватный режим может запрещать localStorage */
    }
  }

  function applyPreviewMode(enabled) {
    if (!document.body) return;
    document.body.classList.toggle('doka-preview-mode', Boolean(enabled));

    document.querySelectorAll('.doka-mode-toggle').forEach((button) => {
      button.setAttribute('aria-pressed', String(Boolean(enabled)));
      button.textContent = enabled ? '✎ Админ-режим' : '👁 Просмотр';
      button.title = enabled
        ? 'Вернуться в режим редактирования'
        : 'Скрыть кнопки редактирования и поля порядка';
    });
  }

  function mountModeToggle() {
    const host =
      document.querySelector('.header-right') ||
      document.querySelector('.site-header') ||
      document.body;
    if (!host) return;

    let button = host.querySelector('.doka-mode-toggle');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'doka-mode-toggle';
      button.addEventListener('click', () => {
        const next = !document.body.classList.contains('doka-preview-mode');
        writePreviewMode(next);
        applyPreviewMode(next);
      });
      host.appendChild(button);
    }

    applyPreviewMode(readPreviewMode());
  }

  /* ====================================================================== *
   * Выпадающие меню действий                                             *
   * ====================================================================== */

  function closeActionMenus(except) {
    document.querySelectorAll('.doka-actions[open]').forEach((details) => {
      if (details !== except) details.open = false;
    });
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest || !event.target.closest('.doka-actions')) {
      closeActionMenus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeActionMenus();
  });

  function createActionsMenu({ kind, data = {}, actions = [], ariaLabel = 'Действия' }) {
    const details = document.createElement('details');
    details.className = 'doka-actions';
    details.dataset.kind = kind;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        details.dataset[key] = String(value);
      }
    }

    const summary = document.createElement('summary');
    summary.className = 'doka-actions-toggle';
    summary.title = ariaLabel;
    summary.setAttribute('aria-label', ariaLabel);
    summary.textContent = '›';

    const menu = document.createElement('div');
    menu.className = 'doka-actions-menu';
    menu.setAttribute('role', 'menu');

    for (const action of actions) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className =
        'doka-actions-item' +
        (action.danger ? ' doka-actions-item--danger' : '');
      button.dataset.action = action.action;
      button.setAttribute('role', 'menuitem');
      button.textContent = action.label;
      menu.appendChild(button);
    }

    details.appendChild(summary);
    details.appendChild(menu);
    return details;
  }

  async function request(pathname, options = {}) {
    if (!(await ready())) {
      throw new Error('Локальный сервер админки недоступен.');
    }

    const { method = 'GET', body } = options;
    const headers = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';

    let res;
    try {
      res = await fetch(apiUrl(pathname), {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        cache: 'no-store',
      });
    } catch (_) {
      throw new Error('Не удалось связаться с локальным сервером.');
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `Ошибка ${res.status}.`);
    }
    return data;
  }

  /* ====================================================================== *
   * Модальные окна                                                        *
   * ====================================================================== */

  function openDialog(config) {
    return new Promise((resolve) => {
      const {
        title,
        description = '',
        submitLabel = 'Создать',
        cancelLabel = 'Отмена',
        fields = [],
        onSubmit,
        className = '',
      } = config;

      const overlay = document.createElement('div');
      overlay.className = 'doka-modal';

      const card = document.createElement('div');
      card.className = 'doka-modal-card' + (className ? ' ' + className : '');
      card.setAttribute('role', 'dialog');
      card.setAttribute('aria-modal', 'true');

      const heading = document.createElement('h2');
      heading.textContent = title;
      card.appendChild(heading);

      if (description) {
        const desc = document.createElement('p');
        desc.className = 'doka-modal-desc';
        desc.textContent = description;
        card.appendChild(desc);
      }

      const form = document.createElement('form');
      form.className = 'doka-modal-form';
      form.noValidate = true;
      card.appendChild(form);

      const controls = new Map();
      let autofocusInput = null;

      for (const field of fields) {
        const wrap = document.createElement('div');
        wrap.className = 'doka-field';

        const label = document.createElement('label');
        label.textContent = field.label;
        wrap.appendChild(label);

        let input;
        let getValue;

        if (field.type === 'textarea') {
          input = document.createElement('textarea');
          input.className = 'doka-input doka-textarea';
          input.rows = field.rows || 3;
          if (field.placeholder) input.placeholder = field.placeholder;
          input.value = field.value || '';
          getValue = () => input.value.trim();
        } else if (field.type === 'select') {
          input = document.createElement('select');
          input.className = 'doka-input doka-select';
          for (const option of field.options || []) {
            const el = document.createElement('option');
            el.value = option.value;
            el.textContent = option.label;
            input.appendChild(el);
          }
          input.value = field.value || (field.options?.[0]?.value ?? '');
          getValue = () => input.value;
        } else if (field.type === 'color') {
          input = document.createElement('div');
          input.className = 'doka-color-row';

          const native = document.createElement('input');
          native.type = 'color';
          native.className = 'doka-color-native';
          native.value = field.value || '#6c47ff';

          const hex = document.createElement('input');
          hex.type = 'text';
          hex.className = 'doka-input doka-color-hex';
          hex.value = field.value || '#6c47ff';
          hex.maxLength = 7;
          hex.spellcheck = false;
          hex.placeholder = '#6c47ff';

          native.addEventListener('input', () => {
            hex.value = native.value;
          });
          hex.addEventListener('input', () => {
            if (/^#[0-9a-fA-F]{6}$/.test(hex.value.trim())) {
              native.value = hex.value.trim();
            }
          });

          input.appendChild(native);
          input.appendChild(hex);
          getValue = () => hex.value.trim();
          label.htmlFor = '';
          autofocusInput = autofocusInput || hex;
        } else {
          input = document.createElement('input');
          input.type = field.type === 'password' ? 'password' : 'text';
          input.className = 'doka-input';
          if (field.placeholder) input.placeholder = field.placeholder;
          input.value = field.value || '';
          input.autocomplete = field.type === 'password' ? 'current-password' : 'off';
          if (field.spellcheck === false) input.spellcheck = false;
          getValue = () => input.value.trim();
        }

        if (field.type !== 'color') {
          const id = 'doka-field-' + field.name;
          input.id = id;
          label.htmlFor = id;
          if (field.autofocus) autofocusInput = input;
        }

        wrap.appendChild(input);

        if (field.hint) {
          const hint = document.createElement('p');
          hint.className = 'doka-hint';
          hint.textContent = field.hint;
          wrap.appendChild(hint);
        }

        form.appendChild(wrap);
        controls.set(field.name, { input, getValue, field });

        if (field.slug) {
          input.spellcheck = false;
          input.autocomplete = 'off';
        }
      }

      // Плейсхолдер фактического имени = транслит названия.
      for (const field of fields) {
        if (!field.derive) continue;
        const target = controls.get(field.name);
        const source = controls.get(field.derive);
        if (!target || !source || target.field.type === 'color') continue;

        let touched = Boolean(String(target.getValue() || '').trim());
        const refresh = () => {
          if (touched) return;
          const generated = slugify(source.input.value);
          target.input.placeholder = generated || field.placeholder || '';
        };

        source.input.addEventListener('input', refresh);
        target.input.addEventListener('input', () => {
          touched = Boolean(target.input.value.trim());
          refresh();
        });
        refresh();
      }

      const errorEl = document.createElement('p');
      errorEl.className = 'doka-modal-error';
      errorEl.setAttribute('aria-live', 'polite');
      form.appendChild(errorEl);

      const actions = document.createElement('div');
      actions.className = 'doka-modal-actions';

      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'doka-btn doka-btn-ghost';
      cancelBtn.textContent = cancelLabel;

      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'doka-btn doka-btn-primary';
      submitBtn.textContent = submitLabel;

      actions.appendChild(cancelBtn);
      actions.appendChild(submitBtn);
      form.appendChild(actions);

      overlay.appendChild(card);
      document.body.appendChild(overlay);
      document.body.classList.add('doka-modal-open');

      function close(result) {
        overlay.remove();
        document.removeEventListener('keydown', onKey);
        if (!document.querySelector('.doka-modal')) {
          document.body.classList.remove('doka-modal-open');
        }
        resolve(result);
      }

      function onKey(event) {
        if (event.key === 'Escape') close(null);
      }

      document.addEventListener('keydown', onKey);
      cancelBtn.addEventListener('click', () => close(null));
      overlay.addEventListener('mousedown', (event) => {
        if (event.target === overlay) close(null);
      });

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorEl.textContent = '';

        const values = {};
        for (const [name, control] of controls) {
          values[name] = control.getValue();
        }

        // Если фактическое имя пустое — подставляем транслит названия.
        for (const field of fields) {
          if (field.derive && !values[field.name]) {
            values[field.name] = slugify(values[field.derive] || '');
          }
          if (field.slug) {
            values[field.name] = String(values[field.name] || '').trim();
            if (!SLUG_RE.test(values[field.name])) {
              errorEl.textContent =
                'Фактическое имя: только латиница в нижнем регистре, цифры и дефис.';
              return;
            }
          }
          if (field.type === 'color' && !/^#[0-9a-fA-F]{6}$/.test(values[field.name])) {
            errorEl.textContent = 'Цвет должен быть в формате #RRGGBB.';
            return;
          }
          if (field.required && !values[field.name]) {
            errorEl.textContent = `Заполните поле «${field.label}».`;
            return;
          }
        }

        try {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Подождите…';
          const result = await onSubmit(values);
          if (result !== false) close(values);
        } catch (error) {
          errorEl.textContent = error?.message || String(error);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        }
      });

      requestAnimationFrame(() => {
        if (autofocusInput) autofocusInput.focus();
      });
    });
  }

  /* ====================================================================== *
   * Уведомления                                                           *
   * ====================================================================== */

  function toast(message, type = 'info') {
    let host = document.getElementById('dokaToastHost');
    if (!host) {
      host = document.createElement('div');
      host.id = 'dokaToastHost';
      host.className = 'doka-toast-host';
      document.body.appendChild(host);
    }

    const item = document.createElement('div');
    item.className = 'doka-toast' + (type ? ' doka-toast--' + type : '');
    item.textContent = message;
    host.appendChild(item);

    setTimeout(() => {
      item.classList.add('doka-toast--hiding');
      setTimeout(() => item.remove(), 200);
    }, 3500);
  }

  /* ====================================================================== *
   * Диалоги создания                                                      *
   * ====================================================================== */

  async function createDomainDialog() {
    if (!(await ready())) return;

    const values = await openDialog({
      title: 'Новая область',
      description:
        'Область — крупный раздел документации. Она появится на главной странице.',
      submitLabel: 'Создать область',
      fields: [
        {
          name: 'title',
          label: 'Название',
          type: 'text',
          placeholder: 'Например: Базы данных (SQL)',
          required: true,
          autofocus: true,
        },
        {
          name: 'slug',
          label: 'Фактическое имя',
          type: 'text',
          placeholder: 'bazy-dannyh',
          derive: 'title',
          slug: true,
          required: true,
          hint:
            'Имя папки. Если оставить пустым — подставится транслит названия.',
        },
        {
          name: 'accent',
          label: 'Акцентный цвет',
          type: 'color',
          value: '#6c47ff',
        },
        {
          name: 'description',
          label: 'Описание области',
          type: 'textarea',
          rows: 3,
          placeholder: 'Коротко о том, что внутри.',
        },
      ],
      onSubmit: async (data) => {
        await request('/api/admin/domain', { method: 'POST', body: data });
        toast(`Область «${data.title}» создана.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  async function createGroupDialog(domainId) {
    if (!(await ready())) return;

    const values = await openDialog({
      title: 'Новая группа',
      description: 'Группа объединяет темы внутри области.',
      submitLabel: 'Создать группу',
      fields: [
        {
          name: 'title',
          label: 'Название',
          type: 'text',
          placeholder: 'Например: Основы',
          required: true,
          autofocus: true,
        },
        {
          name: 'slug',
          label: 'Фактическое имя',
          type: 'text',
          placeholder: 'osnovy',
          derive: 'title',
          slug: true,
          required: true,
          hint:
            'Имя папки группы. Если оставить пустым — подставится транслит названия.',
        },
      ],
      onSubmit: async (data) => {
        await request('/api/admin/group', {
          method: 'POST',
          body: { ...data, domain: domainId },
        });
        toast(`Группа «${data.title}» создана.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  async function createTopicDialog(domainId, groupId) {
    if (!(await ready())) return;

    let created = null;
    let editorTab = null;
    const values = await openDialog({
      title: 'Новая тема',
      description: 'Тема появится в конце выбранной группы.',
      submitLabel: 'Создать тему',
      fields: [
        {
          name: 'title',
          label: 'Название',
          type: 'text',
          placeholder: 'Например: Циклы в C#',
          required: true,
          autofocus: true,
        },
        {
          name: 'slug',
          label: 'Фактическое имя',
          type: 'text',
          placeholder: 'cikly',
          derive: 'title',
          slug: true,
          required: true,
          hint:
            'Имя файла без расширения. Если оставить пустым — подставится транслит названия.',
        },
        {
          name: 'type',
          label: 'Тип темы',
          type: 'select',
          value: 'md',
          options: [
            { value: 'md', label: '.md — Markdown-тема' },
            { value: 'html', label: '.html — интерактивная страница' },
          ],
        },
      ],
      onSubmit: async (data) => {
        // Вкладку открываем сразу по действию пользователя, иначе браузер
        // может заблокировать popup после ожидания ответа сервера.
        if (!editorTab || editorTab.closed) {
          editorTab = window.open('about:blank', '_blank');
          if (editorTab) editorTab.opener = null;
        }

        try {
          created = await request('/api/admin/topic', {
            method: 'POST',
            body: { ...data, domain: domainId, group: groupId },
          });
          toast('Тема создана, открываю редактор…', 'success');
        } catch (error) {
          if (editorTab && !editorTab.closed) editorTab.close();
          editorTab = null;
          throw error;
        }
      },
    });

    if (values && created?.path) {
      const target = 'admin.html?path=' + encodeURIComponent(created.path);
      if (editorTab && !editorTab.closed) {
        editorTab.location.href = target;
      } else if (!window.open(target, '_blank')) {
        window.location.href = target;
      }
    } else if (editorTab && !editorTab.closed) {
      editorTab.close();
    }
  }

  async function editDomainDialog(domain) {
    if (!(await ready())) return;

    const id = String(domain?.id || '');
    if (!id) return;

    const values = await openDialog({
      title: 'Редактировать область',
      description: 'Название, цвет и описание обновятся на сайте.',
      submitLabel: 'Сохранить',
      fields: [
        {
          name: 'title',
          label: 'Название',
          type: 'text',
          value: domain.title || '',
          required: true,
          autofocus: true,
        },
        {
          name: 'slug',
          label: 'Фактическое имя',
          type: 'text',
          value: id,
          slug: true,
          required: true,
          hint:
            'Имя папки области. При изменении изменится адрес страницы области.',
        },
        {
          name: 'accent',
          label: 'Акцентный цвет',
          type: 'color',
          value: domain.accent || '#6c47ff',
        },
        {
          name: 'description',
          label: 'Описание области',
          type: 'textarea',
          value: domain.description || '',
          rows: 3,
          placeholder: 'Коротко о том, что внутри.',
        },
      ],
      onSubmit: async (data) => {
        await request('/api/admin/domain', {
          method: 'PUT',
          body: { ...data, domain: id },
        });
        toast(`Область «${data.title}» сохранена.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  async function editGroupDialog(domainId, group) {
    if (!(await ready())) return;

    const id = String(group?.id || '');
    if (!id) return;

    const values = await openDialog({
      title: 'Редактировать группу',
      description: 'Название группы появится в списке тем области.',
      submitLabel: 'Сохранить',
      fields: [
        {
          name: 'title',
          label: 'Название',
          type: 'text',
          value: group.title || '',
          required: true,
          autofocus: true,
        },
        {
          name: 'slug',
          label: 'Фактическое имя',
          type: 'text',
          value: id,
          slug: true,
          required: true,
          hint:
            'Имя папки группы. При изменении изменится адрес страниц внутри неё.',
        },
      ],
      onSubmit: async (data) => {
        await request('/api/admin/group', {
          method: 'PUT',
          body: { ...data, domain: domainId, group: id },
        });
        toast(`Группа «${data.title}» сохранена.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  async function deleteDomainDialog(domain) {
    if (!(await ready())) return;

    const id = String(domain?.id || '');
    const title = String(domain?.title || id).trim();
    if (!id) return;

    const values = await openDialog({
      title: 'Удалить область?',
      description:
        `Область «${title}», все её группы и темы будут удалены. ` +
        'Это действие нельзя отменить. Чтобы подтвердить, введите название области.',
      submitLabel: 'Удалить область',
      className: 'doka-modal--narrow doka-modal--danger',
      fields: [
        {
          name: 'confirm',
          label: 'Название области',
          type: 'text',
          placeholder: title,
          required: true,
          autofocus: true,
          spellcheck: false,
        },
      ],
      onSubmit: async (data) => {
        if (data.confirm !== title) {
          throw new Error('Название не совпадает. Удаление отменено.');
        }
        await request('/api/admin/delete', {
          method: 'POST',
          body: { kind: 'domain', domain: id },
        });
        toast(`Область «${title}» удалена.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  async function deleteGroupDialog(domainId, group) {
    if (!(await ready())) return;

    const id = String(group?.id || '');
    const title = String(group?.title || id).trim();
    if (!id) return;

    const values = await openDialog({
      title: 'Удалить группу?',
      description:
        `Группа «${title}» и все её темы будут удалены. ` +
        'Это действие нельзя отменить. Чтобы подтвердить, введите название группы.',
      submitLabel: 'Удалить группу',
      className: 'doka-modal--narrow doka-modal--danger',
      fields: [
        {
          name: 'confirm',
          label: 'Название группы',
          type: 'text',
          placeholder: title,
          required: true,
          autofocus: true,
          spellcheck: false,
        },
      ],
      onSubmit: async (data) => {
        if (data.confirm !== title) {
          throw new Error('Название не совпадает. Удаление отменено.');
        }
        await request('/api/admin/delete', {
          method: 'POST',
          body: { kind: 'group', domain: domainId, group: id },
        });
        toast(`Группа «${title}» удалена.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  async function deleteTopicDialog(topic) {
    if (!(await ready())) return;

    const filePath = String(topic?.path || '');
    const title = String(topic?.title || filePath).trim();
    if (!filePath) return;

    const values = await openDialog({
      title: 'Удалить тему?',
      description:
        `Тема «${title}» будет удалена вместе с файлом. ` +
        'Это действие нельзя отменить.',
      submitLabel: 'Удалить тему',
      className: 'doka-modal--narrow doka-modal--danger',
      onSubmit: async () => {
        await request('/api/admin/delete', {
          method: 'POST',
          body: { kind: 'topic', path: filePath },
        });
        toast(`Тема «${title}» удалена.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  async function moveTopicDialog(topic, groups) {
    if (!(await ready())) return;

    const filePath = String(topic?.path || '');
    const sourceGroup = String(topic?.group || '');
    const title = String(topic?.title || filePath).trim();
    if (!filePath) return;

    const targets = (Array.isArray(groups) ? groups : [])
      .filter((group) => group && group.id && group.id !== sourceGroup)
      .map((group) => ({
        value: String(group.id),
        label: String(group.name || group.id),
      }));

    if (!targets.length) {
      toast('В этой области нет других групп для перемещения.', 'error');
      return;
    }

    const values = await openDialog({
      title: 'Переместить тему',
      description:
        `Тема «${title}» будет перемещена в выбранную группу. ` +
        'Её порядок в новой группе будет назначен автоматически.',
      submitLabel: 'Переместить',
      fields: [
        {
          name: 'target',
          label: 'Группа назначения',
          type: 'select',
          value: targets[0].value,
          options: targets,
        },
      ],
      onSubmit: async (data) => {
        await request('/api/admin/topic/move', {
          method: 'POST',
          body: { path: filePath, targetGroup: data.target },
        });
        toast(`Тема «${title}» перемещена.`, 'success');
      },
    });

    if (values) window.location.reload();
  }

  /* ====================================================================== *
   * Сортировка (order)                                                    *
   * ====================================================================== */

  function elementOrder(element) {
    const input = element.querySelector('.doka-order-input');
    if (!input) return 0;
    const value = Number(input.dataset.order ?? input.value);
    return Number.isFinite(value) ? value : 0;
  }

  function reorderChildren(container, itemSelector, addSelector) {
    if (!container) return;

    const items = [...container.children].filter((element) =>
      element.matches(itemSelector)
    );
    items.sort((a, b) => {
      const diff = elementOrder(a) - elementOrder(b);
      if (diff !== 0) return diff;
      return (a.textContent || '').localeCompare(b.textContent || '', 'ru');
    });

    const anchor = container.querySelector(addSelector) || null;
    for (const item of items) {
      container.insertBefore(item, anchor);
    }
  }

  function reorderAfterOrderChange(input) {
    const kind = input.dataset.kind;

    if (kind === 'domain') {
      reorderChildren(
        document.getElementById('domainsList'),
        '.domain-item[data-domain]',
        '.doka-add-domain-item'
      );
    } else if (kind === 'group') {
      reorderChildren(
        document.getElementById('groupsContainer'),
        '.group-section:not(.doka-add-group)',
        '.doka-add-group'
      );
    } else {
      const column = input.closest('.topics-columns');
      if (column) {
        reorderChildren(column, '.topic-row', '.doka-add-topic');
      }
    }
  }

  async function changeOrder(input) {
    if (!input || input.disabled) return;

    const previous = input.dataset.order ?? '';
    const next = Number(input.value);

    if (!Number.isInteger(next) || next < 0) {
      input.value = previous;
      toast('Порядок должен быть целым неотрицательным числом.', 'error');
      return;
    }

    input.disabled = true;
    try {
      await request('/api/admin/order', {
        method: 'POST',
        body: {
          kind: input.dataset.kind,
          domain: input.dataset.domain || undefined,
          group: input.dataset.group || undefined,
          url: input.dataset.url || undefined,
          order: next,
        },
      });

      input.dataset.order = String(next);
      input.value = String(next);
      reorderAfterOrderChange(input);
      toast('Порядок обновлён.', 'success');
    } catch (error) {
      input.value = previous;
      toast(error?.message || String(error), 'error');
    } finally {
      input.disabled = false;
    }
  }

  function bindOrderInputs(root) {
    if (!root || root.dataset.dokaOrderBound === '1') return;
    root.dataset.dokaOrderBound = '1';
    root.addEventListener('change', (event) => {
      const input = event.target.closest('.doka-order-input');
      if (input) changeOrder(input);
    });
  }

  /* ====================================================================== *
   * Кнопки на страницах                                                   *
   * ====================================================================== */

  async function mountIndex(domains = []) {
    if (!(await ready())) return;

    const list = document.getElementById('domainsList');
    if (!list) return;

    mountModeToggle();

    const byId = new Map(
      (Array.isArray(domains) ? domains : []).map((domain) => [
        String(domain.id || ''),
        domain,
      ])
    );

    list.querySelectorAll('.domain-item').forEach((item) => {
      const link = item.querySelector('a[href*="domain.html?id="]');
      if (!link) return;

      let id = '';
      try {
        id = new URL(link.href, window.location.href).searchParams.get('id') || '';
      } catch (_) {
        id = '';
      }
      if (!id) return;

      const data = byId.get(id) || { id, title: link.textContent, order: 0 };
      item.dataset.domain = id;
      item.dataset.order = String(data.order ?? 0);

      if (item.querySelector('.doka-domain-controls')) return;

      let row = item.querySelector('.doka-domain-row');
      if (!row) {
        row = document.createElement('div');
        row.className = 'doka-domain-row';
        link.before(row);
        row.appendChild(link);
      }

      const controls = document.createElement('div');
      controls.className = 'doka-domain-controls';

      const orderInput = document.createElement('input');
      orderInput.type = 'number';
      orderInput.min = '0';
      orderInput.step = '10';
      orderInput.className = 'doka-order-input';
      orderInput.value = String(data.order ?? 0);
      orderInput.dataset.kind = 'domain';
      orderInput.dataset.domain = id;
      orderInput.dataset.order = String(data.order ?? 0);
      orderInput.setAttribute('aria-label', `Порядок области «${data.title || id}»`);

      const actions = createActionsMenu({
        kind: 'domain',
        data: { domain: id, title: data.title || id },
        ariaLabel: `Действия с областью «${data.title || id}»`,
        actions: [
          { action: 'edit', label: 'Изменить' },
          { action: 'delete', label: 'Удалить', danger: true },
        ],
      });

      controls.appendChild(orderInput);
      controls.appendChild(actions);
      row.appendChild(controls);
    });

    if (!list.dataset.dokaBound) {
      list.dataset.dokaBound = '1';
      list.addEventListener('click', (event) => {
        const toggle = event.target.closest('.doka-actions-toggle');
        if (toggle) {
          closeActionMenus(toggle.closest('.doka-actions'));
          return;
        }

        const action = event.target.closest('.doka-actions-item');
        if (!action) return;

        const menu = action.closest('.doka-actions');
        if (!menu) return;

        const id = menu.dataset.domain || '';
        const title = menu.dataset.title || byId.get(id)?.title || id;
        if (!id) return;

        menu.open = false;

        if (action.dataset.action === 'edit') {
          editDomainDialog({
            id,
            title,
            accent: byId.get(id)?.accent || '#6c47ff',
            description: byId.get(id)?.description || '',
          });
        } else if (action.dataset.action === 'delete') {
          deleteDomainDialog({ id, title });
        }
      });
    }
    bindOrderInputs(list);

    if (!list.querySelector('.doka-add-domain-item')) {
      const item = document.createElement('li');
      item.className = 'domain-item doka-add-domain-item';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'doka-add-btn doka-add-domain';
      button.textContent = '+ область';
      button.addEventListener('click', createDomainDialog);

      item.appendChild(button);
      list.appendChild(item);
    }
  }

  function bindDomainPage(domainId, groups = []) {
    const container = document.getElementById('groupsContainer');
    if (!container) return;

    mountModeToggle();
    bindOrderInputs(container);

    if (container.dataset.dokaBound === '1') return;
    container.dataset.dokaBound = '1';

    container.addEventListener('click', (event) => {
      const toggle = event.target.closest('.doka-actions-toggle');
      if (toggle) {
        closeActionMenus(toggle.closest('.doka-actions'));
        return;
      }

      const action = event.target.closest('.doka-actions-item');
      if (action) {
        const menu = action.closest('.doka-actions');
        if (!menu) return;

        const kind = menu.dataset.kind;
        const actionName = action.dataset.action;
        menu.open = false;

        if (kind === 'topic') {
          const topic = {
            path: menu.dataset.path || '',
            title: menu.dataset.title || '',
            group: menu.dataset.group || '',
          };

          if (actionName === 'edit') {
            if (topic.path) {
              window.open(
                'admin.html?path=' + encodeURIComponent(topic.path),
                '_blank',
                'noopener'
              );
            }
          } else if (actionName === 'move') {
            moveTopicDialog(topic, groups);
          } else if (actionName === 'delete') {
            deleteTopicDialog(topic);
          }
        } else if (kind === 'group') {
          const group = {
            id: menu.dataset.group || '',
            title: menu.dataset.title || '',
          };

          if (actionName === 'edit') {
            editGroupDialog(domainId, group);
          } else if (actionName === 'delete') {
            deleteGroupDialog(domainId, group);
          }
        }

        return;
      }

      const addTopic = event.target.closest('.doka-add-topic');
      if (addTopic) {
        createTopicDialog(domainId, addTopic.dataset.group);
        return;
      }

      const addGroup = event.target.closest('.doka-add-group-btn');
      if (addGroup) {
        createGroupDialog(domainId);
      }
    });
  }

  applyPreviewMode(readPreviewMode());

  window.DokaAdmin = {
    ready,
    request,
    api: request,
    toast,
    openDialog,
    slugify,
    escapeHtml,
    mountIndex,
    bindDomainPage,
    createDomainDialog,
    createGroupDialog,
    createTopicDialog,
    editDomainDialog,
    editGroupDialog,
    deleteDomainDialog,
    deleteGroupDialog,
    deleteTopicDialog,
    moveTopicDialog,
    changeOrder,
  };
})();
