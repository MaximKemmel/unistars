import {RefObject, useEffect} from 'react';

export default function useOutsideAlerter(ref: RefObject<HTMLDivElement | undefined>, onOutsideClick: Function) {

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onOutsideClick]);

  return ref;
}