import { useContext } from 'react'

import { Box, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

import { UIContext } from '../../context/ui'

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Draft']

export const Sidebar = () => {
  const { isSidemenuOpen, closeSidemenu } = useContext(UIContext)

  return (
    <Drawer
      anchor="left"
      open={isSidemenuOpen}
      onClose={ closeSidemenu }
    >
      <Box sx={{
        width: 400
      }}>
        <Box sx={{
          padding: '10px 20px'
        }}>
        <Typography variant='h5'>Menu</Typography>
        </Box>
        <List>
          {
            menuItems.map((text, i) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  { i % 2 ? <InboxIcon /> : <MailOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <List>
          {
            menuItems.map((text, i) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  { i % 2 ? <InboxIcon /> : <MailOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))
          }
        </List>
      </Box>

    </Drawer>
  )
}
