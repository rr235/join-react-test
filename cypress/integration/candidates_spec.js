const date = new Date();
const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

describe('Home', () => {
  it('Clicking on Application navigates to correct URL', () => {
    cy.visit('/');
    cy.get('a[href="/application"]').click({ force: true });
    cy.url().should('include', '/application');
  });

  it('Clicking on Candidates navigates to correct URL', () => {
    cy.visit('/');
    cy.get('a[href="/candidates"]').click({ force: true });
    cy.url().should('include', '/candidates');
  });
});

describe('Application', () => {
  beforeEach(() => {
    sessionStorage.clear();
    cy.visit('/application');
  });

  it('Should be able to save entry', () => {
    cy.get('#email').type('foo@bar.com');
    cy.get('#password').type('123456');
    cy.get('#firstName').type('foo');
    cy.get('#lastName').type('bar');
    cy.get('#telephone').type('12345678900');
    cy.get('#terms').check();

    cy.get('button[type="submit"]').click();
  });
});

describe('Candidates', () => {
  beforeEach(() => {
    cy.visit('/candidates');
  });

  describe('Candidate Info', () => {
    it('Should show correct full name', () => {
      cy.get('[id*="card-"]')
        .last()
        .find('[class*="name"]')
        .should('contain', 'foo bar');
    });

    it('Should show correct email', () => {
      cy.get('[id*="card-"]')
        .last()
        .find('[class*="email"]')
        .should('contain', 'foo@bar.com');
    });

    it('Should show correct status', () => {
      cy.get('[id*="card-"]')
        .last()
        .find('[class*="status"]')
        .should('contain', 'submitted');
    });

    it('Should show application date', () => {
      cy.get('[id*="card-"]')
        .last()
        .find('[class*="info"]')
        .should('contain', `Applied on: ${dateString}`);
    });
  });

  describe('Recruiter Actions', () => {
    it('Should show In Review as menu item', () => {
      cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
      cy.get('[id*="card-"]')
        .last()
        .get('[role="menuitem"]')
        .first()
        .should('contain', 'In Review');
    });

    it('Should show Delete as menu item', () => {
      cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
      cy.get('[id*="card-"]')
        .last()
        .get('[role="menuitem"]')
        .eq(1)
        .should('contain', 'Delete');
    });
  });

  describe('Candidate Application Flow - Hire', () => {
    before(() => {
      // add an application data
      sessionStorage.clear();
      cy.visit('/application');
      cy.get('#email').type('foo@bar.com');
      cy.get('#terms').check();
      cy.get('button[type="submit"]').click();
      cy.visit('/candidates');
    });

    describe('Change status to In Review', () => {
      it('Should be in status "Submitted"', () => {
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'submitted');
      });

      it('Should change status to "In Review"', () => {
        cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
        cy.get('[id*="card-"]').last().get('[id*="in-review"]').click();
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'in review');
      });
    });

    describe('Change status to "Hired"', () => {
      it('Should be in status "In Review"', () => {
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'in review');
      });

      it('Should change status to "Hired"', () => {
        cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
        cy.get('[id*="card-"]').last().get('[id*="hire"]').click();
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'hired');
      });
    });

    describe('Delete Entry', () => {
      it('Should delete application card', () => {
        cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
        cy.get('[id*="card-"]').last().get('[id*="delete"]').click();
        cy.get('[id*="card-"]').should('not.exist');
      });
    });
  });

  describe('Candidate Application Flow - Not a Fit', () => {
    before(() => {
      // add an application data
      sessionStorage.clear();
      cy.visit('/application');
      cy.get('#email').type('foo@bar.com');
      cy.get('#terms').check();
      cy.get('button[type="submit"]').click();
      cy.visit('/candidates');
    });

    describe('Change status to In Review', () => {
      it('Should be in status "Submitted"', () => {
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'submitted');
      });

      it('Should change status to "In Review"', () => {
        cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
        cy.get('[id*="card-"]').last().get('[id*="in-review"]').click();
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'in review');
      });
    });

    describe('Change status to "Not a Fit"', () => {
      it('Should be in status "In Review"', () => {
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'in review');
      });

      it('Should change status to "Not a Fit"', () => {
        cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
        cy.get('[id*="card-"]').last().get('[id*="not-a-fit"]').click();
        cy.get('[id*="card-"]')
          .last()
          .find('[class*="status"]')
          .should('contain', 'not a');
      });
    });

    describe('Delete Entry', () => {
      it('Should delete application card', () => {
        cy.get('[id*="card-"]').last().find('[class*="actionsButton"]').click();
        cy.get('[id*="card-"]').last().get('[id*="delete"]').click();
        cy.get('[id*="card-"]').should('not.exist');
      });
    });
  });
});
