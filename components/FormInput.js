const Input = ({ name, placeholder, onChange, value, className }) => {
  return (
    <input
      type='text'
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      value={value}
    />
  );
};
export default Input;
