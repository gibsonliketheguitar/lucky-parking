import React from "react";
import clsx from "clsx";
import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Portal,
  Root,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface SelectProps<T>{
  id: string;
  options: T[];
  onChange: (value:string) => void,
  placeholder: string,
  value: T, 
  width: number, 
  optionWidth: number
}

export default function Select<T>({ id, options, onChange, placeholder, value, width, optionWidth }: SelectProps<T>) {
  return (
    <Root value={value as string} onValueChange={onChange}>
      <Trigger
        className={clsx(
          "inline-flex items-center justify-center leading-none h-9 gap-1",
          "font-normal text-xs outline-none",
          width && `w-[${width}px]`
        )}
        aria-label={id}
      >
        <Value placeholder={placeholder} />
        <Icon className="text-dark-300">
          <ArrowDropDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          className={clsx(
            'overflow-hidden bg-white-100 rounded-sm drop-shadow-xl z-50',
            optionWidth && `w-[${optionWidth}px]`
          )}
          position="popper"
        >
          <ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
            <ArrowDropUpIcon />
          </ScrollUpButton>
          <Viewport>
            <Group>
              {options.map(({ text, value }: any) => <SelectItem key={value} value={value}>{text}</SelectItem>)}
            </Group>
          </Viewport>
        </Content>
      </Portal>
    </Root>
  )
}

interface ItemProps {
  className?: string,
  children: any,
  props?: any,
  value: any,
}

const SelectItem = React.forwardRef(({ children, className, ...props }: ItemProps, forwardedRef: any) => {
  return (
    <Item
      ref={forwardedRef}
      className={clsx(className,
        'relative flex items-center h-8 pr-9 pl-6 select-none',
        'text-sm leading-none text-black-500',
        'data-[disabled]:text-white-100 data-[disabled]:pointer-events-none',
        'data-[highlighted]:outline-none data-[highlighted]:bg-blue-500 data-[highlighted]:text-white-100',
        'rounded-sm drop-shadow-xl')}
      {...props}
    >
      <ItemText>{children}</ItemText>
    </Item>
  );
});
