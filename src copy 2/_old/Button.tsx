// import React from 'react';
// import useRipple from '@hooks/useRipple';

// function Ripple() {
//   return <span/>;
// }

// interface ButtonProps {
//   label: string
//   style?: React.CSSProperties
// }

// // let Button = ({ label, style }: ButtonProps, refProp) => {
// //   //const [container] = useRippleEffect(refProp);

// //   return (
// //     //@ts-ignore
// //     <button ref={container} className="button" style={style}>
// //       {label}
// //       <Ripple />
// //     </button>
// //   );
// // }
// let Button = ({ label, style }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
//   const ripple = useRipple();

//   return (
//     <button ref={ref} className="button" style={style}>
//       {ripple}
//       <div>{label}</div>
//     </button>
//   );
// }
// Button = React.forwardRef(Button);
// Button = React.memo(Button);

// export default Button;