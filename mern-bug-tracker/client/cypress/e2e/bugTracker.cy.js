describe('Bug Tracker Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('submits a new bug and displays it in the list', () => {
    cy.get('input[placeholder="Bug title"]').type('Test Bug');
    cy.get('textarea[placeholder="Describe the bug"]').type('This is a test bug');
    cy.get('button[type="submit"]').click();

    cy.contains('Test Bug').should('exist');
    cy.contains('This is a test bug').should('exist');
  });
});