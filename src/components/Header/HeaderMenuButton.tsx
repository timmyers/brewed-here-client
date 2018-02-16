import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import HeaderMenu from './HeaderMenu';

interface TProps {
  showAdmin: boolean;
}

interface TState {
  open: boolean;
  anchorEl: HTMLElement;
}

class HeaderMenuButton extends React.Component<TProps, TState> {
  state: TState = { open: false, anchorEl: null };

  handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  }

  render() {
    const { showAdmin } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <div>
        <IconButton
          onClick={this.handleMenu}
          key={'icon'}
        >
          <AccountCircle />
        </IconButton>
        <HeaderMenu
          key={'menu'}
          open={open}
          handleClose={this.handleClose}
          anchorEl={anchorEl}
          showAdmin={showAdmin}
        />
      </div>
    );
  }
}

export default HeaderMenuButton;
