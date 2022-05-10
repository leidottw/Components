import { forwardRef, useEffect, useRef } from "react";
import { fromEvent, mergeMap, takeUntil, tap } from "rxjs";

const draggableHOC = (Component) =>
  forwardRef(({ ...rest }, outerRef) => {
    const target = useRef();

    useEffect(() => {
      let targetX = null;
      let targetY = null;
      let targetWdith = null;
      let targetHeight = null;

      let startX = null;
      let startY = null;

      const dragStart$ = fromEvent(target.current, "mousedown");
      const dragEnd$ = fromEvent(document, "mouseup");
      const dragMove$ = fromEvent(document, "mousemove");
      dragStart$
        .pipe(
          tap((e) => {
            // get the initial position of the target
            const rectParams = target.current.getBoundingClientRect();

            // convert to fixed position
            target.current.style.position = "fixed";
            target.current.style.left = `${rectParams.left}px`;
            target.current.style.top = `${rectParams.top}px`;
            target.current.style.right = null;
            target.current.style.bottom = null;

            // remember initial position
            targetX = rectParams.left;
            targetY = rectParams.top;
            targetWdith = rectParams.width;
            targetHeight = rectParams.height;

            // remember initial mouse position
            startX = e.clientX;
            startY = e.clientY;
          }),
          mergeMap(() => dragMove$.pipe(takeUntil(dragEnd$))),
          tap(({ clientX, clientY }) => {
            //   calculate the new position of the target
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            let resultX = targetX + deltaX;
            let resultY = targetY + deltaY;

            // check out of range
            resultX =
              resultX <= 0
                ? 0
                : resultX >= window.innerWidth - targetWdith
                ? window.innerWidth - targetWdith
                : resultX;

            // check out of range
            resultY =
              resultY <= 0
                ? 0
                : resultY >= window.innerHeight - targetHeight
                ? window.innerHeight - targetHeight
                : resultY;

            target.current.style.left = `${resultX}px`;
            target.current.style.top = `${resultY}px`;
          })
        )
        .subscribe();
    }, []);

    return (
      <Component
        ref={(ref) => {
          target.current = ref;

          if (outerRef !== null) {
            typeof outerRef === "function"
              ? outerRef(ref)
              : (outerRef.current = ref);
          }
        }}
        {...rest}
      />
    );
  });

export default draggableHOC;
