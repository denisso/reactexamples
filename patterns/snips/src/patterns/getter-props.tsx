const log = (message: string) => {
  console.log(message);
};

// const ButtonGetterProps = ({
//   onClick,
//   children,
// }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
//   const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
//     log('click');
//     if (onClick) onClick(e);
//   };
//   return <button onClick={onClickHandler}>{children}</button>;
// };

const Button = ({
  getButtonProps,
}: {
  getButtonProps: (
    userProps: React.HTMLAttributes<HTMLButtonElement>
  ) => React.HTMLAttributes<HTMLButtonElement>;
}) => {
  const props = getButtonProps({
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => log('click'),
    className: 'default-class',
  });

  return <button {...props}>{props.children}</button>;
};

function GetterProps() {
  const getButtonProps = (
    userProps: React.HTMLAttributes<HTMLButtonElement>
  ) => ({
    ...userProps,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log('User-defined click');
      userProps.onClick?.(e);
    },
    className: `${userProps.className || ''} custom-class`,
  });

  return <Button getButtonProps={getButtonProps}>Click Me</Button>;
}

export default GetterProps;
