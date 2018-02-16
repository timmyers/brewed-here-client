import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Menu, { MenuItem } from 'material-ui/Menu';
import { History } from 'history';
import { logout } from 'Utils/Auth';

interface TOwnProps extends RouteComponentProps<{}> {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement;
  showAdmin: boolean;
}

const handleHomeClose = (history: History, handleClose: () => void) => {
  history.push('');
  handleClose();
};

const handleProfileClose = (history: History, handleClose: () => void) => {
  history.push('profile');
  handleClose();
};

const handleAdminClose = (history: History, handleClose: () => void) => {
  history.push('admin');
  handleClose();
};

const handleSignOut = () => {
  logout();
};

const MyMenu = ({ open, handleClose, anchorEl, history, showAdmin }: TOwnProps) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
  >
    <MenuItem onClick={() => handleHomeClose(history, handleClose)}>Home</MenuItem>
    <MenuItem onClick={() => handleProfileClose(history, handleClose)}>Profile</MenuItem>
    {showAdmin &&
      <MenuItem onClick={() => handleAdminClose(history, handleClose)}>Admin</MenuItem>
    }
    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
  </Menu>
);

export default withRouter(MyMenu);
