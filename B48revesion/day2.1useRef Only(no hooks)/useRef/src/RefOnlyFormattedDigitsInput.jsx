import React, { useRef } from "react";

export default function RefOnlyFormattedDigitsInput({ initialValue = "", onChange }) {
  const inputRef = useRef(null);
  const digitsRef = useRef(onlyDigits(initialValue));
  const composingRef = useRef(false);
  const initDoneRef = useRef(false);

  function onlyDigits(s) {
    return s.replace(/\D+/g, "");
  }

  function formatGroups4(digits) {
    return digits.replace(/(.{4})(?=.)/g, "$1 ");
  }

  function digitsBefore(formatted, caret) {
    let n = 0;
    for (let i = 0; i < Math.min(caret ?? 0, formatted.length); i++) {
      if (/[0-9]/.test(formatted[i])) n++;
    }
    return n;
  }

  function caretFromDigitIndex(formatted, dIndex) {
    if (dIndex <= 0) return 0;
    let seen = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/[0-9]/.test(formatted[i])) {
        seen++;
        if (seen === dIndex) return i + 1;
      }
    }
    return formatted.length;
  }

  function spliceDigits(src, startD, endD, insertDigits) {
    return src.slice(0, startD) + insertDigits + src.slice(endD);
  }

  function applyValueAndCaret(nextDigits, startCaret, endCaret = startCaret) {
    const el = inputRef.current;
    const nextFormatted = formatGroups4(nextDigits);

    if (el.value !== nextFormatted) el.value = nextFormatted;

    const start = caretFromDigitIndex(nextFormatted, startCaret);
    const end = caretFromDigitIndex(nextFormatted, endCaret);
    el.setSelectionRange(start, end);

    if (digitsRef.current !== nextDigits) {
      digitsRef.current = nextDigits;
      onChange && onChange(nextDigits);
    }
  }

  function normalizeFromDOM() {
    const el = inputRef.current;
    const raw = el.value;
    const selStart = el.selectionStart ?? raw.length;
    const selEnd = el.selectionEnd ?? selStart;

    const startD = digitsBefore(raw, selStart);
    const endD = digitsBefore(raw, selEnd);
    const nextDigits = onlyDigits(raw);

    applyValueAndCaret(nextDigits, startD, endD);
  }

  function onRef(el) {
    inputRef.current = el;
    if (el && !initDoneRef.current) {
      initDoneRef.current = true;
      el.value = formatGroups4(digitsRef.current);
      const end = el.value.length;
      el.setSelectionRange(end, end);
    }
  }

  function handleKeyDown(e) {
    if (e.isComposing || composingRef.current) return;
    if (e.metaKey || e.ctrlKey) return;

    const allowed = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
    ];
    if (allowed.includes(e.key)) return;

    if (e.key.length === 1 && /[0-9]/.test(e.key)) return;

    e.preventDefault();
  }

  function handleInput() {
    if (!composingRef.current) normalizeFromDOM();
  }

  function handlePaste(e) {
    if (composingRef.current) return;
    e.preventDefault();

    const el = inputRef.current;
    const insert = onlyDigits(e.clipboardData.getData("text"));
    const raw = el.value;

    const startD = digitsBefore(raw, el.selectionStart);
    const endD = digitsBefore(raw, el.selectionEnd);

    const nextDigits = spliceDigits(digitsRef.current, startD, endD, insert);
    applyValueAndCaret(nextDigits, startD + insert.length);
  }

  function handleCompositionStart() {
    composingRef.current = true;
  }
  function handleCompositionEnd() {
    composingRef.current = false;
    normalizeFromDOM();
  }

  // ---------------- Render ----------------
  return (
    <input
      ref={onRef}
      inputMode="numeric"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      style={{
        padding: 8,
        fontSize: 16,
        width: 280,
        letterSpacing: "0.04em",
      }}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onPaste={handlePaste}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
    />
  );
}
