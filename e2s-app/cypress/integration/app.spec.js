describe('Navigation', () => {
    it('should navigate to the usage page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/dashboard')
  
      // Find a link with an href attribute containing "usage" and click it
      cy.get('a[href*="usage"]').click()
  
      // The new url should include "/usage"
      cy.url().should('include', '/usage')
  
      // The new page should contain an h1 with "Usage"
      cy.get('h1').contains('Usage')
    })
  })