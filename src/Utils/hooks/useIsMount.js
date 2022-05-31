import { useEffect, useRef } from "react";

export default function useIsMount() {
  let isMount = useRef(false);

  useEffect(() => {
    isMount.current = true;

    return () => {
      //cleanUp 함수
      isMount.current = false;
    };
  }, []);

  return isMount;
}
