function getItemWithExpiry(itemStr: string | null, key: string) {
  // 如果 item 不存在，直接返回 null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // 檢查是否過期
  if (now.getTime() > item.expiry) {
    // 如果過期，刪除 item 並返回 null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export function storageGet(key: string, type = "localStorage") {
  if (typeof window !== "undefined") {
    if (type === "localStorage") {
      return getItemWithExpiry(localStorage.getItem(key), key);
    } else {
      return getItemWithExpiry(sessionStorage.getItem(key), key);
    }
  }
}

export function storageSet(key: string, obj: any, type = "localStorage"): void {
  const now = new Date();

  type === "localStorage"
    ? localStorage.setItem(
        key,
        JSON.stringify({
          value: obj,
          expiry: now.getTime() + 7 * 24 * 60 * 60 * 1000,
        })
      )
    : sessionStorage.setItem(
        key,
        JSON.stringify({
          value: obj,
          expiry: now.getTime() + 7 * 24 * 60 * 60 * 1000,
        })
      );
}

export function storageClear(type = "localStorage") {
  if (type === "localStorage") {
    localStorage.clear();
  } else {
    sessionStorage.clear();
  }
}

export function storageRemoveItem(key: string, type = "localStorage") {
  if (type === "localStorage") {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
}

export function storageHasItem(key: string, type = "localStorage"): boolean {
  if (type === "localStorage") {
    return localStorage.getItem(key) ? true : false;
  } else {
    return sessionStorage.getItem(key) ? true : false;
  }
}

// cookies
export function setCookie(name: string, value: any, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name: string) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
