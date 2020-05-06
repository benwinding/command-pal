
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.21.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /*!
     * hotkeys-js v3.7.6
     * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
     * 
     * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
     * http://jaywcjlove.github.io/hotkeys
     * 
     * Licensed under the MIT license.
     */

    var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false; // 绑定事件

    function addEvent(object, event, method) {
      if (object.addEventListener) {
        object.addEventListener(event, method, false);
      } else if (object.attachEvent) {
        object.attachEvent("on".concat(event), function () {
          method(window.event);
        });
      }
    } // 修饰键转换成对应的键码


    function getMods(modifier, key) {
      var mods = key.slice(0, key.length - 1);

      for (var i = 0; i < mods.length; i++) {
        mods[i] = modifier[mods[i].toLowerCase()];
      }

      return mods;
    } // 处理传的key字符串转换成数组


    function getKeys(key) {
      if (typeof key !== 'string') key = '';
      key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等

      var keys = key.split(','); // 同时设置多个快捷键，以','分割

      var index = keys.lastIndexOf(''); // 快捷键可能包含','，需特殊处理

      for (; index >= 0;) {
        keys[index - 1] += ',';
        keys.splice(index, 1);
        index = keys.lastIndexOf('');
      }

      return keys;
    } // 比较修饰键的数组


    function compareArray(a1, a2) {
      var arr1 = a1.length >= a2.length ? a1 : a2;
      var arr2 = a1.length >= a2.length ? a2 : a1;
      var isIndex = true;

      for (var i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
      }

      return isIndex;
    }

    var _keyMap = {
      backspace: 8,
      tab: 9,
      clear: 12,
      enter: 13,
      "return": 13,
      esc: 27,
      escape: 27,
      space: 32,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      del: 46,
      "delete": 46,
      ins: 45,
      insert: 45,
      home: 36,
      end: 35,
      pageup: 33,
      pagedown: 34,
      capslock: 20,
      '⇪': 20,
      ',': 188,
      '.': 190,
      '/': 191,
      '`': 192,
      '-': isff ? 173 : 189,
      '=': isff ? 61 : 187,
      ';': isff ? 59 : 186,
      '\'': 222,
      '[': 219,
      ']': 221,
      '\\': 220
    }; // Modifier Keys

    var _modifier = {
      // shiftKey
      '⇧': 16,
      shift: 16,
      // altKey
      '⌥': 18,
      alt: 18,
      option: 18,
      // ctrlKey
      '⌃': 17,
      ctrl: 17,
      control: 17,
      // metaKey
      '⌘': 91,
      cmd: 91,
      command: 91
    };
    var modifierMap = {
      16: 'shiftKey',
      18: 'altKey',
      17: 'ctrlKey',
      91: 'metaKey',
      shiftKey: 16,
      ctrlKey: 17,
      altKey: 18,
      metaKey: 91
    };
    var _mods = {
      16: false,
      18: false,
      17: false,
      91: false
    };
    var _handlers = {}; // F1~F12 special key

    for (var k = 1; k < 20; k++) {
      _keyMap["f".concat(k)] = 111 + k;
    }

    var _downKeys = []; // 记录摁下的绑定键

    var _scope = 'all'; // 默认热键范围

    var elementHasBindEvent = []; // 已绑定事件的节点记录
    // 返回键码

    var code = function code(x) {
      return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
    }; // 设置获取当前范围（默认为'所有'）


    function setScope(scope) {
      _scope = scope || 'all';
    } // 获取当前范围


    function getScope() {
      return _scope || 'all';
    } // 获取摁下绑定键的键值


    function getPressedKeyCodes() {
      return _downKeys.slice(0);
    } // 表单控件控件判断 返回 Boolean
    // hotkey is effective only when filter return true


    function filter(event) {
      var target = event.target || event.srcElement;
      var tagName = target.tagName;
      var flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

      if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA') && !target.readOnly) {
        flag = false;
      }

      return flag;
    } // 判断摁下的键是否为某个键，返回true或者false


    function isPressed(keyCode) {
      if (typeof keyCode === 'string') {
        keyCode = code(keyCode); // 转换成键码
      }

      return _downKeys.indexOf(keyCode) !== -1;
    } // 循环删除handlers中的所有 scope(范围)


    function deleteScope(scope, newScope) {
      var handlers;
      var i; // 没有指定scope，获取scope

      if (!scope) scope = getScope();

      for (var key in _handlers) {
        if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
          handlers = _handlers[key];

          for (i = 0; i < handlers.length;) {
            if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
          }
        }
      } // 如果scope被删除，将scope重置为all


      if (getScope() === scope) setScope(newScope || 'all');
    } // 清除修饰键


    function clearModifier(event) {
      var key = event.keyCode || event.which || event.charCode;

      var i = _downKeys.indexOf(key); // 从列表中清除按压过的键


      if (i >= 0) {
        _downKeys.splice(i, 1);
      } // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题


      if (event.key && event.key.toLowerCase() === 'meta') {
        _downKeys.splice(0, _downKeys.length);
      } // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除


      if (key === 93 || key === 224) key = 91;

      if (key in _mods) {
        _mods[key] = false; // 将修饰键重置为false

        for (var k in _modifier) {
          if (_modifier[k] === key) hotkeys[k] = false;
        }
      }
    }

    function unbind(keysInfo) {
      // unbind(), unbind all keys
      if (!keysInfo) {
        Object.keys(_handlers).forEach(function (key) {
          return delete _handlers[key];
        });
      } else if (Array.isArray(keysInfo)) {
        // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
        keysInfo.forEach(function (info) {
          if (info.key) eachUnbind(info);
        });
      } else if (typeof keysInfo === 'object') {
        // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
        if (keysInfo.key) eachUnbind(keysInfo);
      } else if (typeof keysInfo === 'string') {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // support old method
        // eslint-disable-line
        var scope = args[0],
            method = args[1];

        if (typeof scope === 'function') {
          method = scope;
          scope = '';
        }

        eachUnbind({
          key: keysInfo,
          scope: scope,
          method: method,
          splitKey: '+'
        });
      }
    } // 解除绑定某个范围的快捷键


    var eachUnbind = function eachUnbind(_ref) {
      var key = _ref.key,
          scope = _ref.scope,
          method = _ref.method,
          _ref$splitKey = _ref.splitKey,
          splitKey = _ref$splitKey === void 0 ? '+' : _ref$splitKey;
      var multipleKeys = getKeys(key);
      multipleKeys.forEach(function (originKey) {
        var unbindKeys = originKey.split(splitKey);
        var len = unbindKeys.length;
        var lastKey = unbindKeys[len - 1];
        var keyCode = lastKey === '*' ? '*' : code(lastKey);
        if (!_handlers[keyCode]) return; // 判断是否传入范围，没有就获取范围

        if (!scope) scope = getScope();
        var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
        _handlers[keyCode] = _handlers[keyCode].map(function (record) {
          // 通过函数判断，是否解除绑定，函数相等直接返回
          var isMatchingMethod = method ? record.method === method : true;

          if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
            return {};
          }

          return record;
        });
      });
    }; // 对监听对应快捷键的回调函数进行处理


    function eventHandler(event, handler, scope) {
      var modifiersMatch; // 看它是否在当前范围

      if (handler.scope === scope || handler.scope === 'all') {
        // 检查是否匹配修饰符（如果有返回true）
        modifiersMatch = handler.mods.length > 0;

        for (var y in _mods) {
          if (Object.prototype.hasOwnProperty.call(_mods, y)) {
            if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
              modifiersMatch = false;
            }
          }
        } // 调用处理程序，如果是修饰键不做处理


        if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
          if (handler.method(event, handler) === false) {
            if (event.preventDefault) event.preventDefault();else event.returnValue = false;
            if (event.stopPropagation) event.stopPropagation();
            if (event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    } // 处理keydown事件


    function dispatch(event) {
      var asterisk = _handlers['*'];
      var key = event.keyCode || event.which || event.charCode; // 表单控件过滤 默认表单控件不触发快捷键

      if (!hotkeys.filter.call(this, event)) return; // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
      // Webkit左右 command 键值不一样

      if (key === 93 || key === 224) key = 91;
      /**
       * Collect bound keys
       * If an Input Method Editor is processing key input and the event is keydown, return 229.
       * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
       * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
       */

      if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
      /**
       * Jest test cases are required.
       * ===============================
       */

      ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(function (keyName) {
        var keyNum = modifierMap[keyName];

        if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
          _downKeys.push(keyNum);
        } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
          _downKeys.splice(_downKeys.indexOf(keyNum), 1);
        }
      });
      /**
       * -------------------------------
       */

      if (key in _mods) {
        _mods[key] = true; // 将特殊字符的key注册到 hotkeys 上

        for (var k in _modifier) {
          if (_modifier[k] === key) hotkeys[k] = true;
        }

        if (!asterisk) return;
      } // 将 modifierMap 里面的修饰键绑定到 event 中


      for (var e in _mods) {
        if (Object.prototype.hasOwnProperty.call(_mods, e)) {
          _mods[e] = event[modifierMap[e]];
        }
      }
      /**
       * https://github.com/jaywcjlove/hotkeys/pull/129
       * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
       * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
       * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
       */


      if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
        if (_downKeys.indexOf(17) === -1) {
          _downKeys.push(17);
        }

        if (_downKeys.indexOf(18) === -1) {
          _downKeys.push(18);
        }

        _mods[17] = true;
        _mods[18] = true;
      } // 获取范围 默认为 `all`


      var scope = getScope(); // 对任何快捷键都需要做的处理

      if (asterisk) {
        for (var i = 0; i < asterisk.length; i++) {
          if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
            eventHandler(event, asterisk[i], scope);
          }
        }
      } // key 不在 _handlers 中返回


      if (!(key in _handlers)) return;

      for (var _i = 0; _i < _handlers[key].length; _i++) {
        if (event.type === 'keydown' && _handlers[key][_i].keydown || event.type === 'keyup' && _handlers[key][_i].keyup) {
          if (_handlers[key][_i].key) {
            var record = _handlers[key][_i];
            var splitKey = record.splitKey;
            var keyShortcut = record.key.split(splitKey);
            var _downKeysCurrent = []; // 记录当前按键键值

            for (var a = 0; a < keyShortcut.length; a++) {
              _downKeysCurrent.push(code(keyShortcut[a]));
            }

            if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {
              // 找到处理内容
              eventHandler(event, record, scope);
            }
          }
        }
      }
    } // 判断 element 是否已经绑定事件


    function isElementBind(element) {
      return elementHasBindEvent.indexOf(element) > -1;
    }

    function hotkeys(key, option, method) {
      _downKeys = [];
      var keys = getKeys(key); // 需要处理的快捷键列表

      var mods = [];
      var scope = 'all'; // scope默认为all，所有范围都有效

      var element = document; // 快捷键事件绑定节点

      var i = 0;
      var keyup = false;
      var keydown = true;
      var splitKey = '+'; // 对为设定范围的判断

      if (method === undefined && typeof option === 'function') {
        method = option;
      }

      if (Object.prototype.toString.call(option) === '[object Object]') {
        if (option.scope) scope = option.scope; // eslint-disable-line

        if (option.element) element = option.element; // eslint-disable-line

        if (option.keyup) keyup = option.keyup; // eslint-disable-line

        if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line

        if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
      }

      if (typeof option === 'string') scope = option; // 对于每个快捷键进行处理

      for (; i < keys.length; i++) {
        key = keys[i].split(splitKey); // 按键列表

        mods = []; // 如果是组合快捷键取得组合快捷键

        if (key.length > 1) mods = getMods(_modifier, key); // 将非修饰键转化为键码

        key = key[key.length - 1];
        key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键
        // 判断key是否在_handlers中，不在就赋一个空数组

        if (!(key in _handlers)) _handlers[key] = [];

        _handlers[key].push({
          keyup: keyup,
          keydown: keydown,
          scope: scope,
          mods: mods,
          shortcut: keys[i],
          method: method,
          key: keys[i],
          splitKey: splitKey
        });
      } // 在全局document上设置快捷键


      if (typeof element !== 'undefined' && !isElementBind(element) && window) {
        elementHasBindEvent.push(element);
        addEvent(element, 'keydown', function (e) {
          dispatch(e);
        });
        addEvent(window, 'focus', function () {
          _downKeys = [];
        });
        addEvent(element, 'keyup', function (e) {
          dispatch(e);
          clearModifier(e);
        });
      }
    }

    var _api = {
      setScope: setScope,
      getScope: getScope,
      deleteScope: deleteScope,
      getPressedKeyCodes: getPressedKeyCodes,
      isPressed: isPressed,
      filter: filter,
      unbind: unbind
    };

    for (var a in _api) {
      if (Object.prototype.hasOwnProperty.call(_api, a)) {
        hotkeys[a] = _api[a];
      }
    }

    if (typeof window !== 'undefined') {
      var _hotkeys = window.hotkeys;

      hotkeys.noConflict = function (deep) {
        if (deep && window.hotkeys === hotkeys) {
          window.hotkeys = _hotkeys;
        }

        return hotkeys;
      };

      window.hotkeys = hotkeys;
    }

    /**
     * Fuse.js v5.2.3 - Lightweight fuzzy-search (http://fusejs.io)
     *
     * Copyright (c) 2020 Kiro Risk (http://kiro.me)
     * All Rights Reserved. Apache Software License 2.0
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     */

    const INFINITY = 1 / 0;

    const isArray = (value) =>
      !Array.isArray
        ? Object.prototype.toString.call(value) === '[object Array]'
        : Array.isArray(value);

    // Adapted from:
    // https://github.com/lodash/lodash/blob/f4ca396a796435422bd4fd41fadbd225edddf175/.internal/baseToString.js
    const baseToString = (value) => {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value
      }
      let result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result
    };

    const toString = (value) => (value == null ? '' : baseToString(value));

    const isString = (value) => typeof value === 'string';

    const isNumber = (value) => typeof value === 'number';

    const isDefined = (value) => value !== undefined && value !== null;

    const isBlank = (value) => !value.trim().length;

    function get(obj, path) {
      let list = [];
      let arr = false;

      const _get = (obj, path) => {
        if (!path) {
          // If there's no path left, we've gotten to the object we care about.
          list.push(obj);
        } else {
          const dotIndex = path.indexOf('.');

          let key = path;
          let remaining = null;

          if (dotIndex !== -1) {
            key = path.slice(0, dotIndex);
            remaining = path.slice(dotIndex + 1);
          }

          const value = obj[key];

          if (isDefined(value)) {
            if (!remaining && (isString(value) || isNumber(value))) {
              list.push(toString(value));
            } else if (isArray(value)) {
              arr = true;
              // Search each item in the array.
              for (let i = 0, len = value.length; i < len; i += 1) {
                _get(value[i], remaining);
              }
            } else if (remaining) {
              // An object. Recurse further.
              _get(value, remaining);
            }
          }
        }
      };

      _get(obj, path);

      if (arr) {
        return list
      }

      return list[0]
    }

    const MatchOptions = {
      // Whether the matches should be included in the result set. When true, each record in the result
      // set will include the indices of the matched characters.
      // These can consequently be used for highlighting purposes.
      includeMatches: false,
      // When true, the matching function will continue to the end of a search pattern even if
      // a perfect match has already been located in the string.
      findAllMatches: false,
      // Minimum number of characters that must be matched before a result is considered a match
      minMatchCharLength: 1
    };

    const BasicOptions = {
      // When true, the algorithm continues searching to the end of the input even if a perfect
      // match is found before the end of the same input.
      isCaseSensitive: false,
      // When true, the matching function will continue to the end of a search pattern even if
      includeScore: false,
      // List of properties that will be searched. This also supports nested properties.
      keys: [],
      // Whether to sort the result list, by score
      shouldSort: true,
      // Default sort function: sort by ascending score, ascending index
      sortFn: (a, b) =>
        a.score === b.score ? (a.idx < b.idx ? -1 : 1) : a.score < b.score ? -1 : 1
    };

    const FuzzyOptions = {
      // Approximately where in the text is the pattern expected to be found?
      location: 0,
      // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
      // (of both letters and location), a threshold of '1.0' would match anything.
      threshold: 0.6,
      // Determines how close the match must be to the fuzzy location (specified above).
      // An exact letter match which is 'distance' characters away from the fuzzy location
      // would score as a complete mismatch. A distance of '0' requires the match be at
      // the exact location specified, a threshold of '1000' would require a perfect match
      // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
      distance: 100
    };

    const AdvancedOptions = {
      // When true, it enables the use of unix-like search commands
      useExtendedSearch: false,
      // The get function to use when fetching an object's properties.
      // The default will search nested paths *ie foo.bar.baz*
      getFn: get
    };

    var Config = {
      ...BasicOptions,
      ...MatchOptions,
      ...FuzzyOptions,
      ...AdvancedOptions
    };

    function computeScore(
      pattern,
      {
        errors = 0,
        currentLocation = 0,
        expectedLocation = 0,
        distance = Config.distance
      } = {}
    ) {
      const accuracy = errors / pattern.length;
      const proximity = Math.abs(expectedLocation - currentLocation);

      if (!distance) {
        // Dodge divide by zero error.
        return proximity ? 1.0 : accuracy
      }

      return accuracy + proximity / distance
    }

    function convertMaskToIndices(
      matchmask = [],
      minMatchCharLength = Config.minMatchCharLength
    ) {
      let matchedIndices = [];
      let start = -1;
      let end = -1;
      let i = 0;

      for (let len = matchmask.length; i < len; i += 1) {
        let match = matchmask[i];
        if (match && start === -1) {
          start = i;
        } else if (!match && start !== -1) {
          end = i - 1;
          if (end - start + 1 >= minMatchCharLength) {
            matchedIndices.push([start, end]);
          }
          start = -1;
        }
      }

      // (i-1 - start) + 1 => i - start
      if (matchmask[i - 1] && i - start >= minMatchCharLength) {
        matchedIndices.push([start, i - 1]);
      }

      return matchedIndices
    }

    // Machine word size
    const MAX_BITS = 32;

    function search(
      text,
      pattern,
      patternAlphabet,
      {
        location = Config.location,
        distance = Config.distance,
        threshold = Config.threshold,
        findAllMatches = Config.findAllMatches,
        minMatchCharLength = Config.minMatchCharLength,
        includeMatches = Config.includeMatches
      } = {}
    ) {
      if (pattern.length > MAX_BITS) {
        throw new Error(`Pattern length exceeds max of ${MAX_BITS}.`)
      }

      const patternLen = pattern.length;
      // Set starting location at beginning text and initialize the alphabet.
      const textLen = text.length;
      // Handle the case when location > text.length
      const expectedLocation = Math.max(0, Math.min(location, textLen));
      // Highest score beyond which we give up.
      let currentThreshold = threshold;
      // Is there a nearby exact match? (speedup)
      let bestLocation = expectedLocation;

      // A mask of the matches, used for building the indices
      const matchMask = [];

      if (includeMatches) {
        for (let i = 0; i < textLen; i += 1) {
          matchMask[i] = 0;
        }
      }

      let index;

      // Get all exact matches, here for speed up
      while ((index = text.indexOf(pattern, bestLocation)) > -1) {
        let score = computeScore(pattern, {
          currentLocation: index,
          expectedLocation,
          distance
        });

        currentThreshold = Math.min(score, currentThreshold);
        bestLocation = index + patternLen;

        if (includeMatches) {
          let i = 0;
          while (i < patternLen) {
            matchMask[index + i] = 1;
            i += 1;
          }
        }
      }

      // Reset the best location
      bestLocation = -1;

      let lastBitArr = [];
      let finalScore = 1;
      let binMax = patternLen + textLen;

      const mask = 1 << (patternLen <= MAX_BITS - 1 ? patternLen - 1 : MAX_BITS - 2);

      for (let i = 0; i < patternLen; i += 1) {
        // Scan for the best match; each iteration allows for one more error.
        // Run a binary search to determine how far from the match location we can stray
        // at this error level.
        let binMin = 0;
        let binMid = binMax;

        while (binMin < binMid) {
          const score = computeScore(pattern, {
            errors: i,
            currentLocation: expectedLocation + binMid,
            expectedLocation,
            distance
          });

          if (score <= currentThreshold) {
            binMin = binMid;
          } else {
            binMax = binMid;
          }

          binMid = Math.floor((binMax - binMin) / 2 + binMin);
        }

        // Use the result from this iteration as the maximum for the next.
        binMax = binMid;

        let start = Math.max(1, expectedLocation - binMid + 1);
        let finish = findAllMatches
          ? textLen
          : Math.min(expectedLocation + binMid, textLen) + patternLen;

        // Initialize the bit array
        let bitArr = Array(finish + 2);

        bitArr[finish + 1] = (1 << i) - 1;

        for (let j = finish; j >= start; j -= 1) {
          let currentLocation = j - 1;
          let charMatch = patternAlphabet[text.charAt(currentLocation)];

          if (charMatch && includeMatches) {
            matchMask[currentLocation] = 1;
          }

          // First pass: exact match
          bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;

          // Subsequent passes: fuzzy match
          if (i !== 0) {
            bitArr[j] |=
              ((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1 | lastBitArr[j + 1];
          }

          if (bitArr[j] & mask) {
            finalScore = computeScore(pattern, {
              errors: i,
              currentLocation,
              expectedLocation,
              distance
            });

            // This match will almost certainly be better than any existing match.
            // But check anyway.
            if (finalScore <= currentThreshold) {
              // Indeed it is
              currentThreshold = finalScore;
              bestLocation = currentLocation;

              // Already passed `loc`, downhill from here on in.
              if (bestLocation <= expectedLocation) {
                break
              }

              // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
              start = Math.max(1, 2 * expectedLocation - bestLocation);
            }
          }
        }

        // No hope for a (better) match at greater error levels.
        const score = computeScore(pattern, {
          errors: i + 1,
          currentLocation: expectedLocation,
          expectedLocation,
          distance
        });

        if (score > currentThreshold) {
          break
        }

        lastBitArr = bitArr;
      }

      let result = {
        isMatch: bestLocation >= 0,
        // Count exact matches (those with a score of 0) to be "almost" exact
        score: !finalScore ? 0.001 : finalScore
      };

      if (includeMatches) {
        result.matchedIndices = convertMaskToIndices(matchMask, minMatchCharLength);
      }

      return result
    }

    function createPatternAlphabet(pattern) {
      let mask = {};
      let len = pattern.length;

      for (let i = 0; i < len; i += 1) {
        mask[pattern.charAt(i)] = 0;
      }

      for (let i = 0; i < len; i += 1) {
        mask[pattern.charAt(i)] |= 1 << (len - i - 1);
      }

      return mask
    }

    class BitapSearch {
      constructor(
        pattern,
        {
          location = Config.location,
          threshold = Config.threshold,
          distance = Config.distance,
          includeMatches = Config.includeMatches,
          findAllMatches = Config.findAllMatches,
          minMatchCharLength = Config.minMatchCharLength,
          isCaseSensitive = Config.isCaseSensitive
        } = {}
      ) {
        this.options = {
          location,
          threshold,
          distance,
          includeMatches,
          findAllMatches,
          minMatchCharLength,
          isCaseSensitive
        };

        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();

        this.chunks = [];

        let index = 0;
        while (index < this.pattern.length) {
          let pattern = this.pattern.substring(index, index + MAX_BITS);
          this.chunks.push({
            pattern,
            alphabet: createPatternAlphabet(pattern)
          });
          index += MAX_BITS;
        }
      }

      searchIn(value) {
        let text = value.$;
        return this.searchInString(text)
      }

      searchInString(text) {
        const { isCaseSensitive, includeMatches } = this.options;

        if (!isCaseSensitive) {
          text = text.toLowerCase();
        }

        // Exact match
        if (this.pattern === text) {
          let result = {
            isMatch: true,
            score: 0
          };

          if (includeMatches) {
            result.matchedIndices = [[0, text.length - 1]];
          }

          return result
        }

        // Otherwise, use Bitap algorithm
        const {
          location,
          distance,
          threshold,
          findAllMatches,
          minMatchCharLength
        } = this.options;

        let allMatchedIndices = [];
        let totalScore = 0;
        let hasMatches = false;

        for (let i = 0, len = this.chunks.length; i < len; i += 1) {
          let { pattern, alphabet } = this.chunks[i];

          let result = search(text, pattern, alphabet, {
            location: location + MAX_BITS * i,
            distance,
            threshold,
            findAllMatches,
            minMatchCharLength,
            includeMatches
          });

          const { isMatch, score, matchedIndices } = result;

          if (isMatch) {
            hasMatches = true;
          }

          totalScore += score;

          if (isMatch && matchedIndices) {
            allMatchedIndices = [...allMatchedIndices, ...matchedIndices];
          }
        }

        let result = {
          isMatch: hasMatches,
          score: hasMatches ? totalScore / this.chunks.length : 1
        };

        if (hasMatches && includeMatches) {
          result.matchedIndices = allMatchedIndices;
        }

        return result
      }
    }

    class BaseMatch {
      constructor(pattern) {
        this.pattern = pattern;
      }
      static isMultiMatch(pattern) {
        return getMatch(pattern, this.multiRegex)
      }
      static isSingleMatch(pattern) {
        return getMatch(pattern, this.singleRegex)
      }
      search(/*text*/) {}
    }

    function getMatch(pattern, exp) {
      const matches = pattern.match(exp);
      return matches ? matches[1] : null
    }

    // Token: 'file

    class ExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'exact'
      }
      static get multiRegex() {
        return /^'"(.*)"$/
      }
      static get singleRegex() {
        return /^'(.*)$/
      }
      search(text) {
        let location = 0;
        let index;

        const matchedIndices = [];
        const patternLen = this.pattern.length;

        // Get all exact matches
        while ((index = text.indexOf(this.pattern, location)) > -1) {
          location = index + patternLen;
          matchedIndices.push([index, location - 1]);
        }

        const isMatch = !!matchedIndices.length;

        return {
          isMatch,
          score: isMatch ? 1 : 0,
          matchedIndices
        }
      }
    }

    // Token: !fire

    class InverseExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'inverse-exact'
      }
      static get multiRegex() {
        return /^!"(.*)"$/
      }
      static get singleRegex() {
        return /^!(.*)$/
      }
      search(text) {
        const index = text.indexOf(this.pattern);
        const isMatch = index === -1;

        return {
          isMatch,
          score: isMatch ? 0 : 1,
          matchedIndices: [0, text.length - 1]
        }
      }
    }

    // Token: ^file

    class PrefixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'prefix-exact'
      }
      static get multiRegex() {
        return /^\^"(.*)"$/
      }
      static get singleRegex() {
        return /^\^(.*)$/
      }
      search(text) {
        const isMatch = text.startsWith(this.pattern);

        return {
          isMatch,
          score: isMatch ? 0 : 1,
          matchedIndices: [0, this.pattern.length - 1]
        }
      }
    }

    // Token: !^fire

    class InversePrefixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'inverse-prefix-exact'
      }
      static get multiRegex() {
        return /^!\^"(.*)"$/
      }
      static get singleRegex() {
        return /^!\^(.*)$/
      }
      search(text) {
        const isMatch = !text.startsWith(this.pattern);

        return {
          isMatch,
          score: isMatch ? 0 : 1,
          matchedIndices: [0, text.length - 1]
        }
      }
    }

    // Token: .file$

    class SuffixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'suffix-exact'
      }
      static get multiRegex() {
        return /^"(.*)"\$$/
      }
      static get singleRegex() {
        return /^(.*)\$$/
      }
      search(text) {
        const isMatch = text.endsWith(this.pattern);

        return {
          isMatch,
          score: isMatch ? 0 : 1,
          matchedIndices: [text.length - this.pattern.length, text.length - 1]
        }
      }
    }

    // Token: !.file$

    class InverseSuffixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'inverse-suffix-exact'
      }
      static get multiRegex() {
        return /^!"(.*)"\$$/
      }
      static get singleRegex() {
        return /^!(.*)\$$/
      }
      search(text) {
        const isMatch = !text.endsWith(this.pattern);
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          matchedIndices: [0, text.length - 1]
        }
      }
    }

    class FuzzyMatch extends BaseMatch {
      constructor(
        pattern,
        {
          location = Config.location,
          threshold = Config.threshold,
          distance = Config.distance,
          includeMatches = Config.includeMatches,
          findAllMatches = Config.findAllMatches,
          minMatchCharLength = Config.minMatchCharLength,
          isCaseSensitive = Config.isCaseSensitive
        } = {}
      ) {
        super(pattern);
        this._bitapSearch = new BitapSearch(pattern, {
          location,
          threshold,
          distance,
          includeMatches,
          findAllMatches,
          minMatchCharLength,
          isCaseSensitive
        });
      }
      static get type() {
        return 'fuzzy'
      }
      static get multiRegex() {
        return /^"(.*)"$/
      }
      static get singleRegex() {
        return /^(.*)$/
      }
      search(text) {
        return this._bitapSearch.searchInString(text)
      }
    }

    // ❗Order is important. DO NOT CHANGE.
    const searchers = [
      ExactMatch,
      PrefixExactMatch,
      InversePrefixExactMatch,
      InverseSuffixExactMatch,
      SuffixExactMatch,
      InverseExactMatch,
      FuzzyMatch
    ];

    const searchersLen = searchers.length;

    // Regex to split by spaces, but keep anything in quotes together
    const SPACE_RE = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
    const OR_TOKEN = '|';

    // Return a 2D array representation of the query, for simpler parsing.
    // Example:
    // "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
    function parseQuery(pattern, options = {}) {
      return pattern.split(OR_TOKEN).map((item) => {
        let query = item
          .trim()
          .split(SPACE_RE)
          .filter((item) => item && !!item.trim());

        let results = [];
        for (let i = 0, len = query.length; i < len; i += 1) {
          const queryItem = query[i];

          // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
          let found = false;
          let idx = -1;
          while (!found && ++idx < searchersLen) {
            const searcher = searchers[idx];
            let token = searcher.isMultiMatch(queryItem);
            if (token) {
              results.push(new searcher(token, options));
              found = true;
            }
          }

          if (found) {
            continue
          }

          // 2. Handle single query matches (i.e, once that are *not* quoted)
          idx = -1;
          while (++idx < searchersLen) {
            const searcher = searchers[idx];
            let token = searcher.isSingleMatch(queryItem);
            if (token) {
              results.push(new searcher(token, options));
              break
            }
          }
        }

        return results
      })
    }

    // These extended matchers can return an array of matches, as opposed
    // to a singl match
    const MultiMatchSet = new Set([FuzzyMatch.type, ExactMatch.type]);

    /**
     * Command-like searching
     * ======================
     *
     * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
     * search in a given text.
     *
     * Search syntax:
     *
     * | Token       | Match type                 | Description                            |
     * | ----------- | -------------------------- | -------------------------------------- |
     * | `jscript`   | fuzzy-match                | Items that match `jscript`             |
     * | `'python`   | exact-match                | Items that include `python`            |
     * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
     * | `^java`     | prefix-exact-match         | Items that start with `java`           |
     * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
     * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
     * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
     *
     * A single pipe character acts as an OR operator. For example, the following
     * query matches entries that start with `core` and end with either`go`, `rb`,
     * or`py`.
     *
     * ```
     * ^core go$ | rb$ | py$
     * ```
     */
    class ExtendedSearch {
      constructor(
        pattern,
        {
          isCaseSensitive = Config.isCaseSensitive,
          includeMatches = Config.includeMatches,
          minMatchCharLength = Config.minMatchCharLength,
          findAllMatches = Config.findAllMatches,
          location = Config.location,
          threshold = Config.threshold,
          distance = Config.distance
        } = {}
      ) {
        this.query = null;
        this.options = {
          isCaseSensitive,
          includeMatches,
          minMatchCharLength,
          findAllMatches,
          location,
          threshold,
          distance
        };

        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.query = parseQuery(this.pattern, this.options);
      }

      static condition(_, options) {
        return options.useExtendedSearch
      }

      searchIn(value) {
        const query = this.query;

        if (!query) {
          return {
            isMatch: false,
            score: 1
          }
        }

        let text = value.$;

        const { includeMatches, isCaseSensitive } = this.options;

        text = isCaseSensitive ? text : text.toLowerCase();

        let numMatches = 0;
        let indices = [];
        let totalScore = 0;

        // ORs
        for (let i = 0, qLen = query.length; i < qLen; i += 1) {
          const searchers = query[i];

          // Reset indices
          indices.length = 0;
          numMatches = 0;

          // ANDs
          for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
            const searcher = searchers[j];
            const { isMatch, matchedIndices, score } = searcher.search(text);

            if (isMatch) {
              numMatches += 1;
              totalScore += score;
              if (includeMatches) {
                const type = searcher.constructor.type;
                if (MultiMatchSet.has(type)) {
                  indices = [...indices, ...matchedIndices];
                } else {
                  indices.push(matchedIndices);
                }
              }
            } else {
              totalScore = 0;
              numMatches = 0;
              indices.length = 0;
              break
            }
          }

          // OR condition, so if TRUE, return
          if (numMatches) {
            let result = {
              isMatch: true,
              score: totalScore / numMatches
            };

            if (includeMatches) {
              result.matchedIndices = indices;
            }

            return result
          }
        }

        // Nothing was matched
        return {
          isMatch: false,
          score: 1
        }
      }
    }

    const SPACE = /[^ ]+/g;

    function createIndex(keys, list, { getFn = Config.getFn } = {}) {
      let indexedList = [];

      // List is Array<String>
      if (isString(list[0])) {
        // Iterate over every string in the list
        for (let i = 0, len = list.length; i < len; i += 1) {
          const value = list[i];

          if (isDefined(value) && !isBlank(value)) {
            let record = {
              $: value,
              idx: i,
              t: value.match(SPACE).length
            };

            indexedList.push(record);
          }
        }
      } else {
        // List is Array<Object>
        const keysLen = keys.length;

        for (let i = 0, len = list.length; i < len; i += 1) {
          let item = list[i];

          let record = { idx: i, $: {} };

          // Iterate over every key (i.e, path), and fetch the value at that key
          for (let j = 0; j < keysLen; j += 1) {
            let key = keys[j];
            let value = getFn(item, key);

            if (!isDefined(value)) {
              continue
            }

            if (isArray(value)) {
              let subRecords = [];
              const stack = [{ arrayIndex: -1, value }];

              while (stack.length) {
                const { arrayIndex, value } = stack.pop();

                if (!isDefined(value)) {
                  continue
                }

                if (isString(value) && !isBlank(value)) {
                  let subRecord = {
                    $: value,
                    idx: arrayIndex,
                    t: value.match(SPACE).length
                  };
                  subRecords.push(subRecord);
                } else if (isArray(value)) {
                  for (let k = 0, arrLen = value.length; k < arrLen; k += 1) {
                    stack.push({
                      arrayIndex: k,
                      value: value[k]
                    });
                  }
                }
              }
              record.$[key] = subRecords;
            } else if (!isBlank(value)) {
              let subRecord = {
                $: value,
                t: value.match(SPACE).length
              };

              record.$[key] = subRecord;
            }
          }

          indexedList.push(record);
        }
      }

      return indexedList
    }

    class KeyStore {
      constructor(keys) {
        this._keys = {};
        this._keyNames = [];
        this._length = keys.length;

        // Iterate over every key
        if (keys.length && isString(keys[0])) {
          for (let i = 0; i < this._length; i += 1) {
            const key = keys[i];
            this._keys[key] = {
              weight: 1
            };
            this._keyNames.push(key);
          }
        } else {
          let totalWeight = 0;

          for (let i = 0; i < this._length; i += 1) {
            const key = keys[i];

            if (!Object.prototype.hasOwnProperty.call(key, 'name')) {
              throw new Error('Missing "name" property in key object')
            }

            const keyName = key.name;
            this._keyNames.push(keyName);

            if (!Object.prototype.hasOwnProperty.call(key, 'weight')) {
              throw new Error('Missing "weight" property in key object')
            }

            const weight = key.weight;

            if (weight <= 0 || weight >= 1) {
              throw new Error(
                '"weight" property in key must be in the range of (0, 1)'
              )
            }

            this._keys[keyName] = {
              weight
            };

            totalWeight += weight;
          }

          // Normalize weights so that their sum is equal to 1
          for (let i = 0; i < this._length; i += 1) {
            const keyName = this._keyNames[i];
            const keyWeight = this._keys[keyName].weight;
            this._keys[keyName].weight = keyWeight / totalWeight;
          }
        }
      }
      get(key, name) {
        return this._keys[key] ? this._keys[key][name] : -1
      }
      keys() {
        return this._keyNames
      }
      count() {
        return this._length
      }
      toJSON() {
        return JSON.stringify(this._keys)
      }
    }

    function transformMatches(result, data) {
      const matches = result.matches;
      data.matches = [];

      if (!isDefined(matches)) {
        return
      }

      for (let i = 0, len = matches.length; i < len; i += 1) {
        let match = matches[i];

        if (!isDefined(match.indices) || match.indices.length === 0) {
          continue
        }

        let obj = {
          indices: match.indices,
          value: match.value
        };

        if (match.key) {
          obj.key = match.key;
        }

        if (match.idx > -1) {
          obj.refIndex = match.idx;
        }

        data.matches.push(obj);
      }
    }

    function transformScore(result, data) {
      data.score = result.score;
    }

    const registeredSearchers = [];

    function register(...args) {
      registeredSearchers.push(...args);
    }

    class Fuse {
      constructor(list, options = {}, index = null) {
        this.options = { ...Config, ...options };

        this._processKeys(this.options.keys);
        this.setCollection(list, index);
      }

      setCollection(list, index = null) {
        this.list = list;
        this.listIsStringArray = isString(list[0]);

        if (index) {
          this.setIndex(index);
        } else {
          this.setIndex(this._createIndex());
        }
      }

      setIndex(listIndex) {
        this._indexedList = listIndex;
      }

      _processKeys(keys) {
        this._keyStore = new KeyStore(keys);
      }

      _createIndex() {
        return createIndex(this._keyStore.keys(), this.list, {
          getFn: this.options.getFn
        })
      }

      search(pattern, opts = { limit: false }) {
        pattern = pattern.trim();

        if (!pattern.length) {
          return []
        }

        const { shouldSort } = this.options;

        let searcher = null;

        for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
          let searcherClass = registeredSearchers[i];
          if (searcherClass.condition(pattern, this.options)) {
            searcher = new searcherClass(pattern, this.options);
            break
          }
        }

        if (!searcher) {
          searcher = new BitapSearch(pattern, this.options);
        }

        let results = this._searchUsing(searcher);

        this._computeScore(results);

        if (shouldSort) {
          this._sort(results);
        }

        if (opts.limit && isNumber(opts.limit)) {
          results = results.slice(0, opts.limit);
        }

        return this._format(results)
      }

      _searchUsing(searcher) {
        const list = this._indexedList;
        const results = [];
        const { includeMatches } = this.options;

        // List is Array<String>
        if (this.listIsStringArray) {
          // Iterate over every string in the list
          for (let i = 0, len = list.length; i < len; i += 1) {
            let value = list[i];
            let { $: text, idx, t } = value;

            if (!isDefined(text)) {
              continue
            }

            let searchResult = searcher.searchIn(value);

            const { isMatch, score } = searchResult;

            if (!isMatch) {
              continue
            }

            let match = { score, value: text, t };

            if (includeMatches) {
              match.indices = searchResult.matchedIndices;
            }

            results.push({
              item: text,
              idx,
              matches: [match]
            });
          }
        } else {
          // List is Array<Object>
          const keyNames = this._keyStore.keys();
          const keysLen = this._keyStore.count();

          for (let i = 0, len = list.length; i < len; i += 1) {
            let { $: item, idx } = list[i];

            if (!isDefined(item)) {
              continue
            }

            let matches = [];

            // Iterate over every key (i.e, path), and fetch the value at that key
            for (let j = 0; j < keysLen; j += 1) {
              let key = keyNames[j];
              let value = item[key];

              if (!isDefined(value)) {
                continue
              }

              if (isArray(value)) {
                for (let k = 0, len = value.length; k < len; k += 1) {
                  let arrItem = value[k];
                  const { $: text, idx, t } = arrItem;

                  if (!isDefined(text)) {
                    continue
                  }

                  let searchResult = searcher.searchIn(arrItem);

                  const { isMatch, score } = searchResult;

                  if (!isMatch) {
                    continue
                  }

                  let match = { score, key, value: text, idx, t };

                  if (includeMatches) {
                    match.indices = searchResult.matchedIndices;
                  }

                  matches.push(match);
                }
              } else {
                const { $: text, t } = value;

                let searchResult = searcher.searchIn(value);

                const { isMatch, score } = searchResult;

                if (!isMatch) {
                  continue
                }

                let match = { score, key, value: text, t };

                if (includeMatches) {
                  match.indices = searchResult.matchedIndices;
                }

                matches.push(match);
              }
            }

            if (matches.length) {
              results.push({
                idx,
                item,
                matches
              });
            }
          }
        }

        return results
      }

      // Practical scoring function
      _computeScore(results) {
        const resultsLen = results.length;

        for (let i = 0; i < resultsLen; i += 1) {
          const result = results[i];
          const matches = result.matches;
          const numMatches = matches.length;

          let totalScore = 1;

          for (let j = 0; j < numMatches; j += 1) {
            const match = matches[j];
            const { key, t } = match;

            const keyWeight = this._keyStore.get(key, 'weight');
            const weight = keyWeight > -1 ? keyWeight : 1;
            const score =
              match.score === 0 && keyWeight > -1 ? Number.EPSILON : match.score;

            // Field-length norm: the shorter the field, the higher the weight.
            const norm = 1 / Math.sqrt(t);

            totalScore *= Math.pow(score, weight * norm);
          }

          result.score = totalScore;
        }
      }

      _sort(results) {
        results.sort(this.options.sortFn);
      }

      _format(results) {
        const finalOutput = [];

        const { includeMatches, includeScore } = this.options;

        let transformers = [];

        if (includeMatches) transformers.push(transformMatches);
        if (includeScore) transformers.push(transformScore);

        for (let i = 0, len = results.length; i < len; i += 1) {
          const result = results[i];
          const { idx } = result;

          const data = {
            item: this.list[idx],
            refIndex: idx
          };

          if (transformers.length) {
            for (let j = 0, len = transformers.length; j < len; j += 1) {
              transformers[j](result, data);
            }
          }

          finalOutput.push(data);
        }

        return finalOutput
      }
    }

    register(ExtendedSearch);

    Fuse.version = '5.2.3';
    Fuse.createIndex = createIndex;
    Fuse.config = Config;

    /* src/modal.svelte generated by Svelte v3.21.0 */
    const file = "src/modal.svelte";
    const get_items_slot_changes = dirty => ({});
    const get_items_slot_context = ctx => ({});

    function create_fragment(ctx) {
    	let div4;
    	let div3;
    	let div2;
    	let div0;
    	let input;
    	let t;
    	let div1;
    	let current;
    	let dispose;
    	const items_slot_template = /*$$slots*/ ctx[10].items;
    	const items_slot = create_slot(items_slot_template, ctx, /*$$scope*/ ctx[9], get_items_slot_context);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			input = element("input");
    			t = space();
    			div1 = element("div");
    			if (items_slot) items_slot.c();
    			attr_dev(input, "class", "search svelte-1ki3w3h");
    			attr_dev(input, "name", /*inputName*/ ctx[3]);
    			attr_dev(input, "autocomplete", "no");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "What are you looking for?");
    			add_location(input, file, 122, 8, 2543);
    			attr_dev(div0, "class", "search-box svelte-1ki3w3h");
    			add_location(div0, file, 121, 6, 2509);
    			add_location(div1, file, 134, 6, 2889);
    			attr_dev(div2, "class", "modal-container svelte-1ki3w3h");
    			add_location(div2, file, 120, 4, 2472);
    			attr_dev(div3, "class", "modal-wrapper svelte-1ki3w3h");
    			add_location(div3, file, 119, 2, 2439);
    			attr_dev(div4, "class", "modal-mask svelte-1ki3w3h");
    			toggle_class(div4, "hidden", !/*show*/ ctx[1]);
    			add_location(div4, file, 118, 0, 2390);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, input);
    			/*input_binding*/ ctx[11](input);
    			set_input_value(input, /*inputValue*/ ctx[0]);
    			append_dev(div2, t);
    			append_dev(div2, div1);

    			if (items_slot) {
    				items_slot.m(div1, null);
    			}

    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "input", /*input_input_handler*/ ctx[12]),
    				listen_dev(input, "blur", /*onBlur*/ ctx[4], false, false, false),
    				listen_dev(input, "keydown", /*onKeyDown*/ ctx[5], false, false, false),
    				listen_dev(input, "keyup", /*onKeyUp*/ ctx[6], false, false, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*inputValue*/ 1 && input.value !== /*inputValue*/ ctx[0]) {
    				set_input_value(input, /*inputValue*/ ctx[0]);
    			}

    			if (items_slot) {
    				if (items_slot.p && dirty & /*$$scope*/ 512) {
    					items_slot.p(get_slot_context(items_slot_template, ctx, /*$$scope*/ ctx[9], get_items_slot_context), get_slot_changes(items_slot_template, /*$$scope*/ ctx[9], dirty, get_items_slot_changes));
    				}
    			}

    			if (dirty & /*show*/ 2) {
    				toggle_class(div4, "hidden", !/*show*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(items_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(items_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			/*input_binding*/ ctx[11](null);
    			if (items_slot) items_slot.d(detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	let { show = false } = $$props;
    	let { inputValue } = $$props;
    	let inputEl;
    	const getUUID = () => Math.random().toString(32).slice(2);
    	const inputName = getUUID();

    	function onBlur() {
    		dispatch("closed");
    		$$invalidate(0, inputValue = "");
    	}

    	function onKeyDown(e) {
    		const keyCode = e.code.toLowerCase();

    		if (keyCode === "enter") {
    			dispatch("exec", inputValue);
    		} else if (keyCode === "arrowdown") {
    			dispatch("arrowdown");
    		} else if (keyCode === "arrowup") {
    			dispatch("arrowup");
    		}
    	}

    	function onKeyUp(e) {
    		const keyCode = e.code.toLowerCase();

    		if (keyCode.includes("space") || keyCode.includes("backspace") || keyCode.includes("delete") || keyCode.startsWith("key") || keyCode.startsWith("digit") || keyCode.startsWith("numpad")) {
    			dispatch("textChange", inputValue);
    		}
    	}

    	const writable_props = ["show", "inputValue"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Modal", $$slots, ['items']);

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(2, inputEl = $$value);
    		});
    	}

    	function input_input_handler() {
    		inputValue = this.value;
    		$$invalidate(0, inputValue);
    	}

    	$$self.$set = $$props => {
    		if ("show" in $$props) $$invalidate(1, show = $$props.show);
    		if ("inputValue" in $$props) $$invalidate(0, inputValue = $$props.inputValue);
    		if ("$$scope" in $$props) $$invalidate(9, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		show,
    		inputValue,
    		inputEl,
    		getUUID,
    		inputName,
    		onBlur,
    		onKeyDown,
    		onKeyUp
    	});

    	$$self.$inject_state = $$props => {
    		if ("show" in $$props) $$invalidate(1, show = $$props.show);
    		if ("inputValue" in $$props) $$invalidate(0, inputValue = $$props.inputValue);
    		if ("inputEl" in $$props) $$invalidate(2, inputEl = $$props.inputEl);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*show, inputEl*/ 6) {
    			 {
    				if (!!show && !!inputEl) {
    					setTimeout(() => {
    						inputEl.focus();
    					});
    				}
    			}
    		}
    	};

    	return [
    		inputValue,
    		show,
    		inputEl,
    		inputName,
    		onBlur,
    		onKeyDown,
    		onKeyUp,
    		dispatch,
    		getUUID,
    		$$scope,
    		$$slots,
    		input_binding,
    		input_input_handler
    	];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { show: 1, inputValue: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*inputValue*/ ctx[0] === undefined && !("inputValue" in props)) {
    			console.warn("<Modal> was created without expected prop 'inputValue'");
    		}
    	}

    	get show() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputValue() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputValue(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/ItemsFiltered.svelte generated by Svelte v3.21.0 */

    const file$1 = "src/ItemsFiltered.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (18:2) {#each items as item, index}
    function create_each_block(ctx) {
    	let p;
    	let t_value = /*item*/ ctx[2].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "svelte-srbw3z");
    			toggle_class(p, "selected", /*index*/ ctx[4] == /*selectedIndex*/ ctx[1]);
    			add_location(p, file$1, 18, 4, 259);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 1 && t_value !== (t_value = /*item*/ ctx[2].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*selectedIndex*/ 2) {
    				toggle_class(p, "selected", /*index*/ ctx[4] == /*selectedIndex*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(18:2) {#each items as item, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let each_value = /*items*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div, file$1, 16, 0, 216);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*selectedIndex, items*/ 3) {
    				each_value = /*items*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { items = [] } = $$props;
    	let { selectedIndex = 0 } = $$props;
    	const writable_props = ["items", "selectedIndex"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ItemsFiltered> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ItemsFiltered", $$slots, []);

    	$$self.$set = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("selectedIndex" in $$props) $$invalidate(1, selectedIndex = $$props.selectedIndex);
    	};

    	$$self.$capture_state = () => ({ items, selectedIndex });

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("selectedIndex" in $$props) $$invalidate(1, selectedIndex = $$props.selectedIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [items, selectedIndex];
    }

    class ItemsFiltered extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { items: 0, selectedIndex: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ItemsFiltered",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get items() {
    		throw new Error("<ItemsFiltered>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<ItemsFiltered>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedIndex() {
    		throw new Error("<ItemsFiltered>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedIndex(value) {
    		throw new Error("<ItemsFiltered>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.21.0 */

    const { console: console_1 } = globals;
    const file$2 = "src/App.svelte";

    // (78:4) <div slot="items">
    function create_items_slot(ctx) {
    	let div;
    	let current;

    	const itemsfiltered = new ItemsFiltered({
    			props: {
    				items: /*itemsFiltered*/ ctx[2],
    				selectedIndex: /*selectedIndex*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(itemsfiltered.$$.fragment);
    			attr_dev(div, "slot", "items");
    			add_location(div, file$2, 77, 4, 1844);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(itemsfiltered, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const itemsfiltered_changes = {};
    			if (dirty & /*itemsFiltered*/ 4) itemsfiltered_changes.items = /*itemsFiltered*/ ctx[2];
    			if (dirty & /*selectedIndex*/ 2) itemsfiltered_changes.selectedIndex = /*selectedIndex*/ ctx[1];
    			itemsfiltered.$set(itemsfiltered_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(itemsfiltered.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(itemsfiltered.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(itemsfiltered);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_items_slot.name,
    		type: "slot",
    		source: "(78:4) <div slot=\\\"items\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let updating_show;
    	let current;

    	function modal_show_binding(value) {
    		/*modal_show_binding*/ ctx[14].call(null, value);
    	}

    	let modal_props = {
    		$$slots: { items: [create_items_slot] },
    		$$scope: { ctx }
    	};

    	if (/*showModal*/ ctx[0] !== void 0) {
    		modal_props.show = /*showModal*/ ctx[0];
    	}

    	const modal = new Modal({ props: modal_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal, "show", modal_show_binding));
    	modal.$on("closed", /*onClosed*/ ctx[4]);
    	modal.$on("exec", /*onExec*/ ctx[3]);
    	modal.$on("arrowup", /*onKeyUp*/ ctx[5]);
    	modal.$on("arrowdown", /*onKeyDown*/ ctx[6]);
    	modal.$on("textChange", /*onTextChange*/ ctx[7]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(modal.$$.fragment);
    			add_location(div, file$2, 69, 0, 1657);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(modal, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const modal_changes = {};

    			if (dirty & /*$$scope, itemsFiltered, selectedIndex*/ 32774) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_show && dirty & /*showModal*/ 1) {
    				updating_show = true;
    				modal_changes.show = /*showModal*/ ctx[0];
    				add_flush_callback(() => updating_show = false);
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(modal);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	let { shortcutKey } = $$props;
    	let { items = [] } = $$props;

    	const options = {
    		isCaseSensitive: false,
    		shouldSort: true,
    		keys: ["name"]
    	};

    	let showModal = false;
    	let currentText = "";
    	let selectedIndex = "";
    	const fuse = new Fuse(items, options);
    	let itemsFiltered = items;

    	onMount(() => {
    		console.log("CommandPal.App", { shortcutKey });

    		hotkeys(shortcutKey, function (e) {
    			e.preventDefault();
    			$$invalidate(0, showModal = true);
    			dispatch("opened");
    		});
    	});

    	function onExec(e) {
    		const currentItem = itemsFiltered[selectedIndex];
    		dispatch("exec", currentItem);
    		$$invalidate(0, showModal = false);
    	}

    	function onClosed(e) {
    		dispatch("closed");
    		$$invalidate(0, showModal = false);
    	}

    	function onKeyUp(e) {
    		$$invalidate(1, selectedIndex--, selectedIndex);
    		const minIndex = 0;

    		if (selectedIndex < minIndex) {
    			$$invalidate(1, selectedIndex = minIndex);
    		}
    	}

    	function onKeyDown(e) {
    		$$invalidate(1, selectedIndex++, selectedIndex);
    		const maxIndex = itemsFiltered.length - 1;

    		if (selectedIndex > maxIndex) {
    			$$invalidate(1, selectedIndex = maxIndex);
    		}
    	}

    	function onTextChange(e) {
    		const text = e.detail;
    		dispatch("textChanged", text);
    		$$invalidate(1, selectedIndex = 0);

    		if (!text) {
    			$$invalidate(2, itemsFiltered = items);
    		} else {
    			const fuseResult = fuse.search(text);
    			$$invalidate(2, itemsFiltered = fuseResult.map(i => i.item));
    		}
    	}

    	const writable_props = ["shortcutKey", "items"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	function modal_show_binding(value) {
    		showModal = value;
    		$$invalidate(0, showModal);
    	}

    	$$self.$set = $$props => {
    		if ("shortcutKey" in $$props) $$invalidate(8, shortcutKey = $$props.shortcutKey);
    		if ("items" in $$props) $$invalidate(9, items = $$props.items);
    	};

    	$$self.$capture_state = () => ({
    		hotkeys,
    		Fuse,
    		Modal,
    		ItemsFiltered,
    		onMount,
    		createEventDispatcher,
    		dispatch,
    		shortcutKey,
    		items,
    		options,
    		showModal,
    		currentText,
    		selectedIndex,
    		fuse,
    		itemsFiltered,
    		onExec,
    		onClosed,
    		onKeyUp,
    		onKeyDown,
    		onTextChange
    	});

    	$$self.$inject_state = $$props => {
    		if ("shortcutKey" in $$props) $$invalidate(8, shortcutKey = $$props.shortcutKey);
    		if ("items" in $$props) $$invalidate(9, items = $$props.items);
    		if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
    		if ("currentText" in $$props) currentText = $$props.currentText;
    		if ("selectedIndex" in $$props) $$invalidate(1, selectedIndex = $$props.selectedIndex);
    		if ("itemsFiltered" in $$props) $$invalidate(2, itemsFiltered = $$props.itemsFiltered);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showModal,
    		selectedIndex,
    		itemsFiltered,
    		onExec,
    		onClosed,
    		onKeyUp,
    		onKeyDown,
    		onTextChange,
    		shortcutKey,
    		items,
    		dispatch,
    		options,
    		currentText,
    		fuse,
    		modal_show_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { shortcutKey: 8, items: 9 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*shortcutKey*/ ctx[8] === undefined && !("shortcutKey" in props)) {
    			console_1.warn("<App> was created without expected prop 'shortcutKey'");
    		}
    	}

    	get shortcutKey() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shortcutKey(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /*jslint nomen: true*/
    /*global module */
    // Modified from David Walsh's pubsub. http://davidwalsh.name/pubsub-javascript

    var PubSub = function () {
        this.topics = {};
    };

    PubSub.prototype.subscribe = function(topic, listener) {
        var me = this;

        // Create the topic's object if not yet created
        if(!me.topics.hasOwnProperty(topic)){
            me.topics[topic] = [];
        }

        // Add the listener to queue
        me.topics[topic].push(listener);
    };

    PubSub.prototype.unsubscribe = function(topic) {
        delete this.topics[topic];
    };

    PubSub.prototype.publish = function(topic, info) {
        var me = this;

        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if(!me.topics.hasOwnProperty(topic)){
            return;
        }

        // Cycle through topics queue, fire!
        me.topics[topic].forEach(function(listener) {
            listener(info != undefined ? info : {});
        });
    };

    var microPubsub = {
        create: function() {
            return new PubSub();
        }
    };

    class CommandPal {
      constructor(options) {
        console.log("CommandPal", { options });
        this.options = options || {};
        this.ps = microPubsub.create();
      }

      start() {
        this.app = new App({
          target: document.body,
          props: {
            shortcutKey: this.options.hotkey || "ctrl+shift+p",
            items: this.options.commands || [],
          },
        });
        const ctx = this;
        function subTo(eventName) {
          ctx.app.$on(eventName, (e) => ctx.ps.publish(eventName, e.detail));
        }
        subTo("open");
        subTo("closed");
        subTo("textChanged");
        subTo("exec");
        this.ps.subscribe('exec', (item) => {
          if (item.handler && typeof item.handler === 'function') {
            item.handler();
          }
          if (!!item.goto && typeof item.goto === 'string') {
            window.location.hash = item.goto;
          }
        });
      }

      subscribe(eventName, cb) {
        this.ps.subscribe(eventName, (e) => cb(e));
      }
    }
    window.CommandPal = CommandPal;

    return CommandPal;

}());
//# sourceMappingURL=bundle.js.map
