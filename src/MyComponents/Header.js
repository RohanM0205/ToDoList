import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function Header({ title = "To-Do App", searchbar = false, onSearch, onAboutClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Optional: trigger search on each keystroke
    // if (onSearch) onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className="navbar-dark"
        style={{
          backgroundColor: '#6f42c1',
          boxShadow: '0 4px 12px rgba(111, 66, 193, 0.2)'
        }}
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem'
            }}
          >
            {title}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{
                maxHeight: '100px',
                fontFamily: "'Open Sans', sans-serif"
              }}
              navbarScroll
            >
              <Nav.Link
                href="#"
                style={{
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  marginRight: '0.5rem'
                }}
                className="hover-effect"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onAboutClick) onAboutClick();
                }}
                style={{
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '4px'
                }}
                className="hover-effect"
              >
                About
              </Nav.Link>
            </Nav>
            {searchbar && (
              <Form className="d-flex align-items-center" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search tasks..."
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{
                    borderRadius: '20px',
                    border: 'none',
                    fontFamily: "'Open Sans', sans-serif"
                  }}
                />
                <Button
                  variant="light"
                  type="submit"
                  style={{
                    borderRadius: '20px',
                    fontWeight: 600,
                    color: '#6f42c1',
                    border: 'none',
                    padding: '0.5rem 1.2rem',
                    marginRight: searchQuery ? '0.5rem' : '0'
                  }}
                >
                  Search
                </Button>
                {searchQuery && (
                  <Button
                    variant="outline-light"
                    type="button"
                    onClick={handleClearSearch}
                    style={{
                      borderRadius: '20px',
                      fontWeight: 600,
                      color: '#ffffff',
                      border: '1px solid #ffffff',
                      padding: '0.5rem 1.2rem'
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchbar: PropTypes.bool,
  onSearch: PropTypes.func,
  onAboutClick: PropTypes.func
};