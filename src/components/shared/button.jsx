'use client'


const Button = ({ children, type = 'button', variant = 'default', onClick = () => {}, icon, className = '', ...props }) => {
  const baseStyles = 'flex items-center justify-center';
  const variantStyles = {
    primary: 'bg-custom-orange-1 text-white',
    secondary: 'bg-custom-teal text-white',
    danger: 'bg-red-600 text-white',
    default: 'bg-custom-dark-blue-1  text-white',
    save: 'bg-custom-teal text-white',
    cancel: 'bg-custom-dark-blue-2 text-white',
    plain: 'bg-white text-custom-dark-blue-2',
    closed: 'bg-custom-gray-3 text-white',
    open: 'bg-custom-light-blue-1 text-white',
    meeting: 'bg-custom-gray-7 text-black'
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
