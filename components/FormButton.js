const Button = ({ myButton, className, ...otherProps }) => {
  let css = `px-5 bg-gray-200 border-none rounded text-white m-5`;
  if (className) {
    css = `${css} ${className}`;
  }
  return (
    <button className={css} type='submit' {...otherProps}>
      {myButton}
    </button>
  );
};
export default Button;
