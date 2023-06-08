import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './navbar';
import '@testing-library/jest-dom';

describe('NavBar', () => {


  test('displays navigation links when user is not logged in', () => {
    render(<NavBar />);

    expect(screen.getByText('Fast & Easy')).toBeInTheDocument();
    expect(screen.getByText('Naslovna')).toBeInTheDocument();
    expect(screen.getByText('O nama')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Registration')).toBeInTheDocument();

    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
  });

  test('displays user profile dropdown when user is logged in', () => {
    const currentUser = { data: { firstName: 'John' } };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    render(<NavBar />);

    expect(screen.getByText('Fast & Easy')).toBeInTheDocument();
    expect(screen.getByText('Naslovna')).toBeInTheDocument();
    expect(screen.getByText('O nama')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();

    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Registration')).not.toBeInTheDocument();
  });

  
});
