import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Link from 'next/link';
import * as React from 'react';

type Anchor = 'right';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem className='flex flex-col items-start' disablePadding>
          <ListItemButton className='w-full'>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Link href='/'>Números Palíndromos</Link>
          </ListItemButton>
          <ListItemButton className='w-full'>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Link href='/caixa'>Caixa</Link>
          </ListItemButton>
          <ListItemButton className='w-full'>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Link href='/garagem'>Garagem</Link>
          </ListItemButton>
          <ListItemButton className='w-full'>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Link href='/ceps'>CEPs</Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
