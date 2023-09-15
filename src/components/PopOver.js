import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from '@material-tailwind/react';

export function PopOver(props) {
  return (
    <Popover>
      <PopoverHandler>
        <Button>Show Popover</Button>
      </PopoverHandler>
      <PopoverContent>{props.contentOfPopOver}</PopoverContent>
    </Popover>
  );
}
