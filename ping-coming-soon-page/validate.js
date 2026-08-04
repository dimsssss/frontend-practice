const form = document.querySelector("form");
const input = document.querySelector("#email");
const container = document.querySelector(".input-container");
const errorEl = document.querySelector("#email-error");

const MESSAGES = {
  empty: "Whoops! It looks like you forgot to add your email",
  invalid: "Please provide a valid email address",
};

// HTML5 email 타입보다 조금 더 엄격한 패턴
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getErrorMessage(value) {
  const trimmed = value.trim();
  if (trimmed === "") return MESSAGES.empty;
  if (!EMAIL_PATTERN.test(trimmed)) return MESSAGES.invalid;
  return "";
}

function showError(message) {
  errorEl.textContent = message;
  container.classList.add("is-error");
  input.setAttribute("aria-invalid", "true");
}

function clearError() {
  errorEl.textContent = "";
  container.classList.remove("is-error");
  input.setAttribute("aria-invalid", "false");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = getErrorMessage(input.value);

  if (message) {
    showError(message);
    input.focus();            // 에러 시 포커스 되돌리기
    return;
  }

  clearError();
  // 실제 제출 로직 자리
  console.log("subscribe:", input.value.trim());
  form.reset();
});

// 한 번 에러가 뜬 뒤에만 실시간으로 지워주기
// (입력 시작하자마자 빨개지는 건 사용자 입장에서 불쾌함)
input.addEventListener("input", () => {
  if (!container.classList.contains("is-error")) return;
  if (!getErrorMessage(input.value)) clearError();
});

// 포커스를 잃을 때는 다시 검사
input.addEventListener("blur", () => {
  if (input.value.trim() === "") return;   // 빈 칸은 submit 때만 잡기
  const message = getErrorMessage(input.value);
  message ? showError(message) : clearError();
});