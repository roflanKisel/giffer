import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { NavbarItem } from '../components/navbar-item';
import Navbar from '../components/navbar';
import SearchLine from '../components/search-line';

storiesOf('NavbarItem', module)
  .add('with name', () => <NavbarItem name="darova" link="/" />)
  .add('with some emoji', () => <NavbarItem name="😀 😎 👍 💯" link="/" />);

storiesOf('Navbar', module).add('default', () => <Navbar />);

storiesOf('SearchLine', module)
  .add('default view', () => (
    <SearchLine searchQuery="" onSearchQueryChange={action('onChange')} />
  ))
  .add('with emoji at start', () => (
    <SearchLine
      searchQuery="😀 😎 👍 💯"
      onSearchQueryChange={action('onChange')}
    />
  ));
