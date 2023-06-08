import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Car from './Car';

describe('Car Component', () => {
  const mockCar = {
    name: 'Car Name',
    price: 100,
    features: {
      gorivo: 'Gas',
      brojvrata: 4,
      maxbrputnika: 5,
      kapacitet: 'Large',
      mjenjac: 'Manual',
    },
    image: 'car_image.jpg',
  };

  it('renders the car details correctly', () => {
    render(<Car car={mockCar} />);
    // Verify that the car name, price, and features are rendered correctly
    expect(screen.getByText('Car Name')).toBeInTheDocument();
    expect(screen.getByText('Price: 100 €')).toBeInTheDocument();
    expect(screen.getByText('Gas')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
    expect(screen.getByText('Manual')).toBeInTheDocument();
  });

  it('renders the car image', () => {
    render(<Car car={mockCar} />);
    // Verify that the car image is rendered correctly
    const carImage = screen.getByRole('img', { name: '' });
    expect(carImage).toBeInTheDocument();
    expect(carImage).toHaveAttribute('src', 'car_image.jpg');
   
  });

  it('renders the rent button when from date and to date are provided', () => {
    render(
        <MemoryRouter>
          <Car
            car={mockCar}
            fromDate="2023-06-09"
            toDate="2023-06-12"
            pickUp="Mall of Split"
            returnCar="Mall of Split"
          />
        </MemoryRouter>
      );
      const rentButton = screen.getByRole('link', { name: 'Rent' });
      expect(rentButton).toBeInTheDocument();
      expect(rentButton).toHaveAttribute(
        'href',
        '/rent/undefined/2023-06-09/2023-06-12/Mall of Split/Mall of Split'
      );

  })

})
