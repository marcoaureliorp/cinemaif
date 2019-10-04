import { useEffect } from 'react';

function useClickOutside(ref, callback) {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            if (callback) callback();
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
}

export default useClickOutside;
