describe('Hello World Translation', () => {
  it('should show title as Welcome! This is the test page when requesting the default/English site', () => {

    cy.visit('http://localhost:3000/helloWorld')
    cy.get('p[aria-testlabel="helloWorldTitle"]').contains('Welcome! This is the test page')

    // cy.mount()
  })
})

describe('Hello World Translation', () => {
  it('should show title as Croeso! Dyma dudalen y prawf when requesting the default/English site', () => {

    cy.visit('http://localhost:3000/cy/helloWorld')
    cy.get('p[aria-testlabel="helloWorldTitle"]').contains('Croeso! Dyma dudalen y prawf')

    // cy.mount()
  })
})