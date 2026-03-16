describe('EcoWork - Tests E2E Complets', () => {

  it('Un utilisateur peut se connecter', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('akoange604@gmail.com')
    cy.get('input[type="password"]').first().type('ephraim235')
    cy.get('button[type="submit"]').first().click()
    cy.url().should('include', '/dashboard')
  })

  it('Un admin peut se connecter', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('admin@ecowork.com')
    cy.get('input[type="password"]').first().type('admin123')
    cy.get('button[type="submit"]').first().click()
    cy.url().should('include', '/admin/dashboard')
  })

  it('Un utilisateur non connecté est redirigé vers login', () => {
    cy.visit('http://localhost:5173/dashboard')
    cy.url().should('include', '/login')
  })

  it('Un utilisateur connecté peut voir la liste des espaces', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('akoange604@gmail.com')
    cy.get('input[type="password"]').first().type('ephraim235')
    cy.get('button[type="submit"]').first().click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/espaces')
    cy.url().should('include', '/espaces')
  })

  it('Un utilisateur connecté peut voir ses réservations', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('akoange604@gmail.com')
    cy.get('input[type="password"]').first().type('ephraim235')
    cy.get('button[type="submit"]').first().click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/reservations')
    cy.url().should('include', '/reservations')
  })

  it('Un utilisateur connecté peut accéder à son profil', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('akoange604@gmail.com')
    cy.get('input[type="password"]').first().type('ephraim235')
    cy.get('button[type="submit"]').first().click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/profil')
    cy.url().should('include', '/profil')
  })

  it('Un admin peut accéder à la gestion des espaces', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('admin@ecowork.com')
    cy.get('input[type="password"]').first().type('admin123')
    cy.get('button[type="submit"]').first().click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/admin/espaces')
    cy.url().should('include', '/admin/espaces')
  })

  it('Un admin peut accéder à la gestion des réservations', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('admin@ecowork.com')
    cy.get('input[type="password"]').first().type('admin123')
    cy.get('button[type="submit"]').first().click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/admin/reservations')
    cy.url().should('include', '/admin/reservations')
  })

  it('Un admin peut accéder à la gestion des utilisateurs', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').first().type('admin@ecowork.com')
    cy.get('input[type="password"]').first().type('admin123')
    cy.get('button[type="submit"]').first().click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/admin/users')
    cy.url().should('include', '/admin/users')
  })

})