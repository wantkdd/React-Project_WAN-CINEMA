export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // 문자열이면 그대로 저장, 아니면 JSON.stringify 사용
      const valueToStore =
        typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      // 문자열인지 JSON인지 판단하여 적절히 처리
      try {
        return JSON.parse(item);
      } catch {
        // JSON 파싱에 실패하면 일반 문자열로 반환
        return item;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { setItem, getItem, removeItem };
};
