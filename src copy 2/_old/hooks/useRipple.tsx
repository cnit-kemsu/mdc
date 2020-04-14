// //@ts-nocheck

// import React, { useMemo } from 'react';
// import Ripple from '@lib/Ripple';

// // export default function useRippleEffect(ref) {
// //   const rippleEffect = useMemo(createRippleEffect, []);
// //   //rippleEffect.forwardRef(ref);
// //   //return [rippleEffect.setTargetElement, rippleEffect.focusElement];
// //   //return rippleEffect.setTargetElement;
// //   return <span ref={rippleEffect.setTargetElement} />;
// // }

// // function createRipple() {
// //   return new Ripple();
// // }

// export default function useRipple() {
//   const ripple = useMemo(() => new Ripple(), []);

//   return (
//     <div className="ripple" ref={ripple.setCurrent} />
//   );
// }