describe('Bug Tracker - Basic Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows bug form and list', () => {
    cy.contains('🐞 Bug Tracker');
    cy.get('form').should('exist');
    cy.get('input[placeholder="Bug title"]').should('exist');
  });

  it('does not allow empty submission', () => {
    cy.get('form').submit();
    cy.contains('title is required').should('exist'); // Only if your form validates
  });

  it('adds a new bug', () => {
    cy.get('input[placeholder="Bug title"]').type('Sample Bug');
    cy.get('textarea[placeholder="Bug description"]').type('Bug from Cypress');
    cy.get('form').submit();

    cy.contains('Sample Bug').should('exist');
    cy.contains('Bug from Cypress').should('exist');
  });
});